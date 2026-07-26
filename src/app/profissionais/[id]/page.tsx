import React from 'react';
import { notFound } from 'next/navigation';
import { getProfessionalById } from '../data';
import ReviewSection from '../../components/ReviewSection';
import { MapPin, Phone, MessageCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProfessionalPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const professional = getProfessionalById(resolvedParams.id);

  if (!professional) {
    notFound();
  }

  // Format WhatsApp Link
  const whatsappUrl = `https://wa.me/${professional.phone}?text=Olá%20${encodeURIComponent(professional.name)},%20encontrei%20seu%20perfil%20no%20site%20da%20Soma%20Madeiras.`;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      
      {/* Header Profile */}
      <div className="bg-neutral-900 text-white pt-8 pb-32 px-6 relative">
        <div className="max-w-6xl mx-auto mb-8 relative z-20">
          <Link 
            href="/profissionais" 
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para profissionais
          </Link>
        </div>
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 -mt-24 relative z-10">
        
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-neutral-100 mb-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0 relative">
            <img 
              src={professional.profileImage} 
              alt={professional.name} 
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-lg border-4 border-white"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
              {professional.category}
            </div>
          </div>
          
          <div className="flex-grow pt-2 sm:pt-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3">{professional.name}</h1>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed max-w-2xl">
              {professional.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {professional.skills.map(skill => (
                <span key={skill} className="flex items-center gap-1.5 bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md shadow-[#25D366]/30"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
              <button className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-6 py-3 rounded-xl font-bold transition-colors">
                <Phone className="w-5 h-5" />
                Ligar
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Portfolio) */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Trabalhos Realizados</h2>
              {professional.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {professional.projects.map(project => (
                    <div key={project.id} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative bg-neutral-900">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent flex items-end p-6">
                        <h3 className="text-white font-bold text-lg">{project.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 bg-white p-8 rounded-2xl border border-neutral-200 text-center">Nenhum projeto adicionado ainda.</p>
              )}
            </section>

            <ReviewSection 
              initialReviews={professional.reviews} 
              overallRating={professional.rating} 
              reviewsCount={professional.reviewsCount} 
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informações</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900">Região de Atendimento</span>
                    <span className="block text-sm text-neutral-600 mt-0.5">Grande São Paulo e Interior</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-neutral-900">Verificação</span>
                    <span className="block text-sm text-emerald-600 font-medium mt-0.5">Identidade Verificada</span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-neutral-100">
                <p className="text-xs text-neutral-400 text-center">
                  A Soma Madeiras não se responsabiliza pelos serviços prestados. Esta é uma vitrine para conectar clientes e profissionais.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
