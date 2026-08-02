export type PaymentMethod = "efectivo" | "transferencia" | "mercado_pago" | "otro";
export type PaymentStatus = "registrado" | "emitido" | "anulado";

export const PAYMENT_METHODS: PaymentMethod[] = [
  "efectivo",
  "transferencia",
  "mercado_pago",
  "otro",
];

export interface PaymentRecord {
  id: string;
  customerId: string;
  productId: string;
  subscriptionId: string | null;
  amount: number;
  concept: string;
  period: string;
  method: PaymentMethod;
  date: string;
  transferReference: string | null;
  notes: string | null;
  status: PaymentStatus;
  receiptId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
