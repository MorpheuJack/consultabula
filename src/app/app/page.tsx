
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const medicineName = searchParams.get('medicineName');
    if (medicineName) {
      const formData = new FormData();
      formData.append('medicineName', medicineName);
      handleTextSubmit(formData);
    }
  }, [searchParams]);

  useEffect(() => {
    if (medicineInfo && !isLoading) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [medicineInfo, isLoading]);

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
    <div 
        className="flex flex-col min-h-screen text-white font-body antialiased"
        style={{
            background: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
            backgroundImage: `
                linear-gradient(to right bottom, rgba(29, 151, 108, 0.9), rgba(147, 249, 185, 0.9)), 
                url('/background-icons.svg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}
    >
       <Header />
       <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl mt-48">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6 text-center md:text-left"
                >
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-headline text-white tracking-tighter">
                        Consulte a bula do seu medicamento
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90">
                        Digite o nome ou envie uma foto do medicamento para obter informações sobre dosagem, efeitos e muito mais.
                    </p>
                </motion.div>
                
                <div className="w-full">
                   <InputArea onTextSubmit={handleTextSubmit} onImageSubmit={handleImageSubmit} isLoading={isLoading} />
                </div>
            </div>

            <div ref={resultsRef} className="mt-12 min-h-[300px] w-full max-w-3xl mx-auto">
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
