"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CustomerRecord, CustomerStatus, CustomerType } from "@/types/customer";
import { CUSTOMER_STATUSES, CUSTOMER_TYPES } from "@/types/customer";
import type { ProductRecord } from "@/types/product";

export function CustomerForm({
  customer,
  products,
  onCreated,
}: {
  customer?: CustomerRecord;
  products: ProductRecord[];
  onCreated?: () => void;
}) {
  const router = useRouter();
  const isEditing = Boolean(customer);

  const [name, setName] = useState(customer?.name ?? "");
  const [businessName, setBusinessName] = useState(customer?.businessName ?? "");
  const [phoneRaw, setPhoneRaw] = useState(customer?.phoneRaw ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [taxId, setTaxId] = useState(customer?.taxId ?? "");
  const [notes, setNotes] = useState(customer?.notes ?? "");
  const [type, setType] = useState<CustomerType>(customer?.type ?? "ocasional");
  const [status, setStatus] = useState<CustomerStatus>(customer?.status ?? "activo");
  const [productIds, setProductIds] = useState<string[]>(customer?.productIds ?? []);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  function toggleProduct(id: string) {
    setProductIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      name,
      businessName,
      phoneRaw,
      email,
      taxId,
      notes,
      type,
      status,
      productIds,
    };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/customers/${customer!.id}` : "/api/admin/customers",
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

      setFeedback({ type: "ok", text: isEditing ? "Guardado" : "Cliente creado" });
      if (!isEditing) {
        setName("");
        setBusinessName("");
        setPhoneRaw("");
        setEmail("");
        setTaxId("");
        setNotes("");
        setProductIds([]);
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
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
    >
      <h2 className="font-semibold">{isEditing ? customer!.name : "Nuevo cliente"}</h2>

      <label className="flex flex-col gap-1 text-sm">
        Nombre
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Negocio
        <input
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Teléfono
        <input
          value={phoneRaw}
          onChange={(event) => setPhoneRaw(event.target.value)}
          required
          placeholder="011 15-1234-5678"
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Correo
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        CUIT / DNI (opcional)
        <input
          value={taxId}
          onChange={(event) => setTaxId(event.target.value)}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Tipo
        <select
          value={type}
          onChange={(event) => setType(event.target.value as CustomerType)}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        >
          {CUSTOMER_TYPES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {isEditing && (
        <label className="flex flex-col gap-1 text-sm">
          Estado
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as CustomerStatus)}
            className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
          >
            {CUSTOMER_STATUSES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      )}

      <fieldset className="flex flex-col gap-1 text-sm">
        <legend>Servicios contratados</legend>
        {products.map((product) => (
          <label key={product.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={productIds.includes(product.id)}
              onChange={() => toggleProduct(product.id)}
            />
            {product.name}
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Notas
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      {feedback && (
        <p
          role="alert"
          className={
            feedback.type === "ok"
              ? "text-sm text-green-600 dark:text-green-400"
              : "text-sm text-red-600 dark:text-red-400"
          }
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear cliente"}
      </button>
    </form>
  );
}
