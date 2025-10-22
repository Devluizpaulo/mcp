
'use server';
/**
 * @fileOverview Genkit tools for interacting with the components collection in Firestore.
 *
 * - listComponentsByType - Lists all components of a given type (e.g., CPU, GPU).
 * - getComponentDetailsTool - Fetches detailed information for a specific component by name.
 */

import { ai } from '@/ai/genkit';
import { initializeServerFirebase } from '@/firebase/server-init';
import { z } from 'genkit';

const ComponentSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    manufacturer: z.string(),
    model: z.string(),
    specifications: z.string(),
    performanceScore: z.number(),
    estimatedCost: z.number(),
    imageUrl: z.string().optional(),
    keywords: z.array(z.string()).optional(),
});

type Component = z.infer<typeof ComponentSchema>;

async function getComponentsCollection() {
    const { firestore } = await initializeServerFirebase();
    return firestore.collection('components');
}

export const listComponentsByType = ai.defineTool(
    {
        name: 'listComponentsByType',
        description: 'Lists all available components of a specified type from the database.',
        inputSchema: z.object({
            type: z.string().describe('The type of component to list (e.g., CPU, GPU, RAM).'),
        }),
        outputSchema: z.array(ComponentSchema),
    },
    async ({ type }): Promise<Component[]> => {
        const componentsCollection = await getComponentsCollection();
        const q = componentsCollection.where('type', '==', type);
        const snapshot = await q.get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Component));
    }
);

export const getComponentDetailsTool = ai.defineTool(
  {
    name: 'getComponentDetailsTool',
    description: 'Retrieves detailed information about a specific computer component from the database by its name. Use keywords from the name for a better match.',
    inputSchema: z.string().describe('The full or partial name of the component to retrieve details for. E.g., "Intel i5-13600K"'),
    outputSchema: ComponentSchema.optional(),
  },
  async (componentName): Promise<Component | undefined> => {
    console.log(`Searching for component: ${componentName}`);
    const componentsCollection = await getComponentsCollection();
    
    // Sanitize and create keywords from the input name
    const keywords = componentName.toLowerCase().split(/[\s-]+/).filter(k => k);
    if(keywords.length === 0) {
        console.warn('Empty keywords for component search.');
        return undefined;
    }
    
    console.log(`Using keywords for search: ${keywords.join(', ')}`);

    // Firestore 'array-contains-any' can check for up to 30 values.
    const q = componentsCollection.where('keywords', 'array-contains-any', keywords.slice(0, 30));
    
    const snapshot = await q.get();
    
    if (snapshot.empty) {
      console.warn(`No component found matching keywords: ${keywords.join(', ')}`);
      
      // Fallback to a broader, less efficient search if the first one fails
      const allDocsSnapshot = await componentsCollection.get();
      const lowerCaseName = componentName.toLowerCase();
      const foundDoc = allDocsSnapshot.docs.find(doc => (doc.data().name as string).toLowerCase().includes(lowerCaseName));

      if (foundDoc) {
        console.log(`Fallback search found a match: ${foundDoc.data().name}`);
        return { id: foundDoc.id, ...foundDoc.data() } as Component;
      }

      console.warn(`Component with name "${componentName}" not found in database even with fallback.`);
      return undefined;
    }

    // With 'array-contains-any', multiple documents could match. We need to find the best one.
    // A simple scoring mechanism: the one with more keyword matches is better.
    let bestMatch: Component | null = null;
    let maxScore = 0;

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const docKeywords = data.keywords || [];
        const score = keywords.reduce((acc, keyword) => docKeywords.includes(keyword) ? acc + 1 : acc, 0);

        if(score > maxScore) {
            maxScore = score;
            bestMatch = { id: doc.id, ...data } as Component;
        }
    });

    if (bestMatch) {
         console.log(`Best match found with score ${maxScore}: ${(bestMatch as Component).name}`);
    } else {
        console.warn(`A match was found with array-contains-any, but scoring logic failed.`);
    }

    return bestMatch || undefined;
  }
);
