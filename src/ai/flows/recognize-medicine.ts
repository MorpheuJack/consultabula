'use server';

/**
 * @fileOverview An AI agent to recognize a medicine from a photo.
 *
 * - recognizeMedicineFromPhoto - A function that handles the medicine recognition process from a photo.
 * - RecognizeMedicineFromPhotoInput - The input type for the recognizeMedicineFromPhoto function.
 * - RecognizeMedicineFromPhotoOutput - The return type for the recognizeMedicineFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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


export async function recognizeMedicineFromPhoto(input: RecognizeMedicineFromPhotoInput): Promise<RecognizeMedicineFromPhotoOutput> {
  return recognizeMedicineFromPhotoFlow(input);
}

const needsMoreInfoTool = ai.defineTool({
  name: 'needsMoreInfo',
  description: 'Decides if more external information is needed for accurate medicine recognition and description.',
  inputSchema: z.object({
    reason: z.string().describe('The reason why more information is needed.'),
  }),
  outputSchema: z.boolean().describe('True if more information is needed, false otherwise.'),
}, async (input) => {
  // In a real implementation, this would consult an external source or expert.
  // For this example, we'll just return true.
  return true;
});

const prompt = ai.definePrompt({
  name: 'recognizeMedicineFromPhotoPrompt',
  input: {schema: RecognizeMedicineFromPhotoInputSchema},
  output: {schema: RecognizeMedicineFromPhotoOutputSchema},
  tools: [needsMoreInfoTool],
  prompt: `You are an AI assistant specializing in identifying medicines from photos and providing information about them.

  Analyze the provided photo of the medicine and extract as much information as possible.
  If the user's question asks about a medicine, identify it and provide its uses, contraindications, and other relevant details.
  Use the needsMoreInfo tool if you need more information to accurately identify the medicine or its details.
  Photo: {{media url=photoDataUri}}
  `,
});

const recognizeMedicineFromPhotoFlow = ai.defineFlow(
  {
    name: 'recognizeMedicineFromPhotoFlow',
    inputSchema: RecognizeMedicineFromPhotoInputSchema,
    outputSchema: RecognizeMedicineFromPhotoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
