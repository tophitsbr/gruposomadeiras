"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Phone, 
  Plus, 
  Star, 
  Camera, 
  User, 
  Calendar, 
  CheckCircle, 
  ThumbsUp, 
  AlertCircle,
  ShoppingBag,
  Info
} from "lucide-react";

// Types
interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  photo?: string; // image string or Base64
  verified: boolean;
  likes: number;
}

// Database import for inside suggestions/reviews
const INITIAL_PRODUCTS = [
  { id: 1, name: "Furadeira de Impacto Tramontina 500W", category: "ferramentas", brand: "Tramontina", price: 289.90, stock: 14, rating: 4.8, desc: "Mandril de 1/2 polegada, velocidade variável e reversível com empunhadura ergonômica.", img: "🔨" },
  { id: 2, name: "Tubo de Esgoto Tigre 100mm 6m", category: "hidraulico", brand: "Tigre", price: 119.90, stock: 42, rating: 4.9, desc: "Tubo de PVC rígido marrom para condução segura de efluentes domésticos com anel de vedação.", img: "🚰" },
  { id: 3, name: "Cabo Flexível Sil 2.5mm² 100m", category: "eletrico", brand: "Fame", price: 189.90, stock: 25, rating: 4.7, desc: "Cabo de cobre antichama isolado em PVC resistente de 750V para instalações gerais.", img: "⚡" },
  { id: 4, name: "Viga de Cambará Aparelhada 5x15cm 3m", category: "madeiras", brand: "Só Madeiras", price: 145.00, stock: 80, rating: 4.9, desc: "Madeira nobre de cambará tratada em estufa, aparelhada e desempenada de alta durabilidade.", img: "🪵" },
  { id: 5, name: "Banco de Jardim em Madeira Maciça", category: "moveis", brand: "Só Madeiras", price: 599.00, stock: 8, rating: 4.6, desc: "Tratamento náutico completo contra sol e chuva, ideal para 3 lugares confortáveis.", img: "🪑" },
  { id: 6, name: "Fechadura Colonial Premium Pado", category: "ferragens", brand: "Tramontina", price: 159.90, stock: 19, rating: 4.7, desc: "Acabamento bronze latonado oxidado de alta resistência mecânica para portas externas.", img: "🔑" },
  { id: 7, name: "Tinta Acrílica Suvinil Fosca 18L", category: "tintas", brand: "Suvinil", price: 389.00, stock: 30, rating: 4.8, desc: "Excelente cobertura, lavável e sem cheiro em até 3 horas de secagem rápida.", img: "🎨" },
  { id: 8, name: "Telha Ecológica Onduline 200x95cm", category: "telhas", brand: "Onduline", price: 79.90, stock: 150, rating: 4.5, desc: "Telha termoacústica leve de alta durabilidade, feita de fibras vegetais impermeabilizadas.", img: "/images/tiles/telha_onduline.png", coverage: 1.5, weight: 6.4, tileType: "onduline" },
  { id: 9, name: "Aparador de Grama Tramontina 1000W", category: "jardinagem", brand: "Tramontina", price: 249.00, stock: 12, rating: 4.7, desc: "Fio de nylon automático com empunhadura ergonômica regulável para jardinagem segura.", img: "🌱" },
  { id: 10, name: "Cimento CP-II Votoran 50kg", category: "pesada", brand: "Votorantim", price: 34.90, stock: 500, rating: 4.9, desc: "Cimento composto com pozolana, excelente trabalhabilidade e secagem rápida para estruturas.", img: "🚜" },
  { id: 11, name: "Prancha de Ipê Aparelhada 4x20cm 4m", category: "madeiras", brand: "Só Madeiras", price: 320.00, stock: 45, rating: 5.0, desc: "Prancha de altíssima hardness e durabilidade natural. Perfeita para decks e pergolados de luxo.", img: "🪵" },
  { id: 12, name: "Mesa de Jantar Rustica 8 Cadeiras", category: "moveis", brand: "Só Madeiras", price: 2490.00, stock: 3, rating: 4.9, desc: "Fabricada em madeira de demolição autêntica peroba rosa com acabamento premium em cera.", img: "🪑" },
  { id: 13, name: "Porta Pivotante Angelim Maciça 2.10x1.00m", category: "madeiras", brand: "Só Madeiras", price: 1890.00, stock: 5, rating: 5.0, desc: "Acompanha pino pivotante de inox e fechadura rolete de alta segurança e estabilidade.", img: "/images/doors/porta_pivotante_angelim.png", woodType: "angelim", grooves: false, handle: "pivot" },
  { id: 14, name: "Porta Maciça Frisada Tauari 2.10x0.80m", category: "madeiras", brand: "Só Madeiras", price: 789.90, stock: 12, rating: 4.8, desc: "Madeira nobre de reflorestamento com secagem técnica em estufa e frisos decorativos.", img: "/images/doors/porta_frisada_tauari.png", woodType: "tauari", grooves: true, handle: "standard" },
  { id: 15, name: "Porta de Madeira Colmeia 70x210 cm HDF - Madelar", category: "madeiras", brand: "Madelar", price: 199.00, stock: 35, rating: 4.7, desc: "Capa em HDF de alta densidade com enchimento acústico leve em colmeia Madelar.", img: "/images/doors/porta_colmeia_madelar.png", woodType: "eucalipto", grooves: false, handle: "standard" },
  { id: 16, name: "Kit Porta Pronta Completo com Batente e Fechadura", category: "madeiras", brand: "Só Madeiras", price: 649.00, stock: 8, rating: 4.9, desc: "Acompanha batente (portal), alizar (guarnição), dobradiças de inox e fechadura instaladas.", img: "/images/doors/kit_porta_pronta.png", woodType: "tauari", grooves: true, handle: "kit", frame: true },
  { id: 17, name: "Telha Cerâmica Portuguesa Natural", category: "telhas", brand: "Só Madeiras", price: 2.99, stock: 4500, rating: 4.8, desc: "Telha cerâmica vermelha tradicional portuguesa, excelente isolamento e encaixe perfeito.", img: "/images/tiles/telha_portuguesa.png", coverage: 17.0, weight: 2.8, tileType: "ceramic" },
  { id: 18, name: "Telha de Concreto Plana Grafite", category: "telhas", brand: "Tegula", price: 8.50, stock: 1800, rating: 4.9, desc: "Telha de concreto de alta resistência, design moderno plano na cor cinza grafite.", img: "/images/tiles/telha_concreto.png", coverage: 10.4, weight: 4.8, tileType: "concrete" },
  { id: 19, name: "Telha Esmaltada Americana Premium", category: "telhas", brand: "Só Madeiras", price: 4.20, stock: 2500, rating: 4.7, desc: "Telha esmaltada dupla-face americana, altíssimo brilho, impermeável a fungos.", img: "/images/tiles/telha_esmaltada.png", coverage: 12.0, weight: 3.1, tileType: "glazed" }
];

interface ProductDetailClientProps {
  initialProduct: any;
  specsData: Array<{ label: string, value: string }>;
}

export default function ProductDetailClient({ initialProduct, specsData }: ProductDetailClientProps) {
  const router = useRouter();
  const productId = initialProduct.id;

  // States
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<any>(initialProduct);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [budgetCart, setBudgetCart] = useState<Array<{ product: any, quantity: number }>>([]);
  const [systemNotification, setSystemNotification] = useState<string | null>(null);

  // Review Form States
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [formPhoto, setFormPhoto] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Load product data & LocalStorage
  useEffect(() => {
    setMounted(true);
    
    // Check if there is an edited version in localStorage, otherwise use initialProduct
    try {
      const storedProds = localStorage.getItem("somadeiras_products");
      if (storedProds) {
        const productsDb = JSON.parse(storedProds);
        const foundProduct = productsDb.find((p: any) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Load Cart from localStorage
    const localCart = localStorage.getItem("somadeiras_cart");
    if (localCart) {
      try {
        setBudgetCart(JSON.parse(localCart));
      } catch (err) {
        console.error("Erro ao carregar o carrinho:", err);
      }
    }

    // Load custom reviews or generate default ones
    const storedReviews = localStorage.getItem(`somadeiras_reviews_${productId}`);
    if (storedReviews) {
      setReviewsList(JSON.parse(storedReviews));
    } else {
      const defaults = getDefaultReviews(product.category || "madeiras");
      setReviewsList(defaults);
      localStorage.setItem(`somadeiras_reviews_${productId}`, JSON.stringify(defaults));
    }
  }, [productId, product.category]);

  // Sync Cart updates back to LocalStorage
  const updateCartInStorage = (updatedCart: Array<{ product: any, quantity: number }>) => {
    setBudgetCart(updatedCart);
    localStorage.setItem("somadeiras_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const addSystemNotification = (msg: string) => {
    setSystemNotification(msg);
    setTimeout(() => {
      setSystemNotification(null);
    }, 3000);
  };

  // Helper to add current product to cart
  const handleAddToCart = () => {
    if (!product) return;
    const existing = budgetCart.find(item => item.product.id === product.id);
    let updated;
    if (existing) {
      updated = budgetCart.map(item => 
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...budgetCart, { product, quantity: 1 }];
    }
    updateCartInStorage(updated);
    addSystemNotification(`"${product.name}" adicionado ao seu orçamento!`);
  };

  // Helper to quick-buy via WhatsApp
  const handleQuickWhatsAppBuy = () => {
    if (!product) return;
    const utm = "utm_source=marketplace_detail&utm_medium=quickbuy";
    const text = `Olá! Tenho interesse em realizar o orçamento do seguinte produto que encontrei no site:\n\n` +
      `- *Produto*: ${product.name}\n` +
      `- *Marca*: ${product.brand}\n` +
      `- *Categoria*: ${product.category.toUpperCase()}\n` +
      `- *Preço Unitário (Base)*: R$ ${product.price.toFixed(2)}\n\n` +
      `Solicito cotação comercial de entrega e estoque para a minha obra. Obrigado!\n\n` +
      `[Ref: ${utm}]`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5519999881122&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Dynamic high-fidelity gallery generator
  const productPhotos = useMemo(() => {
    if (!product) return [];
    
    const collections: { [key: string]: string[] } = {
      ferramentas: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581147036324-c17da42e16c2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80"
      ],
      madeiras: [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      ],
      moveis: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544457070-4cd96414002e?auto=format&fit=crop&w=800&q=80"
      ],
      telhas: [
        "https://images.unsplash.com/photo-1632759162402-990a42426cd3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      ],
      tintas: [
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      ],
      jardinagem: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80"
      ],
      eletrico: [
        "https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
      ],
      hidraulico: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542013936693-8848e574047e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      ]
    };

    const defaultImages = [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ];

    const list = collections[product.category] || defaultImages;
    if (product.img && (product.img.startsWith("/") || product.img.startsWith("http"))) {
      return [product.img, ...list.slice(1)];
    }
    return list;
  }, [product]);

  // Suggested products mapping (Related items in same category, up to 4)
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    return INITIAL_PRODUCTS.filter(
      p => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  // Ratings calculation stats
  const ratingsBreakdown = useMemo(() => {
    if (reviewsList.length === 0) return { avg: 5.0, count: 0, percents: [100, 0, 0, 0, 0] };
    
    let sum = 0;
    const counts = [0, 0, 0, 0, 0];
    
    reviewsList.forEach(r => {
      sum += r.rating;
      const index = 5 - Math.round(r.rating);
      if (index >= 0 && index < 5) counts[index]++;
    });

    const avg = sum / reviewsList.length;
    const percents = counts.map(c => Math.round((c / reviewsList.length) * 100));

    return { avg, count: reviewsList.length, percents };
  }, [reviewsList]);

  // Interactive review photo attachment handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit dynamic review comment
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert("Por favor, preencha o seu nome e o comentário.");
      return;
    }

    const newReview: ProductReview = {
      id: "review-" + Date.now(),
      userName: formName,
      rating: formRating,
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      comment: formComment,
      photo: formPhoto || undefined,
      verified: true,
      likes: 0
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem(`somadeiras_reviews_${productId}`, JSON.stringify(updated));

    // Reset Form states
    setFormName("");
    setFormRating(5);
    setFormComment("");
    setFormPhoto(null);
    setIsSubmitSuccess(true);

    addSystemNotification("Obrigado! Sua avaliação foi publicada com sucesso.");
    setTimeout(() => setIsSubmitSuccess(false), 4000);
  };

  // Increment review likes
  const handleLikeReview = (id: string) => {
    const updated = reviewsList.map(r => 
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    setReviewsList(updated);
    localStorage.setItem(`somadeiras_reviews_${productId}`, JSON.stringify(updated));
  };

  if (!product || !mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono font-bold tracking-widest text-[#3E2723] dark:text-[#F4B400] uppercase">Carregando Produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* GLOBAL HEADER BRANDING & DYNAMIC CART */}
      <header className="bg-[#3E2723] text-white border-b border-[#F4B400]/25 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-[#F4B400]/20 p-2 rounded-xl text-white hover:text-[#F4B400] transition duration-200"
              title="Voltar para a Home"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <span className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">SÓ MADEIRAS</span>
              <p className="text-[9px] text-[#F4B400] tracking-widest font-black uppercase -mt-0.5">Premium Marketplace</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:flex items-center text-xs text-stone-300 hover:text-white font-bold transition gap-1"
            >
              Voltar ao catálogo geral
            </Link>
            
            <Link 
              href="/"
              className="bg-gradient-to-r from-[#F4B400] to-amber-500 text-[#3E2723] font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition active:scale-95 dark:text-amber-400"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline-block">Meu Orçamento</span>
              <span className="bg-[#3E2723] text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-mono">
                {budgetCart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* SYSTEM DYNAMIC BANNERS POPUP */}
      {systemNotification && (
        <div className="fixed bottom-6 right-6 bg-[#3E2723] border border-[#F4B400] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 text-[#F4B400]" />
          <span>{systemNotification}</span>
        </div>
      )}

      {/* BREADCRUMB NAVIGATION */}
      <nav className="max-w-7xl mx-auto w-full px-4 pt-6 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-amber-600 transition">SÓ MADEIRAS</Link>
          <span>/</span>
          <Link href="/" className="hover:text-amber-600 transition">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-650 dark:text-stone-300 font-black">{product.name}</span>
        </div>
      </nav>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* LEFT COLUMN: DYNAMIC PHOTO GALLERY & SPECS */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* PHOTO GALLERY PANEL */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs relative">
            <div className="absolute top-4 left-4 z-10 bg-slate-900/60 backdrop-blur-xs text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/20 select-none">
              🔥 {product.brand} ORIGINAL
            </div>
            
            {/* Active view photo or video */}
            <div className="relative h-[25rem] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-neutral-950 flex items-center justify-center border border-slate-100 dark:border-neutral-850 p-6 select-none group">
              {product?.videoUrl ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="max-h-[22rem] w-full object-contain rounded-xl shadow-md"
                  />
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    🎥 Vídeo Demonstrativo
                  </span>
                </div>
              ) : productPhotos[activePhotoIndex] && (productPhotos[activePhotoIndex].startsWith("/") || productPhotos[activePhotoIndex].startsWith("http")) ? (
                <img 
                  src={productPhotos[activePhotoIndex]} 
                  alt={product.name} 
                  className="max-h-[20rem] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-8xl filter drop-shadow-xl animate-pulse">{product.img}</span>
              )}
            </div>


            {/* Thumbnail Variant Selector list */}
            {productPhotos.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {productPhotos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIndex(i)}
                    className={`h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-neutral-950 border-2 transition relative flex items-center justify-center p-2 cursor-pointer ${
                      activePhotoIndex === i 
                        ? "border-[#F4B400] bg-amber-500/5 shadow-xs" 
                        : "border-slate-150 dark:border-neutral-850 hover:border-slate-300 dark:hover:border-neutral-750"
                    }`}
                  >
                    {photo.startsWith("/") || photo.startsWith("http") ? (
                      <img src={photo} alt={`${product.name} - foto ${i + 1}`} className="max-h-16 w-auto object-contain" />
                    ) : (
                      <span className="text-3xl">{product.img}</span>
                    )}
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded">
                      Zoom {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILED TECHNICAL SPECIFICATIONS SHEET */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs">
            <div className="border-b border-slate-100 dark:border-neutral-850 pb-3 mb-4">
              <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                ⚙️ Ficha Técnica e Especificações
              </h3>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">Parâmetros de fábrica e homologações</p>
            </div>

            <div className="overflow-x-auto text-xs font-medium">
              <table className="w-full border-collapse">
                <tbody>
                  {specsData.map((spec, i) => (
                    <tr 
                      key={i} 
                      className={`border-b border-slate-100 dark:border-neutral-850/50 ${
                        i % 2 === 0 ? "bg-slate-50/40 dark:bg-neutral-950/10" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[9px] tracking-wider w-1/3">{spec.label}</td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-stone-300 font-black">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: PURCHASING CARD, CASHBACK, CTA, SELLER CARD */}
        <section className="lg:col-span-5 space-y-6 self-start">
          
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
            
            {/* BRAND & NAME */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <span className="bg-[#3E2723] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  📂 {product.category}
                </span>
                <span className="text-xs text-yellow-500 font-black flex items-center gap-0.5 select-none">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span>{ratingsBreakdown.avg.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({ratingsBreakdown.count})</span>
                </span>
              </div>
              <h2 className="font-display font-black text-lg md:text-xl text-[#3E2723] dark:text-white uppercase leading-tight tracking-tight">
                {product.name}
              </h2>
              <span className="text-slate-400 text-xs font-bold block">Fabricante: {product.brand}</span>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-4 rounded-2xl border border-slate-100 dark:border-neutral-850 text-xs text-slate-600 dark:text-stone-355 leading-relaxed font-medium">
              <span className="font-black text-[#3E2723] dark:text-[#F4B400] text-[10px] uppercase tracking-wider block mb-1">
                Descrição do Insumo:
              </span>
              {product.desc}
            </div>

            {/* STOCK INDICATOR */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-neutral-850">
              <span className="font-bold text-slate-400">Disponibilidade:</span>
              {product.stock > 15 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Em Estoque ({product.stock} un)
                </span>
              ) : (
                <span className="text-red-500 font-black flex items-center gap-1 animate-pulse">
                  <AlertCircle className="h-4 w-4" /> Baixo Estoque ({product.stock} un)
                </span>
              )}
            </div>

            {/* PRICE INFORMATION BOX */}
            <div className="bg-slate-50 dark:bg-neutral-950 rounded-2xl p-4 border border-slate-100 dark:border-neutral-850 text-xs space-y-1">
              <span className="text-slate-450 line-through block">De R$ {(product.price * 1.1).toFixed(2)}</span>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xs text-slate-650 dark:text-stone-300 font-medium">Ou R$ {product.price.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">em 10x de R$ {(product.price / 10).toFixed(2)}</span>
              </div>
              
              {/* Dynamic PIX panel */}
              <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl mt-2 space-y-0.5">
                <span className="text-[#3E2723] dark:text-[#F4B400] font-black text-[9px] tracking-wider uppercase block">
                  🔥 PREÇO EXCLUSIVO NO PIX (10% OFF):
                </span>
                <span className="text-2xl font-black text-[#3E2723] dark:text-[#F4B400]">
                  R$ {(product.price * 0.9).toFixed(2)}
                </span>
              </div>
            </div>

            {/* DYNAMIC FIDELITY LOYALTY CASHBACK ALERT */}
            <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-[9px]">CLUBE DE BENEFÍCIOS</span>
                <span className="text-slate-700 dark:text-stone-300 block font-bold text-[10px]">Garantia de Cashback de 3%</span>
              </div>
              <span className="bg-emerald-600 text-white font-mono font-black text-[10px] px-2.5 py-0.5 rounded shadow-2xs">
                + R$ {(product.price * 0.03).toFixed(2)}
              </span>
            </div>

            {/* DYNAMIC COMMITTED CUSTOMER CTA ACTIONS */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#3E2723] hover:bg-[#2C1A18] text-white font-black text-xs py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer border-none active:scale-97"
              >
                <Plus className="h-4.5 w-4.5" /> Adicionar ao Carrinho de Orçamento
              </button>
              
              <button
                type="button"
                onClick={handleQuickWhatsAppBuy}
                className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs py-3.5 rounded-xl shadow-xl transition flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer border-none active:scale-97"
              >
                <Phone className="h-4.5 w-4.5" /> Comprar via WhatsApp Direct
              </button>
            </div>

            {/* PREMIUM ADVANTAGES BULLET POINTS */}
            <div className="pt-2 divide-y divide-slate-100 dark:divide-neutral-850/50 text-[10px] font-bold text-slate-500 dark:text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2 py-1.5">
                <span className="text-[#F4B400]">🛡️</span>
                <span>Garantia de Fábrica Só Madeiras (1 ano)</span>
              </div>
              <div className="flex items-center gap-2 py-1.5">
                <span className="text-[#F4B400]">⚡</span>
                <span>Frete expresso sob consulta regional</span>
              </div>
              <div className="flex items-center gap-2 py-1.5">
                <span className="text-[#F4B400]">🌳</span>
                <span>Insumos certificados com DOF florestal</span>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* FULL-WIDTH REVIEWS SECTION: VERIFIED FEED & COMMENT WITH UPLOAD PHOTOS */}
      <section className="max-w-7xl mx-auto w-full px-4 py-8 mt-6 border-t border-slate-200 dark:border-neutral-800">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
          
          {/* LEFT: RATINGS SUMMARY BLOCK */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-b border-slate-100 dark:border-neutral-850 pb-3">
              <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white">
                📊 Avaliações dos Clientes
              </h3>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">Indicador geral de satisfação e feedback</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center bg-[#5D4037]/5 dark:bg-neutral-950 p-5 rounded-2xl border border-slate-100 dark:border-neutral-850 w-28 shadow-3xs">
                <span className="text-3xl font-black text-[#3E2723] dark:text-[#F4B400] block">{ratingsBreakdown.avg.toFixed(1)}</span>
                <div className="flex items-center justify-center text-yellow-500 my-1 select-none">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                </div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase mt-0.5">de 5.0 estrelas</span>
              </div>

              <div className="flex-1 space-y-1">
                <span className="font-black text-[10px] text-slate-500 dark:text-stone-300 block uppercase tracking-wider">Aprovação do Produto:</span>
                <span className="text-slate-400 block text-[11px] font-medium leading-relaxed">
                  *Mais de **94%** dos clientes recomendam este insumo para obras estruturais e acabamentos.*
                </span>
              </div>
            </div>

            {/* STARS PERCENTAGES CHART */}
            <div className="space-y-2 text-xs">
              {[5, 4, 3, 2, 1].map((stars, i) => {
                const percent = ratingsBreakdown.percents[i] || 0;
                return (
                  <div key={stars} className="flex items-center gap-3 font-semibold">
                     <span className="w-10 text-right text-[10px] text-slate-450 uppercase tracking-wide">{stars} estrelas</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-neutral-950 rounded-full overflow-hidden border border-slate-200/40 dark:border-neutral-850">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-[#F4B400] rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-[10px] text-slate-450 font-mono font-bold text-right">{percent}%</span>
                  </div>
                );
              })}
            </div>

            {/* REAL CUSTOMER WRITE REVIEW FORM WITH PHOTO UPLOADS */}
            <div className="bg-slate-50 dark:bg-neutral-950 p-5 rounded-2xl border border-slate-100 dark:border-neutral-850 space-y-4">
              <div className="border-b border-slate-200/50 dark:border-neutral-850 pb-2">
                <span className="font-black text-[#3E2723] dark:text-[#F4B400] text-[10px] uppercase tracking-wider block">
                  ✍️ Avaliar este Produto
                </span>
                <p className="text-[9px] text-slate-400 font-medium">Compartilhe sua experiência de compra e fotos da sua instalação</p>
              </div>

              {isSubmitSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl text-center space-y-2 animate-scaleUp">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <span className="font-black text-emerald-700 dark:text-emerald-400 text-xs block uppercase">Avaliação Publicada!</span>
                  <p className="text-[10px] text-slate-500 dark:text-stone-400 leading-relaxed font-semibold">
                    Obrigado por nos ajudar a construir a maior comunidade técnica de madeiras e acabamentos do Brasil!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-450 uppercase text-[9px] tracking-wider block">Seu Nome / Profissão:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pedro Engenheiro, Mariana Designer..."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Rating Stars Select */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-450 uppercase text-[9px] tracking-wider block">Sua Nota / Estrelas:</label>
                    <div className="flex items-center gap-1.5 text-yellow-500 select-none">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer hover:scale-110 active:scale-95 transition bg-transparent border-none text-yellow-500"
                        >
                          <Star className={`h-6 w-6 ${star <= formRating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-450 uppercase text-[9px] tracking-wider block">Seu Comentário / Avaliação Técnica:</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Fale sobre a resistência, acabamento, entrega ou facilidade de instalação..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white resize-none"
                    />
                  </div>

                  {/* Attachment Photo Upload */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-500 dark:text-slate-450 uppercase text-[9px] tracking-wider block">Anexar Fotos do Insumo Aplicado:</label>
                    
                    <div className="flex items-center gap-3">
                      <label className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 flex items-center justify-center gap-1.5 cursor-pointer font-black text-slate-650 dark:text-stone-300 hover:border-[#F4B400] transition shadow-3xs">
                        <Camera className="h-4 w-4 text-[#F4B400]" />
                        <span>Escolher Imagem</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>

                      {formPhoto && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-[#F4B400]">
                          <img src={formPhoto} alt="Miniatura do anexo" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormPhoto(null)}
                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[8px] w-4.5 h-4.5 flex items-center justify-center font-bold"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Review */}
                  <button
                    type="submit"
                    className="w-full bg-[#3E2723] hover:bg-[#2C1A18] text-white font-black text-xs py-3 rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer border-none mt-2"
                  >
                    Publicar Avaliação Oficial
                  </button>

                </form>
              )}
            </div>

          </div>

          {/* RIGHT: REAL COMMENTS DECK (COMMENTS WITH REAL PHOTOS) */}
          <div className="lg:col-span-8 space-y-4 max-h-[46rem] overflow-y-auto pr-2">
            <h4 className="text-[10px] font-black text-slate-450 dark:text-stone-400 uppercase tracking-widest block pb-1 border-b border-slate-100 dark:border-neutral-800/60">
              💬 Feed de Avaliações ({reviewsList.length})
            </h4>

            {reviewsList.length === 0 ? (
              <div className="text-center py-16 text-slate-450 space-y-2">
                <User className="h-10 w-10 text-[#F4B400] mx-auto opacity-75 animate-pulse" />
                <p className="font-bold">Nenhuma avaliação publicada ainda.</p>
                <p className="font-light">Seja o primeiro a avaliar e compartilhar fotos deste produto!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewsList.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-slate-50/50 dark:bg-neutral-850/20 border border-slate-150 dark:border-neutral-800/80 rounded-2xl p-4 space-y-3 relative group transition hover:border-[#F4B400]/40"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-[#3E2723] text-white rounded-full w-8 h-8 flex items-center justify-center font-black uppercase text-xs shadow-3xs">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs text-slate-800 dark:text-white uppercase block leading-none">
                              {review.userName}
                            </span>
                            {review.verified && (
                              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 font-black text-[8px] px-1.5 py-0.5 rounded tracking-wide uppercase select-none">
                                Compra Confirmada
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-slate-400 dark:text-stone-400 text-[10px] font-bold mt-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-yellow-500 select-none">
                        {[...Array(5)].map((_, starI) => (
                          <Star key={starI} className={`h-3.5 w-3.5 ${starI < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>

                    {/* Review text comment */}
                    <p className="text-xs text-slate-650 dark:text-stone-300 font-medium leading-relaxed whitespace-pre-line pl-10.5">
                      {review.comment}
                    </p>

                    {/* PHOTO ATTACHMENT DISPLAY (Verified result in buyer home) */}
                    {review.photo && (
                      <div className="pl-10.5 space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">📷 FOTO DO CLIENTE (APLICAÇÃO REAL NA OBRA):</span>
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 max-w-sm h-48 bg-slate-100 dark:bg-neutral-900 group/img flex items-center justify-center">
                          <img 
                            src={review.photo} 
                            alt={`Aplicação real de ${review.userName}`} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                          />
                        </div>
                      </div>
                    )}

                    {/* Helpful like button */}
                    <div className="flex items-center justify-between pl-10.5 pt-1.5 border-t border-slate-100 dark:border-neutral-850/50 text-[10px] text-slate-400 font-bold">
                      <span>Esta avaliação foi útil para você?</span>
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className="bg-slate-100 dark:bg-neutral-800 hover:bg-[#F4B400]/15 dark:hover:bg-[#F4B400]/25 text-slate-550 dark:text-stone-300 px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95 border-none animate-none"
                      >
                        <ThumbsUp className="h-3 w-3 text-[#F4B400]" /> Útil ({review.likes})
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </section>

      {/* PRODUCTS RECOMMENDATIONS SECTION */}
      {suggestedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-4 py-8">
          <div className="border-l-4 border-[#F4B400] pl-3 mb-6">
            <h3 className="font-display font-black text-lg md:text-xl text-[#3E2723] dark:text-white uppercase tracking-tight">
              🏷️ Quem comprou este produto também se interessou por:
            </h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-black mt-0.5">Sugestões inteligentes com base na categoria</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {suggestedProducts.map((p) => {
              const pixPrice = p.price * 0.9;
              return (
                <div 
                  key={p.id}
                  className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-xl transition duration-300 group"
                >
                  <div className="bg-slate-50 dark:bg-neutral-950 h-32 flex items-center justify-center text-4xl p-4 relative group-hover:bg-slate-100 dark:group-hover:bg-neutral-850 transition duration-300">
                    {p.img && (p.img.startsWith("/") || p.img.startsWith("http")) ? (
                      <img src={p.img} alt={p.name} className="h-24 w-auto object-contain transition-transform group-hover:scale-105" />
                    ) : (
                      <span className="filter drop-shadow-md group-hover:rotate-6 transition-transform">{p.img}</span>
                    )}
                    <span className="absolute top-2 left-2 bg-slate-900/60 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase">
                      {p.brand}
                    </span>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#F4B400] font-black uppercase tracking-wider">⭐ {p.rating.toFixed(1)}</span>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-stone-200 line-clamp-2 uppercase min-h-8">
                        {p.name}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-[9px] text-slate-400 line-through block">De R$ {(p.price * 1.1).toFixed(2)}</span>
                        <span className="text-sm font-black text-[#3E2723] dark:text-[#F4B400]">R$ {pixPrice.toFixed(2)}</span>
                        <span className="text-[9px] text-slate-450 block font-semibold uppercase">No Pix (10% Off)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <Link
                          href={`/produtos/${p.id}`}
                          className="bg-slate-100 dark:bg-neutral-800 hover:bg-[#F4B400]/10 border border-slate-200 dark:border-neutral-750 text-slate-700 dark:text-stone-300 text-[10px] font-black py-2 rounded-lg flex items-center justify-center transition active:scale-95"
                        >
                          🔍 Ver
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            const existing = budgetCart.find(item => item.product.id === p.id);
                            let updated;
                            if (existing) {
                              updated = budgetCart.map(item => 
                                item.product.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
                              );
                            } else {
                              updated = [...budgetCart, { product: p, quantity: 1 }];
                            }
                            updateCartInStorage(updated);
                            addSystemNotification(`"${p.name}" adicionado ao seu orçamento!`);
                          }}
                          className="bg-primary hover:bg-primary-hover text-[#3E2723] text-[10px] font-black py-2 rounded-lg flex items-center justify-center transition active:scale-95 cursor-pointer border-none"
                        >
                          + Orçar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#3E2723] text-stone-300 border-t border-[#F4B400]/25 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <span className="font-display font-black text-sm tracking-wider uppercase text-white">SÓ MADEIRAS</span>
            <p className="font-light leading-relaxed max-w-sm text-stone-400">
              O maior e melhor marketplace de madeiras nobres, ferragens, hidráulica e acabamento da região. Materiais de altíssima qualidade homologados pelas normas técnicas nacionais.
            </p>
          </div>

          <div className="space-y-3 text-left md:text-right">
            <span className="font-bold text-white uppercase block text-[10px] tracking-widest text-[#F4F400]">
              Links e Navegação
            </span>
            <div className="flex flex-wrap md:justify-end gap-3 text-[11px] font-bold">
              <Link href="/" className="hover:text-white transition">Catálogo de Produtos</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/pergolados" className="hover:text-white transition">Pergolados 3D</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/galpoes-currais" className="hover:text-white transition">Estruturas Rurais 3D</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/forro-pvc" className="hover:text-white transition">Calculadora Forro PVC</Link>
            </div>
            <p className="text-[10px] text-stone-400 mt-2 font-mono">
              © 2026 Só Madeiras Premium. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Default reviews catalog for LocalStorage initializing
function getDefaultReviews(category: string): ProductReview[] {
  const defaults: { [key: string]: ProductReview[] } = {
    madeiras: [
      {
        id: "rev-w1",
        userName: "Marcelo Construtor",
        rating: 5,
        date: "24 de maio de 2026",
        comment: "Excelente qualidade da viga aparelhada! A secagem é perfeita, não veio nenhuma peça empenada ou com nós críticos. A Só Madeiras realmente entrega o material com padrão de acabamento excelente. Recomendo para quem quer fazer estruturas de pergolado aparentes.",
        verified: true,
        likes: 12,
        photo: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "rev-w2",
        userName: "Fernanda Silveira",
        rating: 4,
        date: "10 de maio de 2026",
        comment: "Comprei as pranchas para o deck da piscina e ficaram fantásticas. A tonalidade da madeira é linda e o lixamento economizou muito trabalho. Veio apenas uma peça com uma pequena lasca na ponta, mas deu para aproveitar inteira nos recortes.",
        verified: true,
        likes: 8
      }
    ],
    telhas: [
      {
        id: "rev-t1",
        userName: "Engenheiro Marcos",
        rating: 5,
        date: "28 de maio de 2026",
        comment: "As telhas esmaltadas têm um brilho fenomenal e são 100% impermeáveis. O encaixe é muito firme, facilitando o alinhamento das fiadas. Reduziu o tempo de cobertura em quase dois dias no meu galpão de lazer.",
        verified: true,
        likes: 15,
        photo: "https://images.unsplash.com/photo-1632759162402-990a42426cd3?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "rev-t2",
        userName: "Cláudio Ferreira",
        rating: 4,
        date: "14 de maio de 2026",
        comment: "Uso as telhas ecológicas Onduline em coberturas secundárias e o conforto térmico é incrível. Super leves, uma pessoa consegue manusear facilmente. Exige apenas atenção redobrada no espaçamento dos caibros do telhado.",
        verified: true,
        likes: 5
      }
    ],
    tintas: [
      {
        id: "rev-p1",
        userName: "Juliana Designer",
        rating: 5,
        date: "19 de maio de 2026",
        comment: "A cobertura dessa tinta Suvinil é espetacular. Com duas demãos a parede ficou perfeitamente fosca, sem nenhuma mancha. O fato de não ter cheiro após 3 horas facilitou muito a pintura dos quartos das crianças. Muito satisfeita!",
        verified: true,
        likes: 9,
        photo: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=500&q=80"
      }
    ]
  };

  const generic = [
    {
      id: "rev-g1",
      userName: "Roberto Antunes",
      rating: 5,
      date: "22 de maio de 2026",
      comment: "Insumo de excelente qualidade, entrega muito rápida e atendimento da Só Madeiras de primeira pelo WhatsApp. Recomendo de olhos fechados, farei novas compras.",
      verified: true,
      likes: 6
    },
    {
      id: "rev-g2",
      userName: "Carla Mendes",
      rating: 4,
      date: "05 de maio de 2026",
      comment: "Muito prático e resistente. O preço está excelente em comparação com outras lojas físicas. Recomendo bastante.",
      verified: true,
      likes: 3
    }
  ];

  return defaults[category] || generic;
}
