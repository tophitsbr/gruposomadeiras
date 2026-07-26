import React from "react";
import { Metadata } from "next";
import SoMadeirasFullStack from "./HomeClient";

// ==========================================
// STATIC METADATA (CRITICAL FOR SEO RANKING)
// ==========================================
export const metadata: Metadata = {
  title: "SÓ MADEIRAS | Tudo para sua obra em um só lugar | Estância-SE",
  description: "A melhor loja de materiais de construção e madeiras em Estância e região de Sergipe. Compre eucalipto tratado, mourões, portas, ferragens, forro PVC e cimento pelo WhatsApp.",
  alternates: {
    canonical: "https://somadeiras.com.br",
  },
  openGraph: {
    title: "SÓ MADEIRAS | Tudo para sua obra em um só lugar | Estância-SE",
    description: "Faça seu orçamento de madeiras e materiais de construção direto pelo WhatsApp. Entrega ágil, preços baixos e produtos premium no leste de Sergipe.",
    url: "https://somadeiras.com.br",
    type: "website",
    locale: "pt_BR",
  }
};

export default function HomePage() {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://somadeiras.com.br/#website",
        "url": "https://somadeiras.com.br/",
        "name": "Só Madeiras",
        "description": "Loja premium de materiais de construção e madeiras em Estância-SE",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://somadeiras.com.br/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://somadeiras.com.br/#localbusiness",
        "name": "Só Madeiras - Material de Construção e Madeiras",
        "image": "https://somadeiras.com.br/images/logo.png",
        "telephone": "+55-79-99629-8990",
        "url": "https://somadeiras.com.br/",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Contorno, 465",
          "addressLocality": "Estância",
          "addressRegion": "SE",
          "postalCode": "49200-000",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-11.2682",
          "longitude": "-37.4381"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "07:00",
          "closes": "18:00"
        },
        "sameAs": [
          "https://www.facebook.com/somadeiras",
          "https://www.instagram.com/somadeiras"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://somadeiras.com.br/#organization",
        "name": "Só Madeiras LTDA",
        "url": "https://somadeiras.com.br/",
        "logo": "https://somadeiras.com.br/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-79-99629-8990",
          "contactType": "sales",
          "areaServed": "BR",
          "availableLanguage": "Portuguese"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <SoMadeirasFullStack />
    </>
  );
}
