import Image from "next/image";
import type { DeviceShot } from "@/features/products/types";
import { cn } from "@/lib/utils";

/**
 * - "preload": la imagen principal del primer pliegue (LCP).
 * - "eager": visible al cargar, pero sin competir con la principal.
 * - "lazy": todo lo que está más abajo.
 */
export type ShotLoading = "preload" | "eager" | "lazy";

interface FrameProps {
  shot: DeviceShot;
  loading?: ShotLoading;
  sizes?: string;
  className?: string;
}

function imageLoadingProps(loading: ShotLoading) {
  return loading === "preload"
    ? { preload: true }
    : { loading: loading === "eager" ? ("eager" as const) : ("lazy" as const) };
}

/** Captura de escritorio dentro de una ventana de navegador hecha con CSS. */
export function BrowserFrame({
  shot,
  domain,
  loading = "lazy",
  sizes = "(min-width: 1024px) 640px, 100vw",
  className,
}: FrameProps & { domain: string }) {
  return (
    <div
      className={cn(
        "border-border bg-background overflow-hidden rounded-xl border shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="border-border flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-border size-2 rounded-full" aria-hidden />
        <span className="bg-border size-2 rounded-full" aria-hidden />
        <span className="bg-border size-2 rounded-full" aria-hidden />
        <span className="bg-background-subtle text-foreground-muted ml-2 truncate rounded-md px-2 py-0.5 font-mono text-[10px]">
          {domain}
        </span>
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="block h-auto w-full"
        {...imageLoadingProps(loading)}
      />
    </div>
  );
}

/** Captura móvil dentro de un marco de teléfono hecho con CSS. */
export function PhoneFrame({
  shot,
  loading = "lazy",
  sizes = "176px",
  className,
}: FrameProps) {
  return (
    <div
      className={cn(
        "border-border bg-background overflow-hidden rounded-[1.1rem] border-4 shadow-2xl shadow-black/50 sm:rounded-[1.4rem]",
        className,
      )}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="block h-auto w-full"
        {...imageLoadingProps(loading)}
      />
    </div>
  );
}

interface DeviceShowcaseProps {
  desktop: DeviceShot;
  mobile: DeviceShot;
  /** Dominio que se muestra en la barra del navegador simulado. */
  domain: string;
  loading?: ShotLoading;
  className?: string;
}

/** Captura de escritorio con la captura móvil superpuesta. Solo CSS. */
export function DeviceShowcase({
  desktop,
  mobile,
  domain,
  loading = "lazy",
  className,
}: DeviceShowcaseProps) {
  return (
    <div className={cn("relative pr-5 pb-8 sm:pr-8 sm:pb-10", className)}>
      <BrowserFrame shot={desktop} domain={domain} loading={loading} />
      <PhoneFrame
        shot={mobile}
        loading={loading}
        className="absolute right-0 bottom-0 w-[26%] max-w-44"
      />
    </div>
  );
}
