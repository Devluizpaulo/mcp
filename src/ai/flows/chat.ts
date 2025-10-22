
'use server';
/**
 * @fileOverview A conversational chat flow for the PC building assistant.
 *
 * - chat - A function that handles conversational chat.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getComponentDetailsTool } from '../tools/component-tools';
import { webSearchTool } from '../tools/search-tool';

const ChatInputSchema = z.object({
  message: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    let response = '';
    let needsWebSearch = false;
    let searchQuery = '';

    // Check if the message contains hardware-related terms that might need web search
    const hardwareTerms = ['preço', 'price', 'comprar', 'buy', 'review', 'especificação', 'specification', 'lançamento', 'release', 'nova', 'new'];
    const messageLower = input.message.toLowerCase();
    
    if (hardwareTerms.some(term => messageLower.includes(term))) {
      needsWebSearch = true;
      searchQuery = input.message;
    }

    // If we need web search, perform it first
    let webSearchResults = '';
    if (needsWebSearch) {
      try {
        const searchResults = await webSearchTool(searchQuery);
        webSearchResults = searchResults.map(result => 
          `**${result.title}**\n${result.snippet}\nFonte: ${result.url}\n`
        ).join('\n');
      } catch (searchError) {
        console.error('Error in web search:', searchError);
        webSearchResults = 'Não foi possível realizar a busca web no momento.';
      }
    }

    const prompt = `Você é MCP, a Master Component Planner AI expert in PC hardware. Your role is to assist users with building, upgrading, and understanding computer components. Be helpful, concise, and technical when needed.

${needsWebSearch ? `
INFORMAÇÕES ATUALIZADAS DA WEB:
${webSearchResults}

Use essas informações para fornecer respostas mais precisas e atualizadas sobre preços, especificações e disponibilidade.
` : ''}

When a user wants to analyze their PC for an upgrade, you must guide them through the process conversationally.
1. Ask for one component at a time (e.g., "Let's start with your processor (CPU). What model is it?").
2. When the user provides a component name, you must first use the 'getComponentDetailsTool' to verify and fetch its data from the internal database.
3. If the component is NOT found in the database with 'getComponentDetailsTool', then use the 'webSearchTool' to find current information about it online.
4. Briefly confirm the component back to the user (e.g., "Got it, an Intel Core i5-9400F.").
5. Proceed to the next component (GPU, RAM, Motherboard, etc.).
6. Once you have a few key components (at least CPU, GPU, and RAM), you can provide a preliminary upgrade analysis. Only suggest saving the configuration after you have collected enough data and performed an analysis.
7. For general chat, just be a helpful AI assistant. You can also use the 'webSearchTool' to find current information about hardware, prices, reviews, or any other PC-related topics when needed.

User message: ${input.message}`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
    });

    response = aiResponse.text ?? 'Sorry, I could not process that.';
    
    return { response };
  } catch (error) {
    console.error('Error in chat function:', error);
    return { response: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.' };
  }
}
