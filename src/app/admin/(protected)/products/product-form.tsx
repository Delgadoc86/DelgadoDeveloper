"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProductRecord } from "@/types/product";
import { PRODUCT_FREQUENCIES, PRODUCT_TYPES } from "@/types/product";

export function ProductForm({ product }: { product?: ProductRecord }) {
  const router = useRouter();
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [type, setType] = useState(product?.type ?? PRODUCT_TYPES[0]);
  const [suggestedPrice, setSuggestedPrice] = useState(
    product?.suggestedPrice != null ? String(product.suggestedPrice) : "",
  );
  const [suggestedFrequency, setSuggestedFrequency] = useState(
    product?.suggestedFrequency ?? "",
  );
  const [active, setActive] = useState(product?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      name,
      type,
      suggestedPrice: suggestedPrice ? Number(suggestedPrice) : null,
      suggestedFrequency: suggestedFrequency || null,
      active,
    };

    try {
      const response = await fetch(
        isEditing ? `/api/admin/products/${product!.id}` : "/api/admin/products",
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

      setFeedback({ type: "ok", text: isEditing ? "Guardado" : "Producto creado" });
      if (!isEditing) {
        setName("");
        setSuggestedPrice("");
        setSuggestedFrequency("");
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
      <h2 className="font-semibold">{isEditing ? product!.name : "Nuevo producto"}</h2>

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
        Tipo
        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value as (typeof PRODUCT_TYPES)[number])
          }
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        >
          {PRODUCT_TYPES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Precio sugerido (ARS)
        <input
          type="number"
          min="0"
          step="0.01"
          value={suggestedPrice}
          onChange={(event) => setSuggestedPrice(event.target.value)}
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Frecuencia sugerida
        <select
          value={suggestedFrequency}
          onChange={(event) =>
            setSuggestedFrequency(
              event.target.value as (typeof PRODUCT_FREQUENCIES)[number] | "",
            )
          }
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        >
          <option value="">Sin definir</option>
          {PRODUCT_FREQUENCIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {isEditing && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          Activo
        </label>
      )}

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
        {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
}
