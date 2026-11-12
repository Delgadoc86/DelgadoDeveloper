import { siteConfig } from "@/config/site.config";

/** Número de WhatsApp en formato internacional, sin "+" ni espacios (formato de wa.me). */
export const whatsappPhone = "5492617478090";

export const socialLinks = {
  email: `mailto:${siteConfig.author.email}`,
  whatsapp: `https://wa.me/${whatsappPhone}`,
  linkedin: "https://www.linkedin.com/in/cristian-delgadog/",
  github: "https://github.com/Delgadoc86",
  instagram: "https://www.instagram.com/delgadodevs/",
  tiktok: "https://www.tiktok.com/@delgadodev",
  /** Repo de este mismo portfolio — enlazado como evidencia técnica en el footer. */
  portfolioRepo: "https://github.com/Delgadoc86/DelgadoDeveloper",
} as const;
