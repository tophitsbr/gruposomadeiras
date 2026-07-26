import React from "react";
import { Metadata } from "next";
import GalpoesPage from "./GalpoesClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Simulador de Galpões e Currais de Madeira | Só Madeiras",
  description: "Projete e simule galpões rústicos, aviários e currais de manejo bovino sob medida. Calcule mourões roliços de eucalipto tratado e colunas estruturais.",
  alternates: {
    canonical: "https://somadeiras.com.br/galpoes-currais",
  },
  openGraph: {
    title: "Simulador de Galpões e Currais de Madeira | Só Madeiras",
    description: "Estruturas pesadas roliças para agropecuária em Sergipe. Calcule bitolas de pilares, número de mourões e terças para galpão rural ou confinamento.",
    url: "https://somadeiras.com.br/galpoes-currais",
    type: "website",
    locale: "pt_BR",
  }
};

export default function GalpoesServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://somadeiras.com.br/galpoes-currais/#product",
        "name": "Projeto e Madeira para Galpão Rústico de Eucalipto",
        "image": "https://images.unsplash.com/photo-1589923188900-85dae44fc343?q=80&w=600&auto=format&fit=crop",
        "description": "Fornecimento completo de vigas, terças, pilares estruturais roliços e mourões cantos para construção civil e rural com garantia em autoclave.",
        "brand": {
          "@type": "Brand",
          "name": "Só Madeiras"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "BRL",
          "lowPrice": "3500.00",
          "highPrice": "24900.00",
          "offerCount": "6",
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "19",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/galpoes-currais/#breadcrumb",
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
            "name": "Simulador de Galpões e Currais",
            "item": "https://somadeiras.com.br/galpoes-currais"
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
      <GalpoesPage />
    </>
  );
}
