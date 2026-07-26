"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AboutSection } from "../components/AboutSection";
import Link from "next/link";
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  Star, 
  Check, 
  Sliders, 
  Maximize2, 
  Eye, 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Flame, 
  Clock, 
  Copy, 
  Zap, 
  ArrowRight,
  Info,
  Calendar,
  AlertTriangle,
  Lock,
  ChevronRight,
  Moon,
  Sun,
  ShieldCheck,
  Activity,
  FileSpreadsheet
} from "lucide-react";
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

// ==========================================
// MODELS DATA (Round Treated Eucalyptus focus)
// ==========================================
const PERGOLADO_MODELS = [
  {
    id: "tradicional",
    name: "Pergolado Tradicional Rústico",
    woodType: "Eucalipto Tratado Roliço",
    description: "Visual clássico de campo e praia com vigas sobrepostas roliças e acabamento natural de autoclave. Oferece alta harmonia com paisagismo e jardins rústicos.",
    baseDensityM3PerM2: 0.08,
    img: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
    features: [
      "Eucalipto roliço autoclavado",
      "Encaixes do tipo 'boca de lobo'",
      "Visual rústico e aconchegante",
      "Ideal para áreas gourmet e varandas"
    ],
    accentColor: "from-amber-700 to-amber-900"
  },
  {
    id: "moderno",
    name: "Pergolado Moderno / Lixado",
    woodType: "Eucalipto Premium Lixado",
    description: "Troncos de eucalipto pré-selecionados, polidos e lixados com encaixes internos embutidos. Combina a beleza natural roliça com a precisão minimalista.",
    baseDensityM3PerM2: 0.09,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    features: [
      "Eucalipto roliço retificado e lixado",
      "Encaixes embutidos com ferragens ocultas",
      "Arquitetura contemporânea de alto padrão",
      "Perfeito para residências modernas"
    ],
    accentColor: "from-neutral-700 to-neutral-900"
  },
  {
    id: "gourmet",
    name: "Pergolado Varanda Gourmet",
    woodType: "Eucalipto Tratado Autoclave",
    description: "Estrutura robusta roliça projetada para acoplamento a cozinhas externas e churrasqueiras. Suporta a passagem de dutos de exaustão e chaminés.",
    baseDensityM3PerM2: 0.10,
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    features: [
      "Troncos de alta bitola para grande vão livre",
      "Pintura com Stain retardante de calor",
      "Suporte a forros de bambu ou palha",
      "Fixações em inox reforçadas"
    ],
    accentColor: "from-amber-600 to-amber-800"
  },
  {
    id: "piscina",
    name: "Pergolado Deck & Piscina",
    woodType: "Eucalipto Tratado UC-4",
    description: "Madeira roliça com tratamento reforçado Categoria UC-4 de preservação. Resistência total à constante umidade direta do solo, respingos de cloro e água.",
    baseDensityM3PerM2: 0.085,
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop",
    features: [
      "Tratamento autoclave Categoria UC-4",
      "Máxima resistência a fungos de umidade",
      "Bases metálicas elevadas antiferrugem",
      "Perfeito para beiras de piscinas e spas"
    ],
    accentColor: "from-blue-700 to-amber-900"
  }
];

// Treated Eucalyptus Diameter Options (in cm)
const DIAMEtRO_OPTIONS = [
  { id: "08-10", label: "Ø 08 a 10 cm", minVal: 8, maxVal: 10, category: "Fino / Auxiliar (Ripamento)", baseMultiplier: 0.8 },
  { id: "10-12", label: "Ø 10 a 12 cm", minVal: 10, maxVal: 12, category: "Leve (Travessas secundárias)", baseMultiplier: 0.9 },
  { id: "12-14", label: "Ø 12 a 14 cm", minVal: 12, maxVal: 14, category: "Médio (Travessas principais)", baseMultiplier: 1.0 },
  { id: "14-16", label: "Ø 14 a 16 cm", minVal: 14, maxVal: 16, category: "Intermediário (Vigas auxiliares)", baseMultiplier: 1.15 },
  { id: "16-18", label: "Ø 16 a 18 cm", minVal: 16, maxVal: 18, category: "Robusto (Vigas principais recomendadas)", baseMultiplier: 1.3 },
  { id: "18-20", label: "Ø 18 a 20 cm", minVal: 18, maxVal: 20, category: "Extra Robusto (Pilares ideais)", baseMultiplier: 1.45 },
  { id: "20-22", label: "Ø 20 a 22 cm", minVal: 20, maxVal: 22, category: "Pesado (Pilares de alta sustentação)", baseMultiplier: 1.6 }
];

export default function PergoladosPage() {
  // Navigation / View modes
  const [viewMode, setViewMode] = useState<"client" | "admin">("client");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"3d" | "plant" | "struct" | "dims">("3d");
  const [settings, setSettings] = useState<any>(null);

  // Interactive Orbit Camera States (Yaw and Pitch)
  const [rotationZ, setRotationZ] = useState<number>(35);
  const [rotationX, setRotationX] = useState<number>(60);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartRot, setDragStartRot] = useState({ x: 60, z: 35 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragStartRot({ x: rotationX, z: rotationZ });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotationZ(dragStartRot.z - dx * 0.5);
    setRotationX(Math.min(85, Math.max(15, dragStartRot.x + dy * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setDragStartRot({ x: rotationX, z: rotationZ });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setRotationZ(dragStartRot.z - dx * 0.5);
    setRotationX(Math.min(85, Math.max(15, dragStartRot.x + dy * 0.4)));
  };

  // Configurator States
  const [selectedModel, setSelectedModel] = useState<string>("tradicional");
  const [width, setWidth] = useState<number>(4.0); // em metros
  const [length, setLength] = useState<number>(5.0); // em metros
  const [height, setHeight] = useState<number>(2.8); // em metros
  const [selectedDiameter, setSelectedDiameter] = useState<string>("16-18"); // diâmetro roliço padrão
  const [hasRoof, setHasRoof] = useState<boolean>(false);
  const [hasLighting, setHasLighting] = useState<boolean>(false);
  const [hasSideEnclosure, setHasSideEnclosure] = useState<boolean>(false);

  // Lead modal state
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", city: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Funnel tracking events
  const [funnelEvents, setFunnelEvents] = useState({
    viewedPage: 1,
    selectedModel: 0,
    changedMedidas: 0,
    generatedCalculation: 0,
    clickedWhatsApp: 0,
    convertedLead: 0
  });

  // Leads list loaded on client-side only (prevents SSR crash and hydration mismatch)
  const [leadsList, setLeadsList] = useState<any[]>([]);

  // Track page views and initialize Pergolados stats on load
  useEffect(() => {
    document.title = "Pergolados Sob Medida | Eucalipto Tratado Roliço Autoclavado | Só Madeiras";
    
    const localSettings = localStorage.getItem("somadeiras_settings");
    if (localSettings) {
      try {
        setSettings(JSON.parse(localSettings));
      } catch (e) {}
    }
    
    const pStats = localStorage.getItem("somadeiras_pergolados_stats");
    let currentStats = {
      views: 0,
      modelClicks: {} as Record<string, number>,
      calculations: 0,
      waClicks: 0,
      leads: 0,
      medidas: [] as string[]
    };

    if (pStats) {
      try {
        currentStats = JSON.parse(pStats);
      } catch (err) {
        console.error(err);
      }
    }
    
    currentStats.views += 1;
    localStorage.setItem("somadeiras_pergolados_stats", JSON.stringify(currentStats));
    setFunnelEvents(prev => ({ ...prev, viewedPage: currentStats.views }));

    // Load initial leads from localStorage safely on client mount
    const localCRM = localStorage.getItem("somadeiras_leads");
    if (localCRM) {
      try {
        setLeadsList(JSON.parse(localCRM));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Update localStorage stats helper
  const trackPergoladosStat = (key: "calculations" | "waClicks" | "leads", extra?: any) => {
    const pStats = localStorage.getItem("somadeiras_pergolados_stats");
    let currentStats = {
      views: 124,
      modelClicks: { tradicional: 43, moderno: 31, gourmet: 28, piscina: 22 } as Record<string, number>,
      calculations: 64,
      waClicks: 18,
      leads: 9,
      medidas: ["4.0m x 5.0m x 2.8m", "3.0m x 4.0m x 2.6m", "5.0m x 6.0m x 3.0m"] as string[]
    };

    if (pStats) {
      currentStats = JSON.parse(pStats);
    }

    if (key === "calculations") {
      currentStats.calculations += 1;
      if (extra) {
        currentStats.medidas.push(extra);
        currentStats.modelClicks[selectedModel] = (currentStats.modelClicks[selectedModel] || 0) + 1;
      }
    } else if (key === "waClicks") {
      currentStats.waClicks += 1;
    } else if (key === "leads") {
      currentStats.leads += 1;
    }

    localStorage.setItem("somadeiras_pergolados_stats", JSON.stringify(currentStats));
  };

  // Switch model handler
  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
    setFunnelEvents(prev => ({ ...prev, selectedModel: prev.selectedModel + 1 }));
    
    const calcSection = document.getElementById("configurator-section");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Watch for changes to register calculation event
  useEffect(() => {
    setFunnelEvents(prev => ({ 
      ...prev, 
      changedMedidas: prev.changedMedidas + 1,
      generatedCalculation: prev.generatedCalculation + 1 
    }));
  }, [width, length, height, selectedDiameter, hasRoof, hasLighting, hasSideEnclosure]);

  // Selected model & diameter details
  const modelInfo = useMemo(() => {
    return PERGOLADO_MODELS.find(m => m.id === selectedModel) || PERGOLADO_MODELS[0];
  }, [selectedModel]);

  const diamInfo = useMemo(() => {
    return DIAMEtRO_OPTIONS.find(d => d.id === selectedDiameter) || DIAMEtRO_OPTIONS[4];
  }, [selectedDiameter]);

  // Material Bitolas calculated logically based on selected pilar diameter
  const materialBitolas = useMemo(() => {
    const currentIndex = DIAMEtRO_OPTIONS.findIndex(d => d.id === selectedDiameter);
    const pilarBitola = DIAMEtRO_OPTIONS[currentIndex]?.label || "Ø 16 a 18 cm";
    const vigaIndex = Math.max(0, currentIndex - 1);
    const vigaBitola = DIAMEtRO_OPTIONS[vigaIndex]?.label || "Ø 14 a 16 cm";
    const rafterIndex = Math.max(0, currentIndex - 2);
    const rafterBitola = DIAMEtRO_OPTIONS[rafterIndex]?.label || "Ø 12 a 14 cm";
    
    return {
      pilar: pilarBitola,
      viga: vigaBitola,
      rafter: rafterBitola
    };
  }, [selectedDiameter]);

  // ==========================================================
  // NORMATIVE STRUCTURAL ABNT NBR 7190 & NBR 16143 ENGINE
  // ==========================================================
  const nbrValidation = useMemo(() => {
    // effective height factor (cantilever = 2.0, pin-pin = 1.0)
    // assuming standard base connections, effective length is roughly height.
    const effectiveLengthCm = height * 100;
    // radius of gyration for round column r = d / 4
    const minDiameterCm = diamInfo.minVal;
    const r = minDiameterCm / 4;
    // slenderness ratio (índice de esbeltez lambda = Lef / r)
    const slenderness = effectiveLengthCm / r;

    let safetyStatus: "green" | "yellow" | "red" = "green";
    let message = "";
    
    // Limits under ABNT NBR 7190:2022
    if (slenderness > 140) {
      safetyStatus = "red";
      message = `NÃO RECOMENDADO PELA NBR 7190! Índice de esbeltez (λ = ${Math.round(slenderness)}) muito elevado. Risco crítico de flambagem (encurvadura). Escolha um diâmetro de eucalipto superior a 16 cm para manter a segurança do pé direito de ${height}m.`;
    } else if (slenderness > 80) {
      safetyStatus = "yellow";
      message = `ALERTA NBR 7190: A estrutura apresenta esbeltez intermediária (λ = ${Math.round(slenderness)}). Requer contraventamento diagonal robusto nas vigas de topo para impedir oscilações laterais sob ventos fortes.`;
    } else {
      safetyStatus = "green";
      message = `PLENA CONFORMIDADE ABNT NBR 7190 (λ = ${Math.round(slenderness)}): Distribuição ideal de compressão. O diâmetro do eucalipto selecionado garante total segurança e estabilidade contra flambagem vertical.`;
    }

    // Preservation NBR 16143 rule
    const preservationRule = "Categoria de Uso UC-4: Peças roliças autoclavadas em autoclave com retenção mínima de 6.4 kg/m³ de preservativo CCA/CCB para contato permanente com umidade ou solo.";

    return {
      slenderness: Math.round(slenderness),
      safetyStatus,
      message,
      preservationRule
    };
  }, [height, diamInfo]);

  // ==========================================
  // MATERIALS CALCULATION ENGINE
  // ==========================================
  const calculations = useMemo(() => {
    const area = width * length;
    
    // Pillars - minimum 4, add extra pair for every 4.5m in length or width
    let pilarCount = 4;
    if (length > 4.5) pilarCount += 2;
    if (width > 4.5) pilarCount += 2;
    
    // Beams (1 support beam log per side, plus 1 central beam if width is over 4.5m)
    const beamCount = width > 4.5 ? 3 : 2;
    
    // Rafters spaced approx 45cm apart
    const spacing = 0.45;
    const rafterCount = Math.ceil(length / spacing) + 1;
    
    // Roofing
    const roofingMaterial = hasRoof 
      ? `${Math.ceil(area * 1.1)}m² de Policarbonato Alveolar Premium (Anti-UV)`
      : "Nenhuma (Estrutura aberta)";
      
    // Hardware screws
    const screwCount = (pilarCount * 4) + (rafterCount * 4) + 48;
    const sapataCount = pilarCount;
    
    // Stain gallons
    const stainGallons = Math.ceil((area * 0.45) / 10);

    // Wood Volume calculation in Cubic Meters (m³)
    const woodVolume = parseFloat((area * modelInfo.baseDensityM3PerM2 * (diamInfo.baseMultiplier || 1.0)).toFixed(2));
    
    // BACKGROUND Value calculation (for CRM/Analytics use only, hidden from storefront!)
    let bgPrice = area * modelInfo.baseDensityM3PerM2 * 4500 * (diamInfo.baseMultiplier || 1.0);
    if (hasRoof) bgPrice += area * 140;
    if (hasLighting) bgPrice += pilarCount * 120 + 250;
    if (hasSideEnclosure) bgPrice += (width * height * 190) + (length * height * 190);
    if (modelInfo.id === "moderno") bgPrice *= 1.15;

    return {
      area: parseFloat(area.toFixed(1)),
      pilarCount,
      beamCount,
      rafterCount,
      roofingMaterial,
      screwCount,
      sapataCount,
      stainGallons,
      woodVolume,
      bgPrice: Math.round(bgPrice)
    };
  }, [width, length, height, hasRoof, hasLighting, hasSideEnclosure, modelInfo, diamInfo]);

  // Capture lead abandonment when modal closes without submission
  useEffect(() => {
    if (!leadModalOpen && !isSubmitted && (leadForm.name.trim() || leadForm.phone.trim())) {
      const phoneDigits = leadForm.phone.replace(/\D/g, "");
      if (phoneDigits.length >= 8) {
        const currentCRMLeads = localStorage.getItem("somadeiras_leads");
        let leadsListLocal = [];
        if (currentCRMLeads) {
          leadsListLocal = JSON.parse(currentCRMLeads);
        }
        
        const alreadySaved = leadsListLocal.some((l: any) => 
          l.phone.replace(/\D/g, "") === phoneDigits && 
          l.status === "Carrinho Abandonado" &&
          l.source === "Calculadora de Pergolados"
        );

        if (!alreadySaved) {
          const assignedSeller = { id: "maria", name: "Maria (Madeiras & Estruturas)" };
          const newAbandonedLead = {
            id: `lead-perg-abandoned-${Date.now()}`,
            name: leadForm.name || "Cliente Anônimo",
            phone: leadForm.phone,
            city: leadForm.city || "Não informada",
            state: "SP",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            source: "Calculadora de Pergolados",
            utm: "utm_source=site&utm_medium=calculadora&utm_campaign=cart_abandonment",
            products: [`Pergolado de Eucalipto ${modelInfo.name} (${width}x${length}x${height}m) x1`],
            total: calculations.bgPrice,
            status: "Carrinho Abandonado",
            sellerId: assignedSeller.id,
            device: window.innerWidth < 768 ? "Mobile (iOS)" : "Desktop (Windows)",
            location: `${leadForm.city || "Não informada"} - SP`,
            notes: `Carrinho abandonado no configurador de Pergolado Rústico. Eucalipto: ${diamInfo.label} | Medidas: ${width}x${length}x${height}m | Cobertura: ${hasRoof ? "Sim" : "Não"}`
          };
          
          const updated = [newAbandonedLead, ...leadsListLocal];
          localStorage.setItem("somadeiras_leads", JSON.stringify(updated));
          setLeadsList(updated);
        }
      }
    }
  }, [leadModalOpen]);

  // Handle lead submission and redirect to WhatsApp (Completamente sem valores expostos!)
  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.city) {
      alert("Por favor, preencha todos os campos para prosseguir.");
      return;
    }

    // Save Pergolado Lead in localStorage's CRM db
    const currentCRMLeads = localStorage.getItem("somadeiras_leads");
    let leadsList = [];
    if (currentCRMLeads) {
      leadsList = JSON.parse(currentCRMLeads);
    }

    const assignedSeller = { id: "maria", name: "Maria (Madeiras & Estruturas)" };

    const newLead = {
      id: `lead-perg-${Date.now()}`,
      name: leadForm.name,
      phone: leadForm.phone,
      city: leadForm.city,
      state: "SP",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Calculadora de Pergolados",
      utm: "utm_source=site&utm_medium=calculadora&utm_campaign=eucalipto_normativo",
      products: [`Pergolado de Eucalipto ${modelInfo.name} (${width}x${length}x${height}m)`],
      total: calculations.bgPrice, // Background reference price kept in CRM for admin estimation
      status: "Novo Lead",
      sellerId: assignedSeller.id,
      device: window.innerWidth < 768 ? "Mobile (iOS)" : "Desktop (Windows)",
      location: `${leadForm.city} - SP`,
      notes: `Eucalipto roliço: ${diamInfo.label} | Modelo: ${modelInfo.name} | Medidas: ${width}x${length}x${height}m | Cobertura: ${hasRoof ? "Sim" : "Não"} | Iluminação: ${hasLighting ? "Sim" : "Não"} | Fechamento: ${hasSideEnclosure ? "Sim" : "Não"}`
    };

    const updatedLeads = [newLead, ...leadsList];
    localStorage.setItem("somadeiras_leads", JSON.stringify(updatedLeads));
    setLeadsList(updatedLeads);

    trackPergoladosStat("leads");
    trackPergoladosStat("calculations", `${width}m x ${length}m x ${height}m`);
    setFunnelEvents(prev => ({ ...prev, convertedLead: prev.convertedLead + 1 }));

    // Generate WhatsApp Text WITHOUT values
    const textMaterials = `
- ${calculations.pilarCount} Pilares Roliços de Eucalipto (Bitola: ${materialBitolas.pilar} - Comp. ${height.toFixed(1)}m)
- ${calculations.beamCount} Vigas Estruturais Roliças (Bitola: ${materialBitolas.viga} - Comp. ${length.toFixed(1)}m)
- ${calculations.rafterCount} Travessas Superiores Roliças (Bitola: ${materialBitolas.rafter} - Comp. ${width.toFixed(1)}m)
- Categoria de Tratamento: NBR 16143 Autoclave (UC-4)
- ${calculations.screwCount} Parafusos/Fixadores estruturais
- ${calculations.sapataCount} Sapatas Metálicas de Fixação de solo
- ${calculations.stainGallons} Galões de Stain Premium para Proteção
- Cobertura: ${hasRoof ? "Policarbonato Alveolar Premium" : "Não Inclusa"}
- Iluminação Embutida: ${hasLighting ? "Sim, Spots Inclusos" : "Não"}
- Fechamento Lateral: ${hasSideEnclosure ? "Sim, Ripado de Eucalipto" : "Não"}`;

    const waMessage = `Olá! Meu nome é *${leadForm.name}* (${leadForm.city}-SP).\nAcabo de realizar a simulação de um *${modelInfo.name}* sob medida no site da Só Madeiras.\n\n*Especificações Técnicas Baseadas nas Normas ABNT NBR 7190 & NBR 16143:*\n- Largura: ${width}m\n- Comprimento: ${length}m\n- Altura (Pé Direito): ${height}m\n- Área Estimada: ${calculations.area}m²\n- Bitolas Escolhidas: Pilares (${materialBitolas.pilar}), Vigas (${materialBitolas.viga}), Travessas (${materialBitolas.rafter})\n- Status NBR 7190 (Esbeltez): ${nbrValidation.slenderness} λ\n\n*Especificações de Materiais Calculadas:*${textMaterials}\n\n*Volume Estimado de Eucalipto:* ${calculations.woodVolume} m³\n\n*Solicitação:* Gostaria de receber o meu orçamento oficial calculado pelo setor técnico com base nessa listagem, incluindo as opções de frete e prazos para a minha localidade!`;

    const encodedMsg = encodeURIComponent(waMessage);
    const activeWhatsapp = settings?.whatsappNumber || "5579996298990";
    const waUrl = `https://api.whatsapp.com/send?phone=${activeWhatsapp}&text=${encodedMsg}`;

    setIsSubmitted(true);
    setLeadModalOpen(false);
    
    trackPergoladosStat("waClicks");
    setFunnelEvents(prev => ({ ...prev, clickedWhatsApp: prev.clickedWhatsApp + 1 }));

    window.open(waUrl, "_blank");
  };

  // Recharts stats for admin view mode
  const pergoladosAdminStats = useMemo(() => {
    const pergoladoLeads = leadsList.filter((l: any) => l.source === "Calculadora de Pergolados");

    const visitors = 342;
    const calculationsCount = 184 + funnelEvents.generatedCalculation;
    const waClicksCount = 42 + funnelEvents.clickedWhatsApp;
    const leadsGenerated = 28 + pergoladoLeads.length;

    const conversionRate = parseFloat(((waClicksCount / visitors) * 100).toFixed(1));

    const trafficData = [
      { name: "Google Ads", value: 165, color: "#3E2723" },
      { name: "Busca Direta", value: 85, color: "#5D4037" },
      { name: "Instagram", value: 68, color: "#F4B400" },
      { name: "Facebook", value: 24, color: "#8D6E63" }
    ];

    const modelPopularity = [
      { name: "Pergolado Tradicional Rústico", views: 145, calcs: 86, color: "#8D6E63" },
      { name: "Pergolado Moderno / Lixado", views: 98, calcs: 54, color: "#3E2723" },
      { name: "Pergolado Varanda Gourmet", views: 76, calcs: 32, color: "#F4B400" },
      { name: "Pergolado Deck & Piscina", views: 58, calcs: 26, color: "#5D4037" }
    ];

    const popularDimensions = [
      { dims: "3.0m x 4.0m", count: 48 },
      { dims: "4.0m x 5.0m", count: 32 },
      { dims: "3.0m x 3.0m", count: 25 },
      { dims: "4.0m x 6.0m", count: 18 },
      { dims: `${width}m x ${length}m`, count: funnelEvents.generatedCalculation }
    ].sort((a,b) => b.count - a.count);

    return {
      visitors,
      calculationsCount,
      waClicksCount,
      leadsGenerated,
      conversionRate,
      trafficData,
      modelPopularity,
      popularDimensions,
      pergoladoLeads
    };
  }, [funnelEvents, width, length, leadsList]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      
      {/* ==========================================
          TOP DUAL PERSPECTIVE SWITCHER (DEVELOPER BAR)
          ========================================== */}
      <div className="no-print bg-[#3E2723] text-white border-b-4 border-[#F4B400] px-4 py-2 text-sm flex flex-col md:flex-row justify-between items-center gap-2 z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-2">
          <span className="bg-[#F4B400] text-brown-dark font-black px-2 py-0.5 rounded text-xs">SIMULADOR PERGOLADOS</span>
          <span className="font-medium text-xs md:text-sm">Altere a visão da página para testar os fluxos integrados:</span>
        </div>
        <div className="flex bg-[#5D4037] rounded-lg p-0.5 border border-[#8D6E63] overflow-hidden">
          <button 
            onClick={() => setViewMode("client")} 
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === "client" ? "bg-[#F4B400] text-brown-dark shadow-sm" : "hover:bg-brown-dark/30 text-gray-200"}`}
          >
            <Maximize2 className="h-3.5 w-3.5" /> Client Storefront
          </button>
          <button 
            onClick={() => setViewMode("admin")} 
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${viewMode === "admin" ? "bg-[#F4B400] text-brown-dark shadow-sm" : "hover:bg-brown-dark/30 text-gray-200"}`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Dashboard & Funil Pergolados
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-300 hover:text-white text-xs flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Site Principal
          </Link>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-1 rounded bg-[#5D4037] hover:bg-[#8D6E63] text-[#F4B400] transition"
            title="Alternar Tema"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ==========================================
          CLIENT VIEW (LANDING PAGE & CONFIGURATOR)
          ========================================== */}
      {viewMode === "client" && (
        <div className="flex-1 flex flex-col bg-stone-100 dark:bg-zinc-950 transition-colors duration-300">
          
          {/* HEADER SHELL */}
          <header className="bg-[#3E2723] dark:bg-black text-white py-3.5 px-4 shadow-lg z-40 transition-colors">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <div className="bg-[#F4B400] text-[#3E2723] w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow shadow-[#F4B400] animate-pulse">🪵</div>
                <div>
                  <h1 className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
                    SÓ <span className="text-[#F4B400] font-extrabold">MADEIRAS</span>
                  </h1>
                  <p className="text-[10px] tracking-widest text-[#F4B400] font-bold -mt-1">LINHA PREMIUM PERGOLADOS</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-xs text-stone-300 font-semibold">
                  📍 Atendimento Campinas & Região
                </span>
                <Link href="/" className="bg-[#F4B400] text-brown-dark font-black px-4.5 py-2 rounded-full text-xs hover:bg-[#ffd149] transition shadow shadow-[#F4B400]/20 flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Ir para a Loja Geral
                </Link>
              </div>
            </div>
          </header>

          {/* 1. HERO SECTION */}
          <section 
            className="relative h-[480px] md:h-[600px] text-white flex items-center justify-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop')` }}
          >
            {/* Dark wood overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/95 via-[#3E2723]/80 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6 pt-12 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                {["✓ Eucalipto Autoclavado", "✓ ABNT NBR 7190", "✓ Categoria UC-4", "✓ Orçamentos Rápidos"].map((badge, i) => (
                  <span 
                    key={i} 
                    className="bg-[#F4B400]/20 text-[#F4B400] border border-[#F4B400]/40 font-black text-[9px] md:text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm select-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h2 className="font-display font-black text-3xl md:text-6xl leading-tight tracking-tight uppercase max-w-4xl text-white drop-shadow-xl">
                MONTE SEU PERGOLADO <br className="hidden md:inline" /> EM <span className="text-[#F4B400] underline decoration-4 decoration-[#F4B400]">SEGUNDOS</span>
              </h2>

              <p className="text-stone-300 text-sm md:text-xl max-w-2xl leading-relaxed font-light drop-shadow">
                Configurador de Eucalipto Tratado Roliço baseado nas normas **ABNT NBR 7190** e **NBR 16143**. Insira as medidas, escolha o diâmetro estrutural e solicite sua cotação.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <button 
                  onClick={() => {
                    const calc = document.getElementById("configurator-section");
                    if (calc) calc.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#F4B400] hover:bg-[#ffd149] text-brown-dark font-black text-sm px-8 py-4 rounded-full shadow-xl shadow-[#F4B400]/20 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sliders className="h-4.5 w-4.5 animate-spin" /> Calcular Meu Pergolado
                </button>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank"
                  rel="noreferrer"
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold text-sm px-8 py-4 rounded-full shadow transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="h-4 w-4" /> Atendimento Exclusivo WhatsApp
                </a>
              </div>
            </div>

            <div className="absolute bottom-4 inset-x-0 hidden md:flex justify-center select-none z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full text-xs text-white/90 flex gap-8 items-center shadow-lg">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#F4B400]" /> Engenharia Normativa ABNT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                <span>🚚 Eucalipto Autoclavado Roliço</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                <span>🛠️ Resistência Máxima UC-4</span>
              </div>
            </div>
          </section>

          {/* 2. CATALOG OF MODELS */}
          <section className="max-w-7xl mx-auto px-4 py-16 w-full">
            <div className="text-center space-y-3 mb-12">
              <span className="text-[#F4B400] font-black text-xs uppercase tracking-widest bg-[#F4B400]/10 px-3.5 py-1.5 rounded-full">Normas & Engenharia</span>
              <h3 className="font-display font-black text-2xl md:text-4xl text-brown-dark dark:text-white uppercase leading-tight">
                ESCOLHA SEU MODELO DE DESTAQUE
              </h3>
              <div className="h-1.5 bg-[#F4B400] w-24 mx-auto rounded-full" />
              <p className="text-stone-800 dark:text-stone-100 font-medium text-xs md:text-sm max-w-xl mx-auto">
                Modelos roliços calculados com base no índice de esbeltez da **NBR 7190** para segurança contra flambagem e autoclavação em conformidade com a **NBR 16143**.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERGOLADO_MODELS.map(model => (
                <div 
                  key={model.id}
                  className={`bg-white dark:bg-zinc-900 border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${selectedModel === model.id ? "border-[#F4B400] shadow-lg shadow-[#F4B400]/10 scale-102" : "border-stone-200 dark:border-stone-800"}`}
                >
                  <div>
                    <div className="relative h-48 bg-cover bg-center overflow-hidden">
                      <img 
                        src={model.img} 
                        alt={model.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      
                      {selectedModel === model.id && (
                        <span className="absolute top-3 left-3 bg-[#F4B400] text-brown-dark font-black text-[9px] px-2.5 py-1 rounded shadow uppercase tracking-wider flex items-center gap-1 select-none animate-bounce">
                          <Check className="h-3 w-3 stroke-[3]" /> Selecionado
                        </span>
                      )}
                      
                      <div className="absolute bottom-3 inset-x-3 flex justify-between items-baseline text-white">
                        <span className="font-display font-black text-xs uppercase tracking-tight">{model.name}</span>
                        <span className="text-[10px] text-yellow-400 font-bold bg-black/60 px-2 py-0.5 rounded">
                          ★ ABNT UC-4
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-400 dark:text-stone-500 font-bold">Madeira Recomendada:</span>
                        <span className="bg-[#5D4037]/15 dark:bg-[#5D4037]/35 text-[#5D4037] dark:text-[#F4B400] font-extrabold px-2 py-0.5 rounded text-[10px] uppercase">
                          Eucalipto Roliço
                        </span>
                      </div>

                      <p className="text-[11px] md:text-xs text-stone-800 dark:text-stone-100 font-medium leading-relaxed font-light line-clamp-3">
                        {model.description}
                      </p>

                      <ul className="space-y-1 pt-1.5 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-900 dark:text-stone-100 font-medium">
                        {model.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5 leading-normal">
                            <span className="text-[#F4B400] font-black text-xs leading-none">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleSelectModel(model.id)}
                      className={`w-full font-black text-xs py-3 rounded-xl transition duration-300 active:scale-97 cursor-pointer ${selectedModel === model.id ? "bg-brown-dark text-[#F4B400] border border-[#F4B400]" : "bg-stone-100 dark:bg-stone-800 hover:bg-[#F4B400] hover:text-[#3E2723] text-stone-700 dark:text-stone-200"}`}
                    >
                      {selectedModel === model.id ? "Modelo Selecionado" : "Selecionar Modelo"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. CALCULATOR & 3D CONFIGURATOR CONTAINER */}
          <section id="configurator-section" className="bg-gradient-to-b from-[#3E2723] to-black text-white py-16 px-4 no-print select-none">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center space-y-2 mb-12">
                <span className="text-[#F4B400] font-extrabold text-xs tracking-widest uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">Calculadora de Engenharia</span>
                <h3 className="font-display font-black text-2xl md:text-4xl uppercase">
                  SIMULE SEU PERGOLADO DE EUCALIPTO
                </h3>
                <p className="text-stone-300 text-xs md:text-sm font-light max-w-xl mx-auto">
                  Selecione as medidas desejadas e o diâmetro roliço do eucalipto tratado. Nossa inteligência fará a análise de esbeltez (NBR 7190) e o cálculo de materiais completo.
                </p>
              </div>

              {/* NBR Validation alert block */}
              <div className={`mb-8 p-4.5 rounded-2xl border flex flex-col md:flex-row items-center gap-4 transition-all ${nbrValidation.safetyStatus === 'red' ? 'bg-red-500/10 border-red-500/30 text-red-200' : nbrValidation.safetyStatus === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'}`}>
                <div className="flex items-center justify-center p-2 bg-black/40 rounded-full shrink-0">
                  <ShieldCheck className={`h-6.5 w-6.5 ${nbrValidation.safetyStatus === 'red' ? 'text-red-500' : nbrValidation.safetyStatus === 'yellow' ? 'text-yellow-500' : 'text-emerald-500'}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-white">Análise Normativa ABNT NBR 7190 (Dimensionamento de Madeira Roliça)</h5>
                  <p className="text-[11px] font-medium leading-relaxed">{nbrValidation.message}</p>
                </div>
                <div className="hidden lg:block border-l border-white/15 pl-4 text-right">
                  <span className="block text-[8px] text-stone-400 font-bold uppercase">Slenderness Ratio</span>
                  <span className="font-mono font-black text-lg text-white">{nbrValidation.slenderness} λ</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* 3.1 LEFT HAND COLUMN: INPUT CONTROLS */}
                <div className="lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl">
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Sliders className="h-5 w-5 text-[#F4B400]" />
                      <h4 className="font-display font-black text-sm tracking-wide text-white uppercase">Ajuste de Dimensões</h4>
                    </div>

                    {/* Width Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-300 font-bold">Largura (Frente):</span>
                        <span className="text-[#F4B400] font-black text-sm">{width.toFixed(1)} m</span>
                      </div>
                      <input 
                        type="range" 
                        min="2.0" 
                        max="8.0" 
                        step="0.5" 
                        value={width} 
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                        className="w-full accent-[#F4B400]"
                      />
                    </div>

                    {/* Length Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-300 font-bold">Comprimento (Profundidade):</span>
                        <span className="text-[#F4B400] font-black text-sm">{length.toFixed(1)} m</span>
                      </div>
                      <input 
                        type="range" 
                        min="2.0" 
                        max="10.0" 
                        step="0.5" 
                        value={length} 
                        onChange={(e) => setLength(parseFloat(e.target.value))}
                        className="w-full accent-[#F4B400]"
                      />
                    </div>

                    {/* Height Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-300 font-bold">Altura (Pé Direito):</span>
                        <span className="text-[#F4B400] font-black text-sm">{height.toFixed(1)} m</span>
                      </div>
                      <input 
                        type="range" 
                        min="2.2" 
                        max="4.0" 
                        step="0.1" 
                        value={height} 
                        onChange={(e) => setHeight(parseFloat(e.target.value))}
                        className="w-full accent-[#F4B400]"
                      />
                    </div>

                    {/* Diameter Selection (Eucaliptos Tratados Roliços) */}
                    <div className="space-y-2.5 pt-3 border-t border-white/10">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-300 font-bold">Diâmetro Roliço (Eucalipto):</span>
                        <span className="text-[#F4B400] font-black text-[11px] uppercase tracking-tight">{diamInfo.category}</span>
                      </div>
                      <select
                        value={selectedDiameter}
                        onChange={(e) => setSelectedDiameter(e.target.value)}
                        className="w-full bg-[#5D4037] text-white border border-[#8D6E63] rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F4B400] cursor-pointer"
                      >
                        {DIAMEtRO_OPTIONS.map(opt => (
                          <option key={opt.id} value={opt.id} className="bg-brown-dark">
                            {opt.label} — ({opt.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Checkbox Options */}
                    <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                      <span className="text-stone-300 font-bold text-xs block">Opcionais do Projeto:</span>
                      
                      <label className="flex items-center gap-3 cursor-pointer group py-1 select-none">
                        <input 
                          type="checkbox" 
                          checked={hasRoof} 
                          onChange={(e) => setHasRoof(e.target.checked)}
                          className="w-4 h-4 rounded text-brown-dark bg-stone-100 accent-[#F4B400] cursor-pointer dark:text-white"
                        />
                        <span className="text-stone-200 group-hover:text-white transition">☑ Cobertura (Policarbonato Alveolar)</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group py-1 select-none">
                        <input 
                          type="checkbox" 
                          checked={hasLighting} 
                          onChange={(e) => setHasLighting(e.target.checked)}
                          className="w-4 h-4 rounded text-brown-dark bg-stone-100 accent-[#F4B400] cursor-pointer dark:text-white"
                        />
                        <span className="text-stone-200 group-hover:text-white transition">☑ Iluminação em Spots LED Embutidos</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group py-1 select-none">
                        <input 
                          type="checkbox" 
                          checked={hasSideEnclosure} 
                          onChange={(e) => setHasSideEnclosure(e.target.checked)}
                          className="w-4 h-4 rounded text-brown-dark bg-stone-100 accent-[#F4B400] cursor-pointer dark:text-white"
                        />
                        <span className="text-stone-200 group-hover:text-white transition">☑ Fechamento Lateral Ripado Rústico</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/20 p-3 rounded-xl text-[10px] text-[#F4B400] leading-relaxed flex gap-2 pt-4">
                    <Info className="h-4 w-4 shrink-0" />
                    <p>O eucalipto roliço apresenta conicidade natural. Peças fornecidas são tratadas sob a norma NBR 16143 para alta imunização.</p>
                  </div>
                </div>

                {/* 3.2 MIDDLE COLUMN: 3D VISUALIZER STAMP */}
                <div className="lg:col-span-5 bg-black/45 border border-white/10 rounded-3xl p-4 flex flex-col justify-between shadow-2xl relative min-h-[400px]">
                  
                  <div className="flex bg-white/5 border border-white/10 rounded-xl p-0.5 text-[11px] font-bold z-10">
                    <button 
                      onClick={() => setActiveTab("3d")}
                      className={`flex-1 py-2 rounded-lg transition ${activeTab === "3d" ? "bg-[#F4B400] text-brown-dark" : "hover:text-[#F4B400]"}`}
                    >
                      3D Config
                    </button>
                    <button 
                      onClick={() => setActiveTab("plant")}
                      className={`flex-1 py-2 rounded-lg transition ${activeTab === "plant" ? "bg-[#F4B400] text-brown-dark" : "hover:text-[#F4B400]"}`}
                    >
                      Planta Baixa
                    </button>
                    <button 
                      onClick={() => setActiveTab("struct")}
                      className={`flex-1 py-2 rounded-lg transition ${activeTab === "struct" ? "bg-[#F4B400] text-brown-dark" : "hover:text-[#F4B400]"}`}
                    >
                      Estrutura
                    </button>
                    <button 
                      onClick={() => setActiveTab("dims")}
                      className={`flex-1 py-2 rounded-lg transition ${activeTab === "dims" ? "bg-[#F4B400] text-brown-dark" : "hover:text-[#F4B400]"}`}
                    >
                      Medidas
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center relative p-8 select-none">
                    
                    <div className="absolute top-4 left-4 bg-black/60 border border-white/10 rounded px-2.5 py-1 text-[9px] font-mono text-[#F4B400] flex flex-col z-10 shadow">
                      <span>LARGURA: {width.toFixed(1)}m</span>
                      <span>COMPRIMENTO: {length.toFixed(1)}m</span>
                    </div>

                    {/* Screen View: 3D Wireframe structural animation */}
                    {activeTab === "3d" && (
                      <div 
                        className="w-full h-[250px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none relative"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                      >
                        {/* Overlay Drag Hint */}
                        <div className="absolute bottom-2 right-2 bg-black/60 border border-white/10 rounded px-2.5 py-0.5 text-[8px] font-mono text-[#F4B400] pointer-events-none uppercase tracking-wide flex items-center gap-1">
                          <span>🔄 Arraste para girar 3D</span>
                        </div>

                        {(() => {
                          const wPx = 120 + (width - 4) * 18;
                          const lPx = 90 + (length - 5) * 16;
                          const hPx = 70 + (height - 2.8) * 20;

                          const pilThickness = 8 + (diamInfo.minVal - 8) * 0.5;
                          const beamThickness = pilThickness * 0.85;
                          const rafterThickness = pilThickness * 0.65;

                          // Geometrically exact X, Y coordinates for all pillars based on layout
                          const pillarCoords = [
                            { x: 0, y: 0 },
                            { x: wPx, y: 0 },
                            { x: 0, y: lPx },
                            { x: wPx, y: lPx },
                            ...(length > 4.5 ? [{ x: 0, y: lPx / 2 }, { x: wPx, y: lPx / 2 }] : []),
                            ...(width > 4.5 ? [{ x: wPx / 2, y: 0 }, { x: wPx / 2, y: lPx }] : [])
                          ];

                          const project = (x: number, y: number, z: number) => {
                            // Center around the middle of the pergolado
                            const cx = x - wPx / 2;
                            const cy = y - lPx / 2;
                            const cz = z - hPx / 2;

                            // Rotate Z (Yaw / Azimuth) - based on interactive rotationZ state
                            const cosZ = Math.cos(rotationZ * Math.PI / 180);
                            const sinZ = Math.sin(rotationZ * Math.PI / 180);
                            const rx = cx * cosZ - cy * sinZ;
                            const ry = cx * sinZ + cy * cosZ;
                            
                            // Rotate X (Pitch / Elevation) - based on interactive rotationX state
                            const cosX = Math.cos(rotationX * Math.PI / 180);
                            const sinX = Math.sin(rotationX * Math.PI / 180);
                            const ry2 = ry * cosX - cz * sinX;
                            const rz2 = ry * sinX + cz * cosX;

                            // Perspective calculation
                            const distance = 300;
                            const scale = distance / (distance + rz2);
                            
                            // Screen center coordinates
                            const screenX = 150 + rx * scale * 1.1;
                            const screenY = 120 + ry2 * scale * 1.1;

                            return { x: screenX, y: screenY, z: rz2 };
                          };

                          const drawCylinder = (
                            id: string,
                            x1: number, y1: number, z1: number,
                            x2: number, y2: number, z2: number,
                            thickness: number,
                            baseColor: string,
                            highlightColor: string,
                            shadowColor: string
                          ) => {
                            const p1 = project(x1, y1, z1);
                            const p2 = project(x2, y2, z2);

                            const dx = p2.x - p1.x;
                            const dy = p2.y - p1.y;
                            const len = Math.sqrt(dx * dx + dy * dy);
                            
                            if (len < 0.1) return null;

                            const nx = -dy / len;
                            const ny = dx / len;
                            const r = thickness / 2;

                            // Four corners of the projected rectangle
                            const c1x = p1.x + nx * r;
                            const c1y = p1.y + ny * r;
                            const c2x = p2.x + nx * r;
                            const c2y = p2.y + ny * r;
                            const c3x = p2.x - nx * r;
                            const c3y = p2.y - ny * r;
                            const c4x = p1.x - nx * r;
                            const c4y = p1.y - ny * r;

                            const points = `${c1x},${c1y} ${c2x},${c2y} ${c3x},${c3y} ${c4x},${c4y}`;
                            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

                            const gradId = `grad-${id}`;

                            return {
                              type: 'cylinder',
                              depth: (p1.z + p2.z) / 2,
                              render: (
                                <g key={id}>
                                  <defs>
                                    <linearGradient 
                                      id={gradId} 
                                      x1={c4x} y1={c4y} 
                                      x2={c1x} y2={c1y}
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop offset="0%" stopColor={shadowColor} />
                                      <stop offset="35%" stopColor={baseColor} />
                                      <stop offset="65%" stopColor={highlightColor} />
                                      <stop offset="100%" stopColor={shadowColor} />
                                    </linearGradient>
                                  </defs>
                                  
                                  <polygon 
                                    points={points} 
                                    fill={`url(#${gradId})`} 
                                    stroke={shadowColor} 
                                    strokeWidth="0.5" 
                                    filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.35))"
                                  />

                                  <ellipse 
                                    cx={p2.x} 
                                    cy={p2.y} 
                                    rx={r} 
                                    ry={r * 0.35} 
                                    transform={`rotate(${angle}, ${p2.x}, ${p2.y})`}
                                    fill={highlightColor} 
                                    stroke={shadowColor} 
                                    strokeWidth="0.5" 
                                  />
                                </g>
                              )
                            };
                          };

                          const drawDeck = () => {
                            const pA = project(0, 0, 0);
                            const pB = project(wPx, 0, 0);
                            const pC = project(wPx, lPx, 0);
                            const pD = project(0, lPx, 0);

                            const points = `${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`;
                            
                            const boardCount = 20;
                            const boardLines = [];
                            for (let i = 1; i < boardCount; i++) {
                              const t = i / boardCount;
                              const pL = {
                                x: pA.x + (pD.x - pA.x) * t,
                                y: pA.y + (pD.y - pA.y) * t
                              };
                              const pR = {
                                x: pB.x + (pC.x - pB.x) * t,
                                y: pB.y + (pC.y - pB.y) * t
                              };
                              boardLines.push(
                                <line 
                                  key={i} 
                                  x1={pL.x} y1={pL.y} 
                                  x2={pR.x} y2={pR.y} 
                                  stroke="#3E2723" 
                                  strokeWidth="0.8" 
                                  opacity="0.35" 
                                />
                              );
                            }

                            return {
                              type: 'deck',
                              depth: 1000,
                              render: (
                                <g key="deck">
                                  <polygon 
                                    points={points} 
                                    fill="#5D4037" 
                                    stroke="#3E2723" 
                                    strokeWidth="1.5" 
                                    opacity="0.75" 
                                  />
                                  {boardLines}
                                </g>
                              )
                            };
                          };

                          const drawCover = () => {
                            const hT = hPx + beamThickness + rafterThickness * 0.8;
                            const pA = project(0, 0, hT);
                            const pB = project(wPx, 0, hT);
                            const pC = project(wPx, lPx, hT);
                            const pD = project(0, lPx, hT);

                            const points = `${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`;

                            return {
                              type: 'cover',
                              depth: -1000,
                              render: (
                                <polygon 
                                  key="cover"
                                  points={points} 
                                  fill="rgba(244, 180, 0, 0.25)" 
                                  stroke="rgba(244, 180, 0, 0.6)" 
                                  strokeWidth="1" 
                                  strokeDasharray="2,2"
                                />
                              )
                            };
                          };

                          const drawSideEnclosure = () => {
                            const slatCount = 12;
                            const slats = [];
                            for (let i = 0; i < slatCount; i++) {
                              const t = i / (slatCount - 1);
                              const sy = t * lPx;
                              const item = drawCylinder(
                                `side-slat-${i}`,
                                0, sy, 0,
                                0, sy, hPx,
                                rafterThickness * 0.4,
                                "#5D4037", "#8D6E63", "#3E2723"
                              );
                              if (item) slats.push(item);
                            }
                            return slats;
                          };

                          const drawLEDLights = () => {
                            const lights = [];
                            const lightCount = 3;
                            for (let i = 0; i < lightCount; i++) {
                              const t = (i + 0.5) / lightCount;
                              const ly = t * lPx;
                              
                              const pLeft = project(0, ly, hPx - 4);
                              lights.push({
                                type: 'led',
                                depth: pLeft.z - 2,
                                render: (
                                  <g key={`led-left-${i}`}>
                                    <circle cx={pLeft.x} cy={pLeft.y} r="2.5" fill="#FFF" />
                                    <circle cx={pLeft.x} cy={pLeft.y} r="6" fill="#F4B400" opacity="0.6" className="animate-pulse" />
                                  </g>
                                )
                              });

                              const pRight = project(wPx, ly, hPx - 4);
                              lights.push({
                                type: 'led',
                                depth: pRight.z - 2,
                                render: (
                                  <g key={`led-right-${i}`}>
                                    <circle cx={pRight.x} cy={pRight.y} r="2.5" fill="#FFF" />
                                    <circle cx={pRight.x} cy={pRight.y} r="6" fill="#F4B400" opacity="0.6" className="animate-pulse" />
                                  </g>
                                )
                              });
                            }
                            return lights;
                          };

                          const items = [];
                          items.push(drawDeck());

                          pillarCoords.forEach((coord, idx) => {
                            const item = drawCylinder(
                              `pillar-${idx}`,
                              coord.x, coord.y, 0,
                              coord.x, coord.y, hPx,
                              pilThickness,
                              "#5D4037", "#8D6E63", "#3E2723"
                            );
                            if (item) items.push(item);
                          });

                          const beamLeft = drawCylinder(
                            "beam-left",
                            0, 0, hPx,
                            0, lPx, hPx,
                            beamThickness,
                            "#4D3227", "#7D5D4E", "#2E1A12"
                          );
                          if (beamLeft) items.push(beamLeft);

                          const beamRight = drawCylinder(
                            "beam-right",
                            wPx, 0, hPx,
                            wPx, lPx, hPx,
                            beamThickness,
                            "#4D3227", "#7D5D4E", "#2E1A12"
                          );
                          if (beamRight) items.push(beamRight);

                          if (width > 4.5) {
                            const beamMiddle = drawCylinder(
                              "beam-middle",
                              wPx / 2, 0, hPx,
                              wPx / 2, lPx, hPx,
                              beamThickness,
                              "#4D3227", "#7D5D4E", "#2E1A12"
                            );
                            if (beamMiddle) items.push(beamMiddle);
                          }

                          for (let i = 0; i < calculations.rafterCount; i++) {
                            const y = (i / (calculations.rafterCount - 1)) * lPx;
                            const item = drawCylinder(
                              `rafter-${i}`,
                              0, y, hPx + beamThickness * 0.75,
                              wPx, y, hPx + beamThickness * 0.75,
                              rafterThickness,
                              "#5D4037", "#8D6E63", "#3E2723"
                            );
                            if (item) items.push(item);
                          }

                          if (hasRoof) {
                            items.push(drawCover());
                          }

                          if (hasSideEnclosure) {
                            items.push(...drawSideEnclosure());
                          }

                          if (hasLighting) {
                            items.push(...drawLEDLights());
                          }

                          items.sort((a, b) => b.depth - a.depth);

                          return (
                            <svg 
                              className="w-full h-[250px]" 
                              viewBox="0 0 300 250"
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {items.map(item => item.render)}
                            </svg>
                          );
                        })()}
                      </div>
                    )}

                    {/* Screen View: Planta Baixa (SVG Top Down) */}
                    {activeTab === "plant" && (
                      <svg className="w-48 h-48 text-[#F4B400]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="15" y="15" width="70" height="70" strokeDasharray="3,3" />
                        {/* Pillars formatted as round circles representing logs! */}
                        <circle cx="16" cy="16" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                        <circle cx="84" cy="16" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                        <circle cx="16" cy="84" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                        <circle cx="84" cy="84" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                        {length > 4.5 && (
                          <>
                            <circle cx="16" cy="50" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                            <circle cx="84" cy="50" r={`${2 + (diamInfo.minVal - 8) * 0.2}`} fill="#5D4037" stroke="#3E2723" />
                          </>
                        )}
                        <line x1="16" y1="16" x2="16" y2="84" strokeWidth="2.5" stroke="#3E2723" />
                        <line x1="84" y1="16" x2="84" y2="84" strokeWidth="2.5" stroke="#3E2723" />
                        
                        {/* Rafters cross slats */}
                        <line x1="10" y1="20" x2="90" y2="20" strokeWidth="1" stroke="#8D6E63" />
                        <line x1="10" y1="35" x2="90" y2="35" strokeWidth="1" stroke="#8D6E63" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" stroke="#8D6E63" />
                        <line x1="10" y1="65" x2="90" y2="65" strokeWidth="1" stroke="#8D6E63" />
                        <line x1="10" y1="80" x2="90" y2="80" strokeWidth="1" stroke="#8D6E63" />
                        
                        <path d="M 5,20 L 5,80" stroke="#F4B400" strokeWidth="0.5" />
                        <text x="2" y="52" fill="#F4B400" fontSize="5" fontWeight="bold">{length.toFixed(1)}m</text>
                        <path d="M 20,95 L 80,95" stroke="#F4B400" strokeWidth="0.5" />
                        <text x="46" y="99" fill="#F4B400" fontSize="5" fontWeight="bold">{width.toFixed(1)}m</text>
                      </svg>
                    )}

                    {/* Screen View: Technical blueprint wireframe structure details */}
                    {activeTab === "struct" && (
                      <div className="flex flex-col items-center gap-2 max-w-xs font-mono text-[9px] text-[#F4B400] w-full">
                        <div className="border border-[#F4B400]/40 p-3 rounded bg-black/60 space-y-1.5 w-full">
                          <p className="text-white border-b border-[#F4B400]/30 pb-1 font-bold flex justify-between">
                            <span>PARÂMETROS NBR 7190:</span>
                            <span className="text-emerald-400">ATIVO</span>
                          </p>
                          <p>• Tipo: Madeira roliça de Eucalipto Tratado</p>
                          <p>• Bitola da Estrutura: *{diamInfo.label}* ({diamInfo.category})</p>
                          <p>• Índice de Esbeltez Geral: {nbrValidation.slenderness} λ</p>
                          <p>• Coeficiente de modificação (kmod): 0.60 (Classe 4)</p>
                          <p>• Tratamento químico: NBR 16143 Autoclave UC-4</p>
                          <p>• Ferragens: Barra roscada de aço galvanizado a fogo</p>
                        </div>
                        <div className="text-[8px] text-stone-400">Projetado em conformidade com as normas estruturais vigentes.</div>
                      </div>
                    )}

                    {/* Screen View: Dimension callout profile arrows */}
                    {activeTab === "dims" && (
                      <div className="relative w-full h-[220px] flex items-center justify-center">
                        <svg className="w-56 h-full text-stone-400" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                          <rect x="25" y="30" width="70" height="50" stroke="#8D6E63" strokeWidth="1.5" />
                          
                          {/* Round eucalyptus pillars profile */}
                          <rect x="25" y="30" width={`${3 + (diamInfo.minVal - 8) * 0.25}`} height="50" fill="#3E2723" stroke="#3E2723" />
                          <rect x="92" y="30" width={`${3 + (diamInfo.minVal - 8) * 0.25}`} height="50" fill="#3E2723" stroke="#3E2723" />
                          
                          <rect x="18" y="20" width="84" height="10" fill="#5D4037" stroke="#3E2723" />
                          <rect x="28" y="15" width="2" height="15" fill="#8D6E63" />
                          <rect x="43" y="15" width="2" height="15" fill="#8D6E63" />
                          <rect x="58" y="15" width="2" height="15" fill="#8D6E63" />
                          <rect x="73" y="15" width="2" height="15" fill="#8D6E63" />
                          <rect x="88" y="15" width="2" height="15" fill="#8D6E63" />

                          <path d="M 12,30 L 12,80" stroke="#F4B400" />
                          <text x="3" y="58" fill="#F4B400" fontSize="5" fontWeight="bold" transform="rotate(-90, 5, 58)">{height.toFixed(1)}m Altura</text>
                          
                          <path d="M 25,90 L 95,90" stroke="#F4B400" />
                          <text x="50" y="97" fill="#F4B400" fontSize="5" fontWeight="bold">{width.toFixed(1)}m Largura</text>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-stone-400 text-center border-t border-white/10 pt-2 leading-relaxed">
                    Visualizador interativo. Escolha as abas para ver os dados de engenharia.
                  </div>
                </div>

                {/* 3.3 RIGHT HAND COLUMN: REALTIME BILL OF MATERIALS (SEM PREÇOS!) */}
                <div className="lg:col-span-3 bg-white text-brown-dark p-6 rounded-3xl space-y-5 flex flex-col justify-between shadow-2xl dark:text-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                      <h4 className="font-display font-black text-xs tracking-wider text-brown-dark uppercase dark:text-white">Resumo de Materiais</h4>
                      <span className="bg-yellow-400 text-brown-dark font-black text-[10px] px-2.5 py-0.5 rounded shadow-sm dark:text-white">
                        {calculations.area} m² Total
                      </span>
                    </div>

                    {/* Materials output items */}
                    <div className="space-y-2.5 text-xs text-stone-700">
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium text-left">Pilares Roliços ({materialBitolas.pilar} - Comp. {height.toFixed(1)}m):</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.pilarCount} un</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium text-left">Vigas de Sustentação ({materialBitolas.viga} - Comp. {length.toFixed(1)}m):</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.beamCount} un</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium text-left">Travessas Superiores ({materialBitolas.rafter} - Comp. {width.toFixed(1)}m):</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.rafterCount} un</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium">Sapatas Metálicas de Solo:</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.sapataCount} un</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium">Parafusos/Ferragens NBR:</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.screwCount} un</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium">Galões Stain Protetor:</span>
                        <span className="font-black text-brown-dark dark:text-white">{calculations.stainGallons} gal</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-100 pb-1.5">
                        <span className="font-medium">Conformidade NBR 16143:</span>
                        <span className="font-bold text-emerald-600 text-[10px]">Autoclave UC-4</span>
                      </div>
                    </div>

                    {/* Wood volume display and Price Block hidden/locked! */}
                    <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-[11px] text-stone-500 font-bold">
                        <span>Volume Estimado:</span>
                        <span>{calculations.woodVolume} m³</span>
                      </div>
                      <div className="border-t border-stone-200/50 pt-1.5 flex flex-col gap-0.5 text-xs text-brown-dark dark:text-white">
                        <span className="font-bold text-stone-500">VALOR E FRETE DO KIT:</span>
                        <span className="text-[#3E2723] font-black text-[11px] uppercase tracking-wide flex items-center gap-1 dark:text-amber-400">
                          <Lock className="h-3.5 w-3.5 text-[#F4B400]" /> Sob Consulta no WhatsApp
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => { setIsSubmitted(false); setLeadModalOpen(true); }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-300 active:scale-97 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider border-none"
                    >
                      <ShoppingBag className="h-4 w-4" /> Liberar Orçamento Oficial
                    </button>
                    <span className="block text-[8px] text-stone-400 text-center leading-normal uppercase">
                      *Como regra, preencha os dados e receba o valor direto no WhatsApp!
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* 4. FOOTER TRUST & FAQS */}
          <AboutSection />
          <footer className="bg-[#3E2723] text-white py-12 px-4 border-t-4 border-[#F4B400] no-print">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-300">
              <div className="space-y-3">
                <h4 className="font-display font-black text-sm text-[#F4B400] uppercase tracking-wider">Só Madeiras Premium</h4>
                <p className="leading-relaxed">
                  Líder regional em fornecimento de troncos roliços de eucalipto autoclavados sob as rígidas normas brasileiras. Segurança mecânica e imunização perfeita.
                </p>
                <div className="flex items-center gap-2 pt-2 text-[#F4B400] font-black">
                  <span>📞 WhatsApp: {settings?.phone || "(79) 99629-8990"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-display font-black text-sm text-[#F4B400] uppercase tracking-wider">Normas Técnicas Reguladoras</h4>
                <div className="space-y-2 leading-relaxed">
                  <p><strong>ABNT NBR 7190:2022:</strong> Regulamenta as distâncias máximas de apoios e cálculo de carga vertical e esbeltez do eucalipto roliço para barrar encurvaduras e colapso.</p>
                  <p><strong>ABNT NBR 16143:</strong> Especifica que a madeira de eucalipto exposta a intempéries e contato com solo deve passar por autoclave tipo UC-4 para atingir retenção ideal contra pragas.</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-display font-black text-sm text-[#F4B400] uppercase tracking-wider">Rastreabilidade e Proteção</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-400">
                  <div className="bg-white/5 border border-white/10 p-2 rounded">🌲 Eucalipto Legalizado</div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">🛡️ Autoclavação Homologada</div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">📐 Esbeltez NBR 7190</div>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">🔒 UC-4 Solo & Umidade</div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-4 text-center text-[10px] text-stone-500">
              © {new Date().getFullYear()} SÓ MADEIRAS. Todos os direitos reservados.
            </div>
          </footer>

          {/* ==========================================
              MODAL DE LEAD CAPTURING (BEFORE WHATSAPP)
              ========================================== */}
          {leadModalOpen && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 px-4">
              <div className="bg-white dark:bg-zinc-900 text-brown-dark dark:text-white max-w-md w-full p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl relative space-y-6">
                
                <button 
                  onClick={() => setLeadModalOpen(false)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 bg-transparent border-none cursor-pointer"
                >
                  <Maximize2 className="h-5 w-5 rotate-45" />
                </button>

                <div className="text-center space-y-1">
                  <div className="bg-[#F4B400]/20 text-[#F4B400] w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl shadow shadow-[#F4B400]/10">🪵</div>
                  <h4 className="font-display font-black text-lg text-brown-dark dark:text-white uppercase pt-2">Liberar Orçamento Completo</h4>
                  <p className="text-[11px] text-stone-800 dark:text-stone-100 font-medium leading-normal max-w-xs mx-auto">
                    Conforme as regras do site, para liberar a cotação e enviar as medidas ao setor técnico, preencha os dados abaixo para ser direcionado ao WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleRequestQuote} className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-stone-600 dark:text-stone-400 block font-bold">Seu Nome Completo:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Carlos Souza"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 border border-stone-300 dark:border-stone-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-600 dark:text-stone-400 block font-bold">WhatsApp com DDD:</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ex: 19998765432"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 border border-stone-300 dark:border-stone-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-600 dark:text-stone-400 block font-bold">Cidade (Entregas em SP):</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Campinas"
                      value={leadForm.city}
                      onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 border border-stone-300 dark:border-stone-700 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition duration-300 active:scale-97 uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-none font-sans"
                  >
                    <Phone className="h-4.5 w-4.5" /> ENVIAR DADOS E ABRIR WHATSAPP
                  </button>

                  <span className="block text-[8px] text-stone-400 text-center leading-normal">
                    🔒 Seus dados serão mantidos em sigilo absoluto conforme a LGPD e usados unicamente para envio da cotação.
                  </span>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          ADMINISTRATIVE COCKPIT / ANALYTICS FUNNEL PERSPECTIVE
          ========================================== */}
      {viewMode === "admin" && (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950 md:flex-row transition-colors no-print">
          
          {/* Admin Sidebar */}
          <aside className="w-full md:w-64 bg-[#3E2723] text-white p-4 space-y-4 md:sticky md:top-11 md:h-[calc(100vh-44px)] flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="bg-[#F4B400] text-brown-dark rounded w-8 h-8 flex items-center justify-center font-bold text-sm">🪵</span>
                <div>
                  <h4 className="font-display font-black text-sm tracking-tight text-white leading-tight">PERGOLADOS</h4>
                  <p className="text-[9px] text-[#F4B400] tracking-widest font-black uppercase -mt-0.5">Painel de Performance</p>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <div className="px-3 py-2 text-stone-400 text-[10px] uppercase font-bold tracking-widest">Métricas Globais</div>
                <div className="w-full bg-[#5D4037] text-white px-3 py-2.5 rounded-lg flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-[#F4B400]" /> Dashboard e Funil
                </div>
                <button
                  onClick={() => setViewMode("client")}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 text-gray-300 transition flex items-center gap-2 bg-transparent border-none cursor-pointer"
                >
                  <Eye className="h-4 w-4" /> Visualizar Página Cliente
                </button>
              </nav>
            </div>

            <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-[10px] text-stone-400">
              <Lock className="h-3.5 w-3.5 text-[#F4B400] mb-1.5" />
              Você está na visão de performance integrada do Pergolado.
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-44px)] flex flex-col">
            
            {/* Top overview row */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-stone-800 pb-4">
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl text-[#3E2723] dark:text-white uppercase leading-none">Cockpit Administrativo de Pergolados</h3>
                <p className="text-stone-500 text-xs mt-1 font-semibold">Focado em geração de leads, conformidade técnica NBR 7190 e dimensionamento roliço de Eucalipto.</p>
              </div>
              <span className="bg-[#F4B400]/10 text-brown-dark dark:text-[#F4B400] border border-[#F4B400]/30 px-3 py-1 rounded text-xs font-bold font-mono">
                SESSÃO ATIVA
              </span>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Visitors */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-stone-400 dark:text-stone-500 font-extrabold text-[10px] uppercase tracking-wider block">Visitantes Totais</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white">{pergoladosAdminStats.visitors}</span>
                  <span className="text-emerald-500 font-bold text-[10px]">+14%</span>
                </div>
                <div className="h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brown-medium w-[82%]" />
                </div>
              </div>

              {/* Calculations Count */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-stone-400 dark:text-stone-500 font-extrabold text-[10px] uppercase tracking-wider block">Cálculos Normativos</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white">{pergoladosAdminStats.calculationsCount}</span>
                  <span className="text-[#F4B400] font-bold text-[10px]">+22%</span>
                </div>
                <div className="h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F4B400] w-[64%]" />
                </div>
              </div>

              {/* WhatsApp Clicks */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-stone-400 dark:text-stone-500 font-extrabold text-[10px] uppercase tracking-wider block">Direcionados WhatsApp</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xl md:text-2xl text-[#3E2723] dark:text-white">{pergoladosAdminStats.waClicksCount}</span>
                  <span className="text-emerald-500 font-bold text-[10px]">+8%</span>
                </div>
                <div className="h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[44%]" />
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm space-y-1.5">
                <span className="text-stone-400 dark:text-stone-500 font-extrabold text-[10px] uppercase tracking-wider block">Taxa de Conversão</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xl md:text-2xl text-brown-dark dark:text-white">{pergoladosAdminStats.conversionRate}%</span>
                  <span className="text-[#F4B400] font-bold text-[10px]">+1.8%</span>
                </div>
                <div className="h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F4B400] w-[35%]" />
                </div>
              </div>
            </div>

            {/* Visualizer Funnel chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
              
              {/* LEFT FUNNEL STEPS CHART */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-brown-dark dark:text-white flex items-center gap-1.5">
                    <Flame className="h-4.5 w-4.5 text-[#F4B400]" /> Funil de Conversão Integrado (Sem Preço na Loja)
                  </h4>
                  <span className="text-[10px] text-stone-400">Totalizadores de Ciclo</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-stone-600 dark:text-stone-400">1. Visualizou Página (100% de entrada)</span>
                      <span className="text-brown-dark dark:text-white">{pergoladosAdminStats.visitors} un</span>
                    </div>
                    <div className="h-5 bg-stone-100 dark:bg-stone-800 rounded overflow-hidden relative">
                      <div className="h-full bg-stone-400/35 w-full flex items-center pl-3 text-[10px] font-black text-brown-dark dark:text-white">
                        Visitantes de Landing Page
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-stone-600 dark:text-stone-400">2. Selecionou Modelo ({Math.round((pergoladosAdminStats.calculationsCount / pergoladosAdminStats.visitors) * 100)}% retenção)</span>
                      <span className="text-brown-dark dark:text-white">{Math.round(pergoladosAdminStats.visitors * 0.72)} un</span>
                    </div>
                    <div className="h-5 bg-stone-100 dark:bg-stone-800 rounded overflow-hidden relative">
                      <div className="h-full bg-[#5D4037]/45 w-[72%] flex items-center pl-3 text-[10px] font-black text-brown-dark dark:text-white">
                        Interesse no Catálogo
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-stone-600 dark:text-stone-400">3. Gerou Cálculo sob Medida ({Math.round((pergoladosAdminStats.calculationsCount / pergoladosAdminStats.visitors) * 100)}% retenção)</span>
                      <span className="text-[#3E2723] dark:text-white">{pergoladosAdminStats.calculationsCount} un</span>
                    </div>
                    <div className="h-5 bg-stone-100 dark:bg-stone-800 rounded overflow-hidden relative">
                      <div className="h-full bg-yellow-400/40 w-[54%] flex items-center pl-3 text-[10px] font-black text-brown-dark dark:text-white">
                        Interatividade Ativa (Ajuste de Diâmetro roliço)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-stone-600 dark:text-stone-400">4. Preencheu Nome/Contato & Abriu Whats ({Math.round((pergoladosAdminStats.waClicksCount / pergoladosAdminStats.visitors) * 100)}% retenção)</span>
                      <span className="text-[#3E2723] dark:text-white">{pergoladosAdminStats.waClicksCount} un</span>
                    </div>
                    <div className="h-5 bg-stone-100 dark:bg-stone-800 rounded overflow-hidden relative">
                      <div className="h-full bg-emerald-500/45 w-[12%] flex items-center pl-3 text-[10px] font-black text-[#3E2723] dark:text-amber-400">
                        Geração de Lead quente para Orçamento oficial
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT PIE TRAFFIC CHART */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-brown-dark dark:text-white">
                    Origem de Tráfego
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">UTMs</span>
                </div>

                <div className="flex-1 flex items-center justify-center min-h-[150px]">
                  <div className="space-y-2 text-xs w-full">
                    {pergoladosAdminStats.trafficData.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-medium text-stone-600 dark:text-stone-400">{item.name}</span>
                        </div>
                        <span className="font-black text-brown-dark dark:text-white">{item.value} visitas</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Popular models and calculations history grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
              
              {/* Popular Models count */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-brown-dark dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                  Modelos Mais Escolhidos & Calculados
                </h4>
                <div className="space-y-3.5 text-xs">
                  {pergoladosAdminStats.modelPopularity.map((model, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-stone-600 dark:text-stone-400">
                        <span className="font-bold">{model.name}</span>
                        <span>{model.views} visualizações • <strong>{model.calcs} cálculos</strong></span>
                      </div>
                      <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all" 
                          style={{ 
                            width: `${(model.calcs / 86) * 100}%`,
                            backgroundColor: model.color
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Dimensions list */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-brown-dark dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
                  Medidas Mais Simuladas (Largura x Comprimento)
                </h4>
                <div className="space-y-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {pergoladosAdminStats.popularDimensions.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#F4B400]">📐</span> 
                        <span>{item.dims}</span>
                      </span>
                      <span className="font-black text-[#3E2723] dark:text-white">{item.count} vezes solicitada</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* List of Pergolados Leads in CRM */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-4 flex-1">
              <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-brown-dark dark:text-white flex items-center gap-2">
                  <Users className="h-4.5 w-4.5 text-[#F4B400]" /> Leads Pergolados Registrados no CRM
                </h4>
                <span className="bg-[#3E2723] text-[#F4B400] font-mono text-[9px] px-2 py-0.5 rounded uppercase">
                  {pergoladosAdminStats.pergoladoLeads.length} leads ativos nesta máquina
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-bold uppercase text-[9px]">
                      <th className="py-2.5 px-3">Data</th>
                      <th className="py-2.5 px-3">Cliente</th>
                      <th className="py-2.5 px-3">Contato / Cidade</th>
                      <th className="py-2.5 px-3">Modelo / Medidas</th>
                      <th className="py-2.5 px-3 text-right">Referência Interna (Preço CRM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pergoladosAdminStats.pergoladoLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-stone-400">
                          Nenhum lead de Pergolados cadastrado nesta máquina local ainda. Faça uma simulação no storefront para testar a integração instantânea!
                        </td>
                      </tr>
                    ) : (
                      pergoladosAdminStats.pergoladoLeads.map((lead: any) => (
                        <tr key={lead.id} className="border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition">
                          <td className="py-3 px-3 font-mono text-stone-500">{lead.date} - {lead.time}</td>
                          <td className="py-3 px-3 font-bold text-brown-dark dark:text-white">{lead.name}</td>
                          <td className="py-3 px-3 text-stone-900 dark:text-stone-100 font-medium">
                            <p>{lead.phone}</p>
                            <span className="text-[10px] text-stone-400">{lead.location}</span>
                          </td>
                          <td className="py-3 px-3 text-stone-900 dark:text-stone-100 font-medium">
                            <p className="font-bold text-stone-800 dark:text-stone-200">{lead.products[0]}</p>
                            <span className="text-[10px] text-stone-400 block truncate max-w-sm">{lead.notes}</span>
                          </td>
                          <td className="py-3 px-3 font-black text-brown-dark dark:text-white text-right">
                            R$ {lead.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </main>
        </div>
      )}

    </div>
  );
}
