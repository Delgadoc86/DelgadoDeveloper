"use client";

import { useState } from "react";
import type { ReceiptRecord } from "@/types/receipt";
import { buildReceiptPdf } from "@/lib/receipt-pdf";
import { buildWhatsappMessage, buildWhatsappUrl, hasUsablePhone } from "@/lib/whatsapp";

export function WhatsappButton({ receipt }: { receipt: ReceiptRecord }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const phone = receipt.customerSnapshot.phone;

  if (!hasUsablePhone(phone)) {
    return (
      <span className="text-foreground-muted text-xs">
        Sin teléfono válido para enviar por WhatsApp — editá el cliente primero.
      </span>
    );
  }

  // El type predicate de hasUsablePhone() no sobrevive dentro de la closure
  // de handleClick (TS no puede probar que "phone" siga siendo el mismo
  // valor para cuando corra), así que se recaptura ya tipado como string.
  const validPhone: string = phone;

  async function handleClick() {
    setSending(true);
    setError(null);
    try {
      const message = buildWhatsappMessage(receipt);
      const doc = await buildReceiptPdf(receipt);
      const filename = `${receipt.number}.pdf`;

      // En Android/Chrome mobile, Web Share API con archivos abre el picker
      // nativo (WhatsApp incluido) con el PDF y el texto juntos, en un solo
      // paso. Es la mejor opción cuando está disponible.
      const blob = doc.output("blob") as Blob;
      const file = new File([blob], filename, { type: "application/pdf" });
      const shareData = { files: [file], text: message } as ShareData;

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }

      // Escritorio / WhatsApp Web: no se puede adjuntar un archivo desde un
      // link, así que se descarga el PDF y se abre WhatsApp con el mensaje
      // ya armado — Cristian adjunta el PDF manualmente en el chat.
      doc.save(filename);
      window.open(buildWhatsappUrl(validPhone, message), "_blank", "noopener,noreferrer");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("No se pudo preparar el envío");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={sending}
        className="rounded border border-[#0ca30c]/50 px-3 py-1.5 text-sm text-[#0ca30c] disabled:opacity-60"
      >
        {sending ? "Preparando..." : "Enviar por WhatsApp"}
      </button>
      {error && <p className="text-xs text-[#d03b3b]">{error}</p>}
    </div>
  );
}
