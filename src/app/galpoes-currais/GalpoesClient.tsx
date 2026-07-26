"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  Compass,
  Tractor,
  Maximize2
} from "lucide-react";

// Types
interface MaterialItem {
  name: string;
  spec: string;
  qty: number;
  unit: string;
}

export default function CalculadoraAgro() {
  // Global States
  const [activeTab, setActiveTab] = useState<"galpao" | "curral">("galpao");
  
  // Interactive Orbit Camera States
  const [rotationZ, setRotationZ] = useState<number>(35); // Yaw (0 to 360)
  const [rotationX, setRotationX] = useState<number>(55); // Pitch (15 to 85)
  const isDragging = useRef<boolean>(false);
  const startMouseX = useRef<number>(0);
  const startMouseY = useRef<number>(0);
  const startRotZ = useRef<number>(0);
  const startRotX = useRef<number>(0);

  // Lead Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [leadState, setLeadState] = useState("");
  const [systemNotification, setSystemNotification] = useState<string | null>(null);

  // Hydration safety
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try {
        setSettings(JSON.parse(local));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const activeWhatsapp = settings?.whatsappNumber || "5579996298990";

  // 1. STATE - GALPÃO CONFIGURATOR
  const [gWidth, setGWidth] = useState<number>(8); // Width in meters (4 to 12)
  const [gLength, setGLength] = useState<number>(12); // Length in meters (6 to 24)
  const [gHeight, setGHeight] = useState<number>(4.0); // Pé direito in meters (3.0 to 5.0)
  const [gTileType, setGTileType] = useState<"fibrocimento_244_050" | "fibrocimento_244_110" | "galvanizada_6_104">("fibrocimento_244_110");
  const [gPillarBitola, setGPillarBitola] = useState<"14-16" | "16-18" | "18-20">("16-18");

  // 2. STATE - CURRAL CONFIGURATOR
  const [cCapacity, setCCapacity] = useState<number>(50); // Capacity (25, 50, 100, 150)
  const [cDivisions, setCDivisions] = useState<number>(3); // Divisions (2, 3, 4)
  const [cRailsQty, setCRailsQty] = useState<number>(5); // Horizontal rails (5 or 6)
  const [cRailType, setCRailType] = useState<"rolico" | "tabua">("rolico");
  const [cHasTronco, setCHasTronco] = useState<boolean>(true);
  const [cHasEmbarcador, setCHasEmbarcador] = useState<boolean>(true);

  // Memoized current dimensions and dynamic projection scale factor based on active tab
  const currentDimensions = useMemo(() => {
    let w = 8;
    let l = 12;
    let h = 4.0;
    
    if (activeTab === "galpao") {
      w = gWidth;
      l = gLength;
      h = gHeight;
    } else {
      let sizeM = 12;
      if (cCapacity === 25) sizeM = 8;
      else if (cCapacity === 100) sizeM = 16;
      else if (cCapacity === 150) sizeM = 20;
      
      w = sizeM;
      l = sizeM;
      h = 2.0; // 2 meters high for cattle corral fence
    }
    
    const maxDim = Math.max(w, l);
    // Dynamic screen multiplier: maps 1 meter in 3D to pixels, framing the model nicely in the viewport
    const multiplier = Math.max(10, Math.min(60, 320 / maxDim));
    
    return {
      wPx: w,
      lPx: l,
      hPx: h,
      screenMultiplier: multiplier
    };
  }, [activeTab, gWidth, gLength, gHeight, cCapacity]);

  const { wPx, lPx, hPx, screenMultiplier } = currentDimensions;

  // DYNAMIC NOTIFICATIONS
  const addSystemNotification = (msg: string) => {
    setSystemNotification(msg);
    setTimeout(() => {
      setSystemNotification(null);
    }, 3000);
  };

  // CAMERA ORBIT MOUSE HANDLERS
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    startMouseX.current = clientX;
    startMouseY.current = clientY;
    startRotZ.current = rotationZ;
    startRotX.current = rotationX;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startMouseX.current;
    const deltaY = clientY - startMouseY.current;

    // Adjust Rotation angles
    const newZ = (startRotZ.current - deltaX * 0.5) % 360;
    const newX = Math.max(15, Math.min(85, startRotX.current + deltaY * 0.4));

    setRotationZ(newZ >= 0 ? newZ : 360 + newZ);
    setRotationX(newX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => handleMouseMove(e);
    const handleRelease = () => handleMouseUp();

    if (mounted) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleRelease);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleRelease);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleRelease);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleRelease);
    };
  }, [mounted, rotationZ, rotationX]);

  // RESET VIEW HANDLER
  const resetCamera = () => {
    setRotationZ(35);
    setRotationX(55);
    addSystemNotification("Visualização redefinida!");
  };

  // ==========================================
  // MATHEMATICAL SVG 3D PROJECTION ENGINE
  // ==========================================
  const viewWidth = 650;
  const viewHeight = 450;

  // Projection Formula
  const project = (x: number, y: number, z: number, wSize: number, lSize: number, hSize: number) => {
    // 1. Center the volume around Z-axis and Ground plane
    const cx = x - wSize / 2;
    const cy = y - lSize / 2;
    const cz = z - hSize / 2;

    // 2. Rotate around Z-axis (Yaw)
    const radZ = (rotationZ * Math.PI) / 180;
    const cosZ = Math.cos(radZ);
    const sinZ = Math.sin(radZ);
    const rx = cx * cosZ - cy * sinZ;
    const ry = cx * sinZ + cy * cosZ;

    // 3. Rotate around X-axis (Pitch)
    const radX = (rotationX * Math.PI) / 180;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const ry2 = ry * cosX - cz * sinX;
    const rz2 = ry * sinX + cz * cosX;

    // 4. Perspective Math
    const distance = 450;
    const scale = distance / (distance + rz2);

    // 5. Project to 2D Viewport coordinates (scaled & centered dynamically)
    const screenX = viewWidth / 2 + rx * scale * screenMultiplier;
    const screenY = viewHeight / 2 + ry2 * scale * screenMultiplier + 30; // slightly offset downwards

    return { x: screenX, y: screenY, z: rz2 };
  };

  // Helper: Vector length in 2D
  const get2DLength = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Helper: Vector angle in 2D
  const get2DAngle = (x1: number, y1: number, x2: number, y2: number) => {
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  };

  // ==========================================
  // MATERIALS & PRICING ESTIMATION ALGORITHMS
  // ==========================================

  // A. Galpão Materials
  const galpaoMaterialsList = useMemo<MaterialItem[]>(() => {
    const list: MaterialItem[] = [];
    
    // Spacing of pillars along length is standard 3.0m
    const spacing = 3.0;
    const bays = Math.ceil(gLength / spacing);
    const pCount = (bays + 1) * 2; // pillars on both sides

    // 1. Sustentação (Pilares)
    list.push({
      name: "Pilares - Eucalipto Roliço Tratado",
      spec: `Ø ${gPillarBitola}cm | Comp. ${Math.ceil(gHeight + 1.0)}m (chumbado 1.0m)`,
      qty: pCount,
      unit: "Toras"
    });

    // 2. Cobertura (Tesouras)
    // One truss per bay line (total bays + 1)
    const trussCount = bays + 1;
    list.push({
      name: "Tesouras Rústicas Monobloco",
      spec: `Ø 10-12cm | Montadas p/ Vão de ${gWidth}m`,
      qty: trussCount,
      unit: "Peças"
    });

    // 3. Terças Longitudinais
    // Normally spaced every 1.0m along the roof rafters slope (~1.2m spacing)
    // Roof rafter slope hypotenuse for half width
    const roofHyp = Math.sqrt(Math.pow(gWidth / 2, 2) + Math.pow(gWidth / 2 * 0.3, 2));
    const purlinRowsPerSide = Math.ceil(roofHyp / 1.1) + 1; // plus ridge purlin
    const totalPurlinPeças = purlinRowsPerSide * 2 * trussCount;
    list.push({
      name: "Terças Longitudinais (Eucalipto)",
      spec: "Ø 08-10cm | Longarinas de 3.0m",
      qty: totalPurlinPeças,
      unit: "Vara"
    });

    // 4. Mão Francesa (Diagonal Bracing)
    list.push({
      name: "Mão Francesa Estrutural",
      spec: "Ø 08-10cm | Peças de 1.0m c/ corte angular",
      qty: pCount * 2,
      unit: "Peças"
    });

    // 5. Cobertura (Telhas)
    const roofArea = gLength * gWidth * 1.05; // sloped correction
    if (gTileType === "fibrocimento_244_050") {
      list.push({
        name: "Telha de Fibrocimento",
        spec: "2.44 x 0.50m | Espessura 6mm",
        qty: Math.ceil(roofArea / 1.08),
        unit: "Telhas"
      });
    } else if (gTileType === "fibrocimento_244_110") {
      list.push({
        name: "Telha de Fibrocimento",
        spec: "2.44 x 1.10m | Espessura 6mm",
        qty: Math.ceil(roofArea / 2.52),
        unit: "Telhas"
      });
    } else {
      list.push({
        name: "Telha Galvanizada",
        spec: "6.00 x 1.04m | Ondulada/Trapezoidal",
        qty: Math.ceil(roofArea / 5.90),
        unit: "Chapas"
      });
    }

    // 6. Fixação e Cimento
    list.push({
      name: "Barra Roscada Zincada c/ Porcas",
      spec: "3/8\" x 1m para travamento de tesouras/pilares",
      qty: Math.ceil(pCount * 1.5),
      unit: "Barras"
    });
    list.push({
      name: "Cimento CP-II p/ Fundação",
      spec: "Sacos de 50kg p/ chumbamento de pilares",
      qty: Math.ceil(pCount * 0.75),
      unit: "Sacos"
    });

    return list;
  }, [gWidth, gLength, gHeight, gTileType, gPillarBitola]);

  // B. Curral Materials
  const curralMaterialsList = useMemo<MaterialItem[]>(() => {
    const list: MaterialItem[] = [];

    // Capacity defines dimensions
    let perimeter = 0;
    let dividerLength = 0;
    let mainMourões = 0;

    if (cCapacity === 25) {
      perimeter = 32; // 8x8m
      dividerLength = cDivisions > 2 ? 16 : 8; // divisions
    } else if (cCapacity === 50) {
      perimeter = 48; // 12x12m
      dividerLength = cDivisions > 2 ? 24 : 12;
    } else if (cCapacity === 100) {
      perimeter = 64; // 16x16m
      dividerLength = cDivisions > 2 ? 32 : 16;
    } else {
      perimeter = 80; // 20x20m
      dividerLength = cDivisions > 2 ? 40 : 20;
    }

    // Mourões perimetrais spaced every 2.0m
    const pMourões = Math.ceil(perimeter / 2.0);
    const dMourões = Math.ceil(dividerLength / 2.0);
    mainMourões = pMourões + dMourões;

    // 1. Mourões Principais (Sustentação)
    list.push({
      name: "Mourões Estacas - Eucalipto Roliço",
      spec: "Ø 14-16cm | Comp. 3.0m (chumbados 1.0m)",
      qty: mainMourões,
      unit: "Mourões"
    });

    // 2. Estacas de Reforço (Cantos/Esticadores)
    const corners = 4 + (cDivisions * 2);
    list.push({
      name: "Mourões Esticadores Reforçados (Cantos)",
      spec: "Ø 16-18cm | Comp. 3.0m ultra-resistente",
      qty: corners,
      unit: "Peças"
    });

    // 3. Fechamento (Réguas/Tábuas)
    const totalFenceLength = perimeter + dividerLength;
    const piecesPerSpan = cRailsQty;
    const piecesQty = Math.ceil((totalFenceLength / 2.0) * piecesPerSpan);

    if (cRailType === "rolico") {
      list.push({
        name: "Réguas Roliças horizontais (Eucalipto)",
        spec: `Ø 08-10cm | Peças roliças de 2.20m (${cRailsQty} fileiras)`,
        qty: piecesQty,
        unit: "Peças"
      });
    } else {
      list.push({
        name: "Tábuas Serradas de Madeira de Lei",
        spec: `Aparelhadas 3x15cm | Comprimento 2.20m (${cRailsQty} fileiras)`,
        qty: piecesQty,
        unit: "Peças"
      });
    }

    // 4. Porteiras
    list.push({
      name: "Porteiras Rústicas de Curral",
      spec: "Aço/Madeira 2.0m c/ trincos reforçados",
      qty: cDivisions + 1,
      unit: "Porteiras"
    });

    // 5. Tronco de Contenção (Chute)
    if (cHasTronco) {
      list.push({
        name: "Tronco de Contenção Coletivo (Chute)",
        spec: "Estrutura roliça dupla Ø 16-18cm c/ paredes taboadas",
        qty: 1,
        unit: "Kit"
      });
    }

    // 6. Embarcador
    if (cHasEmbarcador) {
      list.push({
        name: "Embarcador de Gado c/ Rampa",
        spec: "Mourões guia Ø 14-16cm c/ tabuado reforçado e rampa de subida",
        qty: 1,
        unit: "Kit"
      });
    }

    // 7. Cimento e Parafusos
    list.push({
      name: "Parafusos Reforçados c/ Porcas",
      spec: "Zincados 1/2\" x 8\" para fixação das réguas",
      qty: Math.ceil(piecesQty * 2),
      unit: "Parafusos"
    });
    list.push({
      name: "Cimento CP-II (Fundação Mourões)",
      spec: "Sacos de 50kg para fixação rápida dos mourões",
      qty: Math.ceil(mainMourões * 0.5),
      unit: "Sacos"
    });

    return list;
  }, [cCapacity, cDivisions, cRailsQty, cRailType, cHasTronco, cHasEmbarcador]);

  // DYNAMIC TEXT GENERATOR FOR WHATSAPP REDIRECT
  const handleSendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadCity || !leadState) {
      alert("Por favor, preencha todos os campos do contato.");
      return;
    }

    let text = "";
    if (activeTab === "galpao") {
      text = `Olá! Solicito orçamento de materiais para o seguinte projeto de *Galpão Rústico de Eucalipto*:\n\n`;
      text += `*ESPECIFICAÇÕES DO GALPÃO:*\n`;
      text += `- Largura: ${gWidth} metros\n`;
      text += `- Comprimento: ${gLength} metros\n`;
      text += `- Pé Direito: ${gHeight.toFixed(1)} metros\n`;
      text += `- Diâmetro dos Pilares: ${gPillarBitola} cm\n`;
      let formattedTile = "";
      if (gTileType === "fibrocimento_244_050") formattedTile = "Fibrocimento 2,44x0,50m (6mm)";
      else if (gTileType === "fibrocimento_244_110") formattedTile = "Fibrocimento 2,44x1,10m (6mm)";
      else formattedTile = "Telha Galvanizada 6,00x1,04m";
      text += `- Tipo de Telha: ${formattedTile}\n\n`;
      text += `*ESTIMATIVA DE MATERIAIS:*\n`;
      galpaoMaterialsList.forEach((m) => {
        text += `- ${m.qty} ${m.unit} de ${m.name} (${m.spec})\n`;
      });
    } else {
      text = `Olá! Solicito orçamento de materiais para o seguinte projeto de *Curral de Manejo Rústico*:\n\n`;
      text += `*ESPECIFICAÇÕES DO CURRAL:*\n`;
      text += `- Capacidade Recomendada: ${cCapacity} cabeças\n`;
      text += `- Número de Divisões internas: ${cDivisions}\n`;
      text += `- Altura das Cercas: ${cRailsQty} réguas\n`;
      text += `- Material das Réguas: ${cRailType === "rolico" ? "Eucalipto Roliço" : "Tábuas Serradas"}\n`;
      text += `- Acessórios: ${cHasTronco ? "Com Tronco" : "Sem Tronco"} | ${cHasEmbarcador ? "Com Embarcador" : "Sem Embarcador"}\n\n`;
      text += `*ESTIMATIVA DE MATERIAIS:*\n`;
      curralMaterialsList.forEach((m) => {
        text += `- ${m.qty} ${m.unit} de ${m.name} (${m.spec})\n`;
      });
    }

    text += `\n*DADOS DO PRODUTOR:*\n`;
    text += `- Nome: ${leadName}\n`;
    text += `- Contato: ${leadPhone}\n`;
    text += `- Cidade/UF: ${leadCity} - ${leadState}\n\n`;
    text += `Solicito contato para negociar preços e frete. Obrigado!`;

    // Save Lead to localStorage Commercial flow
    const somadeirasLeads = localStorage.getItem("somadeiras_leads");
    const parsedLeads = somadeirasLeads ? JSON.parse(somadeirasLeads) : [];
    
    const newLead = {
      id: "agro-" + Date.now(),
      name: leadName,
      phone: leadPhone,
      city: leadCity,
      state: leadState,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Calculadora Agro 3D",
      utm: "utm_source=agro_calculator&utm_medium=3d_simulation",
      products: activeTab === "galpao" 
        ? [`Galpão Rústico Eucalipto ${gWidth}x${gLength}m x1`] 
        : [`Curral Rústico ${cCapacity} Cabeças (${cDivisions} Div.) x1`],
      total: activeTab === "galpao" ? gWidth * gLength * 180 : cCapacity * 120, // rough concept budget
      status: "Novo Lead",
      sellerId: "maria",
      device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "Mobile / Web" : "Windows / Web") : "Web",
      notes: activeTab === "galpao" 
        ? `Solicitou Galpão ${gWidth}x${gLength}m c/ pé direito de ${gHeight}m e cobertura de telha ${gTileType === "fibrocimento_244_050" ? "fibrocimento 2,44x0,50" : gTileType === "fibrocimento_244_110" ? "fibrocimento 2,44x1,10" : "galvanizada 6mt x 1,04"}.`
        : `Solicitou Curral de ${cCapacity} cabeças c/ ${cDivisions} divisórias, tronco: ${cHasTronco ? "sim" : "não"}, embarcador: ${cHasEmbarcador ? "sim" : "não"}.`
    };

    localStorage.setItem("somadeiras_leads", JSON.stringify([newLead, ...parsedLeads]));

    setIsLeadModalOpen(false);
    addSystemNotification("Orçamento enviado! Direcionando para o WhatsApp...");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${activeWhatsapp}&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  // ==========================================
  // RENDER DYNAMIC SVG 3D MODELS
  // ==========================================

  // Helper: render cylindrical volumetric eucalyptus log in 3D projection
  const render3DLog = (
    id: string,
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number,
    diaCm: number,
    colorHex: string,
    wSize: number, lSize: number, hSize: number
  ) => {
    // Project start and end coordinates
    const p1 = project(x1, y1, z1, wSize, lSize, hSize);
    const p2 = project(x2, y2, z2, wSize, lSize, hSize);

    // Compute thickness in screen pixels based on distance (depth) and screenMultiplier
    const avgZ = (p1.z + p2.z) / 2;
    const distanceFactor = 450 / (450 + avgZ);
    const thickness = (diaCm / 100) * screenMultiplier * distanceFactor * 1.4;

    // Angle of the log in 2D projection
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    
    if (len === 0) return null;

    // Unit perpendicular vectors for drawing cylinder borders
    const ux = -dy / len;
    const uy = dx / len;

    // Polygon coordinates of the cylinder face
    const xA = p1.x + ux * (thickness / 2);
    const yA = p1.y + uy * (thickness / 2);
    const xB = p2.x + ux * (thickness / 2);
    const yB = p2.y + uy * (thickness / 2);
    const xC = p2.x - ux * (thickness / 2);
    const yC = p2.y - uy * (thickness / 2);
    const xD = p1.x - ux * (thickness / 2);
    const yD = p1.y - uy * (thickness / 2);

    const pointsStr = `${xA},${yA} ${xB},${yB} ${xC},${yC} ${xD},${yD}`;
    const perpendicularAngle = get2DAngle(p1.x, p1.y, p2.x, p2.y) + 90;

    return (
      <g key={id}>
        {/* Dynamic Linear Gradient perpendicular to log orientation */}
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${perpendicularAngle})`}>
            <stop offset="0%" stopColor={colorHex} stopOpacity="0.85" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.30" />
            <stop offset="60%" stopColor={colorHex} stopOpacity="1.0" />
            <stop offset="100%" stopColor="#2D1B18" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Cylinder Main Body */}
        <polygon 
          points={pointsStr} 
          fill={`url(#grad-${id})`}
          stroke="#3E2723" 
          strokeWidth="0.5" 
          filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.15))"
        />

        {/* Volumetric Top Cap cut ellipse at p2 end (closest end based on Z) */}
        <ellipse
          cx={p2.x}
          cy={p2.y}
          rx={thickness / 2}
          ry={thickness / 4}
          transform={`rotate(${perpendicularAngle - 90}, ${p2.x}, ${p2.y})`}
          fill="#A1887F"
          stroke="#4E342E"
          strokeWidth="0.75"
        />
        
        {/* Decorative inner wood grain ring */}
        <ellipse
          cx={p2.x}
          cy={p2.y}
          rx={thickness / 4}
          ry={thickness / 8}
          transform={`rotate(${perpendicularAngle - 90}, ${p2.x}, ${p2.y})`}
          fill="none"
          stroke="#5D4037"
          strokeWidth="0.5"
          opacity="0.6"
        />
      </g>
    );
  };

  // BUILD THE 3D SCENE SCENARIO
  const render3DScene = () => {
    const renderElements: { depth: number; element: React.ReactNode }[] = [];
    const { wPx, lPx, hPx } = currentDimensions;

    if (activeTab === "galpao") {
      // 1. CONCRETE SLAB BASE (Z = 0)
      const pBaseA = project(0, 0, 0, wPx, lPx, hPx);
      const pBaseB = project(wPx, 0, 0, wPx, lPx, hPx);
      const pBaseC = project(wPx, lPx, 0, wPx, lPx, hPx);
      const pBaseD = project(0, lPx, 0, wPx, lPx, hPx);

      renderElements.push({
        depth: 99999, // Render first/deepest
        element: (
          <g key="slab-base">
            <polygon
              points={`${pBaseA.x},${pBaseA.y} ${pBaseB.x},${pBaseB.y} ${pBaseC.x},${pBaseC.y} ${pBaseD.x},${pBaseD.y}`}
              fill="#CFD8DC"
              stroke="#B0BEC5"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Grid concrete lines */}
            <polygon
              points={`${pBaseA.x},${pBaseA.y} ${pBaseB.x},${pBaseB.y} ${pBaseC.x},${pBaseC.y} ${pBaseD.x},${pBaseD.y}`}
              fill="none"
              stroke="#ECEFF1"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
          </g>
        )
      });

      // 2. PILLARS & TRUSSES
      const spacing = 3.0; // 3.0m standard spacing in metric system
      const bays = Math.ceil(lPx / spacing);

      for (let i = 0; i <= bays; i++) {
        const ly = i * (lPx / bays);

        // Left Pillar
        const depthLeft = (project(0, ly, hPx / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthLeft,
          element: render3DLog(`pillar-L-${i}`, 0, ly, 0, 0, ly, hPx, 16, "#5D4037", wPx, lPx, hPx)
        });

        // Right Pillar
        const depthRight = (project(wPx, ly, hPx / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthRight,
          element: render3DLog(`pillar-R-${i}`, wPx, ly, 0, wPx, ly, hPx, 16, "#5D4037", wPx, lPx, hPx)
        });

        // TRUSS FOR THIS BAY LINE
        const hTruss = hPx + (wPx / 2) * 0.3; // 30% sloped roof height

        // Truss bottom horizontal tie beam
        const depthTie = (project(wPx / 2, ly, hPx, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthTie,
          element: render3DLog(`truss-tie-${i}`, 0, ly, hPx, wPx, ly, hPx, 12, "#6D4C41", wPx, lPx, hPx)
        });

        // Truss diagonal rafter Left
        const depthDiagL = (project(wPx / 4, ly, (hPx + hTruss) / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthDiagL,
          element: render3DLog(`truss-diagL-${i}`, 0, ly, hPx, wPx / 2, ly, hTruss, 11, "#6D4C41", wPx, lPx, hPx)
        });

        // Truss diagonal rafter Right
        const depthDiagR = (project((3 * wPx) / 4, ly, (hPx + hTruss) / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthDiagR,
          element: render3DLog(`truss-diagR-${i}`, wPx, ly, hPx, wPx / 2, ly, hTruss, 11, "#6D4C41", wPx, lPx, hPx)
        });

        // Truss king post vertical pendural
        const depthKing = (project(wPx / 2, ly, (hPx + hTruss) / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthKing,
          element: render3DLog(`truss-king-${i}`, wPx / 2, ly, hPx, wPx / 2, ly, hTruss, 10, "#5D4037", wPx, lPx, hPx)
        });

        // Side enclosure fence/rail for first bay left/right (half-height)
        if (i < bays) {
          const lyMid = ly + (lPx / bays) / 2;
          const depthEnclL = (project(0, lyMid, hPx * 0.2, wPx, lPx, hPx)).z;
          renderElements.push({
            depth: depthEnclL,
            element: (
              <g key={`encl-L-${i}`}>
                {/* 3 rows of horizontal eucalyptus fence rails (realistic wood brown) */}
                {render3DLog(`encl-L-r1-${i}`, 0, ly, hPx * 0.15, 0, ly + (lPx / bays), hPx * 0.15, 9, "#8D6E63", wPx, lPx, hPx)}
                {render3DLog(`encl-L-r2-${i}`, 0, ly, hPx * 0.35, 0, ly + (lPx / bays), hPx * 0.35, 9, "#8D6E63", wPx, lPx, hPx)}
                {render3DLog(`encl-L-r3-${i}`, 0, ly, hPx * 0.55, 0, ly + (lPx / bays), hPx * 0.55, 9, "#8D6E63", wPx, lPx, hPx)}
              </g>
            )
          });

          const depthEnclR = (project(wPx, lyMid, hPx * 0.2, wPx, lPx, hPx)).z;
          renderElements.push({
            depth: depthEnclR,
            element: (
              <g key={`encl-R-${i}`}>
                {render3DLog(`encl-R-r1-${i}`, wPx, ly, hPx * 0.15, wPx, ly + (lPx / bays), hPx * 0.15, 9, "#8D6E63", wPx, lPx, hPx)}
                {render3DLog(`encl-R-r2-${i}`, wPx, ly, hPx * 0.35, wPx, ly + (lPx / bays), hPx * 0.35, 9, "#8D6E63", wPx, lPx, hPx)}
                {render3DLog(`encl-R-r3-${i}`, wPx, ly, hPx * 0.55, wPx, ly + (lPx / bays), hPx * 0.55, 9, "#8D6E63", wPx, lPx, hPx)}
              </g>
            )
          });
        }
      }

      // 3. PURLINS & ROOF SLAB (Z = hTruss + sloped)
      const hTruss = hPx + (wPx / 2) * 0.3;
      const pRidgeStart = project(wPx / 2, 0, hTruss, wPx, lPx, hPx);
      const pRidgeEnd = project(wPx / 2, lPx, hTruss, wPx, lPx, hPx);

      // Ridge longitudinal tora
      const depthRidge = (pRidgeStart.z + pRidgeEnd.z) / 2;
      renderElements.push({
        depth: depthRidge,
        element: render3DLog("ridge-purlin", wPx / 2, 0, hTruss + 0.1, wPx / 2, lPx, hTruss + 0.1, 10, "#8D6E63", wPx, lPx, hPx)
      });

      // ROOF SLOPED PLANES (Telhado de Duas Águas)
      // Left Roof Plane
      const pRoofLA = project(0, 0, hPx, wPx, lPx, hPx);
      const pRoofLB = project(wPx / 2, 0, hTruss + 0.2, wPx, lPx, hPx);
      const pRoofLC = project(wPx / 2, lPx, hTruss + 0.2, wPx, lPx, hPx);
      const pRoofLD = project(0, lPx, hPx, wPx, lPx, hPx);
      
      const depthRoofL = (pRoofLA.z + pRoofLB.z + pRoofLC.z + pRoofLD.z) / 4;
      renderElements.push({
        depth: depthRoofL - 10, // Render on top of rafter
        element: (
          <polygon
            key="roof-plane-L"
            points={`${pRoofLA.x},${pRoofLA.y} ${pRoofLB.x},${pRoofLB.y} ${pRoofLC.x},${pRoofLC.y} ${pRoofLD.x},${pRoofLD.y}`}
            fill={gTileType === "galvanizada_6_104" ? "#78909C" : "#B0BEC5"}
            stroke={gTileType === "galvanizada_6_104" ? "#546E7A" : "#78909C"}
            strokeWidth="1.5"
            opacity="0.9"
            filter="drop-shadow(1px 4px 6px rgba(0,0,0,0.25))"
          />
        )
      });

      // Right Roof Plane
      const pRoofRA = project(wPx / 2, 0, hTruss + 0.2, wPx, lPx, hPx);
      const pRoofRB = project(wPx, 0, hPx, wPx, lPx, hPx);
      const pRoofRC = project(wPx, lPx, hPx, wPx, lPx, hPx);
      const pRoofRD = project(wPx / 2, lPx, hTruss + 0.2, wPx, lPx, hPx);

      const depthRoofR = (pRoofRA.z + pRoofRB.z + pRoofRC.z + pRoofRD.z) / 4;
      renderElements.push({
        depth: depthRoofR - 10,
        element: (
          <polygon
            key="roof-plane-R"
            points={`${pRoofRA.x},${pRoofRA.y} ${pRoofRB.x},${pRoofRB.y} ${pRoofRC.x},${pRoofRC.y} ${pRoofRD.x},${pRoofRD.y}`}
            fill={gTileType === "galvanizada_6_104" ? "#607D8B" : "#90A4AE"}
            stroke={gTileType === "galvanizada_6_104" ? "#455A64" : "#607D8B"}
            strokeWidth="1.5"
            opacity="0.9"
            filter="drop-shadow(1px 4px 6px rgba(0,0,0,0.25))"
          />
        )
      });

    } else {
      // ==========================================
      // CURRAL DE MANEJO 3D SCENE
      // ==========================================
      
      // 1. DIRT PADDOCK BASE (Z = 0)
      const pBaseA = project(0, 0, 0, wPx, lPx, hPx);
      const pBaseB = project(wPx, 0, 0, wPx, lPx, hPx);
      const pBaseC = project(wPx, lPx, 0, wPx, lPx, hPx);
      const pBaseD = project(0, lPx, 0, wPx, lPx, hPx);

      renderElements.push({
        depth: 99999, // Render first
        element: (
          <polygon
            key="dirt-paddock-base"
            points={`${pBaseA.x},${pBaseA.y} ${pBaseB.x},${pBaseB.y} ${pBaseC.x},${pBaseC.y} ${pBaseD.x},${pBaseD.y}`}
            fill="#D7CCC8"
            stroke="#BCAAA4"
            strokeWidth="2"
            opacity="0.9"
          />
        )
      });

      // 2. FENCING MOURÕES & HORIZONTAL RAILS
      // Main perimetral posts
      const spacingM = 2.0; // 2.0m standard spacing in metric system
      const cols = Math.ceil(wPx / spacingM);
      const rows = Math.ceil(lPx / spacingM);

      // We plot perimetral posts and rails
      const mourões: { x: number; y: number }[] = [];
      
      // Top & Bottom rows
      for (let i = 0; i <= cols; i++) {
        const lx = i * (wPx / cols);
        mourões.push({ x: lx, y: 0 });
        mourões.push({ x: lx, y: lPx });
      }
      // Left & Right columns (excluding corners)
      for (let j = 1; j < rows; j++) {
        const ly = j * (lPx / rows);
        mourões.push({ x: 0, y: ly });
        mourões.push({ x: wPx, y: ly });
      }

      // Divider internally (based on divisions)
      if (cDivisions >= 2) {
        // Horizontal divider cut across center
        for (let i = 0; i <= cols; i++) {
          const lx = i * (wPx / cols);
          mourões.push({ x: lx, y: lPx / 2 });
        }
      }
      if (cDivisions >= 3) {
        // Vertical divider cut
        for (let j = 0; j <= rows; j++) {
          const ly = j * (lPx / rows);
          mourões.push({ x: wPx / 2, y: ly });
        }
      }

      // Draw all Mourão Toras (volumetric vertical logs)
      mourões.forEach((m, idx) => {
        const depth = (project(m.x, m.y, hPx / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depth,
          element: render3DLog(`mourão-${idx}`, m.x, m.y, 0, m.x, m.y, hPx, 15, "#5D4037", wPx, lPx, hPx)
        });
      });

      // Draw all horizontal Rails (Réguas)
      const railColor = cRailType === "rolico" ? "#8D6E63" : "#3E2723";
      const railDia = cRailType === "rolico" ? 8 : 6;

      // 5 or 6 rows of heights
      const railHeights = [];
      const step = hPx / (cRailsQty + 1); // Fixed cCRailsQty typo!
      for (let k = 1; k <= cRailsQty; k++) { // Fixed cCRailsQty typo!
        railHeights.push(k * step);
      }

      railHeights.forEach((rh, hIdx) => {
        // Perimeter Longitudinal Top (y = 0)
        const depthLongTop = (project(wPx / 2, 0, rh, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthLongTop - 1,
          element: render3DLog(`rail-lt-${hIdx}`, 0, 0, rh, wPx, 0, rh, railDia, railColor, wPx, lPx, hPx)
        });

        // Perimeter Longitudinal Bottom (y = lPx)
        const depthLongBot = (project(wPx / 2, lPx, rh, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthLongBot - 1,
          element: render3DLog(`rail-lb-${hIdx}`, 0, lPx, rh, wPx, lPx, rh, railDia, railColor, wPx, lPx, hPx)
        });

        // Perimeter Transversal Left (x = 0)
        const depthTransL = (project(0, lPx / 2, rh, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthTransL - 1,
          element: render3DLog(`rail-tl-${hIdx}`, 0, 0, rh, 0, lPx, rh, railDia, railColor, wPx, lPx, hPx)
        });

        // Perimeter Transversal Right (x = wPx)
        const depthTransR = (project(wPx, lPx / 2, rh, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthTransR - 1,
          element: render3DLog(`rail-tr-${hIdx}`, wPx, 0, rh, wPx, lPx, rh, railDia, railColor, wPx, lPx, hPx)
        });

        // Divider Internal Longitudinal (y = lPx/2)
        if (cDivisions >= 2) {
          const depthDivLong = (project(wPx / 2, lPx / 2, rh, wPx, lPx, hPx)).z;
          renderElements.push({
            depth: depthDivLong - 2,
            element: render3DLog(`rail-divl-${hIdx}`, 0, lPx / 2, rh, wPx, lPx / 2, rh, railDia, railColor, wPx, lPx, hPx)
          });
        }
      });

      // 3. ACCESSORY: CATTLE CHUTE (TRONCO DE CONTENÇÃO)
      if (cHasTronco) {
        // Corridor on the right side of the paddock (x = wPx + 1.0, from y = 1.0 to y = 6.0)
        const cx = wPx + 1.0;
        const cyStart = 1.0;
        const cyEnd = 6.0;
        
        // Chute Walls
        const depthChuteL = (project(cx, (cyStart + cyEnd) / 2, hPx / 2, wPx, lPx, hPx)).z;
        renderElements.push({
          depth: depthChuteL - 5,
          element: (
            <g key="chute-structure">
              {/* Vertical Mourões */}
              {render3DLog("chute-p1", cx, cyStart, 0, cx, cyStart, hPx + 0.4, 16, "#3E2723", wPx, lPx, hPx)}
              {render3DLog("chute-p2", cx, cyEnd, 0, cx, cyEnd, hPx + 0.4, 16, "#3E2723", wPx, lPx, hPx)}
              {render3DLog("chute-p3", cx + 0.8, cyStart, 0, cx + 0.8, cyStart, hPx + 0.4, 16, "#3E2723", wPx, lPx, hPx)}
              {render3DLog("chute-p4", cx + 0.8, cyEnd, 0, cx + 0.8, cyEnd, hPx + 0.4, 16, "#3E2723", wPx, lPx, hPx)}
              
              {/* Solid wood wall panels */}
              {render3DLog("chute-w1-t", cx, cyStart, hPx * 0.8, cx, cyEnd, hPx * 0.8, 8, "#5D4037", wPx, lPx, hPx)}
              {render3DLog("chute-w1-m", cx, cyStart, hPx * 0.4, cx, cyEnd, hPx * 0.4, 8, "#5D4037", wPx, lPx, hPx)}
              {render3DLog("chute-w2-t", cx + 0.8, cyStart, hPx * 0.8, cx + 0.8, cyEnd, hPx * 0.8, 8, "#5D4037", wPx, lPx, hPx)}
              {render3DLog("chute-w2-m", cx + 0.8, cyStart, hPx * 0.4, cx + 0.8, cyEnd, hPx * 0.4, 8, "#5D4037", wPx, lPx, hPx)}
            </g>
          )
        });
      }

      // 4. ACCESSORY: EMBARCADOR LATERAL (RAMPA DE EMBARQUE)
      if (cHasEmbarcador) {
        // A sloped wooden wall/slab rising from 0 to Z = hPx (2.0m) at the very front
        const rx = wPx + 1.0;
        const ryStart = 6.0;
        const ryEnd = 9.0;

        const pRampA = project(rx, ryStart, 0, wPx, lPx, hPx);
        const pRampB = project(rx + 0.8, ryStart, 0, wPx, lPx, hPx);
        const pRampC = project(rx + 0.8, ryEnd, hPx, wPx, lPx, hPx);
        const pRampD = project(rx, ryEnd, hPx, wPx, lPx, hPx);

        const depthRamp = (pRampA.z + pRampB.z + pRampC.z + pRampD.z) / 4;
        
        renderElements.push({
          depth: depthRamp - 6,
          element: (
            <g key="ramp-structure">
              {/* Concrete sloped slab */}
              <polygon
                points={`${pRampA.x},${pRampA.y} ${pRampB.x},${pRampB.y} ${pRampC.x},${pRampC.y} ${pRampD.x},${pRampD.y}`}
                fill="#B0BEC5"
                stroke="#78909C"
                strokeWidth="1.5"
              />
              
              {/* Sloped Side rails */}
              {render3DLog("ramp-pilar-end1", rx, ryEnd, 0, rx, ryEnd, hPx + 0.4, 14, "#3E2723", wPx, lPx, hPx)}
              {render3DLog("ramp-pilar-end2", rx + 0.8, ryEnd, 0, rx + 0.8, ryEnd, hPx + 0.4, 14, "#3E2723", wPx, lPx, hPx)}

              {/* Side boards climbing up */}
              {render3DLog("ramp-boardL-1", rx, ryStart, hPx * 0.4, rx, ryEnd, hPx * 0.9, 6, "#5D4037", wPx, lPx, hPx)}
              {render3DLog("ramp-boardR-1", rx + 0.8, ryStart, hPx * 0.4, rx + 0.8, ryEnd, hPx * 0.9, 6, "#5D4037", wPx, lPx, hPx)}
            </g>
          )
        });
      }
    }

    // Sort element stack based on projected Z depth (depth sorting)
    renderElements.sort((a, b) => b.depth - a.depth);

    return renderElements.map(e => e.element);
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
                <Tractor className="h-5 w-5 text-[#F4B400]" />
                <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">
                  CALCULADORA AGRO 3D
                </h1>
              </div>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">SÓ MADEIRAS PREMIUM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider">
              Simulador Técnico Rural
            </span>
            <span className="text-[11px] text-stone-300 font-mono">v1.2</span>
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
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CONFIGURATOR INPUT PANEL */}
        <section className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-6 flex flex-col justify-between self-start">
          
          {/* TAB SELECTOR WOODEN BAR */}
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest text-[#5D4037] dark:text-[#F4B400] uppercase block">
              1. Selecionar Projeto Rural
            </label>
            <div className="grid grid-cols-2 bg-slate-100 dark:bg-neutral-850 p-1 rounded-xl">
              <button
                onClick={() => { setActiveTab("galpao"); resetCamera(); }}
                className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === "galpao" 
                    ? "bg-[#3E2723] text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                🌾 Galpões
              </button>
              <button
                onClick={() => { setActiveTab("curral"); resetCamera(); }}
                className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition ${
                  activeTab === "curral" 
                    ? "bg-[#3E2723] text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                🐂 Currais
              </button>
            </div>
          </div>

          {/* DYNAMIC FORM CONFIGURATORS */}
          <div className="flex-1 space-y-5 pt-3 overflow-y-auto">
            {activeTab === "galpao" ? (
              /* GALPÃO RUSTICO FORM */
              <div className="space-y-4">
                <div className="border-b border-slate-150 dark:border-neutral-800 pb-2">
                  <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white">
                    🌾 Configurar Galpão Rústico
                  </h3>
                  <p className="text-[10px] text-slate-450 mt-0.5">Estime mourões de eucalipto e telhado</p>
                </div>

                {/* Width slide */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Largura (Vão Livre):</span>
                    <span className="text-[#3E2723] dark:text-[#F4B400] font-black">{gWidth}m</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    step="1"
                    value={gWidth}
                    onChange={(e) => { setGWidth(parseInt(e.target.value)); addSystemNotification(`Largura ajustada para ${e.target.value}m`); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#3E2723]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>4m (mín)</span>
                    <span>Vão Técnico Seguro</span>
                    <span>12m (máx)</span>
                  </div>
                </div>

                {/* Length slide */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Comprimento Total:</span>
                    <span className="text-[#3E2723] dark:text-[#F4B400] font-black">{gLength}m</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="24"
                    step="3" // Spaced in standard 3m spans
                    value={gLength}
                    onChange={(e) => { setGLength(parseInt(e.target.value)); addSystemNotification(`Comprimento ajustado para ${e.target.value}m`); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#3E2723]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>6m (mín)</span>
                    <span>Vãos a cada 3.0m</span>
                    <span>24m (máx)</span>
                  </div>
                </div>

                {/* Pé direito height slide */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Pé Direito (Altura Útil):</span>
                    <span className="text-[#3E2723] dark:text-[#F4B400] font-black">{gHeight.toFixed(1)}m</span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="5.0"
                    step="0.5"
                    value={gHeight}
                    onChange={(e) => { setGHeight(parseFloat(e.target.value)); addSystemNotification(`Pé direito ajustado para ${e.target.value}m`); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-[#3E2723]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>3.0m</span>
                    <span>Altura das Tesouras</span>
                    <span>5.0m</span>
                  </div>
                </div>

                {/* Pillar Thickness select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Bitola Recomendada dos Pilares:</label>
                  <select
                    value={gPillarBitola}
                    onChange={(e: any) => { setGPillarBitola(e.target.value); addSystemNotification(`Bitola dos pilares alterada!`); }}
                    className="w-full bg-slate-50 dark:bg-neutral-850 text-slate-800 dark:text-white border border-slate-200 dark:border-neutral-850 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#F4B400] cursor-pointer"
                  >
                    <option value="14-16">Ø 14 a 16cm (Estruturas Médias)</option>
                    <option value="16-18">Ø 16 a 18cm (Reforçado - Padrão)</option>
                    <option value="18-20">Ø 18 a 20cm (Pesado - Pé direito alto)</option>
                  </select>
                </div>

                {/* Tile Type select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Tipo de Cobertura (Telhas):</label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => { setGTileType("fibrocimento_244_050"); addSystemNotification("Cobertura: Fibrocimento 2,44x0,50m!"); }}
                      className={`p-2.5 w-full rounded-xl text-left pl-4 text-xs font-bold border transition flex items-center gap-2 ${
                        gTileType === "fibrocimento_244_050"
                          ? "bg-brown-medium text-white border-none shadow-md"
                          : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      🪵 FIBROCIMENTO 2,44 x 0,50m
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGTileType("fibrocimento_244_110"); addSystemNotification("Cobertura: Fibrocimento 2,44x1,10m!"); }}
                      className={`p-2.5 w-full rounded-xl text-left pl-4 text-xs font-bold border transition flex items-center gap-2 ${
                        gTileType === "fibrocimento_244_110"
                          ? "bg-brown-medium text-white border-none shadow-md"
                          : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      🪵 FIBROCIMENTO 2,44 x 1,10m
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGTileType("galvanizada_6_104"); addSystemNotification("Cobertura: Galvanizada 6,00x1,04m!"); }}
                      className={`p-2.5 w-full rounded-xl text-left pl-4 text-xs font-bold border transition flex items-center gap-2 ${
                        gTileType === "galvanizada_6_104"
                          ? "bg-[#78909C] text-white border-none shadow-md"
                          : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      💿 GALVANIZADA 6MT x 1,04m
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* CURRAL DE MANEJO CONFIGURATOR FORM */
              <div className="space-y-4">
                <div className="border-b border-slate-150 dark:border-neutral-800 pb-2">
                  <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white">
                    🐂 Configurar Curral de Manejo
                  </h3>
                  <p className="text-[10px] text-slate-450 mt-0.5">Estime estacas roliças e tábuas perimetrais</p>
                </div>

                {/* Cattle Capacity */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Capacidade Recomendada (Cabeças):</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[25, 50, 100, 150].map((cap) => (
                      <button
                        key={cap}
                        type="button"
                        onClick={() => { setCCapacity(cap); addSystemNotification(`Capacidade para ${cap} cabeças!`); }}
                        className={`p-2.5 rounded-xl text-center text-xs font-black transition ${
                          cCapacity === cap
                            ? "bg-[#3E2723] text-white shadow-md"
                            : "bg-slate-100 dark:bg-neutral-850 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-650 dark:text-stone-300"
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-400 block text-right mt-0.5">
                    Proporção ideal: {(cCapacity * 2.7).toFixed(0)}m² de área interna
                  </span>
                </div>

                {/* Internal dividers */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Divisórias Internas (Piquetes):</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[2, 3, 4].map((divs) => (
                      <button
                        key={divs}
                        type="button"
                        onClick={() => { setCDivisions(divs); addSystemNotification(`Dividido em ${divs} piquetes!`); }}
                        className={`p-2 rounded-xl text-center text-xs font-black transition ${
                          cDivisions === divs
                            ? "bg-[#3E2723] text-white shadow-md"
                            : "bg-slate-100 dark:bg-neutral-850 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-650 dark:text-stone-300"
                        }`}
                      >
                        {divs} Piquetes
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rail rows qty */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Altura das Cercas (Fileiras de Réguas):</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[5, 6].map((rows) => (
                      <button
                        key={rows}
                        type="button"
                        onClick={() => { setCRailsQty(rows); addSystemNotification(`Cercamento com ${rows} fileiras!`); }}
                        className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                          cRailsQty === rows
                            ? "bg-[#3E2723] text-white border-none shadow-md"
                            : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500"
                        }`}
                      >
                        📐 {rows} Réguas (Altura)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rail material types */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block">Material do Fechamento Horizontal:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setCRailType("rolico"); addSystemNotification("Cercas: Eucalipto Roliço!"); }}
                      className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                        cRailType === "rolico"
                          ? "bg-[#8D6E63] text-white border-none shadow-md"
                          : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500"
                      }`}
                    >
                      🪵 Eucalipto Roliço
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCRailType("tabua"); addSystemNotification("Cercas: Tábuas Serradas!"); }}
                      className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                        cRailType === "tabua"
                          ? "bg-[#3E2723] text-white border-none shadow-md"
                          : "bg-slate-50 dark:bg-neutral-850 border-slate-200 dark:border-neutral-800 text-slate-500"
                      }`}
                    >
                      🪵 Tábuas Serradas
                    </button>
                  </div>
                </div>

                {/* Accessories checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-black text-[#5D4037] dark:text-[#F4B400] tracking-widest uppercase block mb-1">
                    Acessórios e Troncos
                  </label>
                  
                  {/* Chute */}
                  <label className="flex items-center gap-2.5 bg-slate-50 dark:bg-neutral-850 p-2.5 rounded-xl border border-slate-100 dark:border-neutral-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={cHasTronco}
                      onChange={(e) => { setCHasTronco(e.target.checked); addSystemNotification(e.target.checked ? "Adicionado Chute de Manejo!" : "Removido Chute de Manejo!"); }}
                      className="accent-[#3E2723] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold block">Com Tronco de Contenção (Chute)</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Corredor roliço duplo c/ porteiras guias</span>
                    </div>
                  </label>

                  {/* Embarcador */}
                  <label className="flex items-center gap-2.5 bg-slate-50 dark:bg-neutral-850 p-2.5 rounded-xl border border-slate-100 dark:border-neutral-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={cHasEmbarcador}
                      onChange={(e) => { setCHasEmbarcador(e.target.checked); addSystemNotification(e.target.checked ? "Adicionado Embarcador c/ rampa!" : "Removido Embarcador!"); }}
                      className="accent-[#3E2723] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold block">Com Embarcador Lateral (Rampa)</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Rampa elevada c/ guias de proteção p/ embarque de gado</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* SIMULATION CALL BUTTON */}
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="w-full mt-6 bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs py-3.5 rounded-xl shadow-xl shadow-[#F4B400]/15 transition duration-300 flex items-center justify-center gap-2 uppercase tracking-wider border-none active:scale-97 cursor-pointer"
          >
            <Phone className="h-4 w-4" /> Solicitar Orçamento no WhatsApp
          </button>
        </section>

        {/* MIDDLE/RIGHT COLUMN: INTERACTIVE SVG 3D VIEWPORT */}
        <section className="lg:col-span-8 space-y-6 flex flex-col">
          
          {/* VIEWPORT BOX */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-4 shadow-sm relative flex flex-col justify-between flex-1 min-h-[460px] overflow-hidden group">
            
            {/* Viewport indicators overlays */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 pointer-events-none">
              <span className="bg-slate-100/90 dark:bg-neutral-850/90 text-slate-650 dark:text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-200/50 dark:border-neutral-700/50 shadow-2xs backdrop-blur-xs flex items-center gap-1.5">
                <Compass className="h-3 w-3 animate-spin" /> Yaw: {rotationZ}° | Pitch: {rotationX}°
              </span>
              <span className="bg-slate-100/90 dark:bg-neutral-850/90 text-slate-650 dark:text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-200/50 dark:border-neutral-700/50 shadow-2xs backdrop-blur-xs">
                Escala: 3D SVG Vector Engine
              </span>
            </div>

            {/* Instruction drag label overlay */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-slate-900/40 text-white font-semibold text-[9px] px-2 py-1 rounded-md tracking-wider uppercase backdrop-blur-xs animate-pulse">
              🖱️ Arraste na estrutura para girar em 3D
            </div>

            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={resetCamera}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-neutral-850 dark:hover:bg-neutral-800 text-slate-650 dark:text-stone-300 font-bold text-[9px] px-2.5 py-1 rounded-md border border-slate-200 dark:border-neutral-700 shadow-2xs transition active:scale-95 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                title="Redefinir visualização da câmera para padrão"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* SVG 3D CANVAS */}
            <div className="w-full flex-1 flex items-center justify-center relative cursor-grab active:cursor-grabbing select-none">
              {mounted ? (
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                  preserveAspectRatio="xMidYMid meet"
                  className="max-h-[420px]"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  {/* Volumetric sky glow background radial effect */}
                  <defs>
                    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#FFF8E1" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.0" />
                    </radialGradient>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#bgGlow)" pointerEvents="none" />

                  {/* Render elements sorted by depth */}
                  {render3DScene()}
                </svg>
              ) : (
                <div className="text-slate-400 font-medium text-xs flex items-center gap-2 animate-pulse">
                  <RefreshCw className="h-4 w-4 animate-spin" /> Carregando renderizador 3D...
                </div>
              )}
            </div>

            {/* QUICK TECHNICAL INFO IN VIEWPORT */}
            <div className="border-t border-slate-100 dark:border-neutral-800/80 pt-3 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div>
                <span className="font-bold text-[#5D4037] dark:text-[#F4B400] tracking-wider uppercase block text-[9px]">
                  Bitolas Normativas de Projeto
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {activeTab === "galpao" 
                    ? `Pilares roliços Ø ${gPillarBitola}cm | Cobertura estrutural c/ travamentos normatizados.` 
                    : `Estacas Mourões Ø 14-16cm espaçadas a cada 2.0m | Réguas Ø 08-10cm.`
                  }
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-slate-100 dark:bg-neutral-850 text-slate-650 dark:text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold shadow-2xs">
                  ABNT NBR 7190
                </span>
                <span className="bg-slate-100 dark:bg-neutral-850 text-slate-650 dark:text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded font-bold shadow-2xs">
                  Eucalipto Tratado
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC CALCULATED MATERIALS LIST PANEL */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                  📋 Lista Estimativa de Materiais
                </h3>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">Vão Livre & Dimensionamento Técnico</p>
              </div>
              
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 font-mono font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">
                📐 Projeto Otimizado
              </span>
            </div>

            {/* MATERIALS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-neutral-800 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                    <th className="py-2">Item Estrutural</th>
                    <th className="py-2">Especificação Recomendada</th>
                    <th className="py-2 text-right">Quant.</th>
                    <th className="py-2 text-center">Unid.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-neutral-850">
                  {activeTab === "galpao" ? (
                    galpaoMaterialsList.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                        <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">{m.name}</td>
                        <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">{m.spec}</td>
                        <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{m.qty}</td>
                        <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">{m.unit}</td>
                      </tr>
                    ))
                  ) : (
                    curralMaterialsList.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-neutral-850/10 transition">
                        <td className="py-2.5 font-bold text-slate-700 dark:text-slate-200">{m.name}</td>
                        <td className="py-2.5 font-mono text-[10px] text-slate-500 dark:text-stone-400">{m.spec}</td>
                        <td className="py-2.5 text-right font-black text-slate-800 dark:text-[#F4B400] text-sm">{m.qty}</td>
                        <td className="py-2.5 text-center text-slate-450 font-bold text-[10px]">{m.unit}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* CALL FOR PRICE TRIGGER INFO */}
            <div className="bg-[#5D4037]/10 border border-[#5D4037]/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
              <div className="space-y-0.5">
                <span className="font-black text-sm text-[#3E2723] dark:text-[#F4B400] block">Orçamento Rápido de Preço & Frete</span>
                <span className="text-[10px] text-slate-500 block leading-relaxed max-w-lg">
                  Nossos preços de eucalipto tratado são sob consulta de frete regional. Preencha os dados e receba a proposta comercial formatada com entrega ágil na sua localidade.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full sm:w-auto shrink-0 bg-[#3E2723] hover:bg-[#2A1B19] text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition cursor-pointer uppercase tracking-wider"
              >
                ⚙️ Obter Preço
              </button>
            </div>
          </div>
        </section>
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
                <Tractor className="h-5 w-5 text-[#F4B400]" />
                <h3 className="font-display font-black text-base uppercase text-[#3E2723] dark:text-white">
                  Dados p/ Preço & Entrega
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                Gere seu PDF comercial via WhatsApp
              </p>
            </div>

            <form onSubmit={handleSendWhatsAppQuote} className="space-y-3.5 pt-2 text-xs">
              {/* Product summary card in modal */}
              <div className="bg-slate-50 dark:bg-neutral-850 p-3 rounded-xl border border-slate-100 dark:border-neutral-800">
                <span className="font-black text-slate-700 dark:text-slate-200 block text-[11px] uppercase tracking-wide">
                  📋 Resumo do Projeto:
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                  {activeTab === "galpao" 
                    ? `Galpão Rústico Eucalipto ${gWidth}x${gLength}m (Pé direito ${gHeight}m, telha: ${gTileType === "fibrocimento_244_050" ? "fibrocimento 2,44x0,50" : gTileType === "fibrocimento_244_110" ? "fibrocimento 2,44x1,10" : "galvanizada 6mt x 1,04"}).`
                    : `Curral de Manejo ${cCapacity} Cabeças (${cDivisions} Divisões, réguas: ${cRailType === "rolico" ? "roliças" : "serradas"}).`
                  }
                </span>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Nome do Produtor / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: José da Silva (Fazenda Ouro Verde)"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold"
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
                  className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold"
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
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-900 dark:text-slate-100 font-medium uppercase text-[9px] tracking-wider block">Estado</label>
                  <select
                    value={leadState}
                    onChange={(e) => setLeadState(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold cursor-pointer"
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
                <Phone className="h-4 w-4" /> Enviar e Gerar Preços
              </button>
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
              <Tractor className="h-5 w-5 text-[#F4B400]" />
              <span className="font-display font-black text-sm tracking-wider uppercase text-white">SÓ MADEIRAS</span>
            </div>
            <p className="font-light leading-relaxed max-w-sm text-stone-400">
              Madeiras tratadas sob vácuo-pressão (autoclave) com garantia de 15 anos contra apodrecimento, cupins e fungos apodrecedores. O melhor material para o seu empreendimento agropecuário.
            </p>
          </div>

          <div className="space-y-3 text-left md:text-right">
            <span className="font-bold text-white uppercase block text-[10px] tracking-widest text-[#F4B400]">
              Calculadoras Técnicas Premium
            </span>
            <div className="flex flex-wrap md:justify-end gap-3 text-[11px] font-bold">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span className="text-[#F4B400]">|</span>
              <Link href="/pergolados" className="hover:text-white transition">Calculadora de Pergolados 3D</Link>
              <span className="text-[#F4B400]">|</span>
              <span className="text-white">Calculadora Agro 3D</span>
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
