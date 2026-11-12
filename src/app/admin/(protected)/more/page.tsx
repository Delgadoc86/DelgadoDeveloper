import Link from "next/link";
import { CalendarClock, ChevronRight, Package } from "lucide-react";
import { getSessionAdmin } from "@/lib/auth/session";
import { Card, PageHeader, SectionLabel } from "../../_ui/primitives";
import { AccountActions } from "./account-actions";

const LINKS = [
  {
    href: "/admin/subscriptions",
    label: "Vencimientos",
    description: "Abonos periódicos y quién debe",
    icon: CalendarClock,
  },
  {
    href: "/admin/products",
    label: "Servicios",
    description: "Catálogo y precios sugeridos",
    icon: Package,
  },
];

/** Pantalla "Más" de la barra inferior del celular. */
export default async function MorePage() {
  const admin = await getSessionAdmin();

  return (
    <>
      <PageHeader title="Más" />
      <div className="flex flex-col gap-6">
        <section>
          <SectionLabel>Gestión</SectionLabel>
          <Card className="divide-border divide-y overflow-hidden">
            {LINKS.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="hover:bg-surface-sunken/70 flex items-center gap-3 px-4 py-3.5 transition-colors"
              >
                <span className="bg-accent-muted text-accent-bright flex size-10 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-foreground block text-sm font-medium">
                    {label}
                  </span>
                  <span className="text-foreground-muted block text-[13px]">
                    {description}
                  </span>
                </span>
                <ChevronRight className="text-foreground-muted size-4" aria-hidden />
              </Link>
            ))}
          </Card>
        </section>

        <section>
          <SectionLabel>Cuenta</SectionLabel>
          <AccountActions email={admin?.email ?? ""} />
        </section>
      </div>
    </>
  );
}
