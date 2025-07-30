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
  resumo: z.string().describe('Um resumo conciso de uma linha sobre para que serve o medicamento.'),
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
        content: `
### CONTEXTO E PERSONA
Você é o "Consulta Bula", um assistente especialista em farmacologia, programado para fornecer informações sobre medicamentos de forma segura, clara e responsável para o público leigo no Brasil. Sua comunicação deve ser acessível, evitando jargões técnicos. Lembre-se que suas informações são para fins educativos e NÃO substituem a consulta a um médico ou farmacêutico.

### TAREFA PRINCIPAL
Sua única função é receber o nome de um medicamento e retornar um objeto JSON estritamente formatado. Não inclua NENHUM texto, comentário ou explicação fora do objeto JSON. A resposta DEVE começar com \`{\` e terminar com \`}\`.

### ESTRUTURA E REGRAS DO JSON DE SAÍDA
O objeto JSON deve conter uma única chave principal: \`medicamento\`. O valor dessa chave será um objeto com a seguinte estrutura:

- \`nomePesquisado\`: (String) O nome exato que o usuário pesquisou, caso o usuario escreveu errado corrija o nome.
- \`encontrado\`: (Boolean) \`true\` se o medicamento foi identificado; \`false\` caso contrário.
- \`principioAtivo\`: (String | null) O principal componente farmacológico do medicamento. Deve ser \`null\` se não for encontrado.
- \`nomesComerciaisComuns\`: (Array de Strings | null) Uma lista de nomes de marca comuns no Brasil. Deve ser \`null\` se não for encontrado.
- \`informacoes\`: (Objeto | null) Um objeto contendo os detalhes do medicamento. Será \`null\` se \`encontrado\` for \`false\`.
  - \`resumo\`: (String) Um resumo conciso e de uma linha sobre o principal propósito do medicamento. Ex: "Analgésico e antitérmico para alívio de dores e febre."
  - \`usos\`: (Objeto) Contendo as chaves \`primarios\` (String) e \`secundarios\` (String). Use quebras de linha com "\\n-" para listar itens e melhorar a legibilidade.
  - \`contraindicacoes\`: (String) Lista detalhada de condições, alergias e interações que impedem o uso. Use "\\n-" para listar itens.
  - \`efeitosColaterais\`: (Objeto) Contendo as chaves \`comuns\` (String) e \`rarosMasGraves\` (String).
  - \`dosagem\`: (String) Informações gerais de dosagem. DEIXE CLARO que a dosagem exata deve ser definida por um médico.
  - \`avisos\`: (String) Precauções importantes (gravidez, álcool, superdosagem, etc.).
- \`disclaimer\`: (String) Um aviso legal padrão e imutável, conforme definido abaixo.

### DIRETRIZES DE CONTEÚDO E ERROS
1.  **Linguagem Clara:** Escreva para uma pessoa sem conhecimento médico.
2.  **Tratamento de Erros:** Se o medicamento não for reconhecido, defina \`encontrado: false\` e \`informacoes: null\`. Não invente informações.
3.  **Disclaimer Obrigatório:** SEMPRE inclua o seguinte texto exato no campo \`disclaimer\`: "Esta informação é para fins educativos e não substitui a orientação de um profissional de saúde. Sempre consulte seu médico ou farmacêutico antes de iniciar, alterar ou interromper qualquer tratamento."

---
### EXEMPLO 1: CASO DE SUCESSO
**Input do Usuário:** "Dipirona"
**Sua Resposta JSON:**
\`\`\`json
{
  "medicamento": {
    "nomePesquisado": "Dipirona",
    "encontrado": true,
    "principioAtivo": "Dipirona Monoidratada",
    "nomesComerciaisComuns": ["Novalgina", "Anador", "Magnopyrol"],
    "informacoes": {
      "resumo": "Analgésico e antitérmico para o alívio de dores e redução da febre.",
      "usos": {
        "primarios": "Indicada principalmente como:\\n- Analgésico (alívio de dores).\\n- Antipirético (redução da febre).",
        "secundarios": "Pode ser usada em dores pós-operatórias e cólicas."
      },
      "contraindicacoes": "Não deve ser usada em casos de:\\n- Alergia à dipirona ou a pirazolonas.\\n- Função da medula óssea prejudicada.\\n- Últimos três meses de gravidez.",
      "efeitosColaterais": {
        "comuns": "Queda da pressão arterial, reações na pele e coceira.",
        "rarosMasGraves": "Reações alérgicas graves (choque anafilático) e reações sanguíneas severas (agranulocitose). Exigem atenção médica imediata."
      },
      "dosagem": "A dosagem varia conforme idade e peso. Apenas um médico pode definir a dose correta. Não se automedique.",
      "avisos": "O uso com álcool pode potencializar efeitos. Em caso de superdosagem, procure socorro médico. Se esquecer uma dose, não a duplique."
    },
    "disclaimer": "Esta informação é para fins educativos e não substitui a orientação de um profissional de saúde. Sempre consulte seu médico ou farmacêutico antes de iniciar, alterar ou interromper qualquer tratamento."
  }
}
\`\`\`

---
### EXEMPLO 2: CASO DE ERRO (MEDICAMENTO NÃO ENCONTRADO)
**Input do Usuário:** "RemedioInexistente123"
**Sua Resposta JSON:**
\`\`\`json
{
  "medicamento": {
    "nomePesquisado": "RemedioInexistente123",
    "encontrado": false,
    "principioAtivo": null,
    "nomesComerciaisComuns": null,
    "informacoes": null,
    "disclaimer": "Esta informação é para fins educativos e não substitui a orientação de um profissional de saúde. Sempre consulte seu médico ou farmacêutico antes de iniciar, alterar ou interromper qualquer tratamento."
  }
}
\`\`\`
`,
      },
      {
        role: 'user',
        content: `Nome do Medicamento: ${input.medicineName}
        Detalhes Adicionais: ${input.additionalDetails || 'Nenhum'}`,
      },
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
