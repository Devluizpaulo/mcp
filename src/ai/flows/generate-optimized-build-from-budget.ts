
'use server';
/**
 * @fileOverview Generates an optimized PC build configuration based on a given budget.
 *
 * - generateOptimizedBuildFromBudget - A function that generates a PC build configuration based on a budget.
 * - GenerateOptimizedBuildInput - The input type for the generateOptimizedBuildFromBudget function.
 * - GenerateOptimizedBuildOutput - The return type for the generateOptimizedBuildFromBudget function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOptimizedBuildInputSchema = z.object({
  budget: z.number().describe('The budget for the PC build in USD.'),
  intendedUse: z
    .string()
    .describe(
      'The intended use for the PC, e.g., gaming, video editing, general use.'
    ),
  existingComponents: z
    .string()
    .optional()
    .describe(
      'List of existing components the user already has. Optional, defaults to an empty string if not specified.'
    ),
});

export type GenerateOptimizedBuildInput = z.infer<
  typeof GenerateOptimizedBuildInputSchema
>;

const GenerateOptimizedBuildOutputSchema = z.object({
  buildConfiguration: z
    .string()
    .describe(
      'A detailed PC build configuration including components, specifications, and estimated costs. Include possible alternatives.'
    ),
  totalCost: z
    .number()
    .describe('The total estimated cost of the build configuration.'),
  performanceScore: z
    .number()
    .describe(
      'An estimated performance score of the build configuration, from 1 to 10.'
    ),
});

export type GenerateOptimizedBuildOutput = z.infer<
  typeof GenerateOptimizedBuildOutputSchema
>;

export async function generateOptimizedBuildFromBudget(
  input: GenerateOptimizedBuildInput
): Promise<GenerateOptimizedBuildOutput> {
  return generateOptimizedBuildFromBudgetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOptimizedBuildFromBudgetPrompt',
  input: {schema: GenerateOptimizedBuildInputSchema},
  output: {schema: GenerateOptimizedBuildOutputSchema},
  prompt: `You are an expert PC builder, adept at creating optimized build configurations based on user requirements and budget.

  Given the following budget: {{{budget}}} USD
  Intended use: {{{intendedUse}}}
  Existing components: {{{existingComponents}}}

  Generate a primary PC build configuration that balances performance and cost. Then, always suggest 1 or 2 cheaper alternatives, clearly labeling them as 'Alternative Option'.

  The output for all configurations should include:
  - Detailed component list with specifications and estimated costs.
  - Total estimated cost of the build configuration.
  - An estimated performance score of the build configuration, from 1 to 10.

  Format the entire response with Markdown to be readable and well-organized.
  `,
});

const generateOptimizedBuildFromBudgetFlow = ai.defineFlow(
  {
    name: 'generateOptimizedBuildFromBudgetFlow',
    inputSchema: GenerateOptimizedBuildInputSchema,
    outputSchema: GenerateOptimizedBuildOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
