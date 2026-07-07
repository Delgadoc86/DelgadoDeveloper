"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/gtag";

interface DownloadButtonProps {
  href: string;
  projectSlug: string;
}

export function DownloadButton({ href, projectSlug }: DownloadButtonProps) {
  const eventName = `download_click_${projectSlug.replace(/-/g, "_")}`;

  return (
    <Button href={href} onClick={() => trackEvent(eventName, { project: projectSlug })}>
      <Download className="size-4" aria-hidden />
      Descargar APK
    </Button>
  );
}
