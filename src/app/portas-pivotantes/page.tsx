import React from "react";
import { Metadata } from "next";
import PortasClient from "../portas-de-madeira/PortasClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Portas Pivotantes de Madeira Maciça | Luxo e Entrada | Só Madeiras",
  description: "Exclusiva linha de portas pivotantes de madeira maciça de Angelim e Ipê sob medida. Kits completos com puxadores de inox e fechaduras rolete premium. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/portas-pivotantes",
  },
  openGraph: {
    title: "Portas Pivotantes de Madeira Maciça | Luxo e Entrada | Só Madeiras",
    description: "Portas de entrada residenciais imponentes. Madeira nobre seca em estufa com ferragens pivotantes de inox de alta capacidade em Sergipe.",
    url: "https://somadeiras.com.br/portas-pivotantes",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PortasPivotantesPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/portas-pivotantes/#localbusiness",
        "name": "Só Madeiras - Portas Pivotantes",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/portas-pivotantes",
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
        "@id": "https://somadeiras.com.br/portas-pivotantes/#breadcrumb",
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
            "name": "Portas Pivotantes",
            "item": "https://somadeiras.com.br/portas-pivotantes"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/portas-pivotantes/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é uma porta pivotante?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A porta pivotante é um modelo de esquadria onde a folha gira em torno de um eixo vertical (pivô) em vez de usar dobradiças laterais tradicionais. Os pinos de fixação (pivôs) são chumbados no piso e na travessa superior do portal, o que permite o uso de portas muito mais largas, pesadas e imponentes."
            }
          },
          {
            "@type": "Question",
            "name": "Qual madeira é recomendada para porta pivotante externa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Angelim Vermelho e o Ipê são as mais recomendadas devido à sua alta densidade e teor de óleos resinoides naturais que protegem as folhas de empenamento por chuva e sol, além de serem imunes a brocas e cupins."
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
      <PortasClient initialType="pivotante" />
    </>
  );
}
