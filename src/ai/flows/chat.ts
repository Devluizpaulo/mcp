
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

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user\'s message.'),
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
  async ({ history }) => {
    const { output } = await ai.generate({
      prompt: history,
      system: `You are MCP, a Master Component Planner AI expert in PC hardware. Your role is to assist users with building, upgrading, and understanding computer components. Be helpful, concise, and technical when needed.`,
      model: 'googleai/gemini-2.5-flash',
    });

    return { response: output.text ?? 'Sorry, I could not process that.' };
  }
);
