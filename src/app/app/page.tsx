
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { type MedicineInfo } from '@/lib/types';
import { getMedicineInfoFromImage, getMedicineInfoFromText } from '@/app/actions';
import Header from '@/components/layout/header';
import InputArea from '@/components/pharma/input-area';
import MedicineInfoCard from '@/components/pharma/medicine-info-card';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '@/components/ui/split-text';

export default function AppPage() {
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
       <Header />
       <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto space-y-8 text-center"
        >
            <SplitText
              as="h1"
              text="Consulte a bula do seu medicamento"
              className="text-4xl lg:text-5xl font-extrabold font-headline text-accent tracking-tighter"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              delay={50}
              duration={0.6}
              ease="power3.out"
            />
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Digite o nome ou envie uma foto do medicamento para obter as informações da bula instantaneamente.
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
