"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { AboutSection } from "../components/AboutSection";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Phone, 
  Check, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  BookmarkCheck,
  ShoppingBag as CartIcon,
  X,
  Plus,
  Minus,
  Maximize2,
  CheckCircle,
  Wrench,
  Ruler,
  Layers,
  Moon,
  Sun
} from "../components/Icons";

// ==========================================
// DATA TYPES & PRODUCT INTERFACES
// ==========================================
interface CatalogProduct {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  category: "pivotante" | "macica" | "semioca" | "kits";
  woodType: "Angelim Vermelho" | "Tauari Nobre" | "Curupixá Premium" | "Angelim/Tauari";
  basePrice: number;
  image: string;
  badge: string;
  specs: Array<{ label: string; val: string }>;
  features: string[];
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "door-pivot-angelim",
    title: "Porta Pivotante Angelim Maciça",
    desc: "Feita com réguas selecionadas de Angelim de altíssima dureza. Acabamento para verniz com estabilidade mecânica insuperável.",
    longDesc: "Ideal para a entrada principal de residências de alto padrão. O Angelim Vermelho é uma madeira de lei de extraordinária densidade (aproximadamente 950 kg/m³) rica em resinas naturais que agem como repelente a brocas e cupins. Sua montagem em réguas maciças secas em estufa previne empenamentos causados por variações climáticas drásticas.",
    category: "pivotante",
    woodType: "Angelim Vermelho",
    basePrice: 1890.00,
    image: "/images/doors/porta_pivotante_angelim.png",
    badge: "👑 Entrada Luxo / Maciça",
    specs: [
      { label: "Material", val: "Angelim Vermelho" },
      { label: "Aplicação", val: "Áreas Externas / Fachadas" },
      { label: "Montagem", val: "Maciça Modular Ripada" },
      { label: "Garantia", val: "5 Anos Estrutural" }
    ],
    features: [
      "Secagem técnica computadorizada (moisture 10-12%)",
      "Preparada para pivô de sustentação de até 150Kg",
      "Altíssima resistência mecânica e isolamento acústico",
      "Imunidade natural contra insetos xilófagos"
    ]
  },
  {
    id: "door-frisada-tauari",
    title: "Porta Frisada Tauari Premium",
    desc: "Desenho minimalista com frisos decorativos usinados em router CNC. Capa de Tauari Nobre seco em estufa industrial.",
    longDesc: "Desenho contemporâneo com canaletas de baixo relevo usinadas sob medida em marcenaria computadorizada. A capa em madeira nobre de Tauari oferece uma tonalidade mel clara de extrema sofisticação com veios lineares delicados, ideal para quartos, banheiros e passagens sob cobertura.",
    category: "macica",
    woodType: "Tauari Nobre",
    basePrice: 789.90,
    image: "/images/doors/porta_frisada_tauari.png",
    badge: "🧱 Moderno / Passagem",
    specs: [
      { label: "Material", val: "Tauari Nobre" },
      { label: "Usinagem", val: "Frisos Geométricos CNC" },
      { label: "Aplicação", val: "Entradas Cobertas / Quartos" },
      { label: "Acabamento", val: "Tonalidade Mel Clara" }
    ],
    features: [
      "Veios de madeira lineares e uniformes",
      "Usinagem precisa antiderrapante em router CNC",
      "Secagem industrial em estufa técnica",
      "Fácil aplicação de seladoras e vernizes"
    ]
  },
  {
    id: "door-colmeia-madelar",
    title: "Porta Semioca Colmeia Madelar",
    desc: "Porta interna leve ideal para divisões econômicas. Chapas de HDF perfeitamente lisas prontas para pintura.",
    longDesc: "A escolha inteligente e com excelente custo-benefício para construtoras e reformas de interiores. A folha possui estrutura interna celular de favo de mel (colmeia) que absorve ressonâncias e reduz ruídos, revestida por capas de HDF de alta densidade lisas. Muito leve, evita a fadiga de dobradiças comuns.",
    category: "semioca",
    woodType: "Curupixá Premium",
    basePrice: 380.00,
    image: "/images/doors/porta_colmeia_madelar.png",
    badge: "🪵 Interna / Econômica",
    specs: [
      { label: "Material", val: "Capa HDF / Curupixá" },
      { label: "Núcleo", val: "Colmeia Celular Acústica" },
      { label: "Aplicação", val: "Banheiros, Suítes e Quartos" },
      { label: "Peso", val: "Apenas 15 a 18 Kg" }
    ],
    features: [
      "Economia de até 60% em relação às maciças",
      "Isolamento acústico e térmico celular natural",
      "Leveza extrema que não força o drywall",
      "Acabamento plano pronto para pintura, laca ou seladora"
    ]
  },
  {
    id: "door-kit-pronta",
    title: "Kit Porta Pronta Completo Regulável",
    desc: "Praticidade absoluta. Acompanha folha de porta, batente regulável com amortecedor, alizares e dobradiças instaladas.",
    longDesc: "Esqueça a marcenaria de canteiro de obras e o trabalho de pintura complexo. Nosso Kit Porta Pronta regulável vem montado direto da Só Madeiras. Acompanha batentes maciços reguláveis de encaixe macho-fêmea com borracha amortecedora, dobradiças inox e fechadura instalada.",
    category: "kits",
    woodType: "Angelim/Tauari",
    basePrice: 1290.00,
    image: "/images/doors/kit_porta_pronta.png",
    badge: "🛠️ Praticidade Total",
    specs: [
      { label: "Batente", val: "Regulável (10 a 15cm)" },
      { label: "Vedação", val: "Borracha Amortecedora" },
      { label: "Ferragem", val: "Dobradiças Inox Inclusas" },
      { label: "Instalação", val: "Sistema Rápido com Espuma" }
    ],
    features: [
      "Regulagem que corrige desaprumo de alvenaria",
      "Borracha de amortecimento que silencia batidas",
      "Dobradiças de aço inox imunes à maresia",
      "Instalação finalizada em menos de 45 minutos"
    ]
  }
];

interface PortasClientProps {
  initialType?: string;
}

export default function PortasClient({ initialType = "all" }: PortasClientProps) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Dynamic Modal Selection States
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [chosenWidth, setChosenWidth] = useState<number>(80);
  const [chosenHeight, setChosenHeight] = useState<number>(210);
  const [includeBatente, setIncludeBatente] = useState<boolean>(true);
  const [accessoryType, setAccessoryType] = useState<"standard" | "pull_60" | "pull_100" | "smart">("standard");

  // Cart & Toast States
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  // Sync initial tab filter
  useEffect(() => {
    if (initialType !== "all") {
      setActiveFilter(initialType);
    }
  }, [initialType]);

  // Read theme and cart on mount
  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }

    const localCart = localStorage.getItem("somadeiras_cart");
    if (localCart) {
      try {
        setCart(JSON.parse(localCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }

    const localProds = localStorage.getItem("somadeiras_products");
    if (localProds) {
      try {
        setDbProducts(JSON.parse(localProds));
      } catch (e) {
        console.error("Erro ao carregar produtos:", e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return CATALOG_PRODUCTS;
    return CATALOG_PRODUCTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Open detailing modal with defaults set
  const handleOpenDetailModal = (product: CatalogProduct) => {
    setSelectedProduct(product);
    // Set logical defaults based on category
    if (product.category === "pivotante") {
      setChosenWidth(100);
      setAccessoryType("pull_100");
    } else {
      setChosenWidth(80);
      setAccessoryType("standard");
    }
    setChosenHeight(210);
    setIncludeBatente(product.category !== "kits"); // Kits already include batente
  };

  // Pricing helper for modal selections
  const getModalCalculatedPrice = (): { total: number; breakdown: string[] } => {
    if (!selectedProduct) return { total: 0, breakdown: [] };
    
    const dbMap: Record<string, number> = {
      "door-pivot-angelim": 13,
      "door-frisada-tauari": 14,
      "door-colmeia-madelar": 15,
      "door-kit-pronta": 16
    };
    const dbId = dbMap[selectedProduct.id];
    const dbProd = dbProducts.find(p => p.id === dbId);
    const basePrice = dbProd ? dbProd.price : selectedProduct.basePrice;

    let total = basePrice;
    const breakdown: string[] = [`Preço Base: R$ ${basePrice.toFixed(2)}`];

    // Width adjustments
    if (chosenWidth > 80) {
      const widthAdd = (chosenWidth - 80) * 15;
      total += widthAdd;
      breakdown.push(`Largura Adicional (${chosenWidth}cm): +R$ ${widthAdd.toFixed(2)}`);
    }

    // Height adjustments
    if (chosenHeight === 240) {
      total += 350;
      breakdown.push("Altura Especial 2,40m: +R$ 350.00");
    } else if (chosenHeight === 280) {
      total += 750;
      breakdown.push("Altura Monumental 2,80m: +R$ 750.00");
    }

    // Include Batente Regulável
    if (includeBatente && selectedProduct.category !== "kits") {
      total += 290;
      breakdown.push("Batente Regulável + Alizares (10-15cm): +R$ 290.00");
    }

    // Accessories
    if (accessoryType === "pull_60") {
      total += 190;
      breakdown.push("Puxador Barra Chata Inox 60cm: +R$ 190.00");
    } else if (accessoryType === "pull_100") {
      total += 275;
      breakdown.push("Puxador Barra Chata Inox 100cm: +R$ 275.00");
    } else if (accessoryType === "smart") {
      total += 495;
      breakdown.push("Fechadura Digital Biométrica Smart: +R$ 495.00");
    }

    return { total, breakdown };
  };

  const modalPriceObj = getModalCalculatedPrice();
  const modalPixTotal = modalPriceObj.total * 0.9;

  // Add customized modal configuration to global shopping cart
  const handleAddModalToCart = () => {
    if (!selectedProduct) return;
    
    const batenteText = includeBatente ? "c/ Batente Regulável" : "Apenas Folha";
    const accessoryText = accessoryType === "pull_60" 
      ? "Puxador Inox 60cm" 
      : accessoryType === "pull_100" 
        ? "Puxador Inox 100cm" 
        : accessoryType === "smart" 
          ? "Fechadura Biométrica" 
          : "Fechadura Convencional";

    const configDesc = `${selectedProduct.title} - ${chosenWidth}x${chosenHeight}cm | ${batenteText} | ${accessoryText} | Pix 10% Off`;
    
    const productObj = {
      id: `door-catalog-${selectedProduct.id}-${Date.now()}`,
      name: configDesc,
      price: modalPriceObj.total,
      desc: `${selectedProduct.woodType} selecionado seco em estufa.`,
      category: "portas",
      brand: "Só Madeiras",
      img: selectedProduct.image
    };

    const updatedCart = [...cart, { product: productObj, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("somadeiras_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    
    setSelectedProduct(null);
    showToastMsg(`✅ "${selectedProduct.title}" adicionado ao orçamento!`);
  };

  // Immediate card additions (using baseline configs)
  const handleImmediateAddToCart = (prod: CatalogProduct) => {
    const dbMap: Record<string, number> = {
      "door-pivot-angelim": 13,
      "door-frisada-tauari": 14,
      "door-colmeia-madelar": 15,
      "door-kit-pronta": 16
    };
    const dbId = dbMap[prod.id];
    const dbProd = dbProducts.find(p => p.id === dbId);
    const activePrice = dbProd ? dbProd.price : prod.basePrice;

    const defaultSize = prod.category === "pivotante" ? "100x210cm" : "80x210cm";
    const configDesc = `${prod.title} (Medida Padrão: ${defaultSize}) - Kit Padrão Só Madeiras`;
    
    const productObj = {
      id: `door-catalog-${prod.id}-${Date.now()}`,
      name: configDesc,
      price: activePrice,
      desc: `${prod.woodType} de pátio seco em estufa.`,
      category: "portas",
      brand: "Só Madeiras",
      img: prod.image
    };

    const updatedCart = [...cart, { product: productObj, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("somadeiras_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    
    showToastMsg(`✅ "${prod.title}" adicionado ao carrinho!`);
  };

  // WhatsApp checkout for modal configurations
  const handleCheckoutModalWhatsApp = () => {
    if (!selectedProduct) return;

    const batenteText = includeBatente ? "Com Batente Regulável + Guarnições" : "Apenas Folha da Porta (Sem portal)";
    const accessoryText = accessoryType === "pull_60" 
      ? "Puxador Inox Barra Chata 60cm" 
      : accessoryType === "pull_100" 
        ? "Puxador Inox Barra Chata 100cm" 
        : accessoryType === "smart" 
          ? "Fechadura Digital Biométrica por Senha/Digital" 
          : "Fechadura Mecânica Padrão com Chaves";

    const waMsg = `Olá Só Madeiras! Gostaria de fazer o orçamento com frete da seguinte porta do Catálogo Premium:\n\n*Especificações da Porta:*\n- *Produto:* ${selectedProduct.title}\n- *Material:* ${selectedProduct.woodType}\n- *Dimensões:* ${chosenWidth}x${chosenHeight}cm\n- *Batente:* ${batenteText}\n- *Acessórios:* ${accessoryText}\n\n*Total Estimado:* R$ ${modalPriceObj.total.toFixed(2)}\n*Valor Especial Pix (10% Off):* R$ ${modalPixTotal.toFixed(2)}\n\nAguardo cotação de frete para entrega em Sergipe. Obrigado!`;
    const waUrl = `https://api.whatsapp.com/send?phone=5579999999999&text=${encodeURIComponent(waMsg)}`;
    
    // Save lead
    try {
      const newLead = {
        id: `lead-catalog-door-${Date.now()}`,
        name: "Interessado Catalago Portas",
        phone: "79999999999",
        city: "Estância",
        state: "SE",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        source: `Catálogo Premium`,
        utm: `utm_source=catalogo&utm_medium=visual_grid&utm_campaign=${selectedProduct.category}`,
        products: [`${selectedProduct.title} - Configurado ${chosenWidth}x${chosenHeight}cm`],
        total: parseFloat(modalPriceObj.total.toFixed(2)),
        status: "Novo Lead",
        sellerId: "maria",
        device: typeof window !== "undefined" ? (window.innerWidth < 768 ? "Mobile" : "Desktop") : "Web",
        location: "Estância - SE",
        notes: `Lead configurou uma porta no modal de detalhes: ${selectedProduct.title}`
      };
      const currentLeads = localStorage.getItem("somadeiras_leads") || "[]";
      localStorage.setItem("somadeiras_leads", JSON.stringify([newLead, ...JSON.parse(currentLeads)]));
      
      const notifs = localStorage.getItem("somadeiras_notifications") || "[]";
      const newNotif = {
        id: `notif-${Date.now()}`,
        text: `🚪 Novo interesse em Porta: ${selectedProduct.title} (${chosenWidth}x${chosenHeight}cm)!`,
        time: "Agora"
      };
      localStorage.setItem("somadeiras_notifications", JSON.stringify([newNotif, ...JSON.parse(notifs)]));
    } catch(e) {}

    window.open(waUrl, "_blank");
  };

  // Cart operations
  const updateCartQty = (productId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as Array<{ product: any; quantity: number }>;
    setCart(updated);
    localStorage.setItem("somadeiras_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    setCart(updated);
    localStorage.setItem("somadeiras_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleCartCheckoutSubmit = () => {
    if (cart.length === 0) return;
    const cartText = cart.map(item => `   - ${item.product.name} (Qtd: ${item.quantity}) - R$ ${item.product.price.toFixed(2)}/un`).join("\n");
    const cartTotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
    const pixTotalCart = cartTotal * 0.9;

    const waMessage = `Olá Só Madeiras! Gostaria de cotar o seguinte orçamento do meu carrinho:\n\n${cartText}\n\n*Total Insumos:* R$ ${cartTotal.toFixed(2)}\n*Total Pix (10% Off):* R$ ${pixTotalCart.toFixed(2)}\n\nAguardo retorno sobre o prazo e frete.`;
    const waUrl = `https://api.whatsapp.com/send?phone=5579999999999&text=${encodeURIComponent(waMessage)}`;
    
    setCart([]);
    localStorage.removeItem("somadeiras_cart");
    window.dispatchEvent(new Event("storage"));
    setIsCartOpen(false);
    window.open(waUrl, "_blank");
  };

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brown-dark text-primary">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="font-display font-black text-sm uppercase tracking-wider">Carregando Catálogo Premium...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-brand-bg text-stone-850 transition-colors duration-300 ${darkMode ? "dark bg-dark-bg text-stone-100" : ""}`}>
      
      {/* TOAST FEEDBACK */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-brown-dark dark:bg-dark-surface border border-primary text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-2 animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{toast}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-brown-dark dark:bg-black text-white py-4 px-6 sticky top-0 z-40 shadow-lg border-b border-primary/25">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-primary/25 p-2 rounded-xl text-white hover:text-primary transition duration-200"
              title="Voltar para a Home"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-primary" />
                <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">
                  Catálogo de Portas
                </h1>
              </div>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">SÓ MADEIRAS PREMIUM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition"
              title="Alternar Tema"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-primary text-brown-dark font-black px-4.5 py-2.5 rounded-full text-xs hover:bg-primary-hover transition shadow flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <span>Orçamento</span>
              {cart.length > 0 && (
                <span className="bg-brown-dark text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        {/* Elegant dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/95 via-stone-900/90 to-transparent" />
        
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10 space-y-4 text-left">
          <span className="bg-primary/20 text-primary border border-primary/40 font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
            🌾 Madeira de Lei Legítima Seca em Estufa
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight uppercase max-w-3xl">
            EXCLUSIVIDADE EM <br /><span className="text-primary">PORTAS DE LUXO</span>
          </h2>
          <p className="text-stone-300 text-xs md:text-base max-w-2xl font-light leading-relaxed">
            Folhas de madeira maciça Angelim e Tauari selecionadas, kits completos de porta pronta com batentes reguláveis, alizares e fechaduras digitais instaladas direto do pátio com frete seguro para Sergipe.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-[10px] md:text-xs text-stone-400 font-mono">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-2 rounded-xl backdrop-blur-xs">
              <Check className="h-4 w-4 text-primary" />
              <span>Moisture Controlado 10-12%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-2 rounded-xl backdrop-blur-xs">
              <Check className="h-4 w-4 text-primary" />
              <span>Montagem Anti-empenamento</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-2 rounded-xl backdrop-blur-xs">
              <Check className="h-4 w-4 text-primary" />
              <span>Norma NBR 15930 Aprovada</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-10">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start border-b border-stone-200 dark:border-dark-border pb-4">
          {[
            { id: "all", label: "✨ Todas as Portas" },
            { id: "pivotante", label: "👑 Pivotantes de Entrada" },
            { id: "macica", label: "🧱 Maciças Frisadas" },
            { id: "semioca", label: "🪵 Semiocas (Quartos)" },
            { id: "kits", label: "🛠️ Batentes e Kits" }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition active:scale-95 cursor-pointer border ${
                activeFilter === filter.id 
                  ? "bg-brown-dark text-primary border-primary dark:bg-primary dark:text-brown-dark dark:border-white shadow-md"
                  : "bg-white dark:bg-zinc-900 text-stone-500 border-stone-200 dark:border-dark-border hover:border-stone-350"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS CATALOG GRID */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => {
            const dbMap: Record<string, number> = {
              "door-pivot-angelim": 13,
              "door-frisada-tauari": 14,
              "door-colmeia-madelar": 15,
              "door-kit-pronta": 16
            };
            const dbId = dbMap[prod.id];
            const dbProd = dbProducts.find(p => p.id === dbId);
            const activePrice = dbProd ? dbProd.price : prod.basePrice;
            const soldCount = dbProd ? dbProd.soldCount : 0;
            const pixPrice = activePrice * 0.9;
            return (
              <div 
                key={prod.id} 
                className="bg-white dark:bg-dark-surface border border-stone-200 dark:border-dark-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Image Container */}
                <div 
                  onClick={() => handleOpenDetailModal(prod)}
                  className="h-72 overflow-hidden relative select-none bg-stone-50 dark:bg-zinc-900 p-6 flex items-center justify-center cursor-pointer border-b border-stone-150 dark:border-dark-border"
                >
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback image if file not found
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop";
                    }}
                  />
                  <span className="absolute top-3.5 left-3.5 bg-brown-dark dark:bg-black text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {prod.badge}
                  </span>
                  {soldCount > 0 && (
                    <span className="absolute top-3.5 right-3.5 bg-emerald-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow animate-pulse">
                      🔥 {soldCount} vendidos
                    </span>
                  )}
                  
                  {/* Quick view visual hover indicator */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-brown-dark/90 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/10">
                      <Maximize2 className="h-3.5 w-3.5 text-primary" /> Visualizar Detalhes
                    </span>
                  </div>
                </div>

                {/* Details Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white dark:bg-dark-surface">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => handleOpenDetailModal(prod)}
                      className="font-display font-black text-sm md:text-base text-brown-dark dark:text-white group-hover:text-primary transition cursor-pointer leading-snug line-clamp-1"
                    >
                      {prod.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light leading-normal line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Micro technical specifications panel */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-dark-border">
                    {prod.specs.slice(0, 2).map((sp, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[8px] text-stone-400 font-bold uppercase block">{sp.label}</span>
                        <span className="text-[10px] font-bold text-brown-medium dark:text-stone-300 block line-clamp-1">{sp.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Actions area */}
                  <div className="space-y-3.5 pt-3.5 border-t border-stone-100 dark:border-dark-border">
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-baseline text-[10px] font-bold text-stone-400">
                        <span>Tabela:</span>
                        <span className="line-through">R$ {activePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs font-black text-emerald-650 dark:text-emerald-400">
                        <span>Especial Pix:</span>
                        <span className="text-lg">R$ {pixPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleImmediateAddToCart(prod)}
                        className="w-full bg-brown-dark hover:bg-stone-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow transition active:scale-97 cursor-pointer border-none flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                        <span>Adicionar Cotação</span>
                      </button>
                      <button
                        onClick={() => handleOpenDetailModal(prod)}
                        className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-primary py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow transition active:scale-97 cursor-pointer border border-amber-500/30 flex items-center justify-center gap-1"
                      >
                        Ver Ficha Técnica
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* TECHNICAL INFO STRIP */}
      <section className="bg-slate-50 dark:bg-neutral-900/50 py-12 px-6 border-t border-stone-250 dark:border-dark-border mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-light text-stone-500 dark:text-stone-400 leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-display font-black text-stone-850 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-primary" /> Bitolas e Medidas Padrão
            </h5>
            <p>
              As folhas de portas possuem espessura de 35mm para linhas leves internas e 40mm a 45mm para modelos maciços externos. Fabricamos larguras comerciais padrão (60, 70, 80 e 90cm) e sob encomenda até 1,20m de largura por 2,80m de altura com reforço estrutural.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-display font-black text-stone-850 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-primary" /> O que é o Batente Regulável?
            </h5>
            <p>
              O caixão regulável conta com alizares (guarnições) equipados com abas de encaixe macho-fêmea deslizantes. Isso permite estender e cobrir imperfeições de alvenarias fora de prumo ou paredes grossas (de 10cm a 15cm) sem necessidade de cortes manuais.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-display font-black text-stone-850 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-primary" /> Certificação NBR 15930
            </h5>
            <p>
              Nossas folhas seguem estritamente a norma de qualidade de desempenho de portas de madeira no Brasil. Classificadas como PIM (Porta Interna de Madeira) e PEM (Porta Externa de Madeira) com isolamentos mecânico e acústico certificados.
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* FOOTER */}
      <footer className="bg-brown-dark text-white border-t border-primary/20 py-8 px-6 text-center select-none text-xs">
        <p className="font-display font-black text-sm text-primary tracking-wider uppercase">SÓ MADEIRAS ESTÂNCIA-SE</p>
        <p className="text-stone-300 font-light mt-1">Materiais Premium para Construção e Madeiras de Lei com faturamento direto.</p>
        <p className="text-stone-400 text-[10px] font-mono mt-6">© {new Date().getFullYear()} SÓ MADEIRAS. Todos os direitos reservados.</p>
      </footer>

      {/* INTERACTIVE DETAILS CONFIGURATION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] w-full max-w-4xl shadow-2xl relative border border-stone-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-12 overflow-hidden max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-40 bg-black/60 hover:bg-black/85 text-white p-2 rounded-full transition active:scale-95 border border-white/10"
              aria-label="Fechar Detalhes"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left Column: Image and Static Specs */}
            <div className="md:col-span-5 bg-stone-50 dark:bg-zinc-950 p-6 flex flex-col justify-between items-center border-r border-stone-150 dark:border-neutral-800">
              <div className="w-full flex items-center justify-center h-80 relative select-none">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Specs Badge list */}
              <div className="w-full space-y-2 mt-4 pt-4 border-t border-stone-200 dark:border-neutral-800 text-[11px]">
                <span className="font-bold text-stone-400 block uppercase tracking-wider">Ficha Técnica</span>
                <div className="grid grid-cols-2 gap-2 font-medium">
                  {selectedProduct.specs.map((sp, idx) => (
                    <div key={idx} className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 p-2 rounded-xl">
                      <span className="text-stone-400 block text-[9px] uppercase">{sp.label}</span>
                      <span className="text-brown-medium dark:text-primary font-bold block">{sp.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Custom Configuration Wizard */}
            <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
              
              <div className="space-y-6">
                <div>
                  <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase inline-block mb-1.5">
                    {selectedProduct.badge}
                  </span>
                  <h3 className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white uppercase leading-snug">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light mt-2">
                    {selectedProduct.longDesc}
                  </p>
                </div>

                {/* Configurations parameters */}
                <div className="space-y-4 pt-2 border-t border-stone-100 dark:border-neutral-850">
                  
                  {/* Option 1: Width */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-stone-450 tracking-wider block">1. Selecionar Largura da Folha</label>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedProduct.category === "pivotante" 
                        ? [90, 100, 110, 120] 
                        : selectedProduct.category === "semioca" 
                          ? [60, 70, 80, 90]
                          : [70, 80, 90, 100, 110]
                      ).map((w) => (
                        <button
                          key={w}
                          onClick={() => setChosenWidth(w)}
                          className={`px-3 py-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
                            chosenWidth === w
                              ? "border-primary bg-primary/10 text-brown-dark dark:text-primary"
                              : "border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-400 hover:border-stone-350"
                          }`}
                        >
                          {w} cm
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Option 2: Height */}
                  {selectedProduct.category !== "semioca" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-stone-450 tracking-wider block">2. Selecionar Altura</label>
                      <div className="flex gap-2">
                        {[210, 240, 280].map((h) => (
                          <button
                            key={h}
                            onClick={() => setChosenHeight(h)}
                            className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                              chosenHeight === h
                                ? "border-primary bg-primary/10 text-brown-dark dark:text-primary"
                                : "border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-400 hover:border-stone-350"
                            }`}
                          >
                            {(h / 100).toFixed(2)} m
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option 3: Batente Regulável checkbox */}
                  {selectedProduct.category !== "kits" && (
                    <div className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-850 rounded-2xl">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block text-brown-dark dark:text-white">Adicionar Kit Batente Regulável</span>
                        <span className="text-[9px] text-stone-400 block leading-normal">Caixão Portal regulável de 10 a 15cm com alizares e borracha (+R$ 290)</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={includeBatente}
                        onChange={(e) => setIncludeBatente(e.target.checked)}
                        className="w-5 h-5 rounded accent-primary cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Option 4: Hardware and lock additions */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-stone-450 tracking-wider block">3. Ferragens e Fechadura</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "standard", label: "🔒 Fechadura Mecânica", desc: "Mecânica padrão chaves" },
                        { id: "pull_60", label: "🪵 Puxador Inox 60cm", desc: "Barra chata + Rolete (+R$190)" },
                        { id: "pull_100", label: "👑 Puxador Inox 1.0m", desc: "Luxo ripadora + Rolete (+R$275)" },
                        { id: "smart", label: "📱 Fechadura Smart", desc: "Biometria digital (+R$495)" }
                      ].map(acc => (
                        <button
                          key={acc.id}
                          onClick={() => setAccessoryType(acc.id as any)}
                          className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                            accessoryType === acc.id
                              ? "border-primary bg-primary/10 text-brown-dark dark:text-primary font-bold"
                              : "border-stone-200 dark:border-neutral-800 text-stone-600 dark:text-stone-400 hover:border-stone-350"
                          }`}
                        >
                          <span className="text-xs block font-bold">{acc.label}</span>
                          <span className="text-[8px] text-stone-400 mt-1 block">{acc.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Price Calculation and final checkouts */}
              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-neutral-850 space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2 font-bold text-xs uppercase text-stone-400">
                      <span>Tabela: R$ {(modalPriceObj.total * 1.1).toFixed(2)}</span>
                      <span>Orçamento: R$ {modalPriceObj.total.toFixed(2)}</span>
                    </div>
                    <div className="text-xs font-black text-emerald-650 dark:text-emerald-400">
                      Preço Especial Pix (10% Off): <span className="text-2xl">R$ {modalPixTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddModalToCart}
                      className="bg-brown-dark hover:bg-stone-900 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-white font-black px-5 py-3.5 rounded-xl transition active:scale-95 text-xs border-none cursor-pointer"
                    >
                      Salvar Orçamento
                    </button>
                    <button
                      onClick={handleCheckoutModalWhatsApp}
                      className="bg-emerald-650 hover:bg-emerald-600 text-white font-black px-5 py-3.5 rounded-xl transition active:scale-95 text-xs flex items-center gap-1.5 border-none cursor-pointer"
                    >
                      <Phone className="h-4.5 w-4.5" />
                      <span>Chamar no WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Technical dynamic breakdown list */}
                <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl space-y-1">
                  <span className="text-[8px] font-black uppercase text-stone-450 tracking-wider block">Cômputo Técnico do Orçamento:</span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold text-stone-400">
                    {modalPriceObj.breakdown.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1">✓ {item}</span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* SLIDE-OUT SHOPPING CART FOR CHECKOUT */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end animate-[fadeIn_0.3s_ease_out] no-print">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl relative">
            
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-stone-850 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CartIcon className="h-5 w-5 text-primary" />
                  <h4 className="font-display font-black text-sm uppercase text-brown-dark dark:text-white">Carrinho Só Madeiras</h4>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-slate-400 hover:text-slate-655 dark:hover:text-white p-1 rounded-lg bg-transparent border-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-400 space-y-3">
                  <ShoppingBag className="h-12 w-12 mx-auto text-slate-300 animate-bounce" />
                  <p className="font-bold text-xs uppercase">Carrinho Vazio</p>
                  <p className="text-[11px] font-light max-w-xs mx-auto">Selecione portas no catálogo, adicione ao seu orçamento e feche a cotação no WhatsApp com preço de pátio.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="flex items-center justify-between border border-slate-150 dark:border-stone-850 p-3.5 rounded-xl gap-3 bg-slate-50 dark:bg-neutral-850"
                    >
                      <div className="flex-1 space-y-1">
                        <span className="font-bold text-xs text-brown-dark dark:text-white block leading-snug">{item.product.name}</span>
                        <span className="text-[10px] text-brown-medium dark:text-primary font-black">R$ {item.product.price.toFixed(2)}/un</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateCartQty(item.product.id, -1)}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-stone-800 text-brown-dark dark:text-white font-bold flex items-center justify-center border-none cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="font-black text-xs min-w-[20px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQty(item.product.id, 1)}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-stone-800 text-brown-dark dark:text-white font-bold flex items-center justify-center border-none cursor-pointer text-xs"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-750 text-[10px] font-bold ml-2 bg-transparent border-none cursor-pointer hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-100 dark:border-stone-850 pt-4 space-y-4">
                <div className="flex justify-between items-baseline font-bold text-xs uppercase">
                  <span>Subtotal:</span>
                  <span className="text-brown-dark dark:text-primary font-black text-base">
                    R$ {cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400">
                  <span>Desconto Pix (10%):</span>
                  <span className="font-black">
                    - R$ {(cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0) * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-xs uppercase">
                  <span>Total Pix:</span>
                  <span className="text-brown-dark dark:text-white font-black text-lg">
                    R$ {(cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0) * 0.9).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCartCheckoutSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer uppercase tracking-wider text-xs border-none"
                >
                  <Phone className="h-4.5 w-4.5" /> Enviar Cotação para WhatsApp
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
