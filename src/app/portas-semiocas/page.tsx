import React from "react";
import { Metadata } from "next";
import PortasClient from "../portas-de-madeira/PortasClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Portas Semiocas e Colmeia HDF | Internas e Econômicas | Só Madeiras",
  description: "As melhores portas semiocas (colmeia) em HDF de alta densidade para quartos e banheiros. Opções leves com excelente isolamento acústico e preço de atacado. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/portas-semiocas",
  },
  openGraph: {
    title: "Portas Semiocas e Colmeia HDF | Internas e Econômicas | Só Madeiras",
    description: "Portas internas duráveis e leves. Capa em HDF premium com núcleo colmeia termoacústico direto de fábrica com menor preço em Sergipe.",
    url: "https://somadeiras.com.br/portas-semiocas",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PortasSemiocasPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/portas-semiocas/#localbusiness",
        "name": "Só Madeiras - Portas Internas",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/portas-semiocas",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rodovia BR-101, Km 142",
          "addressLocality": "Estância",
          "addressRegion": "SE",
          "postalCode": "49200-000",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-11.2682",
          "longitude": "-37.4381"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/portas-semiocas/#breadcrumb",
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
            "name": "Portas Semiocas",
            "item": "https://somadeiras.com.br/portas-semiocas"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/portas-semiocas/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que significa 'porta semioca' ou 'porta colmeia'?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Porta semioca (ou colmeia) possui uma estrutura interna vazada em formato de favo de mel de papelão reforçado ou fibras resinadas, revestida por duas chapas de madeira HDF ou compensado de alta densidade nas laterais. Isso a torna extremamente leve e ideal para ambientes internos que não exigem resistência contra intempéries."
            }
          },
          {
            "@type": "Question",
            "name": "Porta semioca pode ser instalada no banheiro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, desde que receba impermeabilização adequada (como laca, esmalte sintético ou verniz de alta proteção) em todas as bordas superiores e inferiores antes da instalação. Isso evita que a umidade do vapor ou respingos de água infiltre na madeira e a estufe."
            }
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
      <PortasClient initialType="semioca" />
    </>
  );
}
