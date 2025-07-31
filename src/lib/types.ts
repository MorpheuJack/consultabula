
export type MedicineInfo = {
  name: string;
  summary: string;
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
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
};

export type ShoppingResult = {
  position: number;
  title: string;
  link: string;
  price: string;
  source: string;
  thumbnail: string;
};
