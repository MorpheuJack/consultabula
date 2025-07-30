import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Disclaimer() {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Aviso</AlertTitle>
      <AlertDescription>
        As informações fornecidas são apenas para fins informativos e não substituem o aconselhamento médico profissional. Sempre consulte um médico ou farmacêutico.
      </AlertDescription>
    </Alert>
  );
}
