
'use client';

import { HeartPulse, Search, SlidersHorizontal, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ScrollFloat from '../ui/scroll-float';

const featureData = [
    {
        icon: HeartPulse,
        title: 'Consulta por Texto',
        description: 'Digite o nome do medicamento e tenha acesso instantâneo a informações vitais.',
    },
    {
        icon: Search,
        title: 'Análise por Imagem',
        description: 'Envie uma foto da embalagem e nossa IA identifica o medicamento para você.',
    },
    {
        icon: BarChart,
        title: 'Informação Confiável',
        description: 'Acesse dados seguros e atualizados para tomar decisões com mais confiança.',
    },
    {
        icon: SlidersHorizontal,
        title: 'Interface Intuitiva',
        description: 'Navegue em um ambiente claro e objetivo, focado no que realmente importa.',
    }
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
            <ScrollFloat
                as="h2"
                textClassName="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline text-accent tracking-tighter"
            >
                Recursos pensados para sua saúde
            </ScrollFloat>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Desenvolvemos uma ferramenta completa para que você tenha acesso rápido e seguro a informações sobre medicamentos, na palma da sua mão.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featureData.map((feature, index) => (
                <Card key={index} className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 text-center sm:text-left">
                    <CardHeader className="items-center sm:items-start">
                        <div className="flex-shrink-0 bg-accent/10 text-accent p-3 rounded-lg w-fit mb-4">
                            <feature.icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
