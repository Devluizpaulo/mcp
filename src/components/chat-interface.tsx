
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SendHorizonal, AlertTriangle, User } from 'lucide-react';
import { getChatResponse, type ChatMessage } from '@/app/actions';
import { AiResponseDisplay } from './ai-response-display';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // Add a placeholder for the AI response
    setMessages(prev => [...prev, { role: 'model', content: '...' }]);


    try {
      const result = await getChatResponse(newMessages);
      
      let aiResponse: ChatMessage;

      if (result.error) {
        aiResponse = { role: 'model', content: `Error: ${result.error}` };
      } else {
        aiResponse = { role: 'model', content: result.response as string };
      }

      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = aiResponse;
        return updatedMessages;
      });

    } catch (error) {
      const errorMessage = {
        role: 'model' as const,
        content: 'Ocorreu um erro. Por favor, tente novamente.',
      };
      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = errorMessage;
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[60vh]">
      <ScrollArea className="flex-1 p-4 -mx-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-transparent text-primary">
                    <AlertTriangle className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xl rounded-lg p-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.role === 'model' && message.content === '...' ? (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                ) : (
                  <AiResponseDisplay content={message.content} />
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                   <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {messages.length === 0 && (
                <div className="text-center text-muted-foreground pt-10">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">Converse com o MCP</h3>
                    <p className="mt-2 text-sm">Inicie a conversa para que a IA possa analisar seu PC ou tirar suas dúvidas.</p>
                </div>
            )}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t -mx-6 px-4 pt-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem para o MCP..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <SendHorizonal className="w-5 h-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
