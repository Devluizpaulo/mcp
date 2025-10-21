'use server';
/**
 * @fileOverview Fetches detailed information about a specific computer component.
 *
 * - getComponentDetails - A function that fetches details for a given component name.
 * - GetComponentDetailsInput - The input type for the getComponentDetails function.
 * - GetComponentDetailsOutput - The return type for the getComponentDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  input: {schema: GetComponentDetailsInputSchema},
  output: {schema: GetComponentDetailsOutputSchema},
  prompt: `You are a PC hardware expert. Provide a detailed analysis for the following component: {{{componentName}}}.

  Structure your response clearly with the following sections:
  - **Component:** The full name of the component.
  - **Key Characteristics:** Bullet points on the main technical specifications (e.g., core count, clock speed, memory size, VRAM, speed, etc.).
  - **Pros:** Bullet points on the advantages of this component (e.g., performance in gaming, value for money, specific features).
  - **Cons:** Bullet points on the disadvantages (e.g., high power consumption, price, older technology).
  - **Estimated Price (USD):** A typical price range in USD (e.g., $250 - $300).
  - **Estimated Power Consumption (TDP):** The estimated power draw in watts (e.g., 125W).
  - **Compatibility Notes:** Brief notes on what this component is compatible with (e.g., 'Requires an AM5 socket motherboard', 'Best paired with a 750W PSU or higher').
  
  Use Markdown for formatting.`,
});

const getComponentDetailsFlow = ai.defineFlow(
  {
    name: 'getComponentDetailsFlow',
    inputSchema: GetComponentDetailsInputSchema,
    outputSchema: GetComponentDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
