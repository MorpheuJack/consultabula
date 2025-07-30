
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import ScrollFloat from '../ui/scroll-float';

export default function Hero() {
  return (
    <section 
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-4"
        style={{
            background: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
            backgroundImage: `
                linear-gradient(to right bottom, rgba(29, 151, 108, 0.9), rgba(147, 249, 185, 0.9)), 
                url('/background-icons.svg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
            <ScrollFloat
                textClassName="text-4xl md:text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tighter text-white"
                containerClassName='mb-6'
            >
                Precisa consultar a bula de um remédio?
            </ScrollFloat>
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                A resposta mais rápida e confiável para suas dúvidas sobre medicamentos.
                Digite o nome ou envie uma foto.
            </p>
            
            <div className="mt-12 w-full max-w-2xl">
                <div className="relative flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Digite o nome do medicamento..."
                            className="w-full h-14 sm:h-16 pl-12 sm:pl-16 pr-4 rounded-full text-base sm:text-lg text-foreground bg-white/90 focus:bg-white focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 shadow-2xl"
                        />
                    </div>
                     <Button
                        size="lg"
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg py-7 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow shrink-0"
                        asChild
                    >
                       <Link href="/app">
                            Consultar
                            <ArrowRight className="ml-2 h-5 w-5 hidden sm:inline" />
                       </Link>
                    </Button>
                </div>
            </div>
             <p className="mt-6 text-sm text-white/70">
                Ou <Link href="/app" className="underline hover:text-white">envie uma foto da embalagem</Link> para uma análise instantânea.
            </p>
        </div>
    </section>
  );
}
