import type { PaymentMethod } from "@/types/payment";
import type { SubscriptionFrequency } from "@/types/subscription";

export interface ReceiptCustomerSnapshot {
  name: string;
  businessName: string | null;
  taxId: string | null;
  phone: string | null;
  email: string | null;
}

export interface ReceiptProductSnapshot {
  name: string;
}

// Se guarda solo cuando el pago está atado a una suscripción (payment.subscriptionId).
// periodStart/periodEnd son el vencimiento anterior y el nuevo tras este pago —
// el "período cubierto" por este comprobante — no confundir con `startDate`,
// que es la fecha de alta de la suscripción en sí (fija, no cambia con cada pago).
export interface ReceiptSubscriptionSnapshot {
  frequency: SubscriptionFrequency;
  startDate: string;
  periodStart: string;
  periodEnd: string;
}

export interface ReceiptRecord {
  id: string;
  number: string;
  paymentId: string;
  customerSnapshot: ReceiptCustomerSnapshot;
  productSnapshot: ReceiptProductSnapshot | null;
  subscriptionSnapshot: ReceiptSubscriptionSnapshot | null;
  amount: number;
  concept: string;
  period: string;
  method: PaymentMethod;
  issuedAt: string;
  issuedBy: string;
  voided: boolean;
  voidedAt: string | null;
  voidedBy: string | null;
  voidReason: string | null;
}
