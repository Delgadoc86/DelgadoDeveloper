import { whatsappPhone } from "@/constants/social-links";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const defaultWhatsappMessage =
  "Hola DelgadoDev, vi tu sitio y quiero hablar de un proyecto.";

/** Link de WhatsApp al número de DelgadoDev con el mensaje ya escrito. */
export function buildContactWhatsappUrl(message: string = defaultWhatsappMessage) {
  return buildWhatsappUrl(whatsappPhone, message);
}
