'use server';

/**
 * @fileOverview This file defines the Genkit flow for providing medicine information to the user, including its uses, contraindications, and other relevant details.
 *
 * - provideMedicineInformation - A function that handles the process of providing medicine information.
 * - ProvideMedicineInformationInput - The input type for the provideMedicineInformation function.
 * - ProvideMedicineInformationOutput - The return type for the provideMedicineInformation function.
 */

import {z} from 'genkit';
import Groq from 'groq-sdk';

const ProvideMedicineInformationInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details provided by the user.'),
});
export type ProvideMedicineInformationInput = z.infer<typeof ProvideMedicineInformationInputSchema>;

const MedicineInformationSchema = z.object({
  uses: z.string().describe('The uses of the medicine.'),
  contraindications: z.string().describe('The contraindications of the medicine.'),
  sideEffects: z.string().describe('The side effects of the medicine.').optional(),
  dosage: z.string().describe('Recommended dosage of the medicine.').optional(),
  warnings: z.string().describe('Important warnings related to the medicine.').optional(),
});

const ProvideMedicineInformationOutputSchema = z.object({
  medicineInformation: MedicineInformationSchema.describe(
    'Detailed information about the medicine.'
  ),
});
export type ProvideMedicineInformationOutput = z.infer<typeof ProvideMedicineInformationOutputSchema>;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function provideMedicineInformation(
  input: ProvideMedicineInformationInput
): Promise<ProvideMedicineInformationOutput> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Você é um assistente de IA especialista em farmácia, e sua função é fornecer informações detalhadas sobre medicamentos em português do Brasil. Sua resposta DEVE ser um objeto JSON válido, sem nenhum texto adicional fora dele.
        Analise o nome do medicamento e os detalhes adicionais fornecidos pelo usuário para gerar um resumo completo.
        O objeto JSON de saída deve ter uma única chave "medicineInformation". O valor dessa chave deve ser outro objeto contendo as seguintes chaves:
        - "uses": (String) Descreva os usos primários e secundários do medicamento de forma clara.
        - "contraindications": (String) Liste todas as contraindicações conhecidas, incluindo condições médicas e interações medicamentosas perigosas.
        - "sideEffects": (String, opcional) Detalhe os efeitos colaterais mais comuns e também os mais raros, mas graves.
        - "dosage": (String, opcional) Forneça informações sobre a dosagem recomendada para diferentes faixas etárias (adultos, crianças), se aplicável.
        - "warnings": (String, opcional) Inclua avisos importantes, precauções, informações sobre superdosagem e o que fazer em caso de esquecimento de uma dose.
        Sua resposta deve ser exclusivamente um objeto JSON, começando com { e terminando com }.`
      },
      {
        role: 'user',
        content: `Nome do Medicamento: ${input.medicineName}
        Detalhes Adicionais: ${input.additionalDetails || 'Nenhum'}`
      }
    ],
    model: 'llama3-70b-8192',
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    response_format: { type: 'json_object' },
  });

  const responseContent = completion.choices[0]?.message?.content;
  if (!responseContent) {
    throw new Error('Failed to get a response from the model.');
  }

  try {
    const parsedJson = JSON.parse(responseContent);
    const validatedOutput = ProvideMedicineInformationOutputSchema.parse(parsedJson);
    return validatedOutput;
  } catch (error) {
    console.error("Error parsing or validating AI response:", error);
    console.error("Invalid response content:", responseContent);
    throw new Error("The AI returned an invalid response format.");
  }
}
