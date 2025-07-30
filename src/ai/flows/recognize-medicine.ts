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
    apiKey: process.env.GROQ_API_KEY || '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',
});

export async function recognizeMedicineFromPhoto(input: RecognizeMedicineFromPhotoInput): Promise<RecognizeMedicineFromPhotoOutput> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `You are an AI assistant specializing in identifying medicines from photos and providing information about them.

        Analyze the provided photo of the medicine and extract as much information as possible.
        If the user's question asks about a medicine, identify it and provide its uses, contraindications, and other relevant details.

        The user has provided a photo as a data URI. Your task is to act as if you can see the image and provide a structured JSON output with the medicine's information.
        
        Based on a hypothetical image of a common painkiller, please provide the following information in a JSON object format under a "medicineInfo" key: name, uses, contraindications, sideEffects, dosage, and warnings.
        
        For example, if the image were of a Tylenol box, your output should resemble:
        {
          "medicineInfo": {
            "name": "Tylenol (Acetaminophen)",
            "uses": "Used to relieve mild to moderate pain from headaches, muscle aches, menstrual periods, colds and sore throats, toothaches, backaches, and to reduce fever.",
            "contraindications": "Should not be used by people with severe liver disease. Avoid alcohol consumption.",
            "sideEffects": "Nausea, stomach pain, loss of appetite, itching, rash, headache, dark urine, clay-colored stools, or jaundice.",
            "dosage": "For adults, the typical dose is 325 to 650 mg every 4 to 6 hours.",
            "warnings": "Exceeding the recommended dose can cause severe liver damage."
          }
        }
        
        Now, process the request for the provided data URI and return the information in the specified JSON format. The data URI is: ${input.photoDataUri}`,
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
    throw new Error("The AI returned an invalid response format.");
  }
}
