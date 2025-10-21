import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu } from 'lucide-react';
import { UpgradeForm } from '@/components/upgrade-form';
import { BuildForm } from '@/components/build-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur-sm px-4 md:px-6 z-10">
        <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary animate-pulse" />
            <h1 className="text-xl font-bold font-headline">
              TechUpgrade Pro
            </h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-2 font-headline">Bem-vindo ao TechUpgrade Pro</h2>
              <p className="text-muted-foreground">
                Seu assistente de IA para montar e atualizar seu PC. Insira seus componentes atuais para receber sugestões de upgrade ou planeje um novo build do zero com base no seu orçamento.
              </p>
            </div>

            <Tabs defaultValue="upgrade" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="upgrade">Upgrade Meu PC</TabsTrigger>
                <TabsTrigger value="build">Montar Novo PC</TabsTrigger>
              </TabsList>
              <TabsContent value="upgrade">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Sugestões de Upgrade</CardTitle>
                    <CardDescription>
                      Liste seus componentes atuais e nossa IA irá sugerir os melhores upgrades para sua máquina.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpgradeForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="build">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Simulador de Build Completo</CardTitle>
                    <CardDescription>
                      Defina seu orçamento e o uso pretendido, e nossa IA montará a configuração ideal para você.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BuildForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
