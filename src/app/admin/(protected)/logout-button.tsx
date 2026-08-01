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
      className="rounded border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700"
    >
      Cerrar sesión
    </button>
  );
}
