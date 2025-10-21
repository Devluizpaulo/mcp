'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting component upgrades based on existing hardware.
 *
 * - suggestUpgradesBasedOnExistingComponents -  A function that suggests upgrades based on the provided components.
 * - SuggestUpgradesBasedOnExistingComponentsInput - The input type for the suggestUpgradesBasedOnExistingComponents function.
 * - SuggestUpgradesBasedOnExistingComponentsOutput - The output type for the suggestUpgradesBasedOnExistingComponents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUpgradesBasedOnExistingComponentsInputSchema = z.object({
  existingComponents: z.string().describe('A comma-separated list of the user\'s existing computer components, e.g., CPU, GPU, RAM, Motherboard.'),
});

export type SuggestUpgradesBasedOnExistingComponentsInput =
  z.infer<typeof SuggestUpgradesBasedOnExistingComponentsInputSchema>;

const SuggestUpgradesBasedOnExistingComponentsOutputSchema = z.object({
  suggestedUpgrades: z
    .string()
    .describe(
      'A list of suggested hardware upgrades, considering compatibility and price, and explained in detail.'
    ),
});

export type SuggestUpgradesBasedOnExistingComponentsOutput =
  z.infer<typeof SuggestUpgradesBasedOnExistingComponentsOutputSchema>;

export async function suggestUpgradesBasedOnExistingComponents(
  input: SuggestUpgradesBasedOnExistingComponentsInput
): Promise<SuggestUpgradesBasedOnExistingComponentsOutput> {
  return suggestUpgradesBasedOnExistingComponentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUpgradesBasedOnExistingComponentsPrompt',
  input: {schema: SuggestUpgradesBasedOnExistingComponentsInputSchema},
  output: {schema: SuggestUpgradesBasedOnExistingComponentsOutputSchema},
  prompt: `Given the user's existing computer components: {{{existingComponents}}}, suggest specific hardware upgrades that will improve overall system performance, taking into account component compatibility and price. Explain why each upgrade is recommended, and provide estimated costs if possible. Be as detailed as possible.`,
});

const suggestUpgradesBasedOnExistingComponentsFlow = ai.defineFlow(
  {
    name: 'suggestUpgradesBasedOnExistingComponentsFlow',
    inputSchema: SuggestUpgradesBasedOnExistingComponentsInputSchema,
    outputSchema: SuggestUpgradesBasedOnExistingComponentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
