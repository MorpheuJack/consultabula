
'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/pharma/hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <footer className="w-full py-6 bg-card border-t">
        <div className="container mx-auto px-4 max-w-3xl">
        </div>
      </footer>
    </div>
  );
}
