"use client";

import { useMemo, useState } from "react";
import { Receipt, Search } from "lucide-react";
import type { PaymentRecord, PaymentStatus } from "@/types/payment";
import type { ReceiptRecord } from "@/types/receipt";
import { formatCurrency, formatPeriod } from "@/lib/admin/format";
import { ButtonLink } from "../../_ui/button";
import { Input, Segmented, Select } from "../../_ui/fields";
import { PaymentItem } from "../../_ui/payment-item";
import { Card, EmptyState } from "../../_ui/primitives";

export type StatusFilter = "all" | PaymentStatus;

export function PaymentsView({
  payments,
  receiptsById,
  customerNames,
  productNames,
  initialStatus,
}: {
  payments: PaymentRecord[];
  receiptsById: Record<string, ReceiptRecord>;
  customerNames: Record<string, string>;
  productNames: Record<string, string>;
  initialStatus: StatusFilter;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>(initialStatus);
  const [period, setPeriod] = useState("all");

  const periods = useMemo(
    () => [...new Set(payments.map((p) => p.period))].sort().reverse(),
    [payments],
  );

  const counts = useMemo(() => {
    const base = { all: 0, registrado: 0, emitido: 0, anulado: 0 };
    for (const p of payments) {
      if (period !== "all" && p.period !== period) continue;
      base.all += 1;
      base[p.status] += 1;
    }
    return base;
  }, [payments, period]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return payments.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (period !== "all" && p.period !== period) return false;
      if (!term) return true;
      const receipt = p.receiptId ? receiptsById[p.receiptId] : undefined;
      return [
        customerNames[p.customerId],
        p.concept,
        receipt?.number,
        productNames[p.productId],
      ]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(term));
    });
  }, [payments, status, period, query, receiptsById, customerNames, productNames]);

  const groups = useMemo(() => {
    const map = new Map<string, PaymentRecord[]>();
    for (const p of filtered) {
      const list = map.get(p.period) ?? [];
      list.push(p);
      map.set(p.period, list);
    }
    return [...map.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  if (payments.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Receipt}
          title="Todavía no hay cobros"
          description="Registrá un cobro y emití el comprobante para mandarlo por WhatsApp en el momento."
          action={<ButtonLink href="/admin/payments/new">Registrar cobro</ButtonLink>}
        />
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="text-foreground-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por cliente, concepto o N.º de comprobante"
            aria-label="Buscar cobros"
            className="pl-10"
          />
        </div>
        <Select
          aria-label="Mes"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="lg:w-48"
        >
          <option value="all">Todos los meses</option>
          {periods.map((p) => (
            <option key={p} value={p}>
              {formatPeriod(p)}
            </option>
          ))}
        </Select>
      </div>

      <Segmented
        label="Estado"
        value={status}
        onChange={setStatus}
        size="sm"
        className="self-start"
        options={[
          { value: "all", label: "Todos", count: counts.all },
          { value: "registrado", label: "Sin comprobante", count: counts.registrado },
          { value: "emitido", label: "Emitidos", count: counts.emitido },
          { value: "anulado", label: "Anulados", count: counts.anulado },
        ]}
      />

      {groups.length === 0 ? (
        <Card>
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="Probá con otra búsqueda o cambiá los filtros."
          />
        </Card>
      ) : (
        groups.map(([groupPeriod, list]) => {
          const total = list
            .filter((p) => p.status !== "anulado")
            .reduce((sum, p) => sum + p.amount, 0);
          return (
            <section key={groupPeriod}>
              <div className="mb-2 flex items-baseline justify-between px-1">
                <h2 className="text-foreground text-[13px] font-semibold">
                  {formatPeriod(groupPeriod)}
                </h2>
                <p className="text-foreground-muted text-[13px] tabular-nums">
                  {list.length} {list.length === 1 ? "cobro" : "cobros"} ·{" "}
                  <span className="text-foreground font-medium">
                    {formatCurrency(total)}
                  </span>
                </p>
              </div>
              <Card className="divide-border divide-y overflow-hidden">
                {list.map((payment) => (
                  <PaymentItem
                    key={payment.id}
                    payment={payment}
                    receipt={
                      payment.receiptId ? receiptsById[payment.receiptId] : undefined
                    }
                    customerName={customerNames[payment.customerId] ?? "Cliente"}
                    productName={productNames[payment.productId] ?? "Servicio"}
                  />
                ))}
              </Card>
            </section>
          );
        })
      )}
    </div>
  );
}
