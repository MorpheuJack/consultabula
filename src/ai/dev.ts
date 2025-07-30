import { config } from 'dotenv';
config();

// Note: recognize-medicine is now using groq-sdk directly.
// No Genkit flow to register.
import '@/ai/flows/provide-medicine-information.ts';
