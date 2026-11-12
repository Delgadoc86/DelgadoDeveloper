"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { buildContactWhatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/gtag";

const fieldClass =
  "border-border bg-background text-foreground placeholder:text-foreground-muted/70 focus-visible:ring-accent w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:outline-none";

/**
 * Formulario sin backend: arma el mensaje y abre WhatsApp. No guarda ni
 * envía datos a ningún servidor.
 */
export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const need = String(data.get("need") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    const message = [
      `Hola DelgadoDev, soy ${name}.`,
      `Necesito: ${need}`,
      phone ? `Mi WhatsApp: ${phone}` : null,
      "(Te escribo desde delgadodev.com.ar)",
    ]
      .filter(Boolean)
      .join("\n");

    trackEvent("whatsapp_form_submit");
    window.open(buildContactWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="contact-name" className="text-foreground text-sm font-medium">
          Tu nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          placeholder="Ej: Laura"
          className={`${fieldClass} mt-1.5`}
        />
      </div>

      <div>
        <label htmlFor="contact-need" className="text-foreground text-sm font-medium">
          ¿Qué necesitás?
        </label>
        <textarea
          id="contact-need"
          name="need"
          required
          rows={3}
          maxLength={600}
          placeholder="Ej: una web para mi negocio con catálogo y pedidos por WhatsApp"
          className={`${fieldClass} mt-1.5 resize-y`}
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="text-foreground text-sm font-medium">
          Tu WhatsApp{" "}
          <span className="text-foreground-muted font-normal">(opcional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          maxLength={25}
          autoComplete="tel"
          placeholder="Ej: 261 555 1234"
          className={`${fieldClass} mt-1.5`}
        />
      </div>

      <button type="submit" className={buttonVariants({ className: "w-full" })}>
        <Send className="size-4" aria-hidden />
        Enviar por WhatsApp
      </button>
      <p className="text-foreground-muted text-center text-xs">
        Se abre WhatsApp con tu mensaje armado. No guardo tus datos.
      </p>
    </form>
  );
}
