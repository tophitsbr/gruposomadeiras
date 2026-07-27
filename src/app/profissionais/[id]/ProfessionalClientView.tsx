"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Layers, 
  X, 
  Calculator, 
  PackageCheck,
  Star
} from 'lucide-react';
import { Professional, Project } from '../data';
import ReviewSection from '../../components/ReviewSection';

interface ProfessionalClientViewProps {
  professional: Professional;
}

const MATERIAL_OPTIONS = [
  'Eucalipto Tratado Roliço (8-10cm / 10-12cm / 12-14cm)',
  'Postes de Eucalipto Autoclavado para Cerca ou Galpão',
  'Mourões de Eucalipto Tratado',
  'Vigamentos de Maçaranduba / Angelim',
  'Tábuas de Deck Cumaru / Ipê',
  'Kit Porta Pivotante Maciça Completo',
  'Portas Semiocas / Internas',
  'Forro PVC Imitação Madeira',
  'Telhas Cerâmicas ou Fibrocimento',
  'Verniz Marítimo Duplo Filtro Solar / Stain'
];

export default function ProfessionalClientView({ professional }: ProfessionalClientViewProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [serviceType, setServiceType] = useState(professional.skills[0] || 'Serviço Geral');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [clientCity, setClientCity] = useState(professional.city);
  const [clientNotes, setClientNotes] = useState('');

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleSendCombinedQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const materialsList = selectedMaterials.length > 0 
      ? selectedMaterials.map(m => `• ${m}`).join('\n') 
      : '• A definir com o representante Só Madeiras';

    const text = `Olá ${professional.name}! Encontrei seu perfil no site da *Só Madeiras*.\n\n` +
      `📌 *SOLICITAÇÃO DE ORÇAMENTO COMBINADO*\n` +
      `🛠️ *Serviço:* ${serviceType}\n` +
      `📍 *Cidade da Obra:* ${clientCity}\n\n` +
      `🪵 *Materiais de Interesse (Só Madeiras):*\n${materialsList}\n\n` +
      (clientNotes ? `📝 *Observações:* ${clientNotes}\n\n` : '') +
      `Gostaria de combinar a cotação da mão de obra com os materiais da Só Madeiras!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${professional.phone}?text=${encoded}`, '_blank');
    setIsQuoteModalOpen(false);
  };

  const renderBadge = () => {
    switch (professional.verificationTier) {
      case 'destaque':
        return (
          <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md animate-pulse">
            <Sparkles className="w-4 h-4" />
            Destaque da Região (Top Rated)
          </div>
        );
      case 'ouro':
        return (
          <div className="inline-flex items-center gap-1.5 bg-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
            <Award className="w-4 h-4" />
            Parceiro Ouro Só Madeiras
          </div>
        );
      case 'verificado':
      default:
        return (
          <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
            <ShieldCheck className="w-4 h-4" />
            Parceiro Verificado
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pb-20 transition-colors">
      
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white pt-8 pb-32 px-6 relative">
        <div className="max-w-6xl mx-auto mb-8 relative z-20">
          <Link 
            href="/profissionais" 
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a lista de profissionais
          </Link>
        </div>
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 -mt-24 relative z-10">
        
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-neutral-100 dark:border-neutral-800 mb-12 flex flex-col md:flex-row gap-8 items-start text-neutral-900 dark:text-white">
          <div className="shrink-0 relative">
            <img 
              src={professional.profileImage} 
              alt={professional.name} 
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-neutral-800"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-extrabold shadow-md whitespace-nowrap uppercase tracking-wider">
              {professional.category}
            </div>
          </div>
          
          <div className="flex-grow pt-2 sm:pt-4">
            <div className="mb-3">
              {renderBadge()}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
              {professional.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-4 h-4 text-amber-500" />
                {professional.city} - Sergipe
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                {professional.rating.toFixed(1)} ({professional.reviewsCount} avaliações)
              </span>
              <span>•</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {professional.completedJobsCount || 20}+ Obras concluídas
              </span>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-stone-300 mb-6 leading-relaxed max-w-3xl">
              {professional.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {professional.skills.map(skill => (
                <span key={skill} className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-7 py-3.5 rounded-xl font-extrabold transition-all shadow-lg shadow-amber-500/25 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Calculator className="w-5 h-5" />
                Orçamento Combinado (Material + Serviço)
              </button>

              <a 
                href={`https://wa.me/${professional.phone}?text=Olá%20${encodeURIComponent(professional.name)},%20vi%20seu%20perfil%20na%20Só%20Madeiras.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-xl font-bold transition-colors shadow-md shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Direto
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Portfolio & Reviews) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Works Gallery */}
            <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-amber-500" />
                    Galeria de Trabalhos Realizados
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Projetos executados utilizando insumos fornecidos pela Só Madeiras
                  </p>
                </div>
              </div>

              {professional.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {professional.projects.map(project => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative bg-neutral-900 cursor-pointer border border-neutral-100 dark:border-neutral-800"
                    >
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-5">
                          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">Ver detalhes do projeto &rarr;</span>
                          <h3 className="text-white font-extrabold text-lg leading-snug">{project.title}</h3>
                          {project.materialsUsed && (
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-300">
                              <PackageCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{project.materialsUsed.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-400 text-center py-10 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                  Nenhum projeto cadastrado no momento.
                </p>
              )}
            </section>

            {/* Review Section Component */}
            <ReviewSection 
              professionalId={professional.id}
              initialReviews={professional.reviews} 
              overallRating={professional.rating} 
              reviewsCount={professional.reviewsCount} 
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 sticky top-24 text-neutral-900 dark:text-white">
              <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                Garantia e Credenciais
              </h3>
              
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950/50 p-3 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">Região Atendida</span>
                    <span className="block text-xs text-neutral-600 dark:text-stone-300 mt-0.5">
                      {professional.city} e municípios vizinhos em Sergipe
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">Selo de Qualidade</span>
                    <span className="block text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      Profissional Certificado pela Só Madeiras
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950/50 p-3 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900 dark:text-white">Materiais Recomendados</span>
                    <span className="block text-xs text-neutral-600 dark:text-stone-300 mt-0.5">
                      Utiliza madeira tratada de reflorestamento com garantia
                    </span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow transition-colors text-sm text-center cursor-pointer"
                >
                  Solicitar Cotação Completa
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Project Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[120] bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-neutral-800 relative animate-fade-in text-neutral-900 dark:text-white">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto">
              <div className="relative h-80 sm:h-96 w-full">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-2">
                  {selectedProject.title}
                </h3>

                {selectedProject.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>
                )}

                {selectedProject.materialsUsed && (
                  <div className="bg-amber-50 dark:bg-neutral-800 p-5 rounded-2xl border border-amber-200 dark:border-neutral-700">
                    <h4 className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider mb-3 flex items-center gap-2">
                      <PackageCheck className="w-4 h-4" />
                      Insumos Só Madeiras Utilizados na Obra:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.materialsUsed.map(mat => (
                        <span key={mat} className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border border-neutral-200 dark:border-neutral-700">
                          ✓ {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Combined Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[120] bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-4 right-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500 p-3 rounded-2xl text-white">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Orçamento Combinado</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Material Só Madeiras + Mão de Obra de {professional.name}</p>
              </div>
            </div>

            <form onSubmit={handleSendCombinedQuote} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                  Tipo de Serviço Desejado
                </label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  {professional.skills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                  <option value="Construção de Pergolado">Construção de Pergolado</option>
                  <option value="Instalação de Telhado">Instalação de Telhado</option>
                  <option value="Cerca de Eucalipto Tratado">Cerca de Eucalipto Tratado</option>
                  <option value="Instalação de Porta Pivotante">Instalação de Porta Pivotante</option>
                  <option value="Outro Serviço">Outro Serviço</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                  Sua Cidade (Sergipe)
                </label>
                <input 
                  type="text" 
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-2">
                  Selecione os Materiais Necessários (Só Madeiras)
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  {MATERIAL_OPTIONS.map(mat => (
                    <label key={mat} className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-stone-200 cursor-pointer p-1.5 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 rounded-lg">
                      <input 
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                  Detalhes / Medidas da Obra (opcional)
                </label>
                <textarea 
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Ex: Preciso de pergolado de 4m x 3m em Estância..."
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none h-20 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Gerar Cotação no WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
