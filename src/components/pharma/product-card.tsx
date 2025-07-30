
'use client';

import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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
      <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:-translate-y-1">
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
        </CardFooter>
      </Card>
    </Link>
  );
}
