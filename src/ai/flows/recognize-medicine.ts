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

export async function recognizeMedicineFromPhoto(input: RecognizeMedicineFromPhotoInput): Promise<RecognizeMedicineFromPhotoOutput> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Você é um assistente de IA especializado em fornecer informações sobre medicamentos em português do Brasil.
        
        Sua tarefa é fornecer uma saída JSON estruturada com informações sobre um medicamento.
        
        Com base em um exemplo de Paracetamol 750mg, forneça as seguintes informações em um objeto JSON sob a chave "medicineInfo": nome, usos, contraindicações, efeitos colaterais, dosagem e avisos.
        
        Seu resultado DEVE ser exclusivamente um objeto JSON, começando com { e terminando com }, sem nenhum texto adicional fora dele.
        
        Exemplo de saída esperada:
        {
          "medicineInfo": {
            "name": "Paracetamol 750mg",
            "uses": "Indicado para o alívio temporário de febre e de dores de leve a moderada intensidade, como dores de cabeça, dor de dente, dores musculares, cólicas menstruais e dores articulares.",
            "contraindications": "Não deve ser utilizado por pessoas com alergia (hipersensibilidade) ao paracetamol ou a qualquer outro componente da fórmula. Não use com outros medicamentos que contenham paracetamol. Pessoas com doenças no fígado ou rins devem consultar um médico antes de usar.",
            "sideEffects": "As reações adversas são raras, mas podem incluir reações cutâneas como urticária e erupção cutânea. Em casos raros, podem ocorrer alterações sanguíneas.",
            "dosage": "Para adultos e crianças acima de 12 anos, a dose recomendada é de 1 comprimido de 750mg, de 3 a 5 vezes ao dia. Não exceder 5 comprimidos em 24 horas.",
            "warnings": "O uso de doses maiores do que as recomendadas pode causar danos graves ao fígado. Não utilize por mais de 3 dias para febre ou por mais de 7 dias para dor sem orientação médica. O consumo de álcool deve ser evitado durante o tratamento."
          }
        }`,
      },
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
    const validatedOutput = RecognizeMedicineFromPhotoOutputSchema.parse(parsedJson);
    return validatedOutput;
  } catch (error) {
    console.error("Error parsing or validating AI response:", error);
    console.error("Invalid response content:", responseContent);
    throw new Error("The AI returned an invalid response format.");
  }
}
