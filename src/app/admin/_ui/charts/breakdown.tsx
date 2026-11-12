"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

export interface BreakdownItem {
  key: string;
  label: string;
  value: number;
  /** Color fijo de la entidad (solo SegmentedBar). Sigue a la entidad, no al ranking. */
  color?: string;
}

const pct = (value: number, total: number) =>
  total > 0 ? Math.round((value / total) * 100) : 0;

/**
 * Ranking horizontal (ingresos por servicio): una sola serie y un solo
 * color (magnitud), barras finas con extremo de datos redondeado y base
 * recta, valor + porcentaje en texto (no en el color de la serie).
 */
export function BarList({
  items,
  emptyLabel = "Sin datos en este período",
}: {
  items: BreakdownItem[];
  emptyLabel?: string;
}) {
  const sorted = [...items].filter((i) => i.value > 0).sort((a, b) => b.value - a.value);
  const max = sorted[0]?.value ?? 0;
  const total = sorted.reduce((sum, i) => sum + i.value, 0);

  if (sorted.length === 0) {
    return <p className="text-foreground-muted py-8 text-center text-sm">{emptyLabel}</p>;
  }

  return (
    <ul className="flex flex-col gap-3.5">
      {sorted.map((item) => (
        <li key={item.key} className="group">
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="text-foreground truncate">{item.label}</span>
            <span className="text-foreground shrink-0 font-medium tabular-nums">
              {formatCurrency(item.value)}
              <span className="text-foreground-muted ml-1.5 text-[12px] font-normal">
                {pct(item.value, total)}%
              </span>
            </span>
          </div>
          <div className="bg-chart-grid h-2 w-full rounded-r-[4px]">
            <div
              className="h-2 rounded-r-[4px] transition-[width] duration-500 group-hover:brightness-110"
              style={{
                width: `${Math.max(2, (item.value / max) * 100)}%`,
                background: "var(--chart-1)",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Una parte de un todo (medios de pago): barra segmentada fina con 2px de
 * separación del color de superficie + leyenda con montos y porcentajes
 * visibles (alivio para los tonos de menor contraste en modo claro).
 * Los colores siguen a la entidad (cada medio tiene su slot fijo).
 */
export function SegmentedBar({
  items,
  emptyLabel = "Sin cobros en este período",
}: {
  items: BreakdownItem[];
  emptyLabel?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const visible = items.filter((i) => i.value > 0);
  const total = visible.reduce((sum, i) => sum + i.value, 0);

  if (total === 0) {
    return <p className="text-foreground-muted py-8 text-center text-sm">{emptyLabel}</p>;
  }

  const summary = visible
    .map((i) => `${i.label}: ${formatCurrency(i.value)} (${pct(i.value, total)}%)`)
    .join(", ");

  return (
    <div>
      <div
        role="img"
        aria-label={summary}
        className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full"
      >
        {visible.map((item) => (
          <div
            key={item.key}
            onPointerEnter={() => setHovered(item.key)}
            onPointerLeave={() => setHovered(null)}
            className="h-full transition-opacity"
            style={{
              width: `${(item.value / total) * 100}%`,
              background: item.color ?? "var(--method-4)",
              opacity: hovered && hovered !== item.key ? 0.35 : 1,
            }}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-1">
        {items.map((item) => (
          <li
            key={item.key}
            onPointerEnter={() => setHovered(item.key)}
            onPointerLeave={() => setHovered(null)}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors",
              hovered === item.key && "bg-surface-sunken",
              item.value === 0 && "opacity-50",
            )}
          >
            <span className="text-foreground flex min-w-0 items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ background: item.color ?? "var(--method-4)" }}
              />
              <span className="truncate">{item.label}</span>
            </span>
            <span className="text-foreground shrink-0 font-medium tabular-nums">
              {formatCurrency(item.value)}
              <span className="text-foreground-muted ml-1.5 w-9 text-right text-[12px] font-normal">
                {pct(item.value, total)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
