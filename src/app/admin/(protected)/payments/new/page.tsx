import {
  getCustomers,
  getPayments,
  getProducts,
  getSubscriptions,
} from "@/lib/admin/data";
import type { PaymentRecord } from "@/types/payment";
import { PageHeader } from "../../../_ui/primitives";
import { PaymentComposer } from "./payment-composer";

export default async function NewPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; subscriptionId?: string }>;
}) {
  const params = await searchParams;
  const [customers, products, subscriptions, payments] = await Promise.all([
    getCustomers(),
    getProducts(),
    getSubscriptions(),
    getPayments(),
  ]);

  // Último cobro de cada cliente, para prellenar el caso más común: repetir
  // un cobro cambiando a lo sumo el importe. `payments` ya viene del más
  // reciente al más viejo, así que el primero que aparece es el último.
  const lastPaymentByCustomer: Record<string, PaymentRecord> = {};
  for (const payment of payments) {
    if (payment.status === "anulado") continue;
    lastPaymentByCustomer[payment.customerId] ??= payment;
  }

  return (
    <>
      <PageHeader
        title="Registrar cobro"
        description="Cargá el pago y emití el comprobante en el mismo paso."
        backHref="/admin/payments"
        backLabel="Cobros"
      />
      <PaymentComposer
        customers={customers.filter((c) => c.status === "activo")}
        products={products.filter((p) => p.active)}
        subscriptions={subscriptions.filter(
          (s) => s.status !== "cancelada" && s.frequency !== "unico",
        )}
        lastPaymentByCustomer={lastPaymentByCustomer}
        initialCustomerId={params.customerId}
        initialSubscriptionId={params.subscriptionId}
      />
    </>
  );
}
