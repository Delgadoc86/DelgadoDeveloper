"use client";

import { useEffect, useId, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, X } from "lucide-react";
import { formatPeriod } from "@/lib/admin/format";
import { getArgentinaCurrentPeriod, shiftPeriod } from "@/lib/timezone";
import { cn } from "@/lib/utils";

export const fieldControl =
  "h-11 w-full rounded-xl border border-border bg-background-subtle px-3.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-foreground-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:opacity-60 sm:text-sm";

/* ── Campo con etiqueta, ayuda y error ────────────────────────────────── */

export function Field({
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string | null;
  optional?: boolean;
  className?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-foreground text-[13px] font-medium">
        {label}
        {optional ? (
          <span className="text-foreground-muted font-normal"> (opcional)</span>
        ) : null}
      </label>
      {children(id)}
      {error ? (
        <p className="text-status-critical text-[12px]">{error}</p>
      ) : hint ? (
        <p className="text-foreground-muted text-[12px]">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldControl, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(fieldControl, "appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        className="text-foreground-muted pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
        aria-hidden
      />
    </div>
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldControl, "h-auto min-h-24 resize-y py-2.5", className)}
      {...props}
    />
  );
}

/* ── Selector de mes en castellano (no depende del idioma del navegador) ── */

export function MonthSelect({
  value,
  onChange,
  pastMonths = 12,
  futureMonths = 2,
  ...props
}: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
  value: string;
  onChange: (period: string) => void;
  pastMonths?: number;
  futureMonths?: number;
}) {
  const current = getArgentinaCurrentPeriod();
  const months = Array.from({ length: pastMonths + futureMonths + 1 }, (_, i) =>
    shiftPeriod(current, futureMonths - i),
  );
  if (value && !months.includes(value)) months.push(value);
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
      {months.map((m) => (
        <option key={m} value={m}>
          {formatPeriod(m)}
        </option>
      ))}
    </Select>
  );
}

/* ── Control segmentado (opciones excluyentes visibles) ───────────────── */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  size = "md",
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; icon?: LucideIcon; count?: number }[];
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "bg-surface-sunken ring-border inline-flex max-w-full [scrollbar-width:none] gap-1 overflow-x-auto rounded-xl p-1 ring-1 ring-inset",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg font-medium whitespace-nowrap transition-colors",
              size === "sm" ? "h-8 px-2.5 text-[13px]" : "h-9 px-3 text-sm",
              active
                ? "bg-background-subtle text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {Icon ? <Icon className="size-4" aria-hidden /> : null}
            {option.label}
            {option.count !== undefined ? (
              <span
                className={cn(
                  "rounded-md px-1.5 text-[11px] tabular-nums",
                  active ? "bg-accent-muted text-accent-bright" : "bg-border/60",
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ── Interruptor ──────────────────────────────────────────────────────── */

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="min-w-0 cursor-pointer">
        <span className="text-foreground block text-sm font-medium">{label}</span>
        {description ? (
          <span className="text-foreground-muted block text-[12px]">{description}</span>
        ) : null}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-accent" : "bg-border",
        )}
      >
        <span
          className={cn(
            "inline-block size-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

/* ── Panel modal: hoja inferior en el celular, diálogo centrado en PC ── */

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // Click en el fondo (fuera del contenido) cierra el panel.
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        "bg-background-subtle text-foreground m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-3xl border-0 p-0 shadow-2xl",
        "backdrop:bg-[rgba(15,17,22,0.45)] backdrop:backdrop-blur-[2px]",
        "sm:m-auto sm:max-h-[85dvh] sm:max-w-lg sm:rounded-3xl",
      )}
    >
      {open ? (
        <div className="flex max-h-[92dvh] flex-col sm:max-h-[85dvh]">
          <div
            className="bg-border mx-auto mt-2.5 h-1 w-10 rounded-full sm:hidden"
            aria-hidden
          />
          <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 sm:px-6 sm:pt-6">
            <div>
              <h2 className="text-foreground text-lg font-semibold">{title}</h2>
              {description ? (
                <p className="text-foreground-muted mt-0.5 text-sm">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="text-foreground-muted hover:bg-surface-sunken hover:text-foreground -mr-1 flex size-9 items-center justify-center rounded-full"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
            {children}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
