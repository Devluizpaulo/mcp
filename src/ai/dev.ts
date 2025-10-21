'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-optimized-build-from-budget.ts';
import '@/ai/flows/suggest-upgrades-based-on-existing-components.ts';
import '@/ai/flows/get-component-details.ts';
import '@/ai/flows/chat.ts';
