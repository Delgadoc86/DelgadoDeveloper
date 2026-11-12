"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, CalendarPlus, Pencil } from "lucide-react";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { SubscriptionRecord } from "@/types/subscription";
import {
  dueState,
  formatCurrency,
  formatDate,
  formatRelativeDay,
  FREQUENCY_LABEL,
  type DueState,
} from "@/lib/admin/format";
import { Button, ButtonLink } from "../../_ui/button";
import { DueBadge } from "../../_ui/due-badge";
import { Sheet } from "../../_ui/fields";
import { Avatar, Card, EmptyState } from "../../_ui/primitives";
import { SubscriptionForm } from "./subscription-form";

/** Equivalente mensual de un abono, para el ingreso recurrente (MRR). */
function monthlyValue(sub: SubscriptionRecord) {
  if (sub.frequency === "mensual") return sub.amount;
  if (sub.frequency === "semestral") return sub.amount / 6;
  if (sub.frequency === "anual") return sub.amount / 12;
  return 0;
}

const GROUPS: { state: DueState; title: string }[] = [
  { state: "vencida", title: "Vencidos" },
  { state: "proxima", title: "Vencen esta semana" },
  { state: "al_dia", title: "Al día" },
  { state: "inactiva", title: "Pausados y cancelados" },
];

export function SubscriptionsView({
  subscriptions,
  customers,
  products,
  today,
}: {
  subscriptions: SubscriptionRecord[];
  customers: CustomerRecord[];
  products: ProductRecord[];
  today: string;
}) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<SubscriptionRecord | null>(null);

  const customerName = (id: string) =>
    customers.find((c) => c.id === id)?.name ?? "Cliente";
  const productName = (id: string) =>
    products.find((p) => p.id === id)?.name ?? "Servicio";
  const withState = subscriptions.map((sub) => ({ sub, state: dueState(sub, today) }));
  const sumOf = (state: DueState) =>
    withState.filter((s) => s.state === state).reduce((t, s) => t + s.sub.amount, 0);
  const countOf = (state: DueState) => withState.filter((s) => s.state === state).length;
  const mrr = withState
    .filter((s) => s.state !== "inactiva")
    .reduce((t, s) => t + monthlyValue(s.sub), 0);

  const activeCustomers = customers.filter((c) => c.status === "activo");
  const activeProducts = products.filter((p) => p.active);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Summary label="Ingreso recurrente" value={formatCurrency(mrr)} hint="por mes" />
        <Summary
          label="Vencidos"
          value={formatCurrency(sumOf("vencida"))}
          hint={`${countOf("vencida")} abono${countOf("vencida") === 1 ? "" : "s"}`}
          tone={countOf("vencida") ? "critical" : undefined}
        />
        <Summary
          label="Vencen esta semana"
          value={formatCurrency(sumOf("proxima"))}
          hint={`${countOf("proxima")} abono${countOf("proxima") === 1 ? "" : "s"}`}
          tone={countOf("proxima") ? "warning" : undefined}
        />
        <Summary
          label="Abonos activos"
          value={String(subscriptions.length - countOf("inactiva"))}
          hint="en total"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)}>
          <CalendarPlus className="size-4" aria-hidden />
          Nuevo abono
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <EmptyState
            icon={CalendarClock}
            title="Sin abonos cargados"
            description="Si cobrás mantenimiento u hosting todos los meses, cargalo como abono y el panel te avisa cuándo toca cobrar."
            action={<Button onClick={() => setCreating(true)}>Crear abono</Button>}
          />
        </Card>
      ) : (
        GROUPS.map(({ state, title }) => {
          const items = withState.filter((s) => s.state === state);
          if (items.length === 0) return null;
          return (
            <section key={state}>
              <h2 className="text-foreground mb-2 px-1 text-[13px] font-semibold">
                {title}{" "}
                <span className="text-foreground-muted font-normal">
                  · {items.length}
                </span>
              </h2>
              <Card className="divide-border divide-y overflow-hidden">
                {items.map(({ sub, state: s }) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                  >
                    <Avatar name={customerName(sub.customerId)} />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/customers/${sub.customerId}`}
                        className="text-foreground block truncate text-sm font-medium hover:underline"
                      >
                        {customerName(sub.customerId)}
                      </Link>
                      <p className="text-foreground-muted truncate text-[13px]">
                        {productName(sub.productId)} · {FREQUENCY_LABEL[sub.frequency]}
                      </p>
                    </div>
                    <div className="hidden shrink-0 text-right sm:block">
                      <p className="text-foreground text-sm font-semibold tabular-nums">
                        {formatCurrency(sub.amount)}
                      </p>
                      <p className="text-foreground-muted text-[12px]">
                        {formatDate(sub.nextDueDate)} ·{" "}
                        {formatRelativeDay(sub.nextDueDate, today)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-foreground text-sm font-semibold tabular-nums sm:hidden">
                        {formatCurrency(sub.amount)}
                      </span>
                      <DueBadge state={s} />
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {s !== "inactiva" ? (
                        <ButtonLink
                          href={`/admin/payments/new?subscriptionId=${sub.id}`}
                          size="sm"
                          variant={s === "al_dia" ? "ghost" : "primary"}
                        >
                          Cobrar
                        </ButtonLink>
                      ) : null}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setEditing(sub)}
                        aria-label={`Editar abono de ${customerName(sub.customerId)}`}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>
            </section>
          );
        })
      )}

      <Sheet open={creating} onClose={() => setCreating(false)} title="Nuevo abono">
        <SubscriptionForm
          customers={activeCustomers}
          products={activeProducts}
          onDone={() => setCreating(false)}
        />
      </Sheet>
      <Sheet
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="Editar abono"
        description={
          editing
            ? `${customerName(editing.customerId)} · ${productName(editing.productId)}`
            : undefined
        }
      >
        {editing ? (
          <SubscriptionForm
            key={editing.id}
            subscription={editing}
            customers={customers}
            products={products}
            onDone={() => setEditing(null)}
          />
        ) : null}
      </Sheet>
    </div>
  );
}

function Summary({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "critical" | "warning";
}) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-foreground-muted flex items-center gap-1.5 text-[13px] font-medium">
        {tone ? (
          <span
            aria-hidden
            className={
              tone === "critical"
                ? "bg-status-critical size-2 rounded-full"
                : "bg-status-warning size-2 rounded-full"
            }
          />
        ) : null}
        {label}
      </p>
      <p className="text-foreground mt-1 truncate text-xl font-semibold tracking-tight sm:text-2xl">
        {value}
      </p>
      <p className="text-foreground-muted mt-0.5 text-[12px]">{hint}</p>
    </Card>
  );
}
