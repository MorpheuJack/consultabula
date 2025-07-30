
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

type HeroProps = {
    onGetStartedClick: () => void;
};

export default function Hero({ onGetStartedClick }: HeroProps) {
  return (
    <section className="w-full bg-card">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)] md:min-h-[600px] max-h-[800px]">
        <div className="flex flex-col justify-center text-center md:text-left p-8">
          <h1 className="text-4xl lg:text-6xl font-bold font-headline text-primary leading-tight">
            Sua Saúde, Simplificada.
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            Obtenha informações claras e confiáveis sobre medicamentos. Tire suas dúvidas por texto ou imagem de forma rápida e segura.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={onGetStartedClick}
            >
              Começar Agora
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-100 to-transparent"></div>
            <Image
                src="https://placehold.co/600x800.png"
                alt="Profissional de saúde sorrindo"
                width={600}
                height={800}
                className="object-cover w-full h-full"
                data-ai-hint="pharmacist professional"
                priority
            />
        </div>
      </div>
    </section>
  );
}
