'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { type MedicineInfo } from '@/lib/types';
import { getMedicineInfoFromImage, getMedicineInfoFromText } from '@/app/actions';
import Header from '@/components/layout/header';
import InputArea from '@/components/pharma/input-area';
import MedicineInfoCard from '@/components/pharma/medicine-info-card';
import Disclaimer from '@/components/pharma/disclaimer';

export default function Home() {
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTextSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMedicineInfo(null);
    const result = await getMedicineInfoFromText(formData);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Erro', description: result.error });
    } else if (result.data) {
      setMedicineInfo(result.data);
    }
    setIsLoading(false);
  };
  
  const handleImageSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMedicineInfo(null);
    const result = await getMedicineInfoFromImage(formData);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Erro', description: result.error });
    } else if (result.data) {
      setMedicineInfo(result.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">PharmaInfo AI</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Tire suas dúvidas sobre medicamentos de forma rápida e fácil.
            </p>
          </section>
          <InputArea onTextSubmit={handleTextSubmit} onImageSubmit={handleImageSubmit} isLoading={isLoading} />
          <div className="mt-8 min-h-[300px]">
            {isLoading && <MedicineInfoCard.Skeleton />}
            {medicineInfo && !isLoading && <MedicineInfoCard info={medicineInfo} />}
          </div>
        </div>
      </main>
      <footer className="w-full py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <Disclaimer />
        </div>
      </footer>
    </div>
  );
}
