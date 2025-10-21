
'use server';
/**
 * @fileOverview Fetches detailed information about a specific computer component using database tools.
 *
 * - getComponentDetails - A function that fetches details for a given component name.
 * - GetComponentDetailsInput - The input type for the getComponentDetails function.
 * - GetComponentDetailsOutput - The return type for the getComponentDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getComponentDetailsTool } from '@/ai/tools/component-tools';

const GetComponentDetailsInputSchema = z.object({
  componentName: z.string().describe('The name of the computer component to get details for.'),
});

export type GetComponentDetailsInput = z.infer<typeof GetComponentDetailsInputSchema>;

const GetComponentDetailsOutputSchema = z.object({
  details: z
    .string()
    .describe(
      'A detailed breakdown of the component including key features, pros, cons, estimated price, and power consumption.'
    ),
});

export type GetComponentDetailsOutput = z.infer<typeof GetComponentDetailsOutputSchema>;

export async function getComponentDetails(
  input: GetComponentDetailsInput
): Promise<GetComponentDetailsOutput> {
  return getComponentDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getComponentDetailsPrompt',
  input: { schema: z.object({ componentDetails: z.string() }) },
  output: { schema: GetComponentDetailsOutputSchema },
  tools: [getComponentDetailsTool],
  prompt: `You are a PC hardware expert and a great teacher. Based on the following component data (in JSON format), provide a detailed and educational analysis.

  Component Data:
  {{{componentDetails}}}

  Structure your response clearly with the following sections, using Markdown for formatting:
  - **Component:** The full name of the component.
  - **Analogia para Iniciantes:** Explain the component's role in a simple, relatable way. For example, 'If the PC is an office, the CPU is the main employee doing all the work'.
  - **Key Characteristics:** Bullet points on the main technical specifications (e.g., core count, clock speed, memory size, VRAM, speed, etc.).
  - **Pros:** Bullet points on the advantages of this component (e.g., performance in gaming, value for money, specific features).
  - **Cons:** Bullet points on the disadvantages (e.g., high power consumption, price, older technology).
  - **Estimated Price (USD):** A typical price range in USD (e.g., $250 - $300).
  - **Estimated Power Consumption (TDP):** The estimated power draw in watts (e.g., 125W).
  - **Compatibility Notes:** Brief notes on what this component is compatible with (e.g., 'Requires an AM5 socket motherboard', 'Best paired with a 750W PSU or higher').`,
});

const getComponentDetailsFlow = ai.defineFlow(
  {
    name: 'getComponentDetailsFlow',
    inputSchema: GetComponentDetailsInputSchema,
    outputSchema: GetComponentDetailsOutputSchema,
    tools: [getComponentDetailsTool],
  },
  async ({ componentName }) => {
    // First, use the tool to get the structured data from Firestore.
    const detailsObject = await getComponentDetailsTool(componentName);

    if (!detailsObject) {
      return { details: 'Desculpe, não consegui encontrar detalhes para este componente no banco de dados.' };
    }
    
    // Now, pass the structured data to the prompt to get a formatted, user-friendly explanation.
    const { output } = await prompt({
      componentDetails: JSON.stringify(detailsObject, null, 2),
    });
    
    return output!;
  }
);
