
import Header from '@/components/layout/header';
import ProductCard from '@/components/pharma/product-card';
import { type Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const products: Product[] = [
  { id: '1', name: 'Paracetamol 500mg', description: 'Analgésico e antitérmico.', price: 5.99, image: 'https://placehold.co/300x300.png', category: 'Analgésicos' },
  { id: '2', name: 'Ibuprofeno 400mg', description: 'Anti-inflamatório não esteroide.', price: 12.50, image: 'https://placehold.co/300x300.png', category: 'Anti-inflamatórios' },
  { id: '3', name: 'Amoxicilina 500mg', description: 'Antibiótico para infecções bacterianas.', price: 25.00, image: 'https://placehold.co/300x300.png', category: 'Antibióticos' },
  { id: '4', name: 'Loratadina 10mg', description: 'Anti-histamínico para alergias.', price: 8.75, image: 'https://placehold.co/300x300.png', category: 'Antialérgicos' },
  { id: '5', name: 'Omeprazol 20mg', description: 'Redutor de acidez estomacal.', price: 15.20, image: 'https://placehold.co/300x300.png', category: 'Gastrointestinal' },
  { id: '6', name: 'Vitamina C', description: 'Suplemento vitamínico.', price: 18.00, image: 'https://placehold.co/300x300.png', category: 'Vitaminas' },
  { id: '7', name: 'Dipirona 1g', description: 'Analgésico e antitérmico.', price: 4.50, image: 'https://placehold.co/300x300.png', category: 'Analgésicos' },
  { id: '8', name: 'Captopril 25mg', description: 'Anti-hipertensivo.', price: 9.80, image: 'https://placehold.co/300x300.png', category: 'Cardiovascular' },
];

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body antialiased">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-24">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-accent tracking-tighter">Nossos Produtos</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        Ordenar por <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Relevância</DropdownMenuItem>
                    <DropdownMenuItem>Preço: Menor para Maior</DropdownMenuItem>
                    <DropdownMenuItem>Preço: Maior para Menor</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
