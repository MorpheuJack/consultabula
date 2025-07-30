'use server';

/**
 * @fileOverview This file defines the Genkit flow for providing medicine information to the user, including its uses, contraindications, and other relevant details.
 *
 * - provideMedicineInformation - A function that handles the process of providing medicine information.
 * - ProvideMedicineInformationInput - The input type for the provideMedicineInformation function.
 * - ProvideMedicineInformationOutput - The return type for the provideMedicineInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function provideMedicineInformation(
  input: ProvideMedicineInformationInput
): Promise<ProvideMedicineInformationOutput> {
  return provideMedicineInformationFlow(input);
}

const medicineInformationPrompt = ai.definePrompt({
  name: 'medicineInformationPrompt',
  input: {schema: ProvideMedicineInformationInputSchema},
  output: {schema: ProvideMedicineInformationOutputSchema},
  prompt: `You are a helpful AI assistant providing information about medicines.

  Provide a summary of the medicine's uses, contraindications, and other relevant details based on the provided medicine name.

  Medicine Name: {{{medicineName}}}
  Additional Details: {{{additionalDetails}}}

  Please provide the information in a structured format.

  Make sure to include uses and contraindications.
`,
});

const provideMedicineInformationFlow = ai.defineFlow(
  {
    name: 'provideMedicineInformationFlow',
    inputSchema: ProvideMedicineInformationInputSchema,
    outputSchema: ProvideMedicineInformationOutputSchema,
  },
  async input => {
    const {output} = await medicineInformationPrompt(input);
    return output!;
  }
);
