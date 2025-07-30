import Link from 'next/link';
import { Pill, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-card border-b shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold font-headline">
              PharmaInfo AI
            </span>
        </Link>
        <Link href="/app">
            <Button>
                <Search className="mr-2 h-4 w-4" />
                Consultar Medicamento
            </Button>
        </Link>
      </div>
    </header>
  );
}
