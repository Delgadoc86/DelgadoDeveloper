"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Banknote,
  CalendarClock,
  Check,
  CircleEllipsis,
  Plus,
  Search,
  Wallet,
} from "lucide-react";
import type { CustomerRecord } from "@/types/customer";
import type { PaymentMethod, PaymentRecord } from "@/types/payment";
import type { ProductRecord } from "@/types/product";
import type { ReceiptRecord } from "@/types/receipt";
import type { SubscriptionRecord } from "@/types/subscription";
import {
  formatCurrency,
  formatDate,
  formatPeriod,
  FREQUENCY_LABEL,
} from "@/lib/admin/format";
import { getArgentinaCurrentPeriod, getArgentinaTodayISO } from "@/lib/timezone";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "../../../_ui/button";
import { Field, Input, MonthSelect, Select, Switch, Textarea } from "../../../_ui/fields";
import { Avatar, Card, InlineAlert } from "../../../_ui/primitives";
import {
  DownloadReceiptButton,
  WhatsappReceiptButton,
} from "../../../_ui/receipt-actions";

const METHOD_OPTIONS: { value: PaymentMethod; label: string; icon: typeof Wallet }[] = [
  { value: "transferencia", label: "Transferencia", icon: ArrowLeftRight },
  { value: "mercado_pago", label: "Mercado Pago", icon: Wallet },
  { value: "efectivo", label: "Efectivo", icon: Banknote },
  { value: "otro", label: "Otro", icon: CircleEllipsis },
];

interface Result {
  paymentId: string;
  amount: number;
  customerName: string;
  receipt: ReceiptRecord | null;
  issueError: string | null;
}

export function PaymentComposer({
  customers: initialCustomers,
  products,
  subscriptions,
  lastPaymentByCustomer,
  initialCustomerId,
  initialSubscriptionId,
}: {
  customers: CustomerRecord[];
  products: ProductRecord[];
  subscriptions: SubscriptionRecord[];
  lastPaymentByCustomer: Record<string, PaymentRecord>;
  initialCustomerId?: string;
  initialSubscriptionId?: string;
}) {
  const router = useRouter();
  const initialSub = subscriptions.find((s) => s.id === initialSubscriptionId);
  const productName = (id: string) =>
    products.find((p) => p.id === id)?.name ?? "Servicio";
  // Si se llega con ?customerId= (sin abono), se prellena con su último cobro.
  const initialLast =
    !initialSub && initialCustomerId
      ? lastPaymentByCustomer[initialCustomerId]
      : undefined;

  const [customers, setCustomers] = useState(initialCustomers);
  const [customerId, setCustomerId] = useState(
    initialSub?.customerId ?? initialCustomerId ?? "",
  );
  const [subscriptionId, setSubscriptionId] = useState(initialSub?.id ?? "");
  const [productId, setProductId] = useState(
    initialSub?.productId ?? initialLast?.productId ?? products[0]?.id ?? "",
  );
  const [amount, setAmount] = useState(
    initialSub
      ? String(initialSub.amount)
      : initialLast
        ? String(initialLast.amount)
        : "",
  );
  const [concept, setConcept] = useState(
    initialSub
      ? `Abono ${FREQUENCY_LABEL[initialSub.frequency].toLowerCase()} · ${productName(initialSub.productId)}`
      : (initialLast?.concept ?? ""),
  );
  const [conceptTouched, setConceptTouched] = useState(
    Boolean(initialSub ?? initialLast),
  );
  const [period, setPeriod] = useState(getArgentinaCurrentPeriod());
  const [date, setDate] = useState(getArgentinaTodayISO());
  const [method, setMethod] = useState<PaymentMethod>(
    initialLast?.method ?? "transferencia",
  );
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [issueNow, setIssueNow] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const customer = customers.find((c) => c.id === customerId);
  const customerSubs = useMemo(
    () => subscriptions.filter((s) => s.customerId === customerId),
    [subscriptions, customerId],
  );
  const selectedSub = customerSubs.find((s) => s.id === subscriptionId);

  function applyCustomerDefaults(id: string) {
    const last = lastPaymentByCustomer[id];
    if (last) {
      setProductId(last.productId);
      setAmount(String(last.amount));
      setConcept(last.concept);
      setConceptTouched(true);
      setMethod(last.method);
    }
  }

  function selectCustomer(id: string) {
    setCustomerId(id);
    setSubscriptionId("");
    if (id) applyCustomerDefaults(id);
  }

  function selectProduct(id: string) {
    setProductId(id);
    const product = products.find((p) => p.id === id);
    if (!conceptTouched && product) setConcept(product.name);
    if (!amount && product?.suggestedPrice) setAmount(String(product.suggestedPrice));
  }

  function toggleSubscription(sub: SubscriptionRecord) {
    if (subscriptionId === sub.id) {
      setSubscriptionId("");
      return;
    }
    setSubscriptionId(sub.id);
    setProductId(sub.productId);
    setAmount(String(sub.amount));
    setConcept(
      `Abono ${FREQUENCY_LABEL[sub.frequency].toLowerCase()} · ${productName(sub.productId)}`,
    );
    setConceptTouched(true);
  }

  async function issue(paymentId: string) {
    const response = await fetch(`/api/admin/payments/${paymentId}/issue-receipt`, {
      method: "POST",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "No se pudo emitir el comprobante");
    return data.receipt as ReceiptRecord;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!customerId) {
      setError("Elegí o creá el cliente");
      return;
    }
    const numericAmount = Number(amount.replace(",", "."));
    if (!numericAmount || numericAmount <= 0) {
      setError("Ingresá un importe mayor a 0");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          productId,
          subscriptionId: subscriptionId || null,
          amount: numericAmount,
          concept: concept.trim() || productName(productId),
          period,
          method,
          date,
          transferReference: method === "efectivo" ? "" : reference,
          notes,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo registrar el cobro");
        return;
      }

      let receipt: ReceiptRecord | null = null;
      let issueError: string | null = null;
      if (issueNow) {
        try {
          receipt = await issue(data.id);
        } catch (err) {
          issueError = err instanceof Error ? err.message : "No se pudo emitir";
        }
      }

      setResult({
        paymentId: data.id,
        amount: numericAmount,
        customerName: customer?.name ?? "Cliente",
        receipt,
        issueError,
      });
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Error de red. Revisá tu conexión e intentá de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  if (result) {
    return (
      <SuccessView
        result={result}
        onIssued={(receipt) => setResult({ ...result, receipt, issueError: null })}
        issue={issue}
        onReset={() => {
          setResult(null);
          setCustomerId("");
          setSubscriptionId("");
          setAmount("");
          setConcept("");
          setConceptTouched(false);
          setReference("");
          setNotes("");
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start"
    >
      <div className="flex flex-col gap-5">
        {/* 1. Cliente */}
        <Card className="p-5">
          <StepTitle n={1} title="Cliente" />
          <CustomerPicker
            customers={customers}
            selected={customer}
            onSelect={selectCustomer}
            onCreated={(created) => {
              setCustomers((list) =>
                [...list, created].sort((a, b) => a.name.localeCompare(b.name, "es")),
              );
              selectCustomer(created.id);
            }}
          />

          {customer && customerSubs.length > 0 ? (
            <div className="mt-4">
              <p className="text-foreground mb-2 text-[13px] font-medium">
                ¿Es el pago de un abono?
              </p>
              <div className="flex flex-col gap-2">
                {customerSubs.map((sub) => {
                  const active = sub.id === subscriptionId;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleSubscription(sub)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                        active
                          ? "border-accent bg-accent-muted"
                          : "border-border hover:bg-surface-sunken",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-md border",
                          active ? "bg-accent border-accent text-white" : "border-border",
                        )}
                      >
                        {active ? (
                          <Check className="size-3.5" strokeWidth={3} aria-hidden />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-foreground block truncate text-sm font-medium">
                          {productName(sub.productId)} · {FREQUENCY_LABEL[sub.frequency]}
                        </span>
                        <span className="text-foreground-muted block text-[12px]">
                          {formatCurrency(sub.amount)} · vence{" "}
                          {formatDate(sub.nextDueDate)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </Card>

        {/* 2. Detalle del cobro */}
        <Card className="p-5">
          <StepTitle n={2} title="Detalle del cobro" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Importe" className="sm:col-span-2">
              {(id) => (
                <div className="relative">
                  <span className="text-foreground-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl font-medium">
                    $
                  </span>
                  <Input
                    id={id}
                    inputMode="decimal"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                    className="h-14 pl-9 text-2xl font-semibold tabular-nums sm:text-2xl"
                    required
                  />
                </div>
              )}
            </Field>

            <Field label="Servicio">
              {(id) => (
                <Select
                  id={id}
                  value={productId}
                  onChange={(e) => selectProduct(e.target.value)}
                  required
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              )}
            </Field>

            <Field label="Período que paga">
              {(id) => (
                <MonthSelect id={id} value={period} onChange={setPeriod} required />
              )}
            </Field>

            <Field
              label="Concepto"
              hint="Es lo que va a figurar en el comprobante."
              className="sm:col-span-2"
            >
              {(id) => (
                <Input
                  id={id}
                  value={concept}
                  onChange={(e) => {
                    setConcept(e.target.value);
                    setConceptTouched(true);
                  }}
                  placeholder="Ej.: Mantenimiento web noviembre"
                />
              )}
            </Field>
          </div>
        </Card>

        {/* 3. Pago */}
        <Card className="p-5">
          <StepTitle n={3} title="Cómo pagó" />
          <div className="flex flex-col gap-4">
            <div
              role="radiogroup"
              aria-label="Medio de pago"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {METHOD_OPTIONS.map(({ value, label, icon: Icon }) => {
                const active = method === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMethod(value)}
                    className={cn(
                      "flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors",
                      active
                        ? "border-accent bg-accent-muted text-accent-bright"
                        : "border-border text-foreground-muted hover:bg-surface-sunken hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fecha de pago">
                {(id) => (
                  <Input
                    id={id}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                )}
              </Field>
              {method !== "efectivo" ? (
                <Field label="N.º de operación" optional>
                  {(id) => (
                    <Input
                      id={id}
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Para encontrarlo en tu banco"
                    />
                  )}
                </Field>
              ) : null}
            </div>
            {showNotes ? (
              <Field label="Observaciones" optional>
                {(id) => (
                  <Textarea
                    id={id}
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                )}
              </Field>
            ) : (
              <button
                type="button"
                onClick={() => setShowNotes(true)}
                className="text-accent-bright self-start text-[13px] font-medium hover:underline"
              >
                + Agregar observación
              </button>
            )}
          </div>
        </Card>
      </div>

      {/* Resumen (columna derecha en PC, barra fija abajo en el celular) */}
      <div className="lg:sticky lg:top-10">
        <Card className="p-5">
          <p className="text-foreground-muted text-[13px] font-medium">Resumen</p>
          <p className="text-foreground mt-1 text-3xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(Number(amount.replace(",", ".")) || 0)}
          </p>
          <dl className="mt-4 flex flex-col gap-2.5 text-[13px]">
            <SummaryRow label="Cliente" value={customer?.name ?? "—"} />
            <SummaryRow label="Servicio" value={productName(productId)} />
            <SummaryRow label="Período" value={formatPeriod(period)} />
            <SummaryRow
              label="Medio"
              value={METHOD_OPTIONS.find((m) => m.value === method)?.label ?? ""}
            />
          </dl>

          {selectedSub ? (
            <p className="bg-accent-muted text-accent-bright mt-4 flex gap-2 rounded-xl p-3 text-[12px]">
              <CalendarClock className="size-4 shrink-0" aria-hidden />
              Al emitir el comprobante, el próximo vencimiento del abono se corre
              automáticamente.
            </p>
          ) : null}

          <div className="border-border mt-4 border-t pt-4">
            <Switch
              checked={issueNow}
              onChange={setIssueNow}
              label="Emitir comprobante"
              description="Queda listo para enviar por WhatsApp"
            />
          </div>

          {error ? (
            <div className="mt-4">
              <InlineAlert tone="critical">{error}</InlineAlert>
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            loading={saving}
            className="mt-5 hidden w-full lg:flex"
          >
            {issueNow ? "Registrar y emitir" : "Registrar cobro"}
          </Button>
        </Card>
      </div>

      <div
        style={{ bottom: "calc(4rem + env(safe-area-inset-bottom))" }}
        className="border-border bg-background-subtle/95 fixed inset-x-0 z-30 border-t px-4 py-3 backdrop-blur-md lg:hidden"
      >
        <Button type="submit" size="lg" loading={saving} className="w-full">
          {issueNow ? "Registrar y emitir" : "Registrar cobro"} ·{" "}
          {formatCurrency(Number(amount.replace(",", ".")) || 0)}
        </Button>
      </div>
      <div className="h-16 lg:hidden" aria-hidden />
    </form>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="text-foreground mb-4 flex items-center gap-2.5 text-[15px] font-semibold">
      <span className="bg-accent-muted text-accent-bright flex size-6 items-center justify-center rounded-full text-[12px] font-semibold">
        {n}
      </span>
      {title}
    </h2>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-foreground-muted">{label}</dt>
      <dd className="text-foreground truncate text-right font-medium">{value}</dd>
    </div>
  );
}

/* ── Selector de cliente con búsqueda y alta rápida ───────────────────── */

function CustomerPicker({
  customers,
  selected,
  onSelect,
  onCreated,
}: {
  customers: CustomerRecord[];
  selected?: CustomerRecord;
  onSelect: (id: string) => void;
  onCreated: (customer: CustomerRecord) => void;
}) {
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (selected) {
    return (
      <div className="border-border flex items-center gap-3 rounded-xl border p-3">
        <Avatar name={selected.name} />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-semibold">
            {selected.name}
          </p>
          <p className="text-foreground-muted truncate text-[12px]">
            {selected.businessName ?? selected.phoneRaw}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onSelect("")}>
          Cambiar
        </Button>
      </div>
    );
  }

  const term = query.trim().toLowerCase();
  const matches = (
    term
      ? customers.filter((c) =>
          [c.name, c.businessName, c.phoneRaw]
            .filter(Boolean)
            .some((f) => f!.toLowerCase().includes(term)),
        )
      : customers
  ).slice(0, 6);

  async function create() {
    if (!query.trim() || !phone.trim()) {
      setError("Nombre y teléfono son obligatorios");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: query.trim(),
          phoneRaw: phone,
          type: "ocasional",
          productIds: [],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "No se pudo crear el cliente");
        return;
      }
      onCreated({
        id: data.id,
        name: query.trim(),
        phone: "",
        phoneRaw: phone,
        type: "ocasional",
        status: "activo",
        productIds: [],
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
      });
    } catch {
      setError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search
          className="text-foreground-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCreating(false);
          }}
          placeholder="Buscar por nombre, negocio o teléfono"
          aria-label="Buscar cliente"
          className="pl-10"
        />
      </div>

      {matches.length > 0 ? (
        <ul className="border-border divide-border divide-y overflow-hidden rounded-xl border">
          {matches.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                className="hover:bg-surface-sunken flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors"
              >
                <Avatar name={c.name} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="text-foreground block truncate text-sm font-medium">
                    {c.name}
                  </span>
                  <span className="text-foreground-muted block truncate text-[12px]">
                    {c.businessName ?? c.phoneRaw}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : term ? (
        <p className="text-foreground-muted px-1 text-[13px]">
          No hay clientes con ese nombre.
        </p>
      ) : (
        <p className="text-foreground-muted px-1 text-[13px]">
          Todavía no cargaste clientes. Escribí el nombre para crear el primero.
        </p>
      )}

      {term && !creating ? (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="text-accent-bright hover:bg-accent-muted flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors"
        >
          <Plus className="size-4" aria-hidden />
          Crear cliente “{query.trim()}”
        </button>
      ) : null}

      {creating ? (
        <div className="border-accent/40 bg-accent-muted/40 flex flex-col gap-3 rounded-xl border border-dashed p-3">
          <Field
            label={`Teléfono de ${query.trim()}`}
            hint="Con código de área. Se usa para mandar el comprobante por WhatsApp."
          >
            {(id) => (
              <Input
                id={id}
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="261 555-1234"
                autoFocus
              />
            )}
          </Field>
          {error ? <InlineAlert tone="critical">{error}</InlineAlert> : null}
          <div className="flex gap-2">
            <Button size="sm" onClick={create} loading={busy}>
              Crear y usar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCreating(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── Pantalla de éxito: el comprobante listo para enviar ──────────────── */

function SuccessView({
  result,
  issue,
  onIssued,
  onReset,
}: {
  result: Result;
  issue: (paymentId: string) => Promise<ReceiptRecord>;
  onIssued: (receipt: ReceiptRecord) => void;
  onReset: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(result.issueError);

  async function retry() {
    setBusy(true);
    setError(null);
    try {
      onIssued(await issue(result.paymentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo emitir");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      <span className="bg-status-good/12 text-status-good mx-auto flex size-16 items-center justify-center rounded-full">
        <Check className="size-8" strokeWidth={2.6} aria-hidden />
      </span>
      <h2 className="text-foreground mt-5 text-xl font-semibold">Cobro registrado</h2>
      <p className="text-foreground mt-2 text-3xl font-semibold tracking-tight tabular-nums">
        {formatCurrency(result.amount)}
      </p>
      <p className="text-foreground-muted mt-1 text-sm">{result.customerName}</p>

      {result.receipt ? (
        <>
          <p className="bg-surface-sunken text-foreground ring-border mt-5 inline-flex rounded-full px-3 py-1 text-[13px] font-medium ring-1">
            Comprobante {result.receipt.number}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <WhatsappReceiptButton
              receipt={result.receipt}
              size="lg"
              className="w-full"
              label="Enviar por WhatsApp"
            />
            <DownloadReceiptButton
              receipt={result.receipt}
              size="lg"
              className="w-full"
            />
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {error ? (
            <InlineAlert tone="critical">
              El cobro quedó guardado, pero no se pudo emitir el comprobante: {error}
            </InlineAlert>
          ) : (
            <p className="text-foreground-muted text-sm">Se guardó sin comprobante.</p>
          )}
          <Button size="lg" onClick={retry} loading={busy} className="w-full">
            Emitir comprobante ahora
          </Button>
        </div>
      )}

      <div className="border-border mt-6 flex flex-col gap-2 border-t pt-5 sm:flex-row sm:justify-center">
        <Button variant="secondary" onClick={onReset}>
          <Plus className="size-4" aria-hidden />
          Registrar otro
        </Button>
        <ButtonLink href="/admin/payments" variant="ghost">
          Ver cobros
        </ButtonLink>
      </div>
    </Card>
  );
}
