
import Link from 'next/link';
import { Pill } from 'lucide-react';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-transparent absolute top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                <Pill className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-headline text-foreground">
              PharmaInfo AI
            </span>
        </Link>
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/#features">Funcionalidades</Link>
            </Button>
            <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Link href="/app">Consultar Medicamento</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
