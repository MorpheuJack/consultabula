
import { type Product } from "@/lib/types";
import Image from 'next/image';

type ProductImageProps = {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="flex justify-center items-center bg-card rounded-lg p-8">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="object-contain"
        data-ai-hint={`${product.category} medicine`}
      />
    </div>
  )
}
