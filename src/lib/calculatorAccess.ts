export type CalculatorAccessLevel = "all" | "registered" | "pro" | "staff" | "admin" | "disabled";

export interface CalculatorAccessResult {
  allowed: boolean;
  reason?: string;
  requiredRoleLabel?: string;
}

export function checkCalculatorAccess(
  accessLevel: CalculatorAccessLevel | string | undefined,
  user: { isProfessional?: boolean; name?: string } | null | undefined,
  isStaffOrSeller: boolean,
  isAdmin: boolean
): CalculatorAccessResult {
  const level = (accessLevel || "all") as CalculatorAccessLevel;

  // Admins always have access unless explicitly disabled for everyone (or even then admin can view)
  if (isAdmin) {
    return { allowed: true };
  }

  if (level === "disabled") {
    return {
      allowed: false,
      reason: "As calculadoras estão temporariamente desativadas pela administração.",
      requiredRoleLabel: "Desativado"
    };
  }

  if (level === "all") {
    return { allowed: true };
  }

  if (level === "admin") {
    return {
      allowed: false,
      reason: "Esta ferramenta é de uso exclusivo dos Administradores da Só Madeiras.",
      requiredRoleLabel: "Administrador"
    };
  }

  if (level === "staff") {
    if (isStaffOrSeller) return { allowed: true };
    return {
      allowed: false,
      reason: "Esta ferramenta é de acesso exclusivo para a Equipe de Vendas e Consultores.",
      requiredRoleLabel: "Equipe de Vendas"
    };
  }

  if (level === "pro") {
    if (isStaffOrSeller) return { allowed: true };
    if (user && user.isProfessional) return { allowed: true };
    return {
      allowed: false,
      reason: "Ferramenta exclusiva para Profissionais Parceiros cadastrados (Arquitetos, Engenheiros, Marceneiros e Mestres de Obra).",
      requiredRoleLabel: "Profissionais Parceiros"
    };
  }

  if (level === "registered") {
    if (isStaffOrSeller) return { allowed: true };
    if (user) return { allowed: true };
    return {
      allowed: false,
      reason: "Ferramenta de acesso exclusivo para Clientes Cadastrados na Só Madeiras.",
      requiredRoleLabel: "Clientes Cadastrados"
    };
  }

  return { allowed: true };
}

export const CALCULATOR_ACCESS_OPTIONS: Array<{
  id: CalculatorAccessLevel;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
}> = [
  {
    id: "all",
    title: "🌐 Todos os Visitantes (Público Geral)",
    subtitle: "Qualquer pessoa que acessar o site pode visualizar e usar as calculadoras sem precisar de login.",
    icon: "🌐",
    badge: "Público"
  },
  {
    id: "registered",
    title: "👤 Apenas Clientes Cadastrados",
    subtitle: "Exige que o visitante faça um cadastro/login simples em 'Minha Conta' para ter acesso às calculadoras.",
    icon: "👤",
    badge: "Clientes"
  },
  {
    id: "pro",
    title: "🏗️ Apenas Profissionais Parceiros",
    subtitle: "Restrito a Arquitetos, Engenheiros, Marceneiros e Mestres de Obra cadastrados (e equipe interna).",
    icon: "🏗️",
    badge: "Parceiros Pro"
  },
  {
    id: "staff",
    title: "💼 Apenas Equipe de Vendas & Admins",
    subtitle: "Ferramenta interna de orçamento. Somente vendedores logados no painel staff e admins podem usar.",
    icon: "💼",
    badge: "Vendedores & Admins"
  },
  {
    id: "admin",
    title: "🔐 Apenas Administradores",
    subtitle: "Uso estritamente reservado para os administradores principais do sistema.",
    icon: "🔐",
    badge: "Somente Admins"
  },
  {
    id: "disabled",
    title: "🚫 Desativar Calculadoras para Visitantes",
    subtitle: "Oculta a calculadora do público e exige permissão administrativa para visualização.",
    icon: "🚫",
    badge: "Desativado"
  }
];
