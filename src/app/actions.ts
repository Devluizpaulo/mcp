
'use server';

import { z } from 'zod';
import { suggestUpgradesBasedOnExistingComponents } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import { generateOptimizedBuildFromBudget } from '@/ai/flows/generate-optimized-build-from-budget';
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';
import { componentsData } from '@/lib/components-data';

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

const findLabel = (category: keyof typeof componentsData, value: string) => {
    const items = componentsData[category];
    const item = items.flatMap(group => group.items).find(i => i.value.toLowerCase() === value.toLowerCase());
    return item ? item.label : value;
};

const upgradeSchema = z.object({
  cpu: z.string().min(1, 'Por favor, selecione seu processador (CPU).'),
  cooler: z.string().min(1, 'Por favor, selecione seu cooler.'),
  gpu: z.string().min(1, 'Por favor, selecione sua placa de vídeo (GPU).'),
  motherboard: z.string().min(1, 'Por favor, selecione sua placa-mãe.'),
  ram: z.string().min(1, 'Por favor, selecione sua memória RAM.'),
  storage: z.string().min(1, 'Por favor, selecione seu armazenamento.'),
  psu: z.string().min(1, 'Por favor, selecione sua fonte de alimentação (PSU).'),
  case: z.string().min(1, 'Por favor, selecione seu gabinete.'),
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
  
  const components = {
    cpu: formData.get('cpu') as string,
    cooler: formData.get('cooler') as string,
    gpu: formData.get('gpu') as string,
    motherboard: formData.get('motherboard') as string,
    ram: formData.get('ram') as string,
    storage: formData.get('storage') as string,
    psu: formData.get('psu') as string,
    case: formData.get('case') as string,
  };
  
  const jsonComponents = JSON.stringify(components);

  const validatedFields = upgradeSchema.safeParse(components);

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      ...prevState,
      status: 'error',
      message: firstError || "Erro de validação",
      form: { existingComponents: jsonComponents },
    };
  }
  
  const existingComponentsString = Object.entries(validatedFields.data)
      .map(([key, value]) => {
          if (!value) return null;
          const label = findLabel(key as keyof typeof componentsData, value);
          return `${key.toUpperCase()}: ${label}`;
      })
      .filter(Boolean)
      .join(', ');

  try {
    const result = await suggestUpgradesBasedOnExistingComponents({
      existingComponents: existingComponentsString,
    });
    return {
      ...prevState,
      status: 'success',
      message: 'Sugestões geradas com sucesso!',
      suggestions: result.suggestedUpgrades,
      form: { existingComponents: jsonComponents },
    };
  } catch (error) {
    return {
      ...prevState,
      status: 'error',
      message: 'Ocorreu um erro ao gerar sugestões. Por favor, tente novamente.',
      form: { existingComponents: jsonComponents },
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
