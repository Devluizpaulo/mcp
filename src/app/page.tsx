
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Wrench, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-card-foreground/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl text-primary animate-fade-in-down">
              Master Component Planner
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground animate-fade-in-up delay-200">
              Seu copiloto de IA para montar, otimizar e fazer o upgrade do seu PC dos sonhos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
              <Button asChild size="lg" className="text-lg">
                <Link href="/upgrade">
                  <Wrench className="mr-2" />
                  Analisar Meu PC
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/build">
                  <Cpu className="mr-2" />
                  Montar um Novo PC
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4 border border-primary/20">
                <Wrench className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Análise de Upgrade</h3>
              <p className="text-muted-foreground">
                Descubra os melhores componentes para dar um gás na sua máquina atual sem estourar o orçamento.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4 border border-primary/20">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Simulador de Build</h3>
              <p className="text-muted-foreground">
                Comece do zero. Defina seu orçamento e nós montamos a configuração perfeita para suas necessidades.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4 border border-primary/20">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-2">Chat com IA</h3>
              <p className="text-muted-foreground">
                Tem alguma dúvida? Converse com nosso especialista em hardware para receber conselhos e tirar dúvidas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
