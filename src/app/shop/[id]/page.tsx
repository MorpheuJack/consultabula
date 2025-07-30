
import Header from '@/components/layout/header';
import ProductDetails from '@/components/pharma/product-details';
import ProductImage from '@/components/pharma/product-image';
import { products } from '@/lib/products';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ProductImage product={product} />
          <ProductDetails product={product} />
        </div>
      </main>
    </div>
  );
}
