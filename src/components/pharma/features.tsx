
import { HeartPulse, Search, SlidersHorizontal, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const featureData = [
    {
        icon: HeartPulse,
        title: 'Informações por Texto',
        description: 'Basta digitar o nome do medicamento para receber informações detalhadas.',
    },
    {
        icon: Search,
        title: 'Reconhecimento por Imagem',
        description: 'Tire uma foto da caixa do remédio e nossa IA irá identificá-lo para você.',
    },
    {
        icon: BarChart,
        title: 'Dados Confiáveis',
        description: 'Utilizamos fontes de dados seguras para fornecer informações precisas.',
    },
    {
        icon: SlidersHorizontal,
        title: 'Interface Intuitiva',
        description: 'Um design limpo e moderno para uma experiência de usuário agradável.',
    }
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold font-headline text-foreground tracking-tighter">
                Tudo que você precisa em um só lugar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma foi desenhada para ser sua assistente de saúde pessoal, fornecendo informações claras e rápidas sobre medicamentos.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureData.map((feature, index) => (
                <Card key={index} className="bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-lg w-fit mb-4">
                            <feature.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
