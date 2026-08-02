"use client";

import { useState } from "react";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { PaymentRecord } from "@/types/payment";
import { CustomerForm } from "../customer-form";
import { QuickPaymentForm } from "./quick-payment-form";

export function CustomerActions({
  customer,
  products,
  lastPayment,
}: {
  customer: CustomerRecord;
  products: ProductRecord[];
  lastPayment?: PaymentRecord;
}) {
  const [showPayment, setShowPayment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowPayment((value) => !value)}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded px-3 py-2 text-sm font-medium"
        >
          {showPayment ? "Cancelar" : "Nuevo pago"}
        </button>
        <button
          type="button"
          onClick={() => setShowEdit((value) => !value)}
          className="border-border bg-background-subtle rounded border px-3 py-2 text-sm font-medium"
        >
          {showEdit ? "Cancelar" : "Editar cliente"}
        </button>
      </div>

      {showPayment && (
        <QuickPaymentForm
          customer={customer}
          products={products}
          lastPayment={lastPayment}
          onCreated={() => setShowPayment(false)}
        />
      )}

      {showEdit && <CustomerForm customer={customer} products={products} />}
    </div>
  );
}
