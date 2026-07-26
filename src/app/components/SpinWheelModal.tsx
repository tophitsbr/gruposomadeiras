"use client";

import React, { useState, useRef } from "react";
import { X, Gift, Sparkles, Check, Copy, Phone, ArrowRight } from "lucide-react";
import { ApiService } from "../services/apiService";

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (couponCode: string) => void;
}

const PRIZES = [
  { id: 1, label: "5% OFF no Pix", code: "SOMADEIRAS5", color: "#F4B400", text: "#3E2723" },
  { id: 2, label: "Frete Grátis", code: "FRETEGRATIS", color: "#2E7D32", text: "#FFFFFF" },
  { id: 3, label: "R$ 50 OFF", code: "DESCONTO50", color: "#5D4037", text: "#FFFFFF" },
  { id: 4, label: "10% Pergolados", code: "PERGOLADO10", color: "#D84315", text: "#FFFFFF" },
  { id: 5, label: "7% 1ª Compra", code: "PRIMEIRA7", color: "#1565C0", text: "#FFFFFF" },
  { id: 6, label: "R$ 100 Forro PVC", code: "FORRO100", color: "#6A1B9A", text: "#FFFFFF" },
];

export default function SpinWheelModal({ isOpen, onClose, onApplyCoupon }: SpinWheelModalProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", city: "Estância" });
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof PRIZES[0] | null>(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSpin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Por favor, preencha seu nome e WhatsApp para girar a roleta!");
      return;
    }

    if (isSpinning || wonPrize) return;

    setIsSpinning(true);

    // Pick a guaranteed winning index (e.g. 5% OFF or Frete Grátis - index 0 or 1)
    const winningIndex = Math.floor(Math.random() * 2); // 0 or 1
    const selectedPrize = PRIZES[winningIndex];

    // Calculate rotation: 5 full turns (1800deg) + offset to slice
    const sliceAngle = 360 / PRIZES.length;
    // To land on winningIndex at the top pointer (0 deg), we calculate target angle:
    const targetAngle = 360 * 5 + (360 - winningIndex * sliceAngle - sliceAngle / 2);
    setRotationDegree(targetAngle);

    // Save lead to local database & NestJS API
    try {
      ApiService.registerLead(formData.phone, formData.name);
      const existingLeads = JSON.parse(localStorage.getItem("somadeiras_leads") || "[]");
      existingLeads.push({
        id: "spin_lead_" + Date.now(),
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        prizeWon: selectedPrize.label,
        couponCode: selectedPrize.code,
        date: new Date().toISOString().split("T")[0],
        status: "Roleta de Prêmios",
      });
      localStorage.setItem("somadeiras_leads", JSON.stringify(existingLeads));
    } catch (err) {}

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
    }, 4000);
  };

  const handleCopyCode = () => {
    if (!wonPrize) return;
    navigator.clipboard.writeText(wonPrize.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    if (!wonPrize) return;
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${formData.name}. Girei a roleta no site da Só Madeiras e ganhei o cupom [${wonPrize.code}] (${wonPrize.label}). Gostaria de aproveitar esse desconto na minha obra!`
    );
    window.open(`https://wa.me/5579996298990?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in no-print">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-stone-900 dark:text-white select-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-1.5 rounded-full transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#1b4332] p-5 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />
          <span className="inline-flex items-center gap-1 bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-3 py-0.5 rounded-full uppercase tracking-wider mb-1 shadow-sm">
            <Sparkles className="h-3 w-3" /> Roleta de Prêmios Só Madeiras
          </span>
          <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight leading-tight">
            Gire & Ganhe Desconto!
          </h3>
          <p className="text-stone-300 text-xs font-light mt-1 max-w-xs mx-auto">
            Cadastre seu WhatsApp e receba um cupom de desconto exclusivo instantâneo.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col items-center gap-6">
          
          {/* Wheel Graphic */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Top Pointer Needle */}
            <div className="absolute -top-3 z-30 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-red-600 filter drop-shadow-md" />
            
            {/* Spinning Wheel Container */}
            <div
              className="w-full h-full rounded-full border-4 border-[#F4B400] shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
              style={{ transform: `rotate(${rotationDegree}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {PRIZES.map((prize, idx) => {
                  const sliceAngle = 360 / PRIZES.length;
                  const startAngle = idx * sliceAngle;
                  const endAngle = startAngle + sliceAngle;
                  
                  const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                  const textAngle = startAngle + sliceAngle / 2;

                  return (
                    <g key={prize.id}>
                      <path d={pathData} fill={prize.color} stroke="#FFFFFF" strokeWidth="0.8" />
                      <g transform={`rotate(${textAngle}, 50, 50)`}>
                        <text
                          x="75"
                          y="51.5"
                          fill={prize.text}
                          fontSize="4.5"
                          fontWeight="900"
                          textAnchor="middle"
                          transform={`rotate(90, 75, 51.5)`}
                          className="uppercase font-sans tracking-tighter"
                        >
                          {prize.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Cap Knob */}
            <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#3E2723] to-[#5D4037] border-2 border-[#F4B400] shadow-lg flex items-center justify-center text-amber-400 font-black text-xs">
              🪵
            </div>
          </div>

          {/* Form or Result View */}
          {!wonPrize ? (
            <form onSubmit={handleSpin} className="w-full space-y-3">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Seu Nome Completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#F4B400] outline-none"
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp (ex: 79 99999-8888)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-[#F4B400] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSpinning}
                className="w-full bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-black text-xs md:text-sm py-3 rounded-xl shadow-lg transition active:scale-98 flex items-center justify-center gap-2 border-none uppercase tracking-wider disabled:opacity-50 cursor-pointer"
              >
                <Gift className="h-4 w-4" />
                <span>{isSpinning ? "Girando a Roleta..." : "Girar Roleta & Ganhar Desconto!"}</span>
              </button>
            </form>
          ) : (
            <div className="w-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 text-center space-y-3 animate-bounce-once">
              <div className="space-y-1">
                <span className="bg-emerald-600 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase">
                  🎉 Prêmio Conquistado!
                </span>
                <h4 className="font-display font-black text-lg text-brown-dark dark:text-amber-400">
                  {wonPrize.label}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-stone-300">
                  Utilize o cupom abaixo no carrinho ou com um vendedor:
                </p>
              </div>

              {/* Coupon code box */}
              <div className="flex items-center justify-between bg-white dark:bg-neutral-800 border-2 border-dashed border-[#F4B400] p-2.5 rounded-xl">
                <span className="font-mono font-black text-base text-[#3E2723] dark:text-[#F4B400] tracking-widest pl-2">
                  {wonPrize.code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="bg-[#F4B400] hover:bg-[#ffc107] text-[#3E2723] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer border-none uppercase"
                >
                  <Phone className="h-4 w-4" />
                  <span>Resgatar no WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    onApplyCoupon(wonPrize.code);
                    onClose();
                  }}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer border-none"
                >
                  <span>Aplicar Direto no Carrinho</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
