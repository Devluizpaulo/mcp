
'use server';

import { z } from 'zod';
import { suggestUpgradesBasedOnExistingComponents } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import { generateOptimizedBuildFromBudget } from '@/ai/flows/generate-optimized-build-from-budget';
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';

export interface UpgradeState {
  form: {
    existingComponents: string;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  suggestions?: string;
}

export interface BuildState {
  form: {
    budget: string;
    intendedUse: string;
    existingComponents: string;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  build?: GenerateOptimizedBuildOutput;
}

const upgradeSchema = z.object({
  existingComponents: z.string().min(10, 'Por favor, liste seus componentes atuais com mais detalhes.'),
});

const buildSchema = z.object({
  budget: z.coerce.number().min(100, 'O orçamento deve ser de pelo menos 100 USD.'),
  intendedUse: z.string().min(1, 'Por favor, selecione o uso pretendido.'),
  existingComponents: z.string().optional(),
});

export async function getUpgradeSuggestions(
  prevState: UpgradeState,
  formData: FormData
): Promise<UpgradeState> {
  const existingComponents = formData.get('existingComponents') as string;

  const validatedFields = upgradeSchema.safeParse({
    existingComponents,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      status: 'error',
      message: validatedFields.error.flatten().fieldErrors.existingComponents?.[0] || "Erro de validação",
      form: { existingComponents },
    };
  }

  try {
    const result = await suggestUpgradesBasedOnExistingComponents({
      existingComponents: validatedFields.data.existingComponents,
    });
    return {
      ...prevState,
      status: 'success',
      message: 'Sugestões geradas com sucesso!',
      suggestions: result.suggestedUpgrades,
      form: { existingComponents },
    };
  } catch (error) {
    return {
      ...prevState,
      status: 'error',
      message: 'Ocorreu um erro ao gerar sugestões. Por favor, tente novamente.',
      form: { existingComponents },
    };
  }
}

export async function getNewBuild(
  prevState: BuildState,
  formData: FormData
): Promise<BuildState> {
    const budget = formData.get('budget') as string;
    const intendedUse = formData.get('intendedUse') as string;
    const existingComponents = (formData.get('existingComponents') as string) || '';

    const validatedFields = buildSchema.safeParse({
        budget,
        intendedUse,
        existingComponents,
    });

  if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors;
      const message = errors.budget?.[0] || errors.intendedUse?.[0] || "Erro de validação";
    return {
      ...prevState,
      status: 'error',
      message: message,
      form: { budget, intendedUse, existingComponents },
    };
  }

  try {
    const result = await generateOptimizedBuildFromBudget({
        budget: validatedFields.data.budget,
        intendedUse: validatedFields.data.intendedUse,
        existingComponents: validatedFields.data.existingComponents,
    });
    return {
      ...prevState,
      status: 'success',
      message: 'Configuração gerada com sucesso!',
      build: result,
      form: { budget, intendedUse, existingComponents },
    };
  } catch (error) {
    return {
      ...prevState,
      status: 'error',
      message: 'Ocorreu um erro ao gerar a configuração. Por favor, tente novamente.',
      form: { budget, intendedUse, existingComponents },
    };
  }
}
