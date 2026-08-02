"use client";

import { useState } from "react";
import type { ReceiptRecord } from "@/types/receipt";
import { buildReceiptPdf } from "@/lib/receipt-pdf";

export function ReceiptPdfButton({ receipt }: { receipt: ReceiptRecord }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setGenerating(true);
    setError(null);
    try {
      const doc = await buildReceiptPdf(receipt);
      doc.save(`${receipt.number}.pdf`);
    } catch {
      setError("No se pudo generar el PDF");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={generating}
        className="border-border bg-background-subtle rounded border px-3 py-1.5 text-sm"
      >
        {generating ? "Generando..." : "Descargar PDF"}
      </button>
      {error && <p className="text-xs text-[#d03b3b]">{error}</p>}
    </div>
  );
}
