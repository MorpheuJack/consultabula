
'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/pharma/hero';
import Features from '@/components/pharma/features';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
