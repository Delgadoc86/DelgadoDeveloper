import "server-only";

import type { SubscriptionFrequency } from "@/types/subscription";

// Calcula el proximo vencimiento server-side (nunca se confia en una fecha
// que mande el cliente). "unico" no se renueva: un pago unico no tiene
// proximo vencimiento, por eso no está en la union de retorno posible desde
// donde se llama (ver validacion en el Route Handler de renovacion).
export function calculateNextDueDate(
  currentDueDate: Date,
  frequency: SubscriptionFrequency,
): Date {
  const next = new Date(currentDueDate);
  if (frequency === "mensual") next.setMonth(next.getMonth() + 1);
  else if (frequency === "anual") next.setFullYear(next.getFullYear() + 1);
  return next;
}
