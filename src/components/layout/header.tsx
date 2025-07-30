import { Pill } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-card border-b">
      <div className="container mx-auto flex items-center gap-2">
        <Pill className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold font-headline">
          PharmaInfo AI
        </span>
      </div>
    </header>
  );
}
