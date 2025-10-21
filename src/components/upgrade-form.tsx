
'use client';

import { useActionState, useEffect, useState } from 'react';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { ComponentSelector } from './component-selector';
import { UpgradeResultDisplay } from './upgrade-result-display';

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
    <form action={formAction} className="space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          <ComponentSelector category="cpu" label="Processador (CPU)" value={cpu} onChange={setCpu} />
          <ComponentSelector category="cooler" label="Cooler do Processador" value={cooler} onChange={setCooler} />
          <ComponentSelector category="gpu" label="Placa de Vídeo (GPU)" value={gpu} onChange={setGpu} />
          <ComponentSelector category="motherboard" label="Placa-mãe" value={motherboard} onChange={setMotherboard} />
          <ComponentSelector category="ram" label="Memória RAM" value={ram} onChange={setRam} />
          <ComponentSelector category="storage" label="Armazenamento (SSD/HD)" value={storage} onChange={setStorage} />
          <ComponentSelector category="psu" label="Fonte (PSU)" value={psu} onChange={setPsu} />
          <ComponentSelector category="case" label="Gabinete" value={caseComponent} onChange={setCaseComponent} />
        </div>
      </div>
      
      <div>
        <SubmitButton className="w-full sm:w-auto" size="lg">
          Obter Sugestões de Upgrade
        </SubmitButton>
      </div>

      {state.status === 'success' && state.result && (
        <div className="pt-6">
           <UpgradeResultDisplay result={state.result} />
        </div>
      )}
    </form>
  );
}
