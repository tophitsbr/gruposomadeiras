import React from "react";
import { Metadata } from "next";
import CalculadoraTelhadoClient from "./CalculadoraTelhadoClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Calculadora de Dimensionamento de Telhados de Madeira | Só Madeiras",
  description: "Calcule e pré-dimensione vigas, caibros, terças, ripas e tesouras de madeira conforme a ABNT NBR 7190, NBR 6120 e NBR 6123. Memorial técnico e lista de materiais.",
  alternates: {
    canonical: "https://somadeiras.com.br/calculadora-telhado",
  },
  openGraph: {
    title: "Calculadora de Dimensionamento de Telhados de Madeira | Só Madeiras",
    description: "Ferramenta profissional para cálculo de inclinação, bitolas mínimas comerciais, vãos livres seguros, memorial de cálculo estrutural e lista de materiais para sua cobertura.",
    url: "https://somadeiras.com.br/calculadora-telhado",
    type: "website",
    locale: "pt_BR",
  }
};

export default function CalculadoraTelhadoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://somadeiras.com.br/calculadora-telhado/#product",
        "name": "Calculadora Profissional de Dimensionamento de Telhados de Madeira",
        "image": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
        "description": "Calculadora estrutural profissional para pré-dimensionamento de coberturas de madeira sob as normas técnicas ABNT.",
        "brand": {
          "@type": "Brand",
          "name": "Só Madeiras"
        },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "BRL",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/calculadora-telhado/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://somadeiras.com.br/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculadora de Telhados de Madeira",
            "item": "https://somadeiras.com.br/calculadora-telhado"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculadoraTelhadoClient />
    </>
  );
}
