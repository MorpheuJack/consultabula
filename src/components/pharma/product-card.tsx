
'use client';

import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
        title: "Produto Adicionado!",
        description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-48"
          data-ai-hint={`${product.category} medicine`}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-extrabold text-accent">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
        <Button size="icon" variant="outline" className="text-primary hover:bg-primary/10" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
