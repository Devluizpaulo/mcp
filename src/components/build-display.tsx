
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';
import { AiResponseDisplay } from "./ai-response-display";

interface BuildDisplayProps {
  build: GenerateOptimizedBuildOutput;
}

export function BuildDisplay({ build }: BuildDisplayProps) {
  return (
    <Card className="border-primary/30 shadow-sm shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Configuração Recomendada</CardTitle>
        <CardDescription>Aqui está a configuração que nossa IA montou para você.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Valor Estimado do Build</p>
            <p className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(build.totalCost)}
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Pontuação de Performance</p>
                <p className="text-lg font-bold text-primary">{build.performanceScore}/10</p>
            </div>
            <Progress value={build.performanceScore * 10} className="h-2 [&>div]:bg-primary" />
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <AiResponseDisplay content={build.buildConfiguration} />
      </CardContent>
    </Card>
  );
}
