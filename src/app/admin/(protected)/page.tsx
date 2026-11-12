import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  FileWarning,
  Receipt,
  Users,
  Wallet,
} from "lucide-react";
import {
  getCustomers,
  getPayments,
  getProducts,
  getReceiptsById,
  getSubscriptions,
} from "@/lib/admin/data";
import {
  dueState,
  formatCurrency,
  formatPeriod,
  formatPeriodShort,
  formatRelativeDay,
  METHOD_LABEL,
} from "@/lib/admin/format";
import {
  getArgentinaCurrentPeriod,
  getArgentinaTodayISO,
  shiftPeriod,
} from "@/lib/timezone";
import { PAYMENT_METHODS, type PaymentRecord } from "@/types/payment";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../_ui/button";
import { BarList, SegmentedBar } from "../_ui/charts/breakdown";
import { TrendChart } from "../_ui/charts/trend-chart";
import { PaymentItem } from "../_ui/payment-item";
import { Avatar, Card, CardHeader, EmptyState, StatusBadge } from "../_ui/primitives";
import { DashboardFilters } from "./dashboard-filters";

/** % de variación. null = mes anterior en cero (no hay contra qué comparar). */
function delta(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

const METHOD_COLOR: Record<string, string> = {
  transferencia: "var(--method-1)",
  mercado_pago: "var(--method-2)",
  efectivo: "var(--method-3)",
  otro: "var(--method-4)",
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; productId?: string }>;
}) {
  const params = await searchParams;
  const [payments, customers, products, subscriptions, receiptsById] = await Promise.all([
    getPayments(),
    getCustomers(),
    getProducts(),
    getSubscriptions(),
    getReceiptsById(),
  ]);

  const today = getArgentinaTodayISO();
  const period = params.period || getArgentinaCurrentPeriod();
  const previousPeriod = shiftPeriod(period, -1);
  const productId = params.productId || "all";

  // Ingresos = todo cobro no anulado (con o sin comprobante), por período.
  const counts = (p: PaymentRecord) =>
    p.status !== "anulado" && (productId === "all" || p.productId === productId);
  const inPeriod = (target: string) =>
    payments.filter((p) => counts(p) && p.period === target);

  const current = inPeriod(period);
  const previous = inPeriod(previousPeriod);
  const income = current.reduce((s, p) => s + p.amount, 0);
  const incomePrev = previous.reduce((s, p) => s + p.amount, 0);
  const incomeDelta = delta(income, incomePrev);
  const countDelta = delta(current.length, previous.length);
  const avgTicket = current.length ? income / current.length : 0;
  const avgTicketPrev = previous.length ? incomePrev / previous.length : 0;

  const trend = Array.from({ length: 12 }, (_, i) => {
    const key = shiftPeriod(period, i - 11);
    return {
      key,
      label: formatPeriodShort(key),
      fullLabel: formatPeriod(key),
      value: inPeriod(key).reduce((s, p) => s + p.amount, 0),
    };
  });

  const byProduct = products.map((product) => ({
    key: product.id,
    label: product.name,
    value: current
      .filter((p) => p.productId === product.id)
      .reduce((s, p) => s + p.amount, 0),
  }));

  const byMethod = PAYMENT_METHODS.map((method) => ({
    key: method,
    label: METHOD_LABEL[method],
    color: METHOD_COLOR[method],
    value: current.filter((p) => p.method === method).reduce((s, p) => s + p.amount, 0),
  }));

  const pendingReceipts = payments.filter((p) => p.status === "registrado");
  const activeCustomers = customers.filter((c) => c.status === "activo").length;

  const toCollect = subscriptions
    .map((sub) => ({ sub, state: dueState(sub, today) }))
    .filter(({ state }) => state === "vencida" || state === "proxima");
  const toCollectAmount = toCollect.reduce((s, { sub }) => s + sub.amount, 0);
  const overdueCount = toCollect.filter(({ state }) => state === "vencida").length;

  const customerName = (id: string) =>
    customers.find((c) => c.id === id)?.name ?? "Cliente";
  const productName = (id: string) =>
    products.find((p) => p.id === id)?.name ?? "Servicio";
  const latest = payments.slice(0, 5);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-foreground-muted text-[13px] font-medium">Resumen de</p>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[28px]">
            {formatPeriod(period)}
          </h1>
        </div>
        <DashboardFilters
          period={period}
          currentPeriod={getArgentinaCurrentPeriod()}
          productId={productId}
          products={products}
        />
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Ingresos del mes + tendencia de 12 meses */}
        <Card className="overflow-hidden lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5">
            <div>
              <p className="text-foreground-muted text-[13px] font-medium">
                Ingresos del mes
              </p>
              <p className="text-foreground mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">
                {formatCurrency(income)}
              </p>
              <p className="text-foreground-muted mt-2 flex flex-wrap items-center gap-2 text-[13px]">
                <DeltaPill value={incomeDelta} />
                vs. {formatCurrency(incomePrev)} en{" "}
                {formatPeriod(previousPeriod).toLowerCase()}
              </p>
            </div>
          </div>
          <div className="px-2 pt-4 pb-3 sm:px-3">
            <TrendChart
              points={trend}
              highlightKey={period}
              ariaLabel="Ingresos por mes, últimos 12 meses"
            />
          </div>
        </Card>

        {/* Por cobrar */}
        <Card className="flex flex-col">
          <CardHeader
            title="Por cobrar"
            description="Vencidos y próximos 7 días"
            action={
              <Link
                href="/admin/subscriptions"
                className="text-accent-bright text-[13px] font-medium hover:underline"
              >
                Ver todo
              </Link>
            }
          />
          <div className="px-5 pt-3">
            <p className="text-foreground text-3xl font-semibold tracking-tight">
              {formatCurrency(toCollectAmount)}
            </p>
            <p className="text-foreground-muted mt-1 text-[13px]">
              {toCollect.length === 0
                ? "Nada pendiente"
                : `${toCollect.length} ${toCollect.length === 1 ? "cobro" : "cobros"}${
                    overdueCount
                      ? ` · ${overdueCount} vencido${overdueCount > 1 ? "s" : ""}`
                      : ""
                  }`}
            </p>
          </div>
          {toCollect.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="Estás al día"
              description="No hay abonos vencidos ni por vencer esta semana."
              className="py-8"
            />
          ) : (
            <ul className="divide-border mt-3 flex-1 divide-y">
              {toCollect.slice(0, 4).map(({ sub, state }) => (
                <li key={sub.id} className="flex items-center gap-3 px-5 py-3">
                  <Avatar name={customerName(sub.customerId)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {customerName(sub.customerId)}
                    </p>
                    <p className="text-foreground-muted text-[12px]">
                      {formatCurrency(sub.amount)} ·{" "}
                      {formatRelativeDay(sub.nextDueDate, today)}
                    </p>
                  </div>
                  <StatusBadge
                    tone={state === "vencida" ? "critical" : "warning"}
                    className="hidden sm:inline-flex"
                  >
                    {state === "vencida" ? "Vencido" : "Próximo"}
                  </StatusBadge>
                  <ButtonLink
                    href={`/admin/payments/new?subscriptionId=${sub.id}`}
                    size="icon-sm"
                    variant="secondary"
                    aria-label={`Cobrar a ${customerName(sub.customerId)}`}
                  >
                    <Wallet className="size-4" aria-hidden />
                  </ButtonLink>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* KPIs secundarios */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Kpi
          icon={Receipt}
          label="Cobros del mes"
          value={String(current.length)}
          deltaValue={countDelta}
        />
        <Kpi
          icon={Wallet}
          label="Ticket promedio"
          value={formatCurrency(avgTicket)}
          deltaValue={delta(avgTicket, avgTicketPrev)}
        />
        <Kpi
          icon={FileWarning}
          label="Sin comprobante"
          value={String(pendingReceipts.length)}
          href={pendingReceipts.length ? "/admin/payments?status=registrado" : undefined}
          hint={pendingReceipts.length ? "Emitir ahora" : "Todo emitido"}
        />
        <Kpi
          icon={Users}
          label="Clientes activos"
          value={String(activeCustomers)}
          href="/admin/customers"
          hint="Ver clientes"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Ingresos por servicio" description={formatPeriod(period)} />
          <div className="p-5">
            <BarList items={byProduct} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Medios de pago" description={formatPeriod(period)} />
          <div className="p-5">
            <SegmentedBar items={byMethod} />
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Últimos cobros"
          action={
            <Link
              href="/admin/payments"
              className="text-accent-bright inline-flex items-center gap-1 text-[13px] font-medium hover:underline"
            >
              Ver todos <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        />
        {latest.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Todavía no registraste cobros"
            description="Cuando cobres un trabajo, registralo y emití el comprobante en el momento."
            action={
              <ButtonLink href="/admin/payments/new">Registrar el primero</ButtonLink>
            }
          />
        ) : (
          <div className="divide-border mt-3 divide-y">
            {latest.map((payment) => (
              <PaymentItem
                key={payment.id}
                payment={payment}
                receipt={payment.receiptId ? receiptsById[payment.receiptId] : undefined}
                customerName={customerName(payment.customerId)}
                productName={productName(payment.productId)}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function DeltaPill({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span className="bg-surface-sunken text-foreground-muted ring-border rounded-full px-2 py-0.5 text-[12px] font-medium ring-1 ring-inset">
        Sin comparación
      </span>
    );
  }
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-semibold tabular-nums",
        up
          ? "bg-status-good/10 text-status-good"
          : "bg-status-critical/10 text-status-critical",
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {Math.abs(value).toFixed(0)}%
    </span>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  deltaValue,
  href,
  hint,
}: {
  icon: typeof Receipt;
  label: string;
  value: string;
  deltaValue?: number | null;
  href?: string;
  hint?: string;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-foreground-muted text-[13px] font-medium">{label}</span>
        <span className="bg-accent-muted text-accent-bright flex size-8 items-center justify-center rounded-lg">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="text-foreground mt-2 text-2xl font-semibold tracking-tight">
        {value}
      </p>
      <div className="mt-1.5 min-h-5 text-[12px]">
        {deltaValue !== undefined ? (
          <span className="text-foreground-muted inline-flex items-center gap-1.5">
            <DeltaPill value={deltaValue} />
            <span className="hidden sm:inline">vs. mes anterior</span>
          </span>
        ) : hint ? (
          <span
            className={cn(
              "font-medium",
              href ? "text-accent-bright" : "text-foreground-muted",
            )}
          >
            {hint}
            {href ? " →" : ""}
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "border-border bg-background-subtle block rounded-2xl border p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5";

  return href ? (
    <Link
      href={href}
      className={cn(className, "hover:border-accent/40 transition-colors")}
    >
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
