
'use client';

import Link from 'next/link';
import { Pill, Twitter, Facebook, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

type FooterProps = {
    bgColor?: string;
    textColor?: string;
}

export default function Footer({ bgColor = 'bg-background', textColor = 'text-foreground' }: FooterProps) {
  const pathname = usePathname();

  const isGreenPage = pathname.startsWith('/app') || pathname.startsWith('/shop');

  const containerBgColor = isGreenPage ? 'bg-transparent' : bgColor;
  const containerTextColor = isGreenPage ? 'text-white' : textColor;
  const separatorColor = isGreenPage ? 'border-white/20' : 'border-border';
  const iconHoverColor = isGreenPage ? 'hover:text-white/80' : 'hover:text-muted-foreground';


  return (
    <footer className={`${containerBgColor} ${containerTextColor}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Pill className="h-6 w-6" />
              <span className="text-lg font-bold">Consulta Bula</span>
            </Link>
            <p className="text-sm max-w-xs opacity-80">
              Informações sobre medicamentos de forma rápida e segura.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">Navegação</h3>
            <nav className="flex flex-col gap-3 text-sm">
                <Link href="/#features" className="opacity-80 hover:opacity-100 transition-opacity">Funcionalidades</Link>
                <Link href="/shop" className="opacity-80 hover:opacity-100 transition-opacity">Loja</Link>
                <Link href="/app" className="opacity-80 hover:opacity-100 transition-opacity">Consultar Bula</Link>
            </nav>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <h3 className="font-semibold mb-4">Siga-nos</h3>
             <div className="flex gap-4">
                <Link href="#" className={`opacity-80 ${iconHoverColor} transition-opacity`}><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className={`opacity-80 ${iconHoverColor} transition-opacity`}><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className={`opacity-80 ${iconHoverColor} transition-opacity`}><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-6 border-t ${separatorColor} flex flex-col sm:flex-row justify-between items-center text-xs`}>
          <p className="opacity-60">&copy; {new Date().getFullYear()} Consulta Bula. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">Termos de Serviço</Link>
            <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
