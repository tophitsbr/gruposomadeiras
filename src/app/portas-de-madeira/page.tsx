import React from "react";
import { Metadata } from "next";
import PortasClient from "./PortasClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Portas de Madeira em Estância-SE | Maciças, Frisadas e Prontas | Só Madeiras",
  description: "Compre portas de madeira maciça, frisadas, de correr e kits de porta pronta. Madeiras nobres Angelim e Tauari secas em estufa com entrega ágil em Sergipe. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/portas-de-madeira",
  },
  openGraph: {
    title: "Portas de Madeira em Estância-SE | Maciças e Prontas | Só Madeiras",
    description: "Portas externas de luxo e internas aparelhadas. Soluções completas com batentes e fechaduras direto do pátio para sua obra.",
    url: "https://somadeiras.com.br/portas-de-madeira",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PortasMadeiraPage() {
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/portas-de-madeira/#localbusiness",
        "name": "Só Madeiras - Portas e Esquadrias",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
        "telephone": "+55-79-99999-9999",
        "url": "https://somadeiras.com.br/portas-de-madeira",
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
        "@id": "https://somadeiras.com.br/portas-de-madeira/#breadcrumb",
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
            "name": "Portas de Madeira",
            "item": "https://somadeiras.com.br/portas-de-madeira"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/portas-de-madeira/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual madeira é melhor para portas de entrada externas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Madeiras maciças de alta densidade como o Angelim Vermelho, Ipê e Cumaru são as mais indicadas para portas de entrada, pois possuem resiliência mecânica superior e óleos naturais que repelem cupins e são resistentes a respingos de chuva."
            }
          },
          {
            "@type": "Question",
            "name": "O que acompanha o Kit Porta Pronta Completo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O nosso Kit Porta Pronta Completo acompanha a folha da porta (maciça ou frisada), o jogo de batentes (portais/caixões), alizares de acabamento (guarnições), três dobradiças de aço inox e a fechadura mecânica premium já instalados, restando apenas o chumbamento na parede."
            }
          },
          {
            "@type": "Question",
            "name": "Vocês fabricam portas sob medida?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. Além das medidas comerciais padrão (60cm, 70cm, 80cm e 90cm de largura por 2,10m de altura), nossa marcenaria técnica fabrica folhas sob medida com altura diferenciada de até 2,80 metros para projetos arquitetônicos premium."
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
      <PortasClient initialType="all" />
    </>
  );
}
