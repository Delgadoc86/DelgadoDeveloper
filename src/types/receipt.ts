import type { PaymentMethod } from "@/types/payment";

export interface ReceiptCustomerSnapshot {
  name: string;
  businessName: string | null;
  taxId: string | null;
  phone: string | null;
  email: string | null;
}

export interface ReceiptRecord {
  id: string;
  number: string;
  paymentId: string;
  customerSnapshot: ReceiptCustomerSnapshot;
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
