import React from "react";
import { Metadata } from "next";
import PergoladosPage from "./PergoladosClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Simulador de Pergolado de Madeira Tratada 3D | Só Madeiras",
  description: "Projete e simule seu pergolado de madeira maciça ou eucalipto tratado roliço online. Calcule vigas, pilares, bitolas de autoclave, caibros e solicite cotação.",
  alternates: {
    canonical: "https://somadeiras.com.br/pergolados",
  },
  openGraph: {
    title: "Simulador de Pergolado de Madeira Tratada 3D | Só Madeiras",
    description: "Personalize as dimensões de largura, comprimento, altura e bitolas de postes roliços de eucalipto e calcule a cubagem do seu pergolado em tempo real.",
    url: "https://somadeiras.com.br/pergolados",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PergoladosServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://somadeiras.com.br/pergolados/#product",
        "name": "Pergolado de Eucalipto Tratado Roliço (Sob Medida)",
        "image": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop",
        "description": "Estrutura sob medida de pergolado de madeira com vigas de eucalipto roliço autoclavado de alta bitola e 15 anos de garantia contra cupim.",
        "brand": {
          "@type": "Brand",
          "name": "Só Madeiras"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "BRL",
          "lowPrice": "1200.00",
          "highPrice": "8500.00",
          "offerCount": "4",
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "28",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/pergolados/#breadcrumb",
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
            "name": "Simulador de Pergolados 3D",
            "item": "https://somadeiras.com.br/pergolados"
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
      <PergoladosPage />
    </>
  );
}
