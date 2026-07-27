import React from "react";
import { Metadata } from "next";
import StaffLoginClient from "./StaffLoginClient";

export const metadata: Metadata = {
  title: "Acesso da Equipe | Só Madeiras",
  description: "Portal de login exclusivo para vendedores e administradores do grupo Só Madeiras.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function StaffLoginPage() {
  return <StaffLoginClient />;
}
