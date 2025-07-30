
import Features from '@/components/pharma/features';
import Hero from '@/components/pharma/hero';
import Header from '@/components/layout/header';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body antialiased">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
