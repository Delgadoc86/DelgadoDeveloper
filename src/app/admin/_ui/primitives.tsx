import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  Clock3,
  MinusCircle,
} from "lucide-react";
import { initials } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

/* ── Tarjeta ──────────────────────────────────────────────────────────── */

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border bg-background-subtle rounded-2xl border shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 px-5 pt-5", className)}>
      <div className="min-w-0">
        <h2 className="text-foreground text-[15px] font-semibold">{title}</h2>
        {description ? (
          <p className="text-foreground-muted mt-0.5 text-[13px]">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/* ── Encabezado de página ─────────────────────────────────────────────── */

export function PageHeader({
  title,
  description,
  actions,
  backHref,
  backLabel = "Volver",
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {backHref ? (
          <Link
            href={backHref}
            className="text-foreground-muted hover:text-foreground mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {backLabel}
          </Link>
        ) : null}
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="text-foreground-muted mt-1 text-sm">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}

/* ── Badge de estado: siempre ícono + texto, nunca solo color ─────────── */

export type Tone = "good" | "warning" | "critical" | "neutral" | "accent";

const TONE: Record<Tone, { className: string; icon: LucideIcon }> = {
  good: { className: "bg-status-good/10 text-status-good", icon: CheckCircle2 },
  warning: { className: "bg-status-warning/12 text-status-warning", icon: Clock3 },
  critical: {
    className: "bg-status-critical/10 text-status-critical",
    icon: AlertCircle,
  },
  neutral: {
    className: "bg-surface-sunken text-foreground-muted ring-1 ring-border ring-inset",
    icon: MinusCircle,
  },
  accent: { className: "bg-accent-muted text-accent-bright", icon: CircleDashed },
};

export function StatusBadge({
  tone,
  children,
  className,
  icon = true,
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  /** false para etiquetas que no son un estado (ej. "Recurrente"). */
  icon?: boolean;
}) {
  const { className: toneClass, icon: Icon } = TONE[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium whitespace-nowrap",
        toneClass,
        className,
      )}
    >
      {icon ? <Icon className="size-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

/* ── Avatar con iniciales ─────────────────────────────────────────────── */

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-accent-muted text-accent-bright inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm" && "size-8 text-[11px]",
        size === "md" && "size-10 text-[13px]",
        size === "lg" && "size-14 text-base",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

/* ── Estado vacío ─────────────────────────────────────────────────────── */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        className,
      )}
    >
      <span className="bg-accent-muted text-accent-bright mb-4 flex size-12 items-center justify-center rounded-2xl">
        <Icon className="size-6" aria-hidden />
      </span>
      <p className="text-foreground text-[15px] font-semibold">{title}</p>
      {description ? (
        <p className="text-foreground-muted mt-1 max-w-xs text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

/* ── Mensaje inline de resultado ──────────────────────────────────────── */

export function InlineAlert({
  tone,
  children,
}: {
  tone: "good" | "critical";
  children: React.ReactNode;
}) {
  const Icon = tone === "good" ? CheckCircle2 : AlertCircle;
  return (
    <p
      role={tone === "critical" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm",
        tone === "good"
          ? "bg-status-good/10 text-status-good"
          : "bg-status-critical/10 text-status-critical",
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

/* ── Etiqueta de sección ──────────────────────────────────────────────── */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-foreground-muted mb-2.5 px-1 text-[12px] font-semibold tracking-wide uppercase">
      {children}
    </h2>
  );
}
