"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="border-border bg-background-subtle rounded border px-3 py-1.5 text-sm"
    >
      Cerrar sesión
    </button>
  );
}
