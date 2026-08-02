import "server-only";

// Formato pedido: DD-AAAA-0001
export function formatReceiptNumber(year: number, sequence: number): string {
  return `DD-${year}-${String(sequence).padStart(4, "0")}`;
}
