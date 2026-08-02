"use client";

import { useMemo, useState } from "react";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { CustomerForm } from "./customer-form";

export function CustomersPanel({
  customers,
  products,
  initialShowForm = false,
}: {
  customers: CustomerRecord[];
  products: ProductRecord[];
  initialShowForm?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [showNewForm, setShowNewForm] = useState(initialShowForm);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.businessName, customer.phoneRaw]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term)),
    );
  }, [customers, search]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre, negocio o teléfono"
          className="border-border bg-background-subtle flex-1 rounded border px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => setShowNewForm((value) => !value)}
          className="border-border bg-background-subtle rounded border px-3 py-2 text-sm whitespace-nowrap"
        >
          {showNewForm ? "Cancelar" : "Nuevo cliente"}
        </button>
      </div>

      {showNewForm && (
        <CustomerForm products={products} onCreated={() => setShowNewForm(false)} />
      )}

      {filtered.length === 0 && (
        <p className="text-foreground-muted text-sm">
          No hay clientes que coincidan con la búsqueda.
        </p>
      )}

      {filtered.map((customer) => (
        <CustomerForm key={customer.id} customer={customer} products={products} />
      ))}
    </div>
  );
}
