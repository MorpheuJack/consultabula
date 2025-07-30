
import Link from 'next/link';
import { Pill } from 'lucide-react';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-transparent absolute top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold font-headline text-white">
              Consulta Bula
            </span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/#features">Funcionalidades</Link>
            </Button>
            <Button asChild className="rounded-full shadow-lg bg-white text-primary hover:bg-white/90 transition-colors">
                <Link href="/app">Consultar Bula</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
