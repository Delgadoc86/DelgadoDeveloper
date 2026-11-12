"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, UserPlus, Users } from "lucide-react";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import { Button } from "../../_ui/button";
import { Input, Segmented, Sheet } from "../../_ui/fields";
import { Avatar, Card, EmptyState, StatusBadge } from "../../_ui/primitives";
import { CustomerForm } from "./customer-form";

export interface CustomerStats {
  total: number;
  count: number;
  lastDate: string;
}

type Filter = "all" | "recurrente" | "ocasional" | "inactivo";

function matchesFilter(c: CustomerRecord, f: Filter) {
  if (f === "all") return c.status === "activo";
  if (f === "inactivo") return c.status === "inactivo";
  return c.status === "activo" && c.type === f;
}

export function CustomersView({
  customers,
  products,
  stats,
  initialOpen,
}: {
  customers: CustomerRecord[];
  products: ProductRecord[];
  stats: Record<string, CustomerStats>;
  initialOpen: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(initialOpen);

  const counts = useMemo(
    () => ({
      all: customers.filter((c) => matchesFilter(c, "all")).length,
      recurrente: customers.filter((c) => matchesFilter(c, "recurrente")).length,
      ocasional: customers.filter((c) => matchesFilter(c, "ocasional")).length,
      inactivo: customers.filter((c) => matchesFilter(c, "inactivo")).length,
    }),
    [customers],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return customers.filter((c) => {
      if (!matchesFilter(c, filter)) return false;
      if (!term) return true;
      return [c.name, c.businessName, c.phoneRaw, c.email]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(term));
    });
  }, [customers, filter, query]);

  const sheet = (
    <Sheet
      open={open}
      onClose={() => setOpen(false)}
      title="Nuevo cliente"
      description="Con el teléfono vas a poder mandarle comprobantes por WhatsApp."
    >
      <CustomerForm
        products={products}
        onDone={(id) => {
          setOpen(false);
          router.push(`/admin/customers/${id}`);
        }}
      />
    </Sheet>
  );

  if (customers.length === 0) {
    return (
      <>
        <Card>
          <EmptyState
            icon={Users}
            title="Todavía no cargaste clientes"
            description="Agregá a quienes te pagan para registrar sus cobros y emitirles comprobantes."
            action={
              <Button onClick={() => setOpen(true)}>
                <UserPlus className="size-4" aria-hidden />
                Agregar cliente
              </Button>
            }
          />
        </Card>
        {sheet}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="text-foreground-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, negocio o teléfono"
            aria-label="Buscar clientes"
            className="pl-10"
          />
        </div>
        <Button onClick={() => setOpen(true)} aria-label="Nuevo cliente">
          <UserPlus className="size-4" aria-hidden />
          <span className="hidden sm:inline">Nuevo cliente</span>
        </Button>
      </div>

      <Segmented
        label="Filtrar clientes"
        value={filter}
        onChange={setFilter}
        size="sm"
        className="self-start"
        options={[
          { value: "all", label: "Activos", count: counts.all },
          { value: "recurrente", label: "Recurrentes", count: counts.recurrente },
          { value: "ocasional", label: "Ocasionales", count: counts.ocasional },
          { value: "inactivo", label: "Inactivos", count: counts.inactivo },
        ]}
      />

      <Card className="overflow-hidden">
        <div className="text-foreground-muted border-border hidden grid-cols-[1fr_160px_140px_20px] gap-4 border-b px-5 py-2.5 text-[12px] font-medium md:grid">
          <span>Cliente</span>
          <span className="text-right">Total cobrado</span>
          <span className="text-right">Último cobro</span>
          <span />
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="Probá con otra búsqueda."
          />
        ) : (
          <ul className="divide-border divide-y">
            {filtered.map((customer) => {
              const s = stats[customer.id];
              return (
                <li key={customer.id}>
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="hover:bg-surface-sunken/70 flex items-center gap-3 px-4 py-3.5 transition-colors sm:px-5 md:grid md:grid-cols-[1fr_160px_140px_20px] md:gap-4"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <Avatar name={customer.name} />
                      <div className="min-w-0">
                        <p className="text-foreground flex items-center gap-2 truncate text-sm font-medium">
                          <span className="truncate">{customer.name}</span>
                          {customer.type === "recurrente" ? (
                            <StatusBadge
                              tone="accent"
                              icon={false}
                              className="hidden sm:inline-flex"
                            >
                              Recurrente
                            </StatusBadge>
                          ) : null}
                        </p>
                        <p className="text-foreground-muted truncate text-[13px]">
                          {customer.businessName ?? customer.phoneRaw}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right md:contents">
                      <p className="text-foreground text-sm font-semibold tabular-nums md:text-right">
                        {formatCurrency(s?.total ?? 0)}
                      </p>
                      <p className="text-foreground-muted text-[12px] md:text-right md:text-[13px]">
                        {s?.lastDate ? formatDate(s.lastDate) : "Sin cobros"}
                      </p>
                    </div>
                    <ChevronRight
                      className="text-foreground-muted hidden size-4 md:block"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      {sheet}
    </div>
  );
}
