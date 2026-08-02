"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SubscriptionRecord, SubscriptionStatus } from "@/types/subscription";
import { SUBSCRIPTION_FREQUENCIES, SUBSCRIPTION_STATUSES } from "@/types/subscription";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";

export function SubscriptionForm({
  subscription,
  customers,
  products,
  onCreated,
}: {
  subscription?: SubscriptionRecord;
  customers: CustomerRecord[];
  products: ProductRecord[];
  onCreated?: () => void;
}) {
  const router = useRouter();
  const isEditing = Boolean(subscription);

  const [customerId, setCustomerId] = useState(
    subscription?.customerId ?? customers[0]?.id ?? "",
  );
  const [productId, setProductId] = useState(
    subscription?.productId ?? products[0]?.id ?? "",
  );
  const [amount, setAmount] = useState(subscription ? String(subscription.amount) : "");
  const [frequency, setFrequency] = useState(
    subscription?.frequency ?? SUBSCRIPTION_FREQUENCIES[0],
  );
  const [nextDueDate, setNextDueDate] = useState(subscription?.nextDueDate ?? "");
  const [status, setStatus] = useState<SubscriptionStatus>(
    subscription?.status ?? "activa",
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      customerId,
      productId,
      amount: Number(amount),
      frequency,
      nextDueDate,
      status,
    };

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/subscriptions/${subscription!.id}`
          : "/api/admin/subscriptions",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", text: data.error ?? "No se pudo guardar" });
        return;
      }

      setFeedback({ type: "ok", text: isEditing ? "Guardado" : "Suscripción creada" });
      if (!isEditing) {
        setAmount("");
        setNextDueDate("");
        onCreated?.();
      }
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
      <h2 className="font-semibold">
        {isEditing
          ? `${customers.find((c) => c.id === subscription!.customerId)?.name ?? "Cliente"} — ${
              products.find((p) => p.id === subscription!.productId)?.name ?? "Producto"
            }`
          : "Nueva suscripción"}
      </h2>

      {!isEditing && (
        <>
          <label className="flex flex-col gap-1 text-sm">
            Cliente
            <select
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              required
              className="border-border bg-background-subtle rounded border px-3 py-2"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>

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
        </>
      )}

      <label className="flex flex-col gap-1 text-sm">
        Importe acordado (ARS)
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
        Frecuencia
        <select
          value={frequency}
          onChange={(event) =>
            setFrequency(event.target.value as (typeof SUBSCRIPTION_FREQUENCIES)[number])
          }
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          {SUBSCRIPTION_FREQUENCIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Próximo vencimiento
        <input
          type="date"
          value={nextDueDate}
          onChange={(event) => setNextDueDate(event.target.value)}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      {isEditing && (
        <label className="flex flex-col gap-1 text-sm">
          Estado
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as SubscriptionStatus)}
            className="border-border bg-background-subtle rounded border px-3 py-2"
          >
            {SUBSCRIPTION_STATUSES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      )}

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
        {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear suscripción"}
      </button>
    </form>
  );
}
