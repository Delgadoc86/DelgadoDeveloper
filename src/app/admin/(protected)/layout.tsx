import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/auth/session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getSessionAdmin();
  if (!admin) redirect("/admin/login");

  return <>{children}</>;
}
