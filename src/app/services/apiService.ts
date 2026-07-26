/**
 * 📡 SERVIÇO DE CONEXÃO COM O BACKEND NESTJS / POSTGRESQL
 * Gerencia a sincronização de orçamentos, produtos, estoque e leads.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface BudgetPayload {
  clientName: string;
  clientPhone: string;
  clientCity?: string;
  items: Array<{
    productId: number | string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  notes?: string;
}

export class ApiService {
  /**
   * Envia um orçamento em tempo real para o backend NestJS
   */
  public static async sendBudgetOrder(payload: BudgetPayload): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, id: data.id || "budget_" + Date.now() };
    } catch (err: any) {
      console.warn("📌 Backend Offline/Local mode: Orçamento armazenado em fila local.", err);
      // Fallback: save to local queue
      const existingQueue = JSON.parse(localStorage.getItem("somadeiras_pending_budgets") || "[]");
      existingQueue.push({ ...payload, queuedAt: new Date().toISOString() });
      localStorage.setItem("somadeiras_pending_budgets", JSON.stringify(existingQueue));
      return { success: true, id: "local_bgt_" + Date.now() };
    }
  }

  /**
   * Busca produtos atualizados diretamente do banco PostgreSQL
   */
  public static async getProducts(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) return [];
      return await response.json();
    } catch (err) {
      console.warn("📌 Usando catálogo local/fallback.");
      return [];
    }
  }

  /**
   * Registra novo lead/cliente para envio de promoções
   */
  public static async registerLead(phoneOrEmail: string, name?: string): Promise<boolean> {
    try {
      await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: phoneOrEmail, name: name || "Cliente Site", source: "Website" }),
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
