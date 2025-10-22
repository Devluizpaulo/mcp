
'use client';

import { useActionState, useEffect } from 'react';
import { getUpgradeSuggestions, type UpgradeState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { UpgradeResultDisplay } from './upgrade-result-display';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-4">
        <div className="grid w-full gap-2">
            <Label htmlFor="existingComponents">Seus Componentes Atuais</Label>
            <Textarea
                id="existingComponents"
                name="existingComponents"
                placeholder="Ex: CPU: Intel i5-9400F, Placa de Vídeo: NVIDIA GTX 1660, RAM: 16GB DDR4 2666MHz..."
                rows={5}
                defaultValue={state.form.existingComponents}
            />
            <p className="text-sm text-muted-foreground">
                Liste os componentes que você conhece. Não precisa ser todos.
            </p>
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
