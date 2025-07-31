'use server';

import { provideMedicineInformation } from '@/ai/flows/provide-medicine-information';
import { recognizeMedicineFromPhoto } from '@/ai/flows/recognize-medicine';
import { type MedicineInfo, type ShoppingResult } from '@/lib/types';
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

export async function getShoppingResults(medicineName: string): Promise<{ data?: ShoppingResult[]; error?: string }> {
    if (!process.env.SERPAPI_API_KEY) {
        console.log("A chave da API da SerpApi não foi configurada.");
        return { data: [] }; // Retorna vazio para não mostrar erro na UI
    }

    const searchQuery = `${medicineName} medicamento`;
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&hl=pt-br&gl=br&api_key=${process.env.SERPAPI_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Erro na SerpApi: ${errorData.error || response.statusText}`);
            return { data: [] }; // Retorna vazio em caso de erro da API
        }
        const data = await response.json();
        if (!data.shopping_results || data.shopping_results.length === 0) {
            return { data: [] };
        }

        const shoppingResults: ShoppingResult[] = data.shopping_results
            .slice(0, 5) // Pega apenas os 5 primeiros resultados
            .map((item: any) => ({
                position: item.position,
                title: item.title,
                link: item.link || `https://www.google.com/search?q=${encodeURIComponent(item.title)}&tbm=shop`,
                price: item.price,
                source: item.source,
                thumbnail: item.thumbnail,
            }));
            
        return { data: shoppingResults };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : "Ocorreu um erro desconhecido ao buscar produtos." };
    }
}
