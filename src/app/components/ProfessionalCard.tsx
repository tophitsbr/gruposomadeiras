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
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={professional.profileImage} 
            alt={professional.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 shadow-sm">
            {professional.category}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-neutral-900">{professional.name}</h3>
            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-900">{professional.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-grow">
            {professional.bio}
          </p>
          
          <div className="pt-4 border-t border-neutral-100 flex justify-between items-center mt-auto">
            <span className="text-sm text-neutral-500">
              {professional.reviewsCount} avaliações
            </span>
            <span className="text-sm font-medium text-amber-600 group-hover:text-amber-700 flex items-center">
              Ver perfil &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
