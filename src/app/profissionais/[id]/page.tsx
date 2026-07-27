import React from 'react';
import { notFound } from 'next/navigation';
import { getProfessionalById } from '../data';
import ProfessionalClientView from './ProfessionalClientView';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const professional = getProfessionalById(resolvedParams.id);

  if (!professional) {
    return {
      title: 'Profissional não encontrado | Só Madeiras',
    };
  }

  return {
    title: `${professional.name} - ${professional.category} em ${professional.city}-SE | Só Madeiras`,
    description: `Confira os trabalhos realizados, avaliações de clientes e solicite orçamento para ${professional.category} em ${professional.city} - Sergipe.`,
  };
}

export default async function ProfessionalPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const professional = getProfessionalById(resolvedParams.id);

  if (!professional) {
    notFound();
  }

  return <ProfessionalClientView professional={professional} />;
}
