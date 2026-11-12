import { Plus } from "lucide-react";
import {
  getCustomers,
  getPayments,
  getProducts,
  getReceiptsById,
} from "@/lib/admin/data";
import { ButtonLink } from "../../_ui/button";
import { PageHeader } from "../../_ui/primitives";
import { PaymentsView, type StatusFilter } from "./payments-view";

const STATUS_FILTERS: StatusFilter[] = ["all", "registrado", "emitido", "anulado"];

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const [payments, receiptsById, customers, products] = await Promise.all([
    getPayments(),
    getReceiptsById(),
    getCustomers(),
    getProducts(),
  ]);

  const initialStatus = STATUS_FILTERS.includes(status as StatusFilter)
    ? (status as StatusFilter)
    : "all";

  return (
    <>
      <PageHeader
        title="Cobros"
        description="Pagos registrados y sus comprobantes."
        actions={
          <ButtonLink href="/admin/payments/new" className="hidden sm:inline-flex">
            <Plus className="size-4" aria-hidden />
            Registrar cobro
          </ButtonLink>
        }
      />
      <PaymentsView
        payments={payments}
        receiptsById={receiptsById}
        customerNames={Object.fromEntries(customers.map((c) => [c.id, c.name]))}
        productNames={Object.fromEntries(products.map((p) => [p.id, p.name]))}
        initialStatus={initialStatus}
      />
    </>
  );
}
