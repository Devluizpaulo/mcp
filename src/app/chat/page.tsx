import { ChatInterface } from '@/components/chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChatPage() {
  return (
    <div className="flex flex-1">
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <Card className="border-primary/20 h-full">
              <CardHeader>
                <CardTitle>Chat com o MCP</CardTitle>
                <CardDescription>
                  Converse com nosso especialista em hardware para tirar dúvidas e receber conselhos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
