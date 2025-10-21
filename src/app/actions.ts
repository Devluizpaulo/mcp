
'use server';

import { z } from 'zod';
import { suggestUpgradesBasedOnExistingComponents } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import type { SuggestUpgradesBasedOnExistingComponentsOutput } from '@/ai/flows/suggest--based-on-existing-components';
import { generateOptimizedBuildFromBudget } from '@/ai/flows/generate-optimized-build-from-budget';
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';
import { getComponentDetails as getComponentDetailsFlow } from '@/ai/flows/get-component-details';
import { componentsData } from '@/lib/components-data';
import { chat as chatFlow } from '@/ai/flows/chat';
import type { ChatInput } from '@/ai/flows/chat';

export interface UpgradeState {
  form: {
    existingComponents: string;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  result?: SuggestUpgradesBasedOnExistingComponentsOutput;
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

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const findLabel = (category: keyof typeof componentsData, value: string) => {
    if (!value) return value;
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
      result: result,
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

export async function getComponentDetails(componentName: string, category: keyof typeof componentsData) {
  if (!componentName) {
    return { error: 'Nome do componente não fornecido.' };
  }
  
  const label = findLabel(category, componentName);

  try {
    const result = await getComponentDetailsFlow({ componentName: label });
    return { details: result.details };
  } catch (error) {
    console.error(error);
    return { error: 'Falha ao buscar detalhes do componente.' };
  }
}

export async function getChatResponse(messages: ChatMessage[]) {
    if (!messages || messages.length === 0) {
        return { error: 'Nenhuma mensagem fornecida.' };
    }

    try {
        const input: ChatInput = { history: messages };
        const result = await chatFlow(input);
        return { response: result.response };
    } catch (error) {
        console.error(error);
        return { error: 'Falha ao obter resposta do chat.' };
    }
}
