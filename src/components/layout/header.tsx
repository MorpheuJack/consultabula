
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Pill } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-transparent absolute top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <Image src="/ll.png" alt="Consulta Bula Logo" width={48} height={48} />
        </Link>
        <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/#features">Funcionalidades</Link>
            </Button>
            <Button asChild className="rounded-full shadow-lg bg-white text-accent hover:bg-white/90 transition-colors">
                <Link href="/app">Consultar Bula</Link>
            </Button>
        </nav>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background/90 backdrop-blur-sm text-foreground">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-6 mt-12 text-lg">
                        <Link href="/#features" className="hover:text-accent transition-colors">Funcionalidades</Link>
                        <Link href="/app" className="hover:text-accent transition-colors">Consultar Bula</Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
