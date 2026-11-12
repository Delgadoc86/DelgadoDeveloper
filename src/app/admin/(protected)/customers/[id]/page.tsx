import { notFound } from "next/navigation";
import { CalendarClock, Mail, MessageCircle, Phone, Plus, Receipt } from "lucide-react";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  getPayments,
  getProducts,
  getReceiptsById,
  getSubscriptions,
  toCustomer,
} from "@/lib/admin/data";
import {
  dueState,
  formatCurrency,
  formatDate,
  formatRelativeDay,
  FREQUENCY_LABEL,
} from "@/lib/admin/format";
import { getArgentinaTodayISO } from "@/lib/timezone";
import { buildWhatsappUrl, hasUsablePhone } from "@/lib/whatsapp";
import { adminButton, ButtonLink } from "../../../_ui/button";
import { DueBadge } from "../../../_ui/due-badge";
import { PaymentItem } from "../../../_ui/payment-item";
import {
  Avatar,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  StatusBadge,
} from "../../../_ui/primitives";
import { EditCustomerButton } from "./edit-customer-button";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [customerDoc, products, payments, subscriptions, receiptsById] =
    await Promise.all([
      getAdminDb().collection("customers").doc(id).get(),
      getProducts(),
      getPayments(),
      getSubscriptions(),
      getReceiptsById(),
    ]);
  if (!customerDoc.exists) notFound();

  const customer = toCustomer(customerDoc);
  const today = getArgentinaTodayISO();
  const productName = (pid: string) =>
    products.find((p) => p.id === pid)?.name ?? "Servicio";

  const history = payments.filter((p) => p.customerId === id);
  const valid = history.filter((p) => p.status !== "anulado");
  const total = valid.reduce((s, p) => s + p.amount, 0);
  const lastDate = valid[0]?.date;
  const subs = subscriptions.filter((s) => s.customerId === id);
  const contracted = products.filter((p) => customer.productIds.includes(p.id));
  const canWhatsapp = hasUsablePhone(customer.phone);

  return (
    <>
      <PageHeader
        title={customer.name}
        description={
          <span className="flex flex-wrap items-center gap-2">
            {customer.businessName ? <span>{customer.businessName}</span> : null}
            <StatusBadge
              icon={false}
              tone={customer.type === "recurrente" ? "accent" : "neutral"}
            >
              {customer.type === "recurrente" ? "Recurrente" : "Ocasional"}
            </StatusBadge>
            {customer.status === "inactivo" ? (
              <StatusBadge tone="neutral">Inactivo</StatusBadge>
            ) : null}
          </span>
        }
        backHref="/admin/customers"
        backLabel="Clientes"
        actions={
          <>
            <EditCustomerButton
              customer={customer}
              products={products.filter((p) => p.active)}
            />
            <ButtonLink href={`/admin/payments/new?customerId=${customer.id}`}>
              <Plus className="size-4" aria-hidden />
              Registrar cobro
            </ButtonLink>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Stat label="Total cobrado" value={formatCurrency(total)} />
            <Stat label="Cobros" value={String(valid.length)} />
            <Stat
              label="Último cobro"
              value={lastDate ? formatDate(lastDate, false) : "—"}
            />
          </div>

          {subs.length > 0 ? (
            <Card className="overflow-hidden">
              <CardHeader
                title="Abonos"
                description="Cobros periódicos de este cliente"
              />
              <ul className="divide-border mt-3 divide-y">
                {subs.map((sub) => {
                  const state = dueState(sub, today);
                  return (
                    <li key={sub.id} className="flex items-center gap-3 px-5 py-3.5">
                      <span className="bg-accent-muted text-accent-bright flex size-10 shrink-0 items-center justify-center rounded-xl">
                        <CalendarClock className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-foreground truncate text-sm font-medium">
                          {productName(sub.productId)}
                        </p>
                        <p className="text-foreground-muted truncate text-[13px]">
                          {formatCurrency(sub.amount)} · {FREQUENCY_LABEL[sub.frequency]}{" "}
                          · vence {formatRelativeDay(sub.nextDueDate, today)}
                        </p>
                      </div>
                      <DueBadge state={state} />
                      {state === "vencida" || state === "proxima" ? (
                        <ButtonLink
                          href={`/admin/payments/new?subscriptionId=${sub.id}`}
                          size="sm"
                          variant="secondary"
                        >
                          Cobrar
                        </ButtonLink>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </Card>
          ) : null}

          <Card className="overflow-hidden">
            <CardHeader title="Historial de cobros" />
            {history.length === 0 ? (
              <EmptyState
                icon={Receipt}
                title="Sin cobros todavía"
                description="Cuando le cobres, vas a ver acá cada pago con su comprobante."
                action={
                  <ButtonLink href={`/admin/payments/new?customerId=${customer.id}`}>
                    Registrar cobro
                  </ButtonLink>
                }
              />
            ) : (
              <div className="divide-border mt-3 divide-y">
                {history.map((payment) => (
                  <PaymentItem
                    key={payment.id}
                    payment={payment}
                    receipt={
                      payment.receiptId ? receiptsById[payment.receiptId] : undefined
                    }
                    customerName={customer.name}
                    productName={productName(payment.productId)}
                    showCustomer={false}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-5 lg:sticky lg:top-10">
          <div className="flex items-center gap-3">
            <Avatar name={customer.name} size="lg" />
            <div className="min-w-0">
              <p className="text-foreground truncate font-semibold">{customer.name}</p>
              <p className="text-foreground-muted truncate text-[13px]">
                Cliente desde{" "}
                {customer.createdAt ? formatDate(customer.createdAt.slice(0, 10)) : "—"}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`tel:${customer.phoneRaw}`}
              className={adminButton({ variant: "secondary", size: "sm" })}
              aria-label={`Llamar a ${customer.name}`}
            >
              <Phone className="size-4" aria-hidden />
              Llamar
            </a>
            {canWhatsapp ? (
              <a
                href={buildWhatsappUrl(
                  customer.phone,
                  `Hola ${customer.name.split(" ")[0]}!`,
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#128c4a] px-3 text-[13px] font-medium text-white hover:bg-[#0f7a40]"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
            ) : null}
          </div>

          <dl className="border-border mt-5 flex flex-col gap-3.5 border-t pt-5 text-[13px]">
            <Info label="Teléfono">{customer.phoneRaw || "—"}</Info>
            <Info label="Correo">
              {customer.email ? (
                <a
                  href={`mailto:${customer.email}`}
                  className="text-accent-bright inline-flex items-center gap-1 hover:underline"
                >
                  <Mail className="size-3.5" aria-hidden />
                  {customer.email}
                </a>
              ) : (
                "—"
              )}
            </Info>
            <Info label="CUIT / DNI">{customer.taxId || "—"}</Info>
            <Info label="Servicios">
              {contracted.length ? (
                <span className="flex flex-wrap gap-1.5">
                  {contracted.map((p) => (
                    <StatusBadge key={p.id} tone="neutral" icon={false}>
                      {p.name}
                    </StatusBadge>
                  ))}
                </span>
              ) : (
                "—"
              )}
            </Info>
            {customer.notes ? <Info label="Notas">{customer.notes}</Info> : null}
          </dl>
          {!canWhatsapp ? (
            <p className="text-status-warning bg-status-warning/10 mt-4 rounded-xl p-3 text-[12px]">
              El teléfono no es válido para WhatsApp. Editá el cliente para poder enviarle
              comprobantes.
            </p>
          ) : null}
        </Card>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-foreground-muted text-[12px] font-medium sm:text-[13px]">
        {label}
      </p>
      <p className="text-foreground mt-1 truncate text-lg font-semibold tracking-tight sm:text-2xl">
        {value}
      </p>
    </Card>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-foreground-muted text-[12px]">{label}</dt>
      <dd className="text-foreground mt-0.5 break-words">{children}</dd>
    </div>
  );
}
