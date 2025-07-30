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
        
        if (!result?.medicamento?.encontrado || !result.medicamento.informacoes) {
            return { error: `Nenhuma informação encontrada para "${result?.medicamento?.nomePesquisado || validatedFields.data.medicineName}".` };
        }
        
        const { nomePesquisado, informacoes } = result.medicamento;
        
        return {
            data: {
                name: nomePesquisado,
                summary: informacoes.resumo,
                uses: `${informacoes.usos.primarios}\n${informacoes.usos.secundarios}`,
                contraindications: informacoes.contraindicacoes,
                sideEffects: `Comuns: ${informacoes.efeitosColaterais.comuns}\nRaros mas Graves: ${informacoes.efeitosColaterais.rarosMasGraves}`,
                dosage: informacoes.dosagem,
                warnings: informacoes.avisos,
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
        if (!result?.medicineInfo) {
            return { error: 'Não foi possível reconhecer o medicamento na imagem.' };
        }
        
        // O fluxo de imagem não retorna um resumo separado, então vamos criar um a partir dos usos.
        const summary = result.medicineInfo.uses.split('\n')[0];

        return { 
            data: {
                ...result.medicineInfo,
                summary: summary,
            } 
        };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao processar a imagem.' };
    }
}
