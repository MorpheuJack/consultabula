import Link from 'next/link';
import { Pill } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-transparent absolute top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                <Pill className="h-6 w-6 text-teal-300" />
            </div>
            <span className="text-xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              PharmaInfo AI
            </span>
        </Link>
      </div>
    </header>
  );
}
