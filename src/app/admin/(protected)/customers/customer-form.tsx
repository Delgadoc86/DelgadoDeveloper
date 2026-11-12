"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import type { CustomerRecord, CustomerStatus, CustomerType } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { cn } from "@/lib/utils";
import { Button } from "../../_ui/button";
import { Field, Input, Segmented, Textarea } from "../../_ui/fields";
import { InlineAlert } from "../../_ui/primitives";

/** Alta y edición de cliente. Pensado para usarse dentro de un <Sheet>. */
export function CustomerForm({
  customer,
  products,
  onDone,
}: {
  customer?: CustomerRecord;
  products: ProductRecord[];
  onDone?: (id: string) => void;
}) {
  const router = useRouter();
  const isEditing = Boolean(customer);

  const [name, setName] = useState(customer?.name ?? "");
  const [businessName, setBusinessName] = useState(customer?.businessName ?? "");
  const [phoneRaw, setPhoneRaw] = useState(customer?.phoneRaw ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [taxId, setTaxId] = useState(customer?.taxId ?? "");
  const [notes, setNotes] = useState(customer?.notes ?? "");
  const [type, setType] = useState<CustomerType>(customer?.type ?? "recurrente");
  const [status, setStatus] = useState<CustomerStatus>(customer?.status ?? "activo");
  const [productIds, setProductIds] = useState<string[]>(customer?.productIds ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleProduct(id: string) {
    setProductIds((list) =>
      list.includes(id) ? list.filter((v) => v !== id) : [...list, id],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(
        isEditing ? `/api/admin/customers/${customer!.id}` : "/api/admin/customers",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            businessName,
            phoneRaw,
            email,
            taxId,
            notes,
            type,
            status,
            productIds,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo guardar");
        return;
      }
      router.refresh();
      onDone?.(isEditing ? customer!.id : data.id);
    } catch {
      setError("Error de red al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
      <Field label="Nombre y apellido">
        {(id) => (
          <Input
            id={id}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
        )}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Negocio" optional>
          {(id) => (
            <Input
              id={id}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          )}
        </Field>
        <Field label="Teléfono" hint="Para enviarle comprobantes por WhatsApp.">
          {(id) => (
            <Input
              id={id}
              type="tel"
              inputMode="tel"
              value={phoneRaw}
              onChange={(e) => setPhoneRaw(e.target.value)}
              placeholder="261 555-1234"
              required
            />
          )}
        </Field>
        <Field label="Correo" optional>
          {(id) => (
            <Input
              id={id}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Field label="CUIT / DNI" optional hint="Aparece en el comprobante.">
          {(id) => (
            <Input id={id} value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          )}
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-foreground text-[13px] font-medium">Tipo de cliente</span>
        <Segmented
          label="Tipo de cliente"
          value={type}
          onChange={setType}
          className="w-full [&>button]:flex-1"
          options={[
            { value: "recurrente", label: "Recurrente" },
            { value: "ocasional", label: "Ocasional" },
          ]}
        />
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-foreground text-[13px] font-medium">Estado</span>
          <Segmented
            label="Estado"
            value={status}
            onChange={setStatus}
            className="w-full [&>button]:flex-1"
            options={[
              { value: "activo", label: "Activo" },
              { value: "inactivo", label: "Inactivo" },
            ]}
          />
        </div>
      ) : null}

      {products.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <span className="text-foreground text-[13px] font-medium">
            Servicios contratados
          </span>
          <div className="flex flex-wrap gap-2">
            {products.map((product) => {
              const active = productIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleProduct(product.id)}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                    active
                      ? "border-accent bg-accent-muted text-accent-bright"
                      : "border-border text-foreground-muted hover:text-foreground",
                  )}
                >
                  {active ? (
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  ) : null}
                  {product.name}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <Field label="Notas" optional>
        {(id) => (
          <Textarea
            id={id}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        )}
      </Field>

      {error ? <InlineAlert tone="critical">{error}</InlineAlert> : null}

      <Button type="submit" size="lg" loading={saving} className="w-full">
        {isEditing ? "Guardar cambios" : "Crear cliente"}
      </Button>
    </form>
  );
}
