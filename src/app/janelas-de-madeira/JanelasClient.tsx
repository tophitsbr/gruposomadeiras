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
  Truck
} from "lucide-react";

interface JanelaProduct {
  id: string;
  name: string;
  woodType: string;
  dimensions: string;
  price: number;
  pricePix: number;
  image: string;
  desc: string;
  rating: number;
  specs: {
    leaves: string;
    opening: string;
    finish: string;
    glassIncluded: boolean;
    weight: string;
    brand: string;
  };
}

const JANELAS_CATALOG: JanelaProduct[] = [
  {
    id: "jan-1",
    name: "Janela Veneziana de Correr 4 Folhas em Angelim Pedra",
    woodType: "Angelim Pedra",
    dimensions: "1.20m x 1.50m",
    price: 980.00,
    pricePix: 882.00,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    desc: "Janela veneziana 4 folhas (2 venezianas cegas + 2 folhas p/ vidro) confeccionada em Angelim Pedra maciço seco em estufa.",
    rating: 4.9,
    specs: {
      leaves: "4 Folhas (2 Venezianas + 2 Vidros)",
      opening: "Correr lateral sobre trilhos de latão",
      finish: "Lixada natural pronta para verniz ou stain",
      glassIncluded: false,
      weight: "38 kg",
      brand: "Só Madeiras"
    }
  },
  {
    id: "jan-2",
    name: "Janela Maxim-Ar de Madeira Tauari com Batente e Vidro",
    woodType: "Tauari Nobre",
    dimensions: "0.60m x 0.60m",
    price: 349.00,
    pricePix: 314.10,
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
    desc: "Ideal para banheiros, lavabos e cozinhas. Acompanha batente (portal) de 12cm e haste de articulação em latão.",
    rating: 4.8,
    specs: {
      leaves: "1 Folha basculante de projeção",
      opening: "Maxim-Ar (Abre para fora)",
      finish: "Secagem técnica em estufa de alta precisão",
      glassIncluded: true,
      weight: "12 kg",
      brand: "Só Madeiras"
    }
  },
  {
    id: "jan-3",
    name: "Janela Colonial 2 Folhas de Abrir em Ipê Maciço",
    woodType: "Ipê Nobre",
    dimensions: "1.20m x 1.20m",
    price: 1450.00,
    pricePix: 1305.00,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    desc: "Estilo colonial rústico clássico. Excelente vedação e acústica para residências de alto padrão e fazendas.",
    rating: 5.0,
    specs: {
      leaves: "2 Folhas de abrir para fora c/ almofadas",
      opening: "Giro / Abrir c/ dobradiças reforçadas",
      finish: "Tratamento cupinicida e fungicida náutico",
      glassIncluded: false,
      weight: "45 kg",
      brand: "Só Madeiras Premium"
    }
  },
  {
    id: "jan-4",
    name: "Janela de Correr 2 Folhas para Vidro em Eucalipto Tratado",
    woodType: "Eucalipto Citriodora",
    dimensions: "1.00m x 1.20m",
    price: 520.00,
    pricePix: 468.00,
    image: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop",
    desc: "Linha sustentável de reflorestamento com autoclave contra cupins e umidade. Baixo custo e alto rendimento.",
    rating: 4.6,
    specs: {
      leaves: "2 Folhas móveis de correr",
      opening: "Correr horizontal c/ roldanas duplas",
      finish: "Aparelhada e polida pronta p/ pintura",
      glassIncluded: false,
      weight: "24 kg",
      brand: "Só Madeiras Agro"
    }
  },
  {
    id: "jan-5",
    name: "Janela Guilhotina Rústica com Vidro e Trava",
    woodType: "Angelim Pedra",
    dimensions: "1.40m x 0.80m",
    price: 890.00,
    pricePix: 801.00,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    desc: "Abertura vertical guilhotina clássica com contrapesos e travas de segurança. Elegância tradicional.",
    rating: 4.7,
    specs: {
      leaves: "2 Folhas de correr vertical",
      opening: "Guilhotina c/ sistema de mola tracionada",
      finish: "Madeira aparelhada pronta p/ selador",
      glassIncluded: true,
      weight: "32 kg",
      brand: "Só Madeiras"
    }
  }
];

export default function JanelasClient() {
  const [selectedWood, setSelectedWood] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedJanela, setSelectedJanela] = useState<JanelaProduct | null>(null);
  const [cart, setCart] = useState<Array<{ product: JanelaProduct; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredJanelas = useMemo(() => {
    return JANELAS_CATALOG.filter(j => {
      const matchWood = selectedWood === "all" || j.woodType.toLowerCase().includes(selectedWood.toLowerCase());
      const matchSearch = j.name.toLowerCase().includes(searchQuery.toLowerCase()) || j.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWood && matchSearch;
    });
  }, [selectedWood, searchQuery]);

  const addToCart = (product: JanelaProduct) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`🪟 "${product.name}" adicionada ao orçamento!`);
  };

  const sendWhatsAppQuote = (items = cart) => {
    let text = `Olá! Gostaria de solicitar um orçamento para *Janelas de Madeira* na *Só Madeiras*:\n\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (${item.product.dimensions})\n`;
      text += `   - Madeira: ${item.product.woodType}\n`;
      text += `   - Quantidade: ${item.quantity} unidade(s)\n`;
      text += `   - Valor Unitário (Pix): R$ ${item.product.pricePix.toFixed(2)}\n\n`;
    });
    const totalPix = items.reduce((acc, i) => acc + (i.product.pricePix * i.quantity), 0);
    text += `*TOTAL ESTIMADO (PIX): R$ ${totalPix.toFixed(2)}*\n\n`;
    text += `Solicito confirmação de estoque e custo de frete para entrega na minha obra. Obrigado!`;

    window.open(`https://api.whatsapp.com/send?phone=5579996298990&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-[#3E2723] text-white border-b border-[#F4B400]/30 sticky top-0 z-40 shadow-md no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-white/10 hover:bg-[#F4B400]/20 p-2 rounded-xl text-white hover:text-[#F4B400] transition"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white flex items-center gap-2">
                <span>🪟 JANELAS DE MADEIRA DE LEI</span>
              </h1>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">SÓ MADEIRAS PREMIUM</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
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
        <div className="fixed bottom-6 right-6 bg-[#3E2723] border border-[#F4B400] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 text-[#F4B400]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* MAIN BANNER HERO */}
      <section className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#5D4037] text-white py-10 px-4 shadow-lg border-b border-[#F4B400]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
              Esquadrias Especiais de Madeira
            </span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Janelas Venezianas, de Correr e Maxim-Ar Sob Medida
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
              Feitas com madeira de lei tratada em estufa (Angelim, Ipê, Tauari). Vedação acústica e térmica de alta durabilidade para sua casa ou fazenda.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 space-y-2 text-xs min-w-[260px]">
            <div className="flex items-center gap-2 text-[#F4B400] font-bold">
              <Shield className="h-4 w-4" />
              <span>Garantia de Fábrica</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Truck className="h-4 w-4 text-[#F4B400]" />
              <span>Entrega Direta na Obra</span>
            </div>
            <div className="flex items-center gap-2 text-stone-200">
              <Ruler className="h-4 w-4 text-[#F4B400]" />
              <span>Fabricação Sob Consulta</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        
        {/* FILTERS AND SEARCH BAR */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="h-4 w-4 text-[#F4B400] shrink-0" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Madeiras:</span>
            {["all", "Angelim", "Tauari", "Ipê", "Eucalipto"].map((wood) => (
              <button
                key={wood}
                onClick={() => setSelectedWood(wood)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedWood === wood
                    ? "bg-[#3E2723] text-white shadow-sm"
                    : "bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-stone-300 hover:bg-slate-200"
                }`}
              >
                {wood === "all" ? "Todas as Madeiras" : wood}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar janela por nome ou medida..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F4B400]"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJanelas.map((janela) => (
            <div
              key={janela.id}
              className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 w-full bg-slate-100 dark:bg-neutral-950 relative overflow-hidden p-4 flex items-center justify-center">
                  <img
                    src={janela.image}
                    alt={janela.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#3E2723] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {janela.woodType}
                  </span>
                  <span className="absolute top-3 right-3 bg-[#F4B400] text-[#3E2723] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {janela.dimensions}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="font-bold text-[11px] text-slate-700 dark:text-stone-300">({janela.rating || 4.9})</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">Fator Acústico ★★★</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-[#F4B400] transition line-clamp-2">
                    {janela.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-relaxed line-clamp-2">
                    {janela.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">Preço À Vista (PIX)</span>
                      <span className="text-base font-black text-[#3E2723] dark:text-[#F4B400] block">
                        R$ {janela.pricePix.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium line-through">
                      R$ {janela.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedJanela(janela)}
                  className="w-full bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => addToCart(janela)}
                  className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow cursor-pointer uppercase tracking-wider"
                >
                  <Plus className="h-4 w-4" /> Orçar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* TECH SPEC MODAL */}
      {selectedJanela && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-neutral-800 relative">
            <button
              onClick={() => setSelectedJanela(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-slate-150 dark:border-neutral-800 pb-3">
              <span className="text-[9px] uppercase font-black text-[#F4B400] tracking-wider block">{selectedJanela.woodType}</span>
              <h3 className="font-display font-black text-base text-slate-900 dark:text-white">{selectedJanela.name}</h3>
            </div>

            <div className="h-44 bg-slate-50 dark:bg-neutral-950 rounded-2xl flex items-center justify-center p-3">
              <img src={selectedJanela.image} alt={selectedJanela.name} className="max-h-full object-contain" />
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100 uppercase text-[10px] block">Especificações de Fábrica:</span>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-neutral-850 p-3 rounded-xl border border-slate-150 dark:border-neutral-800 font-medium">
                <div>
                  <span className="text-[9px] text-slate-400 block">Medidas Padrão:</span>
                  <span>{selectedJanela.dimensions}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Folhas:</span>
                  <span>{selectedJanela.specs.leaves}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Tipo de Abertura:</span>
                  <span>{selectedJanela.specs.opening}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Acabamento:</span>
                  <span>{selectedJanela.specs.finish}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Vidros Incluídos:</span>
                  <span>{selectedJanela.specs.glassIncluded ? "Sim (Incluso)" : "Não (Somente Madeira)"}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Peso Estimado:</span>
                  <span>{selectedJanela.specs.weight}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-150 dark:border-neutral-800 flex gap-2">
              <button
                onClick={() => {
                  addToCart(selectedJanela);
                  setSelectedJanela(null);
                }}
                className="flex-1 bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow"
              >
                Adicionar ao Orçamento
              </button>
              <button
                onClick={() => sendWhatsAppQuote([{ product: selectedJanela, quantity: 1 }])}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART SLIDE OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end no-print">
          <div className="bg-white dark:bg-neutral-900 max-w-md w-full h-full p-6 shadow-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center border-b border-slate-150 dark:border-neutral-800 pb-3 mb-4">
                <h3 className="font-display font-black text-sm uppercase text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#F4B400]" /> Orçamento de Janelas
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <p className="font-bold text-xs uppercase">Nenhuma janela selecionada</p>
                  <p className="text-[10px]">Adicione modelos do catálogo acima para solicitar o orçamento.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-3 bg-slate-50 dark:bg-neutral-850 rounded-xl border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white block">{item.product.name}</span>
                        <span className="text-[10px] text-[#F4B400] font-black">R$ {item.product.pricePix.toFixed(2)}/un</span>
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
                  <Phone className="h-4 w-4" /> Enviar Cotação de Janelas no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#3E2723] text-stone-300 py-6 border-t border-[#F4B400]/20 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 SÓ MADEIRAS LTDA - Estância/SE • Esquadrias de Madeira Nobre</span>
          <Link href="/" className="text-[#F4B400] hover:underline font-bold">Voltar para a Página Principal</Link>
        </div>
      </footer>
    </div>
  );
}
