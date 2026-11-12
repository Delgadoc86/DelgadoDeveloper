"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Download, FileCheck2, MessageCircle } from "lucide-react";
import type { ReceiptRecord } from "@/types/receipt";
import { buildReceiptPdf } from "@/lib/receipt-pdf";
import { buildWhatsappMessage, buildWhatsappUrl, hasUsablePhone } from "@/lib/whatsapp";
import { Button } from "./button";
import { Field, Sheet, Textarea } from "./fields";
import { InlineAlert } from "./primitives";

/** Descarga el PDF del comprobante. */
export function DownloadReceiptButton({
  receipt,
  size = "sm",
  className,
}: {
  receipt: ReceiptRecord;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    setBusy(true);
    setError(false);
    try {
      const doc = await buildReceiptPdf(receipt);
      doc.save(`${receipt.number}.pdf`);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={handleClick}
      loading={busy}
      className={className}
      title={error ? "No se pudo generar el PDF, probá de nuevo" : undefined}
    >
      {busy ? null : <Download className="size-4" aria-hidden />}
      {error ? "Reintentar PDF" : "PDF"}
    </Button>
  );
}

/**
 * En el celular abre el menú nativo de compartir con el PDF adjunto y el
 * texto (WhatsApp incluido). En PC descarga el PDF y abre WhatsApp Web con
 * el mensaje armado, para adjuntarlo a mano.
 */
export function WhatsappReceiptButton({
  receipt,
  size = "sm",
  className,
  label = "WhatsApp",
}: {
  receipt: ReceiptRecord;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const phone = receipt.customerSnapshot.phone;

  if (!hasUsablePhone(phone)) {
    return (
      <Button
        variant="secondary"
        size={size}
        disabled
        className={className}
        title="El cliente no tiene un teléfono válido. Editalo para poder enviar por WhatsApp."
      >
        <MessageCircle className="size-4" aria-hidden />
        Sin teléfono
      </Button>
    );
  }
  const validPhone: string = phone;

  async function handleClick() {
    setBusy(true);
    try {
      const message = buildWhatsappMessage(receipt);
      const doc = await buildReceiptPdf(receipt);
      const filename = `${receipt.number}.pdf`;
      const file = new File([doc.output("blob") as Blob], filename, {
        type: "application/pdf",
      });
      const shareData = { files: [file], text: message } as ShareData;

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }
      doc.save(filename);
      window.open(buildWhatsappUrl(validPhone, message), "_blank", "noopener,noreferrer");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant="whatsapp"
      size={size}
      onClick={handleClick}
      loading={busy}
      className={className}
    >
      {busy ? null : <MessageCircle className="size-4" aria-hidden />}
      {label}
    </Button>
  );
}

/** Emite el comprobante de un cobro que todavía no lo tiene. */
export function IssueReceiptButton({
  paymentId,
  size = "sm",
}: {
  paymentId: string;
  size?: "sm" | "md";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/issue-receipt`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo emitir el comprobante");
        return;
      }
      router.refresh();
    } catch {
      setError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-col gap-1">
      <Button size={size} onClick={handleClick} loading={busy}>
        {busy ? null : <FileCheck2 className="size-4" aria-hidden />}
        Emitir comprobante
      </Button>
      {error ? <span className="text-status-critical text-[12px]">{error}</span> : null}
    </span>
  );
}

/** Anula un comprobante, pidiendo el motivo en un panel de confirmación. */
export function VoidReceiptButton({ receipt }: { receipt: ReceiptRecord }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    if (!reason.trim()) {
      setError("Contá brevemente por qué se anula");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/receipts/${receipt.id}/void`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo anular");
        return;
      }
      setOpen(false);
      router.refresh();
    } catch {
      setError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Button variant="danger-ghost" size="sm" onClick={() => setOpen(true)}>
        <Ban className="size-4" aria-hidden />
        Anular
      </Button>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={`Anular comprobante ${receipt.number}`}
        description="El comprobante queda registrado como anulado y no se puede revertir."
      >
        <div className="flex flex-col gap-4 pt-1">
          <Field label="Motivo de la anulación">
            {(id) => (
              <Textarea
                id={id}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ej.: importe mal cargado"
                rows={3}
                autoFocus
              />
            )}
          </Field>
          {error ? <InlineAlert tone="critical">{error}</InlineAlert> : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirm} loading={busy}>
              Confirmar anulación
            </Button>
          </div>
        </div>
      </Sheet>
    </>
  );
}
