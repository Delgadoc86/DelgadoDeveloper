import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  Receipt,
  Repeat,
  Smartphone,
  UserPlus,
  Users,
} from "lucide-react";
import { getAdminDb } from "@/lib/firebase/admin";
import { getSessionAdmin } from "@/lib/auth/session";
import {
  getArgentinaCurrentPeriod,
  getArgentinaTodayISO,
  addDaysISO,
  shiftPeriod,
} from "@/lib/timezone";
import type { PaymentRecord } from "@/types/payment";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { SubscriptionRecord } from "@/types/subscription";
import { StatTile } from "./stat-tile";
import { DashboardFilters } from "./dashboard-filters";
import { LogoutButton } from "./logout-button";
import { ThemeToggle } from "../theme-toggle";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

function percentDelta(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; productId?: string }>;
}) {
  const admin = await getSessionAdmin();
  if (!admin) return null;

  const params = await searchParams;
  const db = getAdminDb();

  const [paymentsSnapshot, customersSnapshot, productsSnapshot, subscriptionsSnapshot] =
    await Promise.all([
      db.collection("payments").get(),
      db.collection("customers").get(),
      db.collection("products").get(),
      db.collection("subscriptions").get(),
    ]);

  const payments: PaymentRecord[] = paymentsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      customerId: data.customerId,
      productId: data.productId,
      subscriptionId: data.subscriptionId ?? null,
      amount: data.amount,
      concept: data.concept,
      period: data.period,
      method: data.method,
      date: data.date,
      transferReference: data.transferReference ?? null,
      notes: data.notes ?? null,
      status: data.status,
      receiptId: data.receiptId ?? null,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  const customers: CustomerRecord[] = customersSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      businessName: data.businessName ?? undefined,
      phone: data.phone,
      phoneRaw: data.phoneRaw,
      email: data.email ?? undefined,
      taxId: data.taxId ?? undefined,
      type: data.type,
      status: data.status,
      notes: data.notes ?? undefined,
      productIds: data.productIds ?? [],
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  const products: ProductRecord[] = productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      suggestedPrice: data.suggestedPrice ?? null,
      suggestedFrequency: data.suggestedFrequency ?? null,
      active: data.active,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
    };
  });

  const subscriptions: SubscriptionRecord[] = subscriptionsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      customerId: data.customerId,
      productId: data.productId,
      amount: data.amount,
      frequency: data.frequency,
      nextDueDate: data.nextDueDate,
      status: data.status,
      lastPaymentAt: data.lastPaymentAt?.toDate?.().toISOString() ?? null,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

  const period = params.period || getArgentinaCurrentPeriod();
  const previousPeriod = shiftPeriod(period, -1);
  const productId = params.productId || "all";

  const matchesFilter = (payment: PaymentRecord, targetPeriod: string) =>
    payment.period === targetPeriod &&
    payment.status === "emitido" &&
    (productId === "all" || payment.productId === productId);

  const currentPayments = payments.filter((payment) => matchesFilter(payment, period));
  const previousPayments = payments.filter((payment) =>
    matchesFilter(payment, previousPeriod),
  );

  const ingresos = currentPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const ingresosPrev = previousPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const cantidadPagos = currentPayments.length;
  const cantidadPagosPrev = previousPayments.length;

  const clientesActivos = customers.filter(
    (customer) => customer.status === "activo",
  ).length;
  const suscripcionesActivas = subscriptions.filter(
    (sub) => sub.status === "activa",
  ).length;

  const today = getArgentinaTodayISO();
  const in7Days = addDaysISO(today, 7);
  const isTrackable = (sub: SubscriptionRecord) =>
    sub.status !== "cancelada" && sub.status !== "pausada";

  const proximosVencimientos = subscriptions
    .filter(
      (sub) => isTrackable(sub) && sub.nextDueDate >= today && sub.nextDueDate <= in7Days,
    )
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));

  const pagosVencidos = subscriptions
    .filter((sub) => isTrackable(sub) && sub.nextDueDate < today)
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));

  const ultimosPagos = [...payments]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const customerName = (id: string) => customers.find((c) => c.id === id)?.name ?? id;
  const productName = (id: string) => products.find((p) => p.id === id)?.name ?? id;

  const ingresosDelta = percentDelta(ingresos, ingresosPrev);
  const ingresosDeltaUp = ingresosDelta >= 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-8 pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold">
            D
          </span>
          <div>
            <h1 className="text-foreground text-lg font-semibold">DelgadoDev Gestión</h1>
            <p className="text-foreground-muted text-xs">
              {admin.email} · {admin.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Link
          href="/admin/payments?new=1"
          className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium"
        >
          <Receipt className="size-4" /> Registrar pago
        </Link>
        <Link
          href="/admin/customers?new=1"
          className="border-border text-foreground flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium"
        >
          <UserPlus className="size-4" /> Nuevo cliente
        </Link>
        <Link
          href="/admin/apps"
          className="border-border text-foreground flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium"
        >
          <Smartphone className="size-4" /> Aplicaciones
        </Link>
      </div>

      <DashboardFilters period={period} productId={productId} products={products} />

      <div className="flex flex-col gap-3">
        <p className="text-foreground-muted text-xs font-semibold tracking-wide uppercase">
          Resumen del mes
        </p>

        <div className="border-border bg-background-subtle border-l-accent relative flex flex-col gap-1 rounded-xl border border-l-4 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground-muted flex items-center gap-2 text-sm">
              <DollarSign className="size-4" /> Ingresos del mes
            </span>
            {Number.isFinite(ingresosDelta) && (
              <span
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  ingresosDeltaUp
                    ? "bg-[#0ca30c]/10 text-[#0ca30c]"
                    : "bg-[#d03b3b]/10 text-[#d03b3b]"
                }`}
              >
                {ingresosDeltaUp ? (
                  <ArrowUp className="size-3" />
                ) : (
                  <ArrowDown className="size-3" />
                )}
                {Math.abs(ingresosDelta).toFixed(0)}%
              </span>
            )}
          </div>
          <span className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {formatCurrency(ingresos)}
          </span>
          <span className="text-foreground-muted text-xs">
            vs. {formatCurrency(ingresosPrev)} el mes anterior
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatTile
            icon={<Receipt className="size-4" />}
            label="Cantidad de pagos"
            value={String(cantidadPagos)}
            delta={{
              value: percentDelta(cantidadPagos, cantidadPagosPrev),
              goodDirection: "up",
            }}
          />
          <StatTile
            icon={<Users className="size-4" />}
            label="Clientes activos"
            value={String(clientesActivos)}
            status="good"
          />
          <StatTile
            icon={<Repeat className="size-4" />}
            label="Suscripciones activas"
            value={String(suscripcionesActivas)}
            status="good"
          />
          <StatTile
            icon={<AlertTriangle className="size-4" />}
            label="Próximos vencimientos"
            value={String(proximosVencimientos.length)}
            status="warning"
          />
        </div>

        <StatTile
          icon={<AlertCircle className="size-4" />}
          label="Pagos vencidos"
          value={String(pagosVencidos.length)}
          status="critical"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="border-border bg-background-subtle flex flex-col gap-2 rounded-xl border p-4">
          <h2 className="text-sm font-semibold">Vencimientos</h2>
          {pagosVencidos.length === 0 && proximosVencimientos.length === 0 && (
            <p className="text-foreground-muted text-sm">
              Sin vencimientos próximos ni atrasados.
            </p>
          )}
          {pagosVencidos.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between text-sm">
              <span>
                {customerName(sub.customerId)} — {productName(sub.productId)}
              </span>
              <span className="text-xs font-semibold text-[#d03b3b]">
                Vencida {sub.nextDueDate}
              </span>
            </div>
          ))}
          {proximosVencimientos.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between text-sm">
              <span>
                {customerName(sub.customerId)} — {productName(sub.productId)}
              </span>
              <span className="text-xs font-semibold text-[#fab219]">
                Vence {sub.nextDueDate}
              </span>
            </div>
          ))}
        </section>

        <section className="border-border bg-background-subtle flex flex-col gap-2 rounded-xl border p-4">
          <h2 className="text-sm font-semibold">Últimos pagos</h2>
          {ultimosPagos.length === 0 && (
            <p className="text-foreground-muted text-sm">
              Todavía no hay pagos registrados.
            </p>
          )}
          {ultimosPagos.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between text-sm">
              <span>{customerName(payment.customerId)}</span>
              <span className="text-foreground-muted text-xs">
                {formatCurrency(payment.amount)} · {payment.date}
              </span>
            </div>
          ))}
        </section>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-foreground-muted text-xs font-semibold tracking-wide uppercase">
          Accesos rápidos
        </p>
        <nav className="grid grid-cols-2 gap-3 text-sm">
          <Link
            href="/admin/customers"
            className="border-border bg-background-subtle flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"
          >
            <Users className="size-4" /> Clientes
          </Link>
          <Link
            href="/admin/products"
            className="border-border bg-background-subtle flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"
          >
            <Package className="size-4" /> Productos
          </Link>
          <Link
            href="/admin/subscriptions"
            className="border-border bg-background-subtle flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"
          >
            <Repeat className="size-4" /> Suscripciones
          </Link>
          <Link
            href="/admin/payments"
            className="border-border bg-background-subtle flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"
          >
            <Receipt className="size-4" /> Pagos
          </Link>
          <Link
            href="/admin/apps"
            className="border-border bg-background-subtle col-span-2 flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"
          >
            <Smartphone className="size-4" /> Apps
          </Link>
        </nav>
      </div>
    </div>
  );
}
