"use client";

import { useState } from "react";
import { ChevronRight, Package, Plus } from "lucide-react";
import type { ProductRecord } from "@/types/product";
import { formatCurrency, FREQUENCY_LABEL, PRODUCT_TYPE_LABEL } from "@/lib/admin/format";
import { Button } from "../../_ui/button";
import { Sheet } from "../../_ui/fields";
import { Card, EmptyState, StatusBadge } from "../../_ui/primitives";
import { ProductForm } from "./product-form";

export function ProductsView({
  products,
  usage,
}: {
  products: ProductRecord[];
  usage: Record<string, number>;
}) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<ProductRecord | null>(null);
  const sorted = [...products].sort(
    (a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name, "es"),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)}>
          <Plus className="size-4" aria-hidden />
          Nuevo servicio
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <EmptyState
            icon={Package}
            title="Sin servicios"
            description="Cargá lo que cobrás (desarrollo, mantenimiento, hosting…) para registrar cobros más rápido."
            action={<Button onClick={() => setCreating(true)}>Crear servicio</Button>}
          />
        </Card>
      ) : (
        <Card className="divide-border divide-y overflow-hidden">
          {sorted.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setEditing(product)}
              className="hover:bg-surface-sunken/70 flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors sm:px-5"
            >
              <span className="bg-accent-muted text-accent-bright flex size-10 shrink-0 items-center justify-center rounded-xl">
                <Package className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-foreground block truncate text-sm font-medium">
                  {product.name}
                </span>
                <span className="text-foreground-muted block truncate text-[13px]">
                  {PRODUCT_TYPE_LABEL[product.type] ?? product.type}
                  {product.suggestedFrequency
                    ? ` · ${FREQUENCY_LABEL[product.suggestedFrequency]}`
                    : ""}
                  {usage[product.id] ? ` · ${usage[product.id]} cobros` : ""}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-foreground text-sm font-semibold tabular-nums">
                  {product.suggestedPrice != null
                    ? formatCurrency(product.suggestedPrice)
                    : "—"}
                </span>
                {!product.active ? (
                  <StatusBadge tone="neutral">Inactivo</StatusBadge>
                ) : null}
              </span>
              <ChevronRight
                className="text-foreground-muted size-4 shrink-0"
                aria-hidden
              />
            </button>
          ))}
        </Card>
      )}

      <Sheet open={creating} onClose={() => setCreating(false)} title="Nuevo servicio">
        <ProductForm onDone={() => setCreating(false)} />
      </Sheet>
      <Sheet
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Editar servicio"
      >
        {editing ? (
          <ProductForm
            key={editing.id}
            product={editing}
            onDone={() => setEditing(null)}
          />
        ) : null}
      </Sheet>
    </div>
  );
}
