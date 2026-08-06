"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/gtag";

interface DownloadButtonProps {
  href: string;
  /** Identificador estable para el evento de Analytics — puede diferir del slug público. */
  analyticsId: string;
}

export function DownloadButton({ href, analyticsId }: DownloadButtonProps) {
  const eventName = `download_click_${analyticsId.replace(/-/g, "_")}`;

  return (
    <Button href={href} onClick={() => trackEvent(eventName, { project: analyticsId })}>
      <Download className="size-4" aria-hidden />
      Descargar APK
    </Button>
  );
}
