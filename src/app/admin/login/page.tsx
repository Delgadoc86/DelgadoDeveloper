import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const admin = await getSessionAdmin();
  if (admin) redirect("/admin");

  return <LoginForm />;
}
