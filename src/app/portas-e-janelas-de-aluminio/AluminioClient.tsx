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
  Sparkles
} from "lucide-react";

interface AluminioProduct {
  id: string;
  name: string;
  line: string; // Suprema or Gold
  color: string; // Preto, Branco, Amadeirado
  dimensions: string;
  price: number;
  pricePix: number;
  image: string;
  desc: string;
  rating: number;
  specs: {
    folhas: string;
    vidro: string;
    fechadura: string;
    persiana: string;
    peso: string;
  };
}

const ALUMINIO_CATALOG: AluminioProduct[] = [
  {
    id: "alu-1",
    name: "Porta Balcão de Alumínio Preto com Persiana Integrada Automatizada",
    line: "Linha Gold 32mm",
    color: "Preto Anodizado Fosco",
    dimensions: "2.15m x 1.60m",
    price: 3490.00,
    pricePix: 3141.00,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    desc: "Esquadria de alto padrão com persiana blackout de enrolar automatizada via controle remoto. Isolamento térmico e acústico superior.",
    rating: 5.0,
    specs: {
      folhas: "2 Folhas de correr + Persiana motorizada",
      vidro: "Vidro Temperado 6mm Incolor",
      fechadura: "Fecho Concha c/ Chave Inox",
      persiana: "Sim (Motorizado c/ Controle)",
      peso: "52 kg"
    }
  },
  {
    id: "alu-2",
    name: "Janela de Correr 4 Folhas Alumínio Preto Linha Suprema com Vidro",
    line: "Linha Suprema 25mm",
    color: "Preto Anodizado Fosco",
    dimensions: "1.20m x 1.50m",
    price: 1190.00,
    pricePix: 1071.00,
    image: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop",
    desc: "Janela de correr 4 folhas (2 fixas + 2 móveis) com escova de vedação perimetral acústica e roldanas duplas em nylon.",
    rating: 4.9,
    specs: {
      folhas: "4 Folhas (2 Fixas + 2 Móveis)",
      vidro: "Vidro Liso 4mm Incolor",
      fechadura: "Fecho Central Automático Udinese",
      persiana: "Não",
      peso: "22 kg"
    }
  },
  {
    id: "alu-3",
    name: "Porta Pivotante de Alumínio Preto com Puxador Inox 1 metro",
    line: "Linha Gold 32mm",
    color: "Preto Anodizado Fosco",
    dimensions: "2.20m x 1.00m",
    price: 2890.00,
    pricePix: 2601.00,
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
    desc: "Porta de entrada imponente com frisos horizontais em baixo relevo, pino pivotante de inox e fechadura rolete de segurança.",
    rating: 5.0,
    specs: {
      folhas: "1 Folha Pivotante c/ Puxador 1.00m",
      vidro: "Filete Lateral Vidro Laminado Refletivo",
      fechadura: "Fechadura Rolete Pado c/ Cilíndro Multiponto",
      persiana: "Não",
      peso: "41 kg"
    }
  },
  {
    id: "alu-4",
    name: "Janela Maxim-Ar Alumínio Branco Linha Suprema com Vidro Mini-Boreal",
    line: "Linha Suprema 25mm",
    color: "Branco Neve Eletrostático",
    dimensions: "0.60m x 0.60m",
    price: 389.00,
    pricePix: 350.10,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
    desc: "Perfeita para áreas molhadas (banheiro, lavabo e área de serviço). Vidro mini-boreal que garante privacidade mantendo a luminosidade.",
    rating: 4.8,
    specs: {
      folhas: "1 Folha Basculante de Projeção",
      vidro: "Vidro Mini-Boreal 4mm (Privacidade)",
      fechadura: "Haste Maxim-ar Alumínio Reforçada",
      persiana: "Não",
      peso: "8 kg"
    }
  },
  {
    id: "alu-5",
    name: "Porta Social de Giro Alumínio Branco com Alizares Prontos",
    line: "Linha Suprema 25mm",
    color: "Branco Neve Eletrostático",
    dimensions: "2.10m x 0.80m",
    price: 990.00,
    pricePix: 891.00,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    desc: "Porta pronta para instalação com batente, dobradiças embutidas e fechadura Papaiz. Não enferruja nem desbota.",
    rating: 4.8,
    specs: {
      folhas: "1 Folha de Abrir / Giro",
      vidro: "Não (Alumínio Cego Liso)",
      fechadura: "Fechadura Papaiz Externa c/ Chaves",
      persiana: "Não",
      peso: "18 kg"
    }
  }
];

export default function AluminioClient() {
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<AluminioProduct | null>(null);
  const [cart, setCart] = useState<Array<{ product: AluminioProduct; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredProducts = useMemo(() => {
    return ALUMINIO_CATALOG.filter(p => {
      const matchColor = selectedColor === "all" || p.color.toLowerCase().includes(selectedColor.toLowerCase());
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchColor && matchSearch;
    });
  }, [selectedColor, searchQuery]);

  const addToCart = (product: AluminioProduct) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`🚪 "${product.name}" adicionada ao orçamento!`);
  };

  const sendWhatsAppQuote = (items = cart) => {
    let text = `Olá! Solicito orçamento comercial de *Portas e Janelas de Alumínio* (Esquadrias) na *Só Madeiras*:\n\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (${item.product.dimensions})\n`;
      text += `   - Linha: ${item.product.line} | Cor: ${item.product.color}\n`;
      text += `   - Quantidade: ${item.quantity} unidade(s)\n`;
      text += `   - Valor Unitário (Pix): R$ ${item.product.pricePix.toFixed(2)}\n\n`;
    });
    const totalPix = items.reduce((acc, i) => acc + (i.product.pricePix * i.quantity), 0);
    text += `*TOTAL ESTIMADO (PIX): R$ ${totalPix.toFixed(2)}*\n\n`;
    text += `Solicito contato para negociação de frete e faturamento. Obrigado!`;

    window.open(`https://api.whatsapp.com/send?phone=5579996298990&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-white transition"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>
            <div>
              <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white flex items-center gap-2">
                <span>🚪 PORTAS & JANELAS DE ALUMÍNIO</span>
              </h1>
              <p className="text-[10px] text-cyan-400 font-mono tracking-wider font-bold">LINHA SUPREMA & GOLD PREMIUM</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
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
        <div className="fixed bottom-6 right-6 bg-slate-950 border border-cyan-400 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-850 py-10 px-4 border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Esquadrias Anodizadas & Eletrostáticas
            </span>
            <h2 className="font-display font-black text-2xl md:text-4xl text-white uppercase tracking-tight leading-tight">
              Portas Balcão, Pivotantes e Janelas Blindex / Alumínio
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
              Design minimalista moderno em Alumínio Preto Fosco e Branco Neve. Não enferruja, oferece altíssima estanqueidade e pintura com garantia de 10 anos.
            </p>
          </div>

          <div className="bg-slate-850 p-4 rounded-2xl border border-slate-750 space-y-2 text-xs min-w-[260px]">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <span>Linhas Gold 32mm e Suprema 25mm</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span>Garantia contra Corrosão Náutica</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Truck className="h-4 w-4 text-cyan-400" />
              <span>Prontidão para Instalação em Obra</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6 flex-1">
        
        {/* FILTERS */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Acabamento:</span>
            {["all", "Preto", "Branco"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedColor === color
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {color === "all" ? "Todos os Acabamentos" : color === "Preto" ? "⚫ Preto Anodizado" : "⚪ Branco Neve"}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar esquadria de alumínio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-850 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 w-full bg-slate-950 relative overflow-hidden p-4 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900 border border-slate-700 text-cyan-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {prod.line}
                  </span>
                  <span className="absolute top-3 right-3 bg-cyan-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {prod.dimensions}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-bold text-[11px] text-slate-200">({prod.rating.toFixed(1)})</span>
                    <span className="text-[10px] text-cyan-400 font-mono ml-auto">{prod.color}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white leading-snug group-hover:text-cyan-400 transition line-clamp-2">
                    {prod.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-light leading-relaxed line-clamp-2">
                    {prod.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">Preço À Vista (PIX)</span>
                      <span className="text-base font-black text-cyan-400 block">
                        R$ {prod.pricePix.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium line-through">
                      R$ {prod.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow cursor-pointer uppercase tracking-wider"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-800 relative text-left">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-[9px] uppercase font-black text-cyan-400 tracking-wider block">{selectedProduct.line} • {selectedProduct.color}</span>
              <h3 className="font-display font-black text-base text-white">{selectedProduct.name}</h3>
            </div>

            <div className="h-44 bg-slate-950 rounded-2xl flex items-center justify-center p-3">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full object-contain" />
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-white uppercase text-[10px] block">Especificações Técnicas:</span>
              <div className="grid grid-cols-2 gap-2 bg-slate-850 p-3 rounded-xl border border-slate-800 font-medium text-slate-200">
                <div>
                  <span className="text-[9px] text-slate-400 block">Medidas Padrão:</span>
                  <span>{selectedProduct.dimensions}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Configuração Folhas:</span>
                  <span>{selectedProduct.specs.folhas}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Especificação do Vidro:</span>
                  <span>{selectedProduct.specs.vidro}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Fechadura / Fecho:</span>
                  <span>{selectedProduct.specs.fechadura}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Persiana Integrada:</span>
                  <span>{selectedProduct.specs.persiana}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Peso Estrutural:</span>
                  <span>{selectedProduct.specs.peso}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex justify-end no-print">
          <div className="bg-slate-900 max-w-md w-full h-full p-6 shadow-2xl flex flex-col justify-between space-y-4 border-l border-slate-800">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <h3 className="font-display font-black text-sm uppercase text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-cyan-400" /> Orçamento de Esquadrias
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <p className="font-bold text-xs uppercase">Nenhuma esquadria selecionada</p>
                  <p className="text-[10px]">Selecione itens do catálogo acima para formar a sua lista.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-3 bg-slate-850 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-white block">{item.product.name}</span>
                        <span className="text-[10px] text-cyan-400 font-black">R$ {item.product.pricePix.toFixed(2)}/un</span>
                      </div>
                      <span className="font-bold bg-slate-800 px-2 py-1 rounded">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <button
                  onClick={() => sendWhatsAppQuote()}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase text-xs tracking-wider"
                >
                  <Phone className="h-4 w-4" /> Enviar Cotação de Alumínio no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-6 border-t border-slate-800 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 SÓ MADEIRAS LTDA - Estância/SE • Esquadrias de Alumínio de Alto Padrão</span>
          <Link href="/" className="text-cyan-400 hover:underline font-bold">Voltar para a Página Principal</Link>
        </div>
      </footer>
    </div>
  );
}
