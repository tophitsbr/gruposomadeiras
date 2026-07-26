import React from "react";
import { Metadata } from "next";
import LookbookClient from "./LookbookClient";

export const metadata: Metadata = {
  title: "Lookbook de Projetos Reais | Inspirações em Madeira Nobre | Só Madeiras",
  description: "Inspire-se com projetos reais construídos com nossas madeiras: pergolados de eucalipto roliço, decks de Ipê, currais rústicos e portas pivotantes. Adicione materiais ao carrinho.",
  alternates: {
    canonical: "https://somadeiras.com.br/lookbook",
  },
  openGraph: {
    title: "Lookbook de Projetos Reais | Inspirações em Madeira Nobre | Só Madeiras",
    description: "Navegue pela galeria interativa de projetos de clientes. Clique nos hotspots para ver as especificações das madeiras utilizadas e solicite orçamento rápido.",
    url: "https://somadeiras.com.br/lookbook",
    type: "website",
    locale: "pt_BR",
  }
};

export default function LookbookPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": "https://somadeiras.com.br/lookbook/#gallery",
        "name": "Lookbook Só Madeiras - Galeria de Projetos Reais",
        "description": "Portfólio interativo de projetos executados com madeiras nobres, eucalipto tratado e esquadrias em Sergipe.",
        "url": "https://somadeiras.com.br/lookbook"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://somadeiras.com.br/lookbook/#breadcrumb",
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
            "name": "Lookbook de Projetos",
            "item": "https://somadeiras.com.br/lookbook"
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
      <LookbookClient />
    </>
  );
}
