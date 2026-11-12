"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { PaymentRecord } from "@/types/payment";
import type { ReceiptRecord } from "@/types/receipt";
import {
  formatCurrency,
  formatDate,
  formatPeriod,
  METHOD_LABEL,
} from "@/lib/admin/format";
import { cn } from "@/lib/utils";
import { Avatar, StatusBadge, type Tone } from "./primitives";
import {
  DownloadReceiptButton,
  IssueReceiptButton,
  VoidReceiptButton,
  WhatsappReceiptButton,
} from "./receipt-actions";

export function paymentTone(
  payment: PaymentRecord,
  receipt?: ReceiptRecord,
): { tone: Tone; label: string } {
  if (payment.status === "registrado")
    return { tone: "warning", label: "Sin comprobante" };
  if (receipt?.voided || payment.status === "anulado")
    return { tone: "neutral", label: "Anulado" };
  return { tone: "good", label: "Emitido" };
}

export function PaymentItem({
  payment,
  receipt,
  customerName,
  productName,
  showCustomer = true,
}: {
  payment: PaymentRecord;
  receipt?: ReceiptRecord;
  customerName: string;
  productName: string;
  showCustomer?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const status = paymentTone(payment, receipt);
  const title = showCustomer ? customerName : productName;

  return (
    <div className={cn("transition-colors", open && "bg-surface-sunken/60")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-surface-sunken/70 flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors sm:px-5"
      >
        <Avatar name={title} />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-medium">{title}</p>
          <p className="text-foreground-muted truncate text-[13px]">
            {payment.concept} · {formatDate(payment.date, false)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={cn(
              "text-foreground text-sm font-semibold tabular-nums",
              status.tone === "neutral" && "text-foreground-muted line-through",
            )}
          >
            {formatCurrency(payment.amount)}
          </span>
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
        <ChevronDown
          className={cn(
            "text-foreground-muted hidden size-4 shrink-0 transition-transform sm:block",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="px-4 pb-4 sm:px-5">
          <dl className="border-border bg-background-subtle grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border p-4 text-[13px] sm:grid-cols-4">
            {showCustomer ? (
              <Detail label="Cliente">
                <Link
                  href={`/admin/customers/${payment.customerId}`}
                  className="text-accent-bright font-medium hover:underline"
                >
                  {customerName}
                </Link>
              </Detail>
            ) : null}
            <Detail label="Servicio">{productName}</Detail>
            <Detail label="Período">{formatPeriod(payment.period)}</Detail>
            <Detail label="Medio">
              {METHOD_LABEL[payment.method] ?? payment.method}
            </Detail>
            <Detail label="Fecha">{formatDate(payment.date)}</Detail>
            {payment.transferReference ? (
              <Detail label="Referencia">{payment.transferReference}</Detail>
            ) : null}
            {receipt ? <Detail label="Comprobante">{receipt.number}</Detail> : null}
            {receipt?.voided ? (
              <Detail label="Motivo de anulación" wide>
                {receipt.voidReason ?? "—"}
              </Detail>
            ) : null}
            {payment.notes ? (
              <Detail label="Observaciones" wide>
                {payment.notes}
              </Detail>
            ) : null}
          </dl>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {payment.status === "registrado" ? (
              <IssueReceiptButton paymentId={payment.id} />
            ) : null}
            {receipt && !receipt.voided ? (
              <>
                <WhatsappReceiptButton receipt={receipt} />
                <DownloadReceiptButton receipt={receipt} />
                <span className="flex-1" />
                <VoidReceiptButton receipt={receipt} />
              </>
            ) : null}
            {receipt?.voided ? <DownloadReceiptButton receipt={receipt} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Detail({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn("min-w-0", wide && "col-span-2 sm:col-span-4")}>
      <dt className="text-foreground-muted text-[12px]">{label}</dt>
      <dd className="text-foreground mt-0.5 break-words">{children}</dd>
    </div>
  );
}
