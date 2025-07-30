
'use client';

import Link from 'next/link';
import { Menu, Pill, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

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
        <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/#features">Funcionalidades</Link>
            </Button>
            <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                <Link href="/shop">Loja</Link>
            </Button>
            <Button asChild className="rounded-full shadow-lg bg-white text-primary hover:bg-white/90 transition-colors">
                <Link href="/app">Consultar Bula</Link>
            </Button>
             <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Carrinho de compras</span>
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    0
                </span>
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
                    <nav className="flex flex-col gap-6 mt-12 text-lg">
                        <Link href="/#features" className="hover:text-accent transition-colors">Funcionalidades</Link>
                        <Link href="/shop" className="hover:text-accent transition-colors">Loja</Link>
                        <Link href="/app" className="hover:text-accent transition-colors">Consultar Bula</Link>
                        <div className="border-t border-border pt-6">
                            <Button variant="ghost" className="w-full justify-start gap-2 text-lg">
                                <ShoppingCart className="h-6 w-6" />
                                Carrinho (0)
                            </Button>
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
