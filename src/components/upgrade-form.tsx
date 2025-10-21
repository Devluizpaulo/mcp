
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { AiResponseDisplay } from './ai-response-display';

const initialState: UpgradeState = {
  form: {
    existingComponents: '',
  },
  status: 'idle',
  message: '',
};

export function UpgradeForm() {
  const [state, formAction] = useFormState(getUpgradeSuggestions, initialState);
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

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid w-full gap-2">
        <Label htmlFor="existingComponents">Meus Componentes Atuais</Label>
        <Textarea
          id="existingComponents"
          name="existingComponents"
          placeholder="Ex: CPU: Intel i5-9400F, GPU: Nvidia GTX 1660 Super, RAM: 16GB DDR4 3200MHz, Placa-mãe: B360M..."
          className="min-h-[120px]"
          required
          defaultValue={state.form.existingComponents}
        />
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
