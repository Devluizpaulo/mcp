
'use server';

import { z } from 'zod';
import { suggestUpgradesBasedOnExistingComponents } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import type { SuggestUpgradesBasedOnExistingComponentsOutput } from '@/ai/flows/suggest-upgrades-based-on-existing-components';
import { generateOptimizedBuildFromBudget } from '@/ai/flows/generate-optimized-build-from-budget';
import type { GenerateOptimizedBuildOutput } from '@/ai/flows/generate-optimized-build-from-budget';
import { getComponentDetails as getComponentDetailsFlow } from '@/ai/flows/get-component-details';
import { chat as chatFlow } from '@/ai/flows/chat';
import type { ChatInput } from '@/ai/flows/chat';
import { initializeServerFirebase } from '@/firebase/server-init';

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

export interface Component {
  id: string;
  name: string;
  type: string;
}

const upgradeSchema = z.object({
  existingComponents: z.string().min(10, 'Por favor, liste pelo menos um componente para análise.'),
});

const buildSchema = z.object({
  budget: z.coerce.number().min(100, 'O orçamento deve ser de pelo menos 100 USD.'),
  intendedUse: z.string().min(1, 'Por favor, selecione o uso pretendido.'),
  existingComponents: z.string().optional(),
});

const saveConfigBaseSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: z.string().optional(),
  userId: z.string(),
  aiResponse: z.string(),
});

const saveBuildSchema = saveConfigBaseSchema.extend({
  totalCost: z.coerce.number(),
  performanceScore: z.coerce.number(),
});

const saveUpgradeSchema = saveConfigBaseSchema.extend({
    upgradeCost: z.coerce.number(),
    currentValue: z.coerce.number(),
});


export async function getUpgradeSuggestions(
  prevState: UpgradeState,
  formData: FormData
): Promise<UpgradeState> {
  
  const existingComponents = formData.get('existingComponents') as string;

  const validatedFields = upgradeSchema.safeParse({ existingComponents });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      ...prevState,
      status: 'error',
      message: firstError || "Erro de validação",
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
      result: result,
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

async function saveConfiguration(userId: string, data: any) {
  const { firestore } = await initializeServerFirebase();
  const collectionRef = firestore.collection(`users/${userId}/configurations`);
  
  const { serverTimestamp } = await import('firebase-admin/firestore');
  
  await collectionRef.add({
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function saveNewBuild(formData: FormData) {
  'use server';

  const validatedFields = saveBuildSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    aiResponse: formData.get('aiResponse'),
    totalCost: formData.get('totalCost'),
    performanceScore: formData.get('performanceScore'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return { error: 'Dados inválidos para salvar a build.' };
  }
  
  const { name, description, aiResponse, totalCost, performanceScore, userId } = validatedFields.data;

  try {
    await saveConfiguration(userId, {
      name,
      description: description || 'Build gerada pela IA.',
      aiResponse,
      details: {
        type: 'build',
        totalCost,
        performanceScore,
      },
      componentIds: [],
      peripheralIds: [],
    });
    return { success: 'Build salva com sucesso!' };
  } catch (e) {
    console.error(e);
    return { error: 'Falha ao salvar a build no banco de dados.' };
  }
}

export async function saveUpgradeAnalysis(formData: FormData) {
    'use server';

    const validatedFields = saveUpgradeSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        aiResponse: formData.get('aiResponse'),
        upgradeCost: formData.get('upgradeCost'),
        currentValue: formData.get('currentValue'),
        userId: formData.get('userId'),
    });

    if (!validatedFields.success) {
        return { error: 'Dados inválidos para salvar a análise.' };
    }
    
    const { name, description, aiResponse, upgradeCost, currentValue, userId } = validatedFields.data;

    try {
        await saveConfiguration(userId, {
            name,
            description: description || 'Análise de upgrade gerada pela IA.',
            aiResponse,
            details: {
                type: 'upgrade',
                upgradeCost,
                currentValue,
            },
            componentIds: [],
            peripheralIds: [],
        });
        return { success: 'Análise de upgrade salva com sucesso!' };
    } catch (e) {
        console.error(e);
        return { error: 'Falha ao salvar a análise no banco de dados.' };
    }
}


export async function getComponentDetails(componentName: string) {
  if (!componentName) {
    return { error: 'Nome do componente não fornecido.' };
  }
  
  try {
    const result = await getComponentDetailsFlow({ componentName: componentName });
    return { details: result.details };
  } catch (error) {
    console.error(error);
    return { error: 'Falha ao buscar detalhes do componente.' };
  }
}

export async function getComponentsByType(type: string): Promise<{ data?: Component[]; error?: string }> {
  if (!type) {
    return { error: 'Tipo de componente não fornecido.' };
  }

  try {
    const { firestore } = await initializeServerFirebase();
    const componentsCollection = firestore.collection('components');
    const querySnapshot = await componentsCollection.where('type', '==', type).get();
    
    if (querySnapshot.empty) {
      return { data: [] };
    }

    const components = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Component[];

    return { data: components };
  } catch (error: any) {
    console.error(`Falha ao buscar componentes do tipo ${type}:`, error);
    return { error: `Falha ao buscar componentes do tipo ${type}.` };
  }
}

export async function getChatResponse(messages: ChatMessage[]) {
    if (!messages || messages.length === 0) {
        return { error: 'Nenhuma mensagem fornecida.' };
    }

    try {
        const input: ChatInput = { history: messages };
        const result = await chatFlow(input);
        return { response: result.response as string };
    } catch (error) {
        console.error(error);
        return { error: 'Falha ao obter resposta do chat.' };
    }
}
