import Link from "next/link";
import { getAdminDb } from "@/lib/firebase/admin";
import type { CustomerRecord } from "@/types/customer";
import type { ProductRecord } from "@/types/product";
import { CustomersPanel } from "./customers-panel";
import { ThemeToggle } from "../../theme-toggle";

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const { new: newParam } = await searchParams;
  const db = getAdminDb();
  // Sin `where` combinado con `orderBy` a propósito: el catálogo de productos
  // es chico (unos pocos documentos), así que se trae todo ordenado y se
  // filtra en código en vez de depender de un índice compuesto de Firestore.
  const [customersSnapshot, productsSnapshot] = await Promise.all([
    db.collection("customers").orderBy("name").get(),
    db.collection("products").orderBy("name").get(),
  ]);

  const customers: CustomerRecord[] = customersSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      businessName: data.businessName ?? undefined,
      phone: data.phone,
      phoneRaw: data.phoneRaw,
      email: data.email ?? undefined,
      taxId: data.taxId ?? undefined,
      type: data.type,
      status: data.status,
      notes: data.notes ?? undefined,
      productIds: data.productIds ?? [],
      createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    };
  });

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

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Clientes</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin" className="text-sm underline">
            Volver
          </Link>
        </div>
      </div>

      <CustomersPanel
        customers={customers}
        products={products}
        initialShowForm={newParam === "1"}
      />
    </div>
  );
}
