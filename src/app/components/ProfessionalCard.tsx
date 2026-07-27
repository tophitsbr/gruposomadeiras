import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Award, Sparkles, MapPin } from 'lucide-react';
import { Professional } from '../profissionais/data';

interface ProfessionalCardProps {
  professional: Professional;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const renderBadge = () => {
    switch (professional.verificationTier) {
      case 'destaque':
        return (
          <div className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Destaque da Região
          </div>
        );
      case 'ouro':
        return (
          <div className="flex items-center gap-1 bg-yellow-500/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            <Award className="w-3.5 h-3.5" />
            Parceiro Ouro
          </div>
        );
      case 'verificado':
      default:
        return (
          <div className="flex items-center gap-1 bg-emerald-600/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verificado
          </div>
        );
    }
  };

  return (
    <Link href={`/profissionais/${professional.id}`} className="group block h-full">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
        
        {/* Header Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={professional.profileImage} 
            alt={professional.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 dark:text-amber-400 shadow-sm">
            {professional.category}
          </div>

          <div className="absolute top-3 right-3">
            {renderBadge()}
          </div>
        </div>
        
        {/* Body Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {professional.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <MapPin className="w-3 h-3 text-amber-500" />
                {professional.city} - SE
              </span>
            </div>
            
            <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/20 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-300">{professional.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2 mb-4">
            {professional.bio}
          </p>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <span className="font-semibold text-neutral-900 dark:text-white">
              {professional.completedJobsCount || 15}+ Obras concluídas
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{professional.reviewsCount} Avaliações</span>
          </div>
          
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center mt-auto">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Parceiro Só Madeiras
            </span>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 flex items-center">
              Ver perfil &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
