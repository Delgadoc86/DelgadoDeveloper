import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

// Paleta de estado validada (dataviz skill) — fija, no se tematiza, y no
// cambia entre modo claro/oscuro.
const STATUS_COLORS = {
  good: "#0ca30c",
  warning: "#fab219",
  serious: "#ec835a",
  critical: "#d03b3b",
} as const;

export type StatTileStatus = keyof typeof STATUS_COLORS;

interface StatTileDelta {
  value: number;
  goodDirection: "up" | "down";
}

export function StatTile({
  icon,
  label,
  value,
  delta,
  status,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: StatTileDelta;
  status?: StatTileStatus;
}) {
  const accent = status ? STATUS_COLORS[status] : "#2a78d6";

  const deltaIsUp = delta ? delta.value > 0 : false;
  const deltaIsGood = delta
    ? (delta.goodDirection === "up" && deltaIsUp) ||
      (delta.goodDirection === "down" && !deltaIsUp)
    : false;

  return (
    <div className="border-border bg-background-subtle flex flex-col gap-2 rounded-xl border p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className="flex size-8 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          {icon}
        </span>
        <span className="text-foreground-muted text-sm">{label}</span>
      </div>

      <span className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
        {value}
      </span>

      {delta && Number.isFinite(delta.value) && (
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            deltaIsGood ? "text-[#0ca30c]" : "text-[#d03b3b]"
          }`}
        >
          {deltaIsUp ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
          {Math.abs(delta.value).toFixed(0)}% vs mes anterior
        </span>
      )}
    </div>
  );
}
