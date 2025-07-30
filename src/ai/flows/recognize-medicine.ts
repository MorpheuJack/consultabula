'use server';

/**
 * @fileOverview An AI agent to recognize a medicine from a photo.
 *
 * - recognizeMedicineFromPhoto - A function that handles the medicine recognition process from a photo.
 * - RecognizeMedicineFromPhotoInput - The input type for the recognizeMedicineFromPhoto function.
 * - RecognizeMedicineFromPhotoOutput - The return type for the recognizeMedicineFromPhoto function.
 */

import {z} from 'genkit';
import Groq from 'groq-sdk';

const RecognizeMedicineFromPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a medicine, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecognizeMedicineFromPhotoInput = z.infer<typeof RecognizeMedicineFromPhotoInputSchema>;

const MedicineInfoSchema = z.object({
  name: z.string().describe('The name of the medicine.'),
  uses: z.string().describe('The uses of the medicine.'),
  contraindications: z.string().describe('The contraindications of the medicine.'),
  sideEffects: z.string().describe('The possible side effects of the medicine.'),
  dosage: z.string().describe('The dosage of the medicine.'),
  warnings: z.string().describe('Any warnings or precautions for the medicine.'),
});

const RecognizeMedicineFromPhotoOutputSchema = z.object({
  medicineInfo: MedicineInfoSchema.describe('Information about the medicine.'),
});
export type RecognizeMedicineFromPhotoOutput = z.infer<typeof RecognizeMedicineFromPhotoOutputSchema>;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

function extractJson(text: string): string | null {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*}|\[[\s\S]*\])/;
  const match = text.match(jsonRegex);
  if (match) {
    return match[1] || match[2];
  }
  return null;
}

export async function recognizeMedicineFromPhoto(input: RecognizeMedicineFromPhotoInput): Promise<RecognizeMedicineFromPhotoOutput> {
  const completion = await groq.chat.completions.create({
    messages: [
        {
            role: 'system',
            content: `Sua única função é analisar a imagem de um medicamento e retornar um objeto JSON. A resposta DEVE ser apenas o JSON, começando com \`{\` e terminando com \`}\`.

A estrutura do JSON é:
{
  "medicineInfo": {
    "name": (String) O nome do medicamento na imagem,
    "uses": (String) Usos primários e secundários,
    "contraindications": (String) Contraindicações e interações,
    "sideEffects": (String) Efeitos colaterais comuns e graves,
    "dosage": (String) Informações de dosagem,
    "warnings": (String) Avisos e precauções importantes
  }
}
`
        },
        {
            role: 'user',
            content: [
                {
                    type: 'image_url',
                    image_url: {
                        url: input.photoDataUri,
                    },
                },
                {
                    type: 'text',
                    text: 'Identifique este medicamento e retorne as informações no formato JSON solicitado.'
                }
            ],
        },
    ],
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    max_tokens: 4096,
    top_p: 1,
  });

  const responseContent = completion.choices[0]?.message?.content;
  if (!responseContent) {
    throw new Error('Failed to get a response from the model.');
  }

  const jsonString = extractJson(responseContent);
  if (!jsonString) {
      console.error("No JSON found in AI response:", responseContent);
      throw new Error("The AI returned an invalid response format.");
  }

  try {
    const parsedJson = JSON.parse(jsonString);
    const validatedOutput = RecognizeMedicineFromPhotoOutputSchema.parse(parsedJson);
    return validatedOutput;
  } catch (error) {
    console.error("Error parsing or validating AI response:", error);
    console.error("Invalid response content:", responseContent);
    throw new Error("The AI returned an invalid response format.");
  }
}
