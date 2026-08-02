"use client";

import { useState } from "react";
import type { SubscriptionRecord } from "@/types/subscription";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { SubscriptionForm } from "./subscription-form";
import { RenewButton } from "./renew-button";

function badgeFor(
  subscription: SubscriptionRecord,
): { label: string; className: string } | null {
  const today = new Date().toISOString().slice(0, 10);
  if (subscription.status === "cancelada" || subscription.status === "pausada")
    return null;
  if (subscription.nextDueDate < today) {
    return { label: "Vencida", className: "text-red-600 dark:text-red-400" };
  }
  const in7Days = new Date();
  in7Days.setDate(in7Days.getDate() + 7);
  if (subscription.nextDueDate <= in7Days.toISOString().slice(0, 10)) {
    return { label: "Próxima a vencer", className: "text-amber-600 dark:text-amber-400" };
  }
  return null;
}

export function SubscriptionsPanel({
  subscriptions,
  customers,
  products,
}: {
  subscriptions: SubscriptionRecord[];
  customers: CustomerRecord[];
  products: ProductRecord[];
}) {
  const [showNewForm, setShowNewForm] = useState(false);

  const customerName = (id: string) => customers.find((c) => c.id === id)?.name ?? id;
  const productName = (id: string) => products.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setShowNewForm((value) => !value)}
        className="self-start rounded border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
      >
        {showNewForm ? "Cancelar" : "Nueva suscripción"}
      </button>

      {showNewForm && (
        <SubscriptionForm
          customers={customers}
          products={products}
          onCreated={() => setShowNewForm(false)}
        />
      )}

      {subscriptions.length === 0 && (
        <p className="text-sm text-neutral-500">Todavía no hay suscripciones cargadas.</p>
      )}

      {subscriptions.map((subscription) => {
        const badge = badgeFor(subscription);
        return (
          <div
            key={subscription.id}
            className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <strong>{customerName(subscription.customerId)}</strong> —{" "}
                {productName(subscription.productId)} — vence {subscription.nextDueDate}
              </p>
              {badge && (
                <span className={`text-xs font-semibold ${badge.className}`}>
                  {badge.label}
                </span>
              )}
            </div>

            <SubscriptionForm
              subscription={subscription}
              customers={customers}
              products={products}
            />

            <RenewButton
              subscriptionId={subscription.id}
              disabled={subscription.frequency === "unico"}
            />
          </div>
        );
      })}
    </div>
  );
}
