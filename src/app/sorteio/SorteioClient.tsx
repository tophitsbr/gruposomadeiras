"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Gift, 
  HelpCircle, 
  Lock, 
  Phone, 
  CheckCircle, 
  User, 
  Hash, 
  DollarSign, 
  Calendar, 
  Trophy, 
  Eye, 
  Trash2, 
  Check, 
  Copy, 
  Download, 
  Sparkles, 
  Volume2, 
  Play, 
  Info,
  Settings,
  Share2
} from "lucide-react";

// Types
interface Participant {
  id: string;
  name: string;
  phone: string;
  orderNumber: string;
  orderValue: number;
  date: string;
  code: string;
}

interface Winner {
  id: string;
  name: string;
  phone: string;
  orderNumber: string;
  code: string;
  drawDate: string;
  prize: string;
}

export default function SorteioClient() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Registration Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [registeredCupom, setRegisteredCupom] = useState<Participant | null>(null);
  const [formError, setFormError] = useState("");

  // Toast / System Notifications
  const [systemNotification, setSystemNotification] = useState<string | null>(null);
  
  // Draw / Roulette States
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawWinner, setDrawWinner] = useState<Participant | null>(null);
  const [spinningCode, setSpinningCode] = useState("---");
  const [prizeName, setPrizeName] = useState("Vale-Compras de R$ 500,00");

  // Confetti Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  // Sound Effect Mock (HTML5 Audio Synthesis or Description)
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync state on client mount
  useEffect(() => {
    setMounted(true);
    
    // Load Campaign active status (default: true)
    const isCampaignActive = localStorage.getItem("somadeiras_giveaway_active");
    if (isCampaignActive !== null) {
      setActive(isCampaignActive === "true");
    } else {
      localStorage.setItem("somadeiras_giveaway_active", "true");
    }

    // Load Participants
    const savedParticipants = localStorage.getItem("somadeiras_giveaway_participants");
    if (savedParticipants) {
      try {
        setParticipants(JSON.parse(savedParticipants));
      } catch (e) {
        console.error("Erro ao carregar participantes:", e);
      }
    }

    // Load Winners
    const savedWinners = localStorage.getItem("somadeiras_giveaway_winners");
    if (savedWinners) {
      try {
        setWinners(JSON.parse(savedWinners));
      } catch (e) {
        console.error("Erro ao carregar ganhadores:", e);
      }
    }
  }, []);

  const addSystemNotification = (msg: string) => {
    setSystemNotification(msg);
    setTimeout(() => {
      setSystemNotification(null);
    }, 4000);
  };

  // Dispatch custom storage event when toggle status changes to keep Homepage updated
  const toggleCampaignActive = (status: boolean) => {
    setActive(status);
    localStorage.setItem("somadeiras_giveaway_active", status ? "true" : "false");
    window.dispatchEvent(new Event("storage"));
    addSystemNotification(`🍀 Campanha de Sorteio ${status ? "ATIVADA" : "DESATIVADA"} com sucesso!`);
  };

  // Generate Unique Ticket Code (format: SM-XXXXX)
  const generateTicketCode = () => {
    const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    let code = "SM-";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Handle Form Registration
  const handleRegisterParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !phone.trim() || !orderNumber.trim()) {
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validate phone length
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setFormError("WhatsApp inválido. Digite DDD + número (ex: 79999999999).");
      return;
    }

    // Check duplicate order numbers
    const cleanOrder = orderNumber.trim().replace("#", "");
    const orderExists = participants.some(
      (p) => p.orderNumber.toLowerCase() === cleanOrder.toLowerCase()
    );

    if (orderExists) {
      setFormError("Este número de pedido já foi cadastrado para o sorteio.");
      return;
    }

    // Generate ticket
    const newParticipant: Participant = {
      id: "part-" + Date.now(),
      name: name.trim(),
      phone: phone,
      orderNumber: cleanOrder,
      orderValue: parseFloat(orderValue) || 0,
      date: new Date().toISOString().split("T")[0],
      code: generateTicketCode()
    };

    const updatedParticipants = [newParticipant, ...participants];
    setParticipants(updatedParticipants);
    localStorage.setItem("somadeiras_giveaway_participants", JSON.stringify(updatedParticipants));

    // Save lead to local storage CRM db
    const currentLeads = localStorage.getItem("somadeiras_leads");
    const leadsList = currentLeads ? JSON.parse(currentLeads) : [];
    const newLead = {
      id: `lead-sorteio-${Date.now()}`,
      name: newParticipant.name,
      phone: newParticipant.phone,
      city: "Estância",
      state: "SE",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      source: "Sorteio de Prêmios",
      utm: "utm_source=sorteio&utm_medium=registration",
      products: [`Participação Sorteio (Cupom: ${newParticipant.code})`],
      total: newParticipant.orderValue,
      status: "Novo Lead",
      sellerId: "maria",
      device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "Mobile (Web)" : "Desktop (Web)") : "Web",
      location: "Estância - SE",
      notes: `Cadastrou o pedido #${newParticipant.orderNumber} no Sorteio de Prêmios. Cupom: ${newParticipant.code}`
    };
    localStorage.setItem("somadeiras_leads", JSON.stringify([newLead, ...leadsList]));

    // Success and save ticket visual state
    setRegisteredCupom(newParticipant);
    addSystemNotification("🎉 Inscrição realizada! Seu cupom foi gerado.");

    // Clean inputs
    setName("");
    setPhone("");
    setOrderNumber("");
    setOrderValue("");
  };

  // Play synthetic tone sounds (web audio api) for suspense and win
  const playSound = (type: "tick" | "win") => {
    if (!soundEnabled || typeof window === "undefined" || !window.AudioContext) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "tick") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "win") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45); // C6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {}
  };

  // Visual Confetti Particle Engine using HTML5 Canvas
  const initConfetti = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    particlesRef.current = [];
    const colors = ["#F4B400", "#FFD149", "#3E2723", "#5D4037", "#4CAF50", "#2196F3", "#E91E63"];

    // Populate particles
    for (let i = 0; i < 150; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 4 + 2
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;
      particlesRef.current.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.tiltAngle) * 0.5;
        p.tilt = Math.sin(p.tiltAngle - p.r/2) * 15;

        if (p.y <= canvas.height) {
          activeParticles++;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (activeParticles > 0) {
        animationFrameRef.current = requestAnimationFrame(drawParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    drawParticles();
  };

  // Perform Drawing Action
  const handlePerformDraw = () => {
    if (participants.length === 0) {
      alert("Nenhum participante cadastrado no sorteio!");
      return;
    }
    if (isDrawing) return;

    setIsDrawing(true);
    setDrawWinner(null);
    
    // Clear old animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    let iterations = 0;
    const maxIterations = 35;
    let intervalTime = 50;

    const runRoulette = () => {
      const tempWinnerIndex = Math.floor(Math.random() * participants.length);
      const tempWinner = participants[tempWinnerIndex];
      setSpinningCode(tempWinner.code + ` - ${tempWinner.name.split(" ")[0].toUpperCase()}`);
      playSound("tick");

      iterations++;
      if (iterations < maxIterations) {
        // Slow down gradually
        if (iterations > 20) {
          intervalTime += 15;
        }
        if (iterations > 28) {
          intervalTime += 35;
        }
        setTimeout(runRoulette, intervalTime);
      } else {
        // We reached the final winner
        const winner = participants[tempWinnerIndex];
        setDrawWinner(winner);
        setSpinningCode(winner.code);
        setIsDrawing(false);
        playSound("win");
        setTimeout(initConfetti, 100);

        // Add to winners list
        const newWinner: Winner = {
          id: "win-" + Date.now(),
          name: winner.name,
          phone: winner.phone,
          orderNumber: winner.orderNumber,
          code: winner.code,
          drawDate: new Date().toLocaleDateString("pt-BR"),
          prize: prizeName
        };

        const updatedWinners = [newWinner, ...winners];
        setWinners(updatedWinners);
        localStorage.setItem("somadeiras_giveaway_winners", JSON.stringify(updatedWinners));

        addSystemNotification(`🏆 Ganhador sorteado: ${winner.name} (${winner.code})!`);
      }
    };

    setTimeout(runRoulette, intervalTime);
  };

  // Admin Unlock validation
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (password === "somadeiras2026" || password === "admin123") {
      setIsAdminUnlocked(true);
      setPassword("");
    } else {
      setPasswordError("Senha incorreta. Tente novamente.");
    }
  };

  const handleClearParticipants = () => {
    if (window.confirm("Deseja deletar TODOS os participantes deste sorteio? Esta ação não pode ser desfeita.")) {
      setParticipants([]);
      localStorage.removeItem("somadeiras_giveaway_participants");
      addSystemNotification("🗑️ Todos os participantes foram removidos.");
    }
  };

  const handleClearWinners = () => {
    if (window.confirm("Deseja deletar o histórico de ganhadores?")) {
      setWinners([]);
      localStorage.removeItem("somadeiras_giveaway_winners");
      addSystemNotification("🗑️ Histórico de ganhadores limpo.");
    }
  };

  if (!mounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#3E2723] text-[#F4B400]">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#F4B400] border-t-transparent mx-auto" />
          <p className="font-display font-black text-sm uppercase tracking-wider">Iniciando Sorteador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Dynamic Confetti Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />

      {/* HEADER SECTION */}
      <header className="bg-[#3E2723] text-white border-b border-[#F4B400]/25 shadow-md sticky top-0 z-40">
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
                <Gift className="h-5 w-5 text-[#F4B400] animate-bounce" />
                <h1 className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white">
                  SORTEIO DO MÊS - SÓ MADEIRAS
                </h1>
              </div>
              <p className="text-[10px] text-stone-300 tracking-wider font-semibold">PARTICIPE COM SEU PEDIDO</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="text-stone-300 hover:text-[#F4B400] transition text-[11px] font-bold flex items-center gap-1 cursor-pointer bg-white/5 px-3 py-1.5 rounded-lg border border-white/15"
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Modo Sorteador</span>
            </button>
            <span className="bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider">
              Vale R$ 500
            </span>
          </div>
        </div>
      </header>

      {/* SYSTEM NOTIFICATION OVERLAY */}
      {systemNotification && (
        <div className="fixed bottom-6 right-6 bg-[#3E2723] border border-[#F4B400] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <Sparkles className="h-4 w-4 text-[#F4B400]" />
          <span>{systemNotification}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        
        {/* ADMIN CONTROL PANEL PANEL */}
        {showAdmin && (
          <section className="bg-amber-50 dark:bg-zinc-900/60 border border-amber-200 dark:border-amber-950/40 rounded-3xl p-6 shadow-md transition-all space-y-6">
            <div className="flex justify-between items-center border-b border-amber-200 dark:border-amber-950/40 pb-3">
              <h3 className="font-display font-black text-xs uppercase tracking-wider text-[#3E2723] dark:text-[#F4B400] flex items-center gap-2">
                🔒 Painel do Sorteador (Controle Administrativo)
              </h3>
              <button 
                onClick={() => { setShowAdmin(false); setIsAdminUnlocked(false); }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold bg-transparent border-none cursor-pointer"
              >
                Fechar Painel
              </button>
            </div>

            {!isAdminUnlocked ? (
              /* Password unlock form */
              <form onSubmit={handleUnlockAdmin} className="max-w-md mx-auto py-6 text-center space-y-4">
                <Lock className="h-10 w-10 text-[#3E2723] dark:text-[#F4B400] mx-auto opacity-75" />
                <div>
                  <h4 className="font-bold text-xs">Área Restrita aos Vendedores/Admin</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Insira a senha cadastrada para realizar o sorteio e controlar a campanha.</p>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <input
                    type="password"
                    required
                    placeholder="Digite a senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white w-48 text-center"
                  />
                  <button
                    type="submit"
                    className="bg-[#3E2723] hover:bg-[#2C1A18] text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm transition cursor-pointer border-none"
                  >
                    Acessar
                  </button>
                </div>
                {passwordError && <p className="text-[10px] font-black text-red-500">{passwordError}</p>}
                <p className="text-[9px] text-slate-400 font-mono italic">Dica local: use "admin123" ou "somadeiras2026"</p>
              </form>
            ) : (
              /* Admin features */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Toggle Activation Campaign */}
                  <div className="bg-white dark:bg-neutral-850 p-4.5 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xs space-y-3">
                    <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block">Status da Campanha</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCampaignActive(!active)}
                        className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 focus:outline-none relative cursor-pointer border-none ${
                          active ? "bg-emerald-500" : "bg-slate-350"
                        }`}
                      >
                        <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ${active ? "translate-x-5.5" : "translate-x-0"}`} />
                      </button>
                      <span className="text-xs font-black uppercase text-slate-700 dark:text-stone-300">
                        {active ? "🟢 Ativo na Home" : "🔴 Desligado na Home"}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal">Se desligado, todos os badges e links do sorteio são ocultados na página inicial do site.</p>
                  </div>

                  {/* Draw settings config */}
                  <div className="bg-white dark:bg-neutral-850 p-4.5 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xs space-y-2">
                    <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block">Prêmio Ativo</span>
                    <input
                      type="text"
                      value={prizeName}
                      onChange={(e) => setPrizeName(e.target.value)}
                      placeholder="Prêmio do sorteio..."
                      className="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-405 font-medium">Som suspensivo:</span>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`text-[9px] font-black uppercase bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded cursor-pointer ${soundEnabled ? "text-[#F4B400]" : "text-slate-400"}`}
                      >
                        {soundEnabled ? "Ligado 🔊" : "Mudo 🔇"}
                      </button>
                    </div>
                  </div>

                  {/* Participants total count */}
                  <div className="bg-white dark:bg-neutral-850 p-4.5 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-2xs flex flex-col justify-between">
                    <div>
                      <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest block">Total de Cupons</span>
                      <span className="font-display font-black text-2xl text-[#3E2723] dark:text-[#F4B400]">{participants.length} participantes</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleClearParticipants}
                        className="text-red-500 hover:text-red-700 font-bold text-[9px] uppercase cursor-pointer bg-transparent border-none"
                      >
                        Limpar Cupons
                      </button>
                      <span className="text-slate-300">|</span>
                      <button 
                        onClick={handleClearWinners}
                        className="text-red-500 hover:text-red-700 font-bold text-[9px] uppercase cursor-pointer bg-transparent border-none"
                      >
                        Limpar Ganhadores
                      </button>
                    </div>
                  </div>
                </div>

                {/* THE ROULETTE DRAW DISPLAY */}
                <div className="bg-[#3E2723] text-white border border-[#F4B400]/25 rounded-3xl p-6 shadow-lg text-center space-y-5">
                  <div className="space-y-1">
                    <span className="bg-[#F4B400] text-[#3E2723] font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-wider">
                      ROULETA DIGITAL SÓ MADEIRAS
                    </span>
                    <h4 className="font-display font-black text-sm uppercase text-stone-300">Realizar Sorteio Aleatório</h4>
                  </div>

                  {/* spinning window */}
                  <div className="bg-black/45 border-2 border-[#F4B400] rounded-2xl py-8 max-w-md mx-auto shadow-inner relative overflow-hidden flex items-center justify-center min-h-[90px]">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#3E2723]/80 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#3E2723]/80 to-transparent pointer-events-none" />
                    
                    <span className={`font-mono font-black text-2xl md:text-3xl tracking-widest block transition duration-75 ${
                      isDrawing ? "text-[#F4B400] animate-pulse" : "text-white"
                    }`}>
                      {spinningCode}
                    </span>
                  </div>

                  {/* Draw button */}
                  <div>
                    <button
                      onClick={handlePerformDraw}
                      disabled={isDrawing || participants.length === 0}
                      className={`font-black text-xs px-8 py-3.5 rounded-xl shadow-lg transition active:scale-95 cursor-pointer uppercase tracking-wider flex items-center gap-2 mx-auto border-none ${
                        isDrawing || participants.length === 0
                          ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                          : "bg-[#F4B400] hover:bg-[#ffd149] text-brown-dark"
                      }`}
                    >
                      {isDrawing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-brown-dark border-t-transparent rounded-full animate-spin" />
                          Sorteando...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current" /> Girar Roleta
                        </>
                      )}
                    </button>
                    {participants.length === 0 && (
                      <p className="text-[10px] text-amber-300 mt-2">⚠️ Adicione participantes antes de realizar o sorteio.</p>
                    )}
                  </div>

                  {/* WINNER OVERLAY POPUP */}
                  {drawWinner && (
                    <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-5 rounded-2xl text-brown-dark dark:text-white max-w-sm mx-auto shadow-2xl animate-[fadeIn_0.3s_ease-out_forwards] space-y-3">
                      <div className="flex justify-center text-[#F4B400]">
                        <Trophy className="h-10 w-10 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                          Cupom Premiado!
                        </span>
                        <h5 className="font-display font-black text-lg text-brown-dark dark:text-[#F4B400] uppercase mt-1">
                          {drawWinner.name}
                        </h5>
                        <p className="text-[11px] text-slate-550 dark:text-stone-300 font-bold">
                          Pedido: #{drawWinner.orderNumber} | WhatsApp: {drawWinner.phone}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Cupom gerado em {new Date(drawWinner.date).toLocaleDateString("pt-BR")}</p>
                      </div>

                      <div className="bg-slate-50 dark:bg-neutral-850 p-2.5 rounded-xl border border-slate-150 dark:border-neutral-800 text-[10px] font-bold text-center">
                        🏆 Prêmio: {prizeName}
                      </div>

                      <button
                        onClick={() => {
                          const waText = `Parabéns ${drawWinner.name}! Você foi o grande vencedor do sorteio Só Madeiras com o cupom *${drawWinner.code}* do pedido #${drawWinner.orderNumber}! Entre em contato conosco para retirar seu prêmio: ${prizeName}!`;
                          window.open(`https://api.whatsapp.com/send?phone=${drawWinner.phone}&text=${encodeURIComponent(waText)}`, "_blank");
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider border-none shadow"
                      >
                        <Phone className="h-3.5 w-3.5" /> Enviar Mensagem de Vitória
                      </button>
                    </div>
                  )}
                </div>

                {/* PARTICIPANTS GRID TABLE FOR AUDITING */}
                {participants.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-slate-450 dark:text-stone-400 uppercase tracking-widest">
                      📋 Lista Auditável de Participantes Cadastrados
                    </h4>
                    <div className="bg-white dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xs max-h-60 overflow-y-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-neutral-800 text-slate-450 dark:text-stone-400 font-bold uppercase text-[8px] tracking-wider border-b border-slate-150 dark:border-neutral-750">
                            <th className="py-2.5 px-4">Nome</th>
                            <th className="py-2.5 px-4">Cupom</th>
                            <th className="py-2.5 px-4">Pedido</th>
                            <th className="py-2.5 px-4 text-right">Valor</th>
                            <th className="py-2.5 px-4 text-center">Data</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-neutral-800 text-[10px] font-medium text-slate-650 dark:text-stone-300">
                          {participants.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/30">
                              <td className="py-2 px-4 font-bold text-slate-800 dark:text-white">{p.name}</td>
                              <td className="py-2 px-4 font-mono font-black text-brown-medium dark:text-[#F4B400]">{p.code}</td>
                              <td className="py-2 px-4 font-mono">#{p.orderNumber}</td>
                              <td className="py-2 px-4 text-right font-semibold">R$ {p.orderValue.toFixed(2)}</td>
                              <td className="py-2 px-4 text-center text-slate-400">{new Date(p.date).toLocaleDateString("pt-BR")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* PROMO HERO CARD */}
        <section className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#F4B400]/10 dark:bg-[#F4B400]/5 w-80 h-80 rounded-full blur-3xl -z-10" />
          
          <div className="space-y-4 max-w-lg">
            <span className="bg-[#F4B400]/20 text-[#3E2723] dark:text-[#F4B400] border border-[#F4B400]/40 font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              🍀 Sorteio Só Madeiras Premium
            </span>
            
            <h2 className="font-display font-black text-2xl md:text-4xl uppercase leading-tight">
              Sua Compra Vale <span className="text-[#F4B400] dark:text-[#ffd149] block sm:inline">R$ 500 em Prêmios</span>
            </h2>
            <div className="h-1.5 bg-[#F4B400] w-20 rounded-full" />
            
            <p className="text-xs md:text-sm text-stone-550 dark:text-stone-400 font-light leading-relaxed">
              Você comprou materiais para sua obra na Só Madeiras este mês? Não perca a chance! Cadastre o código do seu pedido (contido no recibo de venda do WhatsApp ou Nota Fiscal) e gere seu cupom da sorte. O sorteio é realizado diretamente nesta página pelo site!
            </p>

            <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wide pt-1">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> Sorteio Transparente</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> Bilhetes Exclusivos</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-500" /> Direto no WhatsApp</span>
            </div>
          </div>

          {/* Giveaway Cupom Graphic representation */}
          <div className="bg-amber-500/10 dark:bg-amber-500/5 border-2 border-dashed border-[#F4B400] rounded-2xl p-6 text-center w-full max-w-[280px] shrink-0 space-y-4 shadow relative">
            <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-slate-50 dark:bg-neutral-950 rounded-full border-r-2 border-dashed border-[#F4B400] pointer-events-none" />
            <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-slate-50 dark:bg-neutral-950 rounded-full border-l-2 border-dashed border-[#F4B400] pointer-events-none" />
            
            <Gift className="h-8 w-8 text-[#F4B400] mx-auto animate-bounce" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Prêmio deste Mês</span>
              <span className="font-display font-black text-base text-[#3E2723] dark:text-[#F4B400] block uppercase tracking-wide mt-1">
                {prizeName}
              </span>
            </div>
            <div className="border-t border-[#F4B400]/40 pt-3 flex justify-between text-[9px] font-semibold text-slate-400 dark:text-stone-300 uppercase">
              <span>Sorteio: Mensal</span>
              <span>1 Cupom por Pedido</span>
            </div>
          </div>
        </section>

        {/* IF CAMPAIGN INACTIVE CHECK */}
        {!active ? (
          <section className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-10 text-center space-y-4 shadow-sm">
            <Gift className="h-14 w-14 text-slate-400 mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="font-display font-black text-lg md:text-xl uppercase">Nenhum Sorteio Ativo no Momento</h3>
              <p className="text-xs text-slate-450 max-w-md mx-auto">Nossas campanhas promocionais de sorteios estão temporariamente inativas. Acompanhe nossas novidades pelas redes sociais ou consulte seu vendedor no WhatsApp!</p>
            </div>
            <Link 
              href="/" 
              className="inline-block bg-[#3E2723] hover:bg-[#2C1A18] text-[#F4B400] font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition uppercase tracking-wider"
            >
              Voltar para a Página Inicial
            </Link>
          </section>
        ) : (
          /* ACTIVE FORMS AND TICKET AND RESULTS VIEW */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* REGISTRATION FORM COLUMN */}
            <section className="md:col-span-6 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-100 dark:border-neutral-800 pb-2">
                <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                  ✍️ Registrar Participação
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Cadastre seus dados e o número do seu recibo de compra</p>
              </div>

              <form onSubmit={handleRegisterParticipant} className="space-y-4.5 text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" /> Nome Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" /> WhatsApp / Contato:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 79 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                  />
                </div>

                {/* Order Number & Order Value */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider flex items-center gap-1">
                      <Hash className="h-3.5 w-3.5 text-slate-400" /> Nº do Pedido:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 10482"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Valor do Pedido (R$):
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 450"
                      value={orderValue}
                      onChange={(e) => setOrderValue(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-850 border border-slate-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#F4B400] text-xs font-bold text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {formError && <p className="text-[10px] font-black text-red-500">{formError}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#3E2723] hover:bg-[#2C1A18] text-white font-black text-xs py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer border-none"
                >
                  <Gift className="h-4.5 w-4.5 text-[#F4B400]" /> Gerar Cupom Promocional
                </button>
              </form>
            </section>

            {/* GENERATED TICKET AND INSTRUCTIONS COLUMN */}
            <section className="md:col-span-6 space-y-6">
              
              {/* CURRENT REGISTERED CUPOM VISUAL DISPLAY */}
              {registeredCupom ? (
                <div className="bg-[#5D4037]/10 dark:bg-[#5D4037]/5 border border-dashed border-[#5D4037] dark:border-[#F4B400]/40 rounded-3xl p-6 text-center space-y-4 relative animate-[fadeIn_0.3s_ease-out_forwards]">
                  {/* Punch holes in ticket */}
                  <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-slate-50 dark:bg-neutral-950 rounded-full border-r border-dashed border-[#5D4037] dark:border-[#F4B400]/40 pointer-events-none" />
                  <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-slate-50 dark:bg-neutral-950 rounded-full border-l border-dashed border-[#5D4037] dark:border-[#F4B400]/40 pointer-events-none" />

                  <div className="flex justify-between items-center">
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-600 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      Bilhete Confirmado!
                    </span>
                    <button 
                      onClick={() => setRegisteredCupom(null)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold bg-transparent border-none cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">CÓDIGO DO BILHETE</span>
                    <h3 className="font-mono font-black text-3xl text-brown-dark dark:text-[#F4B400] tracking-wider select-all">
                      {registeredCupom.code}
                    </h3>
                  </div>

                  <div className="border-t border-slate-200 dark:border-neutral-800/80 pt-4 text-xs font-bold text-slate-650 dark:text-stone-300 space-y-2">
                    <div className="flex justify-between">
                      <span>Nome:</span>
                      <span className="text-slate-800 dark:text-white font-black">{registeredCupom.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nº Pedido:</span>
                      <span className="text-slate-800 dark:text-white font-mono">#{registeredCupom.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span className="text-slate-800 dark:text-white font-mono">{new Date(registeredCupom.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(registeredCupom.code);
                        alert("Código do cupom copiado!");
                      }}
                      className="flex-1 bg-white hover:bg-slate-50 text-[#3E2723] border border-slate-200 dark:border-neutral-800 font-bold text-[10px] py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-2xs"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copiar Código
                    </button>
                    
                    <button
                      onClick={() => {
                        const winText = `🍀 Meu bilhete do Sorteio Só Madeiras:\n🏷️ Código: *${registeredCupom.code}*\n🚪 Pedido: #${registeredCupom.orderNumber}\n👤 Nome: ${registeredCupom.name}\nCadastrado com sucesso no site!`;
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(winText)}`, "_blank");
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow"
                    >
                      <Share2 className="h-3.5 w-3.5" /> Compartilhar
                    </button>
                  </div>
                </div>
              ) : (
                /* INSTRUCTIONS GRAPHIC */
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 dark:border-neutral-800 pb-2">
                    <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                      💡 Como Funciona o Sorteio?
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-medium text-slate-650 dark:text-stone-300">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center font-black shrink-0 text-[10px]">1</div>
                      <p className="leading-relaxed">**Compre seus materiais:** realize compras de qualquer valor na Só Madeiras em Estância/SE ou região.</p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center font-black shrink-0 text-[10px]">2</div>
                      <p className="leading-relaxed">**Gere seu Cupom:** preencha o formulário informando o número do pedido e seus dados de WhatsApp.</p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3E2723] text-white flex items-center justify-center font-black shrink-0 text-[10px]">3</div>
                      <p className="leading-relaxed">**Acompanhe o Resultado:** a equipe da Só Madeiras realiza o sorteio ao vivo e o nome e bilhete sorteados aparecem destacados na tabela de ganhadores abaixo.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-neutral-850 p-4 rounded-xl border border-slate-150 dark:border-neutral-800 text-[10px] leading-relaxed">
                      ⚠️ **Nota:** Mantenha seus dados corretos. Caso seu cupom seja sorteado, nossa equipe de vendas entrará em contato direto pelo WhatsApp cadastrado para enviar o prêmio. Cada pedido dá direito a 1 participação.
                    </div>
                  </div>
                </div>
              )}

              {/* LIST OF PAST WINNERS (HISTÓRICO) */}
              <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4">
                <h3 className="font-display font-black text-sm uppercase text-[#3E2723] dark:text-white flex items-center gap-2">
                  🏆 Ganhadores de Sorteios Anteriores
                </h3>
                
                {winners.length === 0 ? (
                  <p className="text-center py-6 text-[11px] text-slate-400 font-light">
                    Nenhum sorteio realizado ainda nesta campanha. Seja o primeiro!
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {winners.map((win) => (
                      <div 
                        key={win.id}
                        className="bg-emerald-500/5 border border-emerald-500/25 p-3 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <span className="font-black text-xs text-slate-800 dark:text-white block uppercase">
                            👑 {win.name.split(" ")[0]} ({win.code})
                          </span>
                          <span className="text-[10px] text-[#F4B400] font-bold block">
                            🎁 Prêmio: {win.prize}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-light">
                            Draw em {win.drawDate} | Pedido #{win.orderNumber}
                          </span>
                        </div>
                        
                        <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-400 font-mono font-black text-[9px] px-2 py-0.5 rounded shadow-3xs uppercase">
                          Premiado
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </section>
            
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#3E2723] text-white border-t border-[#F4B400]/20 py-8 px-6 mt-16 text-center select-none text-xs">
        <p className="font-display font-black text-sm text-[#F4B400] tracking-wider uppercase">SÓ MADEIRAS ESTÂNCIA-SE</p>
        <p className="text-stone-300 font-light mt-1">Sorteios promovidos em conformidade com as regras promocionais Só Madeiras.</p>
        <p className="text-stone-400 text-[10px] font-mono mt-6">© {new Date().getFullYear()} SÓ MADEIRAS. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
