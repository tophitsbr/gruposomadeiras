export type Category = 'Pintor' | 'Marceneiro' | 'Carpinteiro' | 'Encanador' | 'Pedreiro' | 'Eletricista';

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  photos?: string[];
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  materialsUsed?: string[];
}

export type VerificationTier = 'verificado' | 'ouro' | 'destaque';

export interface Professional {
  id: string;
  name: string;
  category: Category;
  city: string;
  profileImage: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  skills: string[];
  projects: Project[];
  reviews: Review[];
  verificationTier?: VerificationTier;
  completedJobsCount?: number;
}

export const categories: Category[] = ['Pintor', 'Marceneiro', 'Carpinteiro', 'Encanador', 'Pedreiro', 'Eletricista'];

export const sergipeCities: string[] = [
  'Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão',
  'Estância', 'Tobias Barreto', 'Simão Dias', 'Nossa Senhora da Glória', 'Itabaianinha',
  'Poço Redondo', 'Capela', 'Laranjeiras', 'Boquim', 'Umbaúba', 'Propriá',
  'Canindé de São Francisco', 'Aquidabã', 'Carmópolis', 'Salgado', 'Neópolis'
].sort();

export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    category: 'Marceneiro',
    city: 'Aracaju',
    profileImage: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop',
    bio: 'Especialista em móveis planejados e restauração de madeira de demolição. Mais de 15 anos de experiência no mercado entregando qualidade e pontualidade.',
    rating: 4.8,
    reviewsCount: 34,
    phone: '5579999999991',
    skills: ['Móveis Planejados', 'Restauração', 'Design de Interiores'],
    verificationTier: 'ouro',
    completedJobsCount: 48,
    projects: [
      { 
        id: 'p1', 
        title: 'Cozinha Planejada em Madeira Nobre', 
        imageUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800&auto=format&fit=crop',
        description: 'Projeto completo de marcenaria com acabamento fino e ferragens de alta durabilidade.',
        materialsUsed: ['Pranchas de Maçaranduba', 'Verniz Marítimo Premium', 'Compensado Naval']
      },
      { 
        id: 'p2', 
        title: 'Painel Rústico de Sala', 
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        description: 'Painel em réguas de madeira de reflorestamento tratadas pela Só Madeiras.',
        materialsUsed: ['Ripas de Cedro', 'Selador Extra']
      },
      { 
        id: 'p3', 
        title: 'Guarda-roupa Embutido', 
        imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop',
        description: 'Estrutura robusta sob medida para ambiente residencial.',
        materialsUsed: ['Madeira Angelim', 'Ferragens Industriais']
      },
    ],
    reviews: [
      { id: 'r1', author: 'Ana Costa', rating: 5, text: 'Trabalho impecável! O móvel ficou exatamente como eu queria.', date: '2024-03-15' },
      { id: 'r2', author: 'Roberto Santos', rating: 4, text: 'Muito bom, atrasou um dia mas a qualidade compensou.', date: '2024-02-20' },
    ],
  },
  {
    id: '2',
    name: 'José Ribeiro',
    category: 'Carpinteiro',
    city: 'Estância',
    profileImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop',
    bio: 'Especialista em telhados, pergolados e decks. Trabalho com diversas madeiras, incluindo eucalipto tratado em autoclave e madeiras nobres.',
    rating: 5.0,
    reviewsCount: 22,
    phone: '5579999999992',
    skills: ['Telhados', 'Pergolados', 'Decks', 'Estruturas Rurais'],
    verificationTier: 'destaque',
    completedJobsCount: 65,
    projects: [
      { 
        id: 'p4', 
        title: 'Pergolado Gourmet em Eucalipto Tratado', 
        imageUrl: 'https://images.unsplash.com/photo-1628745277861-12c82b7db5b9?q=80&w=800&auto=format&fit=crop',
        description: 'Estrutura de pergolado rústico e resistente com garantia de 15 anos contra cupins e umidade.',
        materialsUsed: ['Roliços de Eucalipto Tratado 12-14cm', 'Vigamentos de Maçaranduba', 'Verniz Filtro Solar']
      },
      { 
        id: 'p5', 
        title: 'Deck de Piscina em Madeira Nobre', 
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
        description: 'Instalação de deck com sistema de fixação oculta e impermeabilização reforçada.',
        materialsUsed: ['Tábuas de Deck Cumaru', 'Presilhas Inox', 'Óleo Protetor UV']
      },
    ],
    reviews: [
      { id: 'r3', author: 'Mariana Lima', rating: 5, text: 'O pergolado ficou lindo! Material da Só Madeiras de altíssima qualidade e instalação rápida.', date: '2024-04-05' },
    ],
  },
  {
    id: '3',
    name: 'Marcos Paulo',
    category: 'Pintor',
    city: 'Aracaju',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Pintura residencial e comercial. Acabamentos finos em portas de madeira, pergolados, texturas e vernizes de alta proteção.',
    rating: 4.7,
    reviewsCount: 45,
    phone: '5579999999993',
    skills: ['Verniz Marítimo', 'Pintura Externa', 'Tratamento de Madeira', 'Massa Corrida'],
    verificationTier: 'verificado',
    completedJobsCount: 32,
    projects: [
      { 
        id: 'p6', 
        title: 'Restauração e Envernizamento de Fachada', 
        imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
        description: 'Aplicação de 3 demãos de verniz duplo filtro solar em portas e esquadrias.',
        materialsUsed: ['Verniz Marítimo Premium', 'Lixas Grão 180 a 320', 'Stain Protetor']
      },
      { 
        id: 'p7', 
        title: 'Pintura Interna e Textura', 
        imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop',
        description: 'Acabamento acrílico fosco e textura projetada.',
        materialsUsed: ['Tinta Acrílica Lavável', 'Massa Corrida PVA']
      },
    ],
    reviews: [
      { id: 'r4', author: 'Fernando Gomes', rating: 5, text: 'Excelente acabamento nas portas e deixou tudo limpo no final.', date: '2024-01-12' },
      { id: 'r5', author: 'Lucia Alves', rating: 4, text: 'Bom serviço, cumprimento rigoroso de prazos.', date: '2023-11-15' },
    ],
  },
  {
    id: '4',
    name: 'Antônio Ferreira',
    category: 'Eletricista',
    city: 'Lagarto',
    profileImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=400&auto=format&fit=crop',
    bio: 'Instalações elétricas residenciais e rurais. Projetos luminotécnicos para pergolados, galpões e postes de eucalipto.',
    rating: 4.9,
    reviewsCount: 28,
    phone: '5579999999994',
    skills: ['Iluminação Externa', 'Iluminação em Pergolados', 'Postes de Eucalipto', 'Quadros Elétricos'],
    verificationTier: 'ouro',
    completedJobsCount: 40,
    projects: [
      { 
        id: 'p8', 
        title: 'Iluminação Cênica em Pergolado de Madeira', 
        imageUrl: 'https://images.unsplash.com/photo-1563223771-5fe403ec9bc6?q=80&w=800&auto=format&fit=crop',
        description: 'Instalação de refletores de LED blindados e fiação oculta na estrutura de madeira.',
        materialsUsed: ['Postes de Eucalipto Tratado', 'Eletrodutos Reforçados', 'Spots LED IP67']
      },
    ],
    reviews: [
      { id: 'r6', author: 'Tiago Souza', rating: 5, text: 'Muito profissional, fez a iluminação do meu jardim impecável.', date: '2024-03-10' },
    ],
  },
  {
    id: '5',
    name: 'Luiz Carlos',
    category: 'Pedreiro',
    city: 'Aracaju',
    profileImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=400&auto=format&fit=crop',
    bio: 'Do alicerce ao acabamento. Construção de bases para pergolados, assentamento de dormentes e estruturas rurais.',
    rating: 4.8,
    reviewsCount: 52,
    phone: '5579999999995',
    skills: ['Bases de Pergolado', 'Alvenaria', 'Porcelanato', 'Reformas Rurais'],
    verificationTier: 'verificado',
    completedJobsCount: 55,
    projects: [
      { 
        id: 'p10', 
        title: 'Base de Concreto e Assentamento de Dormentes', 
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
        description: 'Fundação sapata para pergolado de grande porte com ancoragem de eucalipto.',
        materialsUsed: ['Dormentes de Madeira Tratada', 'Sapatas Metálicas de Fixação']
      },
    ],
    reviews: [
      { id: 'r7', author: 'Beatriz Martins', rating: 5, text: 'Fez a estrutura de fundação perfeita para meu pergolado.', date: '2024-02-05' },
    ],
  },
  {
    id: '6',
    name: 'Roberto Mendes',
    category: 'Encanador',
    city: 'Nossa Senhora do Socorro',
    profileImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=400&auto=format&fit=crop',
    bio: 'Instalações hidráulicas para irrigação, caixas d\'água em postes de eucalipto e redes residenciais.',
    rating: 4.6,
    reviewsCount: 18,
    phone: '5579999999996',
    skills: ['Caixas d\'Água Elevadas', 'Redes de Irrigação', 'Hidráulica Residencial'],
    verificationTier: 'verificado',
    completedJobsCount: 20,
    projects: [
      { 
        id: 'p12', 
        title: 'Rede de Água Elevada em Postes de Eucalipto', 
        imageUrl: 'https://images.unsplash.com/photo-1585807955513-138379051d9e?q=80&w=800&auto=format&fit=crop',
        description: 'Suporte de caixa d\'água de 5.000L em estrutura de eucalipto autocalvado.',
        materialsUsed: ['Postes de Eucalipto Tratado 16-18cm', 'Vigamentos de Apoio']
      },
    ],
    reviews: [
      { id: 'r8', author: 'João Pedro', rating: 5, text: 'Estrutura super forte e serviço impecável.', date: '2024-01-20' },
    ],
  }
];

export const getProfessionalById = (id: string): Professional | undefined => {
  return mockProfessionals.find(p => p.id === id);
};

export const getAvailableCities = (): string[] => sergipeCities;

export const getProfessionalsByCity = (city: string): Professional[] => {
  const result = mockProfessionals.filter(p => p.city.toLowerCase() === city.toLowerCase());
  return result.length > 0 ? result : mockProfessionals;
};
