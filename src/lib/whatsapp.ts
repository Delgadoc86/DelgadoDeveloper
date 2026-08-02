import type { ReceiptRecord } from "@/types/receipt";

// Un telefono valido para WhatsApp acá siempre debe tener el prefijo "549"
// que le agrega normalizePhoneForWhatsapp() (ver src/lib/phone.ts), seguido
// de entre 8 y 12 digitos mas.
export function hasUsablePhone(phone: string | null | undefined): phone is string {
  return Boolean(phone) && /^549\d{8,12}$/.test(phone!);
}

export function buildWhatsappMessage(receipt: ReceiptRecord): string {
  const amount = receipt.amount.toLocaleString("es-AR");
  return [
    `Hola ${receipt.customerSnapshot.name}!`,
    `Te paso el comprobante de tu pago:`,
    `Concepto: ${receipt.concept}`,
    `Importe: $${amount}`,
    `Período: ${receipt.period}`,
    `Comprobante N.º ${receipt.number}`,
    ``,
    `¡Gracias!`,
  ].join("\n");
}

export function buildWhatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
