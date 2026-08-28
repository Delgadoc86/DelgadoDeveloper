import "server-only";

import type { SubscriptionFrequency } from "@/types/subscription";

// Calcula el proximo vencimiento server-side (nunca se confia en una fecha
// que mande el cliente). "unico" no se renueva: un pago unico no tiene
// proximo vencimiento, por eso no está en la union de retorno posible desde
// donde se llama (ver validacion en el Route Handler de renovacion).
//
// Días corridos exactos (30/180/365), no mes/año calendario: así el
// comprobante puede decir "vence a los 30 días corridos" de forma literal,
// y evita el corrimiento de +1/+2 días que da sumar meses calendario
// (ej. 31 de enero + 1 mes calendario no cae siempre 30 días después).
const FREQUENCY_DAYS: Record<"mensual" | "semestral" | "anual", number> = {
  mensual: 30,
  semestral: 180,
  anual: 365,
};

export function calculateNextDueDate(
  currentDueDate: Date,
  frequency: SubscriptionFrequency,
): Date {
  const next = new Date(currentDueDate);
  if (frequency === "unico") return next;
  next.setDate(next.getDate() + FREQUENCY_DAYS[frequency]);
  return next;
}
