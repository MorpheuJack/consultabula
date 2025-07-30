
import { type Product } from "./types";

export const products: Product[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Analgésico e antitérmico.',
      fullDescription: 'O Paracetamol é indicado para o tratamento de dores de cabeça, dor de dente, dores musculares e articulares, cólicas menstruais e para a redução da febre.',
      price: 5.99,
      originalPrice: 7.50,
      image: 'https://placehold.co/500x500.png',
      category: 'Analgésicos'
    },
    {
      id: '2',
      name: 'Ibuprofeno 400mg',
      description: 'Anti-inflamatório não esteroide.',
      fullDescription: 'O Ibuprofeno possui atividade analgésica, antitérmica e anti-inflamatória. É indicado para o alívio de dores leves a moderadas e para o tratamento de inflamações.',
      price: 12.50,
      image: 'https://placehold.co/500x500.png',
      category: 'Anti-inflamatórios'
    },
    {
      id: '3',
      name: 'Amoxicilina 500mg',
      description: 'Antibiótico para infecções bacterianas.',
      fullDescription: 'A Amoxicilina é um antibiótico de amplo espectro indicado para o tratamento de infecções bacterianas causadas por germes sensíveis à sua ação.',
      price: 25.00,
      image: 'https://placehold.co/500x500.png',
      category: 'Antibióticos'
    },
    {
      id: '4',
      name: 'Loratadina 10mg',
      description: 'Anti-histamínico para alergias.',
      fullDescription: 'A Loratadina é indicada para o alívio dos sintomas associados com a rinite alérgica, como: coceira nasal, coriza, espirros, ardor e coceira nos olhos.',
      price: 8.75,
      originalPrice: 10.00,
      image: 'https://placehold.co/500x500.png',
      category: 'Antialérgicos'
    },
    {
      id: '5',
      name: 'Omeprazol 20mg',
      description: 'Redutor de acidez estomacal.',
      fullDescription: 'O Omeprazol é indicado para tratamentos de úlceras gástricas e duodenais, e em casos de refluxo gastroesofágico.',
      price: 15.20,
      image: 'https://placehold.co/500x500.png',
      category: 'Gastrointestinal'
    },
    {
      id: '6',
      name: 'Vitamina C',
      description: 'Suplemento vitamínico.',
      fullDescription: 'A Vitamina C é um suplemento vitamínico indicado como auxiliar do sistema imunológico.',
      price: 18.00,
      image: 'https://placehold.co/500x500.png',
      category: 'Vitaminas'
    },
    {
      id: '7',
      name: 'Dipirona 1g',
      description: 'Analgésico e antitérmico.',
      fullDescription: 'A Dipirona é um medicamento utilizado no tratamento da dor e febre. Seus efeitos analgésico e antitérmico podem ser esperados em 30 a 60 minutos após a administração.',
      price: 4.50,
      image: 'https://placehold.co/500x500.png',
      category: 'Analgésicos'
    },
    {
      id: '8',
      name: 'Captopril 25mg',
      description: 'Anti-hipertensivo.',
      fullDescription: 'O Captopril é indicado para o tratamento da hipertensão (pressão alta).',
      price: 9.80,
      originalPrice: 12.00,
      image: 'https://placehold.co/500x500.png',
      category: 'Cardiovascular'
    },
  ];
