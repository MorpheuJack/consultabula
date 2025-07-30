'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {groq} from 'genkitx-groq';

export const ai = genkit({
  plugins: [
    groq({
      apiKey: process.env.GROQ_API_KEY || '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',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
