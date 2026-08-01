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
      <LogoutButton />
    </div>
  );
}
