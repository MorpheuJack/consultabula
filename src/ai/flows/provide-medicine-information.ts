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
  usos: z.object({
    primarios: z.string(),
    secundarios: z.string(),
  }),
  contraindicacoes: z.string(),
  efeitosColaterais: z.object({
    comuns: z.string(),
    rarosMasGraves: z.string(),
  }),
  dosagem: z.string(),
  avisos: z.string(),
});

const ProvideMedicineInformationOutputSchema = z.object({
  medicamento: z.object({
    nomePesquisado: z.string(),
    encontrado: z.boolean(),
    principioAtivo: z.string().nullable(),
    nomesComerciaisComuns: z.array(z.string()).nullable(),
    informacoes: MedicineInformationSchema.nullable(),
    disclaimer: z.string(),
  }),
});
export type ProvideMedicineInformationOutput = z.infer<typeof ProvideMedicineInformationOutputSchema>;

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

export async function provideMedicineInformation(
  input: ProvideMedicineInformationInput
): Promise<ProvideMedicineInformationOutput> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Você é o "FarmaBot", um assistente de IA especialista em farmacologia. Sua única função é receber o nome de um medicamento e retornar um objeto JSON estritamente formatado. Não inclua NENHUM texto, comentário ou explicação fora do objeto JSON. Sua resposta DEVE começar com \`{\` e terminar com \`}\`.

A estrutura do JSON é:
{
  "medicamento": {
    "nomePesquisado": (String) O nome que o usuário pesquisou,
    "encontrado": (Boolean) \`true\` se o medicamento foi identificado, \`false\` caso contrário,
    "principioAtivo": (String | null) O princípio ativo do medicamento,
    "nomesComerciaisComuns": (Array de Strings | null) Nomes comerciais comuns no Brasil,
    "informacoes": (Objeto | null) Detalhes do medicamento. Será \`null\` se "encontrado" for \`false\`. A estrutura é: {
      "usos": { "primarios": (String), "secundarios": (String) },
      "contraindicacoes": (String),
      "efeitosColaterais": { "comuns": (String), "rarosMasGraves": (String) },
      "dosagem": (String),
      "avisos": (String)
    },
    "disclaimer": "Esta informação é para fins educativos e não substitui a orientação de um profissional de saúde. Sempre consulte seu médico ou farmacêutico antes de iniciar, alterar ou interromper qualquer tratamento."
  }
}

Se o medicamento não for reconhecido, defina \`encontrado: false\` e os campos relevantes como \`null\`.
`
      },
      {
        role: 'user',
        content: `Nome do Medicamento: ${input.medicineName}
        Detalhes Adicionais: ${input.additionalDetails || 'Nenhum'}`
      }
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
    const validatedOutput = ProvideMedicineInformationOutputSchema.parse(parsedJson);
    return validatedOutput;
  } catch (error) {
    console.error("Error parsing or validating AI response:", error);
    console.error("Invalid response content:", responseContent);
    throw new Error("The AI returned an invalid response format.");
  }
}
