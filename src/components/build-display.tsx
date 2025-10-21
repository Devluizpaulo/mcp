
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';
import { AiResponseDisplay } from "./ai-response-display";
import { Button } from "./ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { useUser } from "@/firebase";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { saveNewBuild } from "@/app/actions";

interface BuildDisplayProps {
  build: GenerateOptimizedBuildOutput;
}

function SaveBuildForm({ build, onFinished }: { build: GenerateOptimizedBuildOutput, onFinished: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append('buildConfiguration', build.buildConfiguration);
    formData.append('totalCost', String(build.totalCost));
    formData.append('performanceScore', String(build.performanceScore));
    formData.append('userId', user!.uid);

    const result = await saveNewBuild(formData);
    
    if (result.error) {
      toast({
        title: 'Erro ao Salvar',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: result.success,
      });
      onFinished();
    }
    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="mb-4">Você precisa estar logado para salvar uma build.</p>
        <Button asChild>
          <Link href="/login?redirect=/build">Fazer Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Build</Label>
        <Input id="name" name="name" defaultValue={`Build de ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(build.totalCost)}`} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea id="description" name="description" placeholder="Ex: PC para jogos em 4K e trabalho" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar
        </Button>
      </DialogFooter>
    </form>
  )
}

export function BuildDisplay({ build }: BuildDisplayProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useUser();

  return (
    <Card className="border-primary/30 shadow-sm shadow-primary/10">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl font-headline text-primary">Configuração Recomendada</CardTitle>
                <CardDescription>Aqui está a configuração que nossa IA montou para você.</CardDescription>
            </div>
            {user && (
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Bookmark className="mr-2" /> Salvar Build
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Salvar sua Build</DialogTitle>
                        <DialogDescription>
                            Dê um nome para sua nova configuração para salvá-la em "Minhas Builds".
                        </DialogDescription>
                    </DialogHeader>
                    <SaveBuildForm build={build} onFinished={() => setIsFormOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
        </div>
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
