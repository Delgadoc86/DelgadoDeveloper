"use client";

import { useState } from "react";
import type { ReceiptRecord } from "@/types/receipt";
import { buildReceiptPdf } from "@/lib/receipt-pdf";

export function ReceiptPdfButton({ receipt }: { receipt: ReceiptRecord }) {
  const [generating, setGenerating] = useState(false);

  async function handleClick() {
    setGenerating(true);
    try {
      const doc = await buildReceiptPdf(receipt);
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
      className="border-border bg-background-subtle rounded border px-3 py-1.5 text-sm"
    >
      {generating ? "Generando..." : "Descargar PDF"}
    </button>
  );
}
