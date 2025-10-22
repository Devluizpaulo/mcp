
'use server';
/**
 * @fileOverview Genkit tools for interacting with the components collection in Firestore.
 *
 * - listComponentsByType - Lists all components of a given type (e.g., CPU, GPU).
 * - getComponentDetailsTool - Fetches detailed information for a specific component by name.
 */

import { ai } from '@/ai/genkit';
import { initializeServerFirebase } from '@/firebase/server-init';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
});

async function getComponentsCollection() {
    const { firestore } = await initializeServerFirebase();
    return collection(firestore, 'components');
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
    async ({ type }) => {
        const componentsCollection = await getComponentsCollection();
        const q = query(componentsCollection, where('type', '==', type));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as z.infer<typeof z.array<typeof ComponentSchema>>;
    }
);


export const getComponentDetailsTool = ai.defineTool(
  {
    name: 'getComponentDetailsTool',
    description: 'Retrieves detailed information about a specific computer component from the database by its name.',
    inputSchema: z.string().describe('The full name of the component to retrieve details for.'),
    outputSchema: ComponentSchema.optional(),
  },
  async (componentName) => {
    const componentsCollection = await getComponentsCollection();
    const q = query(componentsCollection, where('name', '==', componentName));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.warn(`Component with name "${componentName}" not found in database.`);
      return undefined;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as z.infer<typeof ComponentSchema>;
  }
);
