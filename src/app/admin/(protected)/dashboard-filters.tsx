"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProductRecord } from "@/types/product";

export function DashboardFilters({
  period,
  productId,
  products,
}: {
  period: string;
  productId: string;
  products: ProductRecord[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="month"
        value={period}
        onChange={(event) => updateParam("period", event.target.value)}
        className="border-border bg-background-subtle rounded border px-3 py-2 text-sm"
      />
      <select
        value={productId}
        onChange={(event) => updateParam("productId", event.target.value)}
        className="border-border bg-background-subtle rounded border px-3 py-2 text-sm"
      >
        <option value="all">Todos los productos</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
}
