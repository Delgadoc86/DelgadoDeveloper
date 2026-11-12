import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/features/products/components/device-showcase";
import { productShots } from "@/features/products/data/products";

/**
 * Collage del hero: PresuPDF y QREvento en PC y celular, con capturas
 * reales de producción. Las posiciones son porcentajes sobre un contenedor
 * de proporción fija, así la composición escala igual en móvil y escritorio.
 * Sin FadeIn a propósito: es el contenido principal del primer pliegue (LCP)
 * y no debe arrancar invisible.
 */
export function HeroShowcase() {
  return (
    <div>
      <div className="relative aspect-[5/4] w-full">
        <BrowserFrame
          shot={productShots.qreventoDesktop}
          domain="qrevento.com.ar"
          loading="eager"
          sizes="(min-width: 1024px) 480px, 70vw"
          className="absolute top-0 right-0 w-[70%]"
        />
        <BrowserFrame
          shot={productShots.presupdfDesktop}
          domain="presupdf.com.ar"
          loading="preload"
          sizes="(min-width: 1024px) 460px, 66vw"
          className="absolute bottom-[4%] left-[8%] z-10 w-[66%]"
        />
        <PhoneFrame
          shot={productShots.presupdfMobile}
          loading="eager"
          sizes="(min-width: 1024px) 130px, 19vw"
          className="absolute bottom-0 left-0 z-20 w-[19%]"
        />
        <PhoneFrame
          shot={productShots.qreventoMobile}
          loading="eager"
          sizes="(min-width: 1024px) 130px, 19vw"
          className="absolute right-0 bottom-0 z-20 w-[19%]"
        />
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-2">
        <CaseLink href="/trabajos/presupdf" name="PresuPDF" label="presupuestos en PDF" />
        <CaseLink
          href="/trabajos/qrevento"
          name="QREvento"
          label="álbum QR para eventos"
        />
      </div>
    </div>
  );
}

function CaseLink({ href, name, label }: { href: string; name: string; label: string }) {
  return (
    <Link
      href={href}
      className="border-border text-foreground-muted hover:border-foreground-muted hover:text-foreground group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"
    >
      <span className="text-foreground font-medium">{name}</span>
      <span aria-hidden>·</span>
      {label}
      <ArrowUpRight
        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  );
}
