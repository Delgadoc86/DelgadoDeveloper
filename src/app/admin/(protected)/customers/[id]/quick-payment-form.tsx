"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { PaymentRecord } from "@/types/payment";
import { PAYMENT_METHODS } from "@/types/payment";
import { getArgentinaCurrentPeriod, getArgentinaTodayISO } from "@/lib/timezone";

// Se prellena con los datos del último pago del cliente (producto, importe,
// concepto, medio de pago) para agilizar el caso más común: repetir un cobro
// mensual cambiando a lo sumo el importe. Período y fecha SÍ se actualizan al
// mes/día actual en vez de copiar los del último pago, porque casi siempre se
// está cobrando el período siguiente, no repitiendo el mismo.
export function QuickPaymentForm({
  customer,
  products,
  lastPayment,
  onCreated,
}: {
  customer: CustomerRecord;
  products: ProductRecord[];
  lastPayment?: PaymentRecord;
  onCreated?: () => void;
}) {
  const router = useRouter();

  const [productId, setProductId] = useState(
    lastPayment?.productId ?? products[0]?.id ?? "",
  );
  const [amount, setAmount] = useState(lastPayment ? String(lastPayment.amount) : "");
  const [concept, setConcept] = useState(lastPayment?.concept ?? "");
  const [period, setPeriod] = useState(getArgentinaCurrentPeriod());
  const [method, setMethod] = useState(lastPayment?.method ?? PAYMENT_METHODS[0]);
  const [date, setDate] = useState(getArgentinaTodayISO());
  const [transferReference, setTransferReference] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      customerId: customer.id,
      productId,
      subscriptionId: null,
      amount: Number(amount),
      concept,
      period,
      method,
      date,
      transferReference,
      notes: "",
    };

    try {
      const response = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", text: data.error ?? "No se pudo guardar" });
        return;
      }

      setFeedback({ type: "ok", text: "Pago registrado" });
      onCreated?.();
      router.refresh();
    } catch {
      setFeedback({ type: "error", text: "Error de red al guardar" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background-subtle flex flex-col gap-3 rounded-lg border p-4"
    >
      <h2 className="font-semibold">Nuevo pago para {customer.name}</h2>

      <label className="flex flex-col gap-1 text-sm">
        Producto
        <select
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Importe (ARS)
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
            className="border-border bg-background-subtle rounded border px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Período
          <input
            type="month"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            required
            className="border-border bg-background-subtle rounded border px-3 py-2"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Concepto / razón del cobro
        <input
          value={concept}
          onChange={(event) => setConcept(event.target.value)}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Medio de pago
          <select
            value={method}
            onChange={(event) =>
              setMethod(event.target.value as (typeof PAYMENT_METHODS)[number])
            }
            className="border-border bg-background-subtle rounded border px-3 py-2"
          >
            {PAYMENT_METHODS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Fecha
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className="border-border bg-background-subtle rounded border px-3 py-2"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Referencia de transferencia (opcional)
        <input
          value={transferReference}
          onChange={(event) => setTransferReference(event.target.value)}
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      {feedback && (
        <p
          role="alert"
          className={
            feedback.type === "ok" ? "text-sm text-[#0ca30c]" : "text-sm text-[#d03b3b]"
          }
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {saving ? "Guardando..." : "Registrar pago"}
      </button>
    </form>
  );
}
