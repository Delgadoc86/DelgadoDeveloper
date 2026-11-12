import { getCustomers, getProducts, getSubscriptions } from "@/lib/admin/data";
import { getArgentinaTodayISO } from "@/lib/timezone";
import { PageHeader } from "../../_ui/primitives";
import { SubscriptionsView } from "./subscriptions-view";

export default async function AdminSubscriptionsPage() {
  const [subscriptions, customers, products] = await Promise.all([
    getSubscriptions(),
    getCustomers(),
    getProducts(),
  ]);

  return (
    <>
      <PageHeader
        title="Vencimientos"
        description="Abonos periódicos y cuándo le toca pagar a cada cliente."
      />
      <SubscriptionsView
        subscriptions={subscriptions}
        customers={customers}
        products={products}
        today={getArgentinaTodayISO()}
      />
    </>
  );
}
