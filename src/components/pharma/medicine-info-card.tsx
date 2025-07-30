
import { type MedicineInfo } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeartPulse, XCircle, AlertTriangle, Pill, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import SplitText from '../ui/split-text';

type MedicineInfoCardProps = {
  info: MedicineInfo;
};

const InfoSection = ({ title, content, icon: Icon }: { title: string; content?: string | null; icon: React.ElementType }) => {
  if (!content) return null;
  return (
    <AccordionItem value={title} className="border-b-0">
      <AccordionTrigger className="text-lg hover:no-underline font-semibold py-5">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-base prose prose-sm max-w-none text-muted-foreground pt-2 pl-12">
        {content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default function MedicineInfoCard({ info }: MedicineInfoCardProps) {
  return (
    <Card className="shadow-lg bg-card border-none rounded-2xl">
      <CardHeader className="p-8">
        <SplitText
            as={CardTitle}
            text={info.name}
            className="text-4xl font-extrabold font-headline text-accent tracking-tighter"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            delay={30}
            duration={0.5}
            ease="power3.out"
        />
        <CardDescription className="text-lg pt-1 text-muted-foreground">Aqui está o que encontramos sobre este medicamento.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Accordion type="multiple" className="w-full" defaultValue={['Usos', 'Contraindicações']}>
          <InfoSection title="Usos" content={info.uses} icon={HeartPulse} />
          <InfoSection title="Contraindicações" content={info.contraindications} icon={XCircle} />
          <InfoSection title="Efeitos Colaterais" content={info.sideEffects} icon={AlertTriangle} />
          <InfoSection title="Dosagem" content={info.dosage} icon={Pill} />
          <InfoSection title="Avisos" content={info.warnings} icon={ShieldAlert} />
        </Accordion>
      </CardContent>
    </Card>
  );
}

MedicineInfoCard.Skeleton = function MedicineInfoCardSkeleton() {
    return (
        <Card className="shadow-lg bg-card border-none rounded-2xl">
            <CardHeader className="p-8">
                <Skeleton className="h-10 w-3/5 rounded-md" />
                <Skeleton className="h-6 w-4/5 mt-3 rounded-md" />
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
                <div className="space-y-3 border-b-0 pb-4">
                    <Skeleton className="h-7 w-1/4 rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                    <Skeleton className="h-5 w-5/6 rounded-md" />
                </div>
                 <div className="space-y-3 border-b-0 pb-4">
                    <Skeleton className="h-7 w-1/3 rounded-md" />
                    <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-7 w-1/4 rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}
