import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { HeroConstellation } from "@/components/motion/hero-constellation";
import { HeroShowcase } from "@/features/hero/hero-showcase";
import { buildContactWhatsappUrl } from "@/lib/contact";

/**
 * Datos reales y coherentes con el resto del sitio. "5" = PresuPDF, QREvento,
 * DecideSer, Silverio Foodtruck y Date un Gusto (Catálogo Autos es demo y no cuenta).
 */
const heroStats = [
  { value: "+500", label: "usuarios en PresuPDF" },
  { value: "+1.000", label: "presupuestos el último mes" },
  { value: "5", label: "proyectos en producción" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(700px_circle_at_20%_0%,var(--color-accent-muted),transparent_70%)]"
      />
      <HeroConstellation />

      {/* En móvil: texto → capturas → botones y métricas, para que las
          capturas entren en la primera pantalla. En escritorio: texto a la
          izquierda (dos filas) y capturas a la derecha. */}
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <FadeIn>
            <div className="border-border bg-background-subtle mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1">
              <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              <span className="text-foreground-muted text-xs font-medium">
                Desarrollador React freelance · Mendoza
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-foreground text-[2rem] leading-tight font-semibold text-balance sm:text-5xl">
              Desarrollo web y apps a medida en Mendoza
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-foreground-muted mt-3 max-w-md text-lg sm:mt-4">
              Diseño y programo sitios, sistemas y apps que ya usan negocios reales.
            </p>
          </FadeIn>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <HeroShowcase />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 lg:mt-7">
              <Button href={buildContactWhatsappUrl()}>
                <MessageCircle className="size-4" aria-hidden />
                Hablemos de tu proyecto
              </Button>
              <Button href="/#productos" variant="secondary">
                Ver mis productos
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <dl className="border-border/60 mt-8 grid max-w-md grid-cols-3 gap-4 border-t pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end">
                  <dt className="text-foreground-muted mt-1 text-xs">{stat.label}</dt>
                  <dd className="text-foreground text-2xl font-semibold tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
