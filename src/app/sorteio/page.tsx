import React from "react";
import { Metadata } from "next";
import SorteioClient from "./SorteioClient";

export const metadata: Metadata = {
  title: "Sorteio do Mês | Só Madeiras Premium",
  description: "Cadastre o número do seu pedido e participe do sorteio de prêmios mensais da Só Madeiras! Bilhetes digitais integrados com suporte especializado.",
  alternates: {
    canonical: "https://somadeiras.com.br/sorteio",
  },
  openGraph: {
    title: "Sorteio do Mês | Só Madeiras Premium",
    description: "Comprou na Só Madeiras? Cadastre seu pedido aqui e concorra a super prêmios mensais. Transparência e sorteios ao vivo pelo site.",
    url: "https://somadeiras.com.br/sorteio",
    type: "website",
    locale: "pt_BR",
  }
};

export default function SorteioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://somadeiras.com.br/sorteio/#webpage",
        "name": "Sorteio do Mês Só Madeiras",
        "description": "Página oficial de sorteios da Só Madeiras para clientes que realizaram compras.",
        "url": "https://somadeiras.com.br/sorteio"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/sorteio/#breadcrumb",
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
            "name": "Sorteio do Mês",
            "item": "https://somadeiras.com.br/sorteio"
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
      <SorteioClient />
    </>
  );
}
