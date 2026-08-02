"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VoidReceiptButton({ receiptId }: { receiptId: string }) {
  const router = useRouter();
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    if (!reason.trim()) {
      setError("El motivo es obligatorio");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/receipts/${receiptId}/void`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo anular");
        return;
      }
      router.refresh();
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  }

  if (!showReason) {
    return (
      <button
        type="button"
        onClick={() => setShowReason(true)}
        className="rounded border border-[#d03b3b]/40 px-3 py-1.5 text-sm text-[#d03b3b]"
      >
        Anular comprobante
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded border border-[#d03b3b]/40 p-3">
      <input
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Motivo de la anulación"
        className="border-border bg-background-subtle rounded border px-3 py-2 text-sm"
      />
      {error && <p className="text-xs text-[#d03b3b]">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="rounded bg-[#d03b3b] px-3 py-1.5 text-sm text-white hover:bg-[#b83232] disabled:opacity-60"
        >
          {loading ? "Anulando..." : "Confirmar anulación"}
        </button>
        <button
          type="button"
          onClick={() => setShowReason(false)}
          className="border-border bg-background-subtle rounded border px-3 py-1.5 text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
