"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProductRecord } from "@/types/product";
import { formatPeriod } from "@/lib/admin/format";
import { shiftPeriod } from "@/lib/timezone";
import { Select } from "../_ui/fields";

/**
 * Filtros del dashboard en una sola fila, arriba de los gráficos. El mes es
 * un selector propio (no <input type="month">) para que siempre se lea en
 * castellano, sin depender del idioma del navegador.
 */
export function DashboardFilters({
  period,
  currentPeriod,
  productId,
  products,
}: {
  period: string;
  currentPeriod: string;
  productId: string;
  products: ProductRecord[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const months = Array.from({ length: 24 }, (_, i) => shiftPeriod(currentPeriod, -i));
  if (!months.includes(period)) months.unshift(period);

  function update(key: string, value: string, defaultValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === defaultValue) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.push(query ? `/admin?${query}` : "/admin");
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <Select
        aria-label="Mes"
        value={period}
        onChange={(e) => update("period", e.target.value, currentPeriod)}
        className="h-10 sm:w-48"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {formatPeriod(m)}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Servicio"
        value={productId}
        onChange={(e) => update("productId", e.target.value, "all")}
        className="h-10 sm:w-52"
      >
        <option value="all">Servicios</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
