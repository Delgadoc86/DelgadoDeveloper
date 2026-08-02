import Link from "next/link";
import { getAdminDb } from "@/lib/firebase/admin";
import type { PaymentRecord } from "@/types/payment";
import type { ReceiptRecord } from "@/types/receipt";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { SubscriptionRecord } from "@/types/subscription";
import { PaymentsPanel } from "./payments-panel";

export default async function AdminPaymentsPage() {
  const db = getAdminDb();
  const [
    paymentsSnapshot,
    receiptsSnapshot,
    customersSnapshot,
    productsSnapshot,
    subscriptionsSnapshot,
  ] = await Promise.all([
    db.collection("payments").orderBy("date", "desc").get(),
    db.collection("receipts").get(),
    db.collection("customers").orderBy("name").get(),
    db.collection("products").orderBy("name").get(),
    db.collection("subscriptions").get(),
  ]);

  const payments: PaymentRecord[] = paymentsSnapshot.docs.map((doc) => {
    const data = doc.data();
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
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  const receiptsByPaymentId: Record<string, ReceiptRecord> = {};
  for (const doc of receiptsSnapshot.docs) {
    const data = doc.data();
    const receipt: ReceiptRecord = {
      id: doc.id,
      number: data.number,
      paymentId: data.paymentId,
      customerSnapshot: data.customerSnapshot,
      amount: data.amount,
      concept: data.concept,
      period: data.period,
      method: data.method,
      issuedAt: data.issuedAt?.toDate?.().toISOString() ?? "",
      issuedBy: data.issuedBy,
      voided: data.voided,
      voidedAt: data.voidedAt?.toDate?.().toISOString() ?? null,
      voidedBy: data.voidedBy ?? null,
      voidReason: data.voidReason ?? null,
    };
    receiptsByPaymentId[receipt.paymentId] = receipt;
  }

  const customers: CustomerRecord[] = customersSnapshot.docs.map((doc) => {
    const data = doc.data();
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
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  const products: ProductRecord[] = productsSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        suggestedPrice: data.suggestedPrice ?? null,
        suggestedFrequency: data.suggestedFrequency ?? null,
        active: data.active,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      };
    })
    .filter((product) => product.active);

  const subscriptions: SubscriptionRecord[] = subscriptionsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      customerId: data.customerId,
      productId: data.productId,
      amount: data.amount,
      frequency: data.frequency,
      nextDueDate: data.nextDueDate,
      status: data.status,
      lastPaymentAt: data.lastPaymentAt?.toDate?.().toISOString() ?? null,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Pagos y comprobantes</h1>
        <Link href="/admin" className="text-sm underline">
          Volver
        </Link>
      </div>

      <PaymentsPanel
        payments={payments}
        receiptsByPaymentId={receiptsByPaymentId}
        customers={customers}
        products={products}
        subscriptions={subscriptions}
      />
    </div>
  );
}
