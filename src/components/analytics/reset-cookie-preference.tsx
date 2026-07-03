"use client";

import { buttonVariants } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY } from "@/components/analytics/cookie-consent";
import { cn } from "@/lib/utils";

export function ResetCookiePreference() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem(COOKIE_CONSENT_KEY);
        window.location.reload();
      }}
      className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
    >
      Cambiar mi preferencia de cookies
    </button>
  );
}
