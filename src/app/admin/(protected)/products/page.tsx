import Link from "next/link";
import { getAdminDb } from "@/lib/firebase/admin";
import type { ProductRecord } from "@/types/product";
import { ProductForm } from "./product-form";
import { ThemeToggle } from "../../theme-toggle";

export default async function AdminProductsPage() {
  const snapshot = await getAdminDb().collection("products").orderBy("name").get();

  const products: ProductRecord[] = snapshot.docs.map((doc) => {
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
  });

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Productos y servicios</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin" className="text-sm underline">
            Volver
          </Link>
        </div>
      </div>

      <ProductForm />

      {products.map((product) => (
        <ProductForm key={product.id} product={product} />
      ))}
    </div>
  );
}
