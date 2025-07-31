
'use client';

import Image from 'next/image';
import { type ShoppingResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type ShoppingResultCardProps = {
  item: ShoppingResult;
};

export default function ShoppingResultCard({ item }: ShoppingResultCardProps) {
    const content = (
      <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-card border-border/20 text-card-foreground group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={150}
            height={150}
            className="object-cover w-full h-28 sm:h-32"
          />
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <CardTitle className="text-sm font-bold mb-1 leading-tight line-clamp-2 text-card-foreground">{item.title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground line-clamp-1">{item.source}</CardDescription>
        </CardContent>
        <CardFooter className="p-3 flex justify-between items-center mt-auto">
          <p className="text-base font-extrabold text-accent">
            {item.price}
          </p>
        </CardFooter>
      </Card>
    );

    if (item.link) {
      return (
        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full group">
          {content}
        </Link>
      );
    }

    return <div className="flex flex-col h-full">{content}</div>;
}
