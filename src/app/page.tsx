
import Features from '@/components/pharma/features';
import Hero from '@/components/pharma/hero';
import Header from '@/components/layout/header';

import ScrollVelocity from '@/components/ui/scroll-velocity';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body antialiased">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ScrollVelocity texts={['Consulta Bula', 'Guia de Medicamentos']} velocity={20} />
      </main>
    </div>
  );
}
