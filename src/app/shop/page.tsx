
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import ProductCard from '@/components/pharma/product-card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/products';
import { type Product } from '@/lib/types';
import { ChevronDown, Search } from 'lucide-react';
import Footer from '@/components/layout/footer';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm]);

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h1 className="text-4xl font-extrabold text-white tracking-tighter self-start md:self-center">Nossos Produtos</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow w-full md:flex-grow-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                    <Input
                        type="search"
                        placeholder="Pesquisar produtos..."
                        className="w-full md:w-64 lg:w-80 h-12 pl-12 pr-4 rounded-full bg-white/20 text-white placeholder:text-white/70 border-0 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2 bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white h-12 rounded-full w-full sm:w-auto justify-center">
                            Ordenar por <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background/80 backdrop-blur-sm border-white/30 text-white">
                        <DropdownMenuItem className="cursor-pointer hover:!bg-white/20">Relevância</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:!bg-white/20">Preço: Menor para Maior</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:!bg-white/20">Preço: Maior para Menor</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
