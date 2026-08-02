"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function IssueReceiptButton({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded bg-neutral-900 px-3 py-1.5 text-sm text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {loading ? "Emitiendo..." : "Emitir comprobante"}
      </button>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
