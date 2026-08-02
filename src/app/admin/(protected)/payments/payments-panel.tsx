"use client";

import { useState } from "react";
import type { PaymentRecord } from "@/types/payment";
import type { ReceiptRecord } from "@/types/receipt";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { SubscriptionRecord } from "@/types/subscription";
import { PaymentForm } from "./payment-form";
import { IssueReceiptButton } from "./issue-receipt-button";
import { VoidReceiptButton } from "./void-receipt-button";
import { ReceiptPdfButton } from "./receipt-pdf-button";

export function PaymentsPanel({
  payments,
  receiptsByPaymentId,
  customers,
  products,
  subscriptions,
}: {
  payments: PaymentRecord[];
  receiptsByPaymentId: Record<string, ReceiptRecord>;
  customers: CustomerRecord[];
  products: ProductRecord[];
  subscriptions: SubscriptionRecord[];
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
        {showNewForm ? "Cancelar" : "Nuevo pago"}
      </button>

      {showNewForm && (
        <PaymentForm
          customers={customers}
          products={products}
          subscriptions={subscriptions}
          onCreated={() => setShowNewForm(false)}
        />
      )}

      {payments.length === 0 && (
        <p className="text-sm text-neutral-500">Todavía no hay pagos registrados.</p>
      )}

      {payments.map((payment) => {
        const receipt = payment.receiptId
          ? receiptsByPaymentId[payment.receiptId]
          : undefined;
        return (
          <div
            key={payment.id}
            className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <p className="text-sm">
              <strong>{customerName(payment.customerId)}</strong> —{" "}
              {productName(payment.productId)} — ${payment.amount.toLocaleString("es-AR")}{" "}
              — {payment.period}
            </p>
            <p className="text-xs text-neutral-500">
              {payment.concept} · {payment.method} · {payment.date} · estado:{" "}
              {payment.status}
            </p>

            {payment.status === "registrado" && (
              <IssueReceiptButton paymentId={payment.id} />
            )}

            {receipt && !receipt.voided && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold">
                  Comprobante {receipt.number}
                </span>
                <ReceiptPdfButton receipt={receipt} />
                <VoidReceiptButton receiptId={receipt.id} />
              </div>
            )}

            {receipt?.voided && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                  Comprobante {receipt.number} anulado — {receipt.voidReason}
                </span>
                <ReceiptPdfButton receipt={receipt} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
