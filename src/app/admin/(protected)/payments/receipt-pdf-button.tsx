"use client";

import { useState } from "react";
import type { ReceiptRecord } from "@/types/receipt";

async function loadLogoAsDataUrl(): Promise<string | null> {
  try {
    const response = await fetch("/assets/icons/logo-mark.png");
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function ReceiptPdfButton({ receipt }: { receipt: ReceiptRecord }) {
  const [generating, setGenerating] = useState(false);

  async function handleClick() {
    setGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const logo = await loadLogoAsDataUrl();
      if (logo) {
        doc.addImage(logo, "PNG", 15, 12, 20, 20);
      }

      doc.setFontSize(16);
      doc.text("DelgadoDev", 40, 20);
      doc.setFontSize(10);
      doc.text("Comprobante interno de pago", 40, 27);

      doc.setFontSize(12);
      doc.text(`Comprobante N.º ${receipt.number}`, 15, 45);
      doc.text(
        `Fecha de emisión: ${new Date(receipt.issuedAt).toLocaleDateString("es-AR")}`,
        15,
        52,
      );

      doc.text("Cliente:", 15, 65);
      doc.text(receipt.customerSnapshot.name, 45, 65);
      if (receipt.customerSnapshot.businessName) {
        doc.text("Negocio:", 15, 72);
        doc.text(receipt.customerSnapshot.businessName, 45, 72);
      }
      if (receipt.customerSnapshot.taxId) {
        doc.text("CUIT/DNI:", 15, 79);
        doc.text(receipt.customerSnapshot.taxId, 45, 79);
      }

      doc.text("Concepto:", 15, 92);
      doc.text(receipt.concept, 45, 92);
      doc.text("Período:", 15, 99);
      doc.text(receipt.period, 45, 99);
      doc.text("Medio de pago:", 15, 106);
      doc.text(receipt.method, 45, 106);
      doc.setFontSize(14);
      doc.text(`Importe: $${receipt.amount.toLocaleString("es-AR")}`, 15, 118);

      doc.setFontSize(9);
      doc.text(
        "Este comprobante es un registro interno de DelgadoDev y no reemplaza una factura fiscal.",
        15,
        140,
        { maxWidth: 180 },
      );

      if (receipt.voided) {
        doc.setTextColor(200, 0, 0);
        doc.setFontSize(20);
        doc.text("ANULADO", 75, 100, { angle: 20 });
      }

      doc.save(`${receipt.number}.pdf`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={generating}
      className="rounded border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700"
    >
      {generating ? "Generando..." : "Descargar PDF"}
    </button>
  );
}
