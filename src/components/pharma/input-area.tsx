
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Loader2, Mic, FileText, Upload } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const textFormSchema = z.object({
  medicineName: z.string().min(2, {
    message: 'Por favor, insira um nome de medicamento.',
  }),
});

type InputAreaProps = {
  onTextSubmit: (formData: FormData) => Promise<void>;
  onImageSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
};

export default function InputArea({ onTextSubmit, onImageSubmit, isLoading }: InputAreaProps) {
  const [activeTab, setActiveTab] = useState('text');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const form = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      medicineName: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        setPreviewUrl(dataUrl);
        setImageDataUri(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageDataUri || isLoading) return;
    const formData = new FormData();
    formData.append('photoDataUri', imageDataUri);
    await onImageSubmit(formData);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4" />Texto</TabsTrigger>
            <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4" />Imagem</TabsTrigger>
            <TabsTrigger value="voice" disabled>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="flex items-center"><Mic className="mr-2 h-4 w-4" />Voz</span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Funcionalidade em breve!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => onTextSubmit(new FormData(document.getElementById('text-form') as HTMLFormElement)))}
                id="text-form"
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="medicineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Medicamento</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Paracetamol 500mg"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90">
                  {isLoading && activeTab === 'text' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Buscar Informações
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="image" className="mt-6">
            <form onSubmit={handleImageSubmit} className="space-y-4">
                <div className="flex justify-center items-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/70 border-border">
                        {previewUrl ? (
                            <div className="relative w-full h-full">
                                <Image src={previewUrl} alt="Pré-visualização" layout="fill" objectFit="contain" className="rounded-lg"/>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, ou WEBP</p>
                            </div>
                        )}
                        <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading} />
                    </label>
                </div>
              <Button type="submit" disabled={!imageDataUri || isLoading} className="w-full bg-accent hover:bg-accent/90">
                {isLoading && activeTab === 'image' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Analisar Imagem
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="voice">
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
