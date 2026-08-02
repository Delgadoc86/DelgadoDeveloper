"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RenewButton({
  subscriptionId,
  disabled,
}: {
  subscriptionId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/renew`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo registrar el pago");
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
        disabled={disabled || loading}
        className="border-border bg-background-subtle rounded border px-3 py-1.5 text-sm disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Registrar pago (avanza vencimiento)"}
      </button>
      {error && <p className="text-xs text-[#d03b3b]">{error}</p>}
    </div>
  );
}
