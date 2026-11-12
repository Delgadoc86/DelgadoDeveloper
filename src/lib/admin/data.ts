import "server-only";

import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import type { CustomerRecord } from "@/types/customer";
import type { PaymentRecord } from "@/types/payment";
import type { ProductRecord } from "@/types/product";
import type { ReceiptRecord } from "@/types/receipt";
import type { SubscriptionRecord } from "@/types/subscription";

/**
 * Lectura centralizada de Firestore para el panel. Cada página antes repetía
 * el mismo mapeo documento → tipo; acá vive una sola vez. Las colecciones
 * son chicas (uso personal), así que se traen completas y se filtran en
 * código, sin índices compuestos.
 */

type Doc = QueryDocumentSnapshot<DocumentData> | FirebaseFirestore.DocumentSnapshot;

const iso = (value: unknown): string =>
  (value as { toDate?: () => Date } | undefined)?.toDate?.().toISOString() ?? "";

export function toCustomer(doc: Doc): CustomerRecord {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    name: data.name,
    businessName: data.businessName ?? undefined,
    phone: data.phone,
    phoneRaw: data.phoneRaw,
    email: data.email ?? undefined,
    taxId: data.taxId ?? undefined,
    type: data.type,
    status: data.status,
    notes: data.notes ?? undefined,
    productIds: data.productIds ?? [],
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}

export function toProduct(doc: Doc): ProductRecord {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    name: data.name,
    type: data.type,
    suggestedPrice: data.suggestedPrice ?? null,
    suggestedFrequency: data.suggestedFrequency ?? null,
    active: data.active,
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
  };
}

export function toPayment(doc: Doc): PaymentRecord {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    customerId: data.customerId,
    productId: data.productId,
    subscriptionId: data.subscriptionId ?? null,
    amount: data.amount,
    concept: data.concept,
    period: data.period,
    method: data.method,
    date: data.date,
    transferReference: data.transferReference ?? null,
    notes: data.notes ?? null,
    status: data.status,
    receiptId: data.receiptId ?? null,
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}

export function toSubscription(doc: Doc): SubscriptionRecord {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    customerId: data.customerId,
    productId: data.productId,
    amount: data.amount,
    frequency: data.frequency,
    nextDueDate: data.nextDueDate,
    status: data.status,
    lastPaymentAt: iso(data.lastPaymentAt) || null,
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}

export function toReceipt(doc: Doc): ReceiptRecord {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    number: data.number,
    paymentId: data.paymentId,
    customerSnapshot: data.customerSnapshot,
    productSnapshot: data.productSnapshot ?? null,
    subscriptionSnapshot: data.subscriptionSnapshot ?? null,
    amount: data.amount,
    concept: data.concept,
    period: data.period,
    method: data.method,
    issuedAt: iso(data.issuedAt),
    issuedBy: data.issuedBy,
    voided: data.voided,
    voidedAt: iso(data.voidedAt) || null,
    voidedBy: data.voidedBy ?? null,
    voidReason: data.voidReason ?? null,
  };
}

export async function getCustomers() {
  const snap = await getAdminDb().collection("customers").get();
  return snap.docs.map(toCustomer).sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function getProducts() {
  const snap = await getAdminDb().collection("products").get();
  return snap.docs.map(toProduct).sort((a, b) => a.name.localeCompare(b.name, "es"));
}

/** Ordenados del más reciente al más viejo (fecha y, a igual fecha, alta). */
export async function getPayments() {
  const snap = await getAdminDb().collection("payments").get();
  return snap.docs
    .map(toPayment)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
    );
}

export async function getSubscriptions() {
  const snap = await getAdminDb().collection("subscriptions").get();
  return snap.docs
    .map(toSubscription)
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));
}

/** Indexados por receipt.id, que es lo que guarda payment.receiptId. */
export async function getReceiptsById() {
  const snap = await getAdminDb().collection("receipts").get();
  const byId: Record<string, ReceiptRecord> = {};
  for (const doc of snap.docs) byId[doc.id] = toReceipt(doc);
  return byId;
}
