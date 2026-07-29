import React from "react";
import { Metadata } from "next";
import PreMoldadosClient from "./PreMoldadosClient";

export const metadata: Metadata = {
  title: "Pré-Moldados de Concreto em Sergipe | Muros, Mourões e Galpões | Só Madeiras",
  description: "Muros Pré-Moldados, Mourões de Concreto, Galpões Estruturais, Tubos e Vigas de concreto armado de alta resistência. Calculadora online de muro pré-moldado.",
  alternates: {
    canonical: "https://somadeiras.com.br/pre-moldados",
  },
  openGraph: {
    title: "Pré-Moldados de Concreto em Sergipe | Muros, Mourões e Galpões | Só Madeiras",
    description: "Estruturas pré-fabricadas em concreto armado vibrado com máxima economia e durabilidade para construção civil e agropecuária.",
    url: "https://somadeiras.com.br/pre-moldados",
    type: "website",
    locale: "pt_BR",
  }
};

export default function PreMoldadosPage() {
  return <PreMoldadosClient />;
}
