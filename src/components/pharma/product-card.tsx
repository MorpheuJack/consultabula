
'use client';

import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import GlareHover from '../ui/glare-hover';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
        title: "Produto Adicionado!",
        description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  };

  return (
    <Link href={`/shop/${product.id}`} className="flex flex-col h-full group">
        <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-card text-card-foreground transition-shadow duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
          <GlareHover
            className="w-full h-full"
            borderRadius="var(--radius)"
            glareColor="hsl(var(--primary))"
            glareOpacity={0.1}
            transitionDuration={800}
          >
            <div className="flex flex-col h-full w-full">
              <CardHeader className="p-0 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-40 sm:h-48"
                  data-ai-hint={`${product.category} medicine`}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-base font-bold mb-1 leading-tight">{product.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center mt-auto">
                <p className="text-lg font-extrabold text-accent">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:bg-accent/10 hover:text-accent" onClick={handleAddToCart} aria-label="Adicionar ao carrinho">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </CardFooter>
            </div>
          </GlareHover>
        </Card>
    </Link>
  );
}
