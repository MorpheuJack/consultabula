import {genkit} from 'genkit';
import {config} from 'dotenv';

config();

// All flows are now using groq-sdk directly, so no plugins are needed for Genkit.
export const ai = genkit();
