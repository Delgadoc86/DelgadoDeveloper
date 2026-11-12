import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/auth/session";
import { AppShell } from "../_ui/app-shell";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getSessionAdmin();
  if (!admin) redirect("/admin/login");

  return <AppShell email={admin.email ?? ""}>{children}</AppShell>;
}
