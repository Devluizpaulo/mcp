
import { ChatInterface } from '@/components/chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpgradePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
             <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Análise de Upgrade com IA</CardTitle>
                <CardDescription>
                  Converse com o MCP. Ele vai te guiar para descobrir os componentes do seu PC e sugerir os melhores upgrades.
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
