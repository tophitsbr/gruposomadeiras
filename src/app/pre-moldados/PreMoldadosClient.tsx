"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Phone, 
  Plus, 
  Star, 
  CheckCircle, 
  X, 
  ShoppingBag, 
  Filter,
  Ruler,
  Shield,
  Layers,
  Award,
  Truck,
  Building2,
  Calculator
} from "lucide-react";

interface PreMoldadoProduct {
  id: string;
  name: string;
  categoryType: string; // muro, mourão, galpão, tubo, laje
  dimensions: string;
  price: number;
  pricePix: number;
  image: string;
  desc: string;
  rating: number;
  specs: {
    resistencia: string;
    armacao: string;
    dimensoesPadrão: string;
    peso: string;
    aplicacao: string;
  };
}

const PRE_MOLDADOS_CATALOG: PreMoldadoProduct[] = [
  {
    id: "pm-1",
    name: "Muro Pré-Moldado de Concreto Armado Placa Lisa (Painel 2.00x0.50m)",
    categoryType: "muro",
    dimensions: "2.00m x 0.50m x 3.5cm",
    price: 48.00,
    pricePix: 43.20,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    desc: "Placa modular de concreto armado com malha de aço soldada. Agilidade máxima e fechamento seguro para terrenos e indústrias.",
    rating: 4.9,
    specs: {
      resistencia: "Concreto Fck 30 MPa",
      armacao: "Malha de Aço CA-60 4.2mm",
      dimensoesPadrão: "2.00m comp x 0.50m alt x 3.5cm esp",
      peso: "75 kg/peça",
      aplicacao: "Fechamento perimetral de lotes e fazendas"
    }
  },
  {
    id: "pm-2",
    name: "Mourão de Concreto Armado Seção 'H' para Muro (Altura 3.00m)",
    categoryType: "muro",
    dimensions: "3.00m x 0.12m x 0.12m",
    price: 85.00,
    pricePix: 76.50,
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
    desc: "Pilar de encaixe reforçado com canaleta dupla em 'H' para encaixe deslizante de placas de muro pré-moldado.",
    rating: 5.0,
    specs: {
      resistencia: "Concreto Estrutural Fck 35 MPa",
      armacao: "4 Vergalhões de Aço CA-50 5/16",
      dimensoesPadrão: "3.00m altura total (2.50m livre + 0.50m engaste)",
      peso: "92 kg/peça",
      aplicacao: "Sustentação vertical de muros de concreto"
    }
  },
  {
    id: "pm-3",
    name: "Mourão de Concreto Reta para Cerca de Arame (2.20m)",
    categoryType: "mourão",
    dimensions: "2.20m x 0.10m x 0.10m",
    price: 38.00,
    pricePix: 34.20,
    image: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop",
    desc: "Mourão de seção quadrada reforçado com furos passantes para arame farpado ou liso. Imune a cupins e fogo.",
    rating: 4.8,
    specs: {
      resistencia: "Concreto Vibrado Fck 25 MPa",
      armacao: "4 Fios de Aço CA-60 4.2mm",
      dimensoesPadrão: "2.20m comp c/ 9 furos passantes",
      peso: "42 kg/peça",
      aplicacao: "Cercamento rural e divisas de propriedades"
    }
  },
  {
    id: "pm-4",
    name: "Estrutura Pré-Moldada para Galpão Agroindustrial (Pilar + Tesoura)",
    categoryType: "galpão",
    dimensions: "Vão Livre 12.00m a 20.00m",
    price: 18900.00,
    pricePix: 17010.00,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    desc: "Kit completo de pilares e tesouras articuladas de concreto protendido para galpões de armazenamento de grãos e maquinários.",
    rating: 5.0,
    specs: {
      resistencia: "Concreto Protendido Fck 45 MPa",
      armacao: "Cordoalhas de Aço Alta Proteção CP-190",
      dimensoesPadrão: "Pé direito de 5.00m a 7.00m",
      peso: "Sob projeto",
      aplicacao: "Galpões agrícolas, industriais e depósitos"
    }
  },
  {
    id: "pm-5",
    name: "Manilha / Tubo de Concreto Armado PS1 para Drenagem (0.60m x 1.00m)",
    categoryType: "tubo",
    dimensions: "Ø 60cm x 1.00m",
    price: 110.00,
    pricePix: 99.00,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    desc: "Tubo de concreto com encaixe ponta e bolsa para drenagem pluvial, águas pluviais e passagem de córregos.",
    rating: 4.9,
    specs: {
      resistencia: "Concreto Drenagem Fck 30 MPa c/ Armação",
      armacao: "Gaiola de Aço Soldada",
      dimensoesPadrão: "Diâmetro interno 60cm x 1m comprimento",
      peso: "180 kg/peça",
      aplicacao: "Drenagem urbana e bueiros de estradas rurais"
    }
  }
];

export default function PreMoldadosClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<PreMoldadoProduct | null>(null);
  const [cart, setCart] = useState<Array<{ product: PreMoldadoProduct; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Muro Calculator State
  const [muroMeters, setMuroMeters] = useState<number>(50); // linear meters
  const [muroHeight, setMuroHeight] = useState<number>(2.0); // 1.5, 2.0, 2.5m

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Calculator math for Muro Pré Moldado
  const muroCalc = useMemo(() => {
    // Each panel is 2.00m long x 0.50m high
    const postsQty = Math.ceil(muroMeters / 2) + 1;
    const slabsPerColumn = Math.ceil(muroHeight / 0.5);
    const totalSlabs = Math.ceil(muroMeters / 2) * slabsPerColumn;
    const estimatedPrice = (totalSlabs * 43.20) + (postsQty * 76.50);

    return {
      postsQty,
      slabsPerColumn,
      totalSlabs,
      estimatedPrice
    };
  }, [muroMeters, muroHeight]);

  const filteredProducts = useMemo(() => {
    return PRE_MOLDADOS_CATALOG.filter(p => {
      const matchCat = selectedCategory === "all" || p.categoryType === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: PreMoldadoProduct) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`🏗️ "${product.name}" adicionada ao orçamento!`);
  };

  const sendWhatsAppQuote = (items = cart) => {
    let text = `Olá! Solicito orçamento para *Pré-Moldados de Concreto Armado* na *Só Madeiras*:\n\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (${item.product.dimensions})\n`;
      text += `   - Quantidade: ${item.quantity} unidade(s)\n`;
      text += `   - Valor Unitário (Pix): R$ ${item.product.pricePix.toFixed(2)}\n\n`;
    });
    const totalPix = items.reduce((acc, i) => acc + (i.product.pricePix * i.quantity), 0);
    text += `*TOTAL ESTIMADO (PIX): R$ ${totalPix.toFixed(2)}*\n\n`;
    text += `Solicito cálculo de frete de carreta com guindaste para descarga na obra. Obrigado!`;

    window.open(`https://api.whatsapp.com/send?phone=5579996298990&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-stone-900 text-white border-b border-amber-500/30 sticky top-0 z-40 shadow-xl no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-amber-500/20 p-2 rounded-xl text-white hover:text-amber-400 transition"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white flex items-center gap-2">
                <span>🏗️ PRÉ-MOLDADOS DE CONCRETO</span>
              </h1>
              <p className="text-[10px] text-amber-400 font-mono tracking-wider font-bold">ESTRUTURAS & MUROS DE ALTA RESISTÊNCIA</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline uppercase">Orçamento ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="bg-red-600 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-stone-900 border border-amber-400 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-800 text-white py-10 px-4 border-b border-amber-500/20 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="bg-amber-500/10 border border-amber-400/30 text-amber-400 font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Construção Civil & Agronegócio
            </span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Muros Pré-Moldados, Mourões e Galpões de Concreto
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
              Concreto vibrado de alta densidade (Fck até 45 MPa) com aço soldado CA-50/60. Economize até 60% no custo e tempo em comparação com alvenaria tradicional.
            </p>
          </div>

          <div className="bg-stone-800 p-4 rounded-2xl border border-stone-700 space-y-2 text-xs min-w-[260px]">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Building2 className="h-4 w-4" />
              <span>Concreto Fck 30 a 45 MPa</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Shield className="h-4 w-4 text-amber-400" />
              <span>Normas ABNT NBR 9062 / NBR 6118</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Truck className="h-4 w-4 text-amber-400" />
              <span>Frota Própria c/ Carga e Descarga</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATED MURO CALCULATOR */}
      <section className="max-w-7xl mx-auto w-full px-4 pt-8">
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-3xl p-6 shadow-md space-y-5">
          <div className="flex items-center gap-3 border-b border-stone-150 dark:border-neutral-800 pb-3">
            <Calculator className="h-6 w-6 text-amber-500" />
            <div>
              <h3 className="font-display font-black text-base text-stone-900 dark:text-white uppercase">
                Calculadora Rápida de Muro Pré-Moldado
              </h3>
              <p className="text-xs text-stone-400">Calcule placas e pilares necessários para fechar seu terreno ou fazenda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Extensão do Muro (Metros Lineares):</span>
                  <span className="text-amber-600 dark:text-amber-400 font-black">{muroMeters} metros</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={muroMeters}
                  onChange={(e) => setMuroMeters(parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <span className="font-bold block">Altura do Muro Desejada:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[1.5, 2.0, 2.5].map((h) => (
                    <button
                      key={h}
                      onClick={() => setMuroHeight(h)}
                      className={`py-2 rounded-xl font-bold transition text-xs cursor-pointer ${
                        muroHeight === h 
                          ? "bg-amber-500 text-stone-950 font-black shadow" 
                          : "bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {h.toFixed(1)}m de Altura
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-6 bg-stone-50 dark:bg-neutral-850 p-4 rounded-2xl border border-stone-200 dark:border-neutral-800 space-y-3 text-xs">
              <span className="font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block text-[10px]">
                Resultado Estimado do Kit Muro:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center font-bold">
                <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-xl border">
                  <span className="text-[10px] text-stone-400 block">Pilares H:</span>
                  <span className="text-base text-stone-900 dark:text-white font-black">{muroCalc.postsQty} un</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-xl border">
                  <span className="text-[10px] text-stone-400 block">Placas Lisas:</span>
                  <span className="text-base text-stone-900 dark:text-white font-black">{muroCalc.totalSlabs} un</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-xl border">
                  <span className="text-[10px] text-stone-400 block">Total Pix:</span>
                  <span className="text-base text-amber-600 dark:text-amber-400 font-black">R$ {muroCalc.estimatedPrice.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const text = `Olá! Gostaria de cotar o kit para *Muro Pré-Moldado*:\n- Extensão: ${muroMeters}m lineares\n- Altura: ${muroHeight}m\n- Pilares 'H': ${muroCalc.postsQty} peças\n- Placas Lisas 2.00x0.50m: ${muroCalc.totalSlabs} peças\n\nFavor informar frete e disponibilidade.`;
                  window.open(`https://api.whatsapp.com/send?phone=5579996298990&text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl shadow transition flex items-center justify-center gap-1.5 uppercase text-xs tracking-wider"
              >
                <Phone className="h-4 w-4" /> Solicitar Orçamento deste Muro via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        
        {/* FILTERS */}
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Categorias:</span>
            {["all", "muro", "mourão", "galpão", "tubo"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-stone-300 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "Todos os Pré-Moldados" : cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar pré-moldado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 w-full bg-slate-100 dark:bg-neutral-950 relative overflow-hidden p-4 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-stone-900 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {prod.categoryType}
                  </span>
                  <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {prod.dimensions}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="font-bold text-[11px] text-slate-700 dark:text-stone-300">({prod.rating.toFixed(1)})</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">NBR ABNT</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition line-clamp-2">
                    {prod.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-relaxed line-clamp-2">
                    {prod.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">Preço À Vista (PIX)</span>
                      <span className="text-base font-black text-stone-900 dark:text-amber-400 block">
                        R$ {prod.pricePix.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium line-through">
                      R$ {prod.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow cursor-pointer uppercase tracking-wider"
                >
                  <Plus className="h-4 w-4" /> Orçar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* TECH SPEC MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-neutral-800 relative text-left">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-slate-150 dark:border-neutral-800 pb-3">
              <span className="text-[9px] uppercase font-black text-amber-500 tracking-wider block">{selectedProduct.categoryType} • Concreto Armado</span>
              <h3 className="font-display font-black text-base text-slate-900 dark:text-white">{selectedProduct.name}</h3>
            </div>

            <div className="h-44 bg-slate-50 dark:bg-neutral-950 rounded-2xl flex items-center justify-center p-3">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full object-contain" />
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">Especificações Técnicas:</span>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-neutral-850 p-3 rounded-xl border border-slate-150 dark:border-neutral-800 font-medium">
                <div>
                  <span className="text-[9px] text-slate-400 block">Resistência do Concreto:</span>
                  <span>{selectedProduct.specs.resistencia}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Armação Estrutural:</span>
                  <span>{selectedProduct.specs.armacao}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Dimensões Padrão:</span>
                  <span>{selectedProduct.specs.dimensoesPadrão}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Peso Unitário:</span>
                  <span>{selectedProduct.specs.peso}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] text-slate-400 block">Aplicação Recomendada:</span>
                  <span>{selectedProduct.specs.aplicacao}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-150 dark:border-neutral-800 flex gap-2">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow"
              >
                Adicionar ao Orçamento
              </button>
              <button
                onClick={() => sendWhatsAppQuote([{ product: selectedProduct, quantity: 1 }])}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end no-print">
          <div className="bg-white dark:bg-neutral-900 max-w-md w-full h-full p-6 shadow-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center border-b border-slate-150 dark:border-neutral-800 pb-3 mb-4">
                <h3 className="font-display font-black text-sm uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-amber-500" /> Orçamento de Pré-Moldados
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <p className="font-bold text-xs uppercase">Nenhum item selecionado</p>
                  <p className="text-[10px]">Adicione peças do catálogo para formar o seu lote.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-3 bg-slate-50 dark:bg-neutral-850 rounded-xl border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white block">{item.product.name}</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black">R$ {item.product.pricePix.toFixed(2)}/un</span>
                      </div>
                      <span className="font-bold bg-slate-200 dark:bg-neutral-800 px-2 py-1 rounded">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-150 dark:border-neutral-800 space-y-3">
                <button
                  onClick={() => sendWhatsAppQuote()}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase text-xs tracking-wider"
                >
                  <Phone className="h-4 w-4" /> Enviar Cotação de Pré-Moldados no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 py-6 border-t border-amber-500/20 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 SÓ MADEIRAS LTDA - Estância/SE • Estruturas de Concreto Pré-Moldado</span>
          <Link href="/" className="text-amber-400 hover:underline font-bold">Voltar para a Página Principal</Link>
        </div>
      </footer>
    </div>
  );
}
