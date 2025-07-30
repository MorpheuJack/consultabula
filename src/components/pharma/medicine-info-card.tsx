import { type MedicineInfo } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeartPulse, XCircle, AlertTriangle, Pill, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type MedicineInfoCardProps = {
  info: MedicineInfo;
};

const InfoSection = ({ title, content, icon: Icon }: { title: string; content?: string | null; icon: React.ElementType }) => {
  if (!content) return null;
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-lg hover:no-underline">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-base prose prose-sm max-w-none text-foreground/80">
        {content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default function MedicineInfoCard({ info }: MedicineInfoCardProps) {
  return (
    <Card className="shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">{info.name}</CardTitle>
        <CardDescription>Aqui está o que encontramos sobre este medicamento.</CardDescription>
      </CardHeader>
      <CardContent>
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
        <Card className="shadow-lg">
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 border-b pb-2">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                 <div className="space-y-2 border-b pb-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/4" />
                </div>
            </CardContent>
        </Card>
    )
}
