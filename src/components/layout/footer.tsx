
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Facebook, Instagram } from 'lucide-react';
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
  
  const bottomLinkClasses = isGreenPage
    ? "text-white/80 hover:text-white transition-colors duration-300"
    : "text-muted-foreground hover:text-primary transition-colors duration-300";
    
  const copyrightTextClasses = isGreenPage ? "text-white/60" : "text-muted-foreground";

  return (
    <footer className={`${containerBgColor} ${containerTextColor}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-4 transition-transform duration-300 hover:scale-110">
                <Image src="/llogo.png" alt="Consulta Bula Logo" width={64} height={64} />
            </Link>
            <h2 className="text-2xl font-bold font-headline mb-2">Consulta Bula</h2>
            <p className="max-w-md mx-auto text-sm opacity-80 mb-6">
              Informações sobre medicamentos de forma rápida e segura, colocando a clareza na palma da sua mão.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
                <Link href="/#features" className="opacity-80 hover:opacity-100 transition-opacity">Funcionalidades</Link>
                <Link href="/app" className="opacity-80 hover:opacity-100 transition-opacity">Consultar Bula</Link>
            </nav>
            <div className="flex gap-5 mb-8">
                 <Link href="#" aria-label="Twitter" className={`p-2 rounded-full transition-all duration-300 ${iconHoverColor} hover:bg-white/10`}><Twitter className="h-5 w-5" /></Link>
                 <Link href="#" aria-label="Facebook" className={`p-2 rounded-full transition-all duration-300 ${iconHoverColor} hover:bg-white/10`}><Facebook className="h-5 w-5" /></Link>
                 <Link href="#" aria-label="Instagram" className={`p-2 rounded-full transition-all duration-300 ${iconHoverColor} hover:bg-white/10`}><Instagram className="h-5 w-5" /></Link>
            </div>
        </div>
        <div className={`mt-8 pt-8 border-t ${separatorColor} flex flex-col md:flex-row items-center justify-between gap-y-4 gap-x-8`}>
          <p className={`text-xs text-center md:text-left ${copyrightTextClasses}`}>&copy; {new Date().getFullYear()} Consulta Bula. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className={`text-xs whitespace-nowrap ${bottomLinkClasses}`}>
                Termos de Serviço
            </Link>
            <div className={`h-3 w-px ${isGreenPage ? 'bg-white/25' : 'bg-border'}`}></div>
            <Link href="#" className={`text-xs whitespace-nowrap ${bottomLinkClasses}`}>
                Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
