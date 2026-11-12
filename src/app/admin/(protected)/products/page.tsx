import { getPayments, getProducts } from "@/lib/admin/data";
import { PageHeader } from "../../_ui/primitives";
import { ProductsView } from "./products-view";

export default async function AdminProductsPage() {
  const [products, payments] = await Promise.all([getProducts(), getPayments()]);

  const usage: Record<string, number> = {};
  for (const payment of payments) {
    if (payment.status !== "anulado")
      usage[payment.productId] = (usage[payment.productId] ?? 0) + 1;
  }

  return (
    <>
      <PageHeader
        title="Servicios"
        description="Lo que cobrás, con precio sugerido para completar cobros más rápido."
      />
      <ProductsView products={products} usage={usage} />
    </>
  );
}
