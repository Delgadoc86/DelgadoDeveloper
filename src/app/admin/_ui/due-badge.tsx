import type { DueState } from "@/lib/admin/format";
import { StatusBadge } from "./primitives";

export function DueBadge({ state }: { state: DueState }) {
  if (state === "vencida") return <StatusBadge tone="critical">Vencido</StatusBadge>;
  if (state === "proxima") return <StatusBadge tone="warning">Por vencer</StatusBadge>;
  if (state === "al_dia") return <StatusBadge tone="good">Al día</StatusBadge>;
  return <StatusBadge tone="neutral">Pausado</StatusBadge>;
}
