
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full bg-card overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-88px)] py-20 md:py-0">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold font-headline text-foreground leading-tight tracking-tighter">
              Sua Saúde, Simplificada.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              Obtenha informações claras e confiáveis sobre medicamentos. Tire suas dúvidas por texto ou imagem de forma rápida e segura.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/app">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-7 px-8 rounded-full"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:flex items-center justify-center h-full">
              <div className="absolute -right-1/4 top-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
              <Image
                  src="https://placehold.co/600x800.png"
                  alt="Profissional de saúde sorrindo"
                  width={500}
                  height={700}
                  className="object-cover rounded-3xl z-10 shadow-2xl"
                  data-ai-hint="pharmacist professional"
                  priority
              />
          </div>
        </div>
      </div>
    </section>
  );
}
