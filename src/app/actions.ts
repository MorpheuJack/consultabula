'use server';

import { provideMedicineInformation } from '@/ai/flows/provide-medicine-information';
import { recognizeMedicineFromPhoto } from '@/ai/flows/recognize-medicine';
import { type MedicineInfo } from '@/lib/types';
import { z } from 'zod';

const textSchema = z.object({
  medicineName: z.string().min(1, { message: 'O nome do medicamento é obrigatório.' }),
});

export async function getMedicineInfoFromText(formData: FormData): Promise<{ data?: MedicineInfo; error?: string }> {
    const validatedFields = textSchema.safeParse({
        medicineName: formData.get('medicineName'),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0].message };
    }

    try {
        const result = await provideMedicineInformation({ medicineName: validatedFields.data.medicineName });
        if (!result?.medicineInformation) throw new Error('Nenhuma informação encontrada para este medicamento.');
        
        return {
            data: {
                name: validatedFields.data.medicineName,
                ...result.medicineInformation,
            }
        };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao buscar informações.' };
    }
}

const imageSchema = z.object({
  photoDataUri: z.string().min(1, { message: 'Os dados da imagem são obrigatórios.' }),
});

export async function getMedicineInfoFromImage(formData: FormData): Promise<{ data?: MedicineInfo; error?: string }> {
    const validatedFields = imageSchema.safeParse({
        photoDataUri: formData.get('photoDataUri'),
    });
    
    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0].message };
    }

    try {
        const result = await recognizeMedicineFromPhoto({ photoDataUri: validatedFields.data.photoDataUri });
        if (!result?.medicineInfo) throw new Error('Não foi possível reconhecer o medicamento na imagem.');
        
        return { data: result.medicineInfo };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao processar a imagem.' };
    }
}
