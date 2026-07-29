"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AboutSection } from "./components/AboutSection";
import ScrollReveal from "./components/ScrollReveal";
import { ApiService } from "./services/apiService";
import SpinWheelModal from "./components/SpinWheelModal";
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Phone, 
  Menu, 
  FileText, 
  TrendingUp, 
  Users, 
  Award, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Check, 
  ArrowRight, 
  BarChart2, 
  DollarSign, 
  ShoppingBag as CartIcon,
  MessageSquare, 
  Eye, 
  Calendar, 
  Clock, 
  Tv, 
  Smartphone, 
  Map, 
  AlertTriangle, 
  Layers, 
  Copy, 
  CornerDownRight, 
  Download, 
  Printer, 
  RefreshCw, 
  Gift, 
  SearchIcon, 
  Info,
  Sparkles,
  Flame,
  Sun,
  Moon,
  Zap,
  Bookmark,
  Tractor,
  Layout
} from "lucide-react";
import { Instagram, Facebook, YouTube, WhatsAppIcon, VideoIcon } from "./components/Icons";
import { 
  ResponsiveContainer, 
  AreaChart, 

  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import * as Security from "./utils/securityEngine";
import { Shield, ShieldAlert, Lock, Activity, Globe, Terminal } from "lucide-react";

// ==========================================
// MOCK DATA & CONTEXT CONFIG
// ==========================================

const DEFAULT_SETTINGS = {
  headerAnnouncement: "🚨 Frete grátis em Estância e região para cargas acima de 5 toneladas!",
  whatsappNumber: "5579996298990",
  whatsappText: "Olá! Gostaria de fazer um orçamento de materiais.",
  aboutText: "Fundada com o compromisso de entregar o que há de melhor em madeiras de lei e materiais de construção, a Só Madeiras é referência na região de Estância/SE. Nosso pátio conta com amplo estoque de eucalipto tratado em autoclave, vigamentos de Angelim Vermelho, Tauari, portas premium e telhas de alto desempenho. Atendemos construtores, produtores rurais e clientes residenciais com faturamento facilitado e entrega rápida em todo o sul do estado de Sergipe.",
  address: "Av. Contorno, 465, Estância - SE, CEP 49200-000",
  phone: "(79) 99629-8990",
  workHours: "Segunda a Sexta: 07h30 às 17h30 | Sábado: 07h30 às 12h",
  regionsText: "Atendemos com frota própria em Estância, Aracaju, Itabaiana, Lagarto, Propriá, Tobias Barreto, Nossa Senhora do Socorro e todo o estado de Sergipe e norte da Bahia.",
  instagramUrl: "https://instagram.com/somadeiras",
  facebookUrl: "https://facebook.com/somadeiras",
  youtubeUrl: "https://youtube.com/somadeiras",
  mapsEmbedUrl: "https://maps.google.com/maps?q=So%20Madeiras,%20Est%C3%A2ncia%20-%20SE&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsSearchUrl: "https://www.google.com/maps/search/S%C3%B3+Madeiras+Est%C3%A2ncia+SE",
  showroomImage: "/images/so_madeiras_fachada.webp",
  whatsappPhone: "79996298990",
  fbPixelId: "",
  gtmId: "",
  webhookUrl: ""
};


const DEFAULT_MENU_ITEMS = [
  {
    id: "menu-1",
    label: "MADEIRAS",
    link: "",
    submenus: [
      { id: "sub-1-1", label: "MOURÕES DE EUCALIPTO", link: "/mourao-de-eucalipto-tratado" },
      { id: "sub-1-2", label: "POSTES DE EUCALIPTO", link: "/postes-de-eucalipto-tratado" },
      { id: "sub-1-3", label: "EUCALIPTO TRATADO", link: "/eucalipto-tratado-estancia-se" }
    ]
  },
  {
    id: "menu-2",
    label: "PORTAS & ESQUADRIAS",
    link: "",
    submenus: [
      { id: "sub-2-1", label: "PORTAS DE MADEIRA", link: "/portas-de-madeira" },
      { id: "sub-2-2", label: "JANELAS DE MADEIRA", link: "/janelas-de-madeira" },
      { id: "sub-2-3", label: "PORTAS & JANELAS DE ALUMÍNIO", link: "/portas-e-janelas-de-aluminio" },
      { id: "sub-2-4", label: "PORTAS PIVOTANTES", link: "/portas-pivotantes" },
      { id: "sub-2-5", label: "PORTAS SEMIOCAS", link: "/portas-semiocas" }
    ]
  },
  {
    id: "menu-3",
    label: "PRÉ-MOLDADOS",
    link: "/pre-moldados",
    submenus: [
      { id: "sub-3-1", label: "MUROS PRÉ-MOLDADOS", link: "/pre-moldados" },
      { id: "sub-3-2", label: "MOURÕES DE CONCRETO", link: "/pre-moldados" },
      { id: "sub-3-3", label: "GALPÕES DE CONCRETO", link: "/pre-moldados" }
    ]
  },
  {
    id: "menu-4",
    label: "SIMULADORES 3D",
    link: "",
    submenus: [
      { id: "sub-4-1", label: "PROJETAR PERGOLADO", link: "/pergolados" },
      { id: "sub-4-2", label: "PROJETAR CURRAL / AGRO", link: "/galpoes-currais" },
      { id: "sub-4-3", label: "CALCULAR FORRO PVC", link: "/forro-pvc" },
      { id: "sub-4-4", label: "CALCULADORA DE TELHADOS", link: "/calculadora-telhado" }
    ]
  },
  {
    id: "menu-5",
    label: "LOOKBOOK",
    link: "/lookbook",
    submenus: []
  },
  {
    id: "menu-6",
    label: "PROFISSIONAIS",
    link: "/profissionais",
    submenus: []
  }
];


const DEFAULT_FLASH_DEALS = [
  { id: 15, discountPercent: 0.59, label: "-59%", badge: "Oficial", itemsSold: 38, progress: 38 },
  { id: 2, discountPercent: 0.21, label: "-21%", badge: "Oficial", itemsSold: 75, progress: 75 },
  { id: 8, discountPercent: 0.32, label: "-32%", badge: "Indicado", itemsSold: 28, progress: 28 },
  { id: 17, discountPercent: 0.57, label: "-57%", badge: "Indicado", itemsSold: 38, progress: 38 },
  { id: 3, discountPercent: 0.36, label: "-36%", badge: "Popular", itemsSold: 84, progress: 84 },
  { id: 11, discountPercent: 0.51, label: "-51%", badge: "Oficial", itemsSold: 37, progress: 37 }
];

const DEFAULT_BANNER_SLIDES = [
  {
    id: "slide-1",
    badgeText: "🏷️ CUPOM: BRUTA10 (10% OFF PIX)",
    title: "TUDO PARA SUA\nOBRA EM UM SÓ\nLUGAR",
    subtitle: "Os melhores preços de madeiras nobres e materiais de construção da região.",
    bgImage: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
    alignX: "left", // left, center, right
    alignY: "center", // top, center, bottom
    textAlign: "left", // left, center, right
    fontFamily: "font-display", // font-display (Montserrat), font-sans (Inter), font-serif (Playfair)
    buttonText: "Solicitar Orçamento",
    buttonLink: "#carrinho",
    buttonColor: "#F4B400",
    buttonTextColor: "#3E2723",
    buttonAnimation: "pulse", // none, zoom, pulse, bounce
    hasStamp: true,
    showBadge: true
  },
  {
    id: "slide-2",
    badgeText: "FRETE GRÁTIS EM ESTÂNCIA E REGIÃO*",
    title: "MADEIRAS NOBRES\nTRATADAS EM ESTUFA",
    subtitle: "Estruturas, caibros, vigas e decks de altíssima qualidade com garantia de procedência.",
    bgImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1600&auto=format&fit=crop",
    alignX: "left",
    alignY: "center",
    textAlign: "left",
    fontFamily: "font-display",
    buttonText: "Solicitar Orçamento",
    buttonLink: "#carrinho",
    buttonColor: "#F4B400",
    buttonTextColor: "#3E2723",
    buttonAnimation: "zoom",
    hasStamp: false,
    showBadge: true
  },
  {
    id: "slide-3",
    badgeText: "PARCELAMENTO FACILITADO",
    title: "FERRAMENTAS\nTRAMONTINA",
    subtitle: "Toda a linha elétrica e manual para garantir eficiência e velocidade na sua construção.",
    bgImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
    alignX: "left",
    alignY: "center",
    textAlign: "left",
    fontFamily: "font-display",
    buttonText: "Ver Ferramentas",
    buttonLink: "#carrinho",
    buttonColor: "#F4B400",
    buttonTextColor: "#3E2723",
    buttonAnimation: "bounce",
    hasStamp: false,
    showBadge: true
  }
];

const INITIAL_CATEGORIES = [
  { id: "ferramentas", name: "Ferramentas", icon: "🔨", color: "from-amber-500 to-amber-600" },
  { id: "hidraulico", name: "Material Hidráulico", icon: "🚰", color: "from-blue-500 to-blue-600" },
  { id: "eletrico", name: "Material Elétrico", icon: "⚡", color: "from-yellow-400 to-yellow-500" },
  { id: "pisos", name: "Pisos", icon: "🧱", color: "from-orange-500 to-orange-600" },
  { id: "revestimentos", name: "Revestimentos", icon: "📐", color: "from-neutral-500 to-neutral-600" },
  { id: "madeiras", name: "Madeiras", icon: "🪵", color: "from-amber-800 to-amber-900" },
  { id: "moveis", name: "Móveis de Madeira", icon: "🪑", color: "from-amber-700 to-amber-800" },
  { id: "ferragens", name: "Ferragens", icon: "🔑", color: "from-slate-600 to-slate-700" },
  { id: "tintas", name: "Tintas", icon: "🎨", color: "from-red-500 to-rose-600" },
  { id: "telhas", name: "Telhas", icon: "🏠", color: "from-orange-800 to-amber-900" },
  { id: "jardinagem", name: "Jardinagem", icon: "🌱", color: "from-emerald-500 to-emerald-600" },
  { id: "pesada", name: "Construção Pesada", icon: "🚜", color: "from-gray-700 to-gray-800" }
];

const INITIAL_BRANDS = [
  { name: "Tramontina", origin: "Rio Grande do Sul" },
  { name: "Tigre", origin: "Santa Catarina" },
  { name: "Deca", origin: "São Paulo" },
  { name: "Quartzolit", origin: "São Paulo" },
  { name: "Vedacit", origin: "São Paulo" },
  { name: "Suvinil", origin: "São Paulo" },
  { name: "Gerdau", origin: "Rio Grande do Sul" },
  { name: "Fame", origin: "São Paulo" },
  { name: "Eternit", origin: "São Paulo" },
  { name: "Votorantim", origin: "São Paulo" }
];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto Tramontina 500W", category: "ferramentas", brand: "Tramontina", price: 289.90, stock: 14, rating: 4.8, desc: "Mandril de 1/2 polegada, velocidade variável e reversível.", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Tubo de Esgoto Tigre 100mm 6m", category: "hidraulico", brand: "Tigre", price: 119.90, stock: 42, rating: 4.9, desc: "Tubo de PVC rígido marrom para condução de efluentes domésticos.", img: "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Cabo Flexível Sil 2.5mm² 100m", category: "eletrico", brand: "Fame", price: 189.90, stock: 25, rating: 4.7, desc: "Cabo de cobre antichama isolado em PVC 750V.", img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Viga de Cambará Aparelhada 5x15cm 3m", category: "madeiras", brand: "Só Madeiras", price: 145.00, stock: 80, rating: 4.9, desc: "Madeira nobre de cambará tratada em estufa, aparelhada e desempenada.", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Banco de Jardim em Madeira Maciça", category: "moveis", brand: "Só Madeiras", price: 599.00, stock: 8, rating: 4.6, desc: "Tratamento náutico contra sol e chuva, ideal para 3 lugares.", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Fechadura Colonial Premium Pado", category: "ferragens", brand: "Tramontina", price: 159.90, stock: 19, rating: 4.7, desc: "Acabamento bronze latonado oxidado de alta resistência.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Tinta Acrílica Suvinil Fosca 18L", category: "tintas", brand: "Suvinil", price: 389.00, stock: 30, rating: 4.8, desc: "Excelente cobertura, lavável e sem cheiro em até 3 horas.", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Telha Ecológica Onduline 200x95cm", category: "telhas", brand: "Onduline", price: 79.90, stock: 150, rating: 4.5, desc: "Telha termoacústica leve de alta durabilidade, feita de fibras vegetais impermeabilizadas.", img: "/images/tiles/telha_onduline.webp", coverage: 1.5, weight: 6.4, tileType: "onduline" },
  { id: 9, name: "Aparador de Grama Tramontina 1000W", category: "jardinagem", brand: "Tramontina", price: 249.00, stock: 12, rating: 4.7, desc: "Fio de nylon automático, empunhadura ergonômica regulável.", img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Cimento CP-II Votoran 50kg", category: "pesada", brand: "Votorantim", price: 34.90, stock: 500, rating: 4.9, desc: "Cimento composto com pozolana, excelente trabalhabilidade e secagem rápida.", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Prancha de Ipê Aparelhada 4x20cm 4m", category: "madeiras", brand: "Só Madeiras", price: 320.00, stock: 45, rating: 5.0, desc: "Prancha de altíssima dureza e durabilidade natural. Perfeita para decks de luxo.", img: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Mesa de Jantar Rustica 8 Cadeiras", category: "moveis", brand: "Só Madeiras", price: 2490.00, stock: 3, rating: 4.9, desc: "Fabricada em madeira de demolição autêntica peroba rosa com acabamento em cera.", img: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=400&q=80" },
  { id: 13, name: "Porta Pivotante Angelim Maciça 2.10x1.00m", category: "madeiras", brand: "Só Madeiras", price: 1890.00, stock: 5, rating: 5.0, desc: "Acompanha pino pivotante de inox e fechadura rolete de alta segurança.", img: "/images/doors/porta_pivotante_angelim.webp", woodType: "angelim", grooves: false, handle: "pivot" },
  { id: 14, name: "Porta Maciça Frisada Tauari 2.10x0.80m", category: "madeiras", brand: "Só Madeiras", price: 789.90, stock: 12, rating: 4.8, desc: "Madeira nobre de reflorestamento com secagem técnica em estufa.", img: "/images/doors/porta_frisada_tauari.webp", woodType: "tauari", grooves: true, handle: "standard" },
  { id: 15, name: "Porta de Madeira Colmeia 70x210 cm HDF - Madelar", category: "madeiras", brand: "Madelar", price: 199.00, stock: 35, rating: 4.7, desc: "Capa em HDF de alta densidade com enchimento acústico leve em colmeia Madelar.", img: "/images/doors/porta_colmeia_madelar.webp", woodType: "eucalipto", grooves: false, handle: "standard" },
  { id: 16, name: "Kit Porta Pronta Completo com Batente e Fechadura", category: "madeiras", brand: "Só Madeiras", price: 649.00, stock: 8, rating: 4.9, desc: "Acompanha batente (portal), alizar (guarnição), dobradiças de inox e fechadura instaladas.", img: "/images/doors/kit_porta_pronta.webp", woodType: "tauari", grooves: true, handle: "kit", frame: true },
  { id: 17, name: "Telha Cerâmica Portuguesa Natural", category: "telhas", brand: "Só Madeiras", price: 2.99, stock: 4500, rating: 4.8, desc: "Telha cerâmica vermelha tradicional portuguesa, excelente isolamento e encaixe perfeito.", img: "/images/tiles/telha_portuguesa.webp", coverage: 17.0, weight: 2.8, tileType: "ceramic" },
  { id: 18, name: "Telha de Concreto Plana Grafite", category: "telhas", brand: "Tegula", price: 8.50, stock: 1800, rating: 4.9, desc: "Telha de concreto de alta resistência, design moderno plano na cor cinza grafite.", img: "/images/tiles/telha_concreto.webp", coverage: 10.4, weight: 4.8, tileType: "concrete" },
  { id: 19, name: "Telha Esmaltada Americana Premium", category: "telhas", brand: "Só Madeiras", price: 4.20, stock: 2500, rating: 4.7, desc: "Telha esmaltada dupla-face americana, altíssimo brilho, impermeável a fungos.", img: "/images/tiles/telha_esmaltada.webp", coverage: 12.0, weight: 3.1, tileType: "glazed" }
];


const INITIAL_BLOG_POSTS = [
  { id: 1, title: "Como escolher a madeira certa para o seu telhado", date: "28 Mai 2026", excerpt: "Saiba a diferença de resistência e peso entre Cambará, Garapeira e Eucalipto tratado.", views: 340, readTime: "5 min" },
  { id: 2, title: "Ferramentas indispensáveis para obras residenciais", date: "15 Mai 2026", excerpt: "Um guia prático com os itens elétricos e manuais básicos para não parar sua reforma.", views: 212, readTime: "4 min" }
];

const INITIAL_LEADS = [
  { id: "lead-1", name: "Carlos Souza", phone: "19987654321", city: "Campinas", state: "SP", date: "2026-05-30", time: "14:35", source: "Google Ads", utm: "utm_source=google&utm_medium=cpc&utm_campaign=madeiras", products: ["Viga de Cambará Aparelhada 5x15cm 3m x 10"], total: 1450.00, status: "Venda Fechada", sellerId: "maria", device: "Android / Chrome", location: "Campinas - SP", notes: "Cliente precisava para entrega imediata. Fechou frete grátis." },
  { id: "lead-2", name: "Juliana Mendes", phone: "11988223344", city: "São Paulo", state: "SP", date: "2026-05-31", time: "09:12", source: "Instagram", utm: "utm_source=instagram&utm_medium=social&utm_campaign=moveis", products: ["Banco de Jardim em Madeira Maciça x 1"], total: 599.00, status: "Novo Lead", sellerId: "joao", device: "iOS / Safari", location: "São Paulo - Capital", notes: "" },
  { id: "lead-3", name: "Roberto Dias", phone: "21977665544", city: "Niterói", state: "RJ", date: "2026-05-31", time: "10:05", source: "Busca Direta", utm: "Tráfego Direto", products: ["Furadeira de Impacto Tramontina 500W x 1", "Tinta Acrílica Suvinil Fosca 18L x 2"], total: 1067.90, status: "Orçamento Enviado", sellerId: "pedro", device: "Windows / Edge", location: "Niterói - RJ", notes: "Interessado em desconto no Pix. PDF enviado." },
  { id: "lead-4", name: "Fernando Costa", phone: "19999881122", city: "Indaiatuba", state: "SP", date: "2026-05-29", time: "16:45", source: "Google Ads", utm: "utm_source=google&utm_medium=cpc&utm_campaign=pesada", products: ["Cimento CP-II Votoran 50kg x 40"], total: 1396.00, status: "Em Atendimento", sellerId: "maria", device: "Windows / Chrome", location: "Indaiatuba - SP", notes: "Cotação para fundação. Aguardando retorno da engenharia sobre frete." },
  { id: "lead-5", name: "Ana Clara Silva", phone: "15981112233", city: "Sorocaba", state: "SP", date: "2026-05-28", time: "11:20", source: "Facebook", utm: "utm_source=facebook&utm_medium=cpc&utm_campaign=reforma", products: ["Tubo de Esgoto Tigre 100mm 6m x 6"], total: 719.40, status: "Venda Perdida", sellerId: "joao", device: "iOS / FacebookApp", location: "Sorocaba - SP", notes: "Achou o prazo de entrega muito longo para o interior." }
];

const INITIAL_SELLERS = [
  { id: "joao", name: "João (Móveis & Acabamento)", commissionRate: 0.03, salesCount: 14, salesValue: 12450.00, activeLeads: 4, goal: 30000.00, avatar: "👨‍💼", phone: "19999990001" },
  { id: "maria", name: "Maria (Madeiras & Estruturas)", commissionRate: 0.035, salesCount: 22, salesValue: 28400.00, activeLeads: 6, goal: 40000.00, avatar: "👩‍💼", phone: "19999990002" },
  { id: "pedro", name: "Pedro (Ferragens & Hidráulico)", commissionRate: 0.025, salesCount: 18, salesValue: 15600.00, activeLeads: 5, goal: 25000.00, avatar: "👨‍💻", phone: "19999990003" }
];

const INITIAL_TELHAS = [
  { id: 8, name: "Telha Ecológica Onduline 200x95cm", brand: "Onduline", price: 79.90, coverage: 1.5, weight: 6.4, img: "/images/tiles/telha_onduline.png", tileType: "onduline", minSlope: 10, maxSlope: 45, qtyPerSqm: 0.67, desc: "Termoacústica, ecológica e leve. Ideal para coberturas rápidas e isolamento de alto nível.", notes: "Excelente isolamento térmico." },
  { id: 17, name: "Telha Cerâmica Portuguesa Natural", brand: "Só Madeiras", price: 2.99, coverage: 17.0, weight: 2.8, img: "/images/tiles/telha_portuguesa.png", tileType: "ceramic", minSlope: 30, maxSlope: 60, qtyPerSqm: 17.0, desc: "Vermelha tradicional de encaixe perfeito. Visual clássico colonial com durabilidade eterna.", notes: "Encaixe reforçado contra ventos." },
  { id: 18, name: "Telha de Concreto Plana Grafite", brand: "Tegula", price: 8.50, coverage: 10.4, weight: 4.8, img: "/images/tiles/telha_concreto.png", tileType: "concrete", minSlope: 35, maxSlope: 75, qtyPerSqm: 10.4, desc: "Moderna, resistente a tempestades. Encaixe firme com acabamento liso e requinte minimalista.", notes: "Garantia de 20 anos contra gretamento." },
  { id: 19, name: "Telha Esmaltada Americana Premium", brand: "Só Madeiras", price: 4.20, coverage: 12.0, weight: 3.1, img: "/images/tiles/telha_esmaltada.png", tileType: "glazed", minSlope: 30, maxSlope: 60, qtyPerSqm: 12.0, desc: "Dupla-face brilhante e impermeável. Proteção total contra infiltrações e fungos.", notes: "Impermeável e lavável pela chuva." }
];



const INITIAL_COUPONS = [
  { id: "coupon-1", code: "SOMADEIRAS5", type: "percentage", value: 5, minPurchase: 500, active: true },
  { id: "coupon-2", code: "BRUTA10", type: "percentage", value: 10, minPurchase: 2000, active: true },
  { id: "coupon-3", code: "SOMA50", type: "fixed", value: 50.00, minPurchase: 1000, active: true }
];


// Banner slides data (aliased for initial type safety)
const BANNER_SLIDES = DEFAULT_BANNER_SLIDES;

// Helper to render high-fidelity corporate brand logos
function BrandLogo({ name }: { name: string }) {
  const n = name.toLowerCase();
  
  if (n === "tramontina") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <svg className="h-4.5 w-auto text-[#E53935]" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 2,7 2,17 12,22 22,17 22,7" />
        </svg>
        <span className="font-display font-extrabold text-xs md:text-sm tracking-widest text-[#333333] dark:text-gray-100 uppercase">TRAMONTINA</span>
      </div>
    );
  }
  
  if (n === "tigre") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <svg className="h-5 w-auto text-[#0D47A1]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm-1 3.5h2V12h-2V6.5zm1 11a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
        </svg>
        <span className="font-display font-black text-sm md:text-base tracking-tighter text-[#0D47A1] dark:text-[#42a5f5] uppercase italic">TIGRE</span>
      </div>
    );
  }
  
  if (n === "deca") {
    return (
      <div className="flex items-center h-8 select-none">
        <span className="font-display font-light text-sm md:text-base tracking-[0.25em] text-[#111111] dark:text-gray-100 uppercase">DECA</span>
      </div>
    );
  }
  
  if (n === "quartzolit") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <div className="flex -skew-x-12 text-[8px] font-black scale-90">
          <span className="bg-[#FFD600] text-black px-1.5 py-0.5 rounded-l-xs">weber</span>
          <span className="bg-[#004F9F] text-white px-1.5 py-0.5 rounded-r-xs">saint-gobain</span>
        </div>
        <span className="font-sans font-black text-sm md:text-base text-[#004F9F] dark:text-[#ffca28] lowercase tracking-tighter">quartzolit</span>
      </div>
    );
  }
  
  if (n === "vedacit") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <svg className="h-4.5 w-auto text-[#FFC107]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <span className="font-display font-black text-xs md:text-sm text-[#212121] dark:text-gray-100 tracking-tight uppercase">VEDACIT</span>
      </div>
    );
  }
  
  if (n === "suvinil") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <div className="flex gap-0.5 scale-90">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D00] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] shadow-xs" />
        </div>
        <span className="font-display font-extrabold text-sm md:text-base text-[#212121] dark:text-[#ffb74d] tracking-tight">suvinil</span>
      </div>
    );
  }
  
  if (n === "gerdau") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <svg className="h-4.5 w-auto text-[#01579B]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 5h3v3H5zm11 0h3v3h-3zm-11 11h3v3H5zm11 0h3v3h-3z" />
          <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="font-display font-black text-xs md:text-sm text-[#01579B] dark:text-[#29b6f6] tracking-tight uppercase">GERDAU</span>
      </div>
    );
  }
  
  if (n === "fame") {
    return (
      <div className="flex items-center h-8 select-none">
        <span className="bg-[#D32F2F] text-white font-display font-black text-[10px] md:text-xs px-2.5 py-0.5 rounded-md tracking-wider italic shadow-md">FAME</span>
      </div>
    );
  }
  
  if (n === "eternit") {
    return (
      <div className="flex items-center gap-1.5 h-8 select-none">
        <div className="bg-[#D32F2F] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-xs">E</div>
        <span className="font-display font-extrabold text-xs md:text-sm text-[#D32F2F] dark:text-[#ef5350] tracking-tight uppercase">Eternit</span>
      </div>
    );
  }
  
  if (n === "votorantim") {
    return (
      <div className="flex items-center gap-1 h-8 select-none">
        <svg className="h-4.5 w-auto text-[#00796B]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 10l8 8 8-8-8-8z" />
        </svg>
        <span className="font-display font-extrabold text-xs md:text-sm text-[#00796B] dark:text-[#26a69a] tracking-tight">Votorantim</span>
      </div>
    );
  }

  return <span className="font-bold text-gray-400">{name}</span>;
}

interface PopupConfig {
  id: string;
  title: string;
  description: string;
  flyerImage: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  buttonTextColor: string;
  roundedBorder: "none" | "md" | "xl" | "3xl" | "full";
  bgType: "flat" | "gradient" | "glass";
  bgColor1: string;
  bgColor2: string;
  animation: "fade" | "slide-up" | "zoom" | "bounce";
  triggerType: "delay" | "scroll" | "exit-intent";
  triggerValue: number;
  targetPage: "home" | "forro" | "pergolado" | "all";
  isActive: boolean;
}

const POPUP_PRESETS: (Omit<PopupConfig, "id"> & { name: string })[] = [
  {
    name: "🔥 Feirão Só Madeiras",
    title: "🔥 GRANDE FEIRÃO SÓ MADEIRAS!",
    description: "Descontos imperdíveis de até 20% em vigas de Cambará, decks de Ipê e pergolados roliços apenas nesta semana. Clique e chame um vendedor!",
    flyerImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    buttonText: "⚡ Falar com Vendedor no WhatsApp",
    buttonLink: "https://api.whatsapp.com/send?phone=5519999881122&text=Olá,%20tenho%20interesse%20nas%20ofertas%20do%20Feirão%20Só%20Madeiras!",
    buttonColor: "#F4B400",
    buttonTextColor: "#3E2723",
    bgType: "gradient",
    bgColor1: "#3E2723",
    bgColor2: "#5D4037",
    animation: "slide-up",
    roundedBorder: "xl",
    triggerType: "delay",
    triggerValue: 3,
    targetPage: "home",
    isActive: true
  },
  {
    name: "🌧️ Oferta Forro PVC",
    title: "🌧️ FORRO PVC PREMIUM DESCONTADO!",
    description: "Seu teto protegido de goteiras e umidade com estética elegante. Placas de 20cm de largura por R$ 22,90/m²! Calcule e garanta ripas e parafusos grátis!",
    flyerImage: "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&w=600&q=80",
    buttonText: "📊 Calcular Meu Cômodo Agora",
    buttonLink: "/forro-pvc",
    buttonColor: "#0284C7",
    buttonTextColor: "#FFFFFF",
    bgType: "flat",
    bgColor1: "#0F172A",
    bgColor2: "#1E293B",
    animation: "bounce",
    roundedBorder: "xl",
    triggerType: "scroll",
    triggerValue: 30,
    targetPage: "forro",
    isActive: true
  },
  {
    name: "📐 Orçamento de Pergolados",
    title: "📐 CRIAÇÃO DE PERGOLADO EXCLUSIVO",
    description: "Espaço gourmet ou jardim dos seus sonhos com Eucalipto Roliço Autoclavado Premium. Preço direto de serraria e frete rápido. Simule agora!",
    flyerImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    buttonText: "✨ Simular Pergolado 3D Grátis",
    buttonLink: "/pergolados",
    buttonColor: "#10B981",
    buttonTextColor: "#FFFFFF",
    bgType: "glass",
    bgColor1: "#1E0F0B",
    bgColor2: "#3E2723",
    animation: "zoom",
    roundedBorder: "full",
    triggerType: "exit-intent",
    triggerValue: 0,
    targetPage: "pergolado",
    isActive: true
  }
];

export default function SoMadeirasFullStack() {
  // Navigation / View modes
  // 'client' | 'admin' | 'seller'
  const [viewMode, setViewMode] = useState<"client" | "admin" | "seller">("client");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // ── Security Central States ──────────────────────────────────────────
  const [isIpBlocked, setIsIpBlocked] = useState<boolean>(false);
  const [securityLogs, setSecurityLogs] = useState<Security.SecurityLog[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<Security.SecurityAlert[]>([]);
  const [securityIncidents, setSecurityIncidents] = useState<Security.SecurityIncident[]>([]);
  const [securitySessions, setSecuritySessions] = useState<Security.SecuritySession[]>([]);
  const [blockedIps, setBlockedIps] = useState<string[]>([]);
  const [securityConfig, setSecurityConfig] = useState<Security.SecurityConfig>(Security.DEFAULT_SECURITY_CONFIG);
  const [deviceFp, setDeviceFp] = useState<string>("");
  const [threatScore, setThreatScore] = useState<number>(0);
  const [selectedIncident, setSelectedIncident] = useState<Security.SecurityIncident | null>(null);
  const [incidentNotes, setIncidentNotes] = useState<string>("");
  const [adminPinInput, setAdminPinInput] = useState<string>("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminRole, setAdminRole] = useState<string>("Administrador"); // Permissões


  const [settings, setSettings] = useState<any>(DEFAULT_SETTINGS);
  const [flashDeals, setFlashDeals] = useState<any[]>(DEFAULT_FLASH_DEALS);
  const [bannerSlides, setBannerSlides] = useState<any[]>(DEFAULT_BANNER_SLIDES);
  const [menuItems, setMenuItems] = useState<any[]>(DEFAULT_MENU_ITEMS);

  // Drag-and-drop state for slide button positioning
  const [isDraggingButton, setIsDraggingButton] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragStartOffsets, setDragStartOffsets] = useState({ x: 0, y: 0 });

  const handleButtonDragMove = (e: React.MouseEvent) => {
    if (!isDraggingButton || editingSlideIndex === null || !bannerSlides[editingSlideIndex]) return;
    const deltaX = e.clientX - dragStartPos.x;
    const deltaY = e.clientY - dragStartPos.y;
    
    const updated = [...bannerSlides];
    updated[editingSlideIndex].buttonOffsetX = Math.max(-400, Math.min(400, (dragStartOffsets.x || 0) + deltaX));
    updated[editingSlideIndex].buttonOffsetY = Math.max(-200, Math.min(200, (dragStartOffsets.y || 0) + deltaY));
    setBannerSlides(updated);
  };

  const handleButtonDragEnd = () => {
    if (isDraggingButton) {
      setIsDraggingButton(false);
    }
  };


  // Notifications
  const [notifications, setNotifications] = useState<Array<{ id: number, text: string, time: string }>>([
    { id: 1, text: "Novo lead recebido: Carlos Souza solicitou orçamento via WhatsApp!", time: "10 min atrás" },
    { id: 2, text: "Meta de vendas atingida por Maria! Parabéns!", time: "1 hora atrás" }
  ]);

  // DB States (initialized from localStorage or mock data)
  const [products, setProducts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);
  const [telhasList, setTelhasList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Telhas CRUD Modal State
  const [isTelhaModalOpen, setIsTelhaModalOpen] = useState(false);
  const [editingTelha, setEditingTelha] = useState<any | null>(null);
  const [telhaForm, setTelhaForm] = useState({
    name: "",
    desc: "",
    img: "",
    brand: "Só Madeiras",
    tileType: "ceramic",
    coverage: "12.0",
    weight: "3.0",
    price: "5.00",
    minSlope: "30",
    maxSlope: "60",
    qtyPerSqm: "12.0",
    notes: ""
  });


  // Client Front-end States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [budgetCart, setBudgetCart] = useState<Array<{ product: any, quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState({ name: "", phone: "", city: "", state: "SP" });
  const [isWhatsappWidgetOpen, setIsWhatsappWidgetOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);

  // Minha Conta / Client Dashboard States
  const [isMinhaContaOpen, setIsMinhaContaOpen] = useState(false);
  const [activeClient, setActiveClient] = useState<{ 
    name: string, 
    phone: string, 
    city: string, 
    state: string, 
    email?: string, 
    provider?: string,
    isProfessional?: boolean,
    professionalType?: string,
    registerNumber?: string,
    cpfCnpj?: string,
    commissionBalance?: number,
    pendingBalance?: number,
    partnerCode?: string,
    indicatedLeadsCount?: number
  } | null>(null);
  const [clientLoginForm, setClientLoginForm] = useState({ name: "", username: "", phone: "", city: "Estância", state: "SE" });
  const [selectedTrackingLeadId, setSelectedTrackingLeadId] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"traditional" | "staff">("traditional");
  const [staffLoginForm, setStaffLoginForm] = useState<{ role: "admin" | "seller", pin: string }>({ role: "admin", pin: "" });
  const [isSocialConnecting, setIsSocialConnecting] = useState(false);
  const [socialProvider, setSocialProvider] = useState<"google" | "facebook" | null>(null);
  const [emailLoginForm, setEmailLoginForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    city: "",
    state: "SE",
    isSignUp: false
  });
  const [isProRegister, setIsProRegister] = useState(false);
  const [proType, setProType] = useState<"arquiteto" | "engenheiro" | "marceneiro" | "mestre_obras">("arquiteto");
  const [proRegister, setProRegister] = useState("");
  const [proCpfCnpj, setProCpfCnpj] = useState("");


  // Tile Calculator States
  const [selectedTileId, setSelectedTileId] = useState<number>(8);
  const [roofArea, setRoofArea] = useState<number>(50);
  const [roofPitch, setRoofPitch] = useState<number>(30);
  const [roofLoss, setRoofLoss] = useState<number>(10);

  // Flash Sale Countdown States
  const [flashTime, setFlashTime] = useState({ hours: 2, minutes: 9, seconds: 59 });

  // Heatmap tracking (100% dados reais)
  const [clicksHeatmap, setClicksHeatmap] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("somadeiras_clicks_heatmap");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return {};
  });

  // Admin states
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  // Popup Creator System Types and State (Elementor Pro style)

  const [popupCampaign, setPopupCampaign] = useState<PopupConfig>({
    id: "popup-camp",
    title: "🔥 GRANDE FEIRÃO SÓ MADEIRAS!",
    description: "Descontos imperdíveis de até 20% em vigas de Cambará, decks de Ipê e pergolados roliços apenas nesta semana. Clique e chame um vendedor!",
    flyerImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    buttonText: "⚡ Falar com Vendedor no WhatsApp",
    buttonLink: "https://api.whatsapp.com/send?phone=5519999881122&text=Olá,%20tenho%20interesse%20nas%20ofertas%20do%20Feirão%20Só%20Madeiras!",
    buttonColor: "#F4B400",
    buttonTextColor: "#3E2723",
    roundedBorder: "xl",
    bgType: "gradient",
    bgColor1: "#3E2723",
    bgColor2: "#5D4037",
    animation: "slide-up",
    triggerType: "delay",
    triggerValue: 3,
    targetPage: "home",
    isActive: true
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasPopupBeenDismissed, setHasPopupBeenDismissed] = useState(false);

  const [previewKey, setPreviewKey] = useState(0);
  const [adminToast, setAdminToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Save draft lead data as the user types
  useEffect(() => {
    if (leadFormData.name || leadFormData.phone || leadFormData.city) {
      localStorage.setItem("somadeiras_draft_lead", JSON.stringify(leadFormData));
    }
  }, [leadFormData]);

  // Capture lead abandonment when modal closes without submission
  useEffect(() => {
    if (!leadModalOpen && !isSubmitted && budgetCart.length > 0 && (leadFormData.name.trim() || leadFormData.phone.trim())) {
      const phoneDigits = leadFormData.phone.replace(/\D/g, "");
      if (phoneDigits.length >= 8) {
        const alreadySaved = leads.some(l => 
          l.phone.replace(/\D/g, "") === phoneDigits && 
          l.status === "Carrinho Abandonado" &&
          l.products.join(",") === budgetCart.map(i => `${i.product.name} x ${i.quantity}`).join(",")
        );
        
        if (!alreadySaved) {
          const assignedSeller = getNextSellerRoundRobin();
          const cartSubtotal = budgetCart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
          let couponDiscount = 0;
          if (appliedCoupon) {
            if (appliedCoupon.type === "percentage") {
              couponDiscount = cartSubtotal * (appliedCoupon.value / 100);
            } else if (appliedCoupon.type === "fixed") {
              couponDiscount = Math.min(cartSubtotal, appliedCoupon.value);
            }
          }
          const cartTotalAfterCoupon = cartSubtotal - couponDiscount;
          
          const newAbandonedLead = {
            id: `lead-abandoned-${Date.now()}`,
            name: leadFormData.name || "Cliente Anônimo",
            phone: leadFormData.phone,
            city: leadFormData.city || "Não informada",
            state: leadFormData.state || "SP",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            source: "Abandono de Checkout",
            utm: "utm_source=checkout&utm_medium=cart_abandonment",
            products: budgetCart.map(i => `${i.product.name} x ${i.quantity}`),
            total: parseFloat(cartTotalAfterCoupon.toFixed(2)),
            status: "Carrinho Abandonado",
            sellerId: assignedSeller.id,
            device: window.innerWidth < 768 ? "Mobile (iOS/Safari)" : "Desktop (Windows/Chrome)",
            location: `${leadFormData.city || "Não informada"} - ${leadFormData.state || "SP"}`,
            notes: appliedCoupon 
              ? `Carrinho de orçamento abandonado. Cupom aplicado: ${appliedCoupon.code} (-R$ ${couponDiscount.toFixed(2)})` 
              : "Carrinho de orçamento abandonado durante o preenchimento do formulário."
          };

          
          const updatedLeads = [newAbandonedLead, ...leads];
          updateLeads(updatedLeads);

          // Google/Meta analytical tracking
          if (typeof window !== "undefined" && (window as any).fbq) {
            try {
              (window as any).fbq("track", "InitiateCheckout", {
                value: parseFloat(cartTotalAfterCoupon.toFixed(2)),
                currency: "BRL"
              });
            } catch (e) {}
          }
          if (typeof window !== "undefined" && (window as any).dataLayer) {
            try {
              (window as any).dataLayer.push({
                event: "checkout_abandoned",
                lead_id: newAbandonedLead.id,
                value: parseFloat(cartTotalAfterCoupon.toFixed(2)),
                currency: "BRL"
              });
            } catch (e) {}
          }

          // Webhook notification
          if (settings?.webhookUrl) {
            fetch(settings.webhookUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                eventType: "checkout_abandoned",
                timestamp: new Date().toISOString(),
                lead: newAbandonedLead,
                seller: assignedSeller
              })
            }).catch(() => {});
          }

          addSystemNotification("⚠️ Carrinho Abandonado! Tentativa de cotação capturada no CRM.");

        }
      }
    }
  }, [leadModalOpen]);

  // Load popup campaign on client mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem("somadeiras_active_popup");
      if (saved) {
        setPopupCampaign(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erro ao carregar popup no admin:", e);
    }
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setAdminToast({ message, type });
    setTimeout(() => {
      setAdminToast(null);
    }, 4000);
  };

  const handleSavePopupCampaign = (updatedConfig: PopupConfig) => {
    setPopupCampaign(updatedConfig);
    try {
      localStorage.setItem("somadeiras_active_popup", JSON.stringify(updatedConfig));
      window.dispatchEvent(new Event("somadeiras_reload_popup"));
      showToast("🚀 Campanha de Popup salva com sucesso e ativa no site!");
    } catch (err) {
      console.error(err);
      showToast("❌ Erro ao salvar campanha de popup.", "error");
    }
  };

  const [adminTab, setAdminTab] = useState<"dashboard" | "crm" | "heatmap" | "recovery" | "crud-products" | "crud-categories" | "blog" | "popup-builder" | "flash-deals" | "settings" | "banner-builder" | "menu-builder" | "vendedores" | "cupons" | "section-banners">("dashboard");
  const [nextSellerIndex, setNextSellerIndex] = useState<number>(0);
  const [onlyMyLeadsFilter, setOnlyMyLeadsFilter] = useState<boolean>(false);
  const [newSellerName, setNewSellerName] = useState("");
  const [newSellerGoal, setNewSellerGoal] = useState("30000");
  const [newSellerCommission, setNewSellerCommission] = useState("3");
  const [newSellerAvatar, setNewSellerAvatar] = useState("👨‍💼");
  const [newSellerPhone, setNewSellerPhone] = useState("");
  const [newSellerPhotoUrl, setNewSellerPhotoUrl] = useState("");



  const [coupons, setCoupons] = useState<any[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponType, setNewCouponType] = useState("percentage");
  const [newCouponValue, setNewCouponValue] = useState("10");
  const [newCouponMinPurchase, setNewCouponMinPurchase] = useState("0");
  const [selectedCouponProducts, setSelectedCouponProducts] = useState<number[]>([]);
  const [selectedCouponCategories, setSelectedCouponCategories] = useState<string[]>([]);



  // Giveaway active state
  const [giveawayActive, setGiveawayActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("giveawayActive");
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Bulk Importer States
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkInputTab, setBulkInputTab] = useState<"text" | "grid">("text");
  const [bulkText, setBulkText] = useState("");
  const [bulkGridRows, setBulkGridRows] = useState<Array<{ name: string; price: string; pricePix: string }>>([
    { name: "", price: "", pricePix: "" }
  ]);
  const [bulkProcessedProducts, setBulkProcessedProducts] = useState<any[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [activeImageSelectorProductIndex, setActiveImageSelectorProductIndex] = useState<number | null>(null);
  const [editingSlideIndex, setEditingSlideIndex] = useState<number>(0);
  const [crudEditProduct, setCrudEditProduct] = useState<any>(null);

  // ── Banner Zones (inter-section banners) ──────────────────────────────
  type BannerImage = { url: string; link: string; alt: string };
  type GridType = "3-col" | "1-full" | "1big-3small";
  type BannerZonePosition = "after-hero" | "after-flash" | "after-doors" | "after-bestsellers" | "after-products";
  type BannerZoneData = { id: BannerZonePosition; label: string; gridType: GridType; banners: BannerImage[]; active: boolean };

  const DEFAULT_BANNER_ZONES: BannerZoneData[] = [
    { id: "after-hero",        label: "Após o Hero / Calculadoras",       gridType: "3-col",       banners: [], active: false },
    { id: "after-flash",       label: "Após Ofertas Relâmpago",           gridType: "1-full",      banners: [], active: false },
    { id: "after-doors",       label: "Após Seção de Portas Premium",     gridType: "1big-3small", banners: [], active: false },
    { id: "after-bestsellers", label: "Após Campeões de Vendas",          gridType: "3-col",       banners: [], active: false },
    { id: "after-products",    label: "Após Grade de Produtos",           gridType: "1-full",      banners: [], active: false },
  ];

  const [bannerZones, setBannerZones] = useState<BannerZoneData[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("somadeiras_banner_zones");
        return saved ? JSON.parse(saved) : DEFAULT_BANNER_ZONES;
      } catch { return DEFAULT_BANNER_ZONES; }
    }
    return DEFAULT_BANNER_ZONES;
  });
  const [editingBannerZoneId, setEditingBannerZoneId] = useState<BannerZonePosition | null>(null);

  const saveBannerZones = (zones: BannerZoneData[]) => {
    setBannerZones(zones);
    localStorage.setItem("somadeiras_banner_zones", JSON.stringify(zones));
  };

  const handleMenuLinkClick = (e: React.MouseEvent, link: string) => {
    if (!link) return;
    
    // Check if it's a category filtering link
    if (link.includes("cat=")) {
      e.preventDefault();
      const catId = link.split("cat=")[1];
      setSelectedCategoryFilter(catId);
      const element = document.getElementById("produtos-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      trackClick(`menu-cat-${catId}`);
    } else if (link.startsWith("#") || link.startsWith("/#")) {
      e.preventDefault();
      const anchor = link.startsWith("/#") ? link.substring(1) : link;
      if (anchor === "#carrinho") {
        setIsCartOpen(true);
      } else {
        const element = document.querySelector(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      trackClick(`menu-anchor-${anchor}`);
    }
  };

  // Google Images PNG Searcher States
  const [googleImageResults, setGoogleImageResults] = useState<string[]>([]);
  const [isSearchingImages, setIsSearchingImages] = useState(false);

  const handleSearchGoogleImages = async (queryParam?: string | React.MouseEvent | any, silent = false) => {
    let nameInput = "";
    let isSilent = silent;
    if (typeof queryParam === 'string' && queryParam.trim().length > 0) {
      nameInput = queryParam;
      isSilent = true; // programmatic calls are silent
    } else {
      nameInput = (typeof document !== 'undefined' ? (document.getElementsByName("name")[0] as HTMLInputElement)?.value : "") || "";
    }

    if (!nameInput || nameInput.trim().length < 2) {
      if (!isSilent) {
        alert("Por favor, preencha o Nome do Produto antes de buscar imagens.");
      }
      return;
    }
    
    const brandInput = (typeof document !== 'undefined' ? (document.getElementsByName("brand")[0] as HTMLInputElement)?.value : "") || "";
    
    setIsSearchingImages(true);
    setGoogleImageResults([]);
    
    try {
      // Call the local backend API route we created with brand fallback support
      const response = await fetch(`/api/search?q=${encodeURIComponent(nameInput.trim())}&brand=${encodeURIComponent(brandInput.trim())}`);
      if (!response.ok) throw new Error("Erro na rota de busca");
      
      const data = await response.json();
      const finalUrls = data.images || [];
      
      if (finalUrls.length === 0) {
        if (!isSilent) {
          alert("Nenhuma imagem encontrada no Google. Tente refinar o nome do produto.");
        }
      } else {
        setGoogleImageResults(finalUrls);
      }
    } catch (err) {
      console.error(err);
      if (!isSilent) {
        alert("Erro ao conectar ao buscador do Google. Tente novamente.");
      }
    } finally {
      setIsSearchingImages(false);
    }
  };

  // Seller states
  const [activeSellerId, setActiveSellerId] = useState("maria");
  const [selectedSellerLead, setSelectedSellerLead] = useState<any>(null);
  const [sellerInvoicePDFOpen, setSellerInvoicePDFOpen] = useState(false);

  // Dynamic recommendations based on current view or cart
  const recommendedProducts = useMemo(() => {
    if (budgetCart.length === 0) {
      return products.slice(0, 3);
    }
    const categoriesInCart = budgetCart.map(i => i.product.category);
    // recommend products of other categories or same
    return products
      .filter(p => !budgetCart.some(i => i.product.id === p.id))
      .slice(0, 3);
  }, [budgetCart, products]);

  const ON_DUTY_SELLERS = useMemo(() => [
    {
      id: "joao",
      name: "João Silva",
      role: "Especialista em Eucalipto, Mourões e Postes",
      phone: settings?.whatsappNumber || "5579996298990",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      online: true,
      badge: "Eucalipto & Campo",
      whatsappMessage: "Olá! Gostaria de falar com o vendedor João.",
    },
    {
      id: "maria",
      name: "Maria Santos",
      role: "Especialista em Portas Nobres e Forro PVC",
      phone: settings?.whatsappNumber || "5579996298990",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      online: true,
      badge: "Acabamentos & Portas",
      whatsappMessage: "Olá! Gostaria de falar com a vendedora Maria.",
    },
    {
      id: "carlos",
      name: "Carlos Oliveira",
      role: "Engenharia de Telhados, Pergolados e Currais",
      phone: settings?.whatsappNumber || "5579996298990",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      online: true,
      badge: "Calculadoras & Projetos",
      whatsappMessage: "Olá! Gostaria de falar com o especialista Carlos.",
    },
    {
      id: "atendimento",
      name: "Atendimento Geral",
      role: "Balcão de Vendas - Estância/SE",
      phone: settings?.whatsappNumber || "5579996298990",
      avatar: "/images/logo.webp",
      online: true,
      badge: "Balcão de Vendas",
      whatsappMessage: "Olá! Gostaria de fazer um orçamento com o atendimento da Só Madeiras.",
    },
  ], [settings]);

  // Load and Save localStorage DB
  useEffect(() => {
    setMounted(true);
    // Load local storage or default data
    const localProds = localStorage.getItem("somadeiras_products");
    const localLeads = localStorage.getItem("somadeiras_leads");
    const localSellers = localStorage.getItem("somadeiras_sellers");
    const localTelhas = localStorage.getItem("somadeiras_tiles");
    const localCats = localStorage.getItem("somadeiras_categories");
    const localPosts = localStorage.getItem("somadeiras_blog_posts");
    const localHeatmap = localStorage.getItem("somadeiras_heatmap");
    const localCart = localStorage.getItem("somadeiras_cart");
    const localSettings = localStorage.getItem("somadeiras_settings");
    const localFlashDeals = localStorage.getItem("somadeiras_flash_deals");
    const localBannerSlides = localStorage.getItem("somadeiras_banner_slides");
    const localMenuItems = localStorage.getItem("somadeiras_menu_items");

    if (localProds) setProducts(JSON.parse(localProds)); else setProducts(INITIAL_PRODUCTS);
    if (localLeads) setLeads(JSON.parse(localLeads)); else setLeads(INITIAL_LEADS);
    if (localSellers) setSellers(JSON.parse(localSellers)); else setSellers(INITIAL_SELLERS);
    if (localTelhas) setTelhasList(JSON.parse(localTelhas)); else setTelhasList(INITIAL_TELHAS);
    if (localCats) setCategories(JSON.parse(localCats)); else setCategories(INITIAL_CATEGORIES);

    setBrands(INITIAL_BRANDS);
    if (localPosts) setBlogPosts(JSON.parse(localPosts)); else setBlogPosts(INITIAL_BLOG_POSTS);
    if (localHeatmap) setClicksHeatmap(JSON.parse(localHeatmap));
    if (localSettings) setSettings(JSON.parse(localSettings));
    if (localFlashDeals) setFlashDeals(JSON.parse(localFlashDeals));
    if (localBannerSlides) setBannerSlides(JSON.parse(localBannerSlides));
    if (localMenuItems) setMenuItems(JSON.parse(localMenuItems)); else setMenuItems(DEFAULT_MENU_ITEMS);

    
    const localNextSellerIndex = localStorage.getItem("somadeiras_next_seller_index");
    if (localNextSellerIndex) setNextSellerIndex(parseInt(localNextSellerIndex, 10));

    const localCoupons = localStorage.getItem("somadeiras_coupons");
    if (localCoupons) setCoupons(JSON.parse(localCoupons)); else setCoupons(INITIAL_COUPONS);


    
    if (localCart) {
      try {
        setBudgetCart(JSON.parse(localCart));
      } catch (err) {
        console.error("Erro ao carregar o carrinho:", err);
      }
    }

    const localDraft = localStorage.getItem("somadeiras_draft_lead");
    if (localDraft) {
      try {
        setLeadFormData(JSON.parse(localDraft));
      } catch (e) {}
    }

    const savedClient = localStorage.getItem("somadeiras_logged_in_client");
    if (savedClient) {
      try {
        const client = JSON.parse(savedClient);
        setActiveClient(client);
        setClientLoginForm({
          name: client.name || "",
          username: client.username || "",
          phone: client.phone || "",
          city: client.city || "Estância",
          state: client.state || "SE"
        });
      } catch (e) {}
    }
  }, []);

  // ── Security Central Engine Initialization ──────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initial State Sync & Clear any simulated IP blocks
    try { localStorage.removeItem("somadeiras_blocked_ips"); } catch(e) {}
    setIsIpBlocked(false);

    setSecurityLogs(Security.SecurityRepository.getLogs());
    setSecurityAlerts(Security.SecurityRepository.getAlerts());
    setSecurityIncidents(Security.SecurityRepository.getIncidents());
    setSecuritySessions(Security.SecurityRepository.getSessions());
    setBlockedIps(Security.SecurityRepository.getBlockedIps());
    setSecurityConfig(Security.SecurityRepository.getConfig());
    setThreatScore(Security.SecurityRepository.getThreatScore());

    // 2. Browser Fingerprinting
    Security.generateFingerprint().then((fp) => {
      setDeviceFp(fp);
      sessionStorage.setItem("somadeiras_device_fp", fp);
    });

    // 3. Session Initialization
    let sessionToken = sessionStorage.getItem("somadeiras_session_token");
    if (!sessionToken) {
      sessionToken = "sess_" + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("somadeiras_session_token", sessionToken);
      
      Security.SecurityRepository.addLog(
        "Acesso do Usuário",
        "Visitante",
        `Novo visitante acessou a plataforma. OS: ${Security.parseUserAgent(navigator.userAgent).os}, Browser: ${Security.parseUserAgent(navigator.userAgent).browser}`,
        "Low"
      );
      Security.SecurityRepository.addSession("visitante@somadeiras.com.br", "Cliente", sessionToken);
    }

    // 4. Anti-Scraper behavioral tracking
    const scraper = new Security.ScraperDefense();
    const onMouseMove = () => scraper.trackMouseMove();
    const onScroll = () => scraper.trackScroll();
    const onClick = () => scraper.trackClick();
    const onBlur = () => scraper.trackBlur();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("click", onClick);
    window.addEventListener("blur", onBlur);

    // Automation checking
    if (/headless|puppeteer|selenium|playwright/i.test(navigator.userAgent) || navigator.webdriver) {
      Security.SecurityRepository.incrementThreatScore(
        Security.THREAT_SCORES.HEADLESS_BROWSER,
        "Browser Automatizado (Headless)",
        "Navegador acionado por ferramenta de automação (Selenium/Playwright/Puppeteer)"
      );
    }

    // 5. Periodic Threat Assessment & Sync Interval
    const syncInterval = setInterval(() => {
      const evaluation = scraper.evaluateScore();
      if (evaluation.classification === "Bot") {
        Security.SecurityRepository.incrementThreatScore(
          Security.THREAT_SCORES.SCRAPER,
          "Comportamento de Bot Scraper",
          "Velocidade mecânica de cliques e movimentação sem foco"
        );
      }

      // Sync state variables
      setThreatScore(Security.SecurityRepository.getThreatScore());
      setSecurityLogs(Security.SecurityRepository.getLogs());
      setSecurityAlerts(Security.SecurityRepository.getAlerts());
      setSecurityIncidents(Security.SecurityRepository.getIncidents());
      setSecuritySessions(Security.SecurityRepository.getSessions());
      setBlockedIps(Security.SecurityRepository.getBlockedIps());
      setSecurityConfig(Security.SecurityRepository.getConfig());

      // Keep logs synced without blocking storefront users
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      window.removeEventListener("blur", onBlur);
      clearInterval(syncInterval);
    };
  }, []);


  // Dynamic injection of GTM and Facebook Pixel scripts
  useEffect(() => {
    if (!mounted || !settings) return;

    // 1. Facebook Pixel
    if (settings.fbPixelId && !document.getElementById("fb-pixel-script")) {
      const fbScript = document.createElement("script");
      fbScript.id = "fb-pixel-script";
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${settings.fbPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

    // 2. Google Tag Manager
    if (settings.gtmId && !document.getElementById("gtm-script")) {
      const gtmScript = document.createElement("script");
      gtmScript.id = "gtm-script";
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settings.gtmId}');
      `;
      document.head.appendChild(gtmScript);
    }
  }, [settings, mounted]);

  // Save cart to local storage whenever it changes

  useEffect(() => {
    localStorage.setItem("somadeiras_cart", JSON.stringify(budgetCart));
  }, [budgetCart]);

  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Automatic banner slide interval
  useEffect(() => {
    if (bannerSlides.length === 0) return;
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // Flash Sale Live Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 9, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Automatic image search on product editing
  useEffect(() => {
    if (crudEditProduct?.name) {
      handleSearchGoogleImages(crudEditProduct.name, true);
    } else {
      setGoogleImageResults([]);
    }
  }, [crudEditProduct]);

  // Real Page Views and Staff Auto-Login Check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentViews = parseInt(localStorage.getItem("somadeiras_real_views") || "0", 10);
      localStorage.setItem("somadeiras_real_views", (currentViews + 1).toString());

      const urlParams = new URLSearchParams(window.location.search);
      const isStaffMode = urlParams.get("mode") === "staff";
      const isStaffAuth = localStorage.getItem("somadeiras_staff_authenticated") === "true";

      if (isStaffMode || isStaffAuth) {
        setIsAdminAuthenticated(true);
        setViewMode("admin");
      }
    }
  }, []);

  // Sync state changes with localStorage
  function updateProducts(newProds: any[]) { setProducts(newProds); saveToLocal("somadeiras_products", newProds); }
  function updateLeads(newLeads: any[]) { setLeads(newLeads); saveToLocal("somadeiras_leads", newLeads); }
  function updateSellers(newSellers: any[]) { setSellers(newSellers); saveToLocal("somadeiras_sellers", newSellers); }
  function updateTelhas(newTelhas: any[]) { setTelhasList(newTelhas); saveToLocal("somadeiras_tiles", newTelhas); }
  function updateHeatmap(newHeat: any) { setClicksHeatmap(newHeat); saveToLocal("somadeiras_heatmap", newHeat); }
  function updateCoupons(newCoupons: any[]) { setCoupons(newCoupons); saveToLocal("somadeiras_coupons", newCoupons); }



  const getNextSellerRoundRobin = () => {
    if (sellers.length === 0) {
      return { id: "maria", name: "Maria", avatar: "👩‍💼" };
    }
    const localIndexStr = localStorage.getItem("somadeiras_next_seller_index");
    let index = localIndexStr ? parseInt(localIndexStr, 10) : 0;
    if (isNaN(index) || index < 0) index = 0;

    const assigned = sellers[index % sellers.length];

    const nextIndex = (index + 1) % sellers.length;
    setNextSellerIndex(nextIndex);
    localStorage.setItem("somadeiras_next_seller_index", nextIndex.toString());

    return assigned;
  };


  // ==========================================
  // CLICK ANALYTICS ENGINE
  // ==========================================
  const trackClick = (elementId: string) => {
    const updated = { ...clicksHeatmap, [elementId]: (clicksHeatmap[elementId] || 0) + 1 };
    updateHeatmap(updated);
  };

  // ==========================================
  // CLIENT ACTIONS
  // ==========================================
  const addToCart = (product: any, customQty?: number) => {
    trackClick(`btn-add-budget-${product.id}`);
    const qtyToAdd = customQty !== undefined ? customQty : 1;
    const existing = budgetCart.find(item => item.product.id === product.id);
    if (existing) {
      setBudgetCart(budgetCart.map(item => 
        item.product.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
      ));
    } else {
      setBudgetCart([...budgetCart, { product, quantity: qtyToAdd }]);
    }
    // Notification popup
    addSystemNotification(`Produto "${product.name}" adicionado ao carrinho de orçamento!`);
  };

  const updateCartQty = (productId: number, delta: number) => {
    const updated = budgetCart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as Array<{ product: any, quantity: number }>;
    setBudgetCart(updated);
  };

  const removeFromCart = (productId: number) => {
    setBudgetCart(budgetCart.filter(item => item.product.id !== productId));
  };


  const getCouponApplicableSubtotal = (coupon: any, cart: any[]) => {
    const hasProductRestriction = coupon.applicableProducts && coupon.applicableProducts.length > 0;
    const hasCategoryRestriction = coupon.applicableCategories && coupon.applicableCategories.length > 0;
    
    if (!hasProductRestriction && !hasCategoryRestriction) {
      return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }
    
    return cart.reduce((acc, item) => {
      const matchesProduct = hasProductRestriction && coupon.applicableProducts.includes(item.product.id);
      const matchesCategory = hasCategoryRestriction && coupon.applicableCategories.includes(item.product.category);
      
      const isApplicable = (hasProductRestriction && matchesProduct) || (hasCategoryRestriction && matchesCategory);
      
      if (isApplicable) {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
  };

  const handleApplyCoupon = (overrideCode?: string | React.MouseEvent) => {
    const codeToApply = typeof overrideCode === "string" ? overrideCode : couponInput;
    if (!codeToApply || !codeToApply.trim()) {
      alert("Por favor, digite um código de cupom.");
      return;
    }
    const target = coupons.find(c => c.code.toUpperCase() === codeToApply.trim().toUpperCase());
    if (!target) {
      // Dynamic coupon from Spin Wheel or special promotions
      const dynamicCoupon = {
        code: codeToApply.toUpperCase(),
        type: "percentage",
        value: codeToApply.includes("50") ? 50 : codeToApply.includes("10") ? 10 : 5,
        minPurchase: 0,
        active: true,
      };
      setAppliedCoupon(dynamicCoupon);
      setCouponInput("");
      return;
    }
    if (!target.active) {
      alert("Este cupom não está ativo no momento.");
      return;
    }
    const applicableSubtotal = getCouponApplicableSubtotal(target, budgetCart);
    if (applicableSubtotal <= 0 && budgetCart.length > 0) {
      alert("Este cupom não é aplicável a nenhum dos produtos do seu carrinho.");
      return;
    }
    if (applicableSubtotal < target.minPurchase) {
      alert(`Este cupom exige uma compra mínima de R$ ${target.minPurchase.toFixed(2)} em produtos elegíveis.`);
      return;
    }
    setAppliedCoupon(target);
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    alert("Cupom removido.");
  };


  function addSystemNotification(text: string) {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Agora mesmo"
    };
    setNotifications([newNotif, ...notifications.slice(0, 8)]);
  }

  // WhatsApp generation flow
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormData.name || !leadFormData.phone || !leadFormData.city) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Save lead to local database
    const cartText = budgetCart.map(item => `   - ${item.product.name} (Qtd: ${item.quantity}) - R$ ${item.product.price.toFixed(2)}/un`).join("\n");
    const cartSubtotal = budgetCart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
    const cartPixSubtotal = budgetCart.reduce((acc, curr) => acc + (((curr.product as any).pricePix || curr.product.price * 0.9) * curr.quantity), 0);
    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        couponDiscount = cartSubtotal * (appliedCoupon.value / 100);
      } else if (appliedCoupon.type === "fixed") {
        couponDiscount = Math.min(cartSubtotal, appliedCoupon.value);
      }
    }
    const cartTotalAfterCoupon = cartSubtotal - couponDiscount;
    const pixTotal = appliedCoupon
      ? Math.max(0, cartPixSubtotal - (appliedCoupon.type === "percentage" ? cartPixSubtotal * (appliedCoupon.value / 100) : couponDiscount))
      : cartPixSubtotal;
    
    // Choose random seller or cycle
    const assignedSeller = getNextSellerRoundRobin();


    const newLead = {
      id: `lead-${Date.now()}`,
      name: leadFormData.name,
      phone: leadFormData.phone,
      city: leadFormData.city,
      state: leadFormData.state,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: document.referrer ? "Tráfego de Referência" : "Google Ads",
      utm: "utm_source=google&utm_medium=cpc&utm_campaign=orcamento_rapido",
      products: budgetCart.map(i => `${i.product.name} x ${i.quantity}`),
      total: parseFloat(cartTotalAfterCoupon.toFixed(2)),
      status: "Novo Lead",
      sellerId: assignedSeller.id,
      device: window.innerWidth < 768 ? "Mobile (iOS/Safari)" : "Desktop (Windows/Chrome)",
      location: `${leadFormData.city} - ${leadFormData.state}`,
      notes: appliedCoupon 
        ? `Lead gerado no orçamento com cupom ${appliedCoupon.code} (-R$ ${couponDiscount.toFixed(2)})` 
        : "Lead gerado no orçamento automático do site."
    };

    const updatedLeads = [newLead, ...leads];
    updateLeads(updatedLeads);

    // Sync with NestJS / PostgreSQL Backend API
    ApiService.sendBudgetOrder({
      clientName: leadFormData.name,
      clientPhone: leadFormData.phone,
      clientCity: leadFormData.city,
      items: budgetCart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
      totalAmount: parseFloat(cartTotalAfterCoupon.toFixed(2)),
      notes: newLead.notes,
    });
    ApiService.registerLead(leadFormData.phone, leadFormData.name);

    // 1. Facebook Pixel Event
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("track", "Lead", {
          value: parseFloat(cartTotalAfterCoupon.toFixed(2)),
          currency: "BRL",
          content_name: "Orçamento de Materiais"
        });
      } catch (err) {
        console.error("Erro ao registrar Pixel:", err);
      }
    }

    // 2. Google Tag Manager (dataLayer push)
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      try {
        (window as any).dataLayer.push({
          event: "lead_submitted",
          lead_id: newLead.id,
          lead_name: newLead.name,
          value: parseFloat(cartTotalAfterCoupon.toFixed(2)),
          currency: "BRL",
          products: newLead.products
        });
      } catch (err) {
        console.error("Erro ao registrar GTM:", err);
      }
    }

    // 3. Webhook notification POST
    if (settings?.webhookUrl) {
      fetch(settings.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventType: "lead_created",
          timestamp: new Date().toISOString(),
          lead: newLead,
          seller: assignedSeller,
          appliedCoupon: appliedCoupon ? {
            code: appliedCoupon.code,
            discount: couponDiscount
          } : null
        })
      }).catch(err => console.error("Erro ao disparar webhook:", err));
    }


    const loggedInUser = {
      name: leadFormData.name,
      phone: leadFormData.phone,
      city: leadFormData.city,
      state: leadFormData.state
    };
    setActiveClient(loggedInUser);
    localStorage.setItem("somadeiras_logged_in_client", JSON.stringify(loggedInUser));

    addSystemNotification(`🔥 Novo Lead! ${leadFormData.name} acabou de solicitar orçamento!`);

    // WhatsApp Message layout
    let waMessage = `Olá! Meu nome é *${leadFormData.name}* (${leadFormData.city}-${leadFormData.state}).\n\nTenho interesse nos seguintes produtos:\n${cartText}\n\n*Subtotal:* R$ ${cartSubtotal.toFixed(2)}\n`;
    if (appliedCoupon) {
      waMessage += `*Cupom Aplicado:* ${appliedCoupon.code} (-R$ ${couponDiscount.toFixed(2)})\n`;
    }
    waMessage += `*Total Estimado:* R$ ${cartTotalAfterCoupon.toFixed(2)}\n*Total Exclusivo Pix:* R$ ${pixTotal.toFixed(2)}\n\nGostaria de receber um orçamento formal em PDF e combinar a entrega.`;

    const encodedMsg = encodeURIComponent(waMessage);
    const targetPhone = assignedSeller.phone || settings?.whatsappPhone || "19999999999";
    const waUrl = `https://api.whatsapp.com/send?phone=55${targetPhone.replace(/\D/g, "")}&text=${encodedMsg}`;


    // Reset client cart & state
    setIsSubmitted(true);
    setBudgetCart([]);
    setAppliedCoupon(null);
    setLeadModalOpen(false);
    setIsCartOpen(false);
    localStorage.removeItem("somadeiras_draft_lead");


    // Open WhatsApp
    window.open(waUrl, "_blank");
  };

  // Direct checkout product trigger
  const buySingleProductViaWhatsApp = (product: any, customQty?: number) => {
    trackClick(`btn-whatsapp-product-${product.id}`);
    const qty = customQty !== undefined ? customQty : 1;
    // Add item to cart temporarily then open lead modal
    setBudgetCart([{ product, quantity: qty }]);
    setLeadModalOpen(true);
  };

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategoryFilter]);

  // ==========================================
  // ANALYTICS CALCULATIONS (100% DADOS REAIS)
  // ==========================================
  const statsSummary = useMemo(() => {
    const realViews = typeof window !== "undefined" ? parseInt(localStorage.getItem("somadeiras_real_views") || "1", 10) : 1;
    const totalVisits = realViews;
    const whatsappClicks = Object.keys(clicksHeatmap)
      .filter(k => k.includes("whatsapp") || k.includes("checkout"))
      .reduce((acc, curr) => acc + (clicksHeatmap[curr] || 0), 0);

    const generatedLeads = leads.length;
    const salesWon = leads.filter(l => l.status === "Venda Fechada");
    const salesValue = salesWon.reduce((acc, curr) => acc + curr.total, 0);
    const salesCount = salesWon.length;
    const ticketMedio = salesCount > 0 ? salesValue / salesCount : 0;
    const faturamentoEst = leads.reduce((acc, curr) => acc + (curr.status === "Venda Fechada" ? curr.total : 0), 0);
    const lucroEst = faturamentoEst * 0.35; // 35% margin on wood/building materials

    return {
      visits: totalVisits,
      waClicks: whatsappClicks,
      leadsCount: generatedLeads,
      carrinhosCriados: leads.length + budgetCart.length,
      carrinhosAbandonados: Math.max(0, (leads.length + budgetCart.length) - salesCount),
      faturamento: faturamentoEst,
      lucro: lucroEst,
      ticket: ticketMedio,
      conversao: totalVisits > 0 ? (salesCount / totalVisits) * 100 : 0
    };
  }, [leads, clicksHeatmap, budgetCart]);

  // Dashboard charts data
  const leadsTimelineData = [
    { name: "Seg", Visitas: 140, Leads: 12, Vendas: 4 },
    { name: "Ter", Visitas: 168, Leads: 18, Vendas: 6 },
    { name: "Qua", Visitas: 185, Leads: 15, Vendas: 8 },
    { name: "Qui", Visitas: 210, Leads: 22, Vendas: 11 },
    { name: "Sex", Visitas: 245, Leads: 31, Vendas: 15 },
    { name: "Sab", Visitas: 320, Leads: 45, Vendas: 21 },
    { name: "Dom", Visitas: statsSummary.visits, Leads: statsSummary.leadsCount, Vendas: leads.filter(l => l.status === "Venda Fechada").length }
  ];

  const sourceLeadsData = [
    { name: "Google Ads", value: leads.filter(l => l.source === "Google Ads").length, color: "#3E2723" },
    { name: "Instagram", value: leads.filter(l => l.source === "Instagram").length, color: "#6D4C41" },
    { name: "Busca Direta", value: leads.filter(l => l.source === "Busca Direta").length, color: "#FFC107" },
    { name: "Facebook", value: leads.filter(l => l.source === "Facebook").length, color: "#8D6E63" }
  ];

  const funnelData = [
    { name: "Visitantes", value: statsSummary.visits },
    { name: "Visualizou Prod", value: Math.round(statsSummary.visits * 0.7) },
    { name: "Add Orçamento", value: Math.round(statsSummary.visits * 0.35) },
    { name: "Iniciou Whats", value: statsSummary.waClicks },
    { name: "Lead CRM", value: statsSummary.leadsCount },
    { name: "Venda Concluída", value: leads.filter(l => l.status === "Venda Fechada").length }
  ];

  // ==========================================
  // SELLER PANEL ACTIONS
  // ==========================================
  const activeSeller = useMemo(() => {
    return sellers.find(s => s.id === activeSellerId) || sellers[0];
  }, [sellers, activeSellerId]);

  const sellerLeads = useMemo(() => {
    if (onlyMyLeadsFilter) {
      return leads.filter(l => l.sellerId === activeSellerId);
    }
    return leads;
  }, [leads, activeSellerId, onlyMyLeadsFilter]);


  const sellerProgressPercent = useMemo(() => {
    if (!activeSeller) return 0;
    return Math.min(100, (activeSeller.salesValue / activeSeller.goal) * 100);
  }, [activeSeller]);

  // Update CRM Lead status and propagate seller statistics
  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    const previousLead = leads.find(l => l.id === leadId);
    if (!previousLead) return;

    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    updateLeads(updated);

    // If status transitioned to "Venda Fechada", credit the sales seller
    if (newStatus === "Venda Fechada" && previousLead.status !== "Venda Fechada") {
      const seller = sellers.find(s => s.id === previousLead.sellerId);
      if (seller) {
        const updatedSellers = sellers.map(s => {
          if (s.id === seller.id) {
            return {
              ...s,
              salesCount: s.salesCount + 1,
              salesValue: s.salesValue + previousLead.total
            };
          }
          return s;
        });
        updateSellers(updatedSellers);
        addSystemNotification(`🎉 Venda de R$ ${previousLead.total.toFixed(2)} fechada por ${seller.name}!`);
      }
    }
  };

  // CRUD Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
    const brand = (form.elements.namedItem("brand") as HTMLInputElement).value;
    const price = parseFloat((form.elements.namedItem("price") as HTMLInputElement).value);
    const pricePixInput = form.elements.namedItem("pricePix") as HTMLInputElement;
    const pricePix = pricePixInput && pricePixInput.value ? parseFloat(pricePixInput.value) : undefined;
    const stock = parseInt((form.elements.namedItem("stock") as HTMLInputElement).value);
    const desc = (form.elements.namedItem("desc") as HTMLTextAreaElement).value;
    const img = (form.elements.namedItem("img") as HTMLInputElement).value || "🪵";
    const videoUrl = (form.elements.namedItem("videoUrl") as HTMLInputElement)?.value || "";
    const videoPlayMode = (form.elements.namedItem("videoPlayMode") as HTMLSelectElement)?.value || "5s";
    const soldCount = parseInt((form.elements.namedItem("soldCount") as HTMLInputElement)?.value || "0");

    if (crudEditProduct) {
      // Edit mode
      const updated = products.map(p => 
        p.id === crudEditProduct.id ? { ...p, name, category, brand, price, pricePix, stock, desc, img, videoUrl, videoPlayMode, soldCount } : p
      );
      updateProducts(updated);
      setCrudEditProduct(null);
      addSystemNotification(`Catálogo: Produto "${name}" atualizado com sucesso!`);
    } else {
      // Create mode
      const newProd = {
        id: Date.now(),
        name,
        category,
        brand,
        price,
        pricePix,
        stock,
        rating: 5.0,
        desc,
        img,
        videoUrl,
        videoPlayMode,
        soldCount
      };
      updateProducts([newProd, ...products]);
      addSystemNotification(`Catálogo: Novo produto "${name}" adicionado ao site!`);
    }
    form.reset();
  };


  // Helper to parse bulk text lines
  const parseBulkText = () => {
    if (!bulkText.trim()) return [];
    const lines = bulkText.split("\n");
    const parsed: any[] = [];
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      if (!cleanLine) return;
      
      let name = "";
      let price = 0;
      let pricePix: number | undefined = undefined;
      
      const parts = cleanLine.split(/\s*[-:;]\s*/);
      if (parts.length >= 2) {
        name = parts[0].trim();
        const priceBlock = parts.slice(1).join("-").trim();
        
        const porMatch = priceBlock.match(/([\d,.]+)\s+por\s+([\d,.]+)/i);
        if (porMatch) {
          price = parseFloat(porMatch[1].replace(/\./g, "").replace(",", "."));
          pricePix = parseFloat(porMatch[2].replace(/\./g, "").replace(",", "."));
        } else {
          const priceMatch = priceBlock.match(/([\d,.]+)/);
          if (priceMatch) {
            price = parseFloat(priceMatch[1].replace(/\./g, "").replace(",", "."));
          }
        }
      } else {
        name = cleanLine;
      }
      
      if (name) {
        parsed.push({ name, price, pricePix });
      }
    });
    return parsed;
  };

  // Keyboard navigation for spreadsheet-like grid entry
  const handleGridCellKeyDown = (e: React.KeyboardEvent, rowIndex: number, field: "name" | "price" | "pricePix") => {
    if (e.key === "Tab" && field === "pricePix" && rowIndex === bulkGridRows.length - 1) {
      e.preventDefault();
      
      const newRows = [...bulkGridRows, { name: "", price: "", pricePix: "" }];
      setBulkGridRows(newRows);
      
      setTimeout(() => {
        const nextInput = document.getElementById(`grid-input-name-${rowIndex + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }, 50);
    }
  };

  // Perform bulk image search and process catalog item attributes
  const handleProcessBulkImport = async () => {
    setIsBulkProcessing(true);
    let rawItems: any[] = [];
    
    if (bulkInputTab === "text") {
      rawItems = parseBulkText();
    } else {
      rawItems = bulkGridRows
        .filter(r => r.name.trim())
        .map(r => ({
          name: r.name.trim(),
          price: parseFloat(r.price.replace(",", ".")) || 0,
          pricePix: r.pricePix ? parseFloat(r.pricePix.replace(",", ".")) : undefined
        }));
    }
    
    if (rawItems.length === 0) {
      alert("Nenhum produto válido encontrado. Preencha a lista ou a planilha.");
      setIsBulkProcessing(false);
      return;
    }
    
    const processed: any[] = [];
    
    for (let i = 0; i < rawItems.length; i++) {
      const item = rawItems[i];
      let imagesList: string[] = [];
      let selectedImg = "🪵";
      
      let guessedCategory = "madeiras";
      const nameLower = item.name.toLowerCase();
      if (nameLower.includes("cimento") || nameLower.includes("argamassa") || nameLower.includes("tijolo") || nameLower.includes("areia") || nameLower.includes("pedra")) {
        guessedCategory = "pesada";
      } else if (nameLower.includes("telha") || nameLower.includes("cumeeira") || nameLower.includes("rufo")) {
        guessedCategory = "telhas";
      } else if (nameLower.includes("furadeira") || nameLower.includes("martelo") || nameLower.includes("trena") || nameLower.includes("serrote") || nameLower.includes("chave")) {
        guessedCategory = "ferramentas";
      } else if (nameLower.includes("tubo") || nameLower.includes("conexão") || nameLower.includes("torneira") || nameLower.includes("sifão")) {
        guessedCategory = "hidraulico";
      } else if (nameLower.includes("fio") || nameLower.includes("cabo") || nameLower.includes("disjuntor") || nameLower.includes("soquete") || nameLower.includes("lâmpada")) {
        guessedCategory = "eletrico";
      } else if (nameLower.includes("tinta") || nameLower.includes("pincel") || nameLower.includes("rolo") || nameLower.includes("selador")) {
        guessedCategory = "tintas";
      }
      
      let fetchedDesc = "";

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(item.name)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.images && data.images.length > 0) {
            imagesList = data.images;
            selectedImg = data.images[0];
          }
          if (data.description && data.description.length > 20) {
            fetchedDesc = data.description;
          }
        }
      } catch (err) {
        console.error("Erro ao buscar fotos/descrição:", err);
      }

      processed.push({
        id: Date.now() + i + Math.floor(Math.random() * 1000),
        name: item.name,
        category: guessedCategory,
        brand: "Só Madeiras",
        price: item.price,
        pricePix: item.pricePix,
        stock: 100,
        rating: 5.0,
        desc: fetchedDesc || `${item.name} de alta qualidade e durabilidade para sua obra.`,
        img: selectedImg,
        imagesList: imagesList,
        soldCount: 0
      });
    }
    
    setBulkProcessedProducts(processed);
    setIsBulkProcessing(false);
  };

  const handleSaveBulkProducts = () => {
    if (bulkProcessedProducts.length === 0) return;
    
    const newProductsList = [
      ...bulkProcessedProducts.map(p => {
        const { imagesList, ...rest } = p;
        return rest;
      }),
      ...products
    ];
    
    updateProducts(newProductsList);
    setIsBulkModalOpen(false);
    setBulkProcessedProducts([]);
    setBulkText("");
    setBulkGridRows([{ name: "", price: "", pricePix: "" }]);
    addSystemNotification(`Catálogo: ${bulkProcessedProducts.length} produtos importados em lote com sucesso!`);
  };

  const handleDuplicateProduct = (prod: any) => {
    const dup = {
      ...prod,
      id: Date.now(),
      name: `${prod.name} (Cópia)`
    };
    updateProducts([dup, ...products]);
    addSystemNotification(`Catálogo: Duplicado o produto "${prod.name}"`);
  };

  const handleDeleteProduct = (prodId: number) => {
    if (confirm("Tem certeza que deseja remover este produto do catálogo?")) {
      updateProducts(products.filter(p => p.id !== prodId));
      addSystemNotification("Catálogo: Produto excluído com sucesso.");
    }
  };

  // Dynamic layout setup
  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brown-dark text-primary">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-10 w-10 animate-spin" />
          <p className="font-semibold text-lg tracking-wider">CARREGANDO SÓ MADEIRAS...</p>
        </div>
      </div>
    );
  }

  // ── BannerZone renderer ───────────────────────────────────────────────
  const renderBannerZone = (zoneId: string) => {
    const zone = bannerZones.find(z => z.id === zoneId);
    if (!zone || !zone.active || zone.banners.length === 0) return null;

    const imgs = zone.banners;

    const imgEl = (b: { url: string; link: string; alt: string }, cls = "") => (
      <a key={b.url + b.link} href={b.link || "#"} target={b.link ? "_blank" : "_self"} rel="noopener noreferrer"
        className={`block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group ${cls}`}>
        <img src={b.url} alt={b.alt || "Banner Só Madeiras"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </a>
    );

    return (
      <div className="max-w-7xl mx-auto px-4 py-4 w-full no-print animate-fade-in">
        {zone.gridType === "3-col" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {imgs.slice(0, 3).map((b, i) => (
              <div key={i} className="h-32 sm:h-40">{imgEl(b, "h-full")}</div>
            ))}
          </div>
        )}
        {zone.gridType === "1-full" && imgs[0] && (
          <div className="h-40 sm:h-56 w-full">{imgEl(imgs[0], "h-full w-full")}</div>
        )}
        {zone.gridType === "1big-3small" && (
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "auto" }}>
            <div className="row-span-3 h-56 sm:h-64">{imgs[0] && imgEl(imgs[0], "h-full")}</div>
            <div className="h-[80px] sm:h-[82px]">{imgs[1] && imgEl(imgs[1], "h-full")}</div>
            <div className="h-[80px] sm:h-[82px]">{imgs[2] && imgEl(imgs[2], "h-full")}</div>
            <div className="h-[80px] sm:h-[82px]">{imgs[3] && imgEl(imgs[3], "h-full")}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-full flex flex-col overflow-x-hidden ${darkMode ? "dark" : ""}`}>
      
      {/* ==========================================
          TOP USER ACCESS & HEADER BAR
          ========================================== */}
      <div className="no-print bg-brown-dark text-white border-b-2 border-primary/30 px-4 py-2 text-xs flex flex-col md:flex-row justify-between items-center gap-2 z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-gray-300 font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Estância - SE & Região</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-gray-300 font-medium">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>(79) 99629-8990</span>
          </div>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold text-[11px]">
            🚚 Entrega Rápida em Sergipe
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Session Status (Admin / Seller / Client) */}
          {viewMode !== "client" || activeClient || isAdminAuthenticated ? (
            <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white text-[11px]">
                {viewMode === "admin"
                  ? "🛡️ Admin (Cockpit CRM)"
                  : viewMode === "seller"
                  ? "💼 Vendedor"
                  : `👤 ${activeClient?.name || "Cliente"}`}
              </span>
              <button
                onClick={() => {
                  setViewMode("client");
                  setIsAdminAuthenticated(false);
                  setActiveClient(null);
                }}
                className="ml-1 text-xs text-red-300 hover:text-red-100 underline font-semibold"
                title="Encerrar sessão"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSpinWheelOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-[#3E2723] font-black text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer animate-pulse"
                title="Gire a roleta e ganhe descontos no WhatsApp"
              >
                <span>🎁 Roleta de Prêmios</span>
              </button>
              <Link
                href="/sorteio"
                className="bg-amber-500 hover:bg-amber-400 text-[#3E2723] font-black text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                title="Concorra a prêmios no Sorteio do Mês"
              >
                <span>🏆 Sorteio do Mês</span>
              </Link>
              <button
                onClick={() => setIsMinhaContaOpen(true)}
                className="bg-primary hover:bg-primary/90 text-brown-dark font-extrabold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <Users className="h-3.5 w-3.5" /> Área de Login / Entrar
              </button>
            </div>

          )}

          {/* Notifications dropdown count */}
          <div className="relative group cursor-pointer">
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold animate-pulse">
              {notifications.length}
            </span>
            <span className="text-gray-300 hover:text-white transition text-xs">🔔</span>
            <div className="hidden group-hover:block absolute right-0 mt-2 bg-white text-brown-dark w-72 rounded-lg shadow-xl border border-gray-200 p-2 z-[999] text-xs dark:text-white">
              <h5 className="font-bold border-b border-gray-100 pb-1.5 mb-1.5 text-brown-medium">Notificações do Sistema</h5>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-1.5 hover:bg-slate-50 rounded transition text-[11px] leading-relaxed">
                    <p className="font-medium text-gray-800">{n.text}</p>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark Mode toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-1.5 rounded bg-brown-medium hover:bg-brown-light text-primary transition"
            title="Alternar Tema"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ==========================================
          CLIENT PERSPECTIVE (STOREFRONT & E-COMMERCE)
          ========================================== */}
      {/* ── Security Firewall IP Block Screen (Disabled for Storefront Visitors) ── */}
      {false ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-neutral-950 min-h-[85vh] text-center select-none animate-fade-in">
          <div className="max-w-md w-full bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-950/45 p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-3xl mx-auto animate-bounce text-red-600 dark:text-red-400">
              🛡️
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl text-brown-dark dark:text-white uppercase tracking-tight">Acesso Bloqueado</h2>
              <p className="text-[10px] text-red-600 dark:text-red-400 font-mono tracking-widest uppercase font-black">Firewall Interno — Security Shield</p>
            </div>
            <p className="text-xs text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
              O seu endereço de IP ou o comportamento da sua navegação violaram as políticas de proteção da plataforma Só Madeiras.
            </p>
            <div className="bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl border border-gray-150 dark:border-dark-border text-left font-mono text-[10px] space-y-1.5 text-gray-900 dark:text-gray-100 font-medium">
              <div className="flex justify-between">
                <span>Endereço de IP:</span>
                <span className="font-bold text-brown-dark dark:text-white">{Security.SecurityRepository.getClientIp().ip}</span>
              </div>
              <div className="flex justify-between">
                <span>Dispositivo (FP):</span>
                <span className="font-bold text-brown-dark dark:text-white truncate max-w-[150px]">{deviceFp || "fp_checking..."}</span>
              </div>
              <div className="flex justify-between">
                <span>ID do Incidente:</span>
                <span className="font-bold text-brown-dark dark:text-white">inc_waf_{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ação Aplicada:</span>
                <span className="font-bold text-red-500 font-black">Bloqueio Automático WAF</span>
              </div>
            </div>
            <div className="pt-2 text-left bg-cyan-50 dark:bg-cyan-950/15 border border-cyan-150 dark:border-cyan-950/30 p-3 rounded-lg text-[9px] text-cyan-700 dark:text-cyan-400 font-medium leading-normal">
              💡 <strong>Simulador:</strong> Como você está no simulador, pode clicar em <strong>"Admin / CRM Dashboard"</strong> no topo para acessar a <strong>Central de Segurança</strong> e gerenciar/desbloquear o IP.
            </div>
          </div>
        </div>
      ) : (
        <>
          {viewMode === "client" && (
        <div className="flex-1 flex flex-col bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
          
          {/* Top Announcement Bar */}
          {settings?.headerAnnouncement && (
            <div className="bg-primary text-brown-dark text-[10px] md:text-xs font-black py-1.5 px-4 text-center select-none shadow-sm flex items-center justify-center gap-2 no-print transition-colors">
              <span>{settings.headerAnnouncement}</span>
            </div>
          )}
          
          {/* 1. Header */}
          <header className="bg-brown-dark dark:bg-black text-white py-3 px-4 shadow-lg sticky top-11 z-40 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Brand Logo */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategoryFilter("all")}>
                  <img src="/images/logo.webp" alt="Só Madeiras" className="h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" />
                  <div>
                    <h1 className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
                      SÓ <span className="text-primary font-extrabold">MADEIRAS</span>
                    </h1>
                    <p className="text-[10px] tracking-widest text-primary font-bold -mt-1 uppercase">Madeiras em Geral & Material de Construção</p>
                  </div>
                </div>
                {/* Mobile Cart / Menu triggers */}
                <div className="flex md:hidden items-center gap-2">
                  {giveawayActive && (
                    <Link href="/sorteio" className="flex items-center gap-1 text-primary hover:text-white transition font-bold text-xs px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/30 animate-pulse">
                      🍀 Sorteio
                    </Link>
                  )}
                  <Link href="/lookbook" className="flex items-center gap-1 text-primary hover:text-white transition font-bold text-xs px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Lookbook
                  </Link>
                  <button 
                    onClick={() => { setIsMinhaContaOpen(true); trackClick("btn-account-mobile"); }}
                    className="p-1 text-primary hover:text-white transition flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-8 h-8"
                    title={activeClient ? "Minha Conta" : "Login"}
                  >
                    <Users className="h-4.5 w-4.5" />
                  </button>
                  <button 
                    onClick={() => { setIsCartOpen(true); trackClick("btn-cart-mobile"); }}
                    className="relative p-2 text-primary"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    {budgetCart.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {budgetCart.reduce((a, b) => a + b.quantity, 0)}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Smart Search with Instant Autocomplete */}
              <div className="w-full md:flex-1 max-w-xl relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar madeiras, telhas, cimento, ferramentas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-gray-300 pl-10 pr-4 py-2 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:text-brown-dark transition text-xs md:text-sm dark:text-white"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Instant Autocomplete Results Dropdown */}
                {searchQuery.trim().length > 1 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-[999] animate-fade-in text-brown-dark dark:text-white">
                    <div className="p-2 bg-slate-50 dark:bg-neutral-950 border-b border-gray-150 dark:border-neutral-800 flex justify-between items-center text-[11px] font-bold text-gray-500">
                      <span>Resultado da busca ({products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length})</span>
                      <button onClick={() => setSearchQuery("")} className="text-red-500 hover:underline">Fechar</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-neutral-800">
                      {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map(p => (
                        <div key={p.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-neutral-850 flex items-center justify-between gap-3 transition">
                          <Link 
                            href={`/produtos/${p.id}`}
                            onClick={() => setSearchQuery("")}
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                              {p.img && (p.img.startsWith("http") || p.img.startsWith("/")) ? (
                                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-lg">{p.img || "🪵"}</span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <h5 className="font-bold text-xs truncate text-brown-dark dark:text-white">{p.name}</h5>
                              <span className="text-[10px] text-gray-400 uppercase font-semibold block">{p.brand} • {p.category}</span>
                            </div>
                          </Link>
                          <div className="text-right shrink-0 flex items-center gap-2">
                            <span className="font-black text-xs text-emerald-600 dark:text-emerald-400 block">
                              R$ {(p.pricePix || p.price * 0.9).toFixed(2)}
                            </span>
                            <button
                              onClick={() => {
                                addToCart(p);
                                setSearchQuery("");
                              }}
                              className="bg-primary text-brown-dark font-extrabold text-[10px] px-2.5 py-1 rounded-lg hover:bg-primary-hover transition shadow-xs active:scale-95"
                              title="Adicionar ao Orçamento"
                            >
                              + Adicionar
                            </button>
                          </div>
                        </div>
                      ))}
                      {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="p-6 text-center text-xs text-gray-400">
                          Nenhum produto encontrado para "{searchQuery}".
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Menu Links */}
              <div className="hidden md:flex items-center gap-6 text-sm">
                {giveawayActive && (
                  <Link href="/sorteio" className="flex items-center gap-1.5 hover:text-[#F4B400] text-[#F4B400] transition font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 animate-pulse">
                    🍀 Sorteio do Mês
                  </Link>
                )}
                <Link href="/lookbook" className="flex items-center gap-1.5 hover:text-primary text-primary transition font-bold">
                  <Sparkles className="h-4.5 w-4.5 text-primary" /> Lookbook
                </Link>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-primary transition" 
                  onClick={() => { setIsMinhaContaOpen(true); trackClick("nav-my-account"); }}
                >
                  <Users className="h-4 w-4 text-primary" />
                  <span>{activeClient ? "Minha Conta" : "Login"}</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-primary transition" 
                  onClick={() => { setIsMinhaContaOpen(true); trackClick("nav-track-order"); }}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Rastrear Pedido</span>
                </div>
                
                {/* Floating Cart Trigger */}
                <button
                  onClick={() => { setIsCartOpen(true); trackClick("btn-cart-desktop"); }}
                  className="bg-primary text-brown-dark font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-primary-hover shadow-lg transition active:scale-95"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Carrinho</span>
                  {budgetCart.length > 0 && (
                    <span className="bg-brown-dark text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {budgetCart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>

            </div>
          </header>

          {/* Dynamic Navigation Menu */}
          <nav className="bg-brown-medium dark:bg-dark-surface border-y border-brown-dark/30 dark:border-dark-border text-white text-xs font-bold py-2.5 px-4 sticky top-[110px] md:top-24 z-30 transition-all no-print shadow-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 text-[10px] md:text-xs tracking-wider uppercase">
              {menuItems.map((item) => (
                <div key={item.id} className="relative group py-1 flex items-center gap-1 hover:text-primary transition-colors cursor-pointer select-none">
                  {item.link ? (
                    item.link.includes("cat=") || item.link.startsWith("#") || item.link.startsWith("/#") ? (
                      <span 
                        onClick={(e) => handleMenuLinkClick(e, item.link)}
                        className="hover:text-primary transition-colors py-1 px-2"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link href={item.link} className="hover:text-primary transition-colors py-1 px-2">
                        {item.label}
                      </Link>
                    )
                  ) : (
                    <span className="hover:text-primary transition-colors py-1 px-2">{item.label}</span>
                  )}
                  
                  {item.submenus && item.submenus.length > 0 && (
                    <>
                      <span className="text-[7px] md:text-[8px] opacity-75">▼</span>
                      
                      {/* Submenu Dropdown Container */}
                      <div className="absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 hidden group-hover:block bg-brown-dark dark:bg-neutral-900 border border-brown-medium dark:border-neutral-800 rounded-lg shadow-2xl py-2 min-w-[200px] z-50 text-[11px] font-bold text-gray-200 animate-fade-in before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:bg-transparent">
                        {item.submenus.map((sub: any) => (
                          sub.link && (sub.link.includes("cat=") || sub.link.startsWith("#") || sub.link.startsWith("/#")) ? (
                            <span
                              key={sub.id}
                              onClick={(e) => handleMenuLinkClick(e, sub.link)}
                              className="block px-4 py-2 hover:bg-primary hover:text-brown-dark transition-colors cursor-pointer"
                            >
                              {sub.label}
                            </span>
                          ) : (
                            <Link
                              key={sub.id}
                              href={sub.link || "/#"}
                              className="block px-4 py-2 hover:bg-primary hover:text-brown-dark transition-colors"
                            >
                              {sub.label}
                            </Link>
                          )
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* 2. Hero Banner Slider */}
          <section className="relative h-[480px] md:h-[580px] lg:h-[640px] text-white overflow-hidden transition-all no-print">
            {bannerSlides.map((slide, index) => {
              const isCenter = slide.alignX === "center";
              const isRight = slide.alignX === "right";
              const isLeft = !isCenter && !isRight;

              // Choose gradient overlay based on X alignment for maximum text readability and visual aesthetics
              let gradientOverlay = "bg-gradient-to-r from-black/90 via-black/70 to-black/20";
              if (isCenter) {
                gradientOverlay = "bg-black/65";
              } else if (isRight) {
                gradientOverlay = "bg-gradient-to-l from-black/90 via-black/70 to-black/20";
              }

              // Active state bounds check
              const activeIndex = activeBannerIndex >= bannerSlides.length ? 0 : activeBannerIndex;

              return (
                <div
                  key={slide.id || index}
                  className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
                    activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  style={{ backgroundImage: `url('${slide.bgImage || "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop"}')` }}
                >
                  {/* Overlay for text contrast */}
                  <div className={`absolute inset-0 z-0 ${gradientOverlay}`} />
                  
                  <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between z-10 relative px-6 md:px-12">
                    
                    {/* Content wrapper with alignment classes based on alignX and alignY */}
                    <div className={`w-full h-full flex z-10 relative ${
                      slide.alignX === "left" ? "justify-start" :
                      slide.alignX === "right" ? "justify-end" : "justify-center"
                    } ${
                      slide.alignY === "top" ? "items-start pt-16" :
                      slide.alignY === "bottom" ? "items-end pb-16" : "items-center"
                    }`}>
                      
                      {/* Inner text box aligned horizontally */}
                      <div className={`max-w-xl md:max-w-2xl space-y-4 pt-6 md:pt-0 ${
                        slide.textAlign === "center" ? "text-center" :
                        slide.textAlign === "right" ? "text-right" : "text-left"
                      }`}>
                        
                        {/* Slide Badge */}
                        {slide.showBadge !== false && slide.badgeText && (
                          <span className="bg-primary text-brown-dark font-black text-[9px] md:text-xs px-3.5 py-1 rounded-md tracking-wider uppercase shadow-md inline-flex items-center gap-1.5 animate-pulse">
                            {slide.badgeText}
                          </span>
                        )}
                        
                        {/* Slide Title */}
                        <h2
                          style={{ whiteSpace: "pre-line" }}
                          className={`leading-tight tracking-tight uppercase drop-shadow-lg text-white text-2xl md:text-5xl font-black ${
                            slide.fontFamily === "font-serif" 
                              ? "font-serif font-semibold italic text-primary" 
                              : slide.fontFamily === "font-sans" 
                                ? "font-sans" 
                                : "font-display"
                          }`}
                        >
                          {slide.title || "Título do Slide"}
                        </h2>
                        
                        {/* Slide Subtitle */}
                        <p className="text-gray-300 text-xs md:text-base max-w-lg leading-relaxed font-light drop-shadow">
                          {slide.subtitle}
                        </p>
                        
                        {/* Action buttons */}
                        {slide.buttonText && (
                          <div
                            style={{
                              marginTop: `${slide.buttonMarginTop ?? 16}px`,
                              transform: `translate(${slide.buttonOffsetX ?? 0}px, ${slide.buttonOffsetY ?? 0}px)`
                            }}
                            className={`flex flex-wrap gap-3 pt-2 ${
                              slide.textAlign === "center" ? "justify-center" :
                              slide.textAlign === "right" ? "justify-end" : "justify-start"
                            }`}
                          >
                            {slide.buttonLink && slide.buttonLink.startsWith("#") ? (
                              <button 
                                onClick={() => {
                                  // If it's #carrinho or #orcamento, open budget cart
                                  if (slide.buttonLink === "#carrinho" || slide.buttonLink === "#orcamento") {
                                    setIsCartOpen(true);
                                  } else {
                                    const element = document.querySelector(slide.buttonLink);
                                    if (element) element.scrollIntoView({ behavior: "smooth" });
                                  }
                                  trackClick(`hero-btn-action-${index}`);
                                }}
                                style={{
                                  backgroundColor: slide.buttonColor || "#F4B400",
                                  color: slide.buttonTextColor || "#3E2723",
                                  border: slide.buttonColor === "transparent" ? `2px solid ${slide.buttonTextColor || "#ffffff"}` : "none"
                                }}
                                className={`font-black text-xs md:text-sm px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition active:scale-95 flex items-center gap-1.5 cursor-pointer uppercase ${
                                  slide.buttonAnimation === "zoom" ? "hover:scale-105" :
                                  slide.buttonAnimation === "pulse" ? "animate-pulse" :
                                  slide.buttonAnimation === "bounce" ? "hover:-translate-y-1" : ""
                                }`}
                              >
                                {slide.buttonText} <ArrowRight className="h-4 w-4" />
                              </button>
                            ) : (
                              <a
                                href={slide.buttonLink || "#carrinho"}
                                target={slide.buttonLink && slide.buttonLink.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                onClick={() => trackClick(`hero-btn-action-${index}`)}
                                style={{
                                  backgroundColor: slide.buttonColor || "#F4B400",
                                  color: slide.buttonTextColor || "#3E2723",
                                  border: slide.buttonColor === "transparent" ? `2px solid ${slide.buttonTextColor || "#ffffff"}` : "none"
                                }}
                                className={`font-black text-xs md:text-sm px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition active:scale-95 inline-flex items-center gap-1.5 cursor-pointer uppercase ${
                                  slide.buttonAnimation === "zoom" ? "hover:scale-105" :
                                  slide.buttonAnimation === "pulse" ? "animate-pulse" :
                                  slide.buttonAnimation === "bounce" ? "hover:-translate-y-1" : ""
                                }`}
                              >
                                {slide.buttonText} <ArrowRight className="h-4 w-4" />
                              </a>
                            )}

                            {/* Secondary CTA: WhatsApp for the first banner slide to preserve high fidelity */}
                            {index === 0 && (
                              <button 
                                onClick={() => {
                                  const tel = "557999882255";
                                  trackClick("hero-btn-whatsapp");
                                  window.open(`https://wa.me/${tel}?text=Ol%C3%A1%2C+gostaria+de+falar+com+um+especialista+da+S%C3%B3+Madeiras.`, "_blank");
                                }}
                                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow transition flex items-center gap-1.5 cursor-pointer"
                              >
                                <Phone className="h-4 w-4" /> Comprar pelo WhatsApp
                              </button>
                            )}
                          </div>
                        )}

                        {/* Slide-specific benefit row for high fidelity feel (only on the first slide) */}
                        {index === 0 && (
                          <div className="hidden md:grid grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-xl text-[10px] text-gray-300 select-none">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-primary font-bold">🪵 Madeiras Nobres</div>
                              <p className="text-gray-400">Qualidade garantida</p>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-primary font-bold">🚚 Entrega Rápida</div>
                              <p className="text-gray-400">Para toda a região</p>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-primary font-bold">🤝 Melhor Preço</div>
                              <p className="text-gray-400">Condições especiais</p>
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-primary font-bold">🛡️ Compra Segura</div>
                              <p className="text-gray-400">Atendimento confiável</p>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Right column: floating circular stamp (if hasStamp is true) */}
                      {slide.hasStamp === true && (
                        <div className="hidden lg:block relative mr-8 select-none z-10 scale-110">
                          <div className="w-36 h-36 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center p-2 animate-[spin_40s_linear_infinite] relative">
                            <svg className="absolute inset-0 w-full h-full fill-white/80" viewBox="0 0 100 100">
                              <path id={`circlePath-${index}`} d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                              <text className="font-display font-black text-[5.8px] tracking-[1.5px] uppercase">
                                <textPath href={`#circlePath-${index}`} startOffset="0%">
                                  Qualidade Só Madeiras • 
                                </textPath>
                              </text>
                            </svg>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl filter drop-shadow-md animate-pulse">🌲</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Absolute glassmorphism bottom bar (Always fixed at bottom of slider) */}
            <div className="hidden md:flex absolute bottom-0 inset-x-0 h-11 bg-black/60 backdrop-blur-md border-t border-white/10 z-20 items-center justify-center gap-12 text-xs text-gray-300 font-semibold select-none">
              <span className="flex items-center gap-1.5 font-bold">📍 Atendemos toda a região</span>
              <span className="flex items-center gap-1.5 font-bold">🚚 Entrega rápida e segura</span>
              <span className="flex items-center gap-1.5 font-bold">💬 Fale com um especialista</span>
            </div>

            {/* Slide dots */}
            {bannerSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {[...Array(bannerSlides.length)].map((_, i) => {
                  const activeIndex = activeBannerIndex >= bannerSlides.length ? 0 : activeBannerIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveBannerIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === activeIndex ? "bg-primary scale-125" : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* 3. Benefit Bar */}
          <section className="bg-white dark:bg-dark-surface border-y border-gray-200 dark:border-dark-border py-4 px-4 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
              <div 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer"
                onClick={() => trackClick("benefit-entrega")}
              >
                <div className="bg-primary/20 text-brown-dark dark:text-primary p-2.5 rounded-full">🚚</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Entrega Rápida</h4>
                  <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium">Frota própria ágil</p>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer"
                onClick={() => trackClick("benefit-segura")}
              >
                <div className="bg-primary/20 text-brown-dark dark:text-primary p-2.5 rounded-full">🛡️</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Compra Segura</h4>
                  <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium">Faturamento no envio</p>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer"
                onClick={() => trackClick("benefit-atendimento")}
              >
                <div className="bg-primary/20 text-brown-dark dark:text-primary p-2.5 rounded-full">💬</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Especialistas</h4>
                  <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium">Consultores de obras</p>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer"
                onClick={() => trackClick("benefit-orcamento")}
              >
                <div className="bg-primary/20 text-brown-dark dark:text-primary p-2.5 rounded-full">📝</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Orçamento Grátis</h4>
                  <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium">Sem compromisso</p>
                </div>
              </div>
              <div 
                className="col-span-2 md:col-span-1 flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer"
                onClick={() => trackClick("benefit-parcelamento")}
              >
                <div className="bg-primary/20 text-brown-dark dark:text-primary p-2.5 rounded-full">💳</div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Facilitado</h4>
                  <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium">Até 10x sem juros</p>
                </div>
              </div>
            </div>
          </section>

          {/* SHOPEE-STYLE MOBILE OPTIMIZED CATEGORY MENU */}
          <section className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border py-4 px-3 no-print">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3 text-center">
                {[
                  { label: "Mourões", icon: "🪵", link: "/mourao-de-eucalipto-tratado", color: "bg-amber-500/10 text-amber-600" },
                  { label: "Postes", icon: "🪵", link: "/postes-de-eucalipto-tratado", color: "bg-amber-600/10 text-amber-700" },
                  { label: "Eucalipto", icon: "🌲", link: "/eucalipto-tratado-estancia-se", color: "bg-emerald-500/10 text-emerald-600" },
                  { label: "Portas", icon: "🚪", link: "/portas-de-madeira", color: "bg-orange-500/10 text-orange-600" },
                  { label: "Telhas", icon: "🏠", link: "/?cat=telhas", color: "bg-red-500/10 text-red-600" },
                  { label: "Forro PVC", icon: "📐", link: "/forro-pvc", color: "bg-blue-500/10 text-blue-600" },
                  { label: "Pergolados", icon: "🌿", link: "/pergolados", color: "bg-teal-500/10 text-teal-600" },
                  { label: "Currais 3D", icon: "🌾", link: "/galpoes-currais", color: "bg-lime-500/10 text-lime-700" },
                  { label: "Telhados", icon: "📐", link: "/calculadora-telhado", color: "bg-purple-500/10 text-purple-600" },
                  { label: "Lookbook", icon: "✨", link: "/lookbook", color: "bg-pink-500/10 text-pink-600" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    className="flex flex-col items-center gap-1.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-bg transition active:scale-95 group cursor-pointer"
                  >
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${item.color} flex items-center justify-center text-xl sm:text-2xl shadow-xs group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-200 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Brand Carousels */}
          <section className="bg-gray-100 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border py-4 px-4 overflow-hidden relative transition-colors">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <span className="font-black text-[10px] md:text-xs text-brown-medium dark:text-primary uppercase tracking-widest whitespace-nowrap bg-white dark:bg-dark-surface px-3 py-1 rounded shadow-sm border border-gray-200 dark:border-dark-border z-10">Parceiros Premium</span>
              <div className="flex gap-8 animate-marquee select-none whitespace-nowrap">
                {brands.concat(brands).map((brand, i) => (
                  <div 
                    key={i} 
                    className="inline-block hover:opacity-80 transition cursor-pointer px-2"
                    onClick={() => { setSearchQuery(brand.name); trackClick(`partner-${brand.name}`); }}
                  >
                    <BrandLogo name={brand.name} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ==========================================
              QUADRA DE SIMULADORES 3D PREMIUM (2 POR LINHA EM MOBILE)
              ========================================== */}
          <ScrollReveal direction="up" delay={100}>
            <section className="w-full max-w-7xl mx-auto px-4 py-4 no-print overflow-hidden">
              <div className="text-center mb-4 space-y-1">
                <span className="bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                  Ferramentas & Simuladores 3D
                </span>
                <h3 className="font-display font-black text-lg sm:text-2xl text-brown-dark dark:text-white uppercase tracking-tight">
                  Calculadoras Interativas
                </h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                
                {/* CARD 1: PERGOLADOS 3D */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#5D4037] border border-[#F4B400]/45 p-3.5 sm:p-5 shadow-xl flex flex-col justify-between gap-3 group hover:border-[#F4B400] transition duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-[#F4B400] text-[#3E2723] font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Simulador 3D
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-stone-300 font-bold uppercase truncate">🪵 Pergolados</span>
                    </div>
                    
                    <div className="relative w-full h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#F4B400]/20 shadow-inner bg-stone-850">
                      <img 
                        src="/images/pergolado_ambient.webp" 
                        alt="Pergolado de Eucalipto Roliço" 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display font-black text-xs sm:text-base text-white uppercase tracking-tight leading-tight">
                        Pergolados 3D
                      </h3>
                      <p className="text-stone-300 text-[10px] sm:text-[11px] leading-snug font-light line-clamp-2">
                        Simule diâmetros e receba a lista de materiais no WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link 
                      href="/pergolados"
                      onClick={() => trackClick("btn-pergolados-banner")}
                      className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-[10px] sm:text-xs py-2 sm:py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1 border-none active:scale-97 uppercase tracking-wider"
                    >
                      <span>Projetar 3D</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CARD 2: CALCULADORA AGRO 3D */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#2E3B1C] via-[#3C4A26] to-[#4A5930] border border-[#F4B400]/45 p-3.5 sm:p-5 shadow-xl flex flex-col justify-between gap-3 group hover:border-[#F4B400] transition duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-[#F4B400] text-[#3E2723] font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Agro 3D
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-stone-300 font-bold uppercase truncate">🌾 Currais</span>
                    </div>
                    
                    <div className="relative w-full h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#F4B400]/20 shadow-inner bg-stone-850">
                      <img 
                        src="/images/curral_ambient.webp" 
                        alt="Curral Rústico" 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display font-black text-xs sm:text-base text-white uppercase tracking-tight leading-tight">
                        Galpões & Currais
                      </h3>
                      <p className="text-stone-300 text-[10px] sm:text-[11px] leading-snug font-light line-clamp-2">
                        Dimensionamento ABNT de mourões e réguas para gado.
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link 
                      href="/galpoes-currais"
                      onClick={() => trackClick("btn-agro-banner")}
                      className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-[10px] sm:text-xs py-2 sm:py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1 border-none active:scale-97 uppercase tracking-wider"
                    >
                      <span>Projetar Agro</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CARD 3: CALCULADORA FORRO PVC */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1B2F3D] via-[#244256] to-[#2D536B] border border-[#F4B400]/45 p-3.5 sm:p-5 shadow-xl flex flex-col justify-between gap-3 group hover:border-[#F4B400] transition duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-[#F4B400] text-[#3E2723] font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Cálculo PVC
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-stone-300 font-bold uppercase truncate">📐 Forro</span>
                    </div>
                    
                    <div className="relative w-full h-20 sm:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#101E27] to-[#1E3747] flex items-center justify-center border border-[#F4B400]/25 shadow-lg">
                      <Layers className="h-10 w-10 sm:h-14 sm:w-14 text-slate-100 drop-shadow-[0_0_8px_rgba(244,180,0,0.35)] animate-pulse" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display font-black text-xs sm:text-base text-white uppercase tracking-tight leading-tight">
                        Forro PVC & Ripa
                      </h3>
                      <p className="text-stone-300 text-[10px] sm:text-[11px] leading-snug font-light line-clamp-2">
                        Estime placas, ripões, ripas e parafusos por cômodo.
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link 
                      href="/forro-pvc"
                      onClick={() => trackClick("btn-pvc-banner")}
                      className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-[10px] sm:text-xs py-2 sm:py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1 border-none active:scale-97 uppercase tracking-wider"
                    >
                      <span>Calcular PVC</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* CARD 4: CALCULADORA DE TELHADOS */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#4A1525] via-[#5C1B2E] to-[#73233A] border border-[#F4B400]/45 p-3.5 sm:p-5 shadow-xl flex flex-col justify-between gap-3 group hover:border-[#F4B400] transition duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-[#F4B400] text-[#3E2723] font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Norma ABNT
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-stone-300 font-bold uppercase truncate">🏠 Coberturas</span>
                    </div>
                    
                    <div className="relative w-full h-20 sm:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2D0A14] to-[#40111F] flex items-center justify-center border border-[#F4B400]/25 shadow-lg">
                      <FileText className="h-10 w-10 sm:h-14 sm:w-14 text-amber-300 drop-shadow-[0_0_8px_rgba(244,180,0,0.35)] animate-pulse" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display font-black text-xs sm:text-base text-white uppercase tracking-tight leading-tight">
                        Cálculo Telhado
                      </h3>
                      <p className="text-stone-300 text-[10px] sm:text-[11px] leading-snug font-light line-clamp-2">
                        Dimensionamento de terças, caibros e inclinação.
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link 
                      href="/calculadora-telhado"
                      onClick={() => trackClick("btn-telhado-banner")}
                      className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-[10px] sm:text-xs py-2 sm:py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1 border-none active:scale-97 uppercase tracking-wider"
                    >
                      <span>Calcular Telhado</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </section>
          </ScrollReveal>

          {/* ── BANNER ZONE: after-hero ── */}
          {renderBannerZone("after-hero")}

          {/* OFERTAS RELÂMPAGO SECTION (HIGH-FIDELITY FROM SCREENSHOT) */}
          <ScrollReveal direction="up" delay={150}>
            <section className="max-w-7xl mx-auto px-4 py-8 w-full select-none no-print">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-black text-xl md:text-[25px] text-brown-dark dark:text-white uppercase tracking-tighter flex items-center gap-1">
                    OFERTAS RE
                    <svg className="w-5.5 h-5.5 text-primary animate-pulse mx-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    AMPAGO
                  </h3>
                </div>
                
                {/* Countdown Timer */}
                <div className="flex items-center gap-1 font-mono font-black text-xs md:text-sm text-stone-900 dark:text-stone-100">
                  <div className="bg-brown-dark text-white px-2.5 py-1 rounded-[4px] shadow-sm min-w-[28px] text-center border border-brown-medium/20 text-xs font-bold">
                    {String(flashTime.hours).padStart(2, "0")}
                  </div>
                  <span className="text-brown-dark dark:text-neutral-400 font-extrabold text-xs mx-0.5">:</span>
                  <div className="bg-brown-dark text-white px-2.5 py-1 rounded-[4px] shadow-sm min-w-[28px] text-center border border-brown-medium/20 text-xs font-bold">
                    {String(flashTime.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-brown-dark dark:text-neutral-400 font-extrabold text-xs mx-0.5">:</span>
                  <div className="bg-brown-dark text-white px-2.5 py-1 rounded-[4px] shadow-sm min-w-[28px] text-center border border-brown-medium/20 text-xs font-bold">
                    {String(flashTime.seconds).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Ver tudo link */}
              <button 
                onClick={() => { setSelectedCategoryFilter("all"); trackClick("btn-flash-deals-view-all"); }}
                className="text-brown-medium dark:text-primary hover:text-brown-dark dark:hover:text-primary-hover font-black text-xs md:text-sm flex items-center gap-0.5 hover:underline cursor-pointer bg-transparent border-none"
              >
                Ver Tudo <span className="font-sans text-[11px] ml-0.5 font-extrabold">&gt;</span>
              </button>
            </div>

            {/* Horizontal Scroll of Products */}
            <div className="relative group">
              <div 
                id="flash-deals-container"
                className="flex overflow-x-auto gap-6 scrollbar-hide py-2 px-1 relative scroll-smooth"
              >
                {flashDeals.map(deal => {
                  const p = products.find(prod => prod.id === deal.id) || INITIAL_PRODUCTS.find(prod => prod.id === deal.id);
                  if (!p) return null;

                  const originalPrice = p.price;
                  const flashPrice = originalPrice * (1 - deal.discountPercent);

                  const renderDealGraphic = (productId: number, fallbackEmoji: string) => {
                    switch (productId) {
                      case 15: // Porta de Madeira Colmeia HDF
                        return (
                          <svg viewBox="0 0 100 120" className="h-26 w-auto filter drop-shadow-md select-none">
                            <rect x="25" y="10" width="50" height="100" rx="3" fill="#E8D8C8" stroke="#A1887F" strokeWidth="2" />
                            <rect x="32" y="18" width="36" height="38" rx="2" fill="none" stroke="#BCAAA4" strokeWidth="1.5" />
                            <rect x="32" y="62" width="36" height="38" rx="2" fill="none" stroke="#BCAAA4" strokeWidth="1.5" />
                            <path d="M40,25 L45,22 L50,25 M45,22 L45,28 M38,32 L43,29 L48,32" stroke="#D7CCC8" strokeWidth="1" strokeLinecap="round" />
                            <path d="M40,70 L45,67 L50,70 M45,67 L45,73 M38,77 L43,74 L48,77" stroke="#D7CCC8" strokeWidth="1" strokeLinecap="round" />
                            <circle cx="64" cy="60" r="2.5" fill="#B0BEC5" />
                            <rect x="64" y="58" width="4" height="4" rx="1" fill="#78909C" />
                          </svg>
                        );
                      case 2: // Tubo de Esgoto Tigre (Blue Tap Icon)
                        return (
                          <svg viewBox="0 0 100 100" className="h-24 w-24 filter drop-shadow-md select-none">
                            <rect x="5" y="5" width="90" height="90" rx="22" fill="url(#blue-grad-deal)" />
                            <path d="M30,48 h30 a4,4 0 0 0 4-4 v-8 a4,4 0 0 0 -4-4 h-8 a4,4 0 0 0 -4,4 v4" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M48,48 v15 a2,2 0 0 0 2,2 h6" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="40" y="22" width="16" height="4" rx="1" fill="white" />
                            <circle cx="48" cy="24" r="2" fill="white" />
                            <path d="M60,50 c0,2.5 -2,4.5 -4.5,4.5 s-4.5,-2 -4.5,-4.5 c0,-2.5 4.5,-7.5 4.5,-7.5 s4.5,5 4.5,7.5 z" fill="white" />
                            <defs>
                              <linearGradient id="blue-grad-deal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4FA5F2" />
                                <stop offset="100%" stopColor="#0B428A" />
                              </linearGradient>
                            </defs>
                          </svg>
                        );
                      case 8: // Telha Ecológica Onduline (Red Corrugated Sheet)
                        return (
                          <svg viewBox="0 0 120 100" className="h-24 w-auto filter drop-shadow-md select-none">
                            <defs>
                              <linearGradient id="red-roof-grad-deal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#EF5350" />
                                <stop offset="55%" stopColor="#D32F2F" />
                                <stop offset="100%" stopColor="#991B1B" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M10,35 C15,32 18,38 23,35 C28,32 31,38 36,35 C41,32 44,38 49,35 C54,32 57,38 62,35 C67,32 70,38 75,35 C80,32 83,38 88,35 L98,65 C93,68 90,62 85,65 C80,62 77,68 72,65 C67,62 64,68 59,65 C54,62 51,68 46,65 C41,62 38,68 33,65 C28,62 25,68 20,65 Z" 
                              fill="url(#red-roof-grad-deal)" 
                              stroke="#7f0000" 
                              strokeWidth="1.2" 
                            />
                            <path d="M23,35 L33,65 M36,35 L46,65 M49,35 L59,65 M62,35 L72,65 M75,35 L85,65 M88,35 L98,65" stroke="#FFCDD2" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.3" />
                            <path d="M10,35 L20,65 M18,38 L28,68 M31,38 L41,68 M44,38 L54,68 M57,38 L67,68 M70,38 L80,68 M83,38 L93,68" stroke="#3e0000" strokeWidth="1" opacity="0.25" />
                          </svg>
                        );
                      case 17: // Telha Cerâmica Portuguesa Natural (Clay tile)
                        return (
                          <svg viewBox="0 0 100 100" className="h-24 w-auto filter drop-shadow-md select-none">
                            <defs>
                              <linearGradient id="clay-grad-deal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF8A65" />
                                <stop offset="50%" stopColor="#E64A19" />
                                <stop offset="100%" stopColor="#BF360C" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M 22 36 
                                 C 22 14, 52 14, 52 36 
                                 L 66 76 
                                 C 66 58, 36 58, 36 76 
                                 Z" 
                              fill="url(#clay-grad-deal)" 
                              stroke="#8C2708" 
                              strokeWidth="1.5" 
                            />
                            <path d="M52,36 L66,76" stroke="#FFCCBC" strokeWidth="1" opacity="0.3" />
                            <path d="M22,36 L36,76" stroke="#4E1504" strokeWidth="1.5" opacity="0.45" />
                          </svg>
                        );
                      case 3: // Cabo Flexível Sil (Gold/Orange Lightning Bolt)
                        return (
                          <svg viewBox="0 0 100 100" className="h-24 w-auto filter drop-shadow-sm select-none">
                            <defs>
                              <linearGradient id="bolt-grad-deal" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFD54F" />
                                <stop offset="50%" stopColor="#FFC107" />
                                <stop offset="100%" stopColor="#FF8F00" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M58,10 L25,52 L48,52 L38,90 L75,44 L50,44 Z" 
                              fill="url(#bolt-grad-deal)" 
                              stroke="#D84315"
                              strokeWidth="1.2"
                              className="animate-pulse"
                            />
                          </svg>
                        );
                      case 11: // Prancha de Ipê (Wood Log)
                        return (
                          <svg viewBox="0 0 100 100" className="h-24 w-auto filter drop-shadow-md select-none">
                            <defs>
                              <linearGradient id="bark-grad-deal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6D4C41" />
                                <stop offset="100%" stopColor="#3E2723" />
                              </linearGradient>
                            </defs>
                            <rect x="36" y="24" width="46" height="52" fill="url(#bark-grad-deal)" rx="4" />
                            <line x1="48" y1="24" x2="48" y2="76" stroke="#2D150F" strokeWidth="1.5" opacity="0.6" />
                            <line x1="64" y1="24" x2="64" y2="76" stroke="#2D150F" strokeWidth="1.5" opacity="0.6" />
                            <ellipse cx="36" cy="50" rx="14" ry="26" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
                            <ellipse cx="36" cy="50" rx="9" ry="17" fill="none" stroke="#A1887F" strokeWidth="1.2" opacity="0.8" />
                            <ellipse cx="36" cy="50" rx="5" ry="9" fill="none" stroke="#8D6E63" strokeWidth="1.2" opacity="0.8" />
                            <circle cx="36" cy="50" r="1.5" fill="#4E342E" />
                          </svg>
                        );
                      default:
                        return <span className="filter drop-shadow select-none">{fallbackEmoji}</span>;
                    }
                  };

                  return (
                    <div 
                      key={p.id}
                      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-[20px] p-4 flex flex-col justify-between hover:shadow-xl hover:border-primary dark:hover:border-primary transition-all duration-300 shadow-sm min-w-[218px] max-w-[218px] flex-shrink-0 group/card relative overflow-hidden"
                    >
                      {/* Badge and Discount */}
                      <div className="absolute top-3 left-3 z-10 bg-brown-dark dark:bg-neutral-800 text-white font-sans font-black text-[9px] px-2.5 py-0.5 rounded-[4px] shadow-sm uppercase tracking-wider">
                        {deal.badge}
                      </div>
                      <div className="absolute top-3 right-3 z-10 bg-primary text-brown-dark font-sans font-black text-[10px] px-2 py-0.5 rounded-[4px] shadow-sm tracking-tighter">
                        {deal.label}
                      </div>

                      <div className="mt-3">
                        {/* Image Frame */}
                        <div className="relative bg-[#f5f5f7] dark:bg-neutral-800/40 w-full h-[140px] rounded-[14px] flex items-center justify-center p-3 mb-3.5 transition-all duration-300 group-hover/card:bg-neutral-100 dark:group-hover/card:bg-neutral-850 select-none">
                          {renderDealGraphic(p.id, p.img)}
                        </div>

                        {/* Title and details */}
                        <div className="space-y-1">
                          <span className="font-sans font-bold text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-widest block text-left pl-1">
                            {p.brand}
                          </span>
                          <h4 className="font-sans font-bold text-xs md:text-[13px] leading-snug line-clamp-2 text-stone-850 dark:text-stone-100 group-hover/card:text-brown-medium dark:group-hover/card:text-primary transition-colors duration-300 min-h-[36px] mt-1 text-left pl-1">
                            {p.name}
                          </h4>
                        </div>
                      </div>

                      {/* Prices and Actions */}
                      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-neutral-800 space-y-2.5">
                        <div className="text-center py-1 mt-1 mb-1.5 flex flex-col justify-center items-center">
                          <span className="text-[10px] text-gray-400 dark:text-neutral-500 line-through block font-medium">De R$ {originalPrice.toFixed(2)}</span>
                          <span className="text-stone-900 dark:text-white font-black text-[17px] block leading-none mt-1">R$ {flashPrice.toFixed(2)}</span>
                        </div>

                        {/* Progress Bar soldItems */}
                        <div className="w-full bg-[#fcf8f2] dark:bg-neutral-800 rounded-full h-5.5 overflow-hidden relative border border-[#ebd8c1]/40 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-brown-medium to-primary h-full rounded-full transition-all duration-500" 
                            style={{ width: `${deal.progress}%` }} 
                          />
                          <span className="text-[8px] absolute inset-0 flex items-center justify-center font-sans font-black tracking-wider text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                            {deal.itemsSold} ITENS VENDIDOS
                          </span>
                        </div>

                        {/* Quick CTA Comprar */}
                        <button
                          onClick={() => {
                            trackClick(`btn-flash-deal-buy-${p.id}`);
                            buySingleProductViaWhatsApp({
                              ...p,
                              price: flashPrice,
                              desc: `[OFERTA RELÂMPAGO ${deal.label}] ${p.name}`
                            });
                          }}
                          className="w-full bg-primary hover:bg-primary-hover text-brown-dark text-[10px] font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer border-none mt-2.5"
                        >
                          <span>⚡ COMPRAR AGORA</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {/* Spacer to prevent cut-off at the end of scroll */}
                <div className="w-8 flex-shrink-0" />
              </div>

              {/* Scroll Left Trigger Arrow */}
              <button 
                onClick={() => {
                  const container = document.getElementById("flash-deals-container");
                  if (container) {
                    container.scrollLeft -= 240;
                    trackClick("btn-flash-deals-scroll-left");
                  }
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-stone-850 dark:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-neutral-700 transition z-20 active:scale-90 cursor-pointer md:opacity-0 md:group-hover:opacity-90 transition-opacity duration-300"
                title="Oferta anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Scroll Right Trigger Arrow */}
              <button 
                onClick={() => {
                  const container = document.getElementById("flash-deals-container");
                  if (container) {
                    container.scrollLeft += 240;
                    trackClick("btn-flash-deals-scroll-right");
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-stone-850 dark:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-neutral-700 transition z-20 active:scale-90 cursor-pointer md:opacity-0 md:group-hover:opacity-90 transition-opacity duration-300"
                title="Próxima oferta"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        </ScrollReveal>

          {/* 5. Highlighted Categories Grid */}
          <ScrollReveal direction="up" delay={100}>
            <section className="w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden">
            <h3 className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white border-l-4 border-primary pl-3 mb-6">
              CATEGORIAS EM DESTAQUE
            </h3>
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-6 gap-4 pb-4 sm:pb-0 scrollbar-hide snap-x snap-mandatory">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => { setSelectedCategoryFilter(cat.id); trackClick(`card-cat-${cat.id}`); }}
                  className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-4 text-center cursor-pointer shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden min-w-[130px] sm:min-w-0 max-w-[130px] sm:max-w-none flex-shrink-0 sm:flex-shrink snap-align-start"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-brown-medium opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-3xl md:text-4xl mb-2 filter drop-shadow group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h4 className="font-bold text-xs md:text-sm text-brown-dark dark:text-gray-200 group-hover:text-primary transition">{cat.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Ver ofertas</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

          {/* ── BANNER ZONE: after-flash ── */}
          {renderBannerZone("after-flash")}

          {/* SPECIAL SPECIALTY SECTION: VENDA DE PORTAS PREMIUM */}
          <ScrollReveal direction="up" delay={150}>
            <section className="w-full bg-gradient-to-br from-brown-dark to-brown-medium text-white py-12 px-6 my-8 rounded-2xl max-w-7xl mx-auto shadow-xl relative overflow-hidden select-none no-print">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-black rounded-full filter blur-2xl opacity-30" />
            
            <div className="relative z-10 space-y-8">
              {/* Header of Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <span className="bg-primary text-brown-dark font-black text-[10px] px-3 py-1 rounded-full tracking-wider uppercase inline-block">Linha Nobre</span>
                  <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight">PORTAS EM MADEIRA MACIÇA & PORTAIS</h3>
                  <p className="text-gray-300 text-xs md:text-sm font-light max-w-2xl leading-relaxed">
                    Portas pivotantes luxuosas, batentes sólidos, alizares e folhas frisadas desenvolvidas sob os mais rígidos padrões de secagem. Valorize a entrada do seu lar!
                  </p>
                </div>
                <Link
                  href="/portas-de-madeira"
                  onClick={() => trackClick("btn-special-doors-view-all")}
                  className="bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs px-5 py-2.5 rounded-full shadow transition active:scale-95 whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  Ver Catálogo de Portas <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Special Door Cards Row */}
              <div className="flex w-full overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 sm:pb-0 scrollbar-hide snap-x snap-mandatory">
                {[13, 14, 15, 16].map(id => {
                  const stateProduct = products.find(p => p.id === id);
                  const door = stateProduct || {
                    id,
                    name: id === 13 ? "Porta Pivotante Angelim Maciça 2.10x1.00m" : id === 14 ? "Porta Maciça Frisada Tauari 2.10x0.80m" : id === 15 ? "Porta de Madeira Colmeia 70x210 cm HDF - Madelar" : "Kit Porta Pronta Completo com Batente e Fechadura",
                    price: id === 13 ? 1890.00 : id === 14 ? 789.90 : id === 15 ? 199.00 : 649.00,
                    category: "madeiras",
                    brand: id === 15 ? "Madelar" : "Só Madeiras",
                    stock: id === 13 ? 5 : id === 14 ? 12 : id === 15 ? 35 : 8,
                    rating: id === 13 ? 5.0 : id === 14 ? 4.8 : id === 15 ? 4.7 : 4.9,
                    desc: id === 13 ? "Acompanha pino pivotante de inox e fechadura rolete de alta segurança." : id === 14 ? "Madeira nobre de reflorestamento com secagem técnica em estufa." : id === 15 ? "Capa em HDF de alta densidade com enchimento acústico leve em colmeia Madelar." : "Acompanha batente (portal), alizar (guarnição), dobradiças de inox e ferragens instaladas.",
                    img: id === 13 ? "/images/doors/porta_pivotante_angelim.png" : id === 14 ? "/images/doors/porta_frisada_tauari.png" : id === 15 ? "/images/doors/porta_colmeia_madelar.png" : "/images/doors/kit_porta_pronta.png",
                    woodType: id === 13 ? "angelim" : id === 14 ? "tauari" : id === 15 ? "eucalipto" : "tauari",
                    grooves: id === 14 || id === 16,
                    handle: id === 13 ? "pivot" : id === 16 ? "kit" : "standard",
                    frame: id === 16
                  };
                  
                  const pixPrice = (door as any).pricePix || door.price * 0.9;
                  return (
                    <div 
                      key={door.id} 
                      className="bg-white/10 dark:bg-black/25 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-primary transition duration-300 shadow-lg group relative overflow-hidden min-w-[270px] sm:min-w-0 max-w-[270px] sm:max-w-none flex-shrink-0 sm:flex-shrink snap-align-start"
                    >
                      <div>
                        {/* Door preview frame: Real E-commerce Thumbnail */}
                        <div className="bg-white rounded-lg h-44 flex items-center justify-center mb-3.5 relative group-hover:scale-102 transition-all duration-300 select-none overflow-hidden p-3 shadow-inner border border-white/10">
                          <img 
                            src={door.img} 
                            alt={door.name}
                            className="h-full w-auto object-contain max-h-[155px] transition-transform duration-500 group-hover:scale-110" 
                          />
                          
                          {/* Elegant Badges */}
                          <span className="absolute top-2 left-2 bg-primary text-brown-dark font-black text-[8px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                            {door.woodType === 'angelim' ? 'Angelim Maciço' : door.woodType === 'tauari' ? 'Tauari Maciço' : 'HDF Nobre'}
                          </span>
                          {door.stock <= 8 && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white font-black text-[8px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider animate-pulse">
                              Últimas Unidades
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-[10px] text-yellow-400">
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <span className="font-bold text-[9px] text-gray-300">({door.rating.toFixed(1)})</span>
                          </div>
                          <h4 className="font-bold text-xs leading-snug line-clamp-2 text-white group-hover:text-primary transition">{door.name}</h4>
                          <p className="text-[10px] text-gray-300 font-light leading-normal line-clamp-2 pt-1">{door.desc}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                        <div>
                          <span className="text-[9px] text-gray-400 line-through block">De R$ {(door.price * 1.1).toFixed(2)}</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[10px] text-gray-300">Ou R$ {door.price.toFixed(2)}</span>
                            <span className="text-[8px] text-gray-400">10x R$ {(door.price / 10).toFixed(2)}</span>
                          </div>
                          <span className="text-primary font-black text-sm block mt-0.5">Pix: R$ {pixPrice.toFixed(2)}</span>
                        </div>

                        {/* CTA Actions */}
                        <div className="flex flex-col gap-1.5 pt-1">
                          <button
                            onClick={() => {
                              trackClick(`btn-add-budget-door-${door.id}`);
                              addToCart({
                                id: door.id,
                                name: door.name,
                                category: "madeiras",
                                brand: door.brand,
                                price: door.price,
                                stock: door.stock,
                                rating: door.rating,
                                desc: door.desc,
                                img: door.img
                              });
                            }}
                            className="w-full bg-primary hover:bg-primary-hover text-brown-dark text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-1 shadow transition active:scale-95 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" /> Adicionar ao Carrinho
                          </button>
                          <button
                            onClick={() => {
                              trackClick(`btn-whatsapp-door-${door.id}`);
                              buySingleProductViaWhatsApp({
                                id: door.id,
                                name: door.name,
                                category: "madeiras",
                                brand: door.brand,
                                price: door.price,
                                stock: door.stock,
                                rating: door.rating,
                                desc: door.desc,
                                img: door.img
                              });
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 shadow transition active:scale-95 cursor-pointer"
                          >
                            <Phone className="h-3 w-3" /> Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Why buy doors at Só Madeiras? */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/20 p-4 rounded-xl border border-white/5 text-xs text-gray-300 mt-6 select-none">
                <div className="flex gap-3">
                  <span className="text-2xl filter drop-shadow">🌲</span>
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider text-primary">Madeira Maciça Estufada</h5>
                    <p className="font-light text-gray-400 mt-0.5">Nosso tratamento em estufa elimina a seiva e umidade, garantindo que a madeira não empene e não rache com as variações térmicas.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl filter drop-shadow">📐</span>
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider text-primary">Medidas Personalizadas</h5>
                    <p className="font-light text-gray-400 mt-0.5">Precisa de alturas ou larguras fora do padrão de mercado? Desenvolvemos folhas completas sob medida para portas pivotantes sob consulta no WhatsApp.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl filter drop-shadow">🚪</span>
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider text-primary">Kit Completo Montado</h5>
                    <p className="font-light text-gray-400 mt-0.5">Fornecemos o portal, batente, guarnições, borracha de vedação acústica e fechadura instalada de fábrica. Prontidão total para sua obra!</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </ScrollReveal>

          {/* SPECIAL SPECIALTY SECTION: COBERTURAS E TELHAS COM CALCULADORA INTEGRADA */}
          {selectedCategoryFilter === "telhas" && (
            <section className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl max-w-7xl mx-auto py-10 px-6 my-8 shadow-lg relative overflow-hidden select-none no-print animate-fade-in">
              
              {/* Header of Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-neutral-800 pb-6 mb-8">
                <div className="space-y-1">
                  <span className="bg-amber-600/10 text-amber-700 dark:text-primary font-black text-[9px] px-3 py-1 rounded-full tracking-wider uppercase inline-block">Linha Telhados & Coberturas</span>
                  <h3 className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white tracking-tight flex items-center gap-2">
                    🏠 TELHAS PREMIUM & CALCULADORA INTEGRADA
                  </h3>
                  <p className="text-gray-900 dark:text-gray-100 font-medium text-xs font-light max-w-3xl leading-relaxed">
                    Selecione um modelo de telha ao lado para abrir e atualizar a calculadora instantaneamente com a inclinação, peso total e a quantidade ideal para cobrir a sua obra!
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      setEditingTelha(null);
                      setTelhaForm({
                        name: "",
                        desc: "",
                        img: "",
                        brand: "Só Madeiras",
                        tileType: "ceramic",
                        coverage: "12.0",
                        weight: "3.0",
                        price: "5.00",
                        minSlope: "30",
                        maxSlope: "60",
                        qtyPerSqm: "12.0",
                        notes: ""
                      });
                      setIsTelhaModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-full shadow transition active:scale-95 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>➕ Adicionar Telha</span>
                  </button>
                  <button
                    onClick={() => { setSelectedCategoryFilter("all"); trackClick("btn-special-tiles-back-home"); }}
                    className="bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs px-5 py-2.5 rounded-full shadow transition active:scale-95 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
                  >
                    ← Voltar para Todos os Produtos
                  </button>
                </div>
              </div>

            {/* Split Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Tile Selection (7 of 12 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-150 dark:border-neutral-800 pb-2">
                  <h4 className="font-bold text-xs uppercase text-brown-medium dark:text-primary tracking-wider">
                    Selecione o Modelo de Telha:
                  </h4>
                  <span className="text-[10px] text-stone-400 font-bold">
                    {telhasList.length} telhas cadastradas
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(telhasList.length > 0 ? telhasList : INITIAL_TELHAS).map(tile => {
                    const isSelected = selectedTileId === tile.id;
                    return (
                      <div
                        key={tile.id}
                        onClick={() => { setSelectedTileId(tile.id); trackClick(`select-tile-${tile.id}`); }}
                        className={`bg-white dark:bg-neutral-850 rounded-xl p-4 border transition duration-300 flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-md relative ${
                          isSelected ? 'border-primary ring-2 ring-primary/20 dark:ring-primary/10' : 'border-gray-150 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        {/* Action buttons (Edit & Delete) */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTelha(tile);
                              setTelhaForm({
                                name: tile.name || "",
                                desc: tile.desc || "",
                                img: tile.img || "",
                                brand: tile.brand || "Só Madeiras",
                                tileType: tile.tileType || "ceramic",
                                coverage: (tile.coverage || 12).toString(),
                                weight: (tile.weight || 3).toString(),
                                price: (tile.price || 4.2).toString(),
                                minSlope: (tile.minSlope || 30).toString(),
                                maxSlope: (tile.maxSlope || 60).toString(),
                                qtyPerSqm: (tile.qtyPerSqm || 12).toString(),
                                notes: tile.notes || ""
                              });
                              setIsTelhaModalOpen(true);
                            }}
                            className="bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 text-amber-700 dark:text-amber-300 p-1 rounded-md text-[10px] font-bold"
                            title="Editar Telha"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Deseja remover a telha "${tile.name}"?`)) {
                                const updated = telhasList.filter(t => t.id !== tile.id);
                                updateTelhas(updated);
                                showToast(`🗑️ Telha "${tile.name}" removida!`);
                              }
                            }}
                            className="bg-red-100 hover:bg-red-200 dark:bg-neutral-800 text-red-600 p-1 rounded-md text-[10px] font-bold"
                            title="Excluir Telha"
                          >
                            🗑️
                          </button>
                        </div>

                        <div>
                          {/* Tile Image Frame */}
                          <div className="bg-slate-50 dark:bg-neutral-905 rounded-lg h-28 flex items-center justify-center mb-3 select-none overflow-hidden p-2">
                            <img
                              src={tile.img}
                              alt={tile.name}
                              className="h-full w-auto object-contain max-h-[100px] transition-transform duration-500 group-hover:scale-108"
                              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=200&auto=format&fit=crop"; }}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-bold text-amber-700 dark:text-primary">{tile.brand}</span>
                            <h5 className={`font-bold text-xs leading-snug line-clamp-1 transition duration-200 ${isSelected ? 'text-primary-hover dark:text-primary' : 'text-brown-dark dark:text-white group-hover:text-primary-hover dark:group-hover:text-primary'}`}>
                              {tile.name}
                            </h5>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-light leading-normal line-clamp-2 pt-0.5">{tile.desc}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-neutral-850 flex justify-between items-center">
                          <div>
                            <span className="text-[8px] text-gray-400 dark:text-gray-500 uppercase font-medium">Preço unitário</span>
                            <span className="text-xs font-black text-brown-medium dark:text-primary block">R$ {parseFloat(tile.price || 0).toFixed(2)}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] text-gray-400 dark:text-gray-500 uppercase font-medium block">Rendimento</span>
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">
                              {tile.coverage} m²/peça
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Right Column: Calculator (5 of 12 cols) */}
              <div className="lg:col-span-5">
                {(() => {
                  const tile = [
                    { id: 8, name: "Telha Ecológica Onduline 200x95cm", brand: "Onduline", price: 79.90, coverage: 1.5, weight: 6.4, img: "/images/tiles/telha_onduline.png", tileType: "onduline" },
                    { id: 17, name: "Telha Cerâmica Portuguesa Natural", brand: "Só Madeiras", price: 2.99, coverage: 17.0, weight: 2.8, img: "/images/tiles/telha_portuguesa.png", tileType: "ceramic" },
                    { id: 18, name: "Telha de Concreto Plana Grafite", brand: "Tegula", price: 8.50, coverage: 10.4, weight: 4.8, img: "/images/tiles/telha_concreto.png", tileType: "concrete" },
                    { id: 19, name: "Telha Esmaltada Americana Premium", brand: "Só Madeiras", price: 4.20, coverage: 12.0, weight: 3.1, img: "/images/tiles/telha_esmaltada.png", tileType: "glazed" }
                  ].find(t => t.id === selectedTileId) || { id: 8, name: "Telha Ecológica Onduline 200x95cm", brand: "Onduline", price: 79.90, coverage: 1.5, weight: 6.4, img: "/images/tiles/telha_onduline.png", tileType: "onduline" };

                  // Calculator math
                  const pitchDecimal = roofPitch / 100;
                  const slopeMultiplier = Math.sqrt(1 + Math.pow(pitchDecimal, 2));
                  const effectiveArea = roofArea * slopeMultiplier;
                  
                  let rawQuantity = 0;
                  if (tile.tileType === "onduline") {
                    rawQuantity = effectiveArea / tile.coverage;
                  } else {
                    rawQuantity = effectiveArea * tile.coverage;
                  }

                  const lossMultiplier = 1 + (roofLoss / 100);
                  const finalQuantity = Math.ceil(rawQuantity * lossMultiplier);
                  const totalWeightKg = finalQuantity * tile.weight;
                  const totalPrice = finalQuantity * tile.price;
                  const pixPrice = finalQuantity * ((tile as any).pricePix || tile.price * 0.9);
                  const cashbackValue = totalPrice * 0.03;

                  return (
                    <div className="bg-white dark:bg-neutral-850 rounded-xl p-5 border border-primary/30 dark:border-primary/20 shadow-md space-y-5 flex flex-col justify-between h-full relative">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-neutral-800 pb-3">
                          <div className="w-12 h-12 bg-slate-50 dark:bg-neutral-900 rounded-lg flex items-center justify-center p-1 border border-gray-100 dark:border-neutral-800 flex-shrink-0">
                            <img src={tile.img} alt={tile.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <span className="text-[8px] bg-primary text-brown-dark font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Calculando para</span>
                            <h5 className="font-bold text-xs text-brown-dark dark:text-white line-clamp-1 leading-snug">{tile.name}</h5>
                          </div>
                        </div>

                        {/* INPUT FIELDS */}
                        <div className="space-y-3.5">
                          {/* Roof Area m² Input */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px]">
                              <label className="font-bold text-brown-medium dark:text-gray-300 uppercase tracking-wider">1. Área Horizontal do Telhado (m²):</label>
                              <span className="font-black text-brown-dark dark:text-primary font-mono bg-slate-50 dark:bg-neutral-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-neutral-800">{roofArea} m²</span>
                            </div>
                            <input
                              type="number"
                              min="5"
                              max="1000"
                              value={roofArea}
                              onChange={(e) => setRoofArea(Math.max(1, Number(e.target.value)))}
                              className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white"
                            />
                          </div>

                          {/* Roof Pitch Slider */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px]">
                              <label className="font-bold text-brown-medium dark:text-gray-300 uppercase tracking-wider">2. Inclinação do Telhado (%):</label>
                              <span className="font-black text-brown-dark dark:text-primary font-mono bg-slate-50 dark:bg-neutral-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-neutral-800">{roofPitch}%</span>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="45"
                              value={roofPitch}
                              onChange={(e) => setRoofPitch(Number(e.target.value))}
                              className="w-full h-1 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[8px] text-gray-400 dark:text-gray-550 font-bold uppercase">
                              <span>Mín (10%)</span>
                              <span>Padrão (30%)</span>
                              <span>Máx (45%)</span>
                            </div>
                          </div>

                          {/* Waste safety factor Slider */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px]">
                              <label className="font-bold text-brown-medium dark:text-gray-300 uppercase tracking-wider">3. Margem de Quebra/Segurança:</label>
                              <span className="font-black text-brown-dark dark:text-primary font-mono bg-slate-50 dark:bg-neutral-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-neutral-800">+{roofLoss}%</span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="20"
                              value={roofLoss}
                              onChange={(e) => setRoofLoss(Number(e.target.value))}
                              className="w-full h-1 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                          </div>
                        </div>

                        {/* CALCULATION RESULTS DISPLAY */}
                        <div className="bg-slate-50 dark:bg-neutral-900 rounded-lg p-3 border border-gray-150 dark:border-neutral-800 space-y-2 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Área Efetiva (Inclinação):</span>
                            <span className="font-mono font-bold text-brown-dark dark:text-white">{effectiveArea.toFixed(1)} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Peso Total da Cobertura:</span>
                            <span className="font-mono font-bold text-brown-dark dark:text-white">
                              {totalWeightKg >= 1000 ? `${(totalWeightKg / 1000).toFixed(2)} toneladas` : `${Math.ceil(totalWeightKg)} kg`}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs pt-1.5 border-t border-dashed border-gray-200 dark:border-neutral-800">
                            <span className="font-bold text-brown-medium dark:text-primary-hover">Qtd. Necessária Calculada:</span>
                            <span className="font-mono font-black text-red-600 dark:text-red-400 bg-red-100/40 dark:bg-red-950/20 px-2 py-0.5 rounded">
                              {finalQuantity} {tile.tileType === "onduline" ? "folhas" : "peças"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* PRICES & ADD BUTTONS */}
                      <div className="border-t border-gray-100 dark:border-neutral-850 pt-4 space-y-3">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <span className="text-[9px] text-gray-450 block font-light">Total do Orçamento</span>
                            <span className="text-xs font-semibold text-gray-650 dark:text-gray-300">R$ {totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] bg-emerald-500/10 text-emerald-650 dark:text-emerald-450 font-bold px-1.5 py-0.5 rounded-full inline-block mb-0.5">Cashback: R$ {cashbackValue.toFixed(2)}</span>
                            <span className="text-lg font-black text-amber-600 dark:text-primary block leading-none">Pix: R$ {pixPrice.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* CALCULATOR ACTIONS */}
                        <div className="flex flex-col gap-2 pt-1">
                          <button
                            onClick={() => {
                              trackClick(`btn-add-calculated-tiles-${tile.id}`);
                              addToCart({
                                id: tile.id,
                                name: tile.name,
                                category: "telhas",
                                brand: tile.brand,
                                price: tile.price,
                                stock: 1500,
                                rating: 4.8,
                                desc: `Lote calculado para ${roofArea}m² de telhado com ${roofPitch}% de inclinação.`,
                                img: tile.img
                              }, finalQuantity);
                            }}
                            className="w-full bg-primary hover:bg-primary-hover text-brown-dark text-[11px] font-black py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                          >
                            <Plus className="h-4 w-4" /> Adicionar Telhas Calculadas
                          </button>
                          <button
                            onClick={() => {
                              trackClick(`btn-whatsapp-calculated-tiles-${tile.id}`);
                              buySingleProductViaWhatsApp({
                                id: tile.id,
                                name: tile.name,
                                category: "telhas",
                                brand: tile.brand,
                                price: tile.price,
                                stock: 1500,
                                rating: 4.8,
                                desc: `Lote calculado para ${roofArea}m² de telhado com ${roofPitch}% de inclinação.`,
                                img: tile.img
                              }, finalQuantity);
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                          >
                            <Phone className="h-4 w-4" /> Comprar Lote via WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

          </section>
        )}

          {/* ── BANNER ZONE: after-doors ── */}
          {renderBannerZone("after-doors")}

           {/* SECTION: OS MAIS COMPRADOS DA SEMANA */}
          <section className="w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden select-none no-print animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white border-l-4 border-primary pl-3 flex items-center gap-2">
                  CAMPEÕES DE VENDAS DA SEMANA <span className="animate-pulse">🔥</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">Os materiais e acabamentos mais comprados e recomendados pelos profissionais de Campinas</p>
              </div>
              <span className="bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-extrabold px-3 py-1 rounded-full border border-red-200 dark:border-red-900/50 flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-650 animate-ping" /> Alta Procura
              </span>
            </div>

            {/* Best seller cards */}
            <div className="flex w-full overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-4 lg:pb-0 scrollbar-hide snap-x snap-mandatory">
              {[15, 1, 4, 10].map(id => {
                const p = products.find(prod => prod.id === id) || INITIAL_PRODUCTS.find(prod => prod.id === id);
                if (!p) return null;
                
                const pixPrice = p.pricePix || p.price * 0.9;
                const soldCount = id === 15 ? "480" : id === 1 ? "180" : id === 4 ? "720" : "1.200";
                const unitLabel = id === 15 ? "folhas" : id === 1 ? "unidades" : id === 4 ? "metros" : "sacos";
                const satisfaction = id === 15 ? "99%" : id === 1 ? "98%" : id === 4 ? "99%" : "97%";

                return (
                  <div 
                    key={p.id}
                    className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-4 flex flex-col justify-between hover:shadow-2xl hover:border-primary-hover dark:hover:border-primary transition-all duration-300 shadow-md group relative overflow-hidden min-w-[260px] lg:min-w-0 max-w-[260px] lg:max-w-none flex-shrink-0 lg:flex-shrink snap-align-start"
                  >
                    {/* Top badge */}
                    <div className="absolute top-2 left-2 z-10 bg-red-650 text-white font-black text-[8px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                      #{[15, 1, 4, 10].indexOf(id) + 1} Mais Comprado
                    </div>

                    <div>
                      {/* Image Frame */}
                      <div className="relative bg-gray-50 dark:bg-neutral-900 h-44 flex items-center justify-center text-6xl group-hover:bg-gray-100 dark:group-hover:bg-neutral-850 transition p-4 rounded-lg mb-3">
                        {p.img && (p.img.startsWith("/") || p.img.startsWith("http") || p.img.includes(".") || p.img.includes("data:image")) ? (
                          <img 
                            src={p.img} 
                            alt={p.name}
                            className="h-36 w-auto object-contain max-h-[140px] transition-transform duration-500 group-hover:scale-105" 
                          />
                        ) : (
                          <span className="filter drop-shadow-lg group-hover:rotate-6 transition-transform duration-300">{p.img}</span>
                        )}
                      </div>

                      {/* Title and details */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-gray-900 dark:text-gray-100 font-medium">
                          <span className="uppercase font-bold text-amber-600 dark:text-primary">{p.brand}</span>
                          <div className="flex items-center gap-0.5 text-yellow-400">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="font-bold text-gray-700 dark:text-gray-300">{p.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-xs leading-snug line-clamp-2 text-brown-dark dark:text-white group-hover:text-primary-hover dark:hover:text-primary transition">{p.name}</h4>
                        
                        {/* Progress bar showing popularity */}
                        <div className="pt-2 space-y-1">
                          <div className="flex justify-between text-[9px] text-gray-400 dark:text-gray-550 font-medium font-sans">
                            <span>Aprovação: {satisfaction}</span>
                            <span className="font-bold text-red-500 dark:text-red-400 font-mono">+{soldCount} {unitLabel}</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-1 overflow-hidden">
                            <div 
                              className="bg-red-550 h-full rounded-full animate-pulse" 
                              style={{ width: id === 15 ? '95%' : id === 1 ? '85%' : id === 4 ? '92%' : '88%' }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prices and Actions */}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800 space-y-3">
                      <div>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 line-through block font-light">De R$ {(p.price * 1.1).toFixed(2)}</span>
                        <div className="flex items-baseline justify-between gap-1.5">
                          <span className="text-[10px] text-gray-650 dark:text-gray-350">Ou R$ {p.price.toFixed(2)}</span>
                          <span className="text-[8px] text-gray-400 font-mono font-light font-light">10x R$ {(p.price / 10).toFixed(2)}</span>
                        </div>
                        <span className="text-amber-600 dark:text-primary font-black text-sm block mt-0.5">Pix: R$ {pixPrice.toFixed(2)}</span>
                      </div>

                      {/* CTA Actions */}
                      <div className="flex flex-col gap-1.5 pt-1">
                        <Link
                          href={`/produtos/${p.id}`}
                          className="w-full bg-slate-100 dark:bg-neutral-800 hover:bg-[#F4B400]/10 border border-slate-200 dark:border-neutral-750 text-slate-700 dark:text-stone-300 text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-1 shadow transition active:scale-95 cursor-pointer"
                        >
                          🔍 Ver Detalhes
                        </Link>
                        <button
                          onClick={() => {
                            trackClick(`btn-add-budget-bestseller-${p.id}`);
                            addToCart(p);
                          }}
                          className="w-full bg-primary hover:bg-primary-hover text-brown-dark text-[10px] font-black py-2 rounded-lg flex items-center justify-center gap-1 shadow transition active:scale-95 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" /> Adicionar ao Carrinho
                        </button>
                        <button
                          onClick={() => {
                            trackClick(`btn-whatsapp-bestseller-${p.id}`);
                            buySingleProductViaWhatsApp(p);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 shadow transition active:scale-95 cursor-pointer"
                        >
                          <Phone className="h-3 w-3" /> Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── BANNER ZONE: after-bestsellers ── */}
          {renderBannerZone("after-bestsellers")}

          {/* 6. Products Grid Section */}
          <section id="produtos-section" className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white border-l-4 border-primary pl-3">
                  {selectedCategoryFilter === "all" ? "NOSSOS PRODUTOS EM DESTAQUE" : `PRODUTOS EM "${categories.find(c => c.id === selectedCategoryFilter)?.name.toUpperCase()}"`}
                </h3>
                <p className="text-xs text-gray-500 mt-1">Clique para solicitar orçamento formal imediato no WhatsApp</p>
              </div>
              <span className="bg-primary/20 text-brown-dark dark:text-primary text-xs font-extrabold px-3 py-1 rounded-full border border-primary/30">
                {filteredProducts.length} itens encontrados
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-dark-surface rounded-xl p-12 text-center border border-gray-200 dark:border-dark-border max-w-md mx-auto my-8">
                <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-lg text-brown-dark dark:text-white">Nenhum produto encontrado</h4>
                <p className="text-sm text-gray-500 mt-1 mb-4">Tente buscar por termos mais genéricos ou limpe os filtros de busca.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategoryFilter("all"); }}
                  className="bg-primary text-brown-dark px-4 py-2 rounded-full font-bold text-xs hover:bg-primary-hover transition"
                >
                  Limpar Busca e Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(p => {
                  const pixPrice = p.pricePix || p.price * 0.9;
                  const parcelPrice = p.price / 10;
                  return (
                    <div
                      key={p.id}
                      className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Product badge */}
                      <div className="relative bg-gray-50 dark:bg-neutral-900 h-44 flex items-center justify-center text-6xl group-hover:bg-gray-100 dark:group-hover:bg-neutral-850 transition p-4 overflow-hidden">
                        {p.videoUrl ? (
                          <div className="w-full h-full relative">
                            <video
                              src={p.videoUrl}
                              autoPlay={p.videoPlayMode !== "click"}
                              muted
                              loop
                              playsInline
                              controls={p.videoPlayMode === "click"}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <span className="absolute bottom-2 left-2 bg-red-600/90 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1 shadow-sm">
                              <span>🎥 VÍDEO</span>
                            </span>
                          </div>
                        ) : p.img && (p.img.startsWith("/") || p.img.startsWith("http") || p.img.includes(".") || p.img.includes("data:image")) ? (
                          <img src={p.img} alt={p.name} className="h-36 w-auto object-contain max-h-[140px] transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <span className="filter drop-shadow-lg group-hover:rotate-6 transition-transform duration-300">{p.img}</span>
                        )}
                        <span className="absolute top-2 left-2 bg-brown-dark text-white text-[9px] font-black px-2 py-0.5 rounded uppercase z-10">
                          {p.brand}
                        </span>
                        {p.stock <= 15 && (
                          <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase animate-pulse z-10">
                            Baixo Estoque ({p.stock})
                          </span>
                        )}

                        {/* Interactive overlay quickview */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => buySingleProductViaWhatsApp(p)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2.5 rounded-full shadow-lg transition active:scale-90"
                            title="Comprar Rápido no WhatsApp"
                          >
                            <Phone className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => addToCart(p)}
                            className="bg-primary hover:bg-primary-hover text-brown-dark font-bold p-2.5 rounded-full shadow-lg transition active:scale-90"
                            title="Adicionar ao Orçamento"
                          >
                            <Plus className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-yellow-500">
                            <div className="flex items-center gap-1.5">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-gray-300"}`} />
                                ))}
                              </div>
                              <span className="font-bold text-[10px] text-gray-900 dark:text-gray-100 font-medium">({p.rating.toFixed(1)})</span>
                            </div>
                            {p.soldCount > 0 && (
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-450 font-black animate-pulse flex items-center gap-0.5">
                                🔥 {p.soldCount} vendidos
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-brown-dark dark:text-white group-hover:text-primary transition line-clamp-2">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-gray-900 dark:text-gray-100 font-medium line-clamp-2">{p.desc}</p>
                        </div>

                        <div className="mt-4 border-t border-gray-100 dark:border-dark-border pt-3 space-y-2">
                          {/* Price block */}
                          <div>
                            <span className="text-[10px] text-gray-400 line-through block">De R$ {(p.price * 1.1).toFixed(2)}</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs text-gray-500">Ou R$ {p.price.toFixed(2)}</span>
                              <span className="text-[10px] text-gray-400 font-medium">em 10x de R$ {parcelPrice.toFixed(2)}</span>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded border border-amber-200/50 dark:border-amber-900/30 mt-1">
                              <span className="text-primary-hover dark:text-primary text-[10px] font-black uppercase tracking-wider block">PREÇO EXCLUSIVO PIX (10% OFF)</span>
                              <span className="text-lg font-black text-brown-dark dark:text-white">R$ {pixPrice.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* CTA Actions */}
                          <div className="flex flex-col gap-2 pt-2">
                            <Link
                              href={`/produtos/${p.id}`}
                              className="bg-slate-100 dark:bg-neutral-800 hover:bg-[#F4B400]/10 border border-slate-200 dark:border-neutral-750 text-slate-700 dark:text-stone-300 text-xs font-black py-2 rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                            >
                              🔍 Ver Detalhes
                            </Link>
                            <button
                              onClick={() => addToCart(p)}
                              className="bg-primary hover:bg-primary-hover text-brown-dark text-xs font-black py-2 rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" /> Adicionar ao Carrinho
                            </button>
                            <button
                              onClick={() => buySingleProductViaWhatsApp(p)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                            >
                              <Phone className="h-3.5 w-3.5" /> Comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Premium Loyalty / Loyalty Cashback Block */}
          <ScrollReveal direction="up" delay={100}>
            <section className="bg-brown-dark text-white py-12 px-6 shadow-inner transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="bg-primary text-brown-dark font-black text-[10px] px-2.5 py-0.5 rounded-full tracking-wider uppercase inline-block">PROGRAMA DE FIDELIDADE</span>
                <h3 className="font-display font-black text-2xl md:text-3xl">Gostaria de receber Cashback em todas as compras?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Com o **Clube Só Madeiras**, 3% de tudo que você orçar e fechar pelo WhatsApp retorna em créditos automáticos para sua próxima obra! Faça seu cadastro com nosso vendedor.
                </p>
              </div>
              <div className="flex bg-white/10 p-4 rounded-xl border border-white/20 items-center gap-4 shadow-lg backdrop-blur-sm">
                <Gift className="h-12 w-12 text-primary animate-bounce" />
                <div>
                  <h5 className="font-black text-primary text-sm uppercase">CÁLCULO AUTOMÁTICO</h5>
                  <p className="text-xs text-gray-200 mt-0.5">Seu carrinho atual garante:</p>
                  <p className="font-black text-lg text-white">R$ {(budgetCart.reduce((a, b) => a + (b.product.price * b.quantity), 0) * 0.03).toFixed(2)} de Cashback</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <AboutSection />
        </ScrollReveal>

          {/* 7. Footer */}
          <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 py-12 px-4 text-xs md:text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src="/images/logo.png" alt="Só Madeiras" className="h-10 w-auto object-contain drop-shadow-sm" />
                  <h4 className="font-display font-black text-white text-base">SÓ MADEIRAS</h4>
                </div>
                <p className="text-neutral-500 leading-relaxed text-xs">
                  Plataforma premium líder em materiais de construção, telhas, ferramentas e madeiras nobres tratadas com faturamento corporativo simplificado via WhatsApp.
                </p>
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider block">
                    Acompanhe nossas redes sociais
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={settings?.instagramUrl || "https://instagram.com/somadeiras"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow"
                      title="Instagram Só Madeiras"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href={settings?.facebookUrl || "https://facebook.com/somadeiras"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-blue-600 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow"
                      title="Facebook Só Madeiras"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={settings?.youtubeUrl || "https://youtube.com/somadeiras"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow"
                      title="YouTube Só Madeiras"
                    >
                      <YouTube size={18} />
                    </a>
                  </div>
                </div>

              </div>
              <div>
                <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Mega Menu</h5>
                <ul className="space-y-2 text-xs">
                  {giveawayActive && (
                    <li><Link href="/sorteio" className="text-primary hover:text-white transition font-bold flex items-center gap-1">🍀 Sorteio do Mês</Link></li>
                  )}
                  <li><Link href="/lookbook" className="text-primary hover:text-white transition font-bold flex items-center gap-1">✨ Lookbook Inspirações</Link></li>
                  <li><Link href="/portas-de-madeira" className="hover:text-white transition">Portas de Madeira</Link></li>
                  <li><Link href="/janelas-de-madeira" className="hover:text-white transition">Janelas de Madeira</Link></li>
                  <li><Link href="/portas-e-janelas-de-aluminio" className="hover:text-white transition font-bold text-cyan-400">Portas e Janelas de Alumínio</Link></li>
                  <li><Link href="/pre-moldados" className="hover:text-white transition font-bold text-amber-400">Pré-Moldados de Concreto</Link></li>
                  <li><Link href="/forro-pvc" className="hover:text-white transition">Forro PVC</Link></li>
                  <li><Link href="/pergolados" className="hover:text-white transition">Pergolados</Link></li>
                  <li><Link href="/galpoes-currais" className="hover:text-white transition">Galpões e Currais</Link></li>

                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Atendimento Fixo</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> <span>{settings?.phone || "(79) 99629-8990"} (WhatsApp)</span></li>
                  <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> <span>{settings?.address || "Av. Contorno, 465, Estância - SE"}</span></li>
                  <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> <span>{settings?.workHours || "Seg a Sex: 07h30 às 17h30 | Sáb: 07h30 às 12h"}</span></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Sobre a Região</h5>
                <p className="text-neutral-500 leading-relaxed text-xs">
                  {settings?.regionsText || "Atendemos com frota própria em Estância, Aracaju, Itabaiana, Lagarto, Propriá, Tobias Barreto, Nossa Senhora do Socorro e todo o estado de Sergipe e norte da Bahia."}
                </p>
                <div className="mt-4 bg-neutral-850 p-2.5 rounded border border-neutral-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[10px] text-white uppercase tracking-wider">Comprar Rápido</p>
                    <p className="text-[10px] text-neutral-400">Atendimento Técnico Direto</p>
                  </div>
                  <a 
                    href={`https://wa.me/${settings?.whatsappNumber || "5579996298990"}?text=${encodeURIComponent(settings?.whatsappText || "Olá! Gostaria de fazer um orçamento.")}`}
                    target="_blank"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded font-bold text-[10px] uppercase shadow transition"
                  >
                    Chamar
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-8 pt-6 text-center text-neutral-600 text-xs">
              <p>© {new Date().getFullYear()} SÓ MADEIRAS MATERIAIS DE CONSTRUÇÃO LTDA. Todos os direitos reservados. Desenvolvido com fins de alta conversão.</p>
            </div>
          </footer>

          {/* ==========================================
              DYNAMIC SLIDE-OVER BUDGET CART
              ========================================== */}
          {isCartOpen && (
            <div className="fixed inset-0 overflow-hidden z-50 animate-fade-in no-print">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
              <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white dark:bg-dark-surface shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-dark-border transition-colors">
                  
                  {/* Cart Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center bg-brown-dark text-white">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <h3 className="font-display font-black text-base">CARRINHO DE ORÇAMENTO</h3>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)} 
                      className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Cart Body list */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {budgetCart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                        <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-3" />
                        <h4 className="font-bold text-sm text-brown-dark dark:text-white">Carrinho de orçamento vazio</h4>
                        <p className="text-xs text-gray-400 max-w-xs mt-1">Adicione produtos de nosso catálogo para solicitar um faturamento completo no WhatsApp.</p>
                        <button
                          onClick={() => { setIsCartOpen(false); trackClick("btn-continue-shopping"); }}
                          className="bg-primary text-brown-dark text-xs font-black px-4 py-2 rounded-full mt-4 hover:bg-primary-hover shadow transition"
                        >
                          Continuar Comprando
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          {budgetCart.map((item, index) => {
                            const itemTotal = item.product.price * item.quantity;
                            return (
                              <div 
                                key={index} 
                                className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border rounded-xl p-3 flex gap-3 shadow-xs hover:border-primary/50 transition duration-200"
                              >
                                {item.product.img && (item.product.img.startsWith("/") || item.product.img.startsWith("http") || item.product.img.includes(".") || item.product.img.includes("data:image")) ? (
                                  <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg border border-gray-100 dark:border-neutral-700 p-1 flex items-center justify-center">
                                    <img src={item.product.img} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                                  </div>
                                ) : (
                                  <span className="text-4xl filter drop-shadow flex items-center justify-center w-12 h-12 flex-shrink-0">{item.product.img}</span>
                                )}
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <h5 className="font-bold text-xs text-brown-dark dark:text-white line-clamp-1">{item.product.name}</h5>
                                    <span className="text-[10px] text-gray-400 block -mt-0.5">{item.product.brand}</span>
                                    <span className="text-xs font-extrabold text-brown-medium dark:text-primary mt-1 block">R$ {item.product.price.toFixed(2)}/un</span>
                                  </div>
                                  
                                  {/* Qty edit buttons */}
                                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-250/20 dark:border-dark-border">
                                    <div className="flex items-center bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded-md shadow-xs overflow-hidden">
                                      <button 
                                        onClick={() => updateCartQty(item.product.id, -1)}
                                        className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg transition"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="px-2.5 py-0.5 text-xs font-black text-brown-dark dark:text-white">{item.quantity}</span>
                                      <button 
                                        onClick={() => updateCartQty(item.product.id, 1)}
                                        className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg transition"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>
                                    <button 
                                      onClick={() => removeFromCart(item.product.id)}
                                      className="text-red-500 hover:text-red-600 transition p-1 hover:bg-red-50 dark:hover:bg-red-950/25 rounded"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Cashback meter */}
                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-3.5 mt-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-brown-medium dark:text-primary uppercase tracking-wide flex items-center gap-1">
                              <Gift className="h-3.5 w-3.5" /> Cashback Acumulado (3%)
                            </span>
                            <span className="font-black text-sm text-brown-dark dark:text-white">
                              R$ {(budgetCart.reduce((a, b) => a + (b.product.price * b.quantity), 0) * 0.03).toFixed(2)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${Math.min(100, (budgetCart.reduce((a, b) => a + (b.product.price * b.quantity), 0) / 2000) * 100)}%` }} />
                          </div>
                          <p className="text-[9px] text-gray-400 leading-tight">Ganhe Frete Grátis na região de Campinas completando R$ 1.500 no orçamento!</p>
                        </div>

                        {/* AI Recommendation Engine widget */}
                        <div className="border-t border-gray-100 dark:border-dark-border pt-4">
                          <h6 className="text-[11px] font-black text-brown-medium dark:text-primary uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" /> IA Recomenda para sua Obra
                          </h6>
                          <div className="grid grid-cols-3 gap-2">
                            {recommendedProducts.map((p, i) => (
                              <div 
                                key={i} 
                                onClick={() => addToCart(p)}
                                className="bg-slate-50 dark:bg-neutral-900 hover:border-primary/50 transition border border-gray-200 dark:border-dark-border rounded-lg p-2 text-center cursor-pointer relative overflow-hidden group shadow-xs"
                              >
                                {p.img && (p.img.startsWith("/") || p.img.startsWith("http") || p.img.includes(".") || p.img.includes("data:image")) ? (
                                  <div className="h-8 w-full flex items-center justify-center mb-1">
                                    <img src={p.img} alt={p.name} className="h-full w-auto object-contain transition-transform group-hover:scale-110" />
                                  </div>
                                ) : (
                                  <span className="text-2xl filter drop-shadow block mb-1 group-hover:scale-110 transition-transform">{p.img}</span>
                                )}
                                <h6 className="font-bold text-[10px] text-brown-dark dark:text-white line-clamp-1">{p.name}</h6>
                                <span className="text-[10px] text-primary-hover font-extrabold mt-0.5 block">R$ {p.price.toFixed(2)}</span>
                                <span className="absolute top-1 right-1 text-[8px] bg-primary text-brown-dark px-1 rounded font-bold shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">+ Add</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Cart Footer */}
                  {budgetCart.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-dark-border bg-slate-50 dark:bg-neutral-900 space-y-3 transition-colors">
                      {/* Coupon input field */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="CUPOM DE DESCONTO"
                          className="flex-1 bg-white dark:bg-dark-surface border border-gray-205 dark:border-dark-border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-brown-dark dark:text-white font-bold"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-primary hover:bg-primary-hover text-brown-dark text-xs font-black px-4 py-1.5 rounded-lg transition active:scale-95 cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      
                      {appliedCoupon && (
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/30 rounded-lg p-2 flex justify-between items-center text-xs text-emerald-800 dark:text-emerald-400 animate-fade-in">
                          <span className="font-bold">🎟️ Cupom {appliedCoupon.code} aplicado!</span>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-gray-400 hover:text-red-500 font-black px-1.5 py-0.5 rounded transition"
                          >
                            Remover
                          </button>
                        </div>
                      )}

                      <div className="space-y-1.5 text-sm">
                        {(() => {
                          const subtotal = budgetCart.reduce((a, b) => a + (b.product.price * b.quantity), 0);
                          const pixSubtotal = budgetCart.reduce((a, b) => a + (((b.product as any).pricePix || b.product.price * 0.9) * b.quantity), 0);
                          let discount = 0;
                          let explanation = "";
                          if (appliedCoupon) {
                            const applicableSubtotal = getCouponApplicableSubtotal(appliedCoupon, budgetCart);
                            if (appliedCoupon.type === "percentage") {
                              discount = applicableSubtotal * (appliedCoupon.value / 100);
                            } else if (appliedCoupon.type === "fixed") {
                              discount = Math.min(applicableSubtotal, appliedCoupon.value);
                            }
                            
                            const hasProd = appliedCoupon.applicableProducts && appliedCoupon.applicableProducts.length > 0;
                            const hasCat = appliedCoupon.applicableCategories && appliedCoupon.applicableCategories.length > 0;
                            if (hasProd || hasCat) {
                              explanation = "Válido apenas para itens selecionados.";
                            }
                          }
                          const subtotalAfterCoupon = subtotal - discount;
                          const finalTotalPix = appliedCoupon
                            ? Math.max(0, pixSubtotal - (appliedCoupon.type === "percentage" ? pixSubtotal * (appliedCoupon.value / 100) : discount))
                            : pixSubtotal;
                          const pixDiscount = Math.max(0, subtotalAfterCoupon - finalTotalPix);
                          return (
                            <>
                              <div className="flex justify-between text-gray-900 dark:text-gray-100 font-medium">
                                <span>Subtotal Orçamento</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                              </div>
                              {appliedCoupon && (
                                <div className="space-y-0.5">
                                  <div className="flex justify-between text-emerald-600 font-medium">
                                    <span>Desconto Cupom ({appliedCoupon.code})</span>
                                    <span>- R$ {discount.toFixed(2)}</span>
                                  </div>
                                  {explanation && (
                                    <div className="text-right">
                                      <span className="text-[9px] text-gray-400 block -mt-0.5 italic">{explanation}</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="flex justify-between text-emerald-600 font-bold">
                                <span>Desconto Exclusivo Pix (10%)</span>
                                <span>- R$ {pixDiscount.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-base font-black text-brown-dark dark:text-white pt-2 border-t border-gray-200 dark:border-dark-border">
                                <span>Total Estimado Pix</span>
                                <span>R$ {finalTotalPix.toFixed(2)}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>


                      <div className="flex flex-col gap-2 pt-2">
                        <button
                          onClick={() => { setIsSubmitted(false); setLeadModalOpen(true); trackClick("btn-checkout-whatsapp"); }}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer text-sm"
                        >
                          <Phone className="h-4.5 w-4.5" /> Enviar para WhatsApp do Vendedor
                        </button>
                        <button 
                          onClick={() => { alert("Orçamento salvo! Seu carrinho permanecerá salvo no seu navegador."); setIsCartOpen(false); }}
                          className="w-full bg-white dark:bg-dark-surface text-brown-dark dark:text-white border border-gray-200 dark:border-dark-border text-xs font-bold py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition active:scale-95"
                        >
                          Salvar Orçamento no Navegador
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              INTERCEPTOR LEAD CAPTURE MODAL
              ========================================== */}
          {leadModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-fade-in no-print">
              <div className="bg-white dark:bg-dark-surface rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-200 dark:border-dark-border transition-colors animate-scale-in">
                
                {/* Banner timber */}
                <div className="bg-brown-dark text-white p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-full filter blur-2xl opacity-20 -mr-6 -mt-6" />
                  <span className="bg-primary text-brown-dark font-black text-[10px] px-2.5 py-0.5 rounded-full tracking-wider uppercase inline-block mb-1.5">Aviso de Conversão</span>
                  <h3 className="font-display font-black text-xl leading-tight">Você está a 1 clique de fechar sua cotação com desconto!</h3>
                  <p className="text-xs text-gray-300 mt-1">Insira seus dados rápidos para garantirmos frete subsidiado, suporte de engenharia e os descontos de tabela.</p>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider block">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={leadFormData.name}
                      onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2.5 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider block">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 19999999999"
                      value={leadFormData.phone}
                      onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2.5 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider block">Cidade</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Campinas"
                        value={leadFormData.city}
                        onChange={(e) => setLeadFormData({ ...leadFormData, city: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2.5 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider block">Estado</label>
                      <select
                        value={leadFormData.state}
                        onChange={(e) => setLeadFormData({ ...leadFormData, state: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2.5 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                      >
                        <option value="SP">São Paulo (SP)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PR">Paraná (PR)</option>
                      </select>
                    </div>
                  </div>

                  {/* Anti-spam consent */}
                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" defaultChecked required className="mt-0.5" />
                    <p className="text-[10px] text-gray-400 leading-normal">
                      Autorizo o time comercial Só Madeiras a salvar meu orçamento para contato prioritário e concordo em prosseguir ao WhatsApp corporativo.
                    </p>
                  </div>

                  {/* Checkout buttons */}
                  <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <button
                      type="button"
                      onClick={() => setLeadModalOpen(false)}
                      className="flex-1 bg-gray-100 dark:bg-neutral-800 text-brown-dark dark:text-white text-xs font-bold py-3 rounded-xl hover:bg-gray-250 dark:hover:bg-neutral-750 transition"
                    >
                      Voltar ao Carrinho
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3 rounded-xl flex items-center justify-center gap-1 shadow-lg transition active:scale-95"
                    >
                      Prosseguir WhatsApp <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* ==========================================
              FLOATING WHATSAPP CHAT WIDGET
              ========================================== */}
          {/* FLOATING WHATSAPP SELLER SELECTION WIDGET */}
          <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 no-print">
            {/* Expanded Sellers Card Popup */}
            {isWhatsappWidgetOpen && (
              <div className="w-[330px] sm:w-[360px] bg-white dark:bg-neutral-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden animate-fade-in text-brown-dark dark:text-white select-none">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#1b4332] p-4 text-white relative">
                  <button
                    onClick={() => setIsWhatsappWidgetOpen(false)}
                    className="absolute top-3 right-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-1 rounded-full transition"
                    title="Fechar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-emerald-400 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm uppercase tracking-tight flex items-center gap-1.5">
                        <span>Vendedores de Plantão</span>
                        <span className="bg-emerald-500 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Online
                        </span>
                      </h4>
                      <p className="text-[11px] text-stone-300 font-light leading-tight">
                        Escolha um especialista para falar no WhatsApp:
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seller List */}
                <div className="p-3 space-y-2.5 max-h-[340px] overflow-y-auto bg-slate-50/50 dark:bg-neutral-950/50">
                  {ON_DUTY_SELLERS.map((seller) => (
                    <div
                      key={seller.id}
                      onClick={() => {
                        trackClick(`btn-whatsapp-seller-${seller.id}`);
                        const msg = encodeURIComponent(seller.whatsappMessage);
                        window.open(`https://wa.me/${seller.phone}?text=${msg}`, "_blank");
                        setIsWhatsappWidgetOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-150 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3 group active:scale-98"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={seller.avatar}
                            alt={seller.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40 group-hover:scale-105 transition"
                          />
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900" />
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="flex items-center gap-1.5">
                            <h5 className="font-bold text-xs truncate text-brown-dark dark:text-white group-hover:text-emerald-600 transition-colors">
                              {seller.name}
                            </h5>
                          </div>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded uppercase inline-block my-0.5">
                            {seller.badge}
                          </span>
                          <p className="text-[10px] text-gray-900 dark:text-gray-100 font-medium truncate font-light">
                            {seller.role}
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-600 group-hover:bg-emerald-500 text-white p-2 rounded-xl shrink-0 transition shadow-xs">
                        <Phone className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer status */}
                <div className="p-2.5 bg-gray-50 dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 text-center text-[10px] text-gray-400 font-medium">
                  ⚡ Tempo médio de resposta: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">menos de 2 minutos</strong>
                </div>
              </div>
            )}

            {/* Main Floating Trigger Button */}
            <button
              onClick={() => setIsWhatsappWidgetOpen(!isWhatsappWidgetOpen)}
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 active:scale-90 flex items-center justify-center border-2 border-white relative group cursor-pointer"
              title="Vendedores de Plantão no WhatsApp"
            >
              <WhatsAppIcon size={30} fill="#ffffff" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                3
              </span>
            </button>

          </div>

          {/* SPIN WHEEL DISCOUNT MODAL */}
          <SpinWheelModal
            isOpen={isSpinWheelOpen}
            onClose={() => setIsSpinWheelOpen(false)}
            onApplyCoupon={(couponCode) => {
              handleApplyCoupon(couponCode);
              addSystemNotification(`Cupom "${couponCode}" aplicado com sucesso ao seu orçamento!`);
            }}
          />

        </div>
      )}

      {/* ==========================================
          ADMIN / CRM DASHBOARD COCKPIT PERSPECTIVE
          ========================================== */}
      {viewMode === "admin" && (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-dark-bg md:flex-row transition-colors no-print">
          
          {/* Side Menu */}
          <aside className="w-full md:w-64 bg-brown-dark text-white p-4 space-y-4 md:sticky md:top-11 md:h-[calc(100vh-44px)] flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="bg-primary text-brown-dark rounded w-8 h-8 flex items-center justify-center font-bold text-sm">📊</span>
                <div>
                  <h4 className="font-display font-black text-sm tracking-tight text-white leading-tight">COCKPIT CRM</h4>
                  <p className="text-[9px] text-primary tracking-widest font-black uppercase -mt-0.5">Admin Central</p>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="flex flex-col gap-1 text-xs">
                <button
                  onClick={() => { setAdminTab("dashboard"); trackClick("admin-tab-dash"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "dashboard" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <BarChart2 className="h-4 w-4" /> Dashboard Executivo
                </button>
                <button
                  onClick={() => { setAdminTab("crm"); trackClick("admin-tab-crm"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "crm" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Users className="h-4 w-4" /> CRM de Leads
                  <span className="bg-red-600 text-white rounded-full px-1.5 py-0.2 text-[9px] font-black ml-auto">{leads.filter(l => l.status === "Novo Lead").length}</span>
                </button>
                <button
                  onClick={() => { setAdminTab("vendedores"); trackClick("admin-tab-vendedores"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "vendedores" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Users className="h-4 w-4 text-sky-400" /> Gerenciar Vendedores
                </button>
                <button
                  onClick={() => { setAdminTab("cupons"); trackClick("admin-tab-cupons"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "cupons" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Award className="h-4 w-4 text-purple-400" /> Cupons de Desconto
                </button>


                <button
                  onClick={() => { setAdminTab("heatmap"); trackClick("admin-tab-heatmap"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "heatmap" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Flame className="h-4 w-4" /> Mapa de Calor / Cliques
                </button>
                <button
                  onClick={() => { setAdminTab("recovery"); trackClick("admin-tab-recovery"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "recovery" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <ShoppingBag className="h-4 w-4" /> Recuperação de Carrinho
                </button>
                <button
                  onClick={() => { setAdminTab("crud-products"); trackClick("admin-tab-crud-prods"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "crud-products" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Settings className="h-4 w-4" /> Catálogo de Produtos (CRUD)
                </button>
                <button
                  onClick={() => { setAdminTab("popup-builder"); trackClick("admin-tab-popup-builder"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "popup-builder" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Sparkles className="h-4 w-4" /> Popups & Campanhas
                </button>
                <button
                  onClick={() => { setAdminTab("flash-deals"); trackClick("admin-tab-flash-deals"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "flash-deals" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Flame className="h-4 w-4 text-orange-500" /> Ofertas Relâmpago
                </button>
                <button
                  onClick={() => { setAdminTab("settings"); trackClick("admin-tab-settings"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "settings" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Settings className="h-4 w-4 text-yellow-500" /> Configurações Gerais
                </button>
                <button
                  onClick={() => { setAdminTab("banner-builder"); trackClick("admin-tab-banner-builder"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "banner-builder" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Sparkles className="h-4 w-4 text-amber-500" /> Carrossel de Banners
                </button>
                <button
                  onClick={() => { setAdminTab("section-banners"); trackClick("admin-tab-section-banners"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "section-banners" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Layout className="h-4 w-4 text-cyan-400" /> Banners entre Seções
                </button>
                <button
                  onClick={() => { setAdminTab("menu-builder"); trackClick("admin-tab-menu-builder"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-bold transition flex items-center gap-2 ${adminTab === "menu-builder" ? "bg-primary text-brown-dark" : "hover:bg-white/5 text-gray-300"}`}
                >
                  <Menu className="h-4 w-4 text-emerald-500" /> Menu Principal
                </button>
              </nav>
            </div>

            {/* Quick stats on side footer */}
            <div className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-1.5">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Desempenho Geral</p>
              <div className="flex justify-between text-xs">
                <span>Vendas Hoje</span>
                <span className="font-bold text-primary">R$ {statsSummary.faturamento.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Taxa Conversão</span>
                <span className="font-bold text-emerald-400">{statsSummary.conversao.toFixed(1)}%</span>
              </div>
            </div>
          </aside>

          {/* Admin Main Body */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            
            {/* Dashboard Tab view */}
            {adminTab === "dashboard" && (
              <div className="space-y-6">
                
                {/* KPI Card row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">VISITAS HOJE</span>
                      <h4 className="font-display font-black text-2xl mt-0.5 text-brown-dark dark:text-white">{statsSummary.visits}</h4>
                      <span className="text-[10px] text-emerald-500 font-bold">🟢 Orgânico & CPC</span>
                    </div>
                    <div className="bg-primary/10 text-primary p-3 rounded-lg"><Eye className="h-6 w-6" /></div>
                  </div>

                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">CLIQUES WHATSAPP</span>
                      <h4 className="font-display font-black text-2xl mt-0.5 text-brown-dark dark:text-white">{statsSummary.waClicks}</h4>
                      <span className="text-[10px] text-emerald-500 font-bold">🎯 {((statsSummary.waClicks / statsSummary.visits) * 100).toFixed(1)}% Conversão Clique</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 p-3 rounded-lg"><Phone className="h-6 w-6" /></div>
                  </div>

                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">LEADS CRM GERADOS</span>
                      <h4 className="font-display font-black text-2xl mt-0.5 text-brown-dark dark:text-white">{statsSummary.leadsCount}</h4>
                      <span className="text-[10px] text-primary-hover font-bold">📂 Funil de Captura</span>
                    </div>
                    <div className="bg-brown-medium/10 text-brown-medium dark:text-primary p-3 rounded-lg"><Users className="h-6 w-6" /></div>
                  </div>

                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">FATURAMENTO REAL</span>
                      <h4 className="font-display font-black text-2xl mt-0.5 text-brown-dark dark:text-white">R$ {statsSummary.faturamento.toFixed(2)}</h4>
                      <span className="text-[10px] text-slate-400">Margem Estimada 35%</span>
                    </div>
                    <div className="bg-amber-100 text-brown-dark dark:bg-amber-950/20 dark:text-primary p-3 rounded-lg"><DollarSign className="h-6 w-6" /></div>
                  </div>
                </div>

                {/* Additional detailed cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3.5 rounded-lg shadow-sm text-center">
                    <span className="text-[9px] font-black text-gray-450 uppercase block">Carrinhos Criados</span>
                    <p className="font-black text-lg mt-0.5 text-gray-700 dark:text-gray-200">{statsSummary.carrinhosCriados}</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3.5 rounded-lg shadow-sm text-center">
                    <span className="text-[9px] font-black text-gray-450 uppercase block">Carrinhos Abandonados</span>
                    <p className="font-black text-lg mt-0.5 text-amber-600">{statsSummary.carrinhosAbandonados}</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3.5 rounded-lg shadow-sm text-center">
                    <span className="text-[9px] font-black text-gray-450 uppercase block">Ticket Médio</span>
                    <p className="font-black text-lg mt-0.5 text-gray-700 dark:text-gray-200">R$ {statsSummary.ticket.toFixed(2)}</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3.5 rounded-lg shadow-sm text-center">
                    <span className="text-[9px] font-black text-gray-450 uppercase block">Lucro Bruto Estimado</span>
                    <p className="font-black text-lg mt-0.5 text-emerald-600">R$ {statsSummary.lucro.toFixed(2)}</p>
                  </div>
                </div>

                {/* Main analytical graphs charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Timeline area chart */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors">
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-brown-medium dark:text-primary mb-3">Vendas & Conversões por Período</h5>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                        <AreaChart data={leadsTimelineData}>
                          <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6D4C41" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#6D4C41" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip />
                          <Area type="monotone" dataKey="Visitas" stroke="#6D4C41" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
                          <Area type="monotone" dataKey="Leads" stroke="#FFC107" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Funil de conversão bar chart */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors">
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-brown-medium dark:text-primary mb-3">Funil de Conversão (Qtd de Usuários)</h5>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                        <BarChart data={funnelData} layout="vertical">
                          <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} width={80} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3E2723" radius={[0, 4, 4, 0]}>
                            {funnelData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 5 ? "#16a34a" : index === 4 ? "#FFC107" : "#6D4C41"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Traffic Sources Pie */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors">
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-brown-medium dark:text-primary mb-3">Origens dos Leads (Tráfego)</h5>
                    <div className="h-60 w-full flex flex-col md:flex-row justify-center items-center gap-4">
                      <div className="h-44 w-44">
                        <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                          <PieChart>
                            <Pie
                              data={sourceLeadsData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {sourceLeadsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-2 text-xs">
                        {sourceLeadsData.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                            <span className="font-medium text-gray-650 dark:text-gray-300">{item.name}:</span>
                            <span className="font-black text-brown-dark dark:text-white">{item.value} Leads ({leads.length > 0 ? Math.round((item.value / leads.length) * 100) : 0}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Most clicked items listed */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-4 rounded-xl shadow-sm transition-colors">
                    <h5 className="font-display font-black text-xs uppercase tracking-wider text-brown-medium dark:text-primary mb-3">Zonas de Acesso & Cliques no Site</h5>
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {Object.entries(clicksHeatmap)
                        .sort((a, b) => b[1] - a[1])
                        .map(([key, val], i) => (
                          <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border px-3 py-2 rounded-lg text-xs">
                            <span className="font-bold text-brown-dark dark:text-gray-200 flex items-center gap-1.5">
                              <span className="bg-primary text-brown-dark font-bold text-[9px] px-1.5 py-0.2 rounded">{i+1}</span>
                              <code className="text-purple-600 dark:text-purple-400 font-mono text-[10px]">{key}</code>
                            </span>
                            <span className="font-black text-brown-medium dark:text-primary">{val} cliques</span>
                          </div>
                        ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* CRM Tab view */}
            {adminTab === "crm" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-5 space-y-5 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 dark:border-dark-border pb-4">
                  <div>
                    <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase tracking-tight">GESTÃO COMPLETA DE LEADS CRM</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Acompanhe as transições de orçamentos, mude status e filtre por vendedor ou canal</p>
                  </div>
                  <span className="bg-primary text-brown-dark text-xs font-extrabold px-3 py-1 rounded-full">{leads.length} Leads Ativos</span>
                </div>

                {/* Table containing all leads */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-border text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold text-[9px]">
                        <th className="py-3 px-2">Cliente / Contato</th>
                        <th className="py-3 px-2">Data/Hora</th>
                        <th className="py-3 px-2">Origem / UTM</th>
                        <th className="py-3 px-2">Itens Solicitados</th>
                        <th className="py-3 px-2 text-right">Total Cotação</th>
                        <th className="py-3 px-2">Vendedor</th>
                        <th className="py-3 px-2">Status CRM</th>
                        <th className="py-3 px-2 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-neutral-850/40 transition duration-150">
                          {/* Client */}
                          <td className="py-3.5 px-2">
                            <div className="font-bold text-brown-dark dark:text-white">{lead.name}</div>
                            <div className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                              <Phone className="h-3 w-3 text-emerald-600" /> {lead.phone}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{lead.location}</div>
                          </td>
                          {/* Time */}
                          <td className="py-3.5 px-2">
                            <div className="font-medium">{lead.date}</div>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{lead.time}</span>
                          </td>
                          {/* UTM */}
                          <td className="py-3.5 px-2">
                            <span className="bg-slate-100 dark:bg-neutral-850 text-gray-600 dark:text-gray-300 font-bold px-2 py-0.5 rounded text-[10px] inline-block shadow-2xs">
                              {lead.source}
                            </span>
                            <span className="font-mono text-[9px] text-gray-400 block mt-1 line-clamp-1" title={lead.utm}>{lead.utm}</span>
                          </td>
                          {/* Products */}
                          <td className="py-3.5 px-2 max-w-[180px]">
                            <div className="space-y-0.5">
                              {lead.products.map((p: string, idx: number) => (
                                <div key={idx} className="font-semibold text-gray-700 dark:text-gray-300 text-[10px] line-clamp-1 flex items-center gap-1">
                                  <CornerDownRight className="h-3 w-3 shrink-0 text-brown-medium" /> {p}
                                </div>
                              ))}
                            </div>
                          </td>
                          {/* Total */}
                          <td className="py-3.5 px-2 text-right">
                            <span className="font-black text-brown-medium dark:text-primary text-sm">R$ {lead.total.toFixed(2)}</span>
                            <span className="text-[9px] text-gray-400 block mt-0.5">Pix: R$ {(lead.total * 0.9).toFixed(2)}</span>
                          </td>
                          {/* Seller */}
                          <td className="py-3.5 px-2">
                            {(() => {
                              const seller = sellers.find(s => s.id === lead.sellerId);
                              return (
                                <span className="inline-flex items-center gap-1.5 bg-brown-medium/10 dark:bg-primary/10 text-brown-dark dark:text-primary font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-brown-medium/20 dark:border-primary/20 shadow-2xs">
                                  <span>{seller?.avatar || "👤"}</span>
                                  <span>{seller?.name.split(" ")[0] || lead.sellerId}</span>
                                </span>
                              );
                            })()}
                          </td>

                          {/* Status select dropdown */}
                          <td className="py-3.5 px-2">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`font-black text-[10px] rounded px-2 py-1 focus:outline-none shadow-xs border cursor-pointer ${
                                lead.status === "Venda Fechada" ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/20 dark:text-emerald-400" :
                                lead.status === "Venda Perdida" ? "bg-red-150 text-red-800 border-red-300 dark:bg-red-950/20 dark:text-red-400" :
                                lead.status === "Novo Lead" ? "bg-blue-100 text-blue-800 border-blue-300" :
                                "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/20 dark:text-yellow-400"
                              }`}
                            >
                              <option value="Novo Lead">Novo Lead</option>
                              <option value="Em Atendimento">Em Atendimento</option>
                              <option value="Orçamento Enviado">Orçamento Enviado</option>
                              <option value="Negociação">Negociação</option>
                              <option value="Aguardando Cliente">Aguardando Cliente</option>
                              <option value="Venda Fechada">Venda Fechada</option>
                              <option value="Venda Perdida">Venda Perdida</option>
                            </select>
                          </td>
                          {/* Action view/notes details */}
                          <td className="py-3.5 px-2 text-center">
                            <button
                              onClick={() => { setSelectedLead(lead); trackClick("admin-view-lead-details"); }}
                              className="bg-brown-medium hover:bg-brown-dark text-white p-1 rounded transition"
                              title="Visualizar Anotações & Metadados"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Selected Lead details panel modal */}
                {selectedLead && (
                  <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-250 dark:border-dark-border rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark-border pb-2">
                      <h5 className="font-bold text-xs text-brown-medium dark:text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <Info className="h-4 w-4" /> Histórico & Metadados Avançados: {selectedLead.name}
                      </h5>
                      <button 
                        onClick={() => setSelectedLead(null)} 
                        className="text-gray-400 hover:text-gray-650 transition"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">Dispositivo Rastreante</span>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1 mt-0.5">
                          {selectedLead.device.includes("Mobile") ? <Smartphone className="h-3.5 w-3.5" /> : <Tv className="h-3.5 w-3.5" />}
                          {selectedLead.device}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">Origem do Lead</span>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5">{selectedLead.source}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">Sessão / IP aproximado</span>
                        <p className="font-mono text-[10px] text-gray-600 dark:text-gray-400 mt-0.5">186.220.12.80 (Campinas/SP)</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">UTM Analítica</span>
                        <p className="font-mono text-[9px] text-purple-650 dark:text-purple-400 mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{selectedLead.utm}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <label className="text-[10px] text-gray-400 uppercase font-black tracking-wider block mb-1">Anotações do Vendedor</label>
                      <textarea
                        value={selectedLead.notes}
                        onChange={(e) => {
                          const updatedNotes = e.target.value;
                          const updated = leads.map(l => l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l);
                          updateLeads(updated);
                          setSelectedLead({ ...selectedLead, notes: updatedNotes });
                        }}
                        placeholder="Adicione observações para este lead comercial..."
                        className="w-full text-xs bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-2.5 min-h-[70px] focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Heatmap Tab view */}
            {adminTab === "heatmap" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-6 transition-colors">
                <div>
                  <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase">MAPA DE INTERAÇÃO & CALOR DE CLIQUES (HEATMAP)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Visualização interativa das zonas e elementos da Home que mais geraram cliques de leads</p>
                </div>

                {/* Heatmap grid */}
                <div className="border border-gray-200 dark:border-dark-border rounded-xl p-4 bg-slate-50 dark:bg-neutral-900 relative overflow-hidden flex flex-col gap-6">
                  <div className="absolute top-2 right-2 bg-red-600 text-white font-black text-[9px] px-2.5 py-0.5 rounded tracking-widest uppercase animate-pulse">🔥 Mapeamento Ativo</div>
                  
                  {/* Header mock */}
                  <div className="bg-brown-dark text-white p-3 rounded-lg flex items-center justify-between border-2 border-dashed border-red-500 relative">
                    <span className="font-black text-xs">Cabeçalho Só Madeiras (Busca + WhatsApp Fixo)</span>
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      WhatsApp Fixo: {clicksHeatmap["btn-whatsapp-fixed"] || 0} Clicks
                    </span>
                  </div>

                  {/* Banner mock */}
                  <div className="wood-gradient h-36 rounded-lg flex flex-col justify-center px-6 relative border-2 border-dashed border-red-500">
                    <span className="font-black text-sm text-white">Banner Slider Principal</span>
                    <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      CTA Banner Principal: {clicksHeatmap["hero-btn-budget"] || 0} Clicks
                    </div>
                  </div>

                  {/* Categories Row */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-white dark:bg-dark-surface border-2 border-dashed border-red-500 p-3 rounded-lg text-center relative">
                      <span className="text-xl">🪵</span>
                      <h6 className="font-bold text-[10px] mt-1">Madeiras</h6>
                      <span className="absolute -top-2.5 -right-1 bg-red-600 text-white text-[9px] font-black px-1.5 rounded-full">
                        {clicksHeatmap["category-madeiras"] || 0}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-dark-surface border-2 border-dashed border-gray-300 p-3 rounded-lg text-center relative">
                      <span className="text-xl">🔨</span>
                      <h6 className="font-bold text-[10px] mt-1">Ferramentas</h6>
                      <span className="absolute -top-2.5 -right-1 bg-red-600 text-white text-[9px] font-black px-1.5 rounded-full">
                        {clicksHeatmap["category-ferramentas"] || 0}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3 rounded-lg text-center relative opacity-60">
                      <span className="text-xl">⚡</span>
                      <h6 className="font-bold text-[10px] mt-1">Elétrico</h6>
                      <span className="absolute -top-2.5 -right-1 bg-gray-600 text-white text-[9px] font-black px-1.5 rounded-full">12</span>
                    </div>
                    <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-3 rounded-lg text-center relative opacity-60">
                      <span className="text-xl">🚰</span>
                      <h6 className="font-bold text-[10px] mt-1">Hidráulico</h6>
                      <span className="absolute -top-2.5 -right-1 bg-gray-600 text-white text-[9px] font-black px-1.5 rounded-full">8</span>
                    </div>
                  </div>

                  {/* Hot product */}
                  <div className="bg-white dark:bg-dark-surface p-4 rounded-xl border-2 border-dashed border-red-500 relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🪵</span>
                      <div>
                        <h6 className="font-bold text-xs">Viga de Cambará Aparelhada 3m</h6>
                        <span className="text-[10px] text-gray-400">Produto Líder de Visualizações</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow">
                        Acessos Card: {clicksHeatmap["product-viga-cambara"] || 0} views
                      </span>
                      <span className="bg-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow">
                        Botão Add Orçamento: {clicksHeatmap["btn-add-budget-viga"] || 0} clicks
                      </span>
                    </div>
                  </div>

                  {/* Floating WhatsApp Bubble */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-500 rounded-xl p-4 flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">🟢 Widget de Suporte WhatsApp Flutuante</span>
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded shadow">
                      {clicksHeatmap["btn-whatsapp-floating"] || 0} Leads Disparados
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* Cart Recovery Tab */}
            {adminTab === "recovery" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-6 transition-colors">
                <div>
                  <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase">SISTEMA DE RECUPERAÇÃO DE CARRINHOS</h4>
                  <p className="text-xs text-gray-550 dark:text-gray-400 mt-0.5">Leads que iniciaram a cotação no site mas não concluíram no WhatsApp. Recupere com mensagens customizadas.</p>
                </div>

                <div className="space-y-4">
                  {leads.filter(l => l.status === "Novo Lead" || l.status === "Em Atendimento" || l.status === "Carrinho Abandonado").map((lead, i) => (
                    <div 
                      key={i} 
                      className={`bg-slate-50 dark:bg-neutral-900 border ${lead.status === "Carrinho Abandonado" ? "border-red-300/60 dark:border-red-900/40" : "border-gray-200 dark:border-dark-border"} rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:border-primary`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-brown-dark dark:text-white">{lead.name}</h5>
                          {lead.status === "Carrinho Abandonado" ? (
                            <span className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-200 dark:border-red-900/50 font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
                              🔴 Carrinho Abandonado
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-brown-dark font-black text-[9px] px-2 py-0.5 rounded uppercase dark:text-white">Carrinho Salvo</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-550 dark:text-gray-400">
                          Produtos: <strong className="text-brown-medium dark:text-primary">{lead.products.join(", ")}</strong>
                        </p>
                        <div className="text-[10px] text-gray-400 flex items-center gap-3">
                          <span>📅 Rastreamento: {lead.date} às {lead.time}</span>
                          <span>📱 {lead.device}</span>
                          <span className="bg-slate-105 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-slate-500 font-mono text-[9px]">{lead.source}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="text-right">
                          <span className="font-black text-brown-medium dark:text-primary text-base block">R$ {lead.total.toFixed(2)}</span>
                          <span className="text-[9px] text-gray-400 block mt-0.5">Pix: R$ {(lead.total * 0.9).toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => {
                            trackClick(`btn-recover-cart-${lead.id}`);
                            const cleanPhone = lead.phone.replace(/\D/g, "");
                            const formattedPhone = cleanPhone.startsWith("55") ? cleanPhone : `55${cleanPhone}`;
                            let recMessage = "";
                            if (lead.status === "Carrinho Abandonado") {
                              recMessage = `Olá *${lead.name}*! Sou da equipe de atendimento da Só Madeiras de Estância.\n\nPercebi que você estava fazendo uma simulação no nosso site dos itens:\n- ${lead.products.join("\n- ")}\n\ne acabou não finalizando o envio do orçamento.\n\nConsigo garantir para você um *desconto Pix de 10%* ou negociar um frete promocional no lote! Deseja que eu feche a proposta oficial em PDF para você agora?`;
                            } else {
                              recMessage = `Olá *${lead.name}*! Sou o suporte da Só Madeiras.\n\nNotei que você deixou selecionado no site os seguintes itens:\n- ${lead.products.join("\n- ")}\n\nConsigo garantir o *desconto Pix de 10%* e fechar um orçamento formal em PDF com frete reduzido! Deseja que eu gere o PDF agora?`;
                            }
                            window.open(`https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(recMessage)}`, "_blank");
                            if (lead.status === "Carrinho Abandonado") {
                              handleUpdateLeadStatus(lead.id, "Em Atendimento");
                            }
                          }}
                          className={`text-white font-black text-xs px-4 py-2.5 rounded-lg shadow-md transition active:scale-95 flex items-center gap-1.5 w-full md:w-auto justify-center cursor-pointer ${lead.status === "Carrinho Abandonado" ? "bg-red-600 hover:bg-red-500" : "bg-emerald-600 hover:bg-emerald-500"}`}
                        >
                          <Phone className="h-4 w-4" /> {lead.status === "Carrinho Abandonado" ? "Recuperar Carrinho" : "Recuperar Manual"}
                        </button>
                      </div>
                    </div>
                  ))}
                  {leads.filter(l => l.status === "Novo Lead" || l.status === "Em Atendimento" || l.status === "Carrinho Abandonado").length === 0 && (
                    <div className="text-center p-8 border border-gray-150 rounded-xl text-gray-500">
                      Nenhum carrinho pendente de recuperação. Todas as cotações foram ganhas ou perdidas!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CRUD Products Tab view */}
            {adminTab === "crud-products" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-6 transition-colors">
                <div className="flex justify-between items-center border-b border-gray-150 dark:border-dark-border pb-4">
                  <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase">GERENCIADOR DO CATÁLOGO DE PRODUTOS</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBulkModalOpen(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-md transition cursor-pointer border-none flex items-center gap-1"
                    >
                      🚀 Adicionar em Lote
                    </button>
                    <button
                      onClick={() => { setCrudEditProduct(null); (document.getElementById("crud-product-form") as HTMLFormElement)?.reset(); }}
                      className="bg-primary text-brown-dark text-xs font-black px-4 py-2 rounded-full hover:bg-primary-hover shadow-md transition"
                    >
                      Adicionar Novo Produto
                    </button>
                  </div>
                </div>

                {/* Form layout */}
                <form id="crud-product-form" key={crudEditProduct ? crudEditProduct.id : "new"} onSubmit={handleSaveProduct} className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-5 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs transition-colors">
                  <div className="col-span-1 md:col-span-2 space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Nome do Produto</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={crudEditProduct?.name || ""}
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        if (val.length > 2) {
                          handleSearchGoogleImages(val, true);
                        }
                      }}
                      placeholder="Ex: Prancha de Garapeira Aparelhada 3m"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Categoria</label>
                    <select
                      name="category"
                      defaultValue={crudEditProduct?.category || "madeiras"}
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Marca</label>
                    <input
                      type="text"
                      name="brand"
                      required
                      defaultValue={crudEditProduct?.brand || "Só Madeiras"}
                      placeholder="Ex: Tramontina, Tigre, etc"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Preço Tabela (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      required
                      defaultValue={crudEditProduct?.price || ""}
                      placeholder="Ex: 145.00"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Preço Pix (À Vista)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="pricePix"
                      defaultValue={crudEditProduct?.pricePix || ""}
                      placeholder="Deixe em branco p/ 10%"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Estoque (Qtd)</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      defaultValue={crudEditProduct?.stock || ""}
                      placeholder="Ex: 50"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Vendidos (Prova Social)</label>
                    <input
                      type="number"
                      name="soldCount"
                      defaultValue={crudEditProduct?.soldCount || 0}
                      placeholder="Ex: 120"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Ícone Emoji / Imagem</label>
                      <button
                        type="button"
                        onClick={handleSearchGoogleImages}
                        className="text-[9px] bg-primary hover:bg-primary-hover text-brown-dark font-black px-2 py-0.5 rounded shadow-sm transition uppercase tracking-wider border-none"
                      >
                        🔍 Buscar no Google
                      </button>
                    </div>
                    <input
                      type="text"
                      name="img"
                      defaultValue={crudEditProduct?.img || "🪵"}
                      placeholder="Emoji ou URL: 🪵, 🔨, 🎨"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Vídeo do Produto (Shopee MP4/WEBM)</label>
                    <input
                      type="text"
                      name="videoUrl"
                      defaultValue={crudEditProduct?.videoUrl || ""}
                      placeholder="URL do Vídeo MP4/WEBM (opcional)"
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Reprodução do Vídeo</label>
                    <select
                      name="videoPlayMode"
                      defaultValue={crudEditProduct?.videoPlayMode || "5s"}
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="5s">▶ Autoplay 5 Segundos (Vitrine)</option>
                      <option value="click">🖱️ Reproduzir ao Clicar</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-1">
                    <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase">Descrição Técnica (SEO & Vendas)</label>
                    <textarea
                      name="desc"
                      required
                      defaultValue={crudEditProduct?.desc || ""}
                      placeholder="Detalhes técnicos, medidas e indicações de aplicação..."
                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2.5 text-xs min-h-[50px] focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>


                  {/* Google Image Search Results Grid */}
                  {(isSearchingImages || googleImageResults.length > 0) && (
                    <div className="col-span-1 md:col-span-4 bg-white dark:bg-[#1E1E1E] border border-primary p-4 rounded-xl space-y-3 shadow-md">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-brown-dark dark:text-primary uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                          ✨ Fotos PNG Encontradas no Google:
                        </h5>
                        <button 
                          type="button" 
                          onClick={() => setGoogleImageResults([])} 
                          className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold"
                        >
                          Fechar [X]
                        </button>
                      </div>
                      
                      {isSearchingImages && (
                        <div className="text-center py-4 text-stone-500 font-medium animate-pulse">
                          <span>⏳ Buscando fotos transparentes no Google...</span>
                        </div>
                      )}
                      
                      {googleImageResults.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {googleImageResults.map((url, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                const imgInput = document.getElementsByName("img")[0] as HTMLInputElement;
                                if (imgInput) {
                                  imgInput.value = url;
                                }
                                setGoogleImageResults([]);
                                addSystemNotification("Imagem do Google selecionada com sucesso!");
                              }}
                              className="border border-stone-200 dark:border-neutral-800 rounded-lg p-2 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-[#F4B400]/10 hover:border-primary transition cursor-pointer group h-16 relative overflow-hidden"
                            >
                              <img 
                                src={url} 
                                alt="Google Image Result" 
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                              />
                              <div className="absolute inset-0 bg-[#3E2723]/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[9px] text-white font-bold uppercase">
                                Usar
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="col-span-1 md:col-span-4 flex justify-end gap-2 pt-3 border-t border-gray-200/50">
                    <button
                      type="button"
                      onClick={() => { setCrudEditProduct(null); (document.getElementById("crud-product-form") as HTMLFormElement)?.reset(); }}
                      className="bg-gray-200 dark:bg-neutral-800 text-brown-dark dark:text-white px-4 py-2 rounded font-bold"
                    >
                      Limpar
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-brown-dark px-6 py-2 rounded font-black hover:bg-primary-hover shadow"
                    >
                      {crudEditProduct ? "Atualizar Catálogo" : "Cadastrar no Site"}
                    </button>
                  </div>
                </form>

                {/* Listing catalog table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-border text-gray-400 font-bold uppercase text-[9px]">
                        <th className="py-2.5 px-2">Foto / ID</th>
                        <th className="py-2.5 px-2">Nome / Marca</th>
                        <th className="py-2.5 px-2">Categoria</th>
                        <th className="py-2.5 px-2">Estoque</th>
                        <th className="py-2.5 px-2 text-right">Preço Pix</th>
                        <th className="py-2.5 px-2 text-right">Preço Tabela</th>
                        <th className="py-2.5 px-2 text-center">Ações de Catálogo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-neutral-850/40 transition">
                          <td className="py-3 px-2">
                            {p.img && (p.img.startsWith("/") || p.img.startsWith("http") || p.img.includes(".") || p.img.includes("data:image")) ? (
                              <div className="w-10 h-10 bg-white dark:bg-neutral-800 rounded border border-gray-100 dark:border-neutral-700 p-0.5 flex items-center justify-center">
                                <img src={p.img} alt={p.name} className="max-w-full max-h-full object-contain" />
                              </div>
                            ) : (
                              <span className="text-3xl filter drop-shadow">{p.img}</span>
                            )}
                            <span className="text-[9px] text-gray-400 block font-mono mt-0.5">#{p.id.toString().slice(-5)}</span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="font-bold text-brown-dark dark:text-white">{p.name}</div>
                            <span className="text-[10px] text-gray-450 uppercase block mt-0.5">{p.brand}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="bg-slate-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-bold px-2.5 py-0.5 rounded text-[10px]">
                              {categories.find(c => c.id === p.category)?.name || p.category}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`font-black ${p.stock <= 15 ? "text-red-600 animate-pulse" : "text-gray-700 dark:text-gray-350"}`}>{p.stock} un</span>
                          </td>
                          <td className="py-3 px-2 text-right font-black text-brown-medium dark:text-primary">
                            R$ {(p.pricePix || p.price * 0.9).toFixed(2)}
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-gray-500">
                            R$ {p.price.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 text-center space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => { setCrudEditProduct(p); trackClick("crud-select-edit"); }}
className="bg-brown-medium hover:bg-brown-dark text-white px-2.5 py-1 rounded shadow-xs"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(p)}
                              className="bg-amber-100 hover:bg-amber-250 text-brown-dark px-2.5 py-1 rounded shadow-xs font-semibold dark:text-white"
                            >
                              Duplicar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded shadow-xs font-semibold"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Modal de Importação em Lote */}
            {isBulkModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col justify-between shadow-2xl relative overflow-hidden transition-colors">
                  
                  {/* Header */}
                  <div className="bg-[#3E2723] text-white py-4 px-6 flex justify-between items-center border-b border-[#F4B400]/20 shrink-0">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#F4B400] animate-pulse" />
                      <h4 className="font-display font-black text-sm uppercase tracking-wide">🚀 Importar Insumos e Produtos em Lote</h4>
                    </div>
                    <button
                      onClick={() => { setIsBulkModalOpen(false); setBulkProcessedProducts([]); }}
                      className="text-stone-300 hover:text-white p-1 rounded-lg bg-transparent border-none cursor-pointer text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>

                  {/* Body Wrapper */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-brown-dark dark:text-gray-150">
                    
                    {bulkProcessedProducts.length === 0 ? (
                      /* Input Stage */
                      <div className="space-y-5">
                        
                        {/* Tab buttons */}
                        <div className="flex border-b border-gray-200 dark:border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setBulkInputTab("text")}
                            className={`px-4 py-2 font-black uppercase text-xs border-b-2 transition ${
                              bulkInputTab === "text"
                                ? "border-[#3E2723] text-[#3E2723] dark:border-[#F4B400] dark:text-[#F4B400]"
                                : "border-transparent text-gray-400"
                            }`}
                          >
                            📝 Copiar e Colar Lista de Texto
                          </button>
                          <button
                            type="button"
                            onClick={() => setBulkInputTab("grid")}
                            className={`px-4 py-2 font-black uppercase text-xs border-b-2 transition ${
                              bulkInputTab === "grid"
                                ? "border-[#3E2723] text-[#3E2723] dark:border-[#F4B400] dark:text-[#F4B400]"
                                : "border-transparent text-gray-400"
                            }`}
                          >
                            📊 Planilha Rápida (Teclado Tab)
                          </button>
                        </div>

                        {bulkInputTab === "text" ? (
                          /* Text Input Tab */
                          <div className="space-y-3">
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl leading-relaxed text-[10px]">
                              💡 **Como preencher:** Cole a lista de itens, um por linha. O sistema irá extrair o nome e os preços (Tabela e Pix) automaticamente.
                              <br />
                              **Formatos aceitos:**
                              <br />
                              - `Nome do Produto - Preço Tabela por Preço Pix` (Ex: `cimento poty 50 kg - 56,00 por 46,90`)
                              <br />
                              - `Nome do Produto - Preço Único` (Ex: `telha fibrocimento - 29,90`)
                            </div>
                            
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 uppercase">Cole a Lista Comercial:</label>
                              <textarea
                                rows={8}
                                placeholder="cimento poty 50 kg - 56,00 por 46,90&#10;telha fibrocimento 2,44 x 0,50 - 29,90 por 28,00"
                                value={bulkText}
                                onChange={(e) => setBulkText(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-slate-800 dark:text-white"
                              />
                            </div>
                          </div>
                        ) : (
                          /* Spreadsheet Input Tab */
                          <div className="space-y-3">
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl leading-relaxed text-[10px]">
                              ⌨️ **Teclado Inteligente:** Digite os dados da linha. Pressione **Tab** para avançar entre colunas. Na última célula da linha, pressionar **Tab** criará uma nova linha vazia automaticamente.
                            </div>
                            
                            <div className="border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 dark:bg-neutral-800 text-gray-500 font-bold uppercase text-[9px] border-b border-gray-200 dark:border-neutral-800">
                                    <th className="py-2 px-3">#</th>
                                    <th className="py-2 px-3 w-1/2">Descrição / Nome do Produto</th>
                                    <th className="py-2 px-3">Preço Antigo (Tabela)</th>
                                    <th className="py-2 px-3">Preço Novo (Pix)</th>
                                    <th className="py-2 px-3 text-center">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-150 dark:divide-neutral-800">
                                  {bulkGridRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/20">
                                      <td className="py-2 px-3 font-mono font-bold text-gray-400">{idx + 1}</td>
                                      <td className="py-2 px-3">
                                        <input
                                          type="text"
                                          id={`grid-input-name-${idx}`}
                                          placeholder="Ex: cimento poty 50 kg"
                                          value={row.name}
                                          onChange={(e) => {
                                            const updated = [...bulkGridRows];
                                            updated[idx].name = e.target.value;
                                            setBulkGridRows(updated);
                                          }}
                                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary font-bold"
                                        />
                                      </td>
                                      <td className="py-2 px-3">
                                        <input
                                          type="text"
                                          placeholder="Ex: 56,00"
                                          value={row.price}
                                          onChange={(e) => {
                                            const updated = [...bulkGridRows];
                                            updated[idx].price = e.target.value;
                                            setBulkGridRows(updated);
                                          }}
                                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                      </td>
                                      <td className="py-2 px-3">
                                        <input
                                          type="text"
                                          placeholder="Ex: 46,90"
                                          value={row.pricePix}
                                          onKeyDown={(e) => handleGridCellKeyDown(e, idx, "pricePix")}
                                          onChange={(e) => {
                                            const updated = [...bulkGridRows];
                                            updated[idx].pricePix = e.target.value;
                                            setBulkGridRows(updated);
                                          }}
                                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                      </td>
                                      <td className="py-2 px-3 text-center">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (bulkGridRows.length === 1) {
                                              setBulkGridRows([{ name: "", price: "", pricePix: "" }]);
                                            } else {
                                              setBulkGridRows(bulkGridRows.filter((_, i) => i !== idx));
                                            }
                                          }}
                                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer bg-transparent border-none"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => setBulkGridRows([...bulkGridRows, { name: "", price: "", pricePix: "" }])}
                              className="bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 dark:hover:bg-neutral-750 text-brown-dark dark:text-white font-bold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer border-none"
                            >
                              + Adicionar Nova Linha
                            </button>
                          </div>
                        )}

                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-neutral-800/80">
                          <button
                            type="button"
                            onClick={() => { setIsBulkModalOpen(false); setBulkProcessedProducts([]); }}
                            className="bg-gray-150 dark:bg-neutral-855 hover:bg-gray-255 dark:hover:bg-neutral-800 text-brown-dark dark:text-white px-5 py-2.5 rounded-xl font-bold border-none cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={handleProcessBulkImport}
                            className="bg-primary text-brown-dark font-black px-6 py-2.5 rounded-xl hover:bg-primary-hover shadow-md transition border-none cursor-pointer"
                          >
                            Processar e Buscar Imagens 🔎
                          </button>
                        </div>
                      </div>
                    ) : isBulkProcessing ? (
                      /* Processing Loader Stage */
                      <div className="text-center py-20 space-y-4">
                        <div className="w-10 h-10 border-4 border-[#F4B400] border-t-transparent rounded-full animate-spin mx-auto" />
                        <h5 className="font-display font-black text-sm uppercase">Buscando Imagens e Descrições...</h5>
                        <p className="text-[10px] text-gray-450 max-w-sm mx-auto">Conectando ao Bing/Google para extrair as fotos transparentes mais adequadas para o catálogo do site de forma automática.</p>
                      </div>
                    ) : (
                      /* Confirmation Preview Grid Table */
                      <div className="space-y-6">
                        <div className="flex justify-between items-center bg-[#F4B400]/10 border border-[#F4B400]/30 p-3.5 rounded-2xl">
                          <div>
                            <span className="font-black text-[10px] text-[#3E2723] dark:text-[#F4B400] uppercase tracking-widest block">Pré-visualização da Importação</span>
                            <span className="text-[10px] text-slate-500 font-bold block mt-0.5">Encontramos imagens para os produtos. Altere o que precisar antes de finalizar.</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setBulkProcessedProducts([])}
                            className="text-brown-medium hover:text-[#3E2723] dark:hover:text-[#F4B400] font-black text-[10px] uppercase cursor-pointer bg-transparent border-none dark:text-amber-400"
                          >
                            ← Reiniciar Lista
                          </button>
                        </div>

                        {/* alternate images floating selector box overlay */}
                        {activeImageSelectorProductIndex !== null && bulkProcessedProducts[activeImageSelectorProductIndex] && (
                          <div className="bg-slate-50 dark:bg-neutral-850 border border-gray-200 dark:border-neutral-800 p-4 rounded-2xl shadow-xl space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-black text-[10px] text-[#3E2723] dark:text-[#F4B400] uppercase block">
                                Escolher Foto Alternativa no Google/Bing ({bulkProcessedProducts[activeImageSelectorProductIndex].name})
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveImageSelectorProductIndex(null)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
                              >
                                Fechar [x]
                              </button>
                            </div>
                            
                            {/* Images Carousel */}
                            <div className="grid grid-cols-5 md:grid-cols-8 gap-2 max-h-36 overflow-y-auto">
                              {bulkProcessedProducts[activeImageSelectorProductIndex].imagesList && bulkProcessedProducts[activeImageSelectorProductIndex].imagesList.length > 0 ? (
                                bulkProcessedProducts[activeImageSelectorProductIndex].imagesList.map((url: string, imgIdx: number) => (
                                  <div 
                                    key={imgIdx}
                                    onClick={() => {
                                      const updated = [...bulkProcessedProducts];
                                      updated[activeImageSelectorProductIndex].img = url;
                                      setBulkProcessedProducts(updated);
                                      setActiveImageSelectorProductIndex(null);
                                    }}
                                    className="w-12 h-12 bg-white dark:bg-neutral-800 border rounded p-0.5 flex items-center justify-center cursor-pointer hover:border-amber-500 hover:scale-105 transition"
                                  >
                                    <img src={url} alt="alt" className="max-w-full max-h-full object-contain" />
                                  </div>
                                ))
                              ) : (
                                <p className="text-[10px] text-gray-400 col-span-full">Nenhuma imagem alternativa encontrada.</p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* List preview items table */}
                        <div className="border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden max-h-80 overflow-y-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-neutral-800 text-gray-500 font-bold uppercase text-[9px] border-b border-gray-200 dark:border-neutral-800">
                                <th className="py-2.5 px-3">Imagem</th>
                                <th className="py-2.5 px-3">Nome / Descrição</th>
                                <th className="py-2.5 px-3">Categoria</th>
                                <th className="py-2.5 px-3 text-right">Preço Tabela</th>
                                <th className="py-2.5 px-3 text-right">Preço Pix</th>
                                <th className="py-2.5 px-3 text-center">Ações</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 dark:divide-neutral-800">
                              {bulkProcessedProducts.map((p, idx) => (
                                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/20">
                                  <td className="py-2 px-3">
                                    <div className="flex flex-col items-center gap-1">
                                      <div className="w-10 h-10 bg-white dark:bg-neutral-800 border rounded p-0.5 flex items-center justify-center">
                                        <img src={p.img} alt="preview" className="max-w-full max-h-full object-contain" />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => setActiveImageSelectorProductIndex(idx)}
                                        className="text-[#F4B400] hover:text-amber-600 text-[8px] font-black uppercase tracking-wider bg-transparent border-none cursor-pointer"
                                      >
                                        Alterar Foto
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-2 px-3">
                                    <input
                                      type="text"
                                      value={p.name}
                                      onChange={(e) => {
                                        const updated = [...bulkProcessedProducts];
                                        updated[idx].name = e.target.value;
                                        setBulkProcessedProducts(updated);
                                      }}
                                      className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary font-bold"
                                    />
                                    <span className="text-[8px] text-gray-400 block font-mono mt-0.5">Automático: Google Images</span>
                                  </td>
                                  <td className="py-2 px-3">
                                    <select
                                      value={p.category}
                                      onChange={(e) => {
                                        const updated = [...bulkProcessedProducts];
                                        updated[idx].category = e.target.value;
                                        setBulkProcessedProducts(updated);
                                      }}
                                      className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                  </td>
                                  <td className="py-2 px-3">
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={p.price}
                                      onChange={(e) => {
                                        const updated = [...bulkProcessedProducts];
                                        updated[idx].price = parseFloat(e.target.value) || 0;
                                        setBulkProcessedProducts(updated);
                                      }}
                                      className="w-20 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-right font-semibold"
                                    />
                                  </td>
                                  <td className="py-2 px-3">
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={p.pricePix || ""}
                                      placeholder={p.price ? (p.price * 0.9).toFixed(2) : ""}
                                      onChange={(e) => {
                                        const updated = [...bulkProcessedProducts];
                                        updated[idx].pricePix = e.target.value ? parseFloat(e.target.value) : undefined;
                                        setBulkProcessedProducts(updated);
                                      }}
                                      className="w-20 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-right font-black text-amber-600"
                                    />
                                  </td>
                                  <td className="py-2 px-3 text-center">
                                    <button
                                      type="button"
                                      onClick={() => setBulkProcessedProducts(bulkProcessedProducts.filter((_, i) => i !== idx))}
                                      className="text-red-500 hover:text-red-750 p-1.5 rounded cursor-pointer bg-transparent border-none"
                                      title="Remover produto da importação"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-neutral-800/80">
                          <button
                            type="button"
                            onClick={() => { setBulkProcessedProducts([]); }}
                            className="bg-gray-150 dark:bg-neutral-850 hover:bg-gray-250 dark:hover:bg-neutral-800 text-brown-dark dark:text-white px-5 py-2.5 rounded-xl font-bold border-none cursor-pointer"
                          >
                            Voltar
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveBulkProducts}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl shadow-md transition border-none cursor-pointer flex items-center gap-1 uppercase tracking-wider"
                          >
                            <Check className="h-4 w-4" /> Importar {bulkProcessedProducts.length} Produtos no Catálogo
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            )}

            {/* Flash Deals Manager Tab */}
            {adminTab === "flash-deals" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-6 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-150 dark:border-dark-border pb-4 gap-4">
                  <div>
                    <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase flex items-center gap-1.5"><Flame className="h-5 w-5 text-orange-500" /> GERENCIADOR DE OFERTAS RELÂMPAGO</h4>
                    <p className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-1">Configure quais produtos aparecem no carrossel de ofertas flash, seus descontos e contagem manual de vendas.</p>
                  </div>
                  
                  {/* Form to add products to flash sales */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const prodId = parseInt((form.elements.namedItem("addProductId") as HTMLSelectElement).value);
                      const discount = parseFloat((form.elements.namedItem("addDiscount") as HTMLInputElement).value) / 100;
                      const badge = (form.elements.namedItem("addBadge") as HTMLInputElement).value || "Oficial";
                      const itemsSold = parseInt((form.elements.namedItem("addItemsSold") as HTMLInputElement).value) || 20;

                      if (flashDeals.some(d => d.id === prodId)) {
                        alert("Este produto já está em oferta relâmpago!");
                        return;
                      }

                      const newDeal = {
                        id: prodId,
                        discountPercent: discount,
                        label: `-${Math.round(discount * 100)}%`,
                        badge,
                        itemsSold,
                        progress: itemsSold
                      };

                      const updatedDeals = [...flashDeals, newDeal];
                      setFlashDeals(updatedDeals);
                      saveToLocal("somadeiras_flash_deals", updatedDeals);
                      addSystemNotification("Produto adicionado às Ofertas Relâmpago!");
                      form.reset();
                    }}
                    className="flex flex-wrap items-end gap-3 bg-slate-50 dark:bg-neutral-900 p-3 rounded-lg border border-gray-200 dark:border-dark-border text-xs"
                  >
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500 block">Produto</label>
                      <select name="addProductId" required className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none">
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1 w-20">
                      <label className="font-bold text-gray-500 block">Desconto %</label>
                      <input type="number" name="addDiscount" defaultValue={30} min={1} max={99} required className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                    </div>
                    <div className="space-y-1 w-24">
                      <label className="font-bold text-gray-500 block">Etiqueta</label>
                      <input type="text" name="addBadge" placeholder="Ex: Oficial" className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                    </div>
                    <div className="space-y-1 w-20">
                      <label className="font-bold text-gray-500 block">Qtd Vendida</label>
                      <input type="number" name="addItemsSold" defaultValue={25} className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                    </div>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded text-xs transition active:scale-95 border-none cursor-pointer">
                      Incluir Oferta
                    </button>
                  </form>
                </div>

                {/* Edit timer section */}
                <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs items-center">
                  <div className="md:col-span-2">
                    <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Cronômetro das Ofertas</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">Defina o tempo padrão que aparece no timer regressivo.</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <div className="text-center w-14">
                      <label className="text-[9px] font-bold text-gray-400 block uppercase">Horas</label>
                      <input 
                        type="number" 
                        value={flashTime.hours} 
                        onChange={(e) => setFlashTime({ ...flashTime, hours: parseInt(e.target.value) || 0 })}
                        className="w-full text-center bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs font-bold" 
                      />
                    </div>
                    <div className="text-center w-14">
                      <label className="text-[9px] font-bold text-gray-400 block uppercase">Minutos</label>
                      <input 
                        type="number" 
                        value={flashTime.minutes} 
                        onChange={(e) => setFlashTime({ ...flashTime, minutes: parseInt(e.target.value) || 0 })}
                        className="w-full text-center bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs font-bold" 
                      />
                    </div>
                    <div className="text-center w-14">
                      <label className="text-[9px] font-bold text-gray-400 block uppercase">Segundos</label>
                      <input 
                        type="number" 
                        value={flashTime.seconds} 
                        onChange={(e) => setFlashTime({ ...flashTime, seconds: parseInt(e.target.value) || 0 })}
                        className="w-full text-center bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-1.5 text-xs font-bold" 
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        showToast("⏱️ Cronômetro atualizado com sucesso!");
                      }}
                      className="bg-brown-medium hover:bg-brown-dark text-white font-bold px-4 py-2 rounded text-xs transition active:scale-95 border-none cursor-pointer"
                    >
                      Sincronizar Timer
                    </button>
                  </div>
                </div>

                {/* Active Flash Deals List */}
                <div className="space-y-4">
                  <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Flame className="h-4.5 w-4.5 text-orange-500 animate-pulse" /> Ofertas Relâmpago Ativas ({flashDeals.length})
                  </h5>
                  <div className="overflow-x-auto border border-gray-200 dark:border-dark-border rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-dark-border text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <tr>
                          <th className="p-3">Imagem</th>
                          <th className="p-3">Produto</th>
                          <th className="p-3">Desconto %</th>
                          <th className="p-3">Etiqueta</th>
                          <th className="p-3">Vendidos</th>
                          <th className="p-3">Progresso %</th>
                          <th className="p-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 dark:divide-dark-border">
                        {flashDeals.map((deal) => {
                          const p = products.find(prod => prod.id === deal.id) || INITIAL_PRODUCTS.find(prod => prod.id === deal.id);
                          return (
                            <tr key={deal.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/50">
                              <td className="p-3">
                                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded flex items-center justify-center text-lg select-none">
                                  🪵
                                </div>
                              </td>
                              <td className="p-3 font-bold text-stone-850 dark:text-stone-100">
                                {p ? p.name : `Produto ID #${deal.id}`}
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  min="1"
                                  max="99"
                                  value={Math.round(deal.discountPercent * 100)}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    const updated = flashDeals.map(d => d.id === deal.id ? { ...d, discountPercent: val / 100, label: `-${val}%` } : d);
                                    setFlashDeals(updated);
                                    saveToLocal("somadeiras_flash_deals", updated);
                                  }}
                                  className="w-16 bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-1.5 py-1 text-center font-bold"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={deal.badge}
                                  onChange={(e) => {
                                    const updated = flashDeals.map(d => d.id === deal.id ? { ...d, badge: e.target.value } : d);
                                    setFlashDeals(updated);
                                    saveToLocal("somadeiras_flash_deals", updated);
                                  }}
                                  className="w-24 bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-1.5 py-1 text-left"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  value={deal.itemsSold}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    const updated = flashDeals.map(d => d.id === deal.id ? { ...d, itemsSold: val, progress: Math.min(100, val) } : d);
                                    setFlashDeals(updated);
                                    saveToLocal("somadeiras_flash_deals", updated);
                                  }}
                                  className="w-16 bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-1.5 py-1 text-center"
                                />
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold w-8">{deal.progress}%</span>
                                  <div className="w-16 bg-gray-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: `${deal.progress}%` }} />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = flashDeals.filter(d => d.id !== deal.id);
                                    setFlashDeals(updated);
                                    saveToLocal("somadeiras_flash_deals", updated);
                                    showToast("🗑️ Oferta removida!");
                                  }}
                                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-2 py-1.5 rounded transition active:scale-95 text-[10px] border-none cursor-pointer"
                                >
                                  Excluir
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {flashDeals.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-500">
                              Nenhuma oferta cadastrada. Selecione um produto acima para incluir.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Global Settings Tab */}
            {adminTab === "settings" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-6 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-150 dark:border-dark-border pb-4 gap-4">
                  <div>
                    <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase flex items-center gap-1.5">
                      <Settings className="h-5 w-5 text-yellow-500" /> CONFIGURAÇÕES GERAIS DO SITE
                    </h4>
                    <p className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-1">
                      Gerencie as informações institucionais, avisos flutuantes, telefones de contato, redes sociais e textos de SEO.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      saveToLocal("somadeiras_settings", settings);
                      showToast("💾 Configurações salvas e aplicadas em todo o site!");
                      window.dispatchEvent(new Event("somadeiras_reload_settings"));
                    }}
                    className="bg-primary hover:bg-primary-hover text-brown-dark font-black px-6 py-2.5 rounded-full shadow-md transition active:scale-95 border-none cursor-pointer text-xs"
                  >
                    Salvar Alterações
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Left Column: Top Warning and Contacts */}
                  <div className="space-y-6">
                    {/* Cabeçalho & Avisos */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Topo & Avisos</h5>
                      
                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Mensagem da Barra de Anúncios</label>
                        <input
                          type="text"
                          value={settings.headerAnnouncement || ""}
                          onChange={(e) => setSettings({ ...settings, headerAnnouncement: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Contatos Rápidos */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Informações de Contato</h5>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Número WhatsApp (Ex: 5579996298990)</label>
                          <input
                            type="text"
                            value={settings.whatsappNumber || ""}
                            onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Telefone Comercial (Formatado)</label>
                          <input
                            type="text"
                            value={settings.phone || ""}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Texto Padrão WhatsApp (Orçamentos)</label>
                        <input
                          type="text"
                          value={settings.whatsappText || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappText: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Horário de Funcionamento</label>
                        <input
                          type="text"
                          value={settings.workHours || ""}
                          onChange={(e) => setSettings({ ...settings, workHours: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Links de Redes Sociais */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Redes Sociais</h5>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Link Instagram</label>
                          <input
                            type="text"
                            value={settings.instagramUrl || ""}
                            onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Link Facebook</label>
                          <input
                            type="text"
                            value={settings.facebookUrl || ""}
                            onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Link YouTube</label>
                          <input
                            type="text"
                            value={settings.youtubeUrl || ""}
                            onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Institutions & Map URLs */}
                  <div className="space-y-6">
                    {/* Dados Institucionais */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Sobre a Empresa (Rodapé & Seção)</h5>
                      
                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Texto Descritivo "Sobre a Só Madeiras"</label>
                        <textarea
                          value={settings.aboutText || ""}
                          rows={4}
                          onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-y"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Endereço Completo</label>
                        <input
                          type="text"
                          value={settings.address || ""}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Regiões Atendidas</label>
                        <textarea
                          value={settings.regionsText || ""}
                          rows={2}
                          onChange={(e) => setSettings({ ...settings, regionsText: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-y"
                        />
                      </div>
                    </div>

                    {/* Mapas e Fachada */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Google Maps & Fachada</h5>
                      
                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">URL de Incorporação do Google Maps (iframe src)</label>
                        <input
                          type="text"
                          value={settings.mapsEmbedUrl || ""}
                          onChange={(e) => setSettings({ ...settings, mapsEmbedUrl: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">URL de Pesquisa no Google Maps (botão rotas)</label>
                        <input
                          type="text"
                          value={settings.mapsSearchUrl || ""}
                          onChange={(e) => setSettings({ ...settings, mapsSearchUrl: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">URL da Imagem da Fachada (Showroom)</label>
                        <input
                          type="text"
                          value={settings.showroomImage || ""}
                          onChange={(e) => setSettings({ ...settings, showroomImage: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Integrações de Marketing & Webhooks */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border p-4 rounded-xl space-y-4">
                      <h5 className="font-bold text-brown-dark dark:text-white uppercase tracking-wider text-xs">Marketing & Integrações</h5>
                      
                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">WhatsApp Geral Fallback (Ex: 79996298990)</label>
                        <input
                          type="text"
                          value={settings.whatsappPhone || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Facebook Pixel ID</label>
                          <input
                            type="text"
                            value={settings.fbPixelId || ""}
                            onChange={(e) => setSettings({ ...settings, fbPixelId: e.target.value })}
                            placeholder="Ex: 1234567890"
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 block">Google GTM ID</label>
                          <input
                            type="text"
                            value={settings.gtmId || ""}
                            onChange={(e) => setSettings({ ...settings, gtmId: e.target.value })}
                            placeholder="Ex: GTM-XXXXXX"
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500 block">Webhook URL (Notificações Make/n8n)</label>
                        <input
                          type="text"
                          value={settings.webhookUrl || ""}
                          onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                          placeholder="https://hook.us1.make.com/..."
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex justify-end pt-4 border-t border-gray-150 dark:border-dark-border">
                  <button
                    type="button"
                    onClick={() => {
                      saveToLocal("somadeiras_settings", settings);
                      showToast("💾 Configurações salvas e aplicadas em todo o site!");
                      window.dispatchEvent(new Event("somadeiras_reload_settings"));
                    }}
                    className="bg-primary hover:bg-primary-hover text-brown-dark font-black px-8 py-3 rounded-full shadow-md transition active:scale-95 text-xs border-none cursor-pointer"
                  >
                    Salvar Todas as Configurações
                  </button>
                </div>
              </div>
            )}

            {/* Visual Banner Carousel Builder Tab */}
            {adminTab === "banner-builder" && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-5 rounded-xl shadow-sm transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <span className="text-primary text-xl">✨</span> CRIADOR VISUAL DE BANNERS (CARROSSEL PRINCIPAL)
                    </h4>
                    <p className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-1">Crie e customize slides do carrossel principal com opções avançadas de alinhamento, botões, animações e tipografias.</p>
                  </div>
                  <div className="flex gap-2 self-stretch md:self-auto justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const newSlide = {
                          id: `slide-custom-${Date.now()}`,
                          badgeText: "NOVA OFERTA EXCLUSIVA",
                          title: "NOVO BANNER\nPERSONALIZADO",
                          subtitle: "Edite este subtítulo a partir do painel de controle à esquerda.",
                          bgImage: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
                          alignX: "left",
                          alignY: "center",
                          textAlign: "left",
                          fontFamily: "font-display",
                          buttonText: "Saiba Mais",
                          buttonLink: "#carrinho",
                          buttonColor: "#F4B400",
                          buttonTextColor: "#3E2723",
                          buttonAnimation: "zoom",
                          hasStamp: false,
                          showBadge: true
                        };
                        const updated = [...bannerSlides, newSlide];
                        setBannerSlides(updated);
                        setEditingSlideIndex(updated.length - 1);
                        showToast("➕ Novo slide adicionado no rascunho!");
                      }}
                      className="bg-brown-medium hover:bg-brown-dark text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition whitespace-nowrap active:scale-95 border-none cursor-pointer"
                    >
                      Adicionar Novo Slide
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        saveToLocal("somadeiras_banner_slides", bannerSlides);
                        showToast("💾 Banners salvos e aplicados no site com sucesso!");
                      }}
                      className="bg-primary text-brown-dark text-xs font-black px-6 py-2.5 rounded-full hover:bg-primary-hover shadow-md transition whitespace-nowrap active:scale-95 border-none cursor-pointer"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>

                {/* Main Workspace Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Slide Controls */}
                  <div className="xl:col-span-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-5 space-y-6 transition-colors text-xs">
                    
                    {/* Slide Selector dropdown */}
                    <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <label className="font-bold text-gray-500 block uppercase tracking-wider text-[9px]">Selecionar Slide para Editar</label>
                        <select
                          value={editingSlideIndex}
                          onChange={(e) => setEditingSlideIndex(Number(e.target.value))}
                          className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary font-bold"
                        >
                          {bannerSlides.map((s, idx) => (
                            <option key={s.id || idx} value={idx}>
                              Slide {idx + 1}: {s.title.replace(/\n/g, " ").slice(0, 30)}...
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {bannerSlides.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Tem certeza que deseja excluir este slide?")) {
                              const updated = bannerSlides.filter((_, idx) => idx !== editingSlideIndex);
                              setBannerSlides(updated);
                              setEditingSlideIndex(Math.max(0, editingSlideIndex - 1));
                              showToast("🗑️ Slide excluído do rascunho!");
                            }
                          }}
                          className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-2 rounded text-xs transition border-none cursor-pointer mt-4"
                        >
                          Excluir Slide
                        </button>
                      )}
                    </div>

                    {bannerSlides[editingSlideIndex] && (
                      <div className="space-y-5 border-t border-gray-150 dark:border-dark-border pt-4">
                        {/* Section 1: Background & Image */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                          <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Fundo & Imagem</label>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 block">URL da Imagem de Fundo</label>
                            <input
                              type="text"
                              value={bannerSlides[editingSlideIndex].bgImage || ""}
                              onChange={(e) => {
                                const updated = [...bannerSlides];
                                updated[editingSlideIndex].bgImage = e.target.value;
                                setBannerSlides(updated);
                              }}
                              placeholder="Insira um link de imagem do Unsplash ou depósito"
                              className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Section 2: Conteúdo & Texto */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                          <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Conteúdo & Textos</label>
                          
                          <div className="flex items-center justify-between">
                            <label className="font-bold text-gray-500 block">Mostrar Selo (Badge)</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={bannerSlides[editingSlideIndex].showBadge !== false}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].showBadge = e.target.checked;
                                  setBannerSlides(updated);
                                }}
                                className="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                          </div>

                          {(bannerSlides[editingSlideIndex].showBadge !== false) && (
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Texto do Selo (Badge)</label>
                              <input
                                type="text"
                                value={bannerSlides[editingSlideIndex].badgeText || ""}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].badgeText = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 block">Título (Use quebra de linha normal)</label>
                            <textarea
                              value={bannerSlides[editingSlideIndex].title || ""}
                              rows={3}
                              onChange={(e) => {
                                const updated = [...bannerSlides];
                                updated[editingSlideIndex].title = e.target.value;
                                setBannerSlides(updated);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 block">Subtítulo</label>
                            <textarea
                              value={bannerSlides[editingSlideIndex].subtitle || ""}
                              rows={2}
                              onChange={(e) => {
                                const updated = [...bannerSlides];
                                updated[editingSlideIndex].subtitle = e.target.value;
                                setBannerSlides(updated);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Section 3: Estilo & Fontes */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                          <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Design & Tipografia</label>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Família de Fonte</label>
                              <select
                                value={bannerSlides[editingSlideIndex].fontFamily || "font-display"}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].fontFamily = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs"
                              >
                                <option value="font-display">Montserrat / Outfit</option>
                                <option value="font-sans">Inter (Moderna)</option>
                                <option value="font-serif">Playfair (Luxo / Rústica)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Alinhamento Texto</label>
                              <select
                                value={bannerSlides[editingSlideIndex].textAlign || "left"}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].textAlign = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs"
                              >
                                <option value="left">Esquerda</option>
                                <option value="center">Centralizado</option>
                                <option value="right">Direita</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Posição Eixo X (Horizontal)</label>
                              <select
                                value={bannerSlides[editingSlideIndex].alignX || "left"}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].alignX = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs"
                              >
                                <option value="left">Esquerda</option>
                                <option value="center">Centro</option>
                                <option value="right">Direita</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Posição Eixo Y (Vertical)</label>
                              <select
                                value={bannerSlides[editingSlideIndex].alignY || "center"}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].alignY = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs"
                              >
                                <option value="top">Topo</option>
                                <option value="center">Meio / Centro</option>
                                <option value="bottom">Baixo / Base</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Botão CTA */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                          <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Configuração do Botão CTA</label>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 block">Modelos de Botão (Templates)</label>
                            <select
                              value=""
                              onChange={(e) => {
                                if (!e.target.value) return;
                                const presetId = e.target.value;
                                const updated = [...bannerSlides];
                                if (presetId === "gold") {
                                  updated[editingSlideIndex].buttonColor = "#F4B400";
                                  updated[editingSlideIndex].buttonTextColor = "#3E2723";
                                  updated[editingSlideIndex].buttonAnimation = "pulse";
                                } else if (presetId === "rustic") {
                                  updated[editingSlideIndex].buttonColor = "#3E2723";
                                  updated[editingSlideIndex].buttonTextColor = "#F4B400";
                                  updated[editingSlideIndex].buttonAnimation = "bounce";
                                } else if (presetId === "luxury") {
                                  updated[editingSlideIndex].buttonColor = "#1E1B18";
                                  updated[editingSlideIndex].buttonTextColor = "#FFFFFF";
                                  updated[editingSlideIndex].buttonAnimation = "zoom";
                                } else if (presetId === "clean") {
                                  updated[editingSlideIndex].buttonColor = "#FFFFFF";
                                  updated[editingSlideIndex].buttonTextColor = "#3E2723";
                                  updated[editingSlideIndex].buttonAnimation = "zoom";
                                } else if (presetId === "outline") {
                                  updated[editingSlideIndex].buttonColor = "transparent";
                                  updated[editingSlideIndex].buttonTextColor = "#FFFFFF";
                                  updated[editingSlideIndex].buttonAnimation = "none";
                                } else if (presetId === "accent") {
                                  updated[editingSlideIndex].buttonColor = "#25D366";
                                  updated[editingSlideIndex].buttonTextColor = "#FFFFFF";
                                  updated[editingSlideIndex].buttonAnimation = "pulse";
                                }
                                setBannerSlides(updated);
                                showToast("✨ Modelo de botão aplicado com sucesso!");
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs font-bold text-brown-dark dark:text-primary cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="">-- Escolha um modelo para aplicar --</option>
                              <option value="gold">🏆 Dourado Clássico (Padrão)</option>
                              <option value="rustic">🪵 Rústico Elegante (Marrom)</option>
                              <option value="luxury">🖤 Preto Luxo</option>
                              <option value="clean">⚪ Branco Minimalista</option>
                              <option value="outline">🔲 Transparente com Borda</option>
                              <option value="accent">🔥 Verde Destaque (WhatsApp)</option>
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Texto do Botão</label>
                              <input
                                type="text"
                                value={bannerSlides[editingSlideIndex].buttonText || ""}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].buttonText = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Animação Hover</label>
                              <select
                                value={bannerSlides[editingSlideIndex].buttonAnimation || "none"}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].buttonAnimation = e.target.value;
                                  setBannerSlides(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs"
                              >
                                <option value="none">Nenhuma</option>
                                <option value="zoom">Escala / Zoom</option>
                                <option value="pulse">Pulso Contínuo</option>
                                <option value="bounce">Bounce / Salto</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 block">Link de Redirecionamento</label>
                            <input
                              type="text"
                              value={bannerSlides[editingSlideIndex].buttonLink || ""}
                              onChange={(e) => {
                                const updated = [...bannerSlides];
                                updated[editingSlideIndex].buttonLink = e.target.value;
                                setBannerSlides(updated);
                              }}
                              placeholder="Ex: #carrinho ou /portas-de-madeira"
                              className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Cor do Botão</label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="color"
                                  value={bannerSlides[editingSlideIndex].buttonColor || "#F4B400"}
                                  onChange={(e) => {
                                    const updated = [...bannerSlides];
                                    updated[editingSlideIndex].buttonColor = e.target.value;
                                    setBannerSlides(updated);
                                  }}
                                  className="w-8 h-8 rounded border border-gray-205 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                                />
                                <input
                                  type="text"
                                  value={bannerSlides[editingSlideIndex].buttonColor || "#F4B400"}
                                  onChange={(e) => {
                                    const updated = [...bannerSlides];
                                    updated[editingSlideIndex].buttonColor = e.target.value;
                                    setBannerSlides(updated);
                                  }}
                                  className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 uppercase font-mono text-[10px]"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Cor do Texto</label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="color"
                                  value={bannerSlides[editingSlideIndex].buttonTextColor || "#3E2723"}
                                  onChange={(e) => {
                                    const updated = [...bannerSlides];
                                    updated[editingSlideIndex].buttonTextColor = e.target.value;
                                    setBannerSlides(updated);
                                  }}
                                  className="w-8 h-8 rounded border border-gray-205 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                                />
                                <input
                                  type="text"
                                  value={bannerSlides[editingSlideIndex].buttonTextColor || "#3E2723"}
                                  onChange={(e) => {
                                    const updated = [...bannerSlides];
                                    updated[editingSlideIndex].buttonTextColor = e.target.value;
                                    setBannerSlides(updated);
                                  }}
                                  className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2 py-1 uppercase font-mono text-[10px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 border-t border-gray-150 dark:border-dark-border pt-3">
                            <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Posicionamento do Botão (Ajuste Livre)</label>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="font-bold text-gray-500">Espaçamento Superior (Margin-Top)</span>
                                <span className="font-mono text-primary font-bold">{(bannerSlides[editingSlideIndex].buttonMarginTop ?? 16)}px</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="150"
                                value={bannerSlides[editingSlideIndex].buttonMarginTop ?? 16}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].buttonMarginTop = Number(e.target.value);
                                  setBannerSlides(updated);
                                }}
                                className="w-full accent-primary bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer h-1.5"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="font-bold text-gray-500">Deslocamento Horizontal (X Offset)</span>
                                <span className="font-mono text-primary font-bold">{(bannerSlides[editingSlideIndex].buttonOffsetX ?? 0)}px</span>
                              </div>
                              <input
                                type="range"
                                min="-300"
                                max="300"
                                value={bannerSlides[editingSlideIndex].buttonOffsetX ?? 0}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].buttonOffsetX = Number(e.target.value);
                                  setBannerSlides(updated);
                                }}
                                className="w-full accent-primary bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer h-1.5"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="font-bold text-gray-500">Deslocamento Vertical (Y Offset)</span>
                                <span className="font-mono text-primary font-bold">{(bannerSlides[editingSlideIndex].buttonOffsetY ?? 0)}px</span>
                              </div>
                              <input
                                type="range"
                                min="-150"
                                max="150"
                                value={bannerSlides[editingSlideIndex].buttonOffsetY ?? 0}
                                onChange={(e) => {
                                  const updated = [...bannerSlides];
                                  updated[editingSlideIndex].buttonOffsetY = Number(e.target.value);
                                  setBannerSlides(updated);
                                }}
                                className="w-full accent-primary bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer h-1.5"
                              />
                            </div>
                            
                            <p className="text-[10px] text-gray-400 dark:text-neutral-500 italic mt-1 leading-normal select-none">
                              💡 Dica: Você também pode arrastar o botão diretamente com o mouse na tela de preview à direita para movê-lo!
                            </p>
                          </div>
                        </div>

                        {/* Section 5: Opções Extras */}
                        <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl flex items-center justify-between">
                          <label className="font-bold text-gray-500 block">Mostrar Selo Circular de Qualidade</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={bannerSlides[editingSlideIndex].hasStamp === true}
                              onChange={(e) => {
                                const updated = [...bannerSlides];
                                updated[editingSlideIndex].hasStamp = e.target.checked;
                                setBannerSlides(updated);
                              }}
                              className="sr-only peer" 
                            />
                            <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Live Interactive Preview */}
                  {bannerSlides[editingSlideIndex] && (
                    <div className="xl:col-span-7 bg-slate-100 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-xl shadow-sm flex flex-col h-[580px] items-center justify-center p-6 relative overflow-hidden transition-colors">
                      {/* Live Preview badge */}
                      <div className="absolute top-4 left-4 z-40 bg-brown-dark text-primary border border-primary/20 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        PREVIEW EM TEMPO REAL (CARROSSEL)
                      </div>

                      {/* Simulated Slide Canvas */}
                      <div
                        onMouseMove={handleButtonDragMove}
                        onMouseUp={handleButtonDragEnd}
                        onMouseLeave={handleButtonDragEnd}
                        className="absolute inset-0 bg-cover bg-center transition-all duration-300 flex z-0"
                        style={{ backgroundImage: `url('${bannerSlides[editingSlideIndex].bgImage || "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop"}')` }}
                      >
                        {/* Darkness overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 z-0" />
                        
                        {/* Content wrapper with alignment classes based on alignX and alignY */}
                        <div className={`w-full h-full flex z-10 relative px-8 py-10 ${
                          bannerSlides[editingSlideIndex].alignX === "left" ? "justify-start" :
                          bannerSlides[editingSlideIndex].alignX === "right" ? "justify-end" : "justify-center"
                        } ${
                          bannerSlides[editingSlideIndex].alignY === "top" ? "items-start" :
                          bannerSlides[editingSlideIndex].alignY === "bottom" ? "items-end" : "items-center"
                        }`}>
                          
                          {/* Inner text box aligned horizontally */}
                          <div className={`max-w-md md:max-w-lg space-y-3.5 ${
                            bannerSlides[editingSlideIndex].textAlign === "center" ? "text-center" :
                            bannerSlides[editingSlideIndex].textAlign === "right" ? "text-right" : "text-left"
                          }`}>
                            {bannerSlides[editingSlideIndex].showBadge !== false && bannerSlides[editingSlideIndex].badgeText && (
                              <span className="bg-primary text-brown-dark font-black text-[9px] md:text-[10px] px-3 py-0.5 rounded shadow inline-block uppercase">
                                {bannerSlides[editingSlideIndex].badgeText}
                              </span>
                            )}
                            
                            <h2 style={{ whiteSpace: "pre-line" }} className={`leading-tight tracking-tight uppercase text-white font-black text-xl md:text-3xl lg:text-4xl drop-shadow-md ${
                              bannerSlides[editingSlideIndex].fontFamily === "font-serif" ? "font-serif font-semibold italic text-primary" : "font-display"
                            }`}>
                              {bannerSlides[editingSlideIndex].title || "Título do Slide"}
                            </h2>
                            
                            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed drop-shadow line-clamp-3">
                              {bannerSlides[editingSlideIndex].subtitle || "Descrição do slide."}
                            </p>

                            {bannerSlides[editingSlideIndex].buttonText && (
                              <div 
                                style={{
                                  marginTop: `${bannerSlides[editingSlideIndex].buttonMarginTop ?? 16}px`,
                                  transform: `translate(${bannerSlides[editingSlideIndex].buttonOffsetX ?? 0}px, ${bannerSlides[editingSlideIndex].buttonOffsetY ?? 0}px)`
                                }}
                                className={`pt-2 flex ${
                                  bannerSlides[editingSlideIndex].textAlign === "center" ? "justify-center" :
                                  bannerSlides[editingSlideIndex].textAlign === "right" ? "justify-end" : "justify-start"
                                }`}
                              >
                                <div
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setIsDraggingButton(true);
                                    setDragStartPos({ x: e.clientX, y: e.clientY });
                                    setDragStartOffsets({
                                      x: bannerSlides[editingSlideIndex].buttonOffsetX ?? 0,
                                      y: bannerSlides[editingSlideIndex].buttonOffsetY ?? 0
                                    });
                                  }}
                                  style={{
                                    backgroundColor: bannerSlides[editingSlideIndex].buttonColor || "#F4B400",
                                    color: bannerSlides[editingSlideIndex].buttonTextColor || "#3E2723",
                                    border: bannerSlides[editingSlideIndex].buttonColor === "transparent" ? `2px solid ${bannerSlides[editingSlideIndex].buttonTextColor || "#ffffff"}` : "none",
                                    cursor: isDraggingButton ? "grabbing" : "grab",
                                    userSelect: "none"
                                  }}
                                  className={`px-5 py-2.5 rounded-full font-black text-[10px] md:text-xs shadow hover:brightness-110 flex items-center gap-1.5 cursor-pointer uppercase transition-all duration-300 ${
                                    bannerSlides[editingSlideIndex].buttonAnimation === "zoom" ? "hover:scale-105" :
                                    bannerSlides[editingSlideIndex].buttonAnimation === "pulse" ? "animate-pulse" :
                                    bannerSlides[editingSlideIndex].buttonAnimation === "bounce" ? "hover:-translate-y-1" : ""
                                  }`}
                                  title="Arraste para mover livremente"
                                >
                                  {bannerSlides[editingSlideIndex].buttonText} <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Stamp circular overlay inside preview */}
                          {bannerSlides[editingSlideIndex].hasStamp === true && (
                            <div className="absolute right-8 bottom-8 select-none z-10 scale-90 hidden md:block">
                              <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/35 flex items-center justify-center p-1 animate-[spin_40s_linear_infinite] relative">
                                <svg className="absolute inset-0 w-full h-full fill-white/80" viewBox="0 0 100 100">
                                  <path id="circlePathPreview" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                  <text className="font-display font-black text-[5.8px] tracking-[1.5px] uppercase">
                                    <textPath href="#circlePathPreview" startOffset="0%">
                                      Qualidade Só Madeiras • 
                                    </textPath>
                                  </text>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Global Admin Premium Toast */}
            {adminToast && (
              <div className={`fixed bottom-6 right-6 z-[99999] px-5 py-4 rounded-xl shadow-2xl border text-xs font-black transition-all flex items-center gap-2 ${
                adminToast.type === "success" 
                  ? "bg-emerald-600 text-white border-emerald-500" 
                  : "bg-red-600 text-white border-red-500"
              }`}>
                {adminToast.message}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                ABA: BANNERS ENTRE SEÇÕES
            ════════════════════════════════════════════════════════════ */}
            {adminTab === "section-banners" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-lg p-6 space-y-6 transition-all text-xs">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-neutral-800 pb-4 gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <Layout className="h-5 w-5 text-cyan-400" /> Banners entre Seções
                    </h3>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-xs mt-1">
                      Insira banners clicáveis entre as seções do site. Escolha o layout de grade e adicione as imagens. Se nenhuma imagem for adicionada, o espaço não aparece no site.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      saveBannerZones(bannerZones);
                      showToast("💾 Banners salvos e publicados!");
                    }}
                    className="bg-primary text-brown-dark text-xs font-black px-6 py-2.5 rounded-full hover:bg-primary-hover shadow-md transition whitespace-nowrap active:scale-95 border-none cursor-pointer"
                  >
                    Salvar Banners
                  </button>
                </div>

                {/* Grid type legend */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-2">
                  {[
                    { type: "3-col", label: "3 Colunas Iguais", icon: "▦▦▦", desc: "3 banners lado a lado" },
                    { type: "1-full", label: "Banner Full Width", icon: "▬▬▬", desc: "1 banner largo" },
                    { type: "1big-3small", label: "1 Grande + 3 Pequenos", icon: "▉▪▪▪", desc: "1 esq. + 3 empilhados dir." },
                  ].map(g => (
                    <div key={g.type} className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border rounded-xl p-3 flex items-center gap-3">
                      <span className="text-2xl select-none">{g.icon}</span>
                      <div>
                        <p className="font-black text-brown-dark dark:text-white text-[10px] uppercase">{g.label}</p>
                        <p className="text-gray-400 text-[9px]">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone cards */}
                <div className="space-y-4">
                  {bannerZones.map((zone, zIdx) => (
                    <div key={zone.id} className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border rounded-xl overflow-hidden">

                      {/* Zone header row */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-150 dark:border-dark-border bg-white dark:bg-neutral-950">
                        <div className="flex items-center gap-3">
                          {/* Active toggle */}
                          <label className="relative inline-flex items-center cursor-pointer" title={zone.active ? "Desativar zona" : "Ativar zona"}>
                            <input
                              type="checkbox"
                              checked={zone.active}
                              onChange={(e) => {
                                const updated = bannerZones.map((z, i) => i === zIdx ? { ...z, active: e.target.checked } : z);
                                saveBannerZones(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                          </label>
                          <span className="font-black text-brown-dark dark:text-white text-[11px] uppercase tracking-wide">{zone.label}</span>
                          {zone.active && zone.banners.length > 0 && (
                            <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/50">
                              ● Ativo • {zone.banners.length} banner{zone.banners.length !== 1 ? "s" : ""}
                            </span>
                          )}
                          {!zone.active && (
                            <span className="bg-gray-100 dark:bg-neutral-800 text-gray-400 text-[9px] font-bold px-2 py-0.5 rounded-full">Inativo</span>
                          )}
                        </div>

                        {/* Grid type selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-[9px] uppercase font-bold hidden sm:block">Layout:</span>
                          <select
                            value={zone.gridType}
                            onChange={(e) => {
                              const updated = bannerZones.map((z, i) => i === zIdx ? { ...z, gridType: e.target.value as any, banners: [] } : z);
                              saveBannerZones(updated);
                            }}
                            className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg px-2 py-1.5 text-[10px] font-bold text-brown-dark dark:text-primary focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                          >
                            <option value="3-col">▦ 3 Colunas</option>
                            <option value="1-full">▬ Full Width</option>
                            <option value="1big-3small">▉ 1 Grande + 3</option>
                          </select>
                        </div>
                      </div>

                      {/* Zone body: image slots */}
                      <div className="p-4 space-y-3">
                        {/* How many slots needed */}
                        {(() => {
                          const slots = zone.gridType === "3-col" ? 3 : zone.gridType === "1-full" ? 1 : 4;
                          const slotLabels: Record<string, string[]> = {
                            "3-col": ["Banner Esquerdo", "Banner Central", "Banner Direito"],
                            "1-full": ["Banner Full Width"],
                            "1big-3small": ["Banner Grande (Esq.)", "Banner Topo Dir.", "Banner Meio Dir.", "Banner Base Dir."],
                          };
                          return Array.from({ length: slots }).map((_, sIdx) => {
                            const banner = zone.banners[sIdx] || { url: "", link: "", alt: "" };
                            return (
                              <div key={sIdx} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-white dark:bg-dark-surface border border-gray-150 dark:border-dark-border rounded-lg p-3">
                                {/* Mini preview thumb */}
                                <div className="md:col-span-2 flex justify-center">
                                  {banner.url ? (
                                    <img src={banner.url} alt="" className="h-12 w-full object-cover rounded border border-gray-200 dark:border-dark-border" />
                                  ) : (
                                    <div className="h-12 w-full rounded border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-300 dark:text-neutral-600 text-[9px] font-bold text-center select-none">
                                      {slotLabels[zone.gridType]?.[sIdx] || `Slot ${sIdx + 1}`}
                                    </div>
                                  )}
                                </div>

                                {/* ── Image upload area ── */}
                                <div className="md:col-span-6 space-y-1.5">
                                  <label className="text-[9px] text-gray-400 font-bold uppercase block">Imagem do Banner</label>

                                  {/* Drop zone / upload box */}
                                  <div
                                    className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                                      banner.url
                                        ? "border-cyan-400 bg-cyan-50 dark:bg-cyan-950/20"
                                        : "border-gray-300 dark:border-neutral-600 bg-slate-50 dark:bg-neutral-900 hover:border-cyan-400 hover:bg-cyan-50/40 dark:hover:bg-cyan-950/10"
                                    }`}
                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-cyan-400", "bg-cyan-50"); }}
                                    onDragLeave={(e) => { if (!banner.url) { e.currentTarget.classList.remove("border-cyan-400", "bg-cyan-50"); } }}
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      const file = e.dataTransfer.files?.[0];
                                      if (!file || !file.type.startsWith("image/")) return;
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        const updated = bannerZones.map((z, i) => {
                                          if (i !== zIdx) return z;
                                          const newBanners = [...z.banners];
                                          newBanners[sIdx] = { ...banner, url: ev.target?.result as string, alt: file.name };
                                          return { ...z, banners: newBanners };
                                        });
                                        saveBannerZones(updated);
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                  >
                                    {banner.url ? (
                                      /* Preview when image is loaded */
                                      <div className="relative group">
                                        <img
                                          src={banner.url}
                                          alt={banner.alt || "banner"}
                                          className="w-full h-24 object-cover rounded-[10px]"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px] flex items-center justify-center gap-2">
                                          <label
                                            className="bg-white text-brown-dark text-[9px] font-black px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary transition"
                                            title="Trocar imagem"
                                          >
                                            🔄 Trocar
                                            <input
                                              type="file"
                                              accept="image/*"
                                              className="hidden"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const reader = new FileReader();
                                                reader.onload = (ev) => {
                                                  const updated = bannerZones.map((z, i) => {
                                                    if (i !== zIdx) return z;
                                                    const newBanners = [...z.banners];
                                                    newBanners[sIdx] = { ...banner, url: ev.target?.result as string, alt: file.name };
                                                    return { ...z, banners: newBanners };
                                                  });
                                                  saveBannerZones(updated);
                                                };
                                                reader.readAsDataURL(file);
                                              }}
                                            />
                                          </label>
                                          <button
                                            onClick={() => {
                                              const updated = bannerZones.map((z, i) => {
                                                if (i !== zIdx) return z;
                                                const newBanners = [...z.banners];
                                                newBanners[sIdx] = { url: "", link: "", alt: "" };
                                                return { ...z, banners: newBanners };
                                              });
                                              saveBannerZones(updated);
                                            }}
                                            className="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-400 transition border-none"
                                          >
                                            🗑️ Remover
                                          </button>
                                        </div>
                                        {/* Filename tag */}
                                        {banner.alt && (
                                          <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded font-mono truncate max-w-[120px]">
                                            {banner.alt}
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      /* Empty state */
                                      <div className="flex flex-col items-center justify-center gap-2 py-4 px-3 text-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-base select-none">🖼️</div>
                                        <p className="text-[9px] text-gray-400 dark:text-neutral-500 font-bold leading-tight">
                                          Arraste uma imagem aqui<br />ou escolha uma opção abaixo
                                        </p>
                                        <div className="flex gap-1.5 flex-wrap justify-center">
                                          {/* Upload file button */}
                                          <label className="bg-cyan-500 hover:bg-cyan-400 text-white text-[9px] font-black px-3 py-1.5 rounded-full cursor-pointer transition flex items-center gap-1 whitespace-nowrap">
                                            📁 Enviar Arquivo
                                            <input
                                              type="file"
                                              accept="image/*"
                                              className="hidden"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const reader = new FileReader();
                                                reader.onload = (ev) => {
                                                  const updated = bannerZones.map((z, i) => {
                                                    if (i !== zIdx) return z;
                                                    const newBanners = [...z.banners];
                                                    newBanners[sIdx] = { ...banner, url: ev.target?.result as string, alt: file.name };
                                                    return { ...z, banners: newBanners };
                                                  });
                                                  saveBannerZones(updated);
                                                };
                                                reader.readAsDataURL(file);
                                              }}
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* URL paste field (always visible below) */}
                                  <input
                                    type="text"
                                    value={banner.url.startsWith("data:") ? "" : banner.url}
                                    onChange={(e) => {
                                      const updated = bannerZones.map((z, i) => {
                                        if (i !== zIdx) return z;
                                        const newBanners = [...z.banners];
                                        newBanners[sIdx] = { ...banner, url: e.target.value, alt: "" };
                                        return { ...z, banners: newBanners };
                                      });
                                      saveBannerZones(updated);
                                    }}
                                    placeholder="Ou cole uma URL de imagem aqui..."
                                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded px-2 py-1.5 text-[10px] focus:ring-1 focus:ring-cyan-400 font-mono placeholder:text-gray-300"
                                  />
                                </div>

                                {/* Link field */}
                                <div className="md:col-span-4 space-y-0.5">
                                  <label className="text-[9px] text-gray-400 font-bold uppercase block">Link de Destino (Clique)</label>
                                  <input
                                    type="text"
                                    value={banner.link}
                                    onChange={(e) => {
                                      const updated = bannerZones.map((z, i) => {
                                        if (i !== zIdx) return z;
                                        const newBanners = [...z.banners];
                                        newBanners[sIdx] = { ...banner, link: e.target.value };
                                        return { ...z, banners: newBanners };
                                      });
                                      saveBannerZones(updated);
                                    }}
                                    placeholder="Ex: /portas-de-madeira ou https://..."
                                    className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded px-2 py-1.5 text-[10px] focus:ring-1 focus:ring-cyan-400"
                                  />
                                  <p className="text-[9px] text-gray-400 italic">Deixe vazio se não quiser redirecionamento</p>
                                </div>

                                {/* Placeholder for clear button (now inline on hover in the image) */}
                                <div className="md:col-span-2 hidden">
                                  {banner.url && (
                                    <button
                                      onClick={() => {
                                        const updated = bannerZones.map((z, i) => {
                                          if (i !== zIdx) return z;
                                          const newBanners = [...z.banners];
                                          newBanners[sIdx] = { url: "", link: "", alt: "" };
                                          return { ...z, banners: newBanners };
                                        });
                                        saveBannerZones(updated);
                                      }}
                                      className="hidden"
                                    >
                                      Limpar
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })()}

                        {/* Live mini-preview for this zone */}
                        {zone.banners.some(b => b.url) && (
                          <div className="mt-3 border-t border-gray-150 dark:border-dark-border pt-3">
                            <p className="text-[9px] text-gray-400 uppercase font-black mb-2 tracking-wider">Preview do Layout:</p>
                            <div className={`gap-2 ${zone.gridType === "3-col" ? "grid grid-cols-3" : zone.gridType === "1-full" ? "flex" : "grid grid-cols-2"}`}>
                              {zone.gridType === "1-full" && zone.banners[0]?.url && (
                                <img src={zone.banners[0].url} alt="" className="h-16 w-full object-cover rounded-lg border border-gray-200 dark:border-dark-border" />
                              )}
                              {zone.gridType === "3-col" && zone.banners.slice(0, 3).map((b, i) => (
                                b.url ? <img key={i} src={b.url} alt="" className="h-16 object-cover rounded border border-gray-200 dark:border-dark-border" /> : <div key={i} className="h-16 rounded border-2 border-dashed border-gray-200 dark:border-neutral-700" />
                              ))}
                              {zone.gridType === "1big-3small" && (
                                <>
                                  <div className="row-span-3 h-32">
                                    {zone.banners[0]?.url ? <img src={zone.banners[0].url} alt="" className="h-full w-full object-cover rounded border border-gray-200 dark:border-dark-border" /> : <div className="h-full rounded border-2 border-dashed border-gray-200 dark:border-neutral-700" />}
                                  </div>
                                  {[1, 2, 3].map(i => (
                                    zone.banners[i]?.url ? <img key={i} src={zone.banners[i].url} alt="" className="h-10 object-cover rounded border border-gray-200 dark:border-dark-border" /> : <div key={i} className="h-10 rounded border-2 border-dashed border-gray-200 dark:border-neutral-700" />
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Help tip */}
                <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 rounded-xl p-4">
                  <p className="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold leading-relaxed">
                    💡 <strong>Dica:</strong> Zonas inativas ou sem imagens não ocupam espaço na página — o layout original é preservado automaticamente. Você pode usar imagens hospedadas em qualquer CDN, Google Drive público ou direct link. Recomendamos imagens de <strong>1200×400px</strong> para Full Width e <strong>600×400px</strong> para as demais.
                  </p>
                </div>

              </div>
            )}

            {adminTab === "menu-builder" && (
              <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-lg p-6 space-y-6 transition-all text-xs">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 dark:border-neutral-800 pb-4 gap-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <Menu className="h-5 w-5 text-emerald-500" /> Gerenciador do Menu Principal
                    </h3>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-xs mt-1">Personalize a barra de navegação superior, configure links e crie submenus interativos sem emojis e em letras maiúsculas.</p>
                  </div>
                  <button
                    onClick={() => {
                      saveToLocal("somadeiras_menu_items", menuItems);
                      showToast("💾 Menu salvo e publicado com sucesso!");
                    }}
                    className="bg-primary text-brown-dark text-xs font-black px-6 py-2.5 rounded-full hover:bg-primary-hover shadow-md transition whitespace-nowrap active:scale-95 border-none cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Menu Items list */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-neutral-900 p-3 rounded-xl border border-gray-150 dark:border-dark-border">
                      <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[10px]">Itens Ativos do Menu</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `menu-${Date.now()}`,
                            label: "NOVO ITEM",
                            link: "/#",
                            submenus: []
                          };
                          setMenuItems([...menuItems, newItem]);
                          showToast("➕ Novo item adicionado ao menu!");
                        }}
                        className="bg-brown-medium hover:bg-brown-dark text-white text-[10px] font-bold px-4 py-2 rounded-full transition cursor-pointer border-none"
                      >
                        + Adicionar Item ao Menu
                      </button>
                    </div>

                    <div className="space-y-4">
                      {menuItems.map((item, idx) => (
                        <div key={item.id} className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-4 relative">
                          
                          {/* Item header with order and delete buttons */}
                          <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-800 pb-2">
                            <span className="font-bold text-brown-medium dark:text-primary uppercase text-[10px]">Item {idx + 1}: {item.label}</span>
                            <div className="flex gap-1.5">
                              {idx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...menuItems];
                                    const temp = updated[idx];
                                    updated[idx] = updated[idx - 1];
                                    updated[idx - 1] = temp;
                                    setMenuItems(updated);
                                  }}
                                  className="bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-350 px-2 py-1 rounded text-[10px] hover:bg-gray-300 transition"
                                  title="Mover para Cima"
                                >
                                  ▲
                                </button>
                              )}
                              {idx < menuItems.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...menuItems];
                                    const temp = updated[idx];
                                    updated[idx] = updated[idx + 1];
                                    updated[idx + 1] = temp;
                                    setMenuItems(updated);
                                  }}
                                  className="bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-355 px-2 py-1 rounded text-[10px] hover:bg-gray-300 transition"
                                  title="Mover para Baixo"
                                >
                                  ▼
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Tem certeza que deseja excluir o item "${item.label}"?`)) {
                                    setMenuItems(menuItems.filter(m => m.id !== item.id));
                                    showToast("🗑️ Item removido do menu!");
                                  }
                                }}
                                className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[10px] border-none cursor-pointer"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>

                          {/* Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Nome do Item (Maiúsculo, Sem Emojis)</label>
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => {
                                  const updated = [...menuItems];
                                  updated[idx].label = e.target.value.toUpperCase().replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "");
                                  setMenuItems(updated);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary text-brown-dark dark:text-primary font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 block">Link de Destino (Deixar vazio se tiver submenus)</label>
                              <input
                                type="text"
                                value={item.link || ""}
                                onChange={(e) => {
                                  const updated = [...menuItems];
                                  updated[idx].link = e.target.value;
                                  setMenuItems(updated);
                                }}
                                placeholder="Ex: /?cat=telhas, /lookbook ou deixar vazio"
                                className="w-full bg-white dark:bg-dark-surface border border-gray-250 dark:border-dark-border rounded px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          </div>

                          {/* Submenus List */}
                          <div className="border-t border-dashed border-gray-250 dark:border-neutral-850 pt-3 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-gray-500 text-[9px] uppercase tracking-wider">Submenus (Menus Suspensos)</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...menuItems];
                                  if (!updated[idx].submenus) updated[idx].submenus = [];
                                  updated[idx].submenus.push({
                                    id: `sub-${Date.now()}`,
                                    label: "NOVO SUBMENU",
                                    link: "/#"
                                  });
                                  setMenuItems(updated);
                                  showToast("➕ Novo submenu adicionado!");
                                }}
                                className="bg-slate-200 dark:bg-neutral-800 hover:bg-slate-300 text-brown-dark dark:text-primary text-[9px] font-bold px-2 py-1 rounded transition border-none cursor-pointer"
                              >
                                + Adicionar Submenu
                              </button>
                            </div>

                            {item.submenus && item.submenus.length > 0 ? (
                              <div className="space-y-2 pl-4 border-l-2 border-brown-medium/20">
                                {item.submenus.map((sub: any, subIdx: number) => (
                                  <div key={sub.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-white dark:bg-dark-surface p-2.5 rounded border border-gray-150 dark:border-dark-border relative">
                                    <div className="md:col-span-5 space-y-1">
                                      <label className="text-[9px] text-gray-400 font-bold block">Nome do Submenu (Maiúsculas)</label>
                                      <input
                                        type="text"
                                        value={sub.label}
                                        onChange={(e) => {
                                          const updated = [...menuItems];
                                          updated[idx].submenus[subIdx].label = e.target.value.toUpperCase().replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "");
                                          setMenuItems(updated);
                                        }}
                                        className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-[11px] font-bold text-brown-dark dark:text-primary"
                                      />
                                    </div>
                                    <div className="md:col-span-5 space-y-1">
                                      <label className="text-[9px] text-gray-450 font-bold block">Link de Redirecionamento</label>
                                      <input
                                        type="text"
                                        value={sub.link || ""}
                                        onChange={(e) => {
                                          const updated = [...menuItems];
                                          updated[idx].submenus[subIdx].link = e.target.value;
                                          setMenuItems(updated);
                                        }}
                                        className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-[11px]"
                                      />
                                    </div>
                                    <div className="md:col-span-2 flex gap-1 justify-end pt-3 md:pt-0">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = [...menuItems];
                                          updated[idx].submenus = updated[idx].submenus.filter((s: any) => s.id !== sub.id);
                                          setMenuItems(updated);
                                          showToast("🗑️ Submenu excluído!");
                                        }}
                                        className="bg-red-600 hover:bg-red-500 text-white p-1 rounded text-[10px] border-none cursor-pointer"
                                        title="Excluir Submenu"
                                      >
                                        Remover
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[10px] text-gray-400 italic pl-4">Este item não possui submenus. Abre o link diretamente.</p>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Live Visual Menu Preview */}
                  <div className="lg:col-span-5 bg-slate-100 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-5 space-y-4 relative min-h-[400px]">
                    <div className="absolute top-4 left-4 z-40 bg-brown-dark text-primary border border-primary/20 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      PREVIEW DO MENU (HEADER)
                    </div>

                    <div className="pt-8 space-y-4">
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
                        Este é o preview em tempo real de como o menu principal e submenus suspensos serão renderizados na loja. Passe o mouse sobre os itens para testar os dropdowns suspensos.
                      </p>

                      {/* Header Preview Container */}
                      <div className="bg-brown-dark dark:bg-black p-4 rounded-xl border border-brown-medium/30 flex flex-col items-center">
                        <nav className="bg-brown-medium dark:bg-neutral-950 rounded-lg py-3 px-4 w-full border border-brown-light/20 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] tracking-wider uppercase font-bold text-white relative select-none">
                          {menuItems.map((item) => (
                            <div key={item.id} className="relative group/preview py-1 px-1.5 flex items-center gap-1 text-gray-200 hover:text-primary transition-colors cursor-pointer">
                              <span>{item.label}</span>
                              {item.submenus && item.submenus.length > 0 && (
                                <>
                                  <span className="text-[8px] opacity-70">▼</span>
                                  <div className="absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 hidden group-hover/preview:block bg-brown-dark dark:bg-neutral-900 border border-brown-medium dark:border-neutral-800 rounded-md shadow-2xl py-1.5 min-w-[150px] z-50 text-[9px] font-bold text-gray-300 before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:bg-transparent">
                                    {item.submenus.map((sub: any) => (
                                      <div
                                        key={sub.id}
                                        className="block px-3 py-1.5 hover:bg-primary hover:text-brown-dark transition-colors"
                                      >
                                        {sub.label}
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}
            
            {/* Visual Popup Builder Tab */}
            {adminTab === "popup-builder" && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-5 rounded-xl shadow-sm transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <span className="text-primary text-xl">✨</span> CRIADOR VISUAL DE POPUPS (ESTILO ELEMENTOR PRO)
                    </h4>
                    <p className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-1">Desenhe campanhas promocionais de alto impacto com banners, textos, botões customizáveis, fundos e animações dinâmicas.</p>
                  </div>
                  <div className="flex gap-2 self-stretch md:self-auto justify-end">
                    <button
                      onClick={() => {
                        sessionStorage.removeItem("somadeiras_popup_dismissed");
                        showToast("🔄 Cache de testes limpo! O popup poderá aparecer novamente para você na loja.");
                      }}
                      className="bg-brown-medium hover:bg-brown-dark text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition whitespace-nowrap active:scale-95"
                    >
                      Limpar Limite de Testes
                    </button>
                    <button
                      onClick={() => handleSavePopupCampaign(popupCampaign)}
                      className="bg-primary text-brown-dark text-xs font-black px-6 py-2.5 rounded-full hover:bg-primary-hover shadow-md transition whitespace-nowrap active:scale-95"
                    >
                      Salvar Campanha no Site
                    </button>
                  </div>
                </div>

                {/* Main Workspace (Split Screen Grid) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Elementor-style Controls */}
                  <div className="xl:col-span-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-5 space-y-6 transition-colors">
                    
                    {/* Presets Row */}
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                        🎨 MODELOS PRONTOS DE CAMPANHA (CLIQUE RÁPIDO)
                      </label>
                      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                        {POPUP_PRESETS.map((p, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setPopupCampaign({
                                ...popupCampaign,
                                ...p,
                                id: `preset-${index}-${Date.now()}`
                              });
                              setPreviewKey(prev => prev + 1);
                              showToast(`Modelo '${p.name}' carregado no preview!`);
                            }}
                            className="bg-slate-50 hover:bg-primary/10 hover:border-primary border border-gray-200 dark:border-dark-border dark:bg-neutral-800 rounded-lg px-3.5 py-2.5 text-[11px] font-bold text-gray-700 dark:text-gray-200 shrink-0 transition text-left space-y-1 w-[160px] shadow-xs"
                          >
                            <span className="block truncate font-black text-brown-dark dark:text-white text-xs">{p.name}</span>
                            <span className="block text-[9px] text-gray-400 dark:text-gray-500 font-medium truncate">{p.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-150 dark:border-dark-border pt-5 space-y-5">
                      {/* Section 1: Gatilhos & Status */}
                      <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                        <div className="flex justify-between items-center pb-1.5 border-b border-gray-150 dark:border-dark-border">
                          <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider">Status & Gatilhos</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={popupCampaign.isActive}
                              onChange={(e) => {
                                setPopupCampaign({ ...popupCampaign, isActive: e.target.checked });
                                setPreviewKey(prev => prev + 1);
                              }}
                              className="sr-only peer" 
                            />
                            <div className="w-9 h-5 bg-gray-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                            <span className="ml-2 text-[10px] font-black text-gray-900 dark:text-gray-100 font-medium">
                              {popupCampaign.isActive ? "ATIVO" : "INATIVO"}
                            </span>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Página de Exibição</label>
                            <select
                              value={popupCampaign.targetPage}
                              onChange={(e) => setPopupCampaign({ ...popupCampaign, targetPage: e.target.value as any })}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="all">Todas as Páginas</option>
                              <option value="home">Página Inicial (Home)</option>
                              <option value="forro">Calculadora PVC</option>
                              <option value="pergolado">Calculadora Pergolado</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Gatilho de Disparo</label>
                            <select
                              value={popupCampaign.triggerType}
                              onChange={(e) => setPopupCampaign({ ...popupCampaign, triggerType: e.target.value as any })}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="delay">Delay por Tempo</option>
                              <option value="scroll">Porcentagem de Rolagem</option>
                              <option value="exit-intent">Intenção de Saída</option>
                            </select>
                          </div>
                        </div>

                        {popupCampaign.triggerType !== "exit-intent" && (
                          <div className="space-y-1 text-xs">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">
                              {popupCampaign.triggerType === "delay" ? "Tempo de Espera (Segundos)" : "Profundidade de Rolagem (%)"}
                            </label>
                            <input 
                              type="number"
                              min="0"
                              value={popupCampaign.triggerValue}
                              onChange={(e) => setPopupCampaign({ ...popupCampaign, triggerValue: Number(e.target.value) })}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                        )}
                      </div>

                      {/* Section 2: Imagem & Flyer */}
                      <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                        <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Conteúdo & Textos</label>
                        
                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">URL da Imagem do Flyer</label>
                          <input 
                            type="text"
                            value={popupCampaign.flyerImage}
                            onChange={(e) => {
                              setPopupCampaign({ ...popupCampaign, flyerImage: e.target.value });
                              setPreviewKey(prev => prev + 1);
                            }}
                            placeholder="Ex: https://images.unsplash.com/..."
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Título Principal</label>
                          <input 
                            type="text"
                            value={popupCampaign.title}
                            onChange={(e) => {
                              setPopupCampaign({ ...popupCampaign, title: e.target.value });
                              setPreviewKey(prev => prev + 1);
                            }}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Descrição / Subtítulo</label>
                          <textarea 
                            value={popupCampaign.description}
                            onChange={(e) => {
                              setPopupCampaign({ ...popupCampaign, description: e.target.value });
                              setPreviewKey(prev => prev + 1);
                            }}
                            rows={3}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                          />
                        </div>
                      </div>

                      {/* Section 3: Call to Action (CTA) Button */}
                      <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                        <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Botão do Popup (CTA)</label>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Texto do Botão</label>
                            <input 
                              type="text"
                              value={popupCampaign.buttonText}
                              onChange={(e) => {
                                setPopupCampaign({ ...popupCampaign, buttonText: e.target.value });
                                setPreviewKey(prev => prev + 1);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Borda Arredondada</label>
                            <select
                              value={popupCampaign.roundedBorder}
                              onChange={(e) => {
                                setPopupCampaign({ ...popupCampaign, roundedBorder: e.target.value as any });
                                setPreviewKey(prev => prev + 1);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="none">Reta (Sem Borda)</option>
                              <option value="md">Suave (md)</option>
                              <option value="xl">Moderna (xl)</option>
                              <option value="3xl">Arredondada (3xl)</option>
                              <option value="full">Pílula (full)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Link de Destino / Redirecionamento</label>
                          <input 
                            type="text"
                            value={popupCampaign.buttonLink}
                            onChange={(e) => {
                              setPopupCampaign({ ...popupCampaign, buttonLink: e.target.value });
                              setPreviewKey(prev => prev + 1);
                            }}
                            className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Cor do Botão</label>
                            <div className="flex gap-2 items-center">
                              <input 
                                type="color"
                                value={popupCampaign.buttonColor}
                                onChange={(e) => {
                                  setPopupCampaign({ ...popupCampaign, buttonColor: e.target.value });
                                  setPreviewKey(prev => prev + 1);
                                }}
                                className="w-8 h-8 rounded border border-gray-200 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                              />
                              <input 
                                type="text"
                                value={popupCampaign.buttonColor}
                                onChange={(e) => {
                                  setPopupCampaign({ ...popupCampaign, buttonColor: e.target.value });
                                  setPreviewKey(prev => prev + 1);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary uppercase font-mono"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Cor do Texto do Botão</label>
                            <div className="flex gap-2 items-center">
                              <input 
                                type="color"
                                value={popupCampaign.buttonTextColor}
                                onChange={(e) => {
                                  setPopupCampaign({ ...popupCampaign, buttonTextColor: e.target.value });
                                  setPreviewKey(prev => prev + 1);
                                }}
                                className="w-8 h-8 rounded border border-gray-200 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                              />
                              <input 
                                type="text"
                                value={popupCampaign.buttonTextColor}
                                onChange={(e) => {
                                  setPopupCampaign({ ...popupCampaign, buttonTextColor: e.target.value });
                                  setPreviewKey(prev => prev + 1);
                                }}
                                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary uppercase font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Backdrop & Styling */}
                      <div className="bg-slate-50 dark:bg-neutral-900 border border-gray-150 dark:border-dark-border p-4 rounded-xl space-y-3">
                        <label className="font-black text-xs text-brown-dark dark:text-white uppercase tracking-wider block pb-1 border-b border-gray-150 dark:border-dark-border">Estilo & Animações</label>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Tipo de Fundo</label>
                            <select
                              value={popupCampaign.bgType}
                              onChange={(e) => {
                                setPopupCampaign({ ...popupCampaign, bgType: e.target.value as any });
                                setPreviewKey(prev => prev + 1);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="flat">Fundo Sólido</option>
                              <option value="gradient">Fundo Gradiente</option>
                              <option value="glass">Vidro Fosco (Glassmorphism)</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Animação de Entrada</label>
                            <select
                              value={popupCampaign.animation}
                              onChange={(e) => {
                                setPopupCampaign({ ...popupCampaign, animation: e.target.value as any });
                                setPreviewKey(prev => prev + 1);
                              }}
                              className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="fade">Fade-In Suave</option>
                              <option value="slide-up">Deslizar p/ Cima (Slide-Up)</option>
                              <option value="zoom">Zoom In</option>
                              <option value="bounce">Bounce Elástico</option>
                            </select>
                          </div>
                        </div>

                        {popupCampaign.bgType !== "glass" && (
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Cor do Fundo 1</label>
                              <div className="flex gap-2 items-center">
                                <input 
                                  type="color"
                                  value={popupCampaign.bgColor1}
                                  onChange={(e) => {
                                    setPopupCampaign({ ...popupCampaign, bgColor1: e.target.value });
                                    setPreviewKey(prev => prev + 1);
                                  }}
                                  className="w-8 h-8 rounded border border-gray-200 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                                />
                                <input 
                                  type="text"
                                  value={popupCampaign.bgColor1}
                                  onChange={(e) => {
                                    setPopupCampaign({ ...popupCampaign, bgColor1: e.target.value });
                                    setPreviewKey(prev => prev + 1);
                                  }}
                                  className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary uppercase font-mono"
                                />
                              </div>
                            </div>
                            {popupCampaign.bgType === "gradient" && (
                              <div className="space-y-1">
                                <label className="font-bold text-gray-900 dark:text-gray-100 font-medium uppercase tracking-wider text-[9px]">Cor do Fundo 2</label>
                                <div className="flex gap-2 items-center">
                                  <input 
                                    type="color"
                                    value={popupCampaign.bgColor2}
                                    onChange={(e) => {
                                      setPopupCampaign({ ...popupCampaign, bgColor2: e.target.value });
                                      setPreviewKey(prev => prev + 1);
                                    }}
                                    className="w-8 h-8 rounded border border-gray-200 dark:border-neutral-700 p-0 cursor-pointer shrink-0"
                                  />
                                  <input 
                                    type="text"
                                    value={popupCampaign.bgColor2}
                                    onChange={(e) => {
                                      setPopupCampaign({ ...popupCampaign, bgColor2: e.target.value });
                                      setPreviewKey(prev => prev + 1);
                                    }}
                                    className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary uppercase font-mono"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer of panel */}
                    <div>
                      <button
                        onClick={() => handleSavePopupCampaign(popupCampaign)}
                        className="w-full bg-primary hover:bg-primary-hover text-brown-dark py-4 rounded-xl font-display font-black text-xs shadow-md transition active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        💾 SALVAR E PUBLICAR CAMPANHA
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Interactive Preview */}
                  <div className="xl:col-span-7 bg-slate-100 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-xl shadow-sm flex flex-col h-[750px] items-center justify-center p-6 relative overflow-hidden transition-colors">
                    
                    {/* Live Preview badge */}
                    <div className="absolute top-4 left-4 z-40 bg-brown-dark text-primary border border-primary/20 text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      PREVIEW EM TEMPO REAL
                    </div>

                    {/* Replay action */}
                    <button
                      onClick={() => setPreviewKey(prev => prev + 1)}
                      className="absolute top-4 right-4 z-40 bg-white/90 dark:bg-dark-surface/90 hover:bg-white dark:hover:bg-dark-surface border border-gray-200 dark:border-dark-border text-brown-dark dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition active:scale-95"
                    >
                      🔄 Replay da Animação
                    </button>

                    {/* Simulated website backdrop components */}
                    <div className="absolute inset-0 z-0 flex flex-col p-8 select-none pointer-events-none opacity-30 filter blur-[2px]">
                      {/* Header mock */}
                      <div className="flex justify-between items-center border-b border-gray-300 dark:border-neutral-700 pb-3 mb-6">
                        <div className="w-24 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
                        <div className="flex gap-4">
                          <div className="w-10 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-10 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-10 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                        </div>
                      </div>
                      {/* Grid cards mock */}
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="bg-gray-200 dark:bg-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                          <div className="w-full h-24 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-2/3 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-1/2 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                        </div>
                        <div className="bg-gray-200 dark:bg-neutral-800 rounded-xl p-4 flex flex-col gap-2">
                          <div className="w-full h-24 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-2/3 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
                          <div className="w-1/2 h-3 bg-gray-300 dark:bg-neutral-700 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Dark mask filter */}
                    <div className="absolute inset-0 bg-black/55 z-10" />

                    {/* Interactive Animated Card */}
                    <div className="relative z-20 w-full max-w-[450px] px-4">
                      
                      {/* Key dynamic keyframes inside preview */}
                      <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes previewFadeIn {
                          from { opacity: 0; }
                          to { opacity: 1; }
                        }
                        @keyframes previewSlideUp {
                          from { opacity: 0; transform: translateY(80px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes previewZoomIn {
                          from { opacity: 0; transform: scale(0.85); }
                          to { opacity: 1; transform: scale(1); }
                        }
                        @keyframes previewBounceIn {
                          0% { opacity: 0; transform: translateY(-100px) scale(0.9); }
                          50% { opacity: 0.95; transform: translateY(8px) scale(1.02); }
                          75% { transform: translateY(-3px) scale(0.99); }
                          100% { opacity: 1; transform: translateY(0) scale(1); }
                        }
                      `}} />

                      {/* Card Body */}
                      <div
                        key={previewKey}
                        style={{
                          ...(popupCampaign.bgType === "flat" ? { backgroundColor: popupCampaign.bgColor1 || "#3E2723" } : {}),
                          ...(popupCampaign.bgType === "gradient" ? { background: `linear-gradient(135deg, ${popupCampaign.bgColor1 || "#3E2723"} 0%, ${popupCampaign.bgColor2 || "#1E0F0B"} 100%)` } : {}),
                          ...(popupCampaign.bgType === "glass" ? {
                            background: "rgba(62, 39, 35, 0.7)",
                            backdropFilter: "blur(15px)",
                            WebkitBackdropFilter: "blur(15px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4)",
                          } : {}),
                          animation: popupCampaign.animation === "fade" ? "previewFadeIn 0.4s ease-out forwards" :
                                     popupCampaign.animation === "slide-up" ? "previewSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards" :
                                     popupCampaign.animation === "zoom" ? "previewZoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" :
                                     "previewBounceIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 1.3) forwards"
                        }}
                        className={`w-full shadow-2xl relative border border-white/5 overflow-hidden text-white ${
                          popupCampaign.roundedBorder === "none" ? "rounded-none" :
                          popupCampaign.roundedBorder === "md" ? "rounded-md" :
                          popupCampaign.roundedBorder === "xl" ? "rounded-xl" :
                          popupCampaign.roundedBorder === "3xl" ? "rounded-3xl" :
                          popupCampaign.roundedBorder === "full" ? "rounded-[1.8rem]" : "rounded-xl"
                        }`}
                      >
                        {/* Close button mock */}
                        <div className="absolute top-3.5 right-3.5 bg-black/40 text-white/80 p-1.5 rounded-full border border-white/10 cursor-pointer">
                          <X className="h-3.5 w-3.5" />
                        </div>

                        {/* Flyer Image Preview */}
                        {popupCampaign.flyerImage && (
                          <div className="w-full relative h-[190px] bg-neutral-900 flex items-center justify-center overflow-hidden">
                            <img 
                              src={popupCampaign.flyerImage} 
                              alt="Flyer Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>
                        )}

                        {/* Card text and button contents */}
                        <div className="p-5 space-y-3.5 text-left">
                          <div className="space-y-1">
                            <span className="bg-primary/20 text-primary border border-primary/35 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block">
                              ⚡ Oferta Exclusiva
                            </span>
                            <h4 className="font-display font-black text-base text-white tracking-tight leading-tight uppercase">
                              {popupCampaign.title || "Oferta Especial!"}
                            </h4>
                          </div>
                          <p className="text-[11px] text-gray-200 leading-relaxed font-sans font-medium line-clamp-3 font-semibold">
                            {popupCampaign.description}
                          </p>

                          {popupCampaign.buttonText && (
                            <div className="pt-1.5">
                              <div
                                style={{
                                  backgroundColor: popupCampaign.buttonColor || "#F4B400",
                                  color: popupCampaign.buttonTextColor || "#3E2723",
                                }}
                                className={`w-full py-2.5 px-4 font-display font-black text-[11px] shadow hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider ${
                                  popupCampaign.roundedBorder === "full" ? "rounded-full" :
                                  popupCampaign.roundedBorder === "none" ? "rounded-none" :
                                  popupCampaign.roundedBorder === "md" ? "rounded-md" :
                                  popupCampaign.roundedBorder === "xl" ? "rounded-xl" :
                                  popupCampaign.roundedBorder === "3xl" ? "rounded-3xl" : "rounded-xl"
                                }`}
                              >
                                {popupCampaign.buttonText}
                                <svg className="h-3.5 w-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Trigger details label */}
                    <div className="absolute bottom-4 left-4 z-20 text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-black/30 px-3 py-1 rounded border border-white/5 flex gap-2">
                      <span>Gatilho: <strong className="text-primary">{popupCampaign.triggerType.toUpperCase()}</strong></span>
                      {popupCampaign.triggerType !== "exit-intent" && (
                        <span>Valor: <strong className="text-primary">{popupCampaign.triggerValue}</strong></span>
                      )}
                      <span>Destino: <strong className="text-primary">{popupCampaign.targetPage.toUpperCase()}</strong></span>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* Gerenciamento de Vendedores Tab */}
            {adminTab === "vendedores" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-6 rounded-xl shadow-sm transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <span className="text-primary text-2xl">👤</span> CADASTRO E CONTROLE DE VENDEDORES
                    </h4>
                    <p className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-1">
                      Adicione ou remova membros da equipe de vendas. A distribuição de orçamentos (leads) é feita ciclicamente (Round-Robin) de maneira justa e igualitária.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form Card */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-4 h-fit transition-colors">
                    <h5 className="font-display font-black text-sm text-brown-dark dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-dark-border pb-3 flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-primary" /> Novo Vendedor
                    </h5>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newSellerName.trim()) {
                        showToast("Por favor, informe o nome do vendedor.", "error");
                        return;
                      }
                      if (!newSellerPhone.trim()) {
                        showToast("Por favor, informe o telefone do vendedor.", "error");
                        return;
                      }

                      const newId = newSellerName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
                      const newSellerObj = {
                        id: newId,
                        name: newSellerName.trim(),
                        commissionRate: parseFloat(newSellerCommission) / 100 || 0.03,
                        salesCount: 0,
                        salesValue: 0.00,
                        activeLeads: 0,
                        goal: parseFloat(newSellerGoal) || 30000.00,
                        avatar: newSellerAvatar || "👨‍💼",
                        photoUrl: newSellerPhotoUrl || undefined,
                        phone: newSellerPhone.trim().replace(/\D/g, "")
                      };

                      const nextSellers = [...sellers, newSellerObj];
                      updateSellers(nextSellers);
                      showToast(`👤 Vendedor ${newSellerName} cadastrado com sucesso!`);
                      setNewSellerName("");
                      setNewSellerAvatar("👨‍💼");
                      setNewSellerPhone("");
                      setNewSellerPhotoUrl("");
                    }} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Nome Completo</label>
                        <input
                          type="text"
                          value={newSellerName}
                          onChange={(e) => setNewSellerName(e.target.value)}
                          placeholder="Ex: Marcelo Santos"
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">WhatsApp / Telefone Comercial</label>
                        <input
                          type="text"
                          value={newSellerPhone}
                          onChange={(e) => setNewSellerPhone(e.target.value)}
                          placeholder="Ex: 79999998888"
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Foto de Perfil (Upload / Opcional)</label>
                        {newSellerPhotoUrl ? (
                          <div className="flex items-center gap-3 bg-slate-50 dark:bg-neutral-900 p-2 rounded-xl border">
                            <img src={newSellerPhotoUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover border" />
                            <span className="text-[10px] font-bold text-emerald-600">Foto Carregada</span>
                            <button
                              type="button"
                              onClick={() => setNewSellerPhotoUrl("")}
                              className="ml-auto text-xs text-red-500 hover:underline font-bold"
                            >
                              Remover
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewSellerPhotoUrl(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3 py-1.5 text-xs cursor-pointer text-gray-500"
                          />
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Avatar / Emoji Backup</label>
                        <select
                          value={newSellerAvatar}
                          onChange={(e) => setNewSellerAvatar(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition cursor-pointer"
                        >
                          <option value="👨‍💼">👨‍💼 Homem de Terno</option>
                          <option value="👩‍💼">👩‍💼 Mulher de Terno</option>
                          <option value="👨‍💻">👨‍💻 Homem Programador/Tech</option>
                          <option value="👩‍💻">👩‍💻 Mulher Programadora/Tech</option>
                          <option value="👨‍🎨">👨‍🎨 Homem Artista</option>
                          <option value="👩‍🎨">👩‍🎨 Mulher Artista</option>
                          <option value="👤">👤 Perfil Neutro</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs py-2.5 rounded-full shadow-md transition whitespace-nowrap active:scale-95 cursor-pointer mt-2"
                      >
                        Cadastrar Vendedor
                      </button>
                    </form>
                  </div>

                  {/* Sellers List Card */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-4 lg:col-span-2 transition-colors">
                    <h5 className="font-display font-black text-sm text-brown-dark dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-dark-border pb-3">
                      Equipe de Vendas Ativa ({sellers.length})
                    </h5>

                    {sellers.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-gray-200 dark:border-dark-border rounded-xl text-gray-500">
                        Nenhum vendedor cadastrado. Cadastre um vendedor para ativar a fila cíclica!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sellers.map((seller) => {
                          return (
                            <div
                              key={seller.id}
                              className="border border-gray-200 dark:border-dark-border bg-slate-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 shadow-2xs hover:shadow-sm transition relative overflow-hidden group"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  {seller.photoUrl ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0 shadow-2xs">
                                      <img src={seller.photoUrl} alt={seller.name} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <span className="text-3xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-full w-12 h-12 flex items-center justify-center shadow-2xs shrink-0">
                                      {seller.avatar || "👤"}
                                    </span>
                                  )}
                                  <div>
                                    <h6 className="font-display font-bold text-sm text-brown-dark dark:text-white leading-snug">{seller.name}</h6>
                                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                                      WhatsApp: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{seller.phone}</strong>
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <label className="text-[10px] bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-stone-700 dark:text-stone-300 p-1.5 rounded cursor-pointer font-bold" title="Alterar Foto">
                                    📷
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const reader = new FileReader();
                                          reader.onloadend = () => {
                                            const updated = sellers.map(s => s.id === seller.id ? { ...s, photoUrl: reader.result as string } : s);
                                            updateSellers(updated);
                                            showToast(`📷 Foto de ${seller.name} atualizada!`);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>

                                  {seller.photoUrl && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = sellers.map(s => s.id === seller.id ? { ...s, photoUrl: undefined } : s);
                                        updateSellers(updated);
                                        showToast(`📷 Foto de ${seller.name} removida.`);
                                      }}
                                      className="text-[10px] bg-red-100 hover:bg-red-200 dark:bg-red-950/40 text-red-600 p-1.5 rounded font-bold cursor-pointer"
                                      title="Remover Foto"
                                    >
                                      ✖
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Deseja realmente remover o vendedor ${seller.name}? Ele não receberá mais novos orçamentos.`)) {
                                        const nextSellers = sellers.filter(s => s.id !== seller.id);
                                        updateSellers(nextSellers);
                                        showToast(`👤 Vendedor ${seller.name} removido com sucesso!`);
                                      }
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded cursor-pointer"
                                    title="Remover Vendedor"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>

                              <div className="border-t border-gray-200/50 dark:border-dark-border/40 pt-2.5 grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                                <div>
                                  <span>Vendas Concluídas</span>
                                  <p className="font-black text-brown-dark dark:text-white text-xs mt-0.5">{seller.salesCount || 0}</p>
                                </div>
                                <div>
                                  <span>Faturamento Acumulado</span>
                                  <p className="font-black text-emerald-600 dark:text-emerald-400 text-xs mt-0.5">R$ {(seller.salesValue || 0).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* Gerenciamento de Cupons Tab */}
            {adminTab === "cupons" && (
              <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-6 rounded-xl shadow-sm transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase tracking-tight flex items-center gap-2">
                      <span className="text-primary text-2xl">🎟️</span> CUPONS DE DESCONTO
                    </h4>
                    <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">
                      Crie, gerencie e exclua cupons de desconto para a loja. Configure valores mínimos e limites de abatimento.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form Card */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-4 h-fit transition-colors">
                    <h5 className="font-display font-black text-sm text-brown-dark dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-dark-border pb-3 flex items-center gap-1.5">
                      <Plus className="h-4 w-4 text-primary" /> Novo Cupom
                    </h5>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newCouponCode.trim()) {
                        showToast("Informe o código do cupom.", "error");
                        return;
                      }
                      const valNum = parseFloat(newCouponValue);
                      if (isNaN(valNum) || valNum <= 0) {
                        showToast("O valor do desconto deve ser positivo.", "error");
                        return;
                      }
                      if (newCouponType === "percentage" && valNum > 100) {
                        showToast("O desconto percentual não pode ser maior que 100%.", "error");
                        return;
                      }
                      const minNum = parseFloat(newCouponMinPurchase);
                      if (isNaN(minNum) || minNum < 0) {
                        showToast("O valor mínimo deve ser maior ou igual a zero.", "error");
                        return;
                      }

                      const cleanCode = newCouponCode.trim().toUpperCase().replace(/\s+/g, "");
                      if (coupons.some(c => c.code === cleanCode)) {
                        showToast("Já existe um cupom cadastrado com este código.", "error");
                        return;
                      }

                      const newCouponObj = {
                        id: `coupon-${Date.now()}`,
                        code: cleanCode,
                        type: newCouponType,
                        value: valNum,
                        minPurchase: minNum,
                        applicableProducts: selectedCouponProducts,
                        applicableCategories: selectedCouponCategories,
                        active: true
                      };

                      updateCoupons([...coupons, newCouponObj]);
                      showToast(`🎟️ Cupom ${cleanCode} cadastrado com sucesso!`);
                      setNewCouponCode("");
                      setNewCouponValue("10");
                      setNewCouponMinPurchase("0");
                      setSelectedCouponProducts([]);
                      setSelectedCouponCategories([]);
                    }} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Código do Cupom</label>
                        <input
                          type="text"
                          value={newCouponCode}
                          onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                          placeholder="Ex: QUERO10"
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Tipo de Desconto</label>
                        <select
                          value={newCouponType}
                          onChange={(e) => {
                            setNewCouponType(e.target.value);
                            setNewCouponValue(e.target.value === "percentage" ? "10" : "50");
                          }}
                          className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition cursor-pointer font-bold"
                        >
                          <option value="percentage">Porcentagem (%)</option>
                          <option value="fixed">Valor Fixo (R$)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                            {newCouponType === "percentage" ? "Desconto (%)" : "Desconto (R$)"}
                          </label>
                          <input
                            type="number"
                            step={newCouponType === "percentage" ? "1" : "0.01"}
                            value={newCouponValue}
                            onChange={(e) => setNewCouponValue(e.target.value)}
                            placeholder={newCouponType === "percentage" ? "Ex: 10" : "Ex: 50.00"}
                            className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Compra Mínima (R$)</label>
                          <input
                            type="number"
                            value={newCouponMinPurchase}
                            onChange={(e) => setNewCouponMinPurchase(e.target.value)}
                            placeholder="Ex: 500"
                            className="w-full bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-dark-border rounded-lg px-3.5 py-2 text-xs text-brown-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition font-bold"
                          />
                        </div>
                      </div>

                      {/* Applicable Categories (Checkboxes) */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Categorias Elegíveis (Opcional)</label>
                        <div className="max-h-24 overflow-y-auto border border-gray-200 dark:border-dark-border rounded-lg p-2 bg-slate-50 dark:bg-neutral-900 space-y-1.5 scrollbar-thin">
                          {categories.map((cat) => {
                            const isChecked = selectedCouponCategories.includes(cat.id);
                            return (
                              <label key={cat.id} className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCouponCategories([...selectedCouponCategories, cat.id]);
                                    } else {
                                      setSelectedCouponCategories(selectedCouponCategories.filter(id => id !== cat.id));
                                    }
                                  }}
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                />
                                <span>{cat.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Applicable Products (Checkboxes) */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Produtos Elegíveis (Opcional)</label>
                        <div className="max-h-24 overflow-y-auto border border-gray-200 dark:border-dark-border rounded-lg p-2 bg-slate-50 dark:bg-neutral-900 space-y-1.5 scrollbar-thin">
                          {products.map((prod) => {
                            const isChecked = selectedCouponProducts.includes(prod.id);
                            return (
                              <label key={prod.id} className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCouponProducts([...selectedCouponProducts, prod.id]);
                                    } else {
                                      setSelectedCouponProducts(selectedCouponProducts.filter(id => id !== prod.id));
                                    }
                                  }}
                                  className="rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                />
                                <span className="line-clamp-1">{prod.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs py-2.5 rounded-full shadow-md transition whitespace-nowrap active:scale-95 cursor-pointer mt-2"
                      >
                        Criar Cupom de Desconto
                      </button>
                    </form>

                  </div>

                  {/* Coupons List Card */}
                  <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-6 space-y-4 lg:col-span-2 transition-colors">
                    <h5 className="font-display font-black text-sm text-brown-dark dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-dark-border pb-3">
                      Cupons Ativos ({coupons.length})
                    </h5>

                    {coupons.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-gray-200 dark:border-dark-border rounded-xl text-gray-500 text-xs">
                        Nenhum cupom cadastrado. Crie um cupom para disponibilizar na loja!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            className={`border bg-slate-50 dark:bg-neutral-900 rounded-xl p-4 space-y-3 shadow-2xs hover:shadow-sm transition relative overflow-hidden group ${
                              coupon.active ? "border-gray-200 dark:border-dark-border" : "border-gray-200/50 dark:border-dark-border/50 opacity-60"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-full w-10 h-10 flex items-center justify-center shadow-2xs">
                                  🎟️
                                </span>
                                <div>
                                  <h6 className="font-display font-black text-sm text-brown-dark dark:text-white leading-snug tracking-wider">{coupon.code}</h6>
                                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                                    Valor: <strong className="text-brown-medium dark:text-primary">{coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`} OFF</strong>
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {/* Toggle Active Button */}
                                <button
                                  onClick={() => {
                                    const updated = coupons.map(c => c.id === coupon.id ? { ...c, active: !c.active } : c);
                                    updateCoupons(updated);
                                    showToast(`🎟️ Status do cupom ${coupon.code} alterado!`);
                                  }}
                                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded cursor-pointer transition ${
                                    coupon.active 
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/20 dark:text-emerald-400" 
                                      : "bg-gray-100 text-gray-600 border border-gray-300 dark:bg-neutral-850 dark:text-gray-400"
                                  }`}
                                  title={coupon.active ? "Desativar Cupom" : "Ativar Cupom"}
                                >
                                  {coupon.active ? "Ativo" : "Inativo"}
                                </button>
                                
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Deseja realmente excluir o cupom ${coupon.code}?`)) {
                                      updateCoupons(coupons.filter(c => c.id !== coupon.id));
                                      showToast(`🎟️ Cupom ${coupon.code} removido!`);
                                    }
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded cursor-pointer"
                                  title="Remover Cupom"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="border-t border-gray-200/50 dark:border-dark-border/40 pt-2.5 text-[10px] text-gray-550 space-y-1">
                              <div className="flex justify-between">
                                <span>Compra Mínima:</span>
                                <span className="font-bold text-brown-dark dark:text-white">
                                  {coupon.minPurchase > 0 ? `R$ ${coupon.minPurchase.toFixed(2)}` : "Sem mínimo"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tipo de Desconto:</span>
                                <span className="font-bold text-brown-dark dark:text-white uppercase text-[9px]">
                                  {coupon.type === "percentage" ? "Percentual" : "Fixo em Dinheiro"}
                                </span>
                              </div>
                              {((coupon.applicableProducts && coupon.applicableProducts.length > 0) || (coupon.applicableCategories && coupon.applicableCategories.length > 0)) && (
                                <div className="border-t border-dashed border-gray-250/50 dark:border-dark-border/40 pt-2 mt-2 space-y-1">
                                  <span className="text-[8px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-widest block">Restrições</span>
                                  {coupon.applicableCategories && coupon.applicableCategories.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded font-bold">
                                        📁 Categorias: {coupon.applicableCategories.map((c: string) => categories.find(cat => cat.id === c)?.name || c).join(", ")}
                                      </span>
                                    </div>
                                  )}
                                  {coupon.applicableProducts && coupon.applicableProducts.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded font-bold line-clamp-1">
                                        📦 Produtos: {coupon.applicableProducts.map((pid: number) => products.find(p => p.id === pid)?.name || pid).join(", ")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}



            {/* Global Admin Premium Toast */}
            {adminToast && (
              <div className={`fixed bottom-6 right-6 z-[99999] px-5 py-4 rounded-xl shadow-2xl border text-xs font-black transition-all flex items-center gap-2 animate-bounce ${
                adminToast.type === "success" 
                  ? "bg-emerald-600 text-white border-emerald-500" 
                  : "bg-red-600 text-white border-red-500"
              }`}>
                {adminToast.message}
              </div>
            )}

          </main>
        </div>
      )}

      {/* ==========================================
          SELLER / SALES REPRESENTATIVE PERSPECTIVE
          ========================================== */}
      {viewMode === "seller" && (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-dark-bg md:flex-row transition-colors no-print">
          
          {/* Side Menu vendedor */}
          <aside className="w-full md:w-64 bg-brown-dark text-white p-4 space-y-4 md:sticky md:top-11 md:h-[calc(100vh-44px)] flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="bg-primary text-brown-dark rounded w-8 h-8 flex items-center justify-center font-bold text-sm">💼</span>
                <div>
                  <h4 className="font-display font-black text-sm tracking-tight text-white leading-tight">PAINEL COMERCIAL</h4>
                  <p className="text-[9px] text-primary tracking-widest font-black uppercase -mt-0.5">Vendedores</p>
                </div>
              </div>

              {/* Salesman selector */}
              <div className="space-y-1">
                <label className="text-[9px] font-black tracking-widest text-primary uppercase block">Selecionar Perfil Vendedor</label>
                <select
                  value={activeSellerId}
                  onChange={(e) => { setActiveSellerId(e.target.value); setSelectedSellerLead(null); }}
                  className="w-full bg-brown-medium text-white font-bold border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {sellers.map(s => <option key={s.id} value={s.id}>{s.avatar} {s.name}</option>)}
                </select>
              </div>

              <div className="border-t border-white/15 pt-3 space-y-2 text-xs">
                <p className="text-[9px] font-black tracking-widest text-primary uppercase block">Minhas Estatísticas</p>
                <div className="flex justify-between">
                  <span className="text-gray-300">Vendas do Mês:</span>
                  <span className="font-bold">{activeSeller.salesCount} fechadas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Valor Acumulado:</span>
                  <span className="font-bold text-primary">R$ {activeSeller.salesValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Comissão ({(activeSeller.commissionRate*100).toFixed(1)}%):</span>
                  <span className="font-bold text-emerald-400">R$ {(activeSeller.salesValue * activeSeller.commissionRate).toFixed(2)}</span>
                </div>
              </div>

              {/* Monthly Goal gauge progress */}
              <div className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-2">
                <div className="flex justify-between text-[10px] font-black text-primary">
                  <span>META MENSAL</span>
                  <span>{sellerProgressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${sellerProgressPercent}%` }} />
                </div>
                <div className="flex justify-between text-[9px] text-gray-400">
                  <span>R$ {activeSeller.salesValue.toFixed(2)}</span>
                  <span>R$ {(activeSeller.goal || 30000).toFixed(0)}</span>
                </div>
              </div>
            </div>



            {/* Seller Leaderboard Ranking */}
            <div className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-2 text-xs">
              <span className="text-[9px] font-black tracking-widest text-primary uppercase block">🏆 Ranking Geral de Vendas</span>
              <div className="space-y-1.5">
                {sellers.sort((a, b) => b.salesValue - a.salesValue).map((s, idx) => (
                  <div key={s.id} className={`flex justify-between items-center px-1.5 py-1 rounded text-[11px] ${s.id === activeSellerId ? "bg-primary text-brown-dark font-bold shadow-xs" : "text-gray-300"}`}>
                    <span className="flex items-center gap-1.5">
                      <span>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</span>
                      <span>{s.name.split(" ")[0]}</span>
                    </span>
                    <span>R$ {s.salesValue.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Seller Main Cockpit */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            
            {/* Seller lead inbox list */}
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl shadow-sm p-5 space-y-5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-dark-border pb-4">
                <div>
                  <h4 className="font-display font-black text-base text-brown-dark dark:text-white uppercase">FUNDO COMERCIAL - ORÇAMENTOS E LEADS</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Todos os vendedores possuem acesso aos orçamentos. Filtre se desejar focar apenas nos seus.</p>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-neutral-850 px-3.5 py-2 rounded-lg border border-gray-200 dark:border-dark-border select-none shadow-2xs">
                  <input 
                    type="checkbox"
                    checked={onlyMyLeadsFilter}
                    onChange={(e) => setOnlyMyLeadsFilter(e.target.checked)}
                    className="rounded border-gray-300 dark:border-dark-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Apenas meus leads atribuídos</span>
                </label>
              </div>

              {sellerLeads.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-gray-200 rounded-xl text-gray-500">
                  {onlyMyLeadsFilter 
                    ? "Nenhum lead atribuído para o seu perfil no momento. Tente desativar o filtro acima para ver todos os orçamentos!" 
                    : "Nenhum lead registrado no sistema. Envie orçamentos através do site do cliente para iniciar a fila!"
                  }
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sellerLeads.map((lead, i) => (
                    <div 
                      key={i} 
                      className={`border rounded-xl p-4 flex flex-col justify-between gap-4 transition shadow-xs hover:shadow-lg ${selectedSellerLead?.id === lead.id ? "bg-amber-50/40 dark:bg-amber-950/10 border-primary" : "bg-slate-50 dark:bg-neutral-900 border-gray-200 dark:border-dark-border"}`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-sm text-brown-dark dark:text-white">{lead.name}</h5>
                            <span className="text-[10px] text-gray-400">{lead.location}</span>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={`font-black text-[9px] px-2 py-0.5 rounded uppercase ${
                              lead.status === "Venda Fechada" ? "bg-emerald-100 text-emerald-800" :
                              lead.status === "Venda Perdida" ? "bg-red-100 text-red-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {lead.status}
                            </span>
                            {/* Seller Tag */}
                            {(() => {
                              const s = sellers.find(sel => sel.id === lead.sellerId);
                              const isMine = lead.sellerId === activeSellerId;
                              return (
                                <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[9px] border ${
                                  isMine 
                                    ? "bg-primary/20 text-brown-dark dark:text-primary border-primary/30" 
                                    : "bg-gray-100 dark:bg-neutral-850 text-gray-500 dark:text-gray-450 border-gray-200 dark:border-dark-border"
                                }`}>
                                  <span>{s?.avatar || "👤"}</span>
                                  <span>{s?.name.split(" ")[0] || lead.sellerId}</span>
                                </span>
                              );
                            })()}
                          </div>
                        </div>

                        <p className="text-xs text-gray-550 dark:text-gray-400">
                          Produtos: <strong className="text-brown-medium dark:text-primary">{lead.products.join(", ")}</strong>
                        </p>
                        <div className="text-[10px] text-gray-450 dark:text-gray-500">
                          📞 Telefone: {lead.phone} | UTM: {lead.source}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-200/50 dark:border-dark-border">
                        <span className="font-black text-brown-medium dark:text-primary text-sm">R$ {lead.total.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              trackClick(`seller-contact-${lead.id}`);
                              window.open(`https://api.whatsapp.com/send?phone=55${lead.phone}&text=Olá+${lead.name}%21+Aqui+é+o+vendedor+${activeSeller.name.split(" ")[0]}+da+Só+Madeiras.+Estou+com+seu+carrinho+de+orçamento+pronto+aqui%21`, "_blank");
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded shadow flex items-center gap-1 transition active:scale-95 cursor-pointer"
                          >
                            <Phone className="h-3.5 w-3.5" /> Chamar
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSellerLead(lead);
                              setSellerInvoicePDFOpen(true);
                              trackClick(`seller-btn-pdf-${lead.id}`);
                            }}
                            className="bg-primary hover:bg-primary-hover text-brown-dark text-xs font-black px-3 py-1.5 rounded shadow flex items-center gap-1 transition active:scale-95"
                          >
                            <FileText className="h-3.5 w-3.5" /> Gerar PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick manual budget builder for salesperson */}
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-5 space-y-4 shadow-sm transition-colors">
              <h4 className="font-display font-black text-sm uppercase tracking-tight text-brown-medium dark:text-primary flex items-center gap-1.5">
                <Plus className="h-5 w-5" /> CRIAR NOVO ORÇAMENTO AVULSO MANUAL
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">Monte um faturamento rápido direto do estoque para clientes de balcão e imprima em PDF.</p>
              
              <button
                onClick={() => {
                  const clientName = prompt("Nome do Cliente:");
                  const clientPhone = prompt("Celular WhatsApp:");
                  const clientCity = prompt("Cidade/Estado:");
                  if (!clientName || !clientPhone || !clientCity) return;
                  
                  const pSel = products[0];
                  const newL = {
                    id: `lead-avulso-${Date.now()}`,
                    name: clientName,
                    phone: clientPhone,
                    city: clientCity.split("/")[0],
                    state: clientCity.split("/")[1] || "SP",
                    date: new Date().toISOString().split("T")[0],
                    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                    source: "Orçamento de Balcão",
                    utm: "Faturamento Físico / Telefone",
                    products: [`${pSel.name} x 1`],
                    total: pSel.price,
                    status: "Em Atendimento",
                    sellerId: activeSeller.id,
                    device: "Balcão Presencial",
                    location: clientCity,
                    notes: "Orçamento emitido manualmente na loja física."
                  };
                  updateLeads([newL, ...leads]);
                  setSelectedSellerLead(newL);
                  setSellerInvoicePDFOpen(true);
                }}
                className="bg-brown-medium hover:bg-brown-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md transition active:scale-95"
              >
                + Iniciar Cotação Balcão
              </button>
            </div>

          </main>
        </div>
      )}

      {/* ==========================================
          TIMBRED PRINTABLE BUSINESS INVOICE PDF OVERLAY
          ========================================== */}
      {sellerInvoicePDFOpen && selectedSellerLead && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[999] animate-fade-in print:bg-white print:absolute print:inset-0">
          
          {/* Printable Layout Wrapper */}
          <div className="bg-white text-brown-dark max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh] border border-gray-200 print:border-none print:shadow-none print:max-h-full print:rounded-none dark:text-white">
            
            {/* Top action header for seller */}
            <div className="bg-brown-dark text-white p-4 flex justify-between items-center no-print">
              <span className="font-black text-xs text-primary flex items-center gap-1">
                <FileText className="h-4 w-4 text-primary" /> GERADOR DE ORÇAMENTOS E PDF
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-primary text-brown-dark font-black text-xs px-3.5 py-1.5 rounded flex items-center gap-1 hover:bg-primary-hover shadow transition active:scale-95"
                >
                  <Printer className="h-3.5 w-3.5" /> Imprimir / Salvar PDF
                </button>
                <button
                  onClick={() => {
                    const closingMsg = `Olá *${selectedSellerLead.name}*! Aqui é o vendedor da Só Madeiras.\n\nEstou lhe enviando seu orçamento oficial timbrado em PDF de *R$ ${selectedSellerLead.total.toFixed(2)}* com frete garantido! Vamos agendar a entrega?`;
                    window.open(`https://api.whatsapp.com/send?phone=55${selectedSellerLead.phone}&text=${encodeURIComponent(closingMsg)}`, "_blank");
                    handleUpdateLeadStatus(selectedSellerLead.id, "Venda Fechada");
                    setSellerInvoicePDFOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded flex items-center gap-1 shadow transition active:scale-95 cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" /> Enviar PDF por WhatsApp
                </button>
                <button
                  onClick={() => { setSellerInvoicePDFOpen(false); setSelectedSellerLead(null); }}
                  className="p-1 text-gray-300 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PRINT AREA TARGETED BY CSS */}
            <div id="print-area" className="p-8 space-y-6 overflow-y-auto flex-1 bg-white text-neutral-800">
              
              {/* TIMBRED HEADER LETTERHEAD */}
              <div className="flex justify-between items-start border-b-4 border-amber-500 pb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border border-black shadow">🪵</div>
                  <div>
                    <h2 className="font-display font-black text-xl text-brown-dark tracking-tight uppercase leading-none dark:text-white">SÓ MADEIRAS</h2>
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mt-0.5">Comércio de Materiais de Construção LTDA</span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">Av. das Palmeiras, 1500 - Campinas/SP | CNPJ: 00.000.000/0001-00</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className="bg-neutral-800 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">Documento Oficial</span>
                  <h3 className="font-black text-lg text-brown-dark dark:text-white">ORÇAMENTO #{selectedSellerLead.id.toString().slice(-7).toUpperCase()}</h3>
                  <p className="text-[10px] text-gray-500">Emissão: {selectedSellerLead.date} às {selectedSellerLead.time}</p>
                </div>
              </div>

              {/* CLIENT DATA BOX */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-xs border border-gray-200">
                <div>
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block">Dados do Comprador</span>
                  <p className="font-bold text-brown-dark text-sm mt-0.5 dark:text-white">{selectedSellerLead.name}</p>
                  <p className="text-gray-500 mt-0.5">Cidade: {selectedSellerLead.location}</p>
                  <p className="text-gray-500">Telefone: {selectedSellerLead.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block">Emitido por Vendedor</span>
                  <p className="font-bold text-brown-dark text-sm mt-0.5 dark:text-white">
                    {sellers.find(s => s.id === selectedSellerLead.sellerId)?.name || activeSeller.name}
                  </p>
                  <p className="text-gray-500 mt-0.5">Status CRM: <strong>{selectedSellerLead.status}</strong></p>
                  <p className="text-gray-500">Origem: {selectedSellerLead.source}</p>
                </div>
              </div>

              {/* PRODUCTS LISTING TABLE */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-neutral-300 text-neutral-500 uppercase tracking-widest font-black text-[9px]">
                    <th className="py-2">Item / Descrição Técnica</th>
                    <th className="py-2 text-center">Quantidade</th>
                    <th className="py-2 text-right">Valor Unitário</th>
                    <th className="py-2 text-right">Total Item</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {selectedSellerLead.products.map((prodStr: string, idx: number) => {
                    const splitStr = prodStr.split(" x ");
                    const name = splitStr[0];
                    const qty = parseInt(splitStr[1] || "1");
                    
                    // Match price or default
                    const prodMatch = products.find(p => p.name.includes(name));
                    const unitPrice = prodMatch ? prodMatch.price : selectedSellerLead.total / qty;
                    const itemTotal = unitPrice * qty;

                    return (
                      <tr key={idx} className="font-medium text-neutral-700">
                        <td className="py-3">
                          <span className="font-bold block">{name}</span>
                          <span className="text-[9px] text-gray-400 block mt-0.5">Madeira certificada com garantia Só Madeiras</span>
                        </td>
                        <td className="py-3 text-center font-black">{qty} un</td>
                        <td className="py-3 text-right">R$ {unitPrice.toFixed(2)}</td>
                        <td className="py-3 text-right font-bold text-brown-dark dark:text-white">R$ {itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* QR CODE & TOTAL CALCULATIONS ROW */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t-2 border-neutral-200">
                {/* QR CODE Timbre placeholder using standard HTML styles */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-gray-200 text-xs max-w-sm">
                  <div className="bg-white p-1 border border-gray-300 rounded shadow flex items-center justify-center h-20 w-20 shrink-0 select-none">
                    {/* Simulated high-fidelity QR Code */}
                    <div className="grid grid-cols-5 gap-1.5 h-16 w-16">
                      {[...Array(25)].map((_, i) => (
                        <span key={i} className={`rounded-xs ${i % 3 === 0 || i % 4 === 1 || i < 5 ? "bg-black" : "bg-transparent"}`} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-black text-neutral-800 text-[10px] uppercase">Rastreamento QR Code</h5>
                    <p className="text-[9px] text-gray-400 leading-normal mt-0.5">Aponte a câmera para iniciar o atendimento deste orçamento direto via WhatsApp!</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-right text-xs w-full md:w-auto min-w-[200px]">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal Tabela:</span>
                    <span>R$ {(selectedSellerLead.total / 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Desconto Pix Comercial (10%):</span>
                    <span>- R$ {(selectedSellerLead.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-brown-dark border-t border-neutral-350 pt-2 dark:text-white">
                    <span>TOTAL A PAGAR (PIX):</span>
                    <span className="text-lg">R$ {selectedSellerLead.total.toFixed(2)}</span>
                  </div>
                  <p className="text-[8px] text-neutral-400 block mt-1">Validade do Orçamento: 5 dias consecutivos. Frete sujeito a taxas.</p>
                </div>
              </div>

              {/* Timbre terms */}
              <div className="pt-12 text-center text-[10px] text-neutral-400 border-t border-dashed border-neutral-250 leading-relaxed">
                <p>O faturamento deste material é concluído exclusivamente via WhatsApp ou atendimento comercial.</p>
                <p>Madeiras nobres certificadas pelo IBAMA sob DOF. Obrigado pela parceria Só Madeiras!</p>
              </div>

            </div>
          </div>

        </div>
      )}

{/* ==========================================
          MINHA CONTA / CLIENT PORTAL MODAL
          ========================================== */}
      {isMinhaContaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in no-print text-stone-850 dark:text-white">
          <div className="bg-white dark:bg-neutral-900 border border-gray-250 dark:border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center bg-stone-900 text-white rounded-t-2xl">
              <div>
                <h3 className="font-display font-black text-lg flex items-center gap-2">
                  👤 PORTAL DO CLIENTE <span className="text-primary">SÓ MADEIRAS</span>
                </h3>
                <p className="text-[10px] text-gray-300 font-light mt-0.5">Consulte seus orçamentos, cashback acumulado e rastreie entregas em tempo real.</p>
              </div>
              <button 
                onClick={() => { setIsMinhaContaOpen(false); setSelectedTrackingLeadId(null); }}
                className="text-gray-400 hover:text-white transition p-1 bg-white/5 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 space-y-6">
              
              {!activeClient ? (
                /* LOGIN / REGISTRATION FORM WITH SOCIAL + EMAIL OPTION */
                <div className="max-w-md mx-auto space-y-6 py-4">
                  
                  {isSocialConnecting ? (
                    /* SOCIAL CONNECTION SIMULATOR */
                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center animate-fade-in">
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <span className="text-3xl z-10 animate-bounce">
                          {socialProvider === "google" ? "🔑" : "👥"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-brown-dark dark:text-white text-sm">
                          Conectando com o {socialProvider === "google" ? "Google (Gmail)" : "Facebook"}...
                        </h4>
                        <p className="text-[10px] text-gray-400">Verificando credenciais seguras e importando perfil.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center space-y-1.5 pb-2">
                        <span className="text-3xl">🔑</span>
                        <h4 className="font-black text-brown-dark dark:text-white text-base">Acesse sua Conta de Cliente</h4>
                        <p className="text-xs text-gray-450 dark:text-gray-400">Escolha a melhor opção para se conectar e ver seus orçamentos e cashback.</p>
                      </div>

                      {/* Login Header */}
                      <div className="border-b border-gray-200 dark:border-neutral-800 pb-2 text-center">
                        <span className="text-xs font-black uppercase text-brown-dark dark:text-primary tracking-wider">
                          👤 Login / Cadastro de Cliente
                        </span>
                      </div>


                      {/* CLIENT DIRECT LOGIN FORM (NOME + NUMERO + USUARIO) */}
                      {loginMethod === "traditional" && (
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!clientLoginForm.name.trim() || !clientLoginForm.phone.trim() || !clientLoginForm.username.trim()) {
                              alert("Por favor, preencha o Nome, WhatsApp e Nome de Usuário.");
                              return;
                            }
                            const user = {
                              name: clientLoginForm.name.trim(),
                              username: clientLoginForm.username.trim(),
                              phone: clientLoginForm.phone.trim(),
                              city: clientLoginForm.city || "Estância",
                              state: clientLoginForm.state || "SE",
                              provider: "direto"
                            };
                            setActiveClient(user);
                            ApiService.registerLead(user.phone, user.name);
                            localStorage.setItem("somadeiras_logged_in_client", JSON.stringify(user));
                            setLeadFormData({ name: user.name, phone: user.phone, city: user.city, state: user.state });
                            addSystemNotification(`👋 Bem-vindo(a), ${user.name} (@${user.username})!`);
                          }}
                          className="space-y-4 pt-2 animate-fade-in text-left"
                        >
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-brown-medium dark:text-gray-350 tracking-wider block">Nome Completo:</label>
                            <input 
                              type="text"
                              required
                              value={clientLoginForm.name}
                              onChange={(e) => setClientLoginForm({ ...clientLoginForm, name: e.target.value })}
                              placeholder="Ex: Marcelo Silva"
                              className="w-full bg-slate-50 dark:bg-neutral-950 border border-gray-250 dark:border-neutral-800 rounded px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-brown-medium dark:text-gray-350 tracking-wider block">Número de Celular / WhatsApp:</label>
                            <input 
                              type="tel"
                              required
                              value={clientLoginForm.phone}
                              onChange={(e) => setClientLoginForm({ ...clientLoginForm, phone: e.target.value })}
                              placeholder="Ex: (79) 99999-8888"
                              className="w-full bg-slate-50 dark:bg-neutral-950 border border-gray-250 dark:border-neutral-800 rounded px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-brown-medium dark:text-gray-350 tracking-wider block">Nome de Usuário (Username):</label>
                            <input 
                              type="text"
                              required
                              value={clientLoginForm.username}
                              onChange={(e) => setClientLoginForm({ ...clientLoginForm, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                              placeholder="Ex: marcelo.silva"
                              className="w-full bg-slate-50 dark:bg-neutral-950 border border-gray-250 dark:border-neutral-800 rounded px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2 space-y-1">
                              <label className="text-[10px] font-bold uppercase text-brown-medium dark:text-gray-350 tracking-wider block">Cidade:</label>
                              <input 
                                type="text"
                                required
                                value={clientLoginForm.city}
                                onChange={(e) => setClientLoginForm({ ...clientLoginForm, city: e.target.value })}
                                placeholder="Ex: Estância"
                                className="w-full bg-slate-50 dark:bg-neutral-950 border border-gray-250 dark:border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-brown-medium dark:text-gray-350 tracking-wider block">Estado:</label>
                              <select
                                value={clientLoginForm.state}
                                onChange={(e) => setClientLoginForm({ ...clientLoginForm, state: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-neutral-950 border border-gray-250 dark:border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-brown-dark dark:text-white h-[34px]"
                              >
                                <option value="SE">SE</option>
                                <option value="BA">BA</option>
                                <option value="AL">AL</option>
                                <option value="PE">PE</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="MG">MG</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-brown-dark font-black text-xs py-3 rounded-lg shadow-md transition active:scale-95 cursor-pointer mt-4"
                          >
                            Entrar no Portal do Cliente
                          </button>

                          <p className="text-[10px] text-gray-400 text-center pt-3 border-t border-gray-150 dark:border-neutral-800">
                            É funcionário ou vendedor da Só Madeiras?{" "}
                            <Link href="/equipe" onClick={() => setIsMinhaContaOpen(false)} className="text-primary hover:underline font-bold">
                              Acesse a Área da Equipe
                            </Link>
                          </p>
                        </form>
                      )}
                    </>

                  )}

                </div>
              ) : (
                /* CLIENT DASHBOARD */
                <div className="space-y-6">
                  {/* Client Info Banner */}
                  {(() => {
                    const cleanPhone = activeClient.phone.replace(/\D/g, "");
                    const clientLeads = leads.filter(l => {
                      const lPhone = l.phone.replace(/\D/g, "");
                      return lPhone === cleanPhone || l.name.toLowerCase().trim() === activeClient.name.toLowerCase().trim();
                    });
                    const totalPurchased = clientLeads.reduce((acc, curr) => acc + curr.total, 0);

                    // Loyalty Club rates
                    let tierName = "Bronze";
                    let tierColor = "text-amber-700 dark:text-amber-500 bg-amber-500/10 border-amber-500/20";
                    let tierRate = 3;
                    let tierPixDiscount = 10;
                    let tierBadge = "🥉";

                    if (totalPurchased >= 5000 && totalPurchased < 15000) {
                      tierName = "Prata";
                      tierColor = "text-slate-500 dark:text-slate-300 bg-slate-400/10 border-slate-400/20";
                      tierRate = 4.5;
                      tierPixDiscount = 11;
                      tierBadge = "🥈";
                    } else if (totalPurchased >= 15000) {
                      tierName = "Ouro";
                      tierColor = "text-yellow-600 dark:text-primary bg-primary/10 border-primary/20";
                      tierRate = 6;
                      tierPixDiscount = 12;
                      tierBadge = "🥇";
                    }

                    const cashbackAccumulated = totalPurchased * (tierRate / 100);

                    return (
                      <div className="space-y-6">
                        {/* Profile header row */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 dark:bg-neutral-850 p-4 rounded-xl border border-gray-150 dark:border-neutral-800 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brown-dark rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md border-2 border-primary shrink-0">
                              {activeClient.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-black text-brown-dark dark:text-white text-sm flex items-center gap-2 flex-wrap">
                                {activeClient.name}
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${tierColor}`}>
                                  {tierBadge} Club {tierName}
                                </span>
                              </h4>
                              <p className="text-[10px] text-gray-500">
                                WhatsApp: {activeClient.phone} • {activeClient.city}/{activeClient.state}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setActiveClient(null);
                              localStorage.removeItem("somadeiras_logged_in_client");
                              setSelectedTrackingLeadId(null);
                            }}
                            className="text-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold px-3 py-1.5 rounded transition cursor-pointer self-start md:self-center"
                          >
                            Sair / Trocar Conta
                          </button>
                        </div>

                        {/* Client metrics grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                          <div className="bg-[#fcf8f2] dark:bg-neutral-850 p-4 rounded-xl border border-[#ebd8c1]/35 shadow-2xs">
                            <span className="text-[9px] text-[#8C2708] font-bold uppercase tracking-wider block">Categoria do Clube</span>
                            <span className="text-xl font-black text-brown-dark dark:text-white block mt-1">{tierBadge} {tierName}</span>
                            <span className="text-[9px] text-gray-400 block mt-1">Pix: {tierPixDiscount}% Off | Cashback: {tierRate}%</span>
                          </div>

                          <div className="bg-[#fcf8f2] dark:bg-neutral-850 p-4 rounded-xl border border-[#ebd8c1]/35 shadow-2xs">
                            <span className="text-[9px] text-[#8C2708] font-bold uppercase tracking-wider block">Total Orçado</span>
                            <span className="text-xl font-black text-brown-dark dark:text-white block mt-1">R$ {totalPurchased.toFixed(2)}</span>
                            <span className="text-[9px] text-gray-400 block mt-1">{clientLeads.length} solicitações registradas</span>
                          </div>

                          <div className="bg-emerald-500/5 dark:bg-emerald-950/15 p-4 rounded-xl border border-emerald-500/10 shadow-2xs">
                            <span className="text-[9px] text-emerald-700 dark:text-emerald-450 font-bold uppercase tracking-wider block">Cashback Acumulado</span>
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-450 block mt-1">R$ {cashbackAccumulated.toFixed(2)}</span>
                            <span className="text-[9px] text-gray-450 block mt-1">Saldo para abater em novas compras</span>
                          </div>
                        </div>

                        {/* RASTREAMENTO TIMELINE (IF HIGHLIGHTED) */}
                        {selectedTrackingLeadId && (() => {
                          const trackedLead = clientLeads.find(l => l.id === selectedTrackingLeadId);
                          if (!trackedLead) return null;

                          let step = 1;
                          if (trackedLead.status === "Venda Fechada") {
                            step = 5;
                          } else if (trackedLead.status === "Orçamento Enviado" || trackedLead.status === "Negociação") {
                            step = 3;
                          } else if (trackedLead.status === "Em Atendimento") {
                            step = 2;
                          }

                          return (
                            <div className="bg-[#fcf8f2] dark:bg-neutral-850 p-5 rounded-xl border border-primary/20 space-y-4 animate-slide-up text-left">
                              <div className="flex justify-between items-center border-b border-[#ebd8c1]/50 pb-2 flex-wrap gap-2">
                                <div>
                                  <h5 className="font-black text-brown-dark dark:text-white text-xs uppercase tracking-wider">🚚 RASTREAMENTO LOGÍSTICO DO PEDIDO: #{trackedLead.id.split("-")[1] || trackedLead.id}</h5>
                                  <p className="text-[9px] text-gray-500">Separado e expedido da matriz Só Madeiras em Estância/SE</p>
                                </div>
                                <button 
                                  onClick={() => setSelectedTrackingLeadId(null)}
                                  className="text-[9px] text-brown-medium hover:text-brown-dark font-bold bg-white dark:bg-neutral-900 border border-gray-250 dark:border-neutral-800 px-2 py-1 rounded transition dark:text-white"
                                >
                                  Fechar Painel
                                </button>
                              </div>

                              {/* Timeline Graphic */}
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative pt-2">
                                <div className="hidden md:block absolute top-[22px] left-[3%] right-[3%] h-0.5 bg-gray-200 dark:bg-neutral-800 z-0" />
                                
                                {[
                                  { label: "Expedição", desc: "Orçamento Recebido", icon: "📐", targetStep: 1 },
                                  { label: "Estufa", desc: "Secagem e Tratamento", icon: "🌲", targetStep: 2 },
                                  { label: "Serraria", desc: "Corte e Acabamento", icon: "🪚", targetStep: 3 },
                                  { label: "Expedido", desc: "Pronto p/ Entrega", icon: "📦", targetStep: 4 },
                                  { label: "Em Rota", desc: "Rumo a sua obra", icon: "🚚", targetStep: 5 }
                                ].map((stepInfo, idx) => {
                                  const isCompleted = step >= stepInfo.targetStep;
                                  const isCurrent = step === stepInfo.targetStep;
                                  return (
                                    <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center z-10 w-full md:w-1/5 relative">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                                        isCompleted ? 'bg-primary text-brown-dark scale-105 border-2 border-brown-dark' : 'bg-gray-100 dark:bg-neutral-900 text-gray-400 border border-gray-300 dark:border-neutral-800'
                                      } ${isCurrent ? 'ring-4 ring-primary/40 animate-pulse' : ''}`}>
                                        {isCompleted ? "✓" : stepInfo.icon}
                                      </div>
                                      <div className="text-left md:text-center space-y-0.5">
                                        <p className={`text-[10px] font-black ${isCompleted ? 'text-brown-dark dark:text-white' : 'text-gray-400'}`}>
                                          {stepInfo.label}
                                        </p>
                                        <p className="text-[8px] text-gray-450 font-light leading-none">{stepInfo.desc}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Interactive simulated map details */}
                              <div className="bg-white dark:bg-neutral-900 p-3 rounded-lg border border-gray-205 dark:border-neutral-850 text-[10px] space-y-1.5">
                                <div className="flex justify-between font-bold">
                                  <span>Entrega Estimada:</span>
                                  <span className="text-brown-medium dark:text-primary">
                                    {trackedLead.status === "Venda Fechada" ? "Em trânsito (Chega hoje/amanhã)" : "Aguardando confirmação de pagamento do WhatsApp"}
                                  </span>
                                </div>
                                <div className="flex justify-between border-t border-gray-100 dark:border-neutral-800 pt-1">
                                  <span>Destinatário:</span>
                                  <span>{trackedLead.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Endereço de Entrega:</span>
                                  <span>{trackedLead.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Transportadora:</span>
                                  <span>Frota Própria Só Madeiras (Caminhão Truck Silvestre)</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Recent Quotation Requests list */}
                        <div className="space-y-3 text-left">
                          <h5 className="font-bold text-xs uppercase text-brown-medium dark:text-primary tracking-wider border-b border-gray-150 dark:border-neutral-800 pb-2 flex items-center justify-between">
                            <span>Histórico de Orçamentos Recentes</span>
                            <span className="text-[10px] font-normal text-gray-400 dark:text-gray-500 capitalize">{clientLeads.length} orçamento(s)</span>
                          </h5>
                          
                          {clientLeads.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 dark:bg-neutral-850 rounded-xl border border-dashed border-gray-200 dark:border-neutral-800 space-y-2">
                              <span className="text-3xl">🛒</span>
                              <h6 className="font-bold text-brown-dark dark:text-white text-xs">Nenhum orçamento encontrado</h6>
                              <p className="text-[10px] text-gray-400 max-w-sm mx-auto">Adicione materiais de construção ao carrinho no site e finalize pelo WhatsApp para gerar seu primeiro orçamento!</p>
                            </div>
                          ) : (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                              {clientLeads.map((lead) => {
                                const statusColor = 
                                  lead.status === "Venda Fechada" ? "bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450 border-emerald-200/50 dark:border-emerald-900/50" :
                                  lead.status === "Venda Perdida" ? "bg-red-100/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-900/50" :
                                  "bg-amber-100/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-500 border-amber-200/50 dark:border-amber-900/50";
                                
                                return (
                                  <div 
                                    key={lead.id}
                                    className="bg-white dark:bg-neutral-900 p-3 rounded-lg border border-gray-150 dark:border-neutral-800 hover:border-primary dark:hover:border-neutral-700 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs shadow-3xs"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-brown-dark dark:text-white">#{lead.id.split("-")[1] || lead.id}</span>
                                        <span className="text-[10px] text-gray-400">• {lead.date} às {lead.time}</span>
                                      </div>
                                      <p className="text-[10px] text-gray-500 font-light leading-normal line-clamp-2 max-w-md">
                                        {lead.products.join(", ")}
                                      </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 self-end sm:self-center">
                                      <div className="text-right">
                                        <span className="text-[9px] text-gray-400 block font-light">Valor Orçado</span>
                                        <span className="font-bold text-stone-900 dark:text-white">R$ {lead.total.toFixed(2)}</span>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-wider ${statusColor}`}>
                                        {lead.status}
                                      </span>
                                      <button
                                        onClick={() => {
                                          setSelectedTrackingLeadId(lead.id);
                                          trackClick(`btn-track-lead-myaccount-${lead.id}`);
                                        }}
                                        className="bg-brown-medium hover:bg-brown-dark text-white font-bold text-[9px] px-2.5 py-1.5 rounded transition cursor-pointer"
                                      >
                                        Rastrear
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-150 dark:border-neutral-800 flex justify-between items-center bg-slate-50 dark:bg-neutral-950 rounded-b-2xl text-[10px] text-gray-400">
              <span>SÓ MADEIRAS LTDA - Estância/SE • BR-101 Km 142</span>
              <span>Suporte Comercial: (79) 99999-9999</span>
            </div>

          </div>
        </div>
      )}



      {/* TELHAS CRUD MANAGEMENT MODAL */}

      {isTelhaModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print text-left">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-xl shadow-2xl p-6 border border-stone-200 dark:border-neutral-800 space-y-4 relative">
            <button
              onClick={() => setIsTelhaModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-white p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-stone-150 dark:border-neutral-800 pb-3">
              <h3 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase flex items-center gap-2">
                <span>🏠 {editingTelha ? "Editar Telha Cadastrada" : "Cadastrar Nova Telha"}</span>
              </h3>
              <p className="text-xs text-stone-400">Preencha todos os atributos técnicos do modelo de telha</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!telhaForm.name.trim()) {
                  showToast("Por favor, preencha o nome da telha.", "error");
                  return;
                }

                const tileObj = {
                  id: editingTelha ? editingTelha.id : Date.now(),
                  name: telhaForm.name.trim(),
                  brand: telhaForm.brand.trim(),
                  tileType: telhaForm.tileType,
                  coverage: parseFloat(telhaForm.coverage) || 1.0,
                  weight: parseFloat(telhaForm.weight) || 3.0,
                  price: parseFloat(telhaForm.price) || 0.0,
                  minSlope: parseFloat(telhaForm.minSlope) || 10,
                  maxSlope: parseFloat(telhaForm.maxSlope) || 60,
                  qtyPerSqm: parseFloat(telhaForm.qtyPerSqm) || 12,
                  img: telhaForm.img || "/images/tiles/telha_portuguesa.png",
                  desc: telhaForm.desc.trim(),
                  notes: telhaForm.notes.trim()
                };

                let updatedList: any[] = [];
                if (editingTelha) {
                  updatedList = telhasList.map(t => t.id === editingTelha.id ? tileObj : t);
                  showToast(`✅ Telha "${tileObj.name}" atualizada com sucesso!`);
                } else {
                  updatedList = [tileObj, ...telhasList];
                  showToast(`🏠 Nova telha "${tileObj.name}" cadastrada!`);
                }

                updateTelhas(updatedList);
                setIsTelhaModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Nome da Telha *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Telha Cerâmica Portuguesa"
                    value={telhaForm.name}
                    onChange={(e) => setTelhaForm({ ...telhaForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Fabricante / Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tegula, Onduline, Só Madeiras"
                    value={telhaForm.brand}
                    onChange={(e) => setTelhaForm({ ...telhaForm, brand: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Tipo de Material</label>
                  <select
                    value={telhaForm.tileType}
                    onChange={(e) => setTelhaForm({ ...telhaForm, tileType: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="ceramic">Cerâmica</option>
                    <option value="concrete">Concreto</option>
                    <option value="onduline">Ecológica / Onduline</option>
                    <option value="glazed">Esmaltada</option>
                    <option value="fibro">Fibrocimento</option>
                    <option value="metal">Galvanizada / Metálica</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Preço Unitário (R$)</label>
                  <input
                    type="text"
                    placeholder="Ex: 4.50"
                    value={telhaForm.price}
                    onChange={(e) => setTelhaForm({ ...telhaForm, price: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Peso (Kg/peça)</label>
                  <input
                    type="text"
                    placeholder="Ex: 2.8"
                    value={telhaForm.weight}
                    onChange={(e) => setTelhaForm({ ...telhaForm, weight: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Rendimento (m²/peça)</label>
                  <input
                    type="text"
                    placeholder="Ex: 12.0 ou 1.5"
                    value={telhaForm.coverage}
                    onChange={(e) => setTelhaForm({ ...telhaForm, coverage: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Inclinação Mín (%)</label>
                  <input
                    type="text"
                    placeholder="Ex: 30"
                    value={telhaForm.minSlope}
                    onChange={(e) => setTelhaForm({ ...telhaForm, minSlope: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Inclinação Máx (%)</label>
                  <input
                    type="text"
                    placeholder="Ex: 60"
                    value={telhaForm.maxSlope}
                    onChange={(e) => setTelhaForm({ ...telhaForm, maxSlope: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Imagem da Telha (URL ou Upload)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Ex: /images/tiles/telha_portuguesa.png ou URL https://"
                    value={telhaForm.img}
                    onChange={(e) => setTelhaForm({ ...telhaForm, img: e.target.value })}
                    className="flex-1 bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-bold text-slate-800 dark:text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTelhaForm({ ...telhaForm, img: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-28 text-[9px] cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Descrição Comercial</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Vermelha tradicional de encaixe perfeito. Visual clássico colonial..."
                  value={telhaForm.desc}
                  onChange={(e) => setTelhaForm({ ...telhaForm, desc: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Observações Técnicas</label>
                <input
                  type="text"
                  placeholder="Ex: Resistência elevada contra ventos fortes e umidade."
                  value={telhaForm.notes}
                  onChange={(e) => setTelhaForm({ ...telhaForm, notes: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-stone-150 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsTelhaModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-stone-600 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-neutral-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500 shadow transition"
                >
                  Salvar Telha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
    )}
    </div>
  );
}






