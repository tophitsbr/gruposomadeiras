import StaffLoginClient from "../staff/StaffLoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área de Login da Equipe | SÓ MADEIRAS",
  description: "Acesso restrito para funcionários, vendedores e administradores da Só Madeiras.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginEquipePage() {
  return <StaffLoginClient />;
}
