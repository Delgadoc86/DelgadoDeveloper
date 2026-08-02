"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { SubscriptionRecord } from "@/types/subscription";
import { PAYMENT_METHODS } from "@/types/payment";

export function PaymentForm({
  customers,
  products,
  subscriptions,
  onCreated,
}: {
  customers: CustomerRecord[];
  products: ProductRecord[];
  subscriptions: SubscriptionRecord[];
  onCreated?: () => void;
}) {
  const router = useRouter();

  const [customerList, setCustomerList] = useState(customers);
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? "");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [period, setPeriod] = useState("");
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [transferReference, setTransferReference] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  const [showQuickCustomer, setShowQuickCustomer] = useState(false);
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  const customerSubscriptions = useMemo(
    () => subscriptions.filter((sub) => sub.customerId === customerId),
    [subscriptions, customerId],
  );

  async function handleQuickCreateCustomer() {
    if (!quickName.trim() || !quickPhone.trim()) {
      setQuickError("Nombre y teléfono son obligatorios");
      return;
    }
    setCreatingCustomer(true);
    setQuickError(null);
    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quickName,
          phoneRaw: quickPhone,
          type: "ocasional",
          productIds: [],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setQuickError(data.error ?? "No se pudo crear el cliente");
        return;
      }
      const newCustomer: CustomerRecord = {
        id: data.id,
        name: quickName,
        phone: "",
        phoneRaw: quickPhone,
        type: "ocasional",
        status: "activo",
        productIds: [],
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
      };
      setCustomerList((current) => [...current, newCustomer]);
      setCustomerId(data.id);
      setShowQuickCustomer(false);
      setQuickName("");
      setQuickPhone("");
    } catch {
      setQuickError("Error de red al crear el cliente");
    } finally {
      setCreatingCustomer(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      customerId,
      productId,
      subscriptionId: subscriptionId || null,
      amount: Number(amount),
      concept,
      period,
      method,
      date,
      transferReference,
      notes,
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
      setAmount("");
      setConcept("");
      setPeriod("");
      setTransferReference("");
      setNotes("");
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
      <h2 className="font-semibold">Nuevo pago</h2>

      <label className="flex flex-col gap-1 text-sm">
        Cliente
        <select
          value={customerId}
          onChange={(event) => {
            setCustomerId(event.target.value);
            setSubscriptionId("");
          }}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          {customerList.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => setShowQuickCustomer((value) => !value)}
        className="self-start text-xs underline"
      >
        {showQuickCustomer ? "Cancelar alta rápida" : "+ Nuevo cliente ocasional"}
      </button>

      {showQuickCustomer && (
        <div className="border-border flex flex-col gap-2 rounded border border-dashed p-3">
          <input
            value={quickName}
            onChange={(event) => setQuickName(event.target.value)}
            placeholder="Nombre"
            className="border-border bg-background-subtle rounded border px-3 py-2 text-sm"
          />
          <input
            value={quickPhone}
            onChange={(event) => setQuickPhone(event.target.value)}
            placeholder="Teléfono"
            className="border-border bg-background-subtle rounded border px-3 py-2 text-sm"
          />
          {quickError && <p className="text-xs text-[#d03b3b]">{quickError}</p>}
          <button
            type="button"
            onClick={handleQuickCreateCustomer}
            disabled={creatingCustomer}
            className="border-border text-foreground self-start rounded border px-3 py-1.5 text-xs"
          >
            {creatingCustomer ? "Creando..." : "Crear y usar este cliente"}
          </button>
        </div>
      )}

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

      <label className="flex flex-col gap-1 text-sm">
        Suscripción (opcional)
        <select
          value={subscriptionId}
          onChange={(event) => setSubscriptionId(event.target.value)}
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          <option value="">Ninguna (pago suelto)</option>
          {customerSubscriptions.map((subscription) => (
            <option key={subscription.id} value={subscription.id}>
              {subscription.id} — vence {subscription.nextDueDate}
            </option>
          ))}
        </select>
      </label>

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
        Concepto
        <input
          value={concept}
          onChange={(event) => setConcept(event.target.value)}
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

      <label className="flex flex-col gap-1 text-sm">
        Referencia de transferencia (opcional)
        <input
          value={transferReference}
          onChange={(event) => setTransferReference(event.target.value)}
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Observaciones
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={2}
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
