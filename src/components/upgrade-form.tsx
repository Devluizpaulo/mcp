
'use client';

import { useActionState, useEffect, useState } from 'react';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { AiResponseDisplay } from './ai-response-display';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ComponentSelector } from './component-selector';
import { componentsData } from '@/lib/components-data';

const initialState: UpgradeState = {
  form: {
    existingComponents: '',
  },
  status: 'idle',
  message: '',
};

export function UpgradeForm() {
  const [state, formAction] = useActionState(getUpgradeSuggestions, initialState);
  const { toast } = useToast();

  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [motherboard, setMotherboard] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [psu, setPsu] = useState('');
  const [caseComponent, setCaseComponent] = useState('');
  const [cooler, setCooler] = useState('');

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        title: 'Erro de Validação',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.status === 'idle' || state.status === 'success') {
       try {
        const initial = JSON.parse(state.form.existingComponents || '{}');
        setCpu(initial.cpu || '');
        setGpu(initial.gpu || '');
        setMotherboard(initial.motherboard || '');
        setRam(initial.ram || '');
        setStorage(initial.storage || '');
        setPsu(initial.psu || '');
        setCaseComponent(initial.case || '');
        setCooler(initial.cooler || '');
      } catch (e) {
        setCpu('');
        setGpu('');
        setMotherboard('');
        setRam('');
        setStorage('');
        setPsu('');
        setCaseComponent('');
        setCooler('');
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentSelector category="cpu" label="Processador (CPU)" value={cpu} onChange={setCpu} data={componentsData.cpu} />
        <ComponentSelector category="cooler" label="Cooler do Processador" value={cooler} onChange={setCooler} data={componentsData.cooler} />
        <ComponentSelector category="gpu" label="Placa de Vídeo (GPU)" value={gpu} onChange={setGpu} data={componentsData.gpu} />
        <ComponentSelector category="motherboard" label="Placa-mãe" value={motherboard} onChange={setMotherboard} data={componentsData.motherboard} />
        <ComponentSelector category="ram" label="Memória RAM" value={ram} onChange={setRam} data={componentsData.ram} />
        <ComponentSelector category="storage" label="Armazenamento (SSD/HD)" value={storage} onChange={setStorage} data={componentsData.storage} />
        <ComponentSelector category="psu" label="Fonte (PSU)" value={psu} onChange={setPsu} data={componentsData.psu} />
        <ComponentSelector category="case" label="Gabinete" value={caseComponent} onChange={setCaseComponent} data={componentsData.case} />
      </div>
      <SubmitButton className="w-full sm:w-auto bg-accent hover:bg-accent/90">
        Obter Sugestões de Upgrade
      </SubmitButton>

      {state.status === 'success' && state.result && (
        <div className="pt-6">
           <Card className="border-accent">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Análise de Upgrade</CardTitle>
              <CardDescription>Aqui está a análise da IA para sua máquina e as sugestões de upgrade.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4">
                  <p className="text-sm text-muted-foreground">Valor Estimado do seu PC Atual</p>
                  <p className="text-3xl font-bold text-primary">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(state.result.currentValue)}
                  </p>
                </div>
                 <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4">
                  <p className="text-sm text-muted-foreground">Custo Estimado do Upgrade</p>
                  <p className="text-3xl font-bold text-accent">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(state.result.upgradeCost)}
                  </p>
                </div>
              </div>
              <Separator className="my-6" />
              <AiResponseDisplay content={state.result.suggestedUpgrades} />
            </CardContent>
           </Card>
        </div>
      )}
    </form>
  );
}
