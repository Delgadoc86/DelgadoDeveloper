"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type {
  SubscriptionFrequency,
  SubscriptionRecord,
  SubscriptionStatus,
} from "@/types/subscription";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { getArgentinaTodayISO } from "@/lib/timezone";
import { Button } from "../../_ui/button";
import { Field, Input, Segmented, Select } from "../../_ui/fields";
import { InlineAlert } from "../../_ui/primitives";

/** Alta y edición de abonos (suscripciones). Pensado para usarse en un <Sheet>. */
export function SubscriptionForm({
  subscription,
  customers,
  products,
  onDone,
}: {
  subscription?: SubscriptionRecord;
  customers: CustomerRecord[];
  products: ProductRecord[];
  onDone?: () => void;
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
  const [frequency, setFrequency] = useState<SubscriptionFrequency>(
    subscription?.frequency ?? "mensual",
  );
  const [nextDueDate, setNextDueDate] = useState(
    subscription?.nextDueDate ?? getArgentinaTodayISO(),
  );
  const [status, setStatus] = useState<SubscriptionStatus>(
    subscription?.status ?? "activa",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function selectProduct(id: string) {
    setProductId(id);
    const product = products.find((p) => p.id === id);
    if (!amount && product?.suggestedPrice) setAmount(String(product.suggestedPrice));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/subscriptions/${subscription!.id}`
          : "/api/admin/subscriptions",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
            productId,
            amount: Number(amount.replace(",", ".")),
            frequency,
            nextDueDate,
            status,
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

  if (!isEditing && customers.length === 0) {
    return (
      <p className="text-foreground-muted pb-2 text-sm">
        Primero cargá al menos un cliente para poder crearle un abono.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
      {!isEditing ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cliente">
            {(id) => (
              <Select
                id={id}
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Servicio">
            {(id) => (
              <Select
                id={id}
                value={productId}
                onChange={(e) => selectProduct(e.target.value)}
                required
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <span className="text-foreground text-[13px] font-medium">Frecuencia</span>
        <Segmented
          label="Frecuencia"
          value={frequency}
          onChange={setFrequency}
          className="w-full [&>button]:flex-1"
          options={[
            { value: "mensual", label: "Mensual" },
            { value: "semestral", label: "Semestral" },
            { value: "anual", label: "Anual" },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Importe">
          {(id) => (
            <div className="relative">
              <span className="text-foreground-muted pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
                $
              </span>
              <Input
                id={id}
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                className="pl-8 tabular-nums"
                required
              />
            </div>
          )}
        </Field>
        <Field
          label="Próximo vencimiento"
          hint="Se corre solo cada vez que emitís el comprobante."
        >
          {(id) => (
            <Input
              id={id}
              type="date"
              value={nextDueDate}
              onChange={(e) => setNextDueDate(e.target.value)}
              required
            />
          )}
        </Field>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-foreground text-[13px] font-medium">Estado</span>
          <Segmented
            label="Estado"
            value={
              status === "activa" || status === "pausada" || status === "cancelada"
                ? status
                : "activa"
            }
            onChange={setStatus}
            className="w-full [&>button]:flex-1"
            options={[
              { value: "activa", label: "Activo" },
              { value: "pausada", label: "Pausado" },
              { value: "cancelada", label: "Cancelado" },
            ]}
          />
        </div>
      ) : null}

      {error ? <InlineAlert tone="critical">{error}</InlineAlert> : null}

      <Button type="submit" size="lg" loading={saving} className="w-full">
        {isEditing ? "Guardar cambios" : "Crear abono"}
      </Button>
    </form>
  );
}
