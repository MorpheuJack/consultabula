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
        content: `You are a helpful AI assistant providing information about medicines. Your response MUST be a valid JSON object.
        Provide a summary of the medicine's uses, contraindications, and other relevant details based on the provided medicine name.
        The JSON object must have a single key "medicineInformation" which contains an object with the following keys: "uses", "contraindications", and optionally "sideEffects", "dosage", and "warnings".
        Do not include any text outside of the JSON object.`
      },
      {
        role: 'user',
        content: `Medicine Name: ${input.medicineName}
        Additional Details: ${input.additionalDetails || 'N/A'}`
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
