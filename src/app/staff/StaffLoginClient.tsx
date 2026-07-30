"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';

export default function StaffLoginClient() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !pin.trim()) {
      setErrorMsg('Por favor, preencha o Usuário e a Senha/PIN.');
      return;
    }

    // Set staff login session flag in sessionStorage
    sessionStorage.setItem('somadeiras_staff_authenticated', 'true');
    sessionStorage.setItem('somadeiras_staff_pin', pin);
    sessionStorage.setItem('somadeiras_staff_user', JSON.stringify({
      username: username.trim(),
      name: username.trim(),
      phone: "(79) 99629-8990"
    }));
    // Clean up persistent localStorage to ensure exit/logout requires re-login
    localStorage.removeItem('somadeiras_staff_authenticated');
    localStorage.removeItem('somadeiras_staff_pin');
    localStorage.removeItem('somadeiras_staff_user');
    
    setSuccessMsg(`Acesso concedido para @${username.trim()}! Redirecionando para o painel...`);
    setTimeout(() => {
      window.location.href = '/?mode=staff';
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
          Acesso Restrito
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full my-auto py-8 relative z-10">
        <div className="bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 font-black text-xl mb-3">
              🔐
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">
              PAINEL DA <span className="text-amber-500">EQUIPE & ADMIN</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Digite seu nome de usuário e senha de acesso.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-medium text-center animate-fade-in">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {successMsg}
            </div>
          )}

          {/* Staff Login Form (Usuário + Senha) */}
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">
                Nome de Usuário (Username):
              </label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                placeholder="Ex: vendedor.marcelo ou admin"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">
                Senha / PIN de Acesso:
              </label>
              <div className="relative">
                <input 
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Digite sua senha ou PIN (ex: 1234)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition font-bold pr-10"
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
              Entrar no Painel da Equipe
            </button>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md mx-auto w-full pb-4 text-center text-xs text-neutral-500 relative z-10">
        <p>© 2026 SÓ MADEIRAS LTDA • Sistema Interno de Gestão</p>
      </div>
    </div>
  );
}
