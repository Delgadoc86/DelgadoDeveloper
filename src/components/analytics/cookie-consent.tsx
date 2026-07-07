"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

export const COOKIE_CONSENT_KEY = "delgadodev-cookie-consent";

type Consent = "accepted" | "rejected" | null;

const emptySubscribe = () => () => {};

function readStoredConsent(): Consent {
  const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return stored === "accepted" || stored === "rejected" ? stored : null;
}

export function CookieConsent() {
  // Same SSR-safe "mounted" flag used in MobileNav: localStorage doesn't exist
  // on the server, so reading it before hydration would cause a mismatch.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [choice, setChoice] = useState<Consent>(null);

  const consent = choice ?? (mounted ? readStoredConsent() : null);

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setChoice(value);
  };

  return (
    <>
      {consent === "accepted" ? <GoogleAnalytics /> : null}

      {mounted && consent === null ? (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="border-border bg-background fixed inset-x-0 bottom-0 z-[100] border-t py-5 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
        >
          <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-foreground-muted flex items-start gap-2.5 text-sm">
              <Cookie className="text-accent-bright mt-0.5 size-5 shrink-0" aria-hidden />
              <span>
                Uso Google Analytics para entender qué contenido interesa más. No se
                activa hasta que lo aceptes.{" "}
                <Link
                  href="/cookies"
                  className="text-accent-bright underline underline-offset-2"
                >
                  Más info
                </Link>
              </span>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
              >
                Aceptar
              </button>
              <button
                type="button"
                onClick={() => choose("rejected")}
                className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
              >
                Rechazar
              </button>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
