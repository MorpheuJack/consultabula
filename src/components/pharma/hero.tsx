
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import ScrollFloat from '../ui/scroll-float';
import dynamic from 'next/dynamic';

const SplitText = dynamic(() => import('../ui/split-text-client'), { ssr: false });

export default function Hero() {
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const medicineName = formData.get('medicineName') as string;
    if (medicineName) {
      router.push(`/app?medicineName=${encodeURIComponent(medicineName)}`);
    } else {
      router.push('/app');
    }
  };

  return (
    <section 
        className="relative w-full min-h-screen flex flex-col items-center justify-center text-center p-4 bg-dark-green"
    >
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
            <SplitText
                as="h1"
                text="A clareza que você precisa sobre medicamentos, instantaneamente."
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tighter text-white"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                delay={40}
                duration={0.8}
                ease="power3.out"
            />
            
            <div className="mt-12 w-full max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            name="medicineName"
                            placeholder="Digite o nome de um medicamento..."
                            className="w-full h-14 sm:h-16 pl-12 sm:pl-16 pr-4 rounded-full text-base sm:text-lg text-foreground bg-white/90 focus:bg-white focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 shadow-2xl"
                        />
                    </div>
                     <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg py-7 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow shrink-0"
                    >
                        Consultar
                        <ArrowRight className="ml-2 h-5 w-5 hidden sm:inline" />
                    </Button>
                </form>
            </div>
             <p className="mt-6 text-sm text-white/70">
                Ou <Link href="/app" className="underline hover:text-white">envie uma foto da embalagem</Link> para obter informações.
            </p>
        </div>
    </section>
  );
}
