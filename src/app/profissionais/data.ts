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
}

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
    phone: '5511999999991',
    skills: ['Móveis Planejados', 'Restauração', 'Design de Interiores'],
    projects: [
      { id: 'p1', title: 'Cozinha Planejada', imageUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800&auto=format&fit=crop' },
      { id: 'p2', title: 'Painel de TV', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop' },
      { id: 'p3', title: 'Guarda-roupa Embutido', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r1', author: 'Ana Costa', rating: 5, text: 'Trabalho impecável! O móvel ficou exatamente como eu queria.', date: '2023-10-15' },
      { id: 'r2', author: 'Roberto Santos', rating: 4, text: 'Muito bom, atrasou um dia mas a qualidade compensou.', date: '2023-09-20' },
    ],
  },
  {
    id: '2',
    name: 'José Ribeiro',
    category: 'Carpinteiro',
    city: 'Estância',
    profileImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop',
    bio: 'Especialista em telhados, pergolados e decks. Trabalho com diversas madeiras, incluindo eucalipto tratado e madeiras nobres.',
    rating: 5.0,
    reviewsCount: 12,
    phone: '5511999999992',
    skills: ['Telhados', 'Pergolados', 'Decks', 'Estruturas'],
    projects: [
      { id: 'p4', title: 'Pergolado de Eucalipto', imageUrl: 'https://images.unsplash.com/photo-1628745277861-12c82b7db5b9?q=80&w=800&auto=format&fit=crop' },
      { id: 'p5', title: 'Deck de Piscina', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r3', author: 'Mariana Lima', rating: 5, text: 'O pergolado ficou lindo, recomendo muito o trabalho do Sr. José.', date: '2023-11-05' },
    ],
  },
  {
    id: '3',
    name: 'Marcos Paulo',
    category: 'Pintor',
    city: 'Aracaju',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Pintura residencial e comercial. Acabamentos finos, texturas e pinturas em geral. Cuidado extremo com a limpeza do local.',
    rating: 4.6,
    reviewsCount: 45,
    phone: '5511999999993',
    skills: ['Pintura Interna', 'Pintura Externa', 'Texturas', 'Massa Corrida'],
    projects: [
      { id: 'p6', title: 'Pintura Residencial Externa', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
      { id: 'p7', title: 'Textura Sala de Estar', imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r4', author: 'Fernando Gomes', rating: 5, text: 'Excelente acabamento e deixou tudo limpo no final.', date: '2023-12-01' },
      { id: 'r5', author: 'Lucia Alves', rating: 4, text: 'Bom serviço, preço justo.', date: '2023-11-15' },
    ],
  },
  {
    id: '4',
    name: 'Antônio Ferreira',
    category: 'Eletricista',
    city: 'Lagarto',
    profileImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=400&auto=format&fit=crop',
    bio: 'Instalações elétricas residenciais e industriais. Projetos luminotécnicos e manutenção preventiva. Segurança em primeiro lugar.',
    rating: 4.9,
    reviewsCount: 28,
    phone: '5511999999994',
    skills: ['Instalação Elétrica', 'Projetos Luminotécnicos', 'Manutenção', 'Quadros de Distribuição'],
    projects: [
      { id: 'p8', title: 'Projeto Luminotécnico', imageUrl: 'https://images.unsplash.com/photo-1563223771-5fe403ec9bc6?q=80&w=800&auto=format&fit=crop' },
      { id: 'p9', title: 'Quadro de Distribuição', imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r6', author: 'Tiago Souza', rating: 5, text: 'Muito profissional e seguro.', date: '2024-01-10' },
    ],
  },
  {
    id: '5',
    name: 'Luiz Carlos',
    category: 'Pedreiro',
    city: 'Aracaju',
    profileImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=400&auto=format&fit=crop',
    bio: 'Do alicerce ao acabamento. Reformas em geral, alvenaria, pisos e revestimentos.',
    rating: 4.7,
    reviewsCount: 52,
    phone: '5511999999995',
    skills: ['Alvenaria', 'Porcelanato', 'Reformas', 'Acabamentos'],
    projects: [
      { id: 'p10', title: 'Reforma de Banheiro', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop' },
      { id: 'p11', title: 'Assentamento de Porcelanato', imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r7', author: 'Beatriz Martins', rating: 5, text: 'Fez a reforma do meu apartamento inteiro, excelente!', date: '2024-02-05' },
    ],
  },
  {
    id: '6',
    name: 'Roberto Mendes',
    category: 'Encanador',
    city: 'Nossa Senhora do Socorro',
    profileImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=400&auto=format&fit=crop',
    bio: 'Instalação e manutenção hidráulica. Caça-vazamentos, água quente e fria, e esgoto.',
    rating: 4.5,
    reviewsCount: 18,
    phone: '5511999999996',
    skills: ['Manutenção Hidráulica', 'Caça-vazamentos', 'Instalações'],
    projects: [
      { id: 'p12', title: 'Tubulação Nova', imageUrl: 'https://images.unsplash.com/photo-1585807955513-138379051d9e?q=80&w=800&auto=format&fit=crop' },
    ],
    reviews: [
      { id: 'r8', author: 'João Pedro', rating: 4, text: 'Resolveu o vazamento rapidamente.', date: '2024-01-20' },
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
