
'use client';

import { useActionState, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { AiResponseDisplay } from './ai-response-display';
import { Cpu, CircuitBoard, MemoryStick, Puzzle, HardDrive, PcCase, Power, Fan } from 'lucide-react';
import { Combobox } from './combobox';
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
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="cpu" className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-muted-foreground" />
            Processador (CPU)
          </Label>
          <Combobox
            name="cpu"
            items={componentsData.cpu}
            value={cpu}
            onChange={setCpu}
            placeholder="Selecione uma CPU"
            searchPlaceholder="Procurar CPU..."
            emptyPlaceholder="Nenhuma CPU encontrada."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="cooler" className="flex items-center gap-2">
            <Fan className="h-5 w-5 text-muted-foreground" />
            Cooler do Processador
          </Label>
          <Combobox
            name="cooler"
            items={componentsData.cooler}
            value={cooler}
            onChange={setCooler}
            placeholder="Selecione um Cooler"
            searchPlaceholder="Procurar Cooler..."
            emptyPlaceholder="Nenhum Cooler encontrado."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="gpu" className="flex items-center gap-2">
            <Puzzle className="h-5 w-5 text-muted-foreground" />
            Placa de Vídeo (GPU)
          </Label>
          <Combobox
            name="gpu"
            items={componentsData.gpu}
            value={gpu}
            onChange={setGpu}
            placeholder="Selecione uma GPU"
            searchPlaceholder="Procurar GPU..."
            emptyPlaceholder="Nenhuma GPU encontrada."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="motherboard" className="flex items-center gap-2">
            <CircuitBoard className="h-5 w-5 text-muted-foreground" />
            Placa-mãe
          </Label>
          <Combobox
            name="motherboard"
            items={componentsData.motherboard}
            value={motherboard}
            onChange={setMotherboard}
            placeholder="Selecione uma Placa-mãe"
            searchPlaceholder="Procurar Placa-mãe..."
            emptyPlaceholder="Nenhuma Placa-mãe encontrada."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="ram" className="flex items-center gap-2">
            <MemoryStick className="h-5 w-5 text-muted-foreground" />
            Memória RAM
          </Label>
          <Combobox
            name="ram"
            items={componentsData.ram}
            value={ram}
            onChange={setRam}
            placeholder="Selecione uma RAM"
            searchPlaceholder="Procurar RAM..."
            emptyPlaceholder="Nenhuma RAM encontrada."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storage" className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-muted-foreground" />
            Armazenamento (SSD/HD)
          </Label>
          <Combobox
            name="storage"
            items={componentsData.storage}
            value={storage}
            onChange={setStorage}
            placeholder="Selecione um Armazenamento"
            searchPlaceholder="Procurar Armazenamento..."
            emptyPlaceholder="Nenhum Armazenamento encontrado."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="psu" className="flex items-center gap-2">
            <Power className="h-5 w-5 text-muted-foreground" />
            Fonte (PSU)
          </Label>
           <Combobox
            name="psu"
            items={componentsData.psu}
            value={psu}
            onChange={setPsu}
            placeholder="Selecione uma Fonte"
            searchPlaceholder="Procurar Fonte..."
            emptyPlaceholder="Nenhuma Fonte encontrada."
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="case" className="flex items-center gap-2">
            <PcCase className="h-5 w-5 text-muted-foreground" />
            Gabinete
          </Label>
           <Combobox
            name="case"
            items={componentsData.case}
            value={caseComponent}
            onChange={setCaseComponent}
            placeholder="Selecione um Gabinete"
            searchPlaceholder="Procurar Gabinete..."
            emptyPlaceholder="Nenhum Gabinete encontrado."
          />
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
