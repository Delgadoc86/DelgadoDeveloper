import Link from "next/link";
import { getSessionAdmin } from "@/lib/auth/session";
import { LogoutButton } from "./logout-button";

export default async function AdminHomePage() {
  const admin = await getSessionAdmin();
  if (!admin) return null;

  return (
    <div className="mx-auto mt-24 flex w-full max-w-sm flex-col gap-4">
      <p className="text-sm">
        Sesión iniciada como <strong>{admin.email}</strong> ({admin.role}).
      </p>
      <Link href="/admin/apps" className="text-sm underline">
        Aplicaciones
      </Link>
      <Link href="/admin/customers" className="text-sm underline">
        Clientes
      </Link>
      <Link href="/admin/products" className="text-sm underline">
        Productos y servicios
      </Link>
      <Link href="/admin/subscriptions" className="text-sm underline">
        Suscripciones y vencimientos
      </Link>
      <LogoutButton />
    </div>
  );
}
