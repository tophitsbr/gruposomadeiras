'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, UploadCloud, Building2, User, Phone, Briefcase, Camera } from 'lucide-react';
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
    
    // Simulate API call to save the lead/professional data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
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
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-10 text-center border border-neutral-100">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 mb-4">Cadastro Recebido!</h1>
            <p className="text-lg text-neutral-600 mb-8">
              Seu perfil foi enviado com sucesso e está em análise pela equipe da Só Madeiras. Em breve, entraremos em contato no seu WhatsApp para validar os dados e ativar seu perfil na nossa vitrine.
            </p>
            <Link 
              href="/profissionais"
              className="block w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Ver profissionais cadastrados
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
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
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-neutral-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Foto de Perfil */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-neutral-100 border-4 border-white shadow-lg mb-4 flex items-center justify-center">
                {profilePreview ? (
                  <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-neutral-300" />
                )}
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
              >
                Escolher Foto de Perfil
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                className="hidden"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Nome ou Nome da Empresa</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input type="text" required className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors" placeholder="João Silva Reformas" />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">WhatsApp para Contato</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input type="tel" required className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors" placeholder="(79) 99999-9999" />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Profissão / Categoria</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <select required className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors appearance-none">
                    <option value="" disabled selected>Selecione a profissão...</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Cidade de Atuação</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <select required className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors appearance-none">
                    <option value="" disabled selected>Selecione a cidade...</option>
                    {sergipeCities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Experiência */}
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Anos de Experiência</label>
              <input type="number" min="0" max="60" required className="w-full px-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors" placeholder="Ex: 5" />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Breve apresentação (Bio)</label>
              <textarea required rows={4} className="w-full px-4 py-3 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-colors resize-none" placeholder="Conte um pouco sobre seu trabalho, especialidades e diferenciais..."></textarea>
            </div>

            {/* File Upload Portfólio (Fake) */}
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Fotos de Trabalhos (Portfólio)</label>
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:bg-neutral-50 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600 font-medium mb-1">Clique para enviar fotos dos seus serviços</p>
                <p className="text-neutral-400 text-xs">JPG ou PNG (Máximo 5 fotos)</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando Cadastro...
                  </>
                ) : (
                  'Enviar para Aprovação'
                )}
              </button>
              <p className="text-center text-xs text-neutral-400 mt-4">
                Ao enviar, você concorda que seu perfil passará por uma análise de qualidade antes de ser publicado.
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
