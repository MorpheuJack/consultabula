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
            content: `Você é um assistente de IA especialista em farmácia, e sua função é fornecer informações detalhadas sobre medicamentos em português do Brasil. Sua resposta DEVE ser um objeto JSON válido, sem nenhum texto adicional fora dele.
            Analise a imagem do medicamento fornecida pelo usuário para identificar o nome e gerar um resumo completo.
            O objeto JSON de saída deve ter uma única chave "medicineInfo". O valor dessa chave deve ser outro objeto contendo as seguintes chaves:
            - "name": (String) Identifique e retorne o nome do medicamento na imagem.
            - "uses": (String) Descreva os usos primários e secundários do medicamento de forma clara.
            - "contraindications": (String) Liste todas as contraindicações conhecidas, incluindo condições médicas e interações medicamentosas perigosas.
            - "sideEffects": (String, opcional) Detalhe os efeitos colaterais mais comuns e também os mais raros, mas graves.
            - "dosage": (String, opcional) Forneça informações sobre a dosagem recomendada para diferentes faixas etárias (adultos, crianças), se aplicável.
            - "warnings": (String, opcional) Inclua avisos importantes, precauções, informações sobre superdosagem e o que fazer em caso de esquecimento de uma dose.
            Sua resposta deve ser exclusivamente um objeto JSON, começando com { e terminando com }.`
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
                    text: 'Por favor, identifique o medicamento nesta imagem e forneça as informações sobre ele no formato JSON solicitado.'
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
