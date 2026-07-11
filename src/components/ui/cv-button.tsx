import { Download } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cvUrl } from "@/lib/cv";

interface CvButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

/**
 * Ancla nativa con `download` (no next/link): /public no es una ruta de la
 * app, así que el router de Next puede tratarla como 404 en la navegación
 * cliente. Una ancla normal deja que el navegador maneje la descarga.
 */
export function CvButton({ variant, size, className }: CvButtonProps) {
  return (
    <a href={cvUrl} download className={cn(buttonVariants({ variant, size }), className)}>
      <Download className="size-4" aria-hidden />
      Descargar CV
    </a>
  );
}
