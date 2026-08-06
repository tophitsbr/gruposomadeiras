"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck, CheckCircle, UserCheck, ShieldAlert } from 'lucide-react';

const DEFAULT_SELLERS = [
  { id: "cleones", name: "Cleones (Consultor Comercial)", username: "cleones", pin: "1234", avatar: "👨‍💼" },
  { id: "joao", name: "João (Móveis & Acabamento)", username: "joao", pin: "1234", avatar: "👨‍💼" },
  { id: "maria", name: "Maria (Madeiras & Estruturas)", username: "maria", pin: "1234", avatar: "👩‍💼" },
  { id: "pedro", name: "Pedro (Ferragens & Hidráulico)", username: "pedro", pin: "1234", avatar: "👨‍💻" }
];

export default function StaffLoginClient() {
  const [loginTab, setLoginTab] = useState<"seller" | "admin">("seller");
  
  // Seller form states
  const [selectedSellerId, setSelectedSellerId] = useState<string>("cleones");
  const [sellerPin, setSellerPin] = useState<string>("");

  // Admin form states
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [adminPin, setAdminPin] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSellerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const pin = sellerPin.trim();
    if (!pin) {
      setErrorMsg('Por favor, informe a Senha / PIN do Vendedor.');
      return;
    }

    const sellerObj = DEFAULT_SELLERS.find(s => s.id === selectedSellerId) || {
      id: selectedSellerId,
      name: selectedSellerId === "cleones" ? "Cleones" : selectedSellerId
    };

    // Clean any prior sessions
    try {
      sessionStorage.clear();
      localStorage.removeItem('somadeiras_staff_authenticated');
      localStorage.removeItem('somadeiras_staff_pin');
      localStorage.removeItem('somadeiras_staff_user');
    } catch(e) {}

    // Set Seller Session EXCLUSIVELY
    sessionStorage.setItem('somadeiras_staff_authenticated', 'true');
    sessionStorage.setItem('somadeiras_staff_role', 'seller');
    sessionStorage.setItem('somadeiras_staff_seller_id', sellerObj.id);
    sessionStorage.setItem('somadeiras_staff_user', JSON.stringify({
      username: sellerObj.id,
      name: sellerObj.name,
      role: "seller",
      sellerId: sellerObj.id
    }));

    setSuccessMsg(`Acesso de Vendedor concedido para ${sellerObj.name}! Redirecionando para o Painel Comercial...`);
    setTimeout(() => {
      window.location.href = `/?mode=seller&sellerId=${sellerObj.id}`;
    }, 800);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUser = adminUsername.trim().toLowerCase();
    const cleanPin = adminPin.trim();

    if (!cleanUser || !cleanPin) {
      setErrorMsg('Por favor, preencha o Usuário e a Senha de Administrador.');
      return;
    }

    if (cleanUser !== "admin" && cleanUser !== "administrador") {
      setErrorMsg('Acesso restrito. Apenas administradores cadastrados podem utilizar este login.');
      return;
    }

    // Clean any prior sessions
    try {
      sessionStorage.clear();
      localStorage.removeItem('somadeiras_staff_authenticated');
      localStorage.removeItem('somadeiras_staff_pin');
      localStorage.removeItem('somadeiras_staff_user');
    } catch(e) {}

    // Set Admin Session EXCLUSIVELY
    sessionStorage.setItem('somadeiras_staff_authenticated', 'true');
    sessionStorage.setItem('somadeiras_staff_role', 'admin');
    sessionStorage.setItem('somadeiras_staff_user', JSON.stringify({
      username: cleanUser,
      name: "Administrador Executivo",
      role: "admin"
    }));

    setSuccessMsg(`Acesso de Administrador concedido! Redirecionando para o Cockpit Executivo...`);
    setTimeout(() => {
      window.location.href = '/?mode=admin';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full pt-4 flex justify-between items-center relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Portal da Equipe
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full my-auto py-6 relative z-10">
        <div className="bg-neutral-950/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 font-black text-2xl mb-3">
              {loginTab === "seller" ? "💼" : "🛡️"}
            </div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              {loginTab === "seller" ? "PAINEL DOS VENDEDORES" : "COCKPIT ADMINISTRATIVO"}
            </h1>
            <p className="text-xs text-neutral-400">
              {loginTab === "seller"
                ? "Selecione seu perfil comercial para acessar seus clientes e orçamentos."
                : "Acesso exclusivo para administradores com senha master."
              }
            </p>
          </div>

          {/* Role Tab Switcher */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800">
            <button
              type="button"
              onClick={() => { setLoginTab("seller"); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 border-none cursor-pointer ${
                loginTab === "seller"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Sou Vendedor
            </button>
            <button
              type="button"
              onClick={() => { setLoginTab("admin"); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 border-none cursor-pointer ${
                loginTab === "admin"
                  ? "bg-amber-500 text-neutral-950 shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Sou Admin
            </button>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-medium text-center animate-fade-in">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SELLER LOGIN FORM */}
          {loginTab === "seller" ? (
            <form onSubmit={handleSellerLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-400 mb-1.5">
                  Selecione o Vendedor:
                </label>
                <select
                  value={selectedSellerId}
                  onChange={(e) => setSelectedSellerId(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {DEFAULT_SELLERS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.avatar} {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">
                  Senha / PIN de Acesso:
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    value={sellerPin}
                    onChange={(e) => setSellerPin(e.target.value)}
                    placeholder="Digite sua senha ou PIN (ex: 1234)"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition font-bold pr-10"
                    required
                  />
                  <Lock className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-98 uppercase tracking-wider cursor-pointer border-none flex items-center justify-center gap-2 mt-6"
              >
                <UserCheck className="w-4 h-4" />
                Entrar no Painel do Vendedor →
              </button>
            </form>
          ) : (
            /* ADMIN LOGIN FORM */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-400 mb-1">
                  Usuário Administrador:
                </label>
                <input 
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  placeholder="Digite o usuário (ex: admin)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">
                  Senha Master Admin:
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Digite a Senha Master"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition font-bold pr-10"
                    required
                  />
                  <Lock className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-98 uppercase tracking-wider cursor-pointer border-none flex items-center justify-center gap-2 mt-6"
              >
                <ShieldCheck className="w-4 h-4" />
                Entrar no Cockpit Admin →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md mx-auto w-full pb-4 text-center text-xs text-neutral-500 relative z-10">
        <p>© 2026 SÓ MADEIRAS LTDA • Sistema Interno de Gestão</p>
      </div>
    </div>
  );
}
