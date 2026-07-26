import React from "react";
import { Metadata } from "next";
import CalculadoraForroPVC from "./ForroClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "Calculadora de Forro PVC e Ripamento de Madeira | Só Madeiras",
  description: "Calcule em tempo real a quantidade exata de lâminas de forro PVC (20cm) e toda a estrutura de madeira (ripa 5x1cm e ripão 5x3cm) por ambiente. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/forro-pvc",
  },
  openGraph: {
    title: "Calculadora de Forro PVC e Ripamento de Madeira | Só Madeiras",
    description: "Projete e orce os materiais para cobrir tetos residenciais ou comerciais. Evite desperdício calculando buchas, parafusos, sancas e ripas.",
    url: "https://somadeiras.com.br/forro-pvc",
    type: "website",
    locale: "pt_BR",
  }
};

export default function ForroServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://somadeiras.com.br/forro-pvc/#product",
        "name": "Forro de PVC Régua Premium e Estrutura de Madeira",
        "image": "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&w=600&q=80",
        "description": "Kit completo de forro de PVC rígido em réguas frisadas de 20cm com estrutura de ripamento em madeira imunizada contra cupins e umidade.",
        "brand": {
          "@type": "Brand",
          "name": "Só Madeiras"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "price": "22.90",
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "42",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://somadeiras.com.br/forro-pvc/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual a distância máxima recomendada entre os ripões de sustentação do forro PVC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A distância máxima recomendada por carpinteiros e fabricantes é de 60cm. Espaçamentos superiores provocam abaulamento (barriga) nas lâminas de PVC devido à gravidade e dilatação térmica natural do plástico."
            }
          },
          {
            "@type": "Question",
            "name": "Quais as bitolas de madeira recomendadas para o ripamento do forro PVC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O padrão de alta durabilidade e firmeza mecânica da Só Madeiras utiliza ripões de madeira de 5x3cm (ou 5x2cm) para a sustentação perpendicular, e ripas de 5x1cm no perímetro das paredes para nivelamento."
            }
          },
          {
            "@type": "Question",
            "name": "O forro de PVC rígido é seguro para cozinhas e banheiros?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, é 100% indicado. O PVC é impermeável, não retém vapor de umidade, é lavável e não propaga chamas (autoextinguível), sendo a melhor solução de custo-benefício higiênica e estética."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/forro-pvc/#breadcrumb",
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
            "name": "Calculadora de Forro PVC",
            "item": "https://somadeiras.com.br/forro-pvc"
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
      <CalculadoraForroPVC />
    </>
  );
}
