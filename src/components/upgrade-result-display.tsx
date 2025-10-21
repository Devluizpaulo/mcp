
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SuggestUpgradesBasedOnExistingComponentsOutput } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import { AiResponseDisplay } from "./ai-response-display";
import { Button } from "./ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { useUser } from "@/firebase";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { saveUpgradeAnalysis } from "@/app/actions";

interface UpgradeResultDisplayProps {
  result: SuggestUpgradesBasedOnExistingComponentsOutput;
}

function SaveUpgradeForm({ result, onFinished }: { result: SuggestUpgradesBasedOnExistingComponentsOutput, onFinished: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append('aiResponse', result.suggestedUpgrades);
    formData.append('upgradeCost', String(result.upgradeCost));
    formData.append('currentValue', String(result.currentValue));
    formData.append('userId', user!.uid);

    const response = await saveUpgradeAnalysis(formData);
    
    if (response.error) {
      toast({
        title: 'Erro ao Salvar',
        description: response.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: response.success,
      });
      onFinished();
    }
    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="mb-4">Você precisa estar logado para salvar uma análise.</p>
        <Button asChild>
          <Link href="/login?redirect=/">Fazer Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Análise</Label>
        <Input id="name" name="name" defaultValue={`Análise de Upgrade - ${new Date().toLocaleDateString()}`} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (Opcional)</Label>
        <Textarea id="description" name="description" placeholder="Ex: Análise para meu PC principal antes do upgrade" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Análise
        </Button>
      </DialogFooter>
    </form>
  )
}

export function UpgradeResultDisplay({ result }: UpgradeResultDisplayProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useUser();

  return (
    <Card className="border-primary/30 shadow-sm shadow-primary/10">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl font-headline text-primary">Análise de Upgrade</CardTitle>
                <CardDescription>Aqui está a análise da IA para sua máquina e as sugestões de upgrade.</CardDescription>
            </div>
            {user && (
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Bookmark className="mr-2" /> Salvar Análise
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Salvar Análise de Upgrade</DialogTitle>
                            <DialogDescription>
                                Dê um nome para esta análise para salvá-la em "Minhas Builds".
                            </DialogDescription>
                        </DialogHeader>
                        <SaveUpgradeForm result={result} onFinished={() => setIsFormOpen(false)} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Valor Estimado do seu PC Atual</p>
            <p className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(result.currentValue)}
            </p>
          </div>
          <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
            <p className="text-sm text-muted-foreground mb-1">Custo Estimado do Upgrade</p>
            <p className="text-3xl font-bold text-accent">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(result.upgradeCost)}
            </p>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <AiResponseDisplay content={result.suggestedUpgrades} />
      </CardContent>
    </Card>
  );
}
