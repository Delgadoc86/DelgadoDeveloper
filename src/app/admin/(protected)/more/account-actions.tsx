"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useAdminTheme } from "../../theme-shell";
import { useLogout } from "../../_ui/app-shell";
import { Card } from "../../_ui/primitives";

export function AccountActions({ email }: { email: string }) {
  const { theme, toggle } = useAdminTheme();
  const logout = useLogout();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <Card className="divide-border divide-y overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="bg-surface-sunken text-foreground-muted flex size-10 items-center justify-center rounded-xl text-sm font-semibold uppercase">
          {email.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-foreground block text-sm font-medium">
            Sesión iniciada
          </span>
          <span className="text-foreground-muted block truncate text-[13px]">
            {email}
          </span>
        </span>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="hover:bg-surface-sunken/70 flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
      >
        <span className="bg-surface-sunken text-foreground flex size-10 items-center justify-center rounded-xl">
          <ThemeIcon className="size-5" aria-hidden />
        </span>
        <span className="text-foreground flex-1 text-sm font-medium">
          {theme === "dark" ? "Usar modo claro" : "Usar modo oscuro"}
        </span>
      </button>
      <button
        type="button"
        onClick={logout}
        className="hover:bg-status-critical/5 flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
      >
        <span className="bg-status-critical/10 text-status-critical flex size-10 items-center justify-center rounded-xl">
          <LogOut className="size-5" aria-hidden />
        </span>
        <span className="text-status-critical flex-1 text-sm font-medium">
          Cerrar sesión
        </span>
      </button>
    </Card>
  );
}
