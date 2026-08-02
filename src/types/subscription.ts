export type SubscriptionStatus =
  "activa" | "pendiente" | "vencida" | "pausada" | "cancelada";
export type SubscriptionFrequency = "mensual" | "anual" | "unico";

export const SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
  "activa",
  "pendiente",
  "vencida",
  "pausada",
  "cancelada",
];
export const SUBSCRIPTION_FREQUENCIES: SubscriptionFrequency[] = [
  "mensual",
  "anual",
  "unico",
];

export interface SubscriptionRecord {
  id: string;
  customerId: string;
  productId: string;
  amount: number;
  frequency: SubscriptionFrequency;
  nextDueDate: string;
  status: SubscriptionStatus;
  lastPaymentAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
