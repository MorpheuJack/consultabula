
'use client';

import { HeartPulse, Search, SlidersHorizontal, BarChart } from 'lucide-react';
import ScrollReveal from '../ui/scroll-reveal';
import dynamic from 'next/dynamic';
import MagicBento from '../ui/magic-bento';

const SplitText = dynamic(() => import('../ui/split-text-client'), { ssr: false });

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
            <SplitText
                as="h2"
                text="Recursos pensados para sua saúde"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline text-accent tracking-tighter"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                delay={50}
                duration={0.6}
                ease="power3.out"
            />
            <ScrollReveal
              containerClassName="max-w-3xl mx-auto mt-4"
              textClassName="text-base md:text-lg text-muted-foreground"
            >
              Desenvolvemos uma ferramenta completa para que você tenha acesso rápido e seguro a informações sobre medicamentos, na palma da sua mão.
            </ScrollReveal>
        </div>
        <div className="flex justify-center">
            <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="174, 96, 90" 
            />
        </div>
      </div>
    </section>
  );
}
