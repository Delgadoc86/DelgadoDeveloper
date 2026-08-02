"use client";

import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "./theme-shell";

export function ThemeToggle() {
  const { theme, toggle } = useAdminTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      className="border-border bg-background-subtle text-foreground-muted hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-full border"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
