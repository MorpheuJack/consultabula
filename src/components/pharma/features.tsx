
import Image from 'next/image';
import { HeartPulse, Search, SlidersHorizontal, BarChart } from 'lucide-react';

const featureData = [
    {
        icon: HeartPulse,
        title: 'Demanda gigantesca para os médicos',
        description: 'Diariamente surgem centenas de novas oportunidades de plantões.',
    },
    {
        icon: Search,
        title: 'Fácil Conexão entre o contratante e contratado',
        description: 'Em poucos cliques você fecha seu primeiro plantão.',
    },
    {
        icon: BarChart,
        title: 'Organização Financeira e Gestão',
        description: 'Relatórios de plantões e organização de recebimentos e pagamentos.',
    },
    {
        icon: SlidersHorizontal,
        title: 'Filtro por especialidade e região',
        description: 'Encontre o plantão perfeito para você, baseado na sua região e especialidade.',
    }
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-4">
                Médico, deixe a dor de cabeça com a gente!
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
                Se preocupe apenas em cumprir seus plantões...
            </p>
            <div className="space-y-8">
                {featureData.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <Image
            src="https://placehold.co/500x700.png"
            alt="Médica sorrindo e usando o celular"
            width={500}
            height={700}
            className="rounded-xl shadow-2xl object-cover"
            data-ai-hint="smiling doctor phone"
          />
        </div>
      </div>
    </section>
  );
}
