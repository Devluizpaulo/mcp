
'use server';
/**
 * @fileOverview A conversational chat flow for the PC building assistant.
 *
 * - chat - A function that handles conversational chat.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getComponentDetailsTool } from '../tools/component-tools';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
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
    tools: [getComponentDetailsTool]
  },
  async ({ history }) => {
    const { output } = await ai.generate({
      prompt: history,
      system: `You are MCP, a Master Component Planner AI expert in PC hardware. Your role is to assist users with building, upgrading, and understanding computer components. Be helpful, concise, and technical when needed.

      When a user wants to analyze their PC for an upgrade, guide them through the process conversationally.
      1. Ask for one component at a time (e.g., "Let's start with your processor (CPU). What model is it?").
      2. When the user provides a component name, use the 'getComponentDetailsTool' to verify and fetch its data.
      3. Briefly confirm the component back to the user (e.g., "Got it, an Intel Core i5-9400F.").
      4. Proceed to the next component (GPU, RAM, Motherboard, etc.).
      5. Once you have a few key components (at least CPU, GPU, and RAM), you can provide a preliminary upgrade analysis.
      6. For general chat, just be a helpful AI assistant.`,
      model: 'googleai/gemini-2.5-flash',
    });

    return { response: output.text ?? 'Sorry, I could not process that.' };
  }
);
