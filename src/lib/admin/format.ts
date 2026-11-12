import type { PaymentMethod, PaymentStatus } from "@/types/payment";
import type { ProductType } from "@/types/product";
import type { SubscriptionFrequency, SubscriptionRecord } from "@/types/subscription";

/** Formatos y etiquetas del panel. Se usa tanto en servidor como en cliente. */

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return currency.format(amount);
}

/** $ 1,2 M / $ 850 mil — para ejes y valores chicos de gráficos. */
export function formatCurrencyCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `$ ${(amount / 1_000_000).toLocaleString("es-AR", { maximumFractionDigits: 1 })} M`;
  }
  if (Math.abs(amount) >= 10_000) {
    return `$ ${Math.round(amount / 1000).toLocaleString("es-AR")} mil`;
  }
  return formatCurrency(amount);
}

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function parts(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return { y: y ?? 1970, m: (m ?? 1) - 1, d: d ?? 1 };
}

/** "2026-11-12" → "12 nov 2026" (sin pasar por Date, para no correr el día por huso). */
export function formatDate(isoDate: string, withYear = true): string {
  if (!isoDate) return "—";
  const { y, m, d } = parts(isoDate);
  const month = (MONTHS[m] ?? "").slice(0, 3);
  return withYear ? `${d} ${month} ${y}` : `${d} ${month}`;
}

/** "2026-11" → "Noviembre 2026" */
export function formatPeriod(period: string): string {
  if (!period) return "—";
  const { y, m } = parts(`${period}-01`);
  const month = MONTHS[m] ?? "";
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${y}`;
}

/** "2026-11" → "nov" (eje de gráficos). */
export function formatPeriodShort(period: string): string {
  const { m } = parts(`${period}-01`);
  return (MONTHS[m] ?? "").slice(0, 3);
}

/** Días entre dos fechas ISO (b - a), en días calendario. */
export function daysBetween(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  const ta = Date.UTC(pa.y, pa.m, pa.d);
  const tb = Date.UTC(pb.y, pb.m, pb.d);
  return Math.round((tb - ta) / 86_400_000);
}

/** "hoy", "mañana", "en 5 días", "hace 3 días". */
export function formatRelativeDay(target: string, today: string): string {
  const diff = daysBetween(today, target);
  if (diff === 0) return "hoy";
  if (diff === 1) return "mañana";
  if (diff === -1) return "ayer";
  return diff > 0 ? `en ${diff} días` : `hace ${-diff} días`;
}

export const METHOD_LABEL: Record<PaymentMethod, string> = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  mercado_pago: "Mercado Pago",
  otro: "Otro",
};

export const FREQUENCY_LABEL: Record<SubscriptionFrequency, string> = {
  mensual: "Mensual",
  semestral: "Semestral",
  anual: "Anual",
  unico: "Pago único",
};

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  app: "App",
  servicio: "Servicio",
  mantenimiento: "Mantenimiento",
  catalogo: "Catálogo",
  otro: "Otro",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  registrado: "Sin comprobante",
  emitido: "Comprobante emitido",
  anulado: "Anulado",
};

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase() || "?";
}

export type DueState = "vencida" | "proxima" | "al_dia" | "inactiva";

/** Estado de cobro de una suscripción respecto de hoy (ventana de aviso: 7 días). */
export function dueState(sub: SubscriptionRecord, today: string): DueState {
  if (sub.status === "cancelada" || sub.status === "pausada") return "inactiva";
  const diff = daysBetween(today, sub.nextDueDate);
  if (diff < 0) return "vencida";
  if (diff <= 7) return "proxima";
  return "al_dia";
}
