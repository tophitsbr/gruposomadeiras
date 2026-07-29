import React from "react";
import { Metadata } from "next";
import JanelasClient from "./JanelasClient";

export const metadata: Metadata = {
  title: "Janelas de Madeira em Sergipe | Venezianas, Correr e Maxiar | Só Madeiras",
  description: "Janelas Venezianas, de Correr, Pivotantes e Maxiar em madeira de lei tratada. Qualidade superior, secagem técnica em estufa e excelente acabamento para sua obra. Solicite orçamento.",
  alternates: {
    canonical: "https://somadeiras.com.br/janelas-de-madeira",
  },
  openGraph: {
    title: "Janelas de Madeira em Sergipe | Venezianas, Correr e Maxiar | Só Madeiras",
    description: "Esquadrias de madeira de lei selecionada de alta durabilidade. Vedação ideal contra intempéries e visual nobre para residências rurais ou urbanas.",
    url: "https://somadeiras.com.br/janelas-de-madeira",
    type: "website",
    locale: "pt_BR",
  }
};

export default function JanelasPage() {
  return <JanelasClient />;
}
