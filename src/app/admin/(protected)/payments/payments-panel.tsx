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
import { WhatsappButton } from "./whatsapp-button";

export function PaymentsPanel({
  payments,
  receiptsByPaymentId,
  customers,
  products,
  subscriptions,
  initialShowForm = false,
}: {
  payments: PaymentRecord[];
  receiptsByPaymentId: Record<string, ReceiptRecord>;
  customers: CustomerRecord[];
  products: ProductRecord[];
  subscriptions: SubscriptionRecord[];
  initialShowForm?: boolean;
}) {
  const [showNewForm, setShowNewForm] = useState(initialShowForm);

  const customerName = (id: string) => customers.find((c) => c.id === id)?.name ?? id;
  const productName = (id: string) => products.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setShowNewForm((value) => !value)}
        className="border-border bg-background-subtle self-start rounded border px-3 py-2 text-sm"
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
        <p className="text-foreground-muted text-sm">Todavía no hay pagos registrados.</p>
      )}

      {payments.map((payment) => {
        const receipt = payment.receiptId
          ? receiptsByPaymentId[payment.receiptId]
          : undefined;
        return (
          <div
            key={payment.id}
            className="border-border bg-background-subtle flex flex-col gap-2 rounded-lg border p-4"
          >
            <p className="text-sm">
              <strong>{customerName(payment.customerId)}</strong> —{" "}
              {productName(payment.productId)} — ${payment.amount.toLocaleString("es-AR")}{" "}
              — {payment.period}
            </p>
            <p className="text-foreground-muted text-xs">
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
                <WhatsappButton receipt={receipt} />
                <VoidReceiptButton receiptId={receipt.id} />
              </div>
            )}

            {receipt?.voided && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#d03b3b]">
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
