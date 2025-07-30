
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { type MedicineInfo } from '@/lib/types';
import { getMedicineInfoFromImage, getMedicineInfoFromText } from '@/app/actions';
import Header from '@/components/layout/header';
import InputArea from '@/components/pharma/input-area';
import MedicineInfoCard from '@/components/pharma/medicine-info-card';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body antialiased">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black -z-10" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto space-y-8 text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold font-headline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 leading-tight tracking-tighter">
            PharmaInfo AI
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto">
            Sua saúde, simplificada. Obtenha informações claras e confiáveis sobre medicamentos por texto ou imagem.
          </p>
        </motion.div>

        <div className="w-full max-w-3xl mx-auto space-y-8 mt-12">
           <InputArea onTextSubmit={handleTextSubmit} onImageSubmit={handleImageSubmit} isLoading={isLoading} />
           <div className="mt-8 min-h-[300px]">
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MedicineInfoCard.Skeleton />
                </motion.div>
              )}
              {medicineInfo && !isLoading && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <MedicineInfoCard info={medicineInfo} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
