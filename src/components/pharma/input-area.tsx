
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Loader2, Mic, FileText, Upload, Search } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

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

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-2xl shadow-black/20 rounded-2xl">
        <CardContent className="p-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-1 h-12">
              <TabsTrigger value="text" className="rounded-lg text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><FileText className="mr-2 h-5 w-5" />Texto</TabsTrigger>
              <TabsTrigger value="image" className="rounded-lg text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"><ImageIcon className="mr-2 h-5 w-5" />Imagem</TabsTrigger>
              <TabsTrigger value="voice" disabled className="rounded-lg text-lg">
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <span className="flex items-center"><Mic className="mr-2 h-5 w-5" />Voz</span>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Funcionalidade em breve!</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="text" className="mt-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(() => onTextSubmit(new FormData(document.getElementById('text-form') as HTMLFormElement)))}
                    id="text-form"
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="medicineName"
                      render={({ field }) => (
                        <FormItem>
                           <FormControl>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                placeholder="Digite o nome do medicamento. Ex: Paracetamol 500mg"
                                className="resize-none pl-12 h-14 text-lg bg-secondary/60 border-white/10 rounded-xl"
                                {...field}
                                />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <motion.div variants={buttonVariants} initial="initial" animate="animate">
                      <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-lg rounded-xl h-14">
                        {isLoading && activeTab === 'text' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Buscar Informações
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="image" className="mt-0">
                <form onSubmit={handleImageSubmit} className="space-y-4">
                    <div className="flex justify-center items-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-secondary/40 hover:bg-secondary/60 border-white/10 transition-colors duration-300">
                            {previewUrl ? (
                                <div className="relative w-full h-full">
                                    <Image src={previewUrl} alt="Pré-visualização" layout="fill" objectFit="contain" className="rounded-lg p-2"/>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                                    <Upload className="w-10 h-10 mb-4" />
                                    <p className="mb-2 text-base"><span className="font-semibold text-accent">Clique para enviar</span> ou arraste e solte</p>
                                    <p className="text-sm">PNG, JPG, ou WEBP</p>
                                </div>
                            )}
                            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading} />
                        </label>
                    </div>
                  <motion.div variants={buttonVariants} initial="initial" animate="animate">
                    <Button type="submit" size="lg" disabled={!imageDataUri || isLoading} className="w-full bg-accent hover:bg-accent/90 text-lg rounded-xl h-14">
                      {isLoading && activeTab === 'image' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Analisar Imagem
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
              <TabsContent value="voice">
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
