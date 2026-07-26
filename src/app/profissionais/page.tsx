"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import ProfessionalCard from '../components/ProfessionalCard';
import { getProfessionalsByCity, getAvailableCities, categories } from './data';

export default function ProfissionaisPage() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [tempCity, setTempCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const sergipeCities = getAvailableCities();

  useEffect(() => {
    setIsMounted(true);
    const savedCity = localStorage.getItem('somadeiras_user_city');
    if (savedCity) {
      setUserCity(savedCity);
      setTempCity(savedCity);
    } else {
      setIsCityModalOpen(true);
    }
  }, []);

  const handleCitySelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCity) {
      setUserCity(tempCity);
      localStorage.setItem('somadeiras_user_city', tempCity);
      setIsCityModalOpen(false);
    }
  };

  const professionals = userCity ? getProfessionalsByCity(userCity) : [];

  const filteredProfessionals = professionals.filter((prof) => {
    if (selectedCategory === 'Todos') return true;
    return prof.category === selectedCategory;
  });

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 transition-colors">
      <Head>
        <title>Profissionais Parceiros | Soma Madeiras</title>
        <meta name="description" content="Encontre os melhores profissionais da construção e reforma." />
      </Head>

      {/* City Selection Modal */}
      {isCityModalOpen && (
        <div className="fixed inset-0 z-[100] bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-fade-in relative border border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500 rounded-t-2xl"></div>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-amber-100 dark:bg-amber-950/50 p-3 rounded-full text-amber-600 dark:text-amber-400 mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">De qual cidade você é?</h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Selecione sua cidade para encontrarmos os melhores profissionais na sua região.
              </p>
            </div>
            
            <form onSubmit={handleCitySelect}>
              <select 
                value={tempCity}
                onChange={(e) => setTempCity(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-xl mb-6 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
                required
              >
                <option value="" disabled>Selecione uma cidade...</option>
                {sergipeCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <button 
                type="submit"
                disabled={!tempCity}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Buscar Profissionais
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-neutral-900 text-white pt-8 pb-20 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto mb-8 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-medium self-start"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para o site
          </Link>
          
          {!isCityModalOpen && userCity && (
            <button 
              onClick={() => setIsCityModalOpen(true)}
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-bold cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              Exibindo: {userCity} (Alterar)
            </button>
          )}
        </div>
        
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-0" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Encontre os Melhores <span className="text-amber-500">Profissionais</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Conectamos você com especialistas qualificados em marcenaria, pintura, elétrica, alvenaria e muito mais, para realizar o seu projeto com excelência.
          </p>
        </div>
      </section>

      {/* Filtros e Listagem */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 -mt-8 relative z-20">
        
        {/* Categories Filter */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-4 mb-12 border border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === 'Todos' 
                ? 'bg-amber-500 text-white shadow-md' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Profissionais */}
        {!userCity ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Por favor, selecione sua cidade</h3>
          </div>
        ) : filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfessionals.map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 max-w-2xl mx-auto">
            <MapPin className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-3">Nenhum profissional em {userCity}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              Ainda não temos parceiros cadastrados nesta categoria em sua cidade. Mas estamos expandindo nossa rede!
            </p>
            <button 
              onClick={() => setIsCityModalOpen(true)}
              className="bg-neutral-900 dark:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-neutral-800 dark:hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Buscar em outra cidade
            </button>
          </div>
        )}

        {/* CTA Banner para Cadastro */}
        {userCity && (
          <div className="mt-20 bg-amber-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-4">É profissional da área?</h2>
              <p className="text-amber-50 text-lg mb-8">
                Aumente sua clientela sendo um parceiro da Só Madeiras! Cadastre seu portfólio gratuitamente e seja encontrado por centenas de clientes na sua cidade todos os meses.
              </p>
              <Link 
                href="/profissionais/cadastro"
                className="inline-block bg-neutral-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-neutral-800 hover:scale-105 transition-all"
              >
                Cadastre-se Gratuitamente
              </Link>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
