"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/gtag";

interface OfficialSiteButtonProps {
  href: string;
  /** Identificador estable para el evento de Analytics. */
  analyticsId: string;
}

/**
 * CTA hacia el sitio oficial de un producto (dominio propio), para
 * proyectos donde DelgadoDev deja de distribuir la descarga y solo
 * enlaza a la fuente oficial. Evento propio (`official_site_click_*`),
 * distinto de `download_click_*`, para no mezclar una visita al sitio
 * oficial con una descarga real en las métricas.
 */
export function OfficialSiteButton({ href, analyticsId }: OfficialSiteButtonProps) {
  const eventName = `official_site_click_${analyticsId.replace(/-/g, "_")}`;

  return (
    <Button href={href} onClick={() => trackEvent(eventName, { project: analyticsId })}>
      Visitar sitio oficial
      <ArrowUpRight className="size-4" aria-hidden />
    </Button>
  );
}
