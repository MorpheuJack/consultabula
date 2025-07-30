import Link from 'next/link';
import { Pill, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-headline">
              PharmaInfo AI
            </span>
        </Link>
        <Link href="/app">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Search className="mr-2 h-4 w-4" />
                Consultar Medicamento
            </Button>
        </Link>
      </div>
    </header>
  );
}