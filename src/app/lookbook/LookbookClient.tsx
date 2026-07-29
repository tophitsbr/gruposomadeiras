"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { saveData } from "@/lib/dataService";
import { 
  ArrowLeft, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Eye, 
  Plus, 
  Check, 
  Moon, 
  Sun, 
  Star,
  Info,
  X,
  Sparkles,
  ShoppingBag as CartIcon,
  Tag
} from "lucide-react";

interface Hotspot {
  id: string;
  top: string; // absolute percentage positions
  left: string;
  productId: number;
  productName: string;
  productPrice: number;
  productDesc: string;
  productImg: string;
}

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: "pergolado" | "decks" | "esquadrias" | "cercas";
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const LOOKBOOK_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Área Gourmet Rústica com Pergolado",
    location: "Estância - SE",
    category: "pergolado",
    description: "Varanda gourmet integrada de alto padrão construída com pergolado de Eucalipto Roliço Autoclavado (Categoria UC-4 de alta durabilidade) e acabamento impregnante em Stain Premium.",
    image: "/images/pergolado_ambient.png",
    hotspots: [
      {
        id: "hs-1-1",
        top: "45%",
        left: "17%",
        productId: 104, // Custom mock IDs or map to home catalog
        productName: "Viga de Cambará Aparelhada 5x15cm 3m",
        productPrice: 145.00,
        productDesc: "Madeira nobre tratada em estufa, ideal para caibros e travessas secundárias.",
        productImg: "🪵"
      },
      {
        id: "hs-1-2",
        top: "32%",
        left: "55%",
        productId: 108,
        productName: "Telha Ecológica Onduline 200x95cm",
        productPrice: 79.90,
        productDesc: "Telha termoacústica leve de alta durabilidade, feita de fibras vegetais.",
        productImg: "🏠"
      }
    ]
  },
  {
    id: "proj-2",
    title: "Deck de Ipê ao Redor da Piscina",
    location: "Aracaju - SE",
    category: "decks",
    description: "Deck flutuante requintado instalado em área externa residencial. Feito com Pranchas de Ipê Aparelhadas, de altíssima dureza natural, ideal para contato constante com água e cloro.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
    hotspots: [
      {
        id: "hs-2-1",
        top: "65%",
        left: "50%",
        productId: 11,
        productName: "Prancha de Ipê Aparelhada 4x20cm 4m",
        productPrice: 320.00,
        productDesc: "Madeira de Ipê de altíssima dureza mecânica, perfeita para decks de luxo.",
        productImg: "🪵"
      },
      {
        id: "hs-2-2",
        top: "80%",
        left: "25%",
        productId: 10,
        productName: "Cimento CP-II Votoran 50kg",
        productPrice: 34.90,
        productDesc: "Cimento composto com pozolana, ideal para fixação das sapatas estruturais.",
        productImg: "🚜"
      }
    ]
  },
  {
    id: "proj-3",
    title: "Fachada Estância Premium com Porta Pivotante",
    location: "Estância - SE",
    category: "esquadrias",
    description: "Fachada imponente de casa de veraneio em Sergipe, destacando nossa Porta Pivotante em Angelim Vermelho com acabamento em verniz náutico triplo filtro solar.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    hotspots: [
      {
        id: "hs-3-1",
        top: "55%",
        left: "48%",
        productId: 13,
        productName: "Porta Pivotante Angelim Maciça 2.10x1.00m",
        productPrice: 1890.00,
        productDesc: "Maciça Angelim. Acompanha pino pivotante de inox e fechadura rolete instalada.",
        productImg: "🚪"
      },
      {
        id: "hs-3-2",
        top: "48%",
        left: "82%",
        productId: 14,
        productName: "Porta Maciça Frisada Tauari 2.10x0.80m",
        productPrice: 789.90,
        productDesc: "Madeira de reflorestamento nobre com secagem computadorizada em estufa.",
        productImg: "🚪"
      }
    ]
  },
  {
    id: "proj-4",
    title: "Cercamento Agropecuário em Lagarto",
    location: "Lagarto - SE",
    category: "cercas",
    description: "Estrutura bovina profissional montada com mourões de Eucalipto autoclavados e réguas de cambará, garantindo 15 anos de imunização contra apodrecimento.",
    image: "/images/curral_ambient.jpg",
    hotspots: [
      {
        id: "hs-4-1",
        top: "60%",
        left: "32%",
        productId: 110,
        productName: "Mourão Roliço de Eucalipto Tratado Ø12-14cm 2.2m",
        productPrice: 48.00,
        productDesc: "Eucalipto tratado em autoclave categoria UC-4, perfeito para cercamentos e currais.",
        productImg: "🪵"
      },
      {
        id: "hs-4-2",
        top: "80%",
        left: "70%",
        productId: 10,
        productName: "Cimento CP-II Votoran 50kg",
        productPrice: 34.90,
        productDesc: "Cimento Votorantim CP-II de secagem rápida para chumbamento dos mourões de canto.",
        productImg: "🚜"
      }
    ]
  }
];

export default function LookbookClient() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Cart states
  const [cart, setCart] = useState<Array<{ product: any, quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Active hotspot popovers
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Sync cart from local storage on mount
    const localCart = localStorage.getItem("somadeiras_cart");
    if (localCart) {
      try {
        setCart(JSON.parse(localCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  const saveCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem("somadeiras_cart", JSON.stringify(newCart));
    // Dispatch standard storage event to update other pages if open
    window.dispatchEvent(new Event("storage"));
  };

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Add hotspot product directly to cart
  const handleAddProductFromHotspot = (hs: Hotspot) => {
    const productObj = {
      id: hs.productId,
      name: hs.productName,
      price: hs.productPrice,
      desc: hs.productDesc,
      category: "madeiras",
      brand: "Só Madeiras",
      img: hs.productImg
    };

    const existingIdx = cart.findIndex(item => item.product.id === hs.productId);
    const updatedCart = [...cart];

    if (existingIdx > -1) {
      updatedCart[existingIdx].quantity += 1;
    } else {
      updatedCart.push({ product: productObj, quantity: 1 });
    }

    saveCart(updatedCart);
    setActiveHotspotId(null);
    showToastMsg(`✅ "${hs.productName}" adicionado ao carrinho!`);
  };

  const updateCartQty = (productId: number, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as Array<{ product: any, quantity: number }>;
    saveCart(updated);
  };

  const removeFromCart = (productId: number) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    
    // Choose random seller or cycle
    const assignedSeller = { id: "maria", name: "Maria" };
    const cartText = cart.map(item => `   - ${item.product.name} (Qtd: ${item.quantity}) - R$ ${item.product.price.toFixed(2)}/un`).join("\n");
    const cartTotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
    const pixTotal = cartTotal * 0.9;

    const newLead = {
      id: `lead-lookbook-${Date.now()}`,
      name: "Interessado Lookbook",
      phone: "79999999999",
      city: "Estância",
      state: "SE",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Lookbook Interativo",
      utm: "utm_source=lookbook&utm_medium=interactive_hotspots",
      products: cart.map(i => `${i.product.name} x ${i.quantity}`),
      total: parseFloat(cartTotal.toFixed(2)),
      status: "Novo Lead",
      sellerId: assignedSeller.id,
      device: "Web Browser",
      location: "Estância - SE",
      notes: "Lead gerado a partir de produtos clicados no Lookbook de Inspirações."
    };

    // Save lead to local storage CRM db
    const currentLeads = localStorage.getItem("somadeiras_leads");
    const leadsList = currentLeads ? JSON.parse(currentLeads) : [];
    saveData("somadeiras_leads", [newLead, ...leadsList]);

    // WhatsApp Redirect
    const waMessage = `Olá! Meu nome é interessado no Lookbook Só Madeiras.\n\nTenho interesse nos seguintes materiais vistos nas inspirações:\n${cartText}\n\n*Total Estimado:* R$ ${cartTotal.toFixed(2)}\n*Valor Pix (10% Off):* R$ ${pixTotal.toFixed(2)}\n\nGostaria de cotar frete para Sergipe.`;
    const waUrl = `https://api.whatsapp.com/send?phone=5579999999999&text=${encodeURIComponent(waMessage)}`;

    // Reset lookbook cart
    saveCart([]);
    setIsCartOpen(false);
    window.open(waUrl, "_blank");
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return LOOKBOOK_PROJECTS;
    return LOOKBOOK_PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#3E2723] text-[#FFC107]">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFC107] border-t-transparent mx-auto" />
          <p className="font-display font-black text-sm uppercase tracking-wider">Carregando Galeria Interativa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-brown-dark transition-colors duration-300 ${darkMode ? "dark bg-neutral-950 text-gray-100" : ""}`}>
      
      {/* HEADER */}
      <header className="bg-[#3E2723] dark:bg-black text-white py-4 px-6 sticky top-0 z-40 shadow-lg transition-colors border-b border-[#F4B400]/25">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-[#F4B400]/20 p-2 rounded-xl text-white hover:text-[#F4B400] transition duration-200"
              title="Voltar para a Home"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-[#F4B400]" />
                <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">
                  LOOKBOOK INTERATIVO DE PROJETOS
                </h1>
              </div>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">INSPIRAÇÕES SÓ MADEIRAS PREMIUM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dark mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#F4B400] transition"
              title="Alternar Tema"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#F4B400] text-brown-dark font-black px-4 py-2.5 rounded-full text-xs hover:bg-[#ffd149] transition shadow flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Orçamento</span>
              {cart.length > 0 && (
                <span className="bg-brown-dark text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#3E2723] border border-[#F4B400] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <Check className="h-4 w-4 text-[#F4B400]" />
          <span>{toast}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
        
        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-[#F4B400]/20 text-[#3E2723] dark:text-[#F4B400] border border-[#F4B400]/40 font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Tag className="h-3 w-3" /> Galeria Clicável de Materiais
          </span>
          <h2 className="font-display font-black text-2xl md:text-5xl leading-tight uppercase">
            Inspire-se e Adicione à Obra
          </h2>
          <div className="h-1.5 bg-[#F4B400] w-24 mx-auto rounded-full" />
          <p className="text-stone-550 dark:text-stone-400 text-xs md:text-sm font-light leading-relaxed">
            Navegue por pergolados, decks de piscinas, portas e cercas reais de clientes da Só Madeiras em Sergipe. Clique nos marcadores piscantes para conferir as especificações das madeiras e adicioná-las ao seu orçamento instantaneamente.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {[
            { id: "all", label: "✨ Mostrar Todos" },
            { id: "pergolado", label: "🪵 Pergolados" },
            { id: "decks", label: "🏊 Decks & Piscinas" },
            { id: "esquadrias", label: "🚪 Portas & Janelas" },
            { id: "cercas", label: "🌾 Mourões & Cercas" }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => { setActiveFilter(filter.id); setActiveHotspotId(null); }}
              className={`px-4.5 py-2 rounded-full text-xs font-bold transition active:scale-95 cursor-pointer border ${
                activeFilter === filter.id 
                  ? "bg-[#3E2723] text-[#F4B400] border-[#F4B400] dark:bg-[#F4B400] dark:text-brown-dark dark:border-white shadow-md"
                  : "bg-white dark:bg-zinc-900 text-slate-500 border-slate-200 dark:border-stone-850 hover:border-slate-350 dark:hover:border-stone-750"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* LOOKBOOK GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-stone-850 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group transition hover:shadow-xl hover:border-slate-300 dark:hover:border-stone-750"
            >
              
              {/* IMAGE WRAPPER WITH ABSOLUTE HOTSPOTS */}
              <div className="relative h-[320px] md:h-[400px] overflow-hidden select-none bg-stone-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[10px] text-[#F4B400] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                  <MapPin className="h-3.5 w-3.5 text-[#F4B400]" /> {project.location}
                </div>

                {/* RENDER INTERACTIVE HOTSPOTS */}
                {project.hotspots.map((hs) => {
                  const isOpen = activeHotspotId === hs.id;
                  
                  return (
                    <div 
                      key={hs.id}
                      style={{ top: hs.top, left: hs.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      {/* Pulsing visual circle button */}
                      <button
                        onClick={() => setActiveHotspotId(isOpen ? null : hs.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-white shadow-2xl transition border-2 border-white cursor-pointer ${
                          isOpen 
                            ? "bg-red-500 scale-110 rotate-45" 
                            : "bg-[#F4B400] hover:bg-[#ffc107] animate-pulse"
                        }`}
                        title="Ver materiais deste item"
                      >
                        <Plus className="h-4 w-4 stroke-[3]" />
                      </button>

                      {/* Glowing ring animation */}
                      {!isOpen && (
                        <div className="absolute top-0 left-0 w-7 h-7 rounded-full border-2 border-[#F4B400] animate-[ping_1.8s_ease-in-out_infinite] pointer-events-none opacity-75" />
                      )}

                      {/* POPUP DETAIL CARD */}
                      {isOpen && (
                        <div 
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-900 text-brown-dark dark:text-white w-60 p-4.5 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xl z-30 space-y-3 animate-[fadeIn_0.2s_ease-out_forwards]"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="bg-[#3E2723] dark:bg-[#F4B400] text-[#F4B400] dark:text-brown-dark text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                              Insumo Utilizado
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveHotspotId(null); }}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-white bg-transparent border-none cursor-pointer"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-bold text-xs leading-snug">{hs.productName}</h5>
                            <p className="text-[10px] text-slate-400 font-light leading-normal">{hs.productDesc}</p>
                          </div>

                          <div className="flex justify-between items-baseline pt-1">
                            <span className="text-[10px] text-slate-400 font-bold">Orçamento:</span>
                            <span className="font-black text-brown-medium dark:text-[#F4B400] text-xs">R$ {hs.productPrice.toFixed(2)}</span>
                          </div>

                          <button
                            onClick={() => handleAddProductFromHotspot(hs)}
                            className="w-full bg-[#F4B400] hover:bg-[#ffd149] text-brown-dark font-black text-[10px] py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider border-none active:scale-97 shadow"
                          >
                            <Plus className="h-3 w-3 stroke-[3]" /> Adicionar ao Orçamento
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* DETAILS FOOTER */}
              <div className="p-6 space-y-3.5 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-black text-base md:text-lg text-brown-dark dark:text-white uppercase leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-800 dark:text-stone-100 font-medium leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-stone-850 flex items-center justify-between text-[11px] font-bold text-stone-400 dark:text-stone-500">
                  <span className="uppercase tracking-wider">🏷️ Categoria: {project.category}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {project.hotspots.length} Marcadores</span>
                </div>
              </div>

            </div>
          ))}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#3E2723] text-white border-t border-[#F4B400]/20 py-8 px-6 mt-16 text-center select-none text-xs">
        <p className="font-display font-black text-sm text-[#F4B400] tracking-wider uppercase">SÓ MADEIRAS ESTÂNCIA-SE</p>
        <p className="text-stone-300 font-light mt-1">Materiais Premium para Construção e Madeiras de Lei com faturamento direto.</p>
        <p className="text-stone-400 text-[10px] font-mono mt-6">© {new Date().getFullYear()} SÓ MADEIRAS. Todos os direitos reservados.</p>
      </footer>

      {/* SLIDE-OUT SHOPPING CART FOR CHECKOUT */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end animate-[fadeIn_0.3s_ease_out]">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl relative">
            
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-stone-850 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CartIcon className="h-5 w-5 text-[#F4B400]" />
                  <h4 className="font-display font-black text-sm uppercase text-brown-dark dark:text-white">Orçamento Lookbook</h4>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg bg-transparent border-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-400 space-y-3">
                  <ShoppingBag className="h-12 w-12 mx-auto text-slate-300 animate-bounce" />
                  <p className="font-bold text-xs uppercase">Carrinho do Lookbook Vazio</p>
                  <p className="text-[11px] font-light max-w-xs mx-auto">Navegue pelas fotos dos projetos e clique nos marcadores para adicionar insumos estruturais ao seu orçamento.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="flex items-center justify-between border border-slate-150 dark:border-stone-850 p-3 rounded-xl gap-3 bg-slate-50 dark:bg-neutral-850"
                    >
                      <div className="flex-1 space-y-1">
                        <span className="font-bold text-xs text-brown-dark dark:text-white block line-clamp-1">{item.product.name}</span>
                        <span className="text-[10px] text-brown-medium dark:text-[#F4B400] font-black">R$ {item.product.price.toFixed(2)}/un</span>
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
                  <span>Subtotal Insumos:</span>
                  <span className="text-[#3E2723] dark:text-[#F4B400] font-black text-base">
                    R$ {cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400">
                  <span>Desconto Pix 10%:</span>
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
                  onClick={handleCheckoutSubmit}
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
