
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getNewBuild, type BuildState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { BuildDisplay } from './build-display';

const initialState: BuildState = {
  form: {
    budget: '',
    intendedUse: '',
    existingComponents: '',
  },
  status: 'idle',
  message: '',
};

export function BuildForm() {
  const [state, formAction] = useFormState(getNewBuild, initialState);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="budget">Orçamento (USD)</Label>
          <Input 
            type="number" 
            id="budget" 
            name="budget" 
            placeholder="Ex: 1500" 
            required 
            defaultValue={state.form.budget}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="intendedUse">Uso Pretendido</Label>
          <Select name="intendedUse" required defaultValue={state.form.intendedUse}>
            <SelectTrigger id="intendedUse">
              <SelectValue placeholder="Selecione um uso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gaming">Jogos</SelectItem>
              <SelectItem value="Video Editing">Edição de Vídeo</SelectItem>
              <SelectItem value="Work">Trabalho</SelectItem>
              <SelectItem value="General Use">Uso Geral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-full gap-2">
        <Label htmlFor="existingComponentsBuild">Componentes Existentes (Opcional)</Label>
        <Textarea
          id="existingComponentsBuild"
          name="existingComponents"
          placeholder="Liste os componentes que você já possui e quer aproveitar..."
          defaultValue={state.form.existingComponents}
        />
      </div>
      <SubmitButton className="w-full sm:w-auto bg-accent hover:bg-accent/90">
        Gerar Nova Configuração
      </SubmitButton>

      {state.status === 'success' && state.build && (
        <div className="pt-6">
          <BuildDisplay build={state.build} />
        </div>
      )}
    </form>
  );
}
