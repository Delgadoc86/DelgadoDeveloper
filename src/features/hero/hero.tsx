import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CvButton } from "@/components/ui/cv-button";
import { FadeIn } from "@/components/motion/fade-in";
import { cvAvailable } from "@/lib/cv";
import { socialLinks } from "@/constants/social-links";

/**
 * Curado a propósito para el hero: nombre + qué hace + disponibilidad
 * concreta, en vez de reusar el tagline largo de cada caso de estudio.
 */
const heroHighlights = [
  {
    name: "PresúFácil",
    label: "Presupuestos desde el celular",
    availability: "APK disponible",
  },
  {
    name: "Mi Almacén",
    label: "Caja, fiados y productos",
    availability: "APK disponible",
  },
  {
    name: "Catálogo Autos",
    label: "Catálogo y panel administrativo",
    availability: "Demo funcional",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(700px_circle_at_20%_0%,var(--color-accent-muted),transparent_70%)]"
      />

      <Container className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          <FadeIn>
            <div className="border-border bg-background-subtle mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 sm:mb-4">
              <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              <span className="text-foreground-muted text-xs font-medium">
                Disponible para oportunidades Frontend / React
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="text-accent-bright mb-2 font-mono text-sm sm:mb-3">
              Frontend &amp; Mobile Developer · Mendoza, Argentina
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-foreground max-w-2xl text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
              Construí aplicaciones Android y sitios web que hoy están listos para usarse.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-foreground-muted mt-4 max-w-xl text-lg sm:mt-5">
              Desarrollo aplicaciones Android descargables, sitios web en producción y
              plataformas comerciales con panel administrativo. Trabajo con React,
              Next.js, React Native y Firebase.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Button href="/#proyectos">Ver proyectos</Button>
              <Button href={socialLinks.github} variant="secondary">
                Ver GitHub
              </Button>
              {cvAvailable ? <CvButton variant="secondary" /> : null}
              <Button
                href="/#contacto"
                variant="ghost"
                className="text-accent-bright hover:text-foreground underline-offset-4 hover:underline"
              >
                Contactarme
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="text-foreground-muted mt-3 text-xs sm:text-sm">
              2 APK disponibles · 2 webs online · 1 demo comercial funcional · GitHub
              público
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:hidden">
            <div className="mt-3 flex flex-wrap gap-2">
              {heroHighlights.map((item) => (
                <span
                  key={item.name}
                  className="border-border text-foreground-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                >
                  <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                  {item.name}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.22} className="hidden lg:block">
          <div className="border-border bg-background-subtle relative overflow-hidden rounded-2xl border p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full opacity-60 [background:radial-gradient(circle,var(--color-accent-muted),transparent_70%)]"
            />

            <div className="mb-4 flex items-center gap-2">
              <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
                Proyectos destacados
              </p>
            </div>

            <ul className="space-y-2.5">
              {heroHighlights.map((item) => (
                <li
                  key={item.name}
                  className="border-border/80 bg-background rounded-xl border p-3.5"
                >
                  <p className="text-foreground text-sm font-medium">{item.name}</p>
                  <p className="text-foreground-muted mt-1 text-xs">{item.label}</p>
                  <span className="bg-accent-muted text-accent-bright mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px]">
                    {item.availability}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
