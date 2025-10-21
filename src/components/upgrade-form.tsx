
'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { AiResponseDisplay } from './ai-response-display';
import { Cpu, CircuitBoard, MemoryStick, Puzzle, HardDrive } from 'lucide-react';

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

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        title: 'Erro de Validação',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  const initialComponents = (() => {
    try {
      return JSON.parse(state.form.existingComponents);
    } catch (e) {
      return {
        cpu: '',
        gpu: '',
        motherboard: '',
        ram: '',
        storage: ''
      };
    }
  })();


  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="cpu">Processador (CPU)</Label>
          <div className="relative">
            <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="cpu" name="cpu" placeholder="Ex: Intel i5-9400F" className="pl-10" defaultValue={initialComponents.cpu} />
          </div>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="gpu">Placa de Vídeo (GPU)</Label>
          <div className="relative">
            <Puzzle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="gpu" name="gpu" placeholder="Ex: Nvidia GTX 1660 Super" className="pl-10" defaultValue={initialComponents.gpu}/>
          </div>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="motherboard">Placa-mãe</Label>
          <div className="relative">
            <CircuitBoard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="motherboard" name="motherboard" placeholder="Ex: B360M" className="pl-10" defaultValue={initialComponents.motherboard}/>
          </div>
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="ram">Memória RAM</Label>
           <div className="relative">
            <MemoryStick className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="ram" name="ram" placeholder="Ex: 16GB DDR4 3200MHz" className="pl-10" defaultValue={initialComponents.ram}/>
          </div>
        </div>
        <div className="grid w-full items-center gap-2 md:col-span-2">
          <Label htmlFor="storage">Armazenamento (SSD/HD)</Label>
           <div className="relative">
            <HardDrive className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input id="storage" name="storage" placeholder="Ex: SSD NVMe 1TB, HD 2TB" className="pl-10" defaultValue={initialComponents.storage}/>
          </div>
        </div>
      </div>
      <SubmitButton className="w-full sm:w-auto bg-accent hover:bg-accent/90">
        Obter Sugestões de Upgrade
      </SubmitButton>

      {state.status === 'success' && state.suggestions && (
        <div className="pt-6">
          <AiResponseDisplay content={state.suggestions} />
        </div>
      )}
    </form>
  );
}
