import { ChatInterface } from '@/components/chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <Card className="border-primary/20">
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
