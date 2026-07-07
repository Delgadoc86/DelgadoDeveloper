import { cn } from "@/lib/utils";

interface DraftNoticeProps {
  className?: string;
}

/**
 * Banner visible para páginas legales todavía no finalizadas. El título de
 * `<Metadata>` de cada página que la usa debe tener `robots: { index: false }`
 * para que Google no la indexe mientras conserve puntos [PENDIENTE].
 */
export function DraftNotice({ className }: DraftNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400",
        className,
      )}
    >
      <strong className="font-semibold">Documento en preparación.</strong> Todavía no es
      la versión oficial publicada — contiene puntos marcados como{" "}
      <code className="font-mono text-xs">[PENDIENTE]</code> a la espera de completarse y
      revisarse antes de activarla.
    </div>
  );
}
