"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Plus,
  Receipt,
  Sun,
  Users,
} from "lucide-react";
import { useAdminTheme } from "../theme-shell";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/customers", label: "Clientes", icon: Users },
  { href: "/admin/payments", label: "Cobros", icon: Receipt },
  { href: "/admin/subscriptions", label: "Vencimientos", icon: CalendarClock },
  { href: "/admin/products", label: "Servicios", icon: Package },
];

const NEW_PAYMENT_HREF = "/admin/payments/new";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/payments") {
    return pathname === "/admin/payments";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function useLogout() {
  const router = useRouter();
  return async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5">
      <span className="bg-accent-muted flex size-9 items-center justify-center rounded-xl">
        <Image
          src="/assets/icons/logo-mark.png"
          alt=""
          width={22}
          height={20}
          className="h-5 w-auto"
        />
      </span>
      <span className="leading-tight">
        <span className="text-foreground block text-[15px] font-semibold">
          DelgadoDev
        </span>
        <span className="text-foreground-muted block text-[11px] font-medium">
          Gestión
        </span>
      </span>
    </Link>
  );
}

export function ThemeButton({ className }: { className?: string }) {
  const { theme, toggle } = useAdminTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "text-foreground-muted hover:bg-surface-sunken hover:text-foreground flex size-10 items-center justify-center rounded-xl transition-colors",
        className,
      )}
    >
      <Icon className="size-[18px]" aria-hidden />
    </button>
  );
}

/* ── Escritorio: barra lateral ────────────────────────────────────────── */

function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <aside className="border-border bg-background-subtle fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r lg:flex">
      <div className="px-5 pt-6 pb-5">
        <Brand />
      </div>

      <div className="px-4">
        <Link
          href={NEW_PAYMENT_HREF}
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/25 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="size-4" aria-hidden />
          Registrar cobro
        </Link>
      </div>

      <nav aria-label="Panel" className="mt-6 flex-1 px-3">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-muted text-accent-bright"
                      : "text-foreground-muted hover:bg-surface-sunken hover:text-foreground",
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-border m-3 flex items-center gap-2 rounded-2xl border p-2">
        <span className="bg-surface-sunken text-foreground-muted flex size-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-semibold uppercase">
          {email.charAt(0)}
        </span>
        <span className="text-foreground-muted min-w-0 flex-1 truncate text-[12px]">
          {email}
        </span>
        <ThemeButton className="size-9" />
        <button
          type="button"
          onClick={logout}
          aria-label="Cerrar sesión"
          className="text-foreground-muted hover:bg-status-critical/10 hover:text-status-critical flex size-9 items-center justify-center rounded-xl transition-colors"
        >
          <LogOut className="size-[18px]" aria-hidden />
        </button>
      </div>
    </aside>
  );
}

/* ── Celular: barra superior + barra inferior con acción central ─────── */

function MobileTopBar() {
  return (
    <header className="border-border/70 bg-background/85 sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md lg:hidden">
      <Brand />
      <ThemeButton />
    </header>
  );
}

const BOTTOM_ITEMS: NavItem[] = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/customers", label: "Clientes", icon: Users },
  { href: "/admin/payments", label: "Cobros", icon: Receipt },
  { href: "/admin/more", label: "Más", icon: Menu },
];

function BottomNav() {
  const pathname = usePathname();
  const moreActive =
    pathname.startsWith("/admin/more") ||
    pathname.startsWith("/admin/subscriptions") ||
    pathname.startsWith("/admin/products");

  const renderItem = ({ href, label, icon: Icon }: NavItem) => {
    const active = href === "/admin/more" ? moreActive : isActive(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
          active ? "text-accent-bright" : "text-foreground-muted",
        )}
      >
        <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.8} aria-hidden />
        {label}
      </Link>
    );
  };

  return (
    <nav
      aria-label="Panel"
      className="border-border/70 bg-background-subtle/95 fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="relative mx-auto flex h-16 max-w-md items-stretch px-2">
        {BOTTOM_ITEMS.slice(0, 2).map(renderItem)}
        <div className="flex flex-1 items-start justify-center">
          <Link
            href={NEW_PAYMENT_HREF}
            aria-label="Registrar cobro"
            className="bg-accent text-accent-foreground shadow-accent/40 ring-background-subtle -mt-5 flex size-14 items-center justify-center rounded-2xl shadow-lg ring-4 transition-transform active:scale-95"
          >
            <Plus className="size-6" strokeWidth={2.4} aria-hidden />
          </Link>
        </div>
        {BOTTOM_ITEMS.slice(2).map(renderItem)}
      </div>
    </nav>
  );
}

export function AppShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <Sidebar email={email} />
      <MobileTopBar />
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 pt-5 pb-28 sm:px-6 lg:px-10 lg:pt-10 lg:pb-12">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
