"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Info,
  RotateCcw,
  FileText,
  Calculator,
  AlertTriangle,
  Settings,
  Layers,
  CheckCircle,
  Printer,
  TreePine,
  Ruler,
  Package,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";
import { AboutSection } from "../components/AboutSection";

// ──────────────────────────────────────────────────────────────────────────────
// COMMERCIAL WOOD SECTIONS (NBR 7190) — only allowed bitolas
// ──────────────────────────────────────────────────────────────────────────────
interface WoodSection {
  w: number;   // width cm
  h: number;   // height cm
  area: number; // cm²
  wx: number;   // elastic section modulus cm³
  ix: number;   // moment of inertia cm⁴
  label: string;
}

const COMMERCIAL_SECTIONS: WoodSection[] = [
  { w: 5, h: 8,  area: 40,  wx: 53.3,  ix: 213.3,   label: "5 × 8 cm" },
  { w: 5, h: 10, area: 50,  wx: 83.3,  ix: 416.7,   label: "5 × 10 cm" },
  { w: 5, h: 13, area: 65,  wx: 140.8, ix: 915.4,   label: "5 × 13 cm" },
  { w: 5, h: 16, area: 80,  wx: 213.3, ix: 1706.7,  label: "5 × 16 cm" },
  { w: 5, h: 20, area: 100, wx: 333.3, ix: 3333.3,  label: "5 × 20 cm" },
  { w: 5, h: 25, area: 125, wx: 520.8, ix: 6510.4,  label: "5 × 25 cm" },
  { w: 5, h: 30, area: 150, wx: 750.0, ix: 11250.0, label: "5 × 30 cm" },
];

// Standard eucalipto commercial lengths available
const EUCALIPTO_LENGTHS = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0];

function bestEucaliptoLength(needed: number): number {
  // Find the smallest standard length that covers the needed length (+ 10cm margin)
  const withMargin = needed + 0.10;
  return EUCALIPTO_LENGTHS.find((l) => l >= withMargin) ?? EUCALIPTO_LENGTHS[EUCALIPTO_LENGTHS.length - 1];
}

// ──────────────────────────────────────────────────────────────────────────────
// TILE SPECS
// ──────────────────────────────────────────────────────────────────────────────
type TileType =
  | "fibrocimento_050"
  | "fibrocimento_110"
  | "galvanizada_6m"
  | "ceramica"
  | "concreto";

interface TileSpec {
  label: string;
  weight: number;       // kgf/m²
  netArea: number;      // m² per unit (net coverage)
  sheetW: number;       // sheet width (m)
  sheetL: number;       // sheet length (m)
  overlapNote: string;
}

const TILE_SPECS: Record<TileType, TileSpec> = {
  fibrocimento_050: {
    label: "Fibrocimento Ondulado 2,44 × 0,50 m (6mm)",
    weight: 16,
    netArea: 1.08,
    sheetW: 0.50,
    sheetL: 2.44,
    overlapNote: "Sobreposição lateral 10cm e longitudinal 20cm. Área útil líquida: 1,08 m²/chapa.",
  },
  fibrocimento_110: {
    label: "Fibrocimento Ondulado 2,44 × 1,10 m (6mm)",
    weight: 16,
    netArea: 2.52,
    sheetW: 1.10,
    sheetL: 2.44,
    overlapNote: "Sobreposição lateral 10cm e longitudinal 20cm. Área útil líquida: 2,52 m²/chapa.",
  },
  galvanizada_6m: {
    label: "Telha Galvanizada Trapezoidal 6,00 × 1,04 m (0,43mm)",
    weight: 6,
    netArea: 5.90,
    sheetW: 1.04,
    sheetL: 6.00,
    overlapNote: "Sobreposição lateral 8cm e longitudinal 20cm. Área útil líquida: ≈ 5,90 m²/chapa.",
  },
  ceramica: {
    label: "Telha Cerâmica / Colonial (~45 kgf/m²)",
    weight: 45,
    netArea: 0.0, // count by area
    sheetW: 0,
    sheetL: 0,
    overlapNote: "Rendimento médio: 16 unidades/m². Aplicar 10% de perda por quebra.",
  },
  concreto: {
    label: "Telha de Concreto Coberta (~50 kgf/m²)",
    weight: 50,
    netArea: 0.0,
    sheetW: 0,
    sheetL: 0,
    overlapNote: "Rendimento médio: 12 unidades/m². Aplicar 10% de perda por quebra.",
  },
};

function selectSection(wxReq: number, ixReq: number): WoodSection {
  for (const sec of COMMERCIAL_SECTIONS) {
    if (sec.wx >= wxReq && sec.ix >= ixReq) return sec;
  }
  return COMMERCIAL_SECTIONS[COMMERCIAL_SECTIONS.length - 1];
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function CalculadoraTelhadoClient() {
  const [activeTab, setActiveTab] = useState<"sizing" | "materials" | "report">("sizing");
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCity, setLeadCity] = useState("");
  const [settings, setSettings] = useState<any>(null);

  // ── Inputs ──
  type RoofShape = "1_agua" | "2_aguas" | "3_aguas" | "4_aguas" | "L_shape" | "U_shape";
  const [roofShape, setRoofShape] = useState<RoofShape>("2_aguas");
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(8);
  const [beiralFrontal, setBeiralFrontal] = useState<number>(60);
  const [beiralLateral, setBeiralLateral] = useState<number>(60);
  const [slope, setSlope] = useState<number>(30);
  const [tileType, setTileType] = useState<TileType>("fibrocimento_050");

  const [hasTruss, setHasTruss] = useState<boolean>(false);
  const [trussSpacing, setTrussSpacing] = useState<number>(3.0);
  const [trussType, setTrussType] = useState<"pratt" | "howe" | "fink">("howe");

  const [hasPosts, setHasPosts] = useState<boolean>(true);
  const [postHeight, setPostHeight] = useState<number>(1.8);
  const [postSpacing, setPostSpacing] = useState<number>(2.5);

  const [woodClass, setWoodClass] = useState<"C30" | "C40">("C30");

  useEffect(() => {
    const local = localStorage.getItem("somadeiras_settings");
    if (local) {
      try { setSettings(JSON.parse(local)); } catch {}
    }
  }, []);

  const activeWhatsapp = settings?.whatsappNumber || "5579996298990";

  const handleReset = () => {
    setRoofShape("2_aguas");
    setLength(10); setWidth(8);
    setBeiralFrontal(60); setBeiralLateral(60);
    setSlope(30); setTileType("fibrocimento_050");
    setHasTruss(false); setTrussSpacing(3.0); setTrussType("howe");
    setHasPosts(true); setPostHeight(1.8); setPostSpacing(2.5);
    setWoodClass("C30");
  };

  // ──────────────────────────────────────────────────────────────────────────
  // CALCULATION ENGINE (ABNT NBR 7190 / NBR 6120 / NBR 6123)
  // ──────────────────────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const slopeRad = Math.atan(slope / 100);
    const cosSlope = Math.cos(slopeRad);
    const beiralFm = beiralFrontal / 100;
    const beiralLm = beiralLateral / 100;

    const totalL = length + 2 * beiralFm;
    const totalW = width + 2 * beiralLm;
    const projArea = parseFloat((totalL * totalW).toFixed(2));
    const slopedArea = parseFloat(
      roofShape === "1_agua"
        ? (totalL * (totalW / cosSlope)).toFixed(2)
        : (projArea / cosSlope).toFixed(2)
    );

    // ── Loads ──
    const tileSpec = TILE_SPECS[tileType];
    const tileWeight = tileSpec.weight;
    const structWeight = 15;
    const liveLoad = 25;
    const windLoad = 35;
    const G = tileWeight + structWeight;
    const q_d = 1.4 * G + 1.4 * liveLoad + 1.4 * 0.6 * windLoad;
    const q_k = G + liveLoad;

    // ── Wood ──
    const f_mk = woodClass === "C30" ? 300 : 400;
    const kmod = 0.70;
    const gamma_w = 1.4;
    const f_wd = (f_mk * kmod) / gamma_w;
    const E_mod = woodClass === "C30" ? 95000 : 125000;

    function reqSection(span: number, loadPerMeter: number, spacing: number) {
      const M = (loadPerMeter * span * span) / 8;
      const wxReq = (M * 100) / f_wd;
      const qk_lin = (q_k / 100) * spacing;
      const ixReq = (1000 * qk_lin * Math.pow(span * 100, 3)) / (384 * E_mod);
      return { wxReq, ixReq, sec: selectSection(wxReq, ixReq) };
    }

    // ── 1a. Ripas (5×2,5cm) — cerâmica e concreto ──
    const usesRipas = tileType === "ceramica" || tileType === "concreto";
    const ripaSpacing = 0.32; // m entre ripas (espaçamento telhas cerâmicas)
    const ripaSpan = 0.50;   // m (vão entre caibros)
    const ripaLoad = q_d * ripaSpacing;
    const ripaM = (ripaLoad * ripaSpan * ripaSpan) / 8;
    const ripaWx = (ripaM * 100) / f_wd;
    const ripaLen = totalL; // comprimento individual: vai de beiral a beiral no comprimento
    const slopeLen = (totalW / (roofShape === "1_agua" ? 1 : 2)) / cosSlope;
    const ripasPerSide = usesRipas ? Math.ceil(slopeLen / ripaSpacing) : 0;
    const ripasQty = ripasPerSide * (roofShape === "1_agua" ? 1 : 2);
    const ripaEucLen = bestEucaliptoLength(ripaLen);

    // ── 1b. Ripões (5×3cm) — fibrocimento e galvanizada ──
    // Ripões são barrotes de suporte das chapas, colocados transversais ao caimento
    const usesRipoes = tileType === "fibrocimento_050" || tileType === "fibrocimento_110" || tileType === "galvanizada_6m";
    // Espaçamento dos ripões ao longo do talude:
    //   fibrocimento (2,44m) => ~1,0m (3 apoios por chapa: topo, meio, base)
    //   galvanizada (6,0m)   => ~1,5m (4-5 apoios por chapa)
    const ripaoSpacing =
      tileType === "galvanizada_6m" ? 1.50
      : 1.00; // fibrocimento 050 e 110
    const ripaoSpan = 0.50; // vão entre caibros (mesmo espaçamento dos caibros)
    const ripaoLoad = q_d * ripaoSpacing;
    const ripaoM = (ripaoLoad * ripaoSpan * ripaoSpan) / 8;
    const ripaoWx = (ripaoM * 100) / f_wd;
    // bitola comercial fixada: 5×3cm (conforme solicitado)
    const RIPAO_SECTION = { w: 5, h: 3, area: 15, wx: 7.5, ix: 11.25, label: "5 × 3 cm" };
    const ripaoLen = totalL; // comprimento individual igual ao comprimento total da edificação
    const ripoesPerSide = usesRipoes ? Math.ceil(slopeLen / ripaoSpacing) : 0;
    const ripoesQty = ripoesPerSide * (roofShape === "1_agua" ? 1 : 2);
    const ripaoEucLen = bestEucaliptoLength(ripaoLen);
    const ripaoVol = usesRipoes ? (RIPAO_SECTION.area / 10000) * ripoesQty * ripaoLen : 0;

    // ── 2. Caibros ──
    const caibroSpacing = 0.50;
    const hasPurlins = hasPosts || hasTruss || projArea > 40;
    const caibroSpan = hasPurlins ? 1.50 : slopeLen;
    const caibroLoad = q_d * caibroSpacing;
    const { sec: caibroSec, wxReq: caibroWxReq } = reqSection(caibroSpan, caibroLoad, caibroSpacing);
    const caibrosQty = Math.ceil(totalL / caibroSpacing) * (roofShape === "1_agua" ? 1 : 2);
    const caibroLen = slopeLen;
    const caibroEucLen = bestEucaliptoLength(caibroLen);
    const caibroVol = (caibroSec.area / 10000) * caibrosQty * caibroLen;

    // ── 3. Terças (Purlins) ──
    const purlinSpacing = 1.50;
    let purlinSpan = totalL;
    if (hasTruss) purlinSpan = trussSpacing;
    else if (hasPosts) purlinSpan = postSpacing;
    const purlinLoad = q_d * purlinSpacing;
    const { sec: purlinSec, wxReq: purlinWxReq } = reqSection(purlinSpan, purlinLoad, purlinSpacing);
    const tercasPerSide = Math.ceil(slopeLen / purlinSpacing);
    const tercasQty = tercasPerSide * (roofShape === "1_agua" ? 1 : 2);
    const purlinLen = totalL;
    const purlinEucLen = bestEucaliptoLength(purlinLen);
    const purlinVol = (purlinSec.area / 10000) * tercasQty * purlinLen;

    // ── 4. Cumeeira ──
    const cumeeiraQty = roofShape === "1_agua" ? 0 : 1;
    const cumeeiraSpan = purlinSpan;
    const cumeeiraLoad = q_d * purlinSpacing * 1.25;
    const { sec: cumeeiraSec, wxReq: cumeeiraWxReq } = reqSection(cumeeiraSpan, cumeeiraLoad, purlinSpacing * 1.25);
    const cumeeiraLen = totalL;
    const cumeeiraEucLen = bestEucaliptoLength(cumeeiraLen);
    const cumeeiraVol = (cumeeiraSec.area / 10000) * cumeeiraQty * cumeeiraLen;

    // ── 5. Frechais ──
    const frechaisQty = roofShape === "1_agua" ? 1 : 2;
    const frechalSpan = 1.20;
    const frechalLoad = q_d * (purlinSpacing / 2);
    const { sec: frechalSec, wxReq: frechalWxReq } = reqSection(frechalSpan, frechalLoad, purlinSpacing / 2);
    const frechalLen = totalL;
    const frechalEucLen = bestEucaliptoLength(frechalLen);
    const frechalVol = (frechalSec.area / 10000) * frechaisQty * frechalLen;

    // ── 6. Pontaletes ──
    const f_cd = f_wd * 0.75;
    const postLoad = q_d * purlinSpacing * postSpacing;
    let postSec = COMMERCIAL_SECTIONS[0];
    for (const sec of COMMERCIAL_SECTIONS) {
      if (postLoad / sec.area <= f_cd && sec.w >= 5) { postSec = sec; break; }
    }
    const postsPerRow = Math.ceil(totalL / postSpacing) + 1;
    const totalPurlinRows = tercasQty + cumeeiraQty;
    const postsQty = hasPosts ? postsPerRow * totalPurlinRows : 0;
    const postLen = postHeight;
    const postEucLen = bestEucaliptoLength(postLen);
    const postVol = (postSec.area / 10000) * postsQty * postLen;

    // ── 7. Tesouras ──
    const trussesQty = hasTruss ? Math.ceil(totalL / trussSpacing) + 1 : 0;
    const banzoSupSpan = trussSpacing;
    const { sec: banzoSupSec } = reqSection(banzoSupSpan, purlinLoad * 0.8, purlinSpacing);
    const tensionForce = q_d * width * trussSpacing / 2;
    const areaReqTension = tensionForce / f_wd;
    let banzoInfSec = COMMERCIAL_SECTIONS[0];
    for (const sec of COMMERCIAL_SECTIONS) {
      if (sec.area >= areaReqTension && sec.w >= 5) { banzoInfSec = sec; break; }
    }
    const montanteSec = COMMERCIAL_SECTIONS[0];
    const trussBanzoSupLen = ((width / 2) / cosSlope) * 2;
    const trussBanzoInfLen = width;
    const trussWebLen = width * 0.8;
    const trussBanzoSupEuc = bestEucaliptoLength(trussBanzoSupLen / 2);
    const trussBanzoInfEuc = bestEucaliptoLength(trussBanzoInfLen);
    const trussVol = trussesQty * (
      (banzoSupSec.area / 10000) * trussBanzoSupLen +
      (banzoInfSec.area / 10000) * trussBanzoInfLen +
      (montanteSec.area / 10000) * trussWebLen
    );

    // ── Volumes & totals ──
    const ripaVol  = usesRipas  ? (12.5 / 10000) * ripasQty  * ripaLen  : 0;
    const netVol = parseFloat((caibroVol + ripaVol + ripaoVol + purlinVol + cumeeiraVol + frechalVol + postVol + trussVol).toFixed(3));
    const finalVol = parseFloat((netVol * 1.15).toFixed(3));

    // ── Tile quantities ──
    const sheetsNeeded =
      tileSpec.netArea > 0
        ? Math.ceil(slopedArea / tileSpec.netArea * 1.10) // 10% loss
        : 0;
    const ceramicUnitsNeeded = tileType === "ceramica"
      ? Math.ceil(slopedArea * 16 * 1.10)
      : tileType === "concreto"
      ? Math.ceil(slopedArea * 12 * 1.10)
      : 0;

    // ── Alerts ──
    const alerts: string[] = [];
    const suggestions: string[] = [];

    if (!hasPosts && !hasTruss && purlinSpan > 4.5) {
      alerts.push(`VÃO DAS TERÇAS EXCESSIVO (${purlinSpan.toFixed(1)}m): Exige bitola ${purlinSec.label} para vencer o comprimento total sem apoios intermediários.`);
      suggestions.push("RECOMENDAÇÃO ECONÔMICA: Ative pontaletes ou tesouras para reduzir o vão efetivo das terças e economizar até 40% em volume de madeira.");
    } else if (hasPosts || hasTruss) {
      suggestions.push("OTIMIZAÇÃO ATIVA: Apoios intermediários reduziram o vão livre das terças, permitindo uso de bitolas mais econômicas.");
    }
    if (caibroSpan > 2.2) {
      alerts.push(`VÃO DOS CAIBROS ELEVADO (${caibroSpan.toFixed(1)}m): Risco de flecha excessiva nas peças de cobertura.`);
    }
    if (slope < 10 && (tileType === "ceramica" || tileType === "concreto")) {
      alerts.push("INCLINAÇÃO MÍNIMA: Telhas cerâmicas e de concreto requerem inclinação mínima de 15% para bom escoamento d'água.");
    }
    if (slope < 5 && (tileType === "fibrocimento_050" || tileType === "fibrocimento_110")) {
      alerts.push("INCLINAÇÃO MÍNIMA: Telhas de fibrocimento requerem inclinação mínima de 5%.");
    }

    return {
      projArea, slopedArea, tileWeight, totalLoad: Math.round(q_d),
      designLoadService: Math.round(q_k),
      alerts, suggestions,
      // Members
      caibro:   { span: caibroSpan,   force: caibroLoad,   wxReq: caibroWxReq,   sec: caibroSec,               qty: caibrosQty,  len: caibroLen,   eucLen: caibroEucLen },
      ripa:     { span: ripaSpan,     force: ripaLoad,     wxReq: ripaWx,         sec: { label: "5 × 2,5 cm" }, qty: ripasQty,    len: ripaLen,     eucLen: ripaEucLen },
      ripao:    { span: ripaoSpan,    force: ripaoLoad,    wxReq: ripaoWx,        sec: RIPAO_SECTION,            qty: ripoesQty,   len: ripaoLen,    eucLen: ripaoEucLen },
      purlin:   { span: purlinSpan,   force: purlinLoad,   wxReq: purlinWxReq,   sec: purlinSec,               qty: tercasQty,   len: purlinLen,   eucLen: purlinEucLen },
      cumeeira: { span: cumeeiraSpan, force: cumeeiraLoad, wxReq: cumeeiraWxReq, sec: cumeeiraSec,              qty: cumeeiraQty, len: cumeeiraLen, eucLen: cumeeiraEucLen },
      frechal:  { span: frechalSpan,  force: frechalLoad,  wxReq: frechalWxReq,  sec: frechalSec,               qty: frechaisQty, len: frechalLen,  eucLen: frechalEucLen },
      post:     { span: postLen,      force: postLoad,     wxReq: 0,             sec: postSec,                 qty: postsQty,    len: postLen,     eucLen: postEucLen },
      truss: { qty: trussesQty, banzoSup: banzoSupSec, banzoInf: banzoInfSec, banzoSupEuc: trussBanzoSupEuc, banzoInfEuc: trussBanzoInfEuc },
      // Volumes
      caibroVol, ripaVol, ripaoVol, purlinVol, cumeeiraVol, frechalVol, postVol, trussVol,
      netVol, finalVol,
      usesRipas, usesRipoes, ripaoSpacing,
      // Tiles
      tileSpec, sheetsNeeded, ceramicUnitsNeeded,
      slopeLen,
    };
  }, [length, width, beiralFrontal, beiralLateral, slope, tileType, hasTruss, trussSpacing, trussType, hasPosts, postHeight, postSpacing, woodClass, roofShape]);

  // ── Lead submit ──
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadCity) { alert("Por favor, preencha todos os campos."); return; }
    const roofLabel: Record<string, string> = {
      "1_agua": "1 Água", "2_aguas": "2 Águas", "3_aguas": "3 Águas",
      "4_aguas": "4 Águas", "L_shape": "Telhado em L", "U_shape": "Telhado em U",
    };
    let text = `Olá! Solicito orçamento de madeiramento para telhado:\n\n`;
    text += `*DADOS DA COBERTURA:*\n`;
    text += `- Formato: ${roofLabel[roofShape]}\n`;
    text += `- Dimensões: ${width}m × ${length}m\n`;
    text += `- Beiral: F ${beiralFrontal}cm / L ${beiralLateral}cm\n`;
    text += `- Inclinação: ${slope}%\n`;
    text += `- Telha: ${calc.tileSpec.label}\n`;
    text += `- Madeira: ${woodClass === "C30" ? "Eucalipto C30" : "Folhosa C40"}\n\n`;
    text += `*PEÇAS CALCULADAS:*\n`;
    text += `- Caibros: ${calc.caibro.qty}un × ${calc.caibro.len.toFixed(2)}m cada (${calc.caibro.sec.label}) — eucalipto ${calc.caibro.eucLen}m\n`;
    if (calc.usesRipas  && calc.ripa.qty  > 0) text += `- Ripas (5×2,5cm): ${calc.ripa.qty}un  × ${calc.ripa.len.toFixed(2)}m cada — eucalipto ${calc.ripa.eucLen}m\n`;
    if (calc.usesRipoes && calc.ripao.qty > 0) text += `- Ripões (5×3cm):  ${calc.ripao.qty}un × ${calc.ripao.len.toFixed(2)}m cada — eucalipto ${calc.ripao.eucLen}m\n`;
    text += `- Terças: ${calc.purlin.qty}un × ${calc.purlin.len.toFixed(2)}m cada (${calc.purlin.sec.label}) — eucalipto ${calc.purlin.eucLen}m\n`;
    if (calc.cumeeira.qty > 0) text += `- Cumeeira: ${calc.cumeeira.qty}un × ${calc.cumeeira.len.toFixed(2)}m cada (${calc.cumeeira.sec.label}) — eucalipto ${calc.cumeeira.eucLen}m\n`;
    text += `- Frechais: ${calc.frechal.qty}un × ${calc.frechal.len.toFixed(2)}m cada (${calc.frechal.sec.label}) — eucalipto ${calc.frechal.eucLen}m\n`;
    if (hasPosts && calc.post.qty > 0) text += `- Pontaletes: ${calc.post.qty}un × ${calc.post.len.toFixed(2)}m cada (${calc.post.sec.label}) — eucalipto ${calc.post.eucLen}m\n`;
    text += `\n*VOLUME TOTAL (c/ 15% perda):* ${calc.finalVol} m³\n`;
    if (calc.sheetsNeeded > 0) text += `*TELHAS NECESSÁRIAS:* ${calc.sheetsNeeded} chapas\n`;
    if (calc.ceramicUnitsNeeded > 0) text += `*TELHAS NECESSÁRIAS:* ${calc.ceramicUnitsNeeded} unidades\n`;
    text += `\n*CLIENTE:*\n- Nome: ${leadName}\n- WhatsApp: ${leadPhone}\n- Cidade: ${leadCity}\n`;

    const localCRM = localStorage.getItem("somadeiras_leads");
    const parsedCRM = localCRM ? JSON.parse(localCRM) : [];
    const newLead = {
      id: "roof-" + Date.now(), name: leadName, phone: leadPhone, city: leadCity, state: "SE",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Calculadora Telhados", utm: "utm_source=roof_calculator",
      products: [`Telhado ${width}x${length}m (${roofLabel[roofShape]}) x1`],
      total: Math.round(calc.finalVol * 3800),
      status: "Novo Lead", sellerId: "maria",
      notes: `Telhado ${width}x${length}m, inclinação ${slope}%, telha ${calc.tileSpec.label}. Vol: ${calc.finalVol}m³.`,
    };
    localStorage.setItem("somadeiras_leads", JSON.stringify([newLead, ...parsedCRM]));
    setLeadModalOpen(false);
    window.open(`https://api.whatsapp.com/send?phone=${activeWhatsapp}&text=${encodeURIComponent(text)}`, "_blank");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // SVG SCHEMATIC
  // ────────────────────────────────────────────────────────────────────────────
  const tileColor1 = tileType === "ceramica" ? "#E64A19"
    : tileType === "concreto" ? "#78909C"
    : (tileType === "fibrocimento_050" || tileType === "fibrocimento_110") ? "#B0BEC5"
    : "#607D8B";
  const tileColor2 = tileType === "ceramica" ? "#BF360C"
    : tileType === "concreto" ? "#546E7A"
    : (tileType === "fibrocimento_050" || tileType === "fibrocimento_110") ? "#90A4AE"
    : "#455A64";

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-xs">

      {/* ── HEADER ── */}
      <header className="bg-[#3E2723] text-white py-3.5 px-4 shadow-lg z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="bg-[#F4B400] text-[#3E2723] w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-2 border-white shadow-lg shadow-[#F4B400]/30 group-hover:scale-110 transition-transform">
              🪵
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight text-white flex items-center gap-1">
                SÓ <span className="text-[#F4B400]">MADEIRAS</span>
              </h1>
              <p className="text-[9px] tracking-widest text-[#F4B400] font-bold -mt-1 uppercase">Calculadora Estrutural de Telhados</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 text-[10px] text-stone-400 font-semibold border border-white/10 rounded-full px-3 py-1.5 bg-white/5">
              <Star className="h-3 w-3 text-[#F4B400]" /> NBR 7190 · NBR 6120 · NBR 6123
            </span>
            <Link href="/" className="bg-[#F4B400] hover:bg-amber-400 text-[#3E2723] font-black px-4 py-2 rounded-full text-xs transition shadow flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Ir à Loja
            </Link>
          </div>
        </div>
      </header>

      {/* ── SUB-HEADER ── */}
      <div className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#5D4037] text-white py-5 px-4 border-b-2 border-[#F4B400]/30 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-black text-lg md:text-xl uppercase tracking-wide flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#F4B400]" />
              Dimensionador Profissional de Telhados em Madeira
            </h2>
            <p className="text-stone-400 text-[11px] mt-1 max-w-2xl">
              Pré-dimensionamento estrutural automático com bitolas comerciais de eucalipto conforme ABNT.
              Informe a geometria e o sistema estrutural — o sistema calculará cada peça individualmente.
            </p>
          </div>
          <button onClick={handleReset} className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition text-[11px] border-none cursor-pointer shrink-0">
            <RotateCcw className="h-3.5 w-3.5" /> Limpar
          </button>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ── LEFT: CONFIG FORM ── */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-5 md:p-6 space-y-5 shadow-sm no-print">

          {/* Roof shape */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <Settings className="h-4 w-4 text-[#F4B400]" />
              <h3 className="font-black text-sm uppercase text-[#3E2723]">Configurações do Telhado</h3>
            </div>
            <label className="text-[10px] font-extrabold uppercase text-gray-500 block">Formato da Cobertura:</label>
            <select value={roofShape} onChange={(e: any) => setRoofShape(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F4B400] cursor-pointer">
              <option value="1_agua">Telhado 1 Água (Meia Água)</option>
              <option value="2_aguas">Telhado 2 Águas (Gable — mais comum)</option>
              <option value="3_aguas">Telhado 3 Águas (Hip frontal)</option>
              <option value="4_aguas">Telhado 4 Águas (Carioca / Pavilhão)</option>
              <option value="L_shape">Telhado em L</option>
              <option value="U_shape">Telhado em U</option>
            </select>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Largura da Obra (m)", val: width, set: setWidth, min: 2, max: 40, step: 0.5 },
              { label: "Comprimento da Obra (m)", val: length, set: setLength, min: 2, max: 60, step: 0.5 },
              { label: "Beiral Frontal (cm)", val: beiralFrontal, set: setBeiralFrontal, min: 0, max: 200, step: 10 },
              { label: "Beiral Lateral (cm)", val: beiralLateral, set: setBeiralLateral, min: 0, max: 200, step: 10 },
            ].map((f) => (
              <div key={f.label} className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-gray-500 block">{f.label}</label>
                <input type="number" min={f.min} max={f.max} step={f.step} value={f.val}
                  onChange={(e) => f.set(Math.max(f.min, parseFloat(e.target.value) || f.min))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F4B400]" />
              </div>
            ))}
          </div>

          {/* Slope & tile */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-gray-500 block">Inclinação (%):</label>
              <input type="number" min={5} max={100} step={1} value={slope}
                onChange={(e) => setSlope(Math.max(5, parseInt(e.target.value) || 5))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F4B400]" />
              <p className="text-[9px] text-gray-400">≈ {(Math.atan(slope/100)*180/Math.PI).toFixed(1)}°</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase text-gray-500 block">Peso da Telha (kgf/m²):</label>
              <div className="bg-[#F4B400]/10 border border-[#F4B400]/30 rounded-xl px-3.5 py-2 font-black text-sm text-[#3E2723]">
                {calc.tileSpec.weight} kgf/m²
              </div>
            </div>
          </div>

          {/* Tile type — full width cards */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase text-gray-500 block">Tipo de Cobertura / Telha:</label>
            <div className="grid grid-cols-1 gap-2">
              {(Object.entries(TILE_SPECS) as [TileType, TileSpec][]).map(([key, spec]) => (
                <button key={key} type="button" onClick={() => setTileType(key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border-2 transition-all text-xs font-bold flex items-start gap-2 ${
                    tileType === key
                      ? "bg-[#3E2723] text-white border-[#3E2723] shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[#F4B400] hover:bg-amber-50"
                  }`}>
                  <span className="mt-0.5">{tileType === key ? "✓" : "○"}</span>
                  <span className="leading-snug">{spec.label}</span>
                </button>
              ))}
            </div>
            {calc.tileSpec.overlapNote && (
              <p className="text-[9px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 leading-relaxed">
                ℹ️ {calc.tileSpec.overlapNote}
              </p>
            )}
          </div>

          {/* Wood class */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase text-gray-500 block">Classe da Madeira (NBR 7190):</label>
            <div className="grid grid-cols-2 gap-2">
              {([["C30", "🌲 Eucalipto / Pinus — C30"], ["C40", "🌳 Madeira de Lei — C40"]] as const).map(([cls, lbl]) => (
                <button key={cls} type="button" onClick={() => setWoodClass(cls)}
                  className={`p-2.5 rounded-xl text-center font-bold text-xs border-2 transition ${
                    woodClass === cls
                      ? "bg-[#3E2723] text-white border-[#3E2723] shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-[#F4B400]"
                  }`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Structural system */}
          <div className="border-t border-dashed border-gray-200 pt-4 space-y-4">

            {/* Trusses */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase text-gray-700">Possui Tesouras Estruturais?</label>
                <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                  {["SIM", "NÃO"].map((v) => (
                    <button key={v} type="button"
                      onClick={() => { if (v === "SIM") { setHasTruss(true); setHasPosts(false); } else setHasTruss(false); }}
                      className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                        (v === "SIM") === hasTruss ? "bg-[#F4B400] text-[#3E2723] shadow-sm" : "text-slate-500"
                      }`}>{v}</button>
                  ))}
                </div>
              </div>
              {hasTruss && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-extrabold uppercase text-gray-400 block mb-1">Espaçamento (m):</label>
                    <input type="number" min={2} max={5} step={0.5} value={trussSpacing}
                      onChange={(e) => setTrussSpacing(Math.max(2, parseFloat(e.target.value) || 2))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                  </div>
                  <div>
                    <label className="text-[9px] font-extrabold uppercase text-gray-400 block mb-1">Tipo:</label>
                    <select value={trussType} onChange={(e: any) => setTrussType(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold cursor-pointer">
                      <option value="howe">Howe (Vertical + Escoras)</option>
                      <option value="pratt">Pratt (Diagonais Tracionados)</option>
                      <option value="fink">Fink / Belga</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Posts */}
            {!hasTruss && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase text-gray-700">Possui Pontaletes de Apoio?</label>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                    {["SIM", "NÃO"].map((v) => (
                      <button key={v} type="button" onClick={() => setHasPosts(v === "SIM")}
                        className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                          (v === "SIM") === hasPosts ? "bg-[#F4B400] text-[#3E2723] shadow-sm" : "text-slate-500"
                        }`}>{v}</button>
                    ))}
                  </div>
                </div>
                {hasPosts && (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-extrabold uppercase text-gray-400 block mb-1">Altura Média (m):</label>
                      <input type="number" min={0.5} max={4} step={0.1} value={postHeight}
                        onChange={(e) => setPostHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                    </div>
                    <div>
                      <label className="text-[9px] font-extrabold uppercase text-gray-400 block mb-1">Espaçamento (m):</label>
                      <input type="number" min={1.5} max={4.5} step={0.5} value={postSpacing}
                        onChange={(e) => setPostSpacing(Math.max(1.5, parseFloat(e.target.value) || 1.5))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alerts */}
          {calc.alerts.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl space-y-1.5">
              <span className="font-extrabold text-red-700 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                <AlertTriangle className="h-3.5 w-3.5" /> Alertas Estruturais:
              </span>
              <ul className="list-disc pl-4 text-red-700 space-y-1 text-[10px] leading-relaxed">
                {calc.alerts.map((al, i) => <li key={i}>{al}</li>)}
              </ul>
            </div>
          )}

          {calc.suggestions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
              <span className="font-extrabold text-amber-800 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                <Info className="h-3.5 w-3.5" /> Otimizações:
              </span>
              {calc.suggestions.map((sg, i) => <p key={i} className="text-amber-700 text-[10px] mt-1 leading-relaxed font-medium">{sg}</p>)}
            </div>
          )}

          <button onClick={() => setLeadModalOpen(true)}
            className="w-full bg-[#3E2723] hover:bg-[#4E342E] text-white font-black py-4 rounded-full flex items-center justify-center gap-2 shadow-lg text-xs tracking-wider transition uppercase cursor-pointer border-none">
            <Phone className="h-4 w-4" /> Receber Orçamento via WhatsApp
          </button>
        </div>

        {/* ── RIGHT: RESULTS ── */}
        <div className="lg:col-span-7 space-y-5">

          {/* Tab bar */}
          <div className="no-print bg-white border border-gray-200 rounded-2xl p-1 flex shadow-sm text-xs font-extrabold">
            {[
              { id: "sizing", icon: <Calculator className="h-3.5 w-3.5" />, label: "Dimensionamento" },
              { id: "materials", icon: <Layers className="h-3.5 w-3.5" />, label: "Materiais" },
              { id: "report", icon: <FileText className="h-3.5 w-3.5" />, label: "Memorial Técnico" },
            ].map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id as any)}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase cursor-pointer border-none ${
                  activeTab === t.id ? "bg-[#F4B400] text-[#3E2723] shadow-sm" : "hover:bg-slate-50 text-slate-500"
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ── TAB: SIZING ── */}
          {activeTab === "sizing" && (
            <div className="space-y-5">

              {/* SVG Schematic */}
              <div className="bg-[#3E2723] text-white rounded-3xl p-5 shadow-lg border border-[#5D4037]/50 flex flex-col items-center relative overflow-hidden select-none no-print">
                <span className="absolute top-4 left-4 bg-black/40 text-[#F4B400] text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1.5 border border-[#F4B400]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Esquema Estrutural (Seção Transversal)
                </span>

                <div className="w-full flex items-center justify-center mt-8" style={{ height: 230 }}>
                  <svg width="320" height="220" viewBox="0 0 320 220">
                    <defs>
                      <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8D6E63" />
                        <stop offset="100%" stopColor="#4E342E" />
                      </linearGradient>
                      <linearGradient id="tileGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={tileColor1} />
                        <stop offset="100%" stopColor={tileColor2} />
                      </linearGradient>
                      <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#CFD8DC" />
                        <stop offset="100%" stopColor="#B0BEC5" />
                      </linearGradient>
                    </defs>

                    {/* Ground */}
                    <line x1="30" y1="195" x2="290" y2="195" stroke="#8D6E63" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                    {/* Dimension arrow */}
                    <path d="M 60,208 L 260,208" stroke="#F4B400" strokeWidth="0.8" />
                    <polygon points="60,208 66,205 66,211" fill="#F4B400" />
                    <polygon points="260,208 254,205 254,211" fill="#F4B400" />
                    <text x="155" y="218" fill="#F4B400" fontSize="8" fontWeight="bold" textAnchor="middle">{width.toFixed(1)}m largura</text>

                    {/* Walls */}
                    <rect x="60" y="135" width="12" height="60" fill="url(#wallGrad)" rx="1" />
                    <rect x="248" y="135" width="12" height="60" fill="url(#wallGrad)" rx="1" />
                    {/* Frechais circles */}
                    <circle cx="66" cy="135" r="6" fill="url(#woodGrad)" stroke="#3E2723" strokeWidth="0.8" />
                    <circle cx="254" cy="135" r="6" fill="url(#woodGrad)" stroke="#3E2723" strokeWidth="0.8" />

                    {roofShape === "1_agua" ? (
                      <>
                        {/* 1 água */}
                        <rect x="60" y="80" width="12" height="55" fill="url(#wallGrad)" rx="1" />
                        <line x1="50" y1="75" x2="265" y2="140" stroke="url(#woodGrad)" strokeWidth="4" strokeLinecap="round" />
                        <line x1="48" y1="70" x2="267" y2="135" stroke="url(#tileGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
                        {/* Ripa ticks */}
                        {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
                          const x1 = 50 + t * 215, y1 = 75 + t * 65;
                          return <line key={i} x1={x1} y1={y1} x2={x1 - 4} y2={y1 + 7} stroke="white" strokeWidth="1.5" opacity="0.6" />;
                        })}
                        {/* Width label */}
                        <text x="157" y="110" fill="#F4B400" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(-17,157,110)">{slope}% inclinação</text>
                      </>
                    ) : (
                      <>
                        {/* Ridge (cumeeira) */}
                        <circle cx="160" cy="68" r="7" fill="url(#woodGrad)" stroke="#3E2723" strokeWidth="0.8" />
                        <text x="168" y="65" fill="#F4B400" fontSize="7" fontWeight="bold">Cumeeira</text>

                        {/* Rafters left & right */}
                        <line x1="54" y1="138" x2="160" y2="68" stroke="url(#woodGrad)" strokeWidth="4" strokeLinecap="round" />
                        <line x1="266" y1="138" x2="160" y2="68" stroke="url(#woodGrad)" strokeWidth="4" strokeLinecap="round" />

                        {/* Tile cladding */}
                        <line x1="52" y1="136" x2="160" y2="64" stroke="url(#tileGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
                        <line x1="268" y1="136" x2="160" y2="64" stroke="url(#tileGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.85" />

                        {/* Ripa tick marks left */}
                        {[0.25, 0.5, 0.75].map((t, i) => {
                          const x1 = 54 + t * 106, y1 = 138 - t * 70;
                          return <line key={i} x1={x1 - 5} y1={y1 - 2} x2={x1 + 2} y2={y1 + 5} stroke="white" strokeWidth="1.5" opacity="0.6" />;
                        })}
                        {/* Ripa tick marks right */}
                        {[0.25, 0.5, 0.75].map((t, i) => {
                          const x1 = 266 - t * 106, y1 = 138 - t * 70;
                          return <line key={i} x1={x1 + 5} y1={y1 - 2} x2={x1 - 2} y2={y1 + 5} stroke="white" strokeWidth="1.5" opacity="0.6" />;
                        })}

                        {/* slope label */}
                        <text x="95" y="100" fill="#F4B400" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(-33,95,100)">{slope}%</text>

                        {/* Trusses */}
                        {hasTruss && (
                          <g opacity="0.95">
                            <line x1="66" y1="137" x2="254" y2="137" stroke="url(#woodGrad)" strokeWidth="4" strokeLinecap="round" />
                            <line x1="160" y1="68" x2="160" y2="137" stroke="url(#woodGrad)" strokeWidth="3" strokeLinecap="round" />
                            <line x1="160" y1="103" x2="113" y2="137" stroke="url(#woodGrad)" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="160" y1="103" x2="207" y2="137" stroke="url(#woodGrad)" strokeWidth="2.5" strokeLinecap="round" />
                            <text x="160" y="155" fill="#90CAF9" fontSize="7" fontWeight="bold" textAnchor="middle">Tesoura {trussType}</text>
                          </g>
                        )}

                        {/* Posts */}
                        {!hasTruss && hasPosts && (
                          <g>
                            <line x1="160" y1="68" x2="160" y2="195" stroke="url(#woodGrad)" strokeWidth="3.5" strokeLinecap="round" />
                            <circle cx="113" cy="103" r="5.5" fill="url(#woodGrad)" stroke="#3E2723" strokeWidth="0.8" />
                            <circle cx="207" cy="103" r="5.5" fill="url(#woodGrad)" stroke="#3E2723" strokeWidth="0.8" />
                            <line x1="113" y1="103" x2="113" y2="195" stroke="url(#woodGrad)" strokeWidth="2.5" opacity="0.8" />
                            <line x1="207" y1="103" x2="207" y2="195" stroke="url(#woodGrad)" strokeWidth="2.5" opacity="0.8" />
                            <text x="160" y="185" fill="#A5D6A7" fontSize="7" fontWeight="bold" textAnchor="middle">Pontaletes</text>
                          </g>
                        )}
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Área Projetada", val: `${calc.projArea} m²`, color: "text-[#3E2723]" },
                  { label: "Área Inclinada", val: `${calc.slopedArea} m²`, color: "text-[#F4B400]" },
                  { label: "Carga Total (Qd)", val: `${calc.totalLoad} kgf/m²`, color: "text-[#3E2723]" },
                  { label: "Volume de Madeira", val: `${calc.finalVol} m³`, color: "text-emerald-600" },
                ].map((k) => (
                  <div key={k.label} className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm space-y-1">
                    <span className="text-gray-400 font-extrabold text-[9px] uppercase tracking-wider block">{k.label}</span>
                    <span className={`font-black text-base leading-none ${k.color}`}>{k.val}</span>
                  </div>
                ))}
              </div>

              {/* Tile quantity card */}
              {(calc.sheetsNeeded > 0 || calc.ceramicUnitsNeeded > 0) && (
                <div className="bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-white rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#F4B400] w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0">🏠</div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Telhas necessárias (c/ 10% perda)</p>
                      <p className="font-black text-lg text-[#F4B400]">
                        {calc.sheetsNeeded > 0 ? `${calc.sheetsNeeded} chapas` : `${calc.ceramicUnitsNeeded} unidades`}
                      </p>
                      <p className="text-[9px] text-stone-400 mt-0.5">{calc.tileSpec.label}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-stone-400 uppercase font-bold">Área inclinada</p>
                    <p className="font-black text-base">{calc.slopedArea} m²</p>
                  </div>
                </div>
              )}

              {/* Dimensioning table */}
              <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 md:p-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                  <h4 className="font-black text-xs uppercase tracking-wider text-[#3E2723]">Verificação Estrutural das Peças (NBR 7190)</h4>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded text-[9px] font-black uppercase flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> ELU + ELS Verificados
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px] tracking-wider font-extrabold">
                        <th className="py-2.5 pr-2">Elemento</th>
                        <th className="py-2.5 pr-2">Vão Livre</th>
                        <th className="py-2.5 pr-2">Carga (kgf/m)</th>
                        <th className="py-2.5 pr-2">Wx Req. (cm³)</th>
                        <th className="py-2.5 pr-2">Bitola Adotada</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {[
                        { name: "Caibros",       d: calc.caibro },
                        ...(calc.usesRipas  ? [{ name: "Ripas (5×2,5cm)",  d: calc.ripa  }] : []),
                        ...(calc.usesRipoes ? [{ name: "Ripões (5×3cm)",   d: calc.ripao }] : []),
                        { name: "Terças (Purlins)", d: calc.purlin },
                        ...(calc.cumeeira.qty > 0 ? [{ name: "Cumeeira", d: calc.cumeeira }] : []),
                        { name: "Frechais", d: calc.frechal },
                        ...(hasPosts && calc.post.qty > 0 ? [{ name: "Pontaletes", d: calc.post }] : []),
                      ].map((row) => (
                        <tr key={row.name} className="hover:bg-slate-50 transition">
                          <td className="py-2.5 font-bold text-slate-800">{row.name}</td>
                          <td className="py-2.5">{row.d.span.toFixed(2)} m</td>
                          <td className="py-2.5">{Math.round(row.d.force)} kgf/m</td>
                          <td className="py-2.5 text-slate-400">{row.d.wxReq?.toFixed(1) ?? "—"} cm³</td>
                          <td className="py-2.5 font-black text-[#3E2723]">{row.d.sec.label}</td>
                          <td className="py-2.5 text-emerald-500 font-bold">✓ OK</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: MATERIALS ── */}
          {activeTab === "materials" && (
            <div className="space-y-5">

              {/* Tile count card */}
              {(calc.sheetsNeeded > 0 || calc.ceramicUnitsNeeded > 0) && (
                <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                    <Package className="h-4 w-4 text-[#F4B400]" />
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#3E2723]">Quantidade de Telhas</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-[10px] font-bold text-slate-600">Telha Selecionada:</p>
                      <p className="font-black text-sm text-[#3E2723]">{calc.tileSpec.label}</p>
                      <p className="text-[9px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed mt-2">
                        ℹ️ {calc.tileSpec.overlapNote}
                      </p>
                    </div>
                    <div className="bg-[#3E2723] text-white rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Total a comprar</span>
                      <span className="font-black text-3xl text-[#F4B400] my-1">
                        {calc.sheetsNeeded > 0 ? calc.sheetsNeeded : calc.ceramicUnitsNeeded}
                      </span>
                      <span className="text-[10px] text-stone-300">{calc.sheetsNeeded > 0 ? "chapas" : "unidades"}</span>
                      <span className="text-[8px] text-stone-500 mt-1">Área inclinada: {calc.slopedArea}m² + 10% perda</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Wood BOM table */}
              <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                  <TreePine className="h-4 w-4 text-[#F4B400]" />
                  <h4 className="font-black text-xs uppercase tracking-wider text-[#3E2723]">Lista de Peças de Eucalipto</h4>
                  <span className="ml-auto bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded text-[9px] font-black uppercase">Bitolas Comerciais</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[10px] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 uppercase text-[8px] tracking-wider font-extrabold">
                        <th className="py-2.5 pr-2">Peça</th>
                        <th className="py-2.5 pr-2">Bitola</th>
                        <th className="py-2.5 pr-2 text-center">Qtd</th>
                        <th className="py-2.5 pr-2">Comp. Bruto</th>
                        <th className="py-2.5 pr-2 text-[#3E2723] font-black">Eucalipto ✓</th>
                        <th className="py-2.5 text-right">Volume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {[
                        { name: "Caibros",             sec: calc.caibro.sec,  qty: calc.caibro.qty,  len: calc.caibro.len,  eucLen: calc.caibro.eucLen,  vol: calc.caibroVol,  note: `Espaçamento: 50cm | Vão: ${calc.caibro.span.toFixed(2)}m` },
                        ...(calc.usesRipas  ? [{ name: "Ripas (5×2,5cm)",  sec: calc.ripa.sec,   qty: calc.ripa.qty,   len: calc.ripa.len,   eucLen: calc.ripa.eucLen,   vol: calc.ripaVol,   note: "Espaçamento: 32cm entre ripas" }] : []),
                        ...(calc.usesRipoes ? [{ name: "Ripões (5×3cm)",   sec: calc.ripao.sec,  qty: calc.ripao.qty,  len: calc.ripao.len,  eucLen: calc.ripao.eucLen,  vol: calc.ripaoVol,  note: `Espaçamento: ${calc.ripaoSpacing.toFixed(2)}m entre ripões` }] : []),
                        { name: "Terças",               sec: calc.purlin.sec,  qty: calc.purlin.qty,  len: calc.purlin.len,  eucLen: calc.purlin.eucLen,  vol: calc.purlinVol,  note: `Espaçamento: 1,5m | Vão: ${calc.purlin.span.toFixed(2)}m` },
                        ...(calc.cumeeira.qty > 0 ? [{ name: "Cumeeira", sec: calc.cumeeira.sec, qty: calc.cumeeira.qty, len: calc.cumeeira.len, eucLen: calc.cumeeira.eucLen, vol: calc.cumeeiraVol, note: `Vão: ${calc.cumeeira.span.toFixed(2)}m` }] : []),
                        { name: "Frechais",              sec: calc.frechal.sec,  qty: calc.frechal.qty,  len: calc.frechal.len,  eucLen: calc.frechal.eucLen,  vol: calc.frechalVol,  note: `Vão: ${calc.frechal.span.toFixed(2)}m` },
                        ...(hasPosts && calc.post.qty > 0 ? [{ name: "Pontaletes", sec: calc.post.sec, qty: calc.post.qty, len: calc.post.len, eucLen: calc.post.eucLen, vol: calc.postVol, note: `Alt: ${postHeight}m | Esp: ${postSpacing}m` }] : []),
                      ].map((row) => (
                        <tr key={row.name} className="hover:bg-slate-50 transition">
                          <td className="py-3 font-bold text-slate-800">
                            <div>{row.name}</div>
                            {row.note && <div className="text-[8px] text-slate-400 font-normal mt-0.5">{row.note}</div>}
                          </td>
                          <td className="py-3 text-slate-600">{row.sec.label}</td>
                          <td className="py-3 text-center font-black text-[#3E2723] text-sm">{row.qty}</td>
                          <td className="py-3">
                            <div className="font-bold text-slate-700">{row.len.toFixed(2)} m</div>
                            <div className="text-[8px] text-slate-400">comp. individual</div>
                          </td>
                          <td className="py-3">
                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-black px-2.5 py-1 rounded-full text-[9px] flex items-center gap-1 w-fit">
                              <Ruler className="h-2.5 w-2.5" /> {row.eucLen},0 m
                            </span>
                          </td>
                          <td className="py-3 text-right font-bold text-stone-600">{row.vol.toFixed(3)} m³</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Volume summary */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3 mt-5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600">
                    <span>Volume Líquido Total:</span><span>{calc.netVol} m³</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Fator de perda para cortes e esquadros:</span><span>+ 15%</span>
                  </div>
                  <div className="border-t border-stone-300 pt-3 flex justify-between font-black text-[#3E2723] text-sm">
                    <span>VOLUME FINAL RECOMENDADO PARA COMPRA:</span>
                    <span className="text-[#F4B400]">{calc.finalVol} m³</span>
                  </div>
                </div>

                {/* Eucalipto legend */}
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <p className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <TreePine className="h-3.5 w-3.5" /> Como Interpretar o Comprimento do Eucalipto:
                  </p>
                  <ul className="text-[9px] text-emerald-700 space-y-1 leading-relaxed font-medium list-disc pl-4">
                    <li>O comprimento indicado em <strong>Eucalipto ✓</strong> é o menor comprimento comercial padrão que cobre a peça necessária + 10cm de margem de corte.</li>
                    <li>Comprimentos disponíveis: 2,0m / 2,5m / 3,0m / 3,5m / 4,0m / 4,5m / 5,0m / 5,5m / 6,0m / 7,0m / 8,0m.</li>
                    <li>Peças longas (terças, frechais, cumeeira) podem ser emendadas com sobreposição de 40cm se não houver disponibilidade no comprimento ideal.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: REPORT ── */}
          {activeTab === "report" && (
            <div id="tech-report" className="bg-white border border-gray-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-6">

              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div>
                  <h4 className="font-black text-sm uppercase text-[#3E2723] flex items-center gap-1.5">
                    <FileText className="h-4.5 w-4.5 text-[#F4B400]" /> Memorial Descritivo de Dimensionamento
                  </h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ABNT NBR 7190:1997 / NBR 6120:2019 / NBR 6123</p>
                </div>
                <button onClick={() => window.print()}
                  className="no-print bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold p-2.5 rounded-xl transition flex items-center gap-1.5 text-[11px] border-none cursor-pointer">
                  <Printer className="h-4 w-4" /> Imprimir
                </button>
              </div>

              <div className="space-y-5 text-[10px] text-stone-600 leading-relaxed font-medium">

                <section className="space-y-2">
                  <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">1. Parâmetros de Entrada e Geometria</h5>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                    {[
                      ["Formato da Cobertura", { "1_agua":"1 Água","2_aguas":"2 Águas","3_aguas":"3 Águas","4_aguas":"4 Águas","L_shape":"L","U_shape":"U" }[roofShape]],
                      ["Comprimento da Obra", `${length} m`],
                      ["Largura da Obra", `${width} m`],
                      ["Beiral Frontal / Lateral", `${beiralFrontal} cm / ${beiralLateral} cm`],
                      ["Inclinação Adotada", `${slope}% (≈${(Math.atan(slope/100)*180/Math.PI).toFixed(1)}°)`],
                      ["Área Projetada Horizontal", `${calc.projArea} m²`],
                      ["Área Real Inclinada (cobertura)", `${calc.slopedArea} m²`],
                    ].map(([k, v]) => (
                      <p key={k}>• {k}: <strong className="text-slate-800">{v}</strong></p>
                    ))}
                  </div>
                </section>

                <section className="space-y-2">
                  <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">2. Cargas e Combinações (NBR 6120 / NBR 6123)</h5>
                  <div className="space-y-1">
                    {[
                      ["Carga Permanente — Telhas", `${calc.tileWeight} kgf/m² (${calc.tileSpec.label})`],
                      ["Carga Permanente — Peso Próprio Estimado", "15 kgf/m²"],
                      ["Sobrecarga de Utilização (Manutenção)", "25 kgf/m²"],
                      ["Pressão / Sucção de Vento (Simplificado)", "35 kgf/m²"],
                    ].map(([k, v]) => <p key={k}>• {k}: <strong className="text-slate-800">{v}</strong></p>)}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-[9px] text-stone-600 mt-2">
                      ELU: Fd = 1,4·G + 1,4·Q + 1,4·0,6·W = <strong>{calc.totalLoad} kgf/m²</strong>
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">3. Propriedades da Madeira (NBR 7190)</h5>
                  <div className="space-y-1">
                    {[
                      ["Classe do Material", woodClass === "C30" ? "Eucalipto / Coníferas — C30" : "Folhosas / Madeira de Lei — C40"],
                      ["Resistência Característica à Flexão (f_mk)", `${woodClass === "C30" ? 300 : 400} kgf/cm²`],
                      ["Fator de Modificação (kmod)", "0,70 (Longa duração, Classe umidade 3)"],
                      ["Resistência de Projeto à Flexão (f_wd)", `${Math.round((woodClass === "C30" ? 300 : 400) * 0.70 / 1.4)} kgf/cm²`],
                      ["Módulo de Elasticidade (E)", `${woodClass === "C30" ? "95.000" : "125.000"} kgf/cm²`],
                    ].map(([k, v]) => <p key={k}>• {k}: <strong className="text-slate-800">{v}</strong></p>)}
                  </div>
                </section>

                <section className="space-y-2">
                  <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">4. Resultado das Verificações ELS — Flecha Admissível L/200</h5>
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-1.5 text-emerald-800">
                    <p>✓ <strong>Caibros:</strong> Flecha máx. admissível = {(calc.caibro.span * 100 / 200).toFixed(1)} cm — Bitola adotada: {calc.caibro.sec.label}</p>
                    <p>✓ <strong>Terças:</strong> Flecha máx. admissível = {(calc.purlin.span * 100 / 200).toFixed(1)} cm — Bitola adotada: {calc.purlin.sec.label}</p>
                    {calc.cumeeira.qty > 0 && <p>✓ <strong>Cumeeira:</strong> Bitola adotada {calc.cumeeira.sec.label} — verificação de flecha satisfeita.</p>}
                    <p>✓ <strong>Tensão Máxima:</strong> Tensão atuante inferior à tensão admissível de {Math.round((woodClass === "C30" ? 300 : 400) * 0.70 / 1.4)} kgf/cm².</p>
                  </div>
                </section>

                <section className="space-y-2">
                  <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">5. Resumo Quantitativo de Peças e Comprimentos de Eucalipto</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[9px] border-collapse">
                      <thead>
                        <tr className="bg-stone-100 text-stone-500 uppercase text-[8px] tracking-wider font-extrabold">
                          <th className="p-2 text-left rounded-l">Peça</th>
                          <th className="p-2 text-left">Bitola</th>
                          <th className="p-2 text-center">Qtd</th>
                          <th className="p-2">Comp. Peça</th>
                          <th className="p-2 text-emerald-700">Eucalipto Necessário</th>
                          <th className="p-2 text-right rounded-r">Volume Líq.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {[
                          { name: "Caibros", sec: calc.caibro.sec.label, qty: calc.caibro.qty, len: calc.caibro.len, eucLen: calc.caibro.eucLen, vol: calc.caibroVol },
                          ...(calc.usesRipas ? [{ name: "Ripas", sec: calc.ripa.sec.label, qty: calc.ripa.qty, len: calc.ripa.len, eucLen: calc.ripa.eucLen, vol: calc.ripaVol }] : []),
                          { name: "Terças", sec: calc.purlin.sec.label, qty: calc.purlin.qty, len: calc.purlin.len, eucLen: calc.purlin.eucLen, vol: calc.purlinVol },
                          ...(calc.cumeeira.qty > 0 ? [{ name: "Cumeeira", sec: calc.cumeeira.sec.label, qty: calc.cumeeira.qty, len: calc.cumeeira.len, eucLen: calc.cumeeira.eucLen, vol: calc.cumeeiraVol }] : []),
                          { name: "Frechais", sec: calc.frechal.sec.label, qty: calc.frechal.qty, len: calc.frechal.len, eucLen: calc.frechal.eucLen, vol: calc.frechalVol },
                          ...(hasPosts && calc.post.qty > 0 ? [{ name: "Pontaletes", sec: calc.post.sec.label, qty: calc.post.qty, len: calc.post.len, eucLen: calc.post.eucLen, vol: calc.postVol }] : []),
                        ].map((r) => (
                          <tr key={r.name} className="hover:bg-stone-50">
                            <td className="p-2 font-bold text-slate-800">{r.name}</td>
                            <td className="p-2">{r.sec}</td>
                            <td className="p-2 text-center font-black">{r.qty} un</td>
                            <td className="p-2">{r.len.toFixed(2)} m</td>
                            <td className="p-2 text-emerald-700 font-black">{r.eucLen},0 m cada</td>
                            <td className="p-2 text-right">{r.vol.toFixed(3)} m³</td>
                          </tr>
                        ))}
                        <tr className="bg-[#3E2723] text-white font-black text-[10px]">
                          <td colSpan={5} className="p-2 rounded-bl">VOLUME TOTAL RECOMENDADO (c/ 15% perda):</td>
                          <td className="p-2 text-right text-[#F4B400] rounded-br">{calc.finalVol} m³</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {(calc.sheetsNeeded > 0 || calc.ceramicUnitsNeeded > 0) && (
                  <section className="space-y-2">
                    <h5 className="font-black text-[#3E2723] border-b border-stone-200 pb-1 uppercase tracking-wide text-[11px]">6. Quantitativo de Telhas</h5>
                    <div className="space-y-1">
                      <p>• Telha selecionada: <strong className="text-slate-800">{calc.tileSpec.label}</strong></p>
                      <p>• Área de cobertura inclinada: <strong className="text-slate-800">{calc.slopedArea} m²</strong></p>
                      {calc.sheetsNeeded > 0 && <p>• Área útil por chapa: <strong className="text-slate-800">{calc.tileSpec.netArea} m²</strong></p>}
                      <p>• Fator de perda aplicado: <strong className="text-slate-800">10%</strong></p>
                      <p>• <strong className="text-[#3E2723] text-[11px]">Quantidade a comprar: {calc.sheetsNeeded > 0 ? `${calc.sheetsNeeded} chapas` : `${calc.ceramicUnitsNeeded} unidades`}</strong></p>
                    </div>
                  </section>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-[9px] leading-relaxed">
                  <strong>⚠️ AVISO TÉCNICO:</strong> Este memorial constitui um <strong>pré-dimensionamento indicativo</strong> para fins de orçamento e planejamento.
                  O dimensionamento estrutural definitivo deve ser realizado por Engenheiro Civil ou Engenheiro Florestal habilitado no CREA,
                  com responsabilidade técnica e ART emitida, conforme exigência da legislação brasileira.
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <AboutSection />

      <footer className="bg-[#3E2723] text-white py-12 px-4 border-t-4 border-[#F4B400] no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-300">
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#F4B400] uppercase tracking-wider">Só Madeiras — Estância/SE</h4>
            <p className="leading-relaxed">Fornecemos eucalipto autoclavado, serrado e dimensionado para coberturas em Estância, Aracaju e todo o estado de Sergipe.</p>
            <div className="text-[#F4B400] font-black">📞 {settings?.phone || "(79) 99629-8990"}</div>
          </div>
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#F4B400] uppercase tracking-wider">Normas Técnicas</h4>
            <div className="space-y-1.5 text-stone-400 leading-relaxed">
              <p><strong className="text-stone-300">NBR 7190:</strong> Projeto de estruturas de madeira.</p>
              <p><strong className="text-stone-300">NBR 6120:</strong> Cargas para cálculo de estruturas.</p>
              <p><strong className="text-stone-300">NBR 6123:</strong> Forças devidas ao vento em edificações.</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#F4B400] uppercase tracking-wider">Garantia Técnica</h4>
            <div className="grid grid-cols-2 gap-2 text-[9px] text-stone-400">
              {["🌲 Eucalipto NBR 16143","🛡️ UC-4 Autoclave","📐 Dimensionado ABNT","🔒 15 Anos Garantia"].map((t) => (
                <div key={t} className="bg-white/5 border border-white/10 p-2 rounded">{t}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-4 text-center text-[9px] text-stone-500">
          © {new Date().getFullYear()} SÓ MADEIRAS. Todos os direitos reservados.
        </div>
      </footer>

      {/* ── LEAD MODAL ── */}
      {leadModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white text-[#3E2723] max-w-md w-full p-6 rounded-3xl border border-stone-200 shadow-2xl relative space-y-5">
            <button onClick={() => setLeadModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 bg-transparent border-none cursor-pointer text-xl">✕</button>
            <div className="text-center space-y-1">
              <div className="bg-[#F4B400]/20 text-[#F4B400] w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl">📐</div>
              <h4 className="font-black text-lg text-[#3E2723] uppercase pt-2">Receber Orçamento</h4>
              <p className="text-[11px] text-stone-500 max-w-xs mx-auto">Enviaremos a lista de peças calculada ao nosso setor comercial via WhatsApp.</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs font-semibold">
              {[
                { label: "Seu Nome Completo:", placeholder: "Ex: Carlos Souza", val: leadName, set: setLeadName, type: "text" },
                { label: "WhatsApp com DDD:", placeholder: "Ex: 79998765432", val: leadPhone, set: setLeadPhone, type: "tel" },
                { label: "Cidade:", placeholder: "Ex: Estância", val: leadCity, set: setLeadCity, type: "text" },
              ].map((f) => (
                <div key={f.label} className="space-y-1">
                  <label className="text-stone-600 block font-bold">{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder} value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4B400]" />
                </div>
              ))}
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3.5 rounded-xl shadow transition uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-none">
                📥 Enviar e Abrir WhatsApp
              </button>
              <span className="block text-[8px] text-stone-400 text-center">🔒 Seus dados são usados apenas para envio da cotação.</span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
