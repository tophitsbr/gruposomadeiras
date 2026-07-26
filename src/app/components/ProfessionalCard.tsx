import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Professional } from '../profissionais/data';

interface ProfessionalCardProps {
  professional: Professional;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Link href={`/profissionais/${professional.id}`} className="group block h-full">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={professional.profileImage} 
            alt={professional.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 dark:text-amber-400 shadow-sm">
            {professional.category}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{professional.name}</h3>
            <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-300">{professional.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-3 mb-4 flex-grow">
            {professional.bio}
          </p>
          
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center mt-auto">
            <span className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">
              {professional.reviewsCount} avaliações
            </span>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:text-amber-500 flex items-center">
              Ver perfil &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
