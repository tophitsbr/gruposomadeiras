'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Building2, User, Phone, Briefcase, Camera } from 'lucide-react';
import { categories, sergipeCities } from '../data';

export default function ProfessionalRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfilePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex flex-col">
        <Head>
          <title>Cadastro Enviado | Só Madeiras</title>
        </Head>
        
        <div className="bg-neutral-900 text-white py-6 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/profissionais" className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar para profissionais
            </Link>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white dark:bg-neutral-900 max-w-lg w-full rounded-3xl shadow-xl p-10 text-center border border-neutral-100 dark:border-neutral-800">
            <div className="bg-emerald-100 dark:bg-emerald-950/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-4">Cadastro Recebido!</h1>
            <p className="text-lg text-neutral-600 dark:text-stone-300 mb-8">
              Seu perfil foi enviado com sucesso e está em análise pela equipe da Só Madeiras. Em breve, entraremos em contato no seu WhatsApp para validar os dados e ativar seu perfil na nossa vitrine.
            </p>
            <Link 
              href="/profissionais"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
            >
              Ver profissionais cadastrados
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pb-20 transition-colors">
      <Head>
        <title>Seja um Parceiro | Só Madeiras</title>
      </Head>

      {/* Header Profile */}
      <div className="bg-neutral-900 text-white pt-8 pb-32 px-6 relative">
        <div className="max-w-4xl mx-auto mb-8 relative z-20">
          <Link 
            href="/profissionais" 
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para profissionais
          </Link>
        </div>
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Seja um Profissional Parceiro</h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Aumente sua clientela e dê visibilidade ao seu trabalho. Conectamos clientes que compram material com quem sabe executar o serviço.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Foto de Perfil */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-4 border-white dark:border-neutral-700 shadow-lg mb-4 flex items-center justify-center">
                {profilePreview ? (
                  <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-neutral-400" />
                )}
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-amber-600 dark:text-amber-400 font-bold hover:text-amber-700 transition-colors cursor-pointer"
              >
                Escolher Foto de Perfil
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-stone-300 mb-2">Nome ou Nome da Empresa</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input type="text" required className="w-full pl-12 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-colors" placeholder="João Silva Reformas" />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-stone-300 mb-2">WhatsApp para Contato</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input type="tel" required className="w-full pl-12 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-colors" placeholder="(79) 99999-9999" />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-stone-300 mb-2">Profissão / Categoria</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <select required className="w-full pl-12 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Selecione a profissão...</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-stone-300 mb-2">Cidade de Atuação</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <select required className="w-full pl-12 pr-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Selecione a cidade...</option>
                    {sergipeCities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-bold text-neutral-700 dark:text-stone-300 mb-2">Resumo da sua Experiência / Serviços</label>
              <textarea 
                rows={4}
                required
                className="w-full p-4 border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
                placeholder="Descreva os tipos de serviços que realiza, tempo de experiência e diferenciais..."
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-400 text-white font-extrabold py-4 px-8 rounded-xl shadow-lg transition-all text-lg cursor-pointer border-none uppercase"
            >
              {isSubmitting ? "Enviando Cadastro..." : "Enviar Cadastro Gratuitamente"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
