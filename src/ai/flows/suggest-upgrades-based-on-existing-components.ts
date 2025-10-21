
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
  upgradeCost: z
    .number()
    .describe('The total estimated cost of the suggested upgrade components in USD.'),
  currentValue: z
    .number()
    .describe('The estimated current market value of the user\'s existing PC build in USD.'),
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
  prompt: `You are an expert PC hardware analyst. Given the user's existing computer components: {{{existingComponents}}}, suggest specific hardware upgrades that will improve overall system performance.

  Your response must include three fields:
  1. 'suggestedUpgrades': A detailed explanation of why each upgrade is recommended, identifying performance bottlenecks, and considering component compatibility (e.g., CPU socket and motherboard chipset, RAM type, PSU wattage). Use Markdown for formatting.
  2. 'upgradeCost': The total estimated cost in USD for purchasing all the suggested upgrade components.
  3. 'currentValue': The estimated current market value in USD of the user's existing PC build (before the upgrade).
  `,
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
