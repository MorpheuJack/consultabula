import {genkit} from 'genkit';
import {groq} from 'genkitx-groq';

export const ai = genkit({
  plugins: [
    groq({
      apiKey: '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',
    }),
  ],
  model: 'groq/llama3-8b-8192',
});
