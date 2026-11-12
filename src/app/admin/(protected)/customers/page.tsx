import { getCustomers, getPayments, getProducts } from "@/lib/admin/data";
import { PageHeader } from "../../_ui/primitives";
import { CustomersView, type CustomerStats } from "./customers-view";

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const { new: newParam } = await searchParams;
  const [customers, products, payments] = await Promise.all([
    getCustomers(),
    getProducts(),
    getPayments(),
  ]);

  // Total cobrado y último cobro por cliente (cobros no anulados).
  const stats: Record<string, CustomerStats> = {};
  for (const payment of payments) {
    if (payment.status === "anulado") continue;
    const entry = (stats[payment.customerId] ??= { total: 0, count: 0, lastDate: "" });
    entry.total += payment.amount;
    entry.count += 1;
    if (payment.date > entry.lastDate) entry.lastDate = payment.date;
  }

  return (
    <>
      <PageHeader title="Clientes" description="Tu cartera y lo que te pagó cada uno." />
      <CustomersView
        customers={customers}
        products={products.filter((p) => p.active)}
        stats={stats}
        initialOpen={newParam === "1"}
      />
    </>
  );
}
