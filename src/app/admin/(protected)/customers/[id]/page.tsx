import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminDb } from "@/lib/firebase/admin";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import type { PaymentRecord } from "@/types/payment";
import type { ReceiptRecord } from "@/types/receipt";
import { ThemeToggle } from "../../../theme-toggle";
import { IssueReceiptButton } from "../../payments/issue-receipt-button";
import { ReceiptPdfButton } from "../../payments/receipt-pdf-button";
import { VoidReceiptButton } from "../../payments/void-receipt-button";
import { WhatsappButton } from "../../payments/whatsapp-button";
import { CustomerActions } from "./customer-actions";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getAdminDb();

  const [customerDoc, productsSnapshot, paymentsSnapshot, receiptsSnapshot] =
    await Promise.all([
      db.collection("customers").doc(id).get(),
      db.collection("products").orderBy("name").get(),
      // Filtro simple por customerId (sin orderBy combinado) para no depender
      // de un índice compuesto; se ordena por fecha en código más abajo.
      db.collection("payments").where("customerId", "==", id).get(),
      db.collection("receipts").get(),
    ]);

  if (!customerDoc.exists) notFound();
  const customerData = customerDoc.data()!;
  const customer: CustomerRecord = {
    id: customerDoc.id,
    name: customerData.name,
    businessName: customerData.businessName ?? undefined,
    phone: customerData.phone,
    phoneRaw: customerData.phoneRaw,
    email: customerData.email ?? undefined,
    taxId: customerData.taxId ?? undefined,
    type: customerData.type,
    status: customerData.status,
    notes: customerData.notes ?? undefined,
    productIds: customerData.productIds ?? [],
    createdAt: customerData.createdAt?.toDate?.().toISOString() ?? "",
    updatedAt: customerData.updatedAt?.toDate?.().toISOString() ?? "",
    createdBy: customerData.createdBy,
    updatedBy: customerData.updatedBy,
  };

  const products: ProductRecord[] = productsSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        suggestedPrice: data.suggestedPrice ?? null,
        suggestedFrequency: data.suggestedFrequency ?? null,
        active: data.active,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      };
    })
    .filter((product) => product.active);

  const productName = (productId: string) =>
    products.find((product) => product.id === productId)?.name ?? productId;

  const payments: PaymentRecord[] = paymentsSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        customerId: data.customerId,
        productId: data.productId,
        subscriptionId: data.subscriptionId ?? null,
        amount: data.amount,
        concept: data.concept,
        period: data.period,
        method: data.method,
        date: data.date,
        transferReference: data.transferReference ?? null,
        notes: data.notes ?? null,
        status: data.status,
        receiptId: data.receiptId ?? null,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
        updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const receiptsById: Record<string, ReceiptRecord> = {};
  for (const doc of receiptsSnapshot.docs) {
    const data = doc.data();
    const receipt: ReceiptRecord = {
      id: doc.id,
      number: data.number,
      paymentId: data.paymentId,
      customerSnapshot: data.customerSnapshot,
      productSnapshot: data.productSnapshot ?? null,
      subscriptionSnapshot: data.subscriptionSnapshot ?? null,
      amount: data.amount,
      concept: data.concept,
      period: data.period,
      method: data.method,
      issuedAt: data.issuedAt?.toDate?.().toISOString() ?? "",
      issuedBy: data.issuedBy,
      voided: data.voided,
      voidedAt: data.voidedAt?.toDate?.().toISOString() ?? null,
      voidedBy: data.voidedBy ?? null,
      voidReason: data.voidReason ?? null,
    };
    receiptsById[receipt.id] = receipt;
  }

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4 pb-16 lg:max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-accent-muted text-accent-bright flex size-10 shrink-0 items-center justify-center rounded-full text-base font-semibold">
            {customer.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="text-foreground text-lg font-semibold">{customer.name}</h1>
            <p className="text-foreground-muted text-xs">
              {customer.businessName ?? "Sin negocio"} · {customer.phoneRaw}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin/customers" className="text-sm underline">
            Volver
          </Link>
        </div>
      </div>

      <CustomerActions
        customer={customer}
        products={products}
        lastPayment={payments[0]}
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-wide uppercase">
          Historial de pagos
        </h2>

        {payments.length === 0 && (
          <p className="text-foreground-muted text-sm">
            Este cliente todavía no tiene pagos registrados.
          </p>
        )}

        {payments.map((payment) => {
          const receipt = payment.receiptId ? receiptsById[payment.receiptId] : undefined;
          return (
            <div
              key={payment.id}
              className="border-border bg-background-subtle flex flex-col gap-2 rounded-lg border p-4"
            >
              <p className="text-sm">
                <strong>{productName(payment.productId)}</strong> — $
                {payment.amount.toLocaleString("es-AR")} — {payment.period}
              </p>
              <p className="text-foreground-muted text-xs">
                {payment.concept} · {payment.method} · {payment.date} · estado:{" "}
                {payment.status}
              </p>

              {payment.status === "registrado" && (
                <IssueReceiptButton paymentId={payment.id} />
              )}

              {receipt && !receipt.voided && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold">
                    Comprobante {receipt.number}
                  </span>
                  <ReceiptPdfButton receipt={receipt} />
                  <WhatsappButton receipt={receipt} />
                  <VoidReceiptButton receiptId={receipt.id} />
                </div>
              )}

              {receipt?.voided && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#d03b3b]">
                    Comprobante {receipt.number} anulado — {receipt.voidReason}
                  </span>
                  <ReceiptPdfButton receipt={receipt} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
