"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProductFrequency, ProductRecord, ProductType } from "@/types/product";
import { PRODUCT_TYPES } from "@/types/product";
import { FREQUENCY_LABEL, PRODUCT_TYPE_LABEL } from "@/lib/admin/format";
import { Button } from "../../_ui/button";
import { Field, Input, Select, Switch } from "../../_ui/fields";
import { InlineAlert } from "../../_ui/primitives";

/** Alta y edición de servicios del catálogo. Pensado para usarse en un <Sheet>. */
export function ProductForm({
  product,
  onDone,
}: {
  product?: ProductRecord;
  onDone?: () => void;
}) {
  const router = useRouter();
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [type, setType] = useState<ProductType>(product?.type ?? "servicio");
  const [price, setPrice] = useState(
    product?.suggestedPrice != null ? String(product.suggestedPrice) : "",
  );
  const [frequency, setFrequency] = useState<ProductFrequency | "">(
    product?.suggestedFrequency ?? "",
  );
  const [active, setActive] = useState(product?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(
        isEditing ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            type,
            suggestedPrice: price ? Number(price.replace(",", ".")) : null,
            suggestedFrequency: frequency || null,
            active,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo guardar");
        return;
      }
      router.refresh();
      onDone?.();
    } catch {
      setError("Error de red al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
      <Field label="Nombre del servicio">
        {(id) => (
          <Input
            id={id}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej.: Mantenimiento web"
            required
          />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo">
          {(id) => (
            <Select
              id={id}
              value={type}
              onChange={(e) => setType(e.target.value as ProductType)}
            >
              {PRODUCT_TYPES.map((value) => (
                <option key={value} value={value}>
                  {PRODUCT_TYPE_LABEL[value]}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field label="Frecuencia habitual" optional>
          {(id) => (
            <Select
              id={id}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as ProductFrequency | "")}
            >
              <option value="">Sin definir</option>
              {(["mensual", "semestral", "anual", "unico"] as const).map((value) => (
                <option key={value} value={value}>
                  {FREQUENCY_LABEL[value]}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>
      <Field
        label="Precio sugerido"
        optional
        hint="Se completa solo al registrar un cobro."
      >
        {(id) => (
          <div className="relative">
            <span className="text-foreground-muted pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
              $
            </span>
            <Input
              id={id}
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ""))}
              className="pl-8 tabular-nums"
            />
          </div>
        )}
      </Field>
      {isEditing ? (
        <div className="border-border rounded-xl border p-3.5">
          <Switch
            checked={active}
            onChange={setActive}
            label="Disponible"
            description="Si lo desactivás, deja de aparecer al registrar cobros."
          />
        </div>
      ) : null}
      {error ? <InlineAlert tone="critical">{error}</InlineAlert> : null}
      <Button type="submit" size="lg" loading={saving} className="w-full">
        {isEditing ? "Guardar cambios" : "Crear servicio"}
      </Button>
    </form>
  );
}
