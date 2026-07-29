import React from "react";
import { Metadata } from "next";
import AluminioClient from "./AluminioClient";

export const metadata: Metadata = {
  title: "Portas e Janelas de Alumínio em Sergipe | Linha Suprema e Gold | Só Madeiras",
  description: "Esquadrias de alumínio de alto padrão: Portas balcão com persiana integrada automatizada, janelas de correr, portas pivotantes de alumínio e maxim-ar. Orçamento rápido no WhatsApp.",
  alternates: {
    canonical: "https://somadeiras.com.br/portas-e-janelas-de-aluminio",
  },
  openGraph: {
    title: "Portas e Janelas de Alumínio em Sergipe | Linha Suprema e Gold | Só Madeiras",
    description: "Esquadrias de alumínio preto anodizado e branco neve de altíssima durabilidade e estanqueidade.",
    url: "https://somadeiras.com.br/portas-e-janelas-de-aluminio",
    type: "website",
    locale: "pt_BR",
  }
};

export default function AluminioPage() {
  return <AluminioClient />;
}
