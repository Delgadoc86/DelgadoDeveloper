"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
          className="border-border bg-background-subtle fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border p-5 shadow-lg sm:right-6 sm:bottom-6 sm:left-auto"
        >
          <p className="text-foreground-muted text-sm">
            Uso Google Analytics para entender qué contenido interesa más. No se activa
            hasta que lo aceptes.{" "}
            <Link
              href="/cookies"
              className="text-accent-bright underline underline-offset-2"
            >
              Más info
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
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
        </div>
      ) : null}
    </>
  );
}
