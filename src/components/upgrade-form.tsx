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
import { ComponentDetailsDialog } from './component-details-dialog';

const initialState: UpgradeState = {
  form: {
    existingComponents: '',
  },
  status: 'idle',
  message: '',
};

const findLabel = (category: keyof typeof componentsData, value: string) => {
    if (!value) return '';
    const items = componentsData[category];
    const item = items.flatMap(group => group.items).find(i => i.value.toLowerCase() === value.toLowerCase());
    return item ? item.label : value;
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

  const renderComboboxWithDetails = (
    category: keyof typeof componentsData,
    icon: React.ElementType,
    label: string,
    value: string,
    onChange: (value: string) => void
  ) => {
    const Icon = icon;
    return (
      <div className="grid w-full items-center gap-2">
        <Label htmlFor={category} className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {label}
        </Label>
        <div className="flex items-center gap-2">
          <Combobox
            name={category}
            items={componentsData[category]}
            value={value}
            onChange={onChange}
            placeholder={`Selecione um(a) ${label}`}
            searchPlaceholder={`Procurar ${label}...`}
            emptyPlaceholder={`Nenhum(a) ${label} encontrado(a).`}
          />
          <ComponentDetailsDialog
            componentValue={value}
            componentLabel={findLabel(category, value)}
            category={category}
            disabled={!value}
          />
        </div>
      </div>
    );
  };
  
  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderComboboxWithDetails('cpu', Cpu, 'Processador (CPU)', cpu, setCpu)}
        {renderComboboxWithDetails('cooler', Fan, 'Cooler do Processador', cooler, setCooler)}
        {renderComboboxWithDetails('gpu', Puzzle, 'Placa de Vídeo (GPU)', gpu, setGpu)}
        {renderComboboxWithDetails('motherboard', CircuitBoard, 'Placa-mãe', motherboard, setMotherboard)}
        {renderComboboxWithDetails('ram', MemoryStick, 'Memória RAM', ram, setRam)}
        {renderComboboxWithDetails('storage', HardDrive, 'Armazenamento (SSD/HD)', storage, setStorage)}
        {renderComboboxWithDetails('psu', Power, 'Fonte (PSU)', psu, setPsu)}
        {renderComboboxWithDetails('case', PcCase, 'Gabinete', caseComponent, setCaseComponent)}
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
