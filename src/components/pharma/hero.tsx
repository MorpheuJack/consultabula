
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pill } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100svh-88px)] flex items-center bg-background overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2">
             <Image
                src="https://placehold.co/1200x1200.png"
                alt="Profissional de saúde sorrindo"
                layout="fill"
                objectFit="cover"
                className="opacity-60"
                data-ai-hint="pharmacist professional"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
            <div className="max-w-xl">
                <div className="p-4 bg-primary/10 rounded-full w-fit mb-6 shadow-md">
                    <Pill className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold font-headline text-foreground leading-tight tracking-tighter mb-6">
                    Bula de Remédio na Palma da Mão.
                </h1>
                <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl">
                    Consulte bulas de forma rápida e segura. Tire suas dúvidas sobre medicamentos por texto ou enviando uma foto da embalagem.
                </p>
                <div className="mt-10 flex gap-4">
                    <Link href="/app">
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-7 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                            Começar Agora
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
