"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {filtered.map((customer) => (
          <Link
            key={customer.id}
            href={`/admin/customers/${customer.id}`}
            className="border-border bg-background-subtle hover:border-accent flex items-center justify-between gap-3 rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">
              <span className="bg-accent-muted text-accent-bright flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {customer.name.charAt(0).toUpperCase()}
              </span>
              <div className="flex flex-col">
                <span className="text-foreground text-sm font-semibold">
                  {customer.name}
                </span>
                <span className="text-foreground-muted text-xs">
                  {customer.businessName ?? customer.phoneRaw}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {customer.status === "inactivo" && (
                <span className="text-foreground-muted text-xs">Inactivo</span>
              )}
              <ChevronRight className="text-foreground-muted size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
