
'use server';
/**
 * @fileOverview A conversational chat flow for the PC building assistant.
 *
 * - chat - A function that handles conversational chat.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import { getComponentDetailsTool } from '../tools/component-tools';

const ChatInputSchema = z.object({
  message: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ message }) => {
    const { output } = await ai.generate({
      model: 'gemini-1.5-pro',
      prompt: `Você é MCP, a Master Component Planner AI expert in PC hardware. Your role is to assist users with building, upgrading, and understanding computer components. Be helpful, concise, and technical when needed.

  When a user wants to analyze their PC for an upgrade, you must guide them through the process conversationally.
  1. Ask for one component at a time (e.g., "Let's start with your processor (CPU). What model is it?").
  2. When the user provides a component name, you must first use the 'getComponentDetailsTool' to verify and fetch its data from the internal database.
  3. If the component is NOT found in the database with 'getComponentDetailsTool', then you should inform the user that the component is not in our database and suggest they provide more specific details.
  4. Briefly confirm the component back to the user (e.g., "Got it, an Intel Core i5-9400F.").
  5. Proceed to the next component (GPU, RAM, Motherboard, etc.).
  6. Once you have a few key components (at least CPU, GPU, and RAM), you can provide a preliminary upgrade analysis. Only suggest saving the configuration after you have collected enough data and performed an analysis.
  7. For general chat, just be a helpful AI assistant.

  User message: ${message}`,
      tools: [getComponentDetailsTool],
    });

    return { response: output?.text ?? 'Sorry, I could not process that.' };
  }
);
