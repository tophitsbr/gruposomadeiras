"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { AboutSection } from "../components/AboutSection";
import { 
  ArrowLeft, 
  Phone, 
  Check, 
  RefreshCw, 
  Info, 
  Plus, 
  X, 
  CheckCircle,
  HelpCircle,
  Layers,
  Trash2,
  ChevronRight,
  Maximize2
} from "lucide-react";

// Types
interface RoomItem {
  id: string;
  name: string;
  width: number; // meters
  length: number; // meters
  direction: "width" | "length";
  
  // Calculated materials for this specific room
  panelsQty: number;
  panelLength: number; // standard length chosen (3, 4, 5, 6m)
  ripaoQty: number; // pieces of ripaoLength
  ripaoLength: number; // standard length chosen (3, 4, 5, 6m)
  ripasQty: number; // 3m pieces
  screwsQty: number; // individual units
  trimQty: number; // 3m pieces
  area: number; // m2
}

interface ForroProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  desc: string;
  specs: string;
  color: string;
}

const INITIAL_FORRO_PRODUCTS: ForroProduct[] = [
  {
    id: "forro-pvc-1",
    name: "Forro PVC Branco Frisado 20cm x 8mm",
    brand: "Plastilit / Madelar",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop",
    desc: "Forro de PVC rígido anticorrosivo com excelente isolamento térmico e acústico. Não propaga chamas.",
    specs: "20cm de largura | 8mm de espessura | Peças de 3m, 4m, 5m e 6m",
    color: "Branco Neve"
  },
  {
    id: "forro-pvc-2",
    name: "Forro PVC Madeirado Ipê Nobre 20cm x 8mm",
    brand: "Só Madeiras Premium",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=400&auto=format&fit=crop",
    desc: "Design amadeirado rústico luxo de alta resistência contra raios solares e lavável.",
    specs: "20cm de largura | 8mm de espessura | Película UV de alta proteção",
    color: "Madeira Ipê"
  }
];

export default function CalculadoraForroPVC() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  // Forro Products Management State
  const [isAdmin, setIsAdmin] = useState(false);
  const [forroProducts, setForroProducts] = useState<ForroProduct[]>([]);
  const [isForroModalOpen, setIsForroModalOpen] = useState(false);
  const [editingForro, setEditingForro] = useState<ForroProduct | null>(null);
  const [forroForm, setForroForm] = useState({
    name: "",
    brand: "Só Madeiras",
    image: "",
    desc: "",
    specs: "20cm de largura | 8mm de espessura",
    color: "Branco"
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const isStaff = localStorage.getItem("somadeiras_staff_authenticated") === "true";
      const mode = new URLSearchParams(window.location.search).get("mode");
      if (isStaff || mode === "admin" || mode === "staff") {
        setIsAdmin(true);
      }
    }

    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try {
        setSettings(JSON.parse(local));
      } catch (e) {
        console.error(e);
      }
    }

    const localForros = localStorage.getItem("somadeiras_forro_products");
    if (localForros) {
      try {
        setForroProducts(JSON.parse(localForros));
      } catch (e) {
        setForroProducts(INITIAL_FORRO_PRODUCTS);
      }
    } else {
      setForroProducts(INITIAL_FORRO_PRODUCTS);
    }
  }, []);

  const updateForroProducts = (newList: ForroProduct[]) => {
    setForroProducts(newList);
    localStorage.setItem("somadeiras_forro_products", JSON.stringify(newList));
  };

  const activeWhatsapp = settings?.whatsappNumber || "5579996298990";

  // Global States
  const [roomsList, setRoomsList] = useState<RoomItem[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Form Input States
  const [roomName, setRoomName] = useState<string>("Sala de Estar");
  const [width, setWidth] = useState<number>(4.0); // meters (2.0 to 8.0)
  const [length, setLength] = useState<number>(5.0); // meters (2.0 to 10.0)
  const [panelDirection, setPanelDirection] = useState<"width" | "length">("width");

  // Lead Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadState, setLeadState] = useState("");
  const [systemNotification, setSystemNotification] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // CONSOLIDATED MULTI-ROOM TOTAL ESTIMATION (SEM EXIBIÇÃO DE PREÇOS)
  // ==========================================
  const consolidatedMaterials = useMemo(() => {
    let totalArea = 0;
    let totalRipao = 0;
    let totalRipas = 0;
    let totalScrews = 0;
    let totalTrim = 0;
    
    // Map of panel quantities sorted by length
    const panelsByLength: { [key: number]: number } = { 3: 0, 4: 0, 5: 0, 6: 0 };
    // Map of Ripão quantities sorted by length
    const ripaoByLength: { [key: number]: number } = { 3: 0, 4: 0, 5: 0, 6: 0 };

    roomsList.forEach(r => {
      totalArea += r.area;
      totalRipao += r.ripaoQty;
      totalRipas += r.ripasQty;
      totalScrews += r.screwsQty;
      totalTrim += r.trimQty;
      panelsByLength[r.panelLength] = (panelsByLength[r.panelLength] || 0) + r.panelsQty;
      ripaoByLength[r.ripaoLength] = (ripaoByLength[r.ripaoLength] || 0) + r.ripaoQty;
    });

    const screwBoxes = Math.ceil(totalScrews / 100);

    return {
      totalArea,
      panelsByLength,
      ripaoByLength,
      totalRipao,
      totalRipas,
      totalScrews,
      screwBoxes,
      totalTrim
    };
  }, [roomsList]);


  // Capture lead abandonment when modal closes without submission
  useEffect(() => {
    if (!isLeadModalOpen && !isSubmitted && roomsList.length > 0 && (leadName.trim() || leadPhone.trim())) {
      const phoneDigits = leadPhone.replace(/\D/g, "");
      if (phoneDigits.length >= 8) {
        const somadeirasLeads = localStorage.getItem("somadeiras_leads");
        const parsedLeads = somadeirasLeads ? JSON.parse(somadeirasLeads) : [];
        
        const alreadySaved = parsedLeads.some((l: any) => 
          l.phone.replace(/\D/g, "") === phoneDigits && 
          l.status === "Carrinho Abandonado" &&
          l.source === "Calculadora Forro PVC"
        );

        if (!alreadySaved) {
          const newAbandonedLead = {
            id: "pvc-abandoned-" + Date.now(),
            name: leadName || "Cliente Anônimo",
            phone: leadPhone,
            city: leadCity || "Não informada",
            state: leadState || "SP",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            source: "Calculadora Forro PVC",
            utm: "utm_source=pvc_calculator&utm_medium=cart_abandonment",
            products: [`Forro PVC Multi-Cômodos (${roomsList.length} cômodos) x1`],
            total: 0,

            status: "Carrinho Abandonado",
            sellerId: "maria",
            device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "Mobile (Web)" : "Desktop (Web)") : "Web",
            notes: `Carrinho abandonado na simulação de Forro PVC para ${roomsList.length} cômodo(s). Área total: ${consolidatedMaterials.totalArea.toFixed(1)}m².`
          };

          localStorage.setItem("somadeiras_leads", JSON.stringify([newAbandonedLead, ...parsedLeads]));
        }
      }
    }
  }, [isLeadModalOpen]);

  // DYNAMIC NOTIFICATIONS
  const addSystemNotification = (msg: string) => {
    setSystemNotification(msg);
    setTimeout(() => {
      setSystemNotification(null);
    }, 3000);
  };

  // ==========================================
  // SINGLE ROOM MATERIAL CALCULATION FORMULAS
  // ==========================================
  const calculateRoomMaterials = (rWidth: number, rLength: number, rDir: "width" | "length"): {
    panelsQty: number;
    panelLength: number;
    ripaoQty: number;
    ripaoLength: number;
    ripasQty: number;
    screwsQty: number;
    trimQty: number;
    area: number;
  } => {
    const area = rWidth * rLength;
    const panelWidth = 0.20; // 20cm panels

    // 1. Choose PVC Panel standard length (3, 4, 5, or 6 meters)
    const requiredLength = rDir === "width" ? rWidth : rLength;
    let panelLength = 3.0;
    if (requiredLength <= 3.0) panelLength = 3.0;
    else if (requiredLength <= 4.0) panelLength = 4.0;
    else if (requiredLength <= 5.0) panelLength = 5.0;
    else panelLength = 6.0;

    // 2. Count panels
    const spanToCover = rDir === "width" ? rLength : rWidth;
    const panelsNominal = Math.ceil(spanToCover / panelWidth);
    // Add 5% safety margin for cutting losses
    const panelsQty = Math.ceil(panelsNominal * 1.05);

    // 3. Ripão structure (Spacing: every 60cm, perpendicular to panels)
    // If panels are parallel to width, Ripão runs parallel to length
    const ripaoSpan = rDir === "width" ? rWidth : rLength;
    const ripaoLengthOfRow = rDir === "width" ? rLength : rWidth;
    const ripaoRows = Math.ceil(ripaoSpan / 0.6) + 1;
    const totalRipaoMeters = ripaoRows * ripaoLengthOfRow;
    
    // Choose ideal Ripão standard length (3, 4, 5, or 6 meters) to cover ripaoLengthOfRow
    let ripaoLength = 3.0;
    if (ripaoLengthOfRow <= 3.0) ripaoLength = 3.0;
    else if (ripaoLengthOfRow <= 4.0) ripaoLength = 4.0;
    else if (ripaoLengthOfRow <= 5.0) ripaoLength = 5.0;
    else ripaoLength = 6.0;

    let piecesPerRow = 1;
    if (ripaoLengthOfRow > ripaoLength) {
      piecesPerRow = Math.ceil(ripaoLengthOfRow / ripaoLength);
    }
    // We add a 15% safety margin for cutting losses so they don't run out of timber
    const ripaoQty = Math.ceil((ripaoRows * piecesPerRow) * 1.15);

    // 4. Ripas structure (used for perimeter leveling framing around the walls)
    const perimeter = 2 * (rWidth + rLength);
    // We add a 10% waste margin for perimeter cutting losses
    const ripasQty = Math.ceil((perimeter * 1.10) / 3.0); 

    // 5. Screws & Anchors (Parafusos e Buchas)
    // - For fixing panels to wood structure (approx 1 screw per slat-intersect)
    const panelFixings = panelsQty * ripaoRows;
    // - For fixing structure to wall/ceiling slab (every 80cm)
    const framingFixings = Math.ceil(totalRipaoMeters / 0.8) + Math.ceil(perimeter / 0.6);
    const screwsQty = Math.ceil((panelFixings + framingFixings) * 1.1); // +10% waste

    // 6. Perimeter Trim Molding (Acabamento / Perfil Sanca / Perfil U)
    const trimQty = Math.ceil(perimeter / 3.0); // 3m pieces

    return {
      panelsQty,
      panelLength,
      ripaoQty,
      ripaoLength,
      ripasQty,
      screwsQty,
      trimQty,
      area
    };
  };

  // ROOM LIST STATE ACTIONS
  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      alert("Por favor, digite um nome para o cômodo.");
      return;
    }

    const calculated = calculateRoomMaterials(width, length, panelDirection);
    const newRoom: RoomItem = {
      id: "room-" + Date.now(),
      name: roomName,
      width,
      length,
      direction: panelDirection,
      ...calculated
    };

    setRoomsList([...roomsList, newRoom]);
    setSelectedRoomId(newRoom.id);
    addSystemNotification(`Cômodo "${roomName}" adicionado com sucesso!`);
    
    // Auto reset name state with next sensible room name
    const nextRoomIndex = roomsList.length + 2;
    setRoomName(`Cômodo ${nextRoomIndex}`);
  };

  const handleDeleteRoom = (id: string, name: string) => {
    const updated = roomsList.filter(r => r.id !== id);
    setRoomsList(updated);
    if (selectedRoomId === id) {
      setSelectedRoomId(updated.length > 0 ? updated[0].id : null);
    }
    addSystemNotification(`Cômodo "${name}" removido!`);
  };

  const handleClearAllRooms = () => {
    if (window.confirm("Deseja realmente limpar toda a lista de cômodos?")) {
      setRoomsList([]);
      setSelectedRoomId(null);
      addSystemNotification("Todos os cômodos foram removidos.");
    }
  };

  // Currently selected room object
  const selectedRoom = useMemo(() => {
    if (!selectedRoomId) return null;
    return roomsList.find(r => r.id === selectedRoomId) || null;
  }, [roomsList, selectedRoomId]);



  // WHATSAPP QUOTE GENERATION
  const handleSendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomsList.length === 0) {
      alert("Por favor, adicione pelo menos um cômodo para gerar o orçamento.");
      return;
    }
    if (!leadName || !leadPhone || !leadCity || !leadState) {
      alert("Por favor, preencha todos os campos do contato.");
      return;
    }

    let text = `Olá! Solicito orçamento de materiais para o seguinte projeto de *Forro PVC com Ripamento de Madeira*:\n\n`;
    
    text += `*DETALHE POR CÔMODOS:*\n`;
    roomsList.forEach((r, idx) => {
      text += `${idx + 1}. *${r.name}* (${r.width}x${r.length}m | ${r.area.toFixed(1)}m²)\n`;
      text += `   - ${r.panelsQty} placas de Forro PVC 20cm x ${r.panelLength}m (sentido: ${r.direction === "width" ? "largura" : "comprimento"})\n`;
      text += `   - Ripão de Madeira 5x3cm: ${r.ripaoQty} peças de ${r.ripaoLength}m\n`;
      text += `   - Ripa de Madeira 5x1cm: ${r.ripasQty} peças de 3m\n`;
      text += `   - Acabamento Perímetro: ${r.trimQty} peças de 3m\n`;
    });

    text += `\n*ESTIMATIVA CONSOLIDADA DE MATERIAIS:*\n`;
    Object.keys(consolidatedMaterials.panelsByLength).forEach((lenStr) => {
      const len = parseFloat(lenStr);
      const qty = consolidatedMaterials.panelsByLength[len];
      if (qty > 0) {
        text += `- Placa Forro PVC 20cm x ${len}m: *${qty} unidades*\n`;
      }
    });
    Object.keys(consolidatedMaterials.ripaoByLength).forEach((lenStr) => {
      const len = parseFloat(lenStr);
      const qty = consolidatedMaterials.ripaoByLength[len];
      if (qty > 0) {
        text += `- Ripão de Madeira 5x3cm x ${len}m: *${qty} peças*\n`;
      }
    });
    text += `- Ripa de Madeira 5x1cm (3.0m): *${consolidatedMaterials.totalRipas} peças*\n`;
    text += `- Acabamento Perímetro Perfil U (3.0m): *${consolidatedMaterials.totalTrim} peças*\n`;
    text += `- Caixa de Parafusos/Buchas (c/ 100): *${consolidatedMaterials.screwBoxes} caixas* (${consolidatedMaterials.totalScrews} un)\n`;
    
    text += `\n*RESUMO GERAL DE MATERIAIS:*\n`;
    text += `- Área Total a Forrar: ${consolidatedMaterials.totalArea.toFixed(1)}m²\n\n`;

    text += `*DADOS DO PRODUTOR/COMPRADOR:*\n`;
    text += `- Nome: ${leadName}\n`;
    text += `- Contato: ${leadPhone}\n`;
    text += `- Cidade/UF: ${leadCity} - ${leadState}\n\n`;
    text += `Solicito contato para negociação e proposta final. Obrigado!`;

    // Save Lead to localStorage Commercial flow
    const somadeirasLeads = localStorage.getItem("somadeiras_leads");
    const parsedLeads = somadeirasLeads ? JSON.parse(somadeirasLeads) : [];
    
    const newLead = {
      id: "pvc-" + Date.now(),
      name: leadName,
      phone: leadPhone,
      city: leadCity,
      state: leadState,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Calculadora Forro PVC",
      utm: "utm_source=pvc_calculator&utm_medium=multiroom_simulation",
      products: [`Forro PVC Multi-Cômodos (${roomsList.length} cômodos) x1`],
      total: 0,
      status: "Novo Lead",
      sellerId: "maria",
      device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "Mobile / Web" : "Windows / Web") : "Web",
      notes: `Solicitou orçamento para ${roomsList.length} cômodos. Área total de ${consolidatedMaterials.totalArea.toFixed(1)}m².`
    };


    localStorage.setItem("somadeiras_leads", JSON.stringify([newLead, ...parsedLeads]));

    setIsSubmitted(true);
    setIsLeadModalOpen(false);
    addSystemNotification("Orçamento formatado! Redirecionando para o WhatsApp...");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${activeWhatsapp}&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* HEADER SECTION */}
      <header className="bg-[#3E2723] text-white border-b border-[#F4B400]/25 shadow-md sticky top-0 z-40 no-print">
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
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#F4B400]" />
                <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">
                  CALCULADORA DE FORRO PVC & SUBESTRUTURA
                </h1>
              </div>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">SÓ MADEIRAS PREMIUM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider">
              Placa 20cm | Ripão 5x3 | Ripa 5x1
            </span>
            <span className="text-[11px] text-stone-300 font-mono">v1.1</span>
          </div>
        </div>
      </header>

      {/* SYSTEM NOTIFICATION OVERLAY */}
      {systemNotification && (
        <div className="fixed bottom-6 right-6 bg-[#3E2723] border border-[#F4B400] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle className="h-4 w-4 text-[#F4B400]" />
          <span>{systemNotification}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 space-y-6">
        
        {/* FORRO PRODUCTS CATALOG & MANAGEMENT SECTION */}
        <section className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-150 dark:border-neutral-800 pb-3">
            <div>
              <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                🏠 Modelos de Forro PVC Disponíveis ({forroProducts.length})
              </h3>
              <p className="text-[10px] text-slate-400">Cadastre, edite informações ou troque imagens dos forros do catálogo</p>
            </div>
            
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingForro(null);
                  setForroForm({
                    name: "",
                    brand: "Só Madeiras",
                    image: "",
                    desc: "",
                    specs: "20cm de largura | 8mm de espessura",
                    color: "Branco"
                  });
                  setIsForroModalOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-full shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>➕ Cadastrar Forro</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forroProducts.map((forro) => (
              <div
                key={forro.id}
                className="border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-850 rounded-2xl p-4 space-y-3 relative group transition hover:shadow-md"
              >
                <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-900 relative border border-slate-200/50">
                  <img
                    src={forro.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop"}
                    alt={forro.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop"; }}
                  />
                  
                  {/* Photo Change trigger - APENAS ADMIN */}
                  {isAdmin && (
                    <label className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition">
                      📷 Trocar Foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updated = forroProducts.map(f => f.id === forro.id ? { ...f, image: reader.result as string } : f);
                              updateForroProducts(updated);
                              setSystemNotification(`📷 Foto do ${forro.name} alterada!`);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-black uppercase text-[#F4B400] tracking-wider">{forro.brand}</span>
                    <span className="text-[9px] bg-slate-200 dark:bg-neutral-800 px-2 py-0.5 rounded font-black text-slate-800 dark:text-stone-200">{forro.color}</span>
                  </div>
                  <h4 className="font-black text-xs text-slate-900 dark:text-white leading-snug">{forro.name}</h4>
                  <p className="text-[11px] text-slate-700 dark:text-stone-300 leading-normal font-medium line-clamp-2">{forro.desc}</p>
                  <p className="text-[10px] text-slate-800 dark:text-stone-200 font-bold font-mono pt-1">{forro.specs}</p>
                </div>

                {isAdmin && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-neutral-800 flex justify-end gap-2 text-xs">
                    <button
                      onClick={() => {
                        setEditingForro(forro);
                        setForroForm({
                          name: forro.name,
                          brand: forro.brand,
                          image: forro.image,
                          desc: forro.desc,
                          specs: forro.specs,
                          color: forro.color
                        });
                        setIsForroModalOpen(true);
                      }}
                      className="px-3 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-neutral-800 text-amber-800 dark:text-amber-300 rounded-lg font-bold text-[10px]"
                    >
                      ✏️ Editar Info
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Deseja realmente excluir o forro "${forro.name}"?`)) {
                          const updated = forroProducts.filter(f => f.id !== forro.id);
                          updateForroProducts(updated);
                          setSystemNotification(`🗑️ Forro "${forro.name}" removido!`);
                        }
                      }}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-neutral-800 text-red-600 rounded-lg font-bold text-[10px]"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                )}
              </div>

            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: CONFIGURATOR INPUT PANEL */}
          <section className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-5 self-start">

          <div className="border-b border-slate-150 dark:border-neutral-800 pb-2">
            <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
              🚪 1. Configurar Cômodo
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Defina as dimensões e o sentido das placas de PVC</p>
          </div>

          <form onSubmit={handleAddRoom} className="space-y-4 text-xs">
            {/* Room Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Nome do Cômodo / Ambiente:</label>
              <input
                type="text"
                required
                placeholder="Ex: Quarto Principal, Cozinha, Sala..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
              />
            </div>

            {/* Width slide */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>Largura (Vão das Placas):</span>
                <span className="text-[#3E2723] dark:text-[#F4B400] font-black">{width.toFixed(1)}m</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="8.0"
                step="0.1"
                value={width}
                onChange={(e) => { setWidth(parseFloat(e.target.value)); }}
                className="w-full h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#3E2723]"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>2.0m</span>
                <span>Dimensão Horizontal</span>
                <span>8.0m</span>
              </div>
            </div>

            {/* Length slide */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>Comprimento (Compr. Cômodo):</span>
                <span className="text-[#3E2723] dark:text-[#F4B400] font-black">{length.toFixed(1)}m</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="10.0"
                step="0.1"
                value={length}
                onChange={(e) => { setLength(parseFloat(e.target.value)); }}
                className="w-full h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#3E2723]"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>2.0m</span>
                <span>Dimensão Longitudinal</span>
                <span>10.0m</span>
              </div>
            </div>

            {/* Direction Select */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Sentido de Instalação das Placas:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setPanelDirection("width"); }}
                  className={`p-2 rounded-xl text-center text-[10px] font-black uppercase transition ${
                    panelDirection === "width"
                      ? "bg-[#3E2723] text-white border-none shadow-md"
                      : "bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 text-slate-500"
                  }`}
                >
                  ↔️ Paralelo à Largura
                </button>
                <button
                  type="button"
                  onClick={() => { setPanelDirection("length"); }}
                  className={`p-2 rounded-xl text-center text-[10px] font-black uppercase transition ${
                    panelDirection === "length"
                      ? "bg-[#3E2723] text-white border-none shadow-md"
                      : "bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 text-slate-500"
                  }`}
                >
                  ↕️ Paralelo ao Comprim.
                </button>
              </div>
              <span className="text-[9px] text-slate-400 block mt-1 leading-relaxed">
                💡 *Dica:* Instale as placas paralelas ao menor vão para minimizar cortes e aproveitar melhor as placas.
              </span>
            </div>

            {/* ADD ROOM BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#3E2723] hover:bg-[#2C1A18] text-white font-black text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer border-none"
            >
              <Plus className="h-4 w-4" /> Adicionar Cômodo
            </button>
          </form>

          {/* ADDED ROOMS LIST SELECTOR */}
          {roomsList.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-[#3E2723] dark:text-[#F4B400] uppercase tracking-wide">
                  📋 Cômodos ({roomsList.length})
                </span>
                <button 
                  onClick={handleClearAllRooms}
                  className="text-red-500 hover:text-red-700 font-bold text-[10px] uppercase hover:underline cursor-pointer bg-transparent border-none"
                >
                  Limpar Todos
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {roomsList.map((room) => (
                  <div 
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-2.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                      selectedRoomId === room.id
                        ? "bg-[#5D4037]/10 border-[#5D4037] text-slate-900 dark:text-white"
                        : "bg-slate-50 dark:bg-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-800 border-slate-150 dark:border-neutral-800"
                    }`}
                  >
                    <div>
                      <span className="font-black text-xs block">{room.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        {room.width}x{room.length}m | Placa {room.panelLength}m | {room.area.toFixed(1)}m²
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteRoom(room.id, room.name); }}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer bg-transparent border-none"
                      title="Excluir cômodo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: CALCULATION RESULTS PANEL */}
        <section className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* CURRENT SELECTED ROOM DETAIL PANEL */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-neutral-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                  🔍 Detalhes do Cômodo Selecionado
                </h3>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">Memória de cálculo individual</p>
              </div>
              
              {selectedRoom && (
                <span className="bg-slate-100 dark:bg-neutral-850 text-slate-650 dark:text-stone-300 font-mono font-black text-[10px] px-2.5 py-0.5 rounded shadow-2xs">
                  {selectedRoom.name}
                </span>
              )}
            </div>

            {!selectedRoom ? (
              <div className="text-center py-12 text-slate-450 space-y-2">
                <Layers className="h-10 w-10 text-[#F4B400] mx-auto opacity-75 animate-bounce" />
                <p className="font-bold text-xs">Aguardando dados dos cômodos.</p>
                <p className="font-light text-[11px] max-w-sm mx-auto">Adicione seu primeiro cômodo à esquerda para calcular as placas de PVC de 20cm, ripas de 5x1cm e ripões de 5x3cm.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Structural specification details */}
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 dark:bg-neutral-850 p-4 rounded-2xl border border-slate-150 dark:border-neutral-800 space-y-3">
                    <span className="font-black text-[10px] text-[#3E2723] dark:text-[#F4B400] uppercase tracking-wider block">
                      Dimensões & Instalação:
                    </span>
                    <div className="grid grid-cols-2 gap-3 font-medium">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Medidas úteis:</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedRoom.width}m x {selectedRoom.length}m</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Área do teto:</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedRoom.area.toFixed(1)} m²</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Placa Comercial:</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Larg. 20cm | Comp. {selectedRoom.panelLength}m</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Sentido das Placas:</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {selectedRoom.direction === "width" ? "Largura" : "Comprimento"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-[#5D4037] dark:text-[#F4B400] tracking-wider uppercase block text-[9px]">
                      Parâmetros Normativos Utilizados:
                    </span>
                    <ul className="list-disc pl-4 text-[10px] text-slate-500 font-medium space-y-1">
                      <li>Espaçamento dos Ripões de 5x3cm: **máximo a cada 60cm** (evita abaulamento do PVC).</li>
                      <li>Nivelamento de contorno: **Ripa de 5x1cm** fixada em todo o perímetro.</li>
                      <li>Acabamento perimetral: barra de perfil moldura (Perfil U/Moldura) de 3m.</li>
                      <li>Fixadores: Parafuso c/ bucha S8 para a estrutura, parafuso soberbo zincado para as placas.</li>
                    </ul>
                  </div>
                </div>

                {/* SIngle room calculated list */}
                <div className="space-y-3">
                  <span className="font-black text-[10px] text-[#3E2723] dark:text-[#F4B400] uppercase tracking-wider block">
                    Materiais p/ este Cômodo:
                  </span>
                  
                  <div className="divide-y divide-slate-100 dark:divide-neutral-850 text-xs">
                    <div className="py-2 flex justify-between">
                      <span className="font-bold text-slate-650 dark:text-stone-300">Placas PVC (20cm x {selectedRoom.panelLength}m)</span>
                      <span className="font-black text-slate-800 dark:text-[#F4B400]">{selectedRoom.panelsQty} Peças</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-bold text-slate-650 dark:text-stone-300">Ripão de Madeira (5x3cm x {selectedRoom.ripaoLength}m)</span>
                      <span className="font-black text-slate-800 dark:text-[#F4B400]">{selectedRoom.ripaoQty} Peças</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-bold text-slate-650 dark:text-stone-300">Ripa Niveladora (5x1cm x 3.0m)</span>
                      <span className="font-black text-slate-800 dark:text-[#F4B400]">{selectedRoom.ripasQty} Peças</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-bold text-slate-650 dark:text-stone-300">Acabamento Perímetro (3.0m)</span>
                      <span className="font-black text-slate-800 dark:text-[#F4B400]">{selectedRoom.trimQty} Peças</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-bold text-slate-650 dark:text-stone-300">Kit Parafusos e Buchas S8</span>
                      <span className="font-black text-slate-800 dark:text-[#F4B400]">{selectedRoom.screwsQty} un</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* DYNAMIC CONSOLIDATED ORÇAMENTO COMPLETO SECTION */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                  📋 Relatório e Orçamento Geral de Materiais
                </h3>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">Detalhamento por cômodos e consolidação de compra</p>
              </div>
              
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 font-mono font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">
                📐 {consolidatedMaterials.totalArea.toFixed(1)} m² de Área Total
              </span>
            </div>

            {roomsList.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-450 space-y-2">
                <Info className="h-8 w-8 text-[#F4B400] mx-auto opacity-75" />
                <p className="font-bold">Nenhum cômodo cadastrado ainda.</p>
                <p className="font-light">Adicione cômodos no painel lateral para gerar a lista total unificada.</p>
              </div>
            ) : (
              <>
                {/* ROOM BY ROOM BREAKDOWN */}
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black text-slate-450 dark:text-stone-400 uppercase tracking-widest block pb-1 border-b border-slate-100 dark:border-neutral-800/60">
                    🏠 Materiais Separados por Cômodo / Ambiente
                  </h4>
                  
                  {roomsList.map((room, index) => {
                    // Calculate costs for this specific room
                    const panelsM2 = room.panelsQty * (room.panelLength * 0.20);
                    const panelsCost = panelsM2 * 28.00;
                    
                    let ripaoPriceUnit = 11.50;
                    if (room.ripaoLength === 4) ripaoPriceUnit = 15.30;
                    else if (room.ripaoLength === 5) ripaoPriceUnit = 19.10;
                    else if (room.ripaoLength === 6) ripaoPriceUnit = 23.00;
                    
                    const ripaoCost = room.ripaoQty * ripaoPriceUnit;
                    const ripasCost = room.ripasQty * 6.20;
                    const trimCost = room.trimQty * 16.50;
                    const screwsCost = room.screwsQty * 0.18; // proportional cost based on box price
                    const roomSubtotal = panelsCost + ripaoCost + ripasCost + trimCost + screwsCost;

                    return (
                      <div key={room.id} className="bg-slate-50/50 dark:bg-neutral-850/20 border border-slate-150 dark:border-neutral-800/80 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-850/50 pb-2">
                          <span className="font-black text-xs text-[#3E2723] dark:text-[#F4B400] uppercase">
                            🚪 {index + 1}. {room.name} ({room.width}m x {room.length}m | {room.area.toFixed(1)}m²)
                          </span>
                          <span className="text-[9px] bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-stone-300 font-mono font-bold px-2 py-0.5 rounded">
                            Sentido: {room.direction === "width" ? "Largura" : "Comprimento"}
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="text-slate-900 dark:text-stone-300 font-black uppercase text-[9px] tracking-wider border-b border-slate-200 dark:border-neutral-800">
                                <th className="py-2">Item / Insumo</th>
                                <th className="py-2">Dimensões / Especificações</th>
                                <th className="py-2 text-right">Quant.</th>
                                <th className="py-2 text-center">Unid.</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-neutral-800 text-[11px]">
                              {/* PVC panels */}
                              <tr className="hover:bg-slate-100 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">Placas Forro PVC 20cm</td>
                                <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px]">Placa de 20cm larg. x {room.panelLength.toFixed(1)}m comp.</td>
                                <td className="py-2.5 text-right font-black text-slate-900 dark:text-[#F4B400] text-xs">{room.panelsQty}</td>
                                <td className="py-2.5 text-center text-slate-700 dark:text-slate-300 font-bold text-[10px]">Peças</td>
                              </tr>
                              {/* Ripão */}
                              <tr className="hover:bg-slate-100 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">Ripão Estrutural de Madeira 5x3cm</td>
                                <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px]">Peça de {room.ripaoLength.toFixed(1)}m | Espaçamento 60cm perpendicular</td>
                                <td className="py-2.5 text-right font-black text-slate-900 dark:text-[#F4B400] text-xs">{room.ripaoQty}</td>
                                <td className="py-2.5 text-center text-slate-700 dark:text-slate-300 font-bold text-[10px]">Peças</td>
                              </tr>
                              {/* Ripas */}
                              <tr className="hover:bg-slate-100 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">Ripa Niveladora de Madeira 5x1cm</td>
                                <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px]">Peça de 3.0m | Nivelamento perímetro alvenaria</td>
                                <td className="py-2.5 text-right font-black text-slate-900 dark:text-[#F4B400] text-xs">{room.ripasQty}</td>
                                <td className="py-2.5 text-center text-slate-700 dark:text-slate-300 font-bold text-[10px]">Peças</td>
                              </tr>
                              {/* Trim */}
                              <tr className="hover:bg-slate-100 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">Moldura Acabamento Perfil U</td>
                                <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px]">Barra de 3.0m | Contorno perimetral estético</td>
                                <td className="py-2.5 text-right font-black text-slate-900 dark:text-[#F4B400] text-xs">{room.trimQty}</td>
                                <td className="py-2.5 text-center text-slate-700 dark:text-slate-300 font-bold text-[10px]">Peças</td>
                              </tr>
                              {/* Screws */}
                              <tr className="hover:bg-slate-100 dark:hover:bg-neutral-800/40">
                                <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100">Parafusos e Buchas S8 + Soberbos</td>
                                <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px]">Kit de fixação placas e madeira (Laje/Parede)</td>
                                <td className="py-2.5 text-right font-black text-slate-900 dark:text-[#F4B400] text-xs">{room.screwsQty}</td>
                                <td className="py-2.5 text-center text-slate-700 dark:text-slate-300 font-bold text-[10px]">un</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>


                {/* CONSOLIDATED TOTAL FOR STOCK/PURCHASE */}
                <div className="pt-6 border-t border-slate-200 dark:border-neutral-800 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-black text-[#3E2723] dark:text-[#F4B400] uppercase tracking-widest block">
                      📋 Resumo Geral Consolidado da Obra (Compra Unificada)
                    </h4>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-black mt-0.5">Agrupado e pronto para pedido de faturamento comercial</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-150 dark:border-neutral-800 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                          <th className="py-2">Material / Insumo</th>
                          <th className="py-2">Especificação Técnica</th>
                          <th className="py-2 text-right">Quant. Total</th>
                          <th className="py-2 text-center">Unid.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-neutral-850">
                        {/* PVC Panels sorted by length */}
                        {Object.keys(consolidatedMaterials.panelsByLength).map((lenStr) => {
                          const len = parseFloat(lenStr);
                          const qty = consolidatedMaterials.panelsByLength[len];
                          if (qty === 0) return null;
                          return (
                            <tr key={`pvc-${len}`} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                              <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">Placas de Forro PVC 20cm</td>
                              <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">Placa Larg. 20cm | Comp. {len.toFixed(1)}m</td>
                              <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{qty}</td>
                              <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">Peças</td>
                            </tr>
                          );
                        })}

                        {/* Ripão sorted by length */}
                        {Object.keys(consolidatedMaterials.ripaoByLength).map((lenStr) => {
                          const len = parseFloat(lenStr);
                          const qty = consolidatedMaterials.ripaoByLength[len];
                          if (qty === 0) return null;
                          return (
                            <tr key={`ripao-${len}`} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                              <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">Ripão Estrutural de Madeira 5x3cm</td>
                              <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">Dimensão 5x3cm | Peças de {len.toFixed(1)}m</td>
                              <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{qty}</td>
                              <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">Peças</td>
                            </tr>
                          );
                        })}

                        {/* Ripas */}
                        {consolidatedMaterials.totalRipas > 0 && (
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                            <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">Ripa Niveladora de Madeira 5x1cm</td>
                            <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">Dimensão 5x1cm | Peças de 3.0m</td>
                            <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{consolidatedMaterials.totalRipas}</td>
                            <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">Peças</td>
                          </tr>
                        )}

                        {/* Trim molding */}
                        {consolidatedMaterials.totalTrim > 0 && (
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                            <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">Acabamento Moldura Perímetro</td>
                            <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">Perfil U / Sanca plástica | Peça de 3.0m</td>
                            <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{consolidatedMaterials.totalTrim}</td>
                            <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">Peças</td>
                          </tr>
                        )}

                        {/* Screws */}
                        {consolidatedMaterials.totalScrews > 0 && (
                          <tr className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                            <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">Parafusos c/ Buchas e Fixadores</td>
                            <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">Parafusos soberbos p/ ripamento e PVC</td>
                            <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{consolidatedMaterials.screwBoxes}</td>
                            <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">Caixa (100un)</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* ACTION BOX */}
                  <div className="bg-[#5D4037]/10 border border-[#5D4037]/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs text-slate-550 block uppercase tracking-wider">Projeto Pronto para Cotação Comercial:</span>
                      <span className="text-[10px] text-slate-450 block leading-relaxed max-w-lg pt-1">
                        *Solicite proposta personalizada e agende entrega direta na sua obra com a equipe Só Madeiras.
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            const saved = JSON.parse(localStorage.getItem("somadeiras_saved_forro_budgets") || "[]");
                            const newEntry = {
                              id: `forro-budget-${Date.now()}`,
                              date: new Date().toLocaleDateString("pt-BR"),
                              rooms: roomsList,
                              totalArea: consolidatedMaterials.totalArea
                            };
                            localStorage.setItem("somadeiras_saved_forro_budgets", JSON.stringify([newEntry, ...saved]));
                            alert(`💾 Orçamento de Forro PVC salvo com sucesso para ${roomsList.length} cômodo(s)!`);
                          }
                        }}
                        className="flex-1 sm:flex-none bg-stone-800 hover:bg-stone-700 text-white font-black text-xs px-5 py-4 rounded-xl shadow-lg transition cursor-pointer uppercase tracking-wider border border-white/10 active:scale-97"
                      >
                        💾 Salvar Orçamento
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsSubmitted(false); setIsLeadModalOpen(true); }}
                        className="flex-1 sm:flex-none bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs px-8 py-4 rounded-xl shadow-xl transition cursor-pointer uppercase tracking-wider border-none active:scale-97"
                      >
                        ⚙️ Solicitar Cotação / Enviar p/ WhatsApp
                      </button>
                    </div>
                  </div>


                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>


      {/* LEAD CAPTURE MODAL OVERLAY */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-scaleUp">
            
            <button 
              type="button" 
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-stone-200 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#F4B400]" />
                <h3 className="font-display font-black text-base uppercase text-[#3E2723] dark:text-white">
                  Orçamento de Forro PVC 20cm
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                Gere seu orçamento comercial via WhatsApp
              </p>
            </div>

            <form onSubmit={handleSendWhatsAppQuote} className="space-y-3.5 pt-2 text-xs">
              {/* Product summary card in modal */}
              <div className="bg-slate-50 dark:bg-neutral-850 p-3 rounded-xl border border-slate-150 dark:border-neutral-850">
                <span className="font-black text-slate-700 dark:text-slate-200 block text-[11px] uppercase tracking-wide">
                  📋 Resumo do Orçamento:
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-1 leading-relaxed">
                  Forro PVC com **Ripão 5x3cm** e **Ripa 5x1cm** para *{roomsList.length} cômodos* (Área Total: {consolidatedMaterials.totalArea.toFixed(1)}m²). Cotação sob consulta com entrega direta na obra.
                </span>

              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Nome do Produtor / Comprador</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: José da Silva (Fazenda Ouro Verde)"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">WhatsApp Comercial</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (19) 99988-1122"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                />
              </div>

              {/* City and State */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Cidade</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Indaiatuba"
                    value={leadCity}
                    onChange={(e) => setLeadCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Estado</label>
                  <select
                    value={leadState}
                    required
                    onChange={(e) => setLeadState(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold cursor-pointer text-slate-800 dark:text-white"
                  >
                    <option value="">UF</option>
                    <option value="SP">SP</option>
                    <option value="MG">MG</option>
                    <option value="PR">PR</option>
                    <option value="GO">GO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="RJ">RJ</option>
                    <option value="ES">ES</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-4 bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs py-3.5 rounded-xl shadow-xl transition active:scale-97 uppercase tracking-wider border-none flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="h-4 w-4" /> Enviar Cotação Consolidada
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORRO PRODUCT CRUD MODAL */}
      {isForroModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print text-left">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-lg shadow-2xl p-6 border border-stone-200 dark:border-neutral-800 space-y-4 relative">
            <button
              onClick={() => setIsForroModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-white p-1 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-stone-150 dark:border-neutral-800 pb-3">
              <h3 className="font-display font-black text-lg text-[#3E2723] dark:text-white uppercase flex items-center gap-2">
                <span>🏠 {editingForro ? "Editar Forro Cadastrado" : "Cadastrar Novo Forro PVC"}</span>
              </h3>
              <p className="text-xs text-stone-400">Preencha as informações do produto de forro para o catálogo</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!forroForm.name.trim()) {
                  alert("Por favor, preencha o nome do forro.");
                  return;
                }

                const newForroObj: ForroProduct = {
                  id: editingForro ? editingForro.id : "forro-" + Date.now(),
                  name: forroForm.name.trim(),
                  brand: forroForm.brand.trim() || "Só Madeiras",
                  image: forroForm.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop",
                  desc: forroForm.desc.trim(),
                  specs: forroForm.specs.trim(),
                  color: forroForm.color.trim()
                };

                let updated: ForroProduct[];
                if (editingForro) {
                  updated = forroProducts.map(f => f.id === editingForro.id ? newForroObj : f);
                  setSystemNotification(`✅ Forro "${newForroObj.name}" atualizado!`);
                } else {
                  updated = [newForroObj, ...forroProducts];
                  setSystemNotification(`🏠 Novo forro "${newForroObj.name}" cadastrado!`);
                }

                updateForroProducts(updated);
                setIsForroModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Nome do Forro PVC *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Forro PVC Madeirado Ipê 20cm x 8mm"
                  value={forroForm.name}
                  onChange={(e) => setForroForm({ ...forroForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-bold text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Fabricante / Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Plastilit, Madelar, Só Madeiras"
                    value={forroForm.brand}
                    onChange={(e) => setForroForm({ ...forroForm, brand: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-bold text-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Cor / Acabamento *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Branco Neve, Amadeirado Ipê"
                    value={forroForm.color}
                    onChange={(e) => setForroForm({ ...forroForm, color: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-bold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Especificações Técnicas</label>
                <input
                  type="text"
                  placeholder="Ex: 20cm largura | 8mm espessura | régua de 3m a 6m"
                  value={forroForm.specs}
                  onChange={(e) => setForroForm({ ...forroForm, specs: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-600 dark:text-stone-300 uppercase text-[10px] block">Imagem do Forro (URL ou Upload)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Ex: URL https://..."
                    value={forroForm.image}
                    onChange={(e) => setForroForm({ ...forroForm, image: e.target.value })}
                    className="flex-1 bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-bold text-slate-800 dark:text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForroForm({ ...forroForm, image: reader.result as string });
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
                  rows={3}
                  placeholder="Ex: Forro de PVC de alta densidade com isolamento termoacústico e visual moderno..."
                  value={forroForm.desc}
                  onChange={(e) => setForroForm({ ...forroForm, desc: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl p-2.5 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end border-t border-stone-150 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsForroModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-stone-600 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-neutral-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-500 shadow transition"
                >
                  Salvar Forro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AboutSection />


      {/* FOOTER */}
      <footer className="bg-[#3E2723] text-stone-300 border-t border-[#F4B400]/25 py-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#F4B400]" />
              <span className="font-display font-black text-sm tracking-wider uppercase text-white">SÓ MADEIRAS</span>
            </div>
            <p className="font-light leading-relaxed max-w-sm text-stone-400">
              Forros de alta resistência e subestruturas de madeira serrada aparelhada com precisão. O melhor material para sua obra.
            </p>
          </div>

          <div className="space-y-3 text-left md:text-right">
            <span className="font-bold text-white uppercase block text-[10px] tracking-widest text-[#F4F400]">
              Calculadoras Técnicas Premium
            </span>
            <div className="flex flex-wrap md:justify-end gap-3 text-[11px] font-bold">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/pergolados" className="hover:text-white transition">Calculadora de Pergolados 3D</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/galpoes-currais" className="hover:text-white transition">Calculadora Agro 3D</Link>
              <span className="text-[#F4B400]">|</span>
              <span className="text-white">Calculadora Forro PVC</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-2 font-mono">
              © 2026 Só Madeiras. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
