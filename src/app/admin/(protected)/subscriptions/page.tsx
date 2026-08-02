import Link from "next/link";
import { getAdminDb } from "@/lib/firebase/admin";
import type { SubscriptionRecord } from "@/types/subscription";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { SubscriptionsPanel } from "./subscriptions-panel";

export default async function AdminSubscriptionsPage() {
  const db = getAdminDb();
  const [subscriptionsSnapshot, customersSnapshot, productsSnapshot] = await Promise.all([
    db.collection("subscriptions").orderBy("nextDueDate").get(),
    db.collection("customers").orderBy("name").get(),
    db.collection("products").orderBy("name").get(),
  ]);

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

  const products: ProductRecord[] = productsSnapshot.docs.map((doc) => {
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
  });

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Suscripciones y vencimientos</h1>
        <Link href="/admin" className="text-sm underline">
          Volver
        </Link>
      </div>

      <SubscriptionsPanel
        subscriptions={subscriptions}
        customers={customers}
        products={products}
      />
    </div>
  );
}
