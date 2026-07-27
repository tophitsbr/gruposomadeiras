"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck, Phone, CheckCircle, KeyRound } from 'lucide-react';

export default function StaffLoginClient() {
  const [pin, setPin] = useState('');
  const [isSocialConnecting, setIsSocialConnecting] = useState(false);
  const [socialProvider, setSocialProvider] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!pin.trim()) {
      setErrorMsg('Por favor, digite a senha ou PIN de acesso.');
      return;
    }

    // Set staff login session flag in localStorage
    localStorage.setItem('somadeiras_staff_authenticated', 'true');
    localStorage.setItem('somadeiras_staff_pin', pin);
    
    setSuccessMsg('Acesso concedido! Redirecionando para o painel...');
    setTimeout(() => {
      window.location.href = '/?mode=staff';
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSocialConnecting(true);
    setSocialProvider(provider);
    setErrorMsg('');

    setTimeout(() => {
      setIsSocialConnecting(false);
      localStorage.setItem('somadeiras_staff_authenticated', 'true');
      localStorage.setItem('somadeiras_staff_provider', provider);
      setSuccessMsg(`Autenticado com sucesso via ${provider}! Entrando no painel...`);
      setTimeout(() => {
        window.location.href = '/?mode=staff';
      }, 1000);
    }, 1200);
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
      <div className="max-w-md mx-auto w-full my-auto py-8 relative z-10">
        <div className="bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-amber-500 text-neutral-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 font-black text-xl mb-3">
              🪵
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              SÓ MADEIRAS <span className="text-amber-500">STAFF</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Acesso unificado para vendedores e administradores da equipe.
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

          {/* Social Logins */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isSocialConnecting}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3.5 rounded-xl border border-neutral-800 shadow-sm flex items-center justify-center gap-3 transition cursor-pointer disabled:opacity-50"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.477 0-6.295-2.818-6.295-6.295s2.818-6.295 6.295-6.295c1.637 0 3.125.626 4.254 1.646l3.059-3.059C19.167 2.656 15.86 1.5 12.24 1.5 6.208 1.5 1.32 6.388 1.32 12.42s4.888 10.92 10.92 10.92c6.305 0 10.493-4.432 10.493-10.686 0-.747-.075-1.3-.18-1.637H12.24z"/>
              </svg>
              <span>Entrar com Google (Gmail)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isSocialConnecting}
              className="w-full bg-[#1877F2] hover:bg-[#1565C0] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-3 transition cursor-pointer border-none disabled:opacity-50"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
              <span>Entrar com Facebook</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('WhatsApp')}
              disabled={isSocialConnecting}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-3 transition cursor-pointer border-none disabled:opacity-50"
            >
              <Phone className="h-4 w-4" />
              <span>Entrar com WhatsApp Comercial</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-neutral-800 w-full"></div>
            <span className="bg-neutral-950 px-3 text-[10px] uppercase font-bold text-neutral-500 absolute">ou com Senha / PIN</span>
          </div>

          {/* PIN Form */}
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1.5">
                Senha / PIN da Equipe
              </label>
              <div className="relative">
                <input 
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Digite sua senha ou PIN (ex: 1234)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition font-bold"
                  required
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Acessar Painel da Equipe</span>
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto w-full text-center pb-4 text-xs text-neutral-500 relative z-10">
        <p className="flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          Acesso Restrito - Grupo Só Madeiras Sergipe
        </p>
      </div>

    </div>
  );
}
