export type MedicineInfo = {
  name: string;
  uses: string;
  contraindications: string;
  sideEffects?: string | null;
  dosage?: string | null;
  warnings?: string | null;
};
