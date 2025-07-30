
import Header from '@/components/layout/header';
import ProductCard from '@/components/pharma/product-card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { products } from '@/lib/products';
import { ChevronDown } from 'lucide-react';

export default function ShopPage() {
  return (
    <div 
      className="flex flex-col min-h-screen text-white font-body antialiased"
      style={{
          background: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)',
          backgroundImage: `
              linear-gradient(to right bottom, rgba(29, 151, 108, 0.9), rgba(147, 249, 185, 0.9)), 
              url('/background-icons.svg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
      }}
    >
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-24">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-white tracking-tighter">Nossos Produtos</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
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
