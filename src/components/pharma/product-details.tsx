
'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

type ProductDetailsProps = {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { toast } = useToast();

    const handleAddToCart = () => {
        toast({
            title: "Produto Adicionado!",
            description: `${product.name} foi adicionado ao seu carrinho.`,
        });
    };

    return (
        <div className="flex flex-col justify-center">
            <Badge variant="outline" className="w-fit mb-4 border-white/50 text-white">{product.category}</Badge>
            <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5 text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current/50" />
                </div>
                <span className="text-white/80">(123 avaliações)</span>
            </div>
            <p className="text-lg text-white/90 mb-6">{product.fullDescription || product.description}</p>
            <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-white">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                {product.originalPrice && (
                    <span className="text-xl text-white/70 line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                )}
            </div>
        </div>
    )
}
