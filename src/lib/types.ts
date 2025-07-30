export type MedicineInfo = {
  name: string;
  uses: string;
  contraindications: string;
  sideEffects?: string | null;
  dosage?: string | null;
  warnings?: string | null;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};
