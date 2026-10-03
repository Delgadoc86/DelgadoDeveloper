import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { HeroConstellation } from "@/components/motion/hero-constellation";
import { projects } from "@/features/projects/data/projects";

/**
 * Curado a propósito para el hero: qué hace + disponibilidad concreta, en
 * vez de reusar el tagline largo de cada caso de estudio. El nombre y la
 * captura se toman de `projects.ts` (no se hardcodean acá) para que nunca
 * queden desactualizados si un proyecto cambia de nombre o de portada.
 */
const heroHighlightSlugs = [
  {
    slug: "presupdf",
    label: "Presupuestos en minutos, sin papeles",
    availability: "Web app",
  },
  {
    slug: "catalogo-autos",
    label: "El catálogo que hace lucir tu stock",
    availability: "Demo funcional",
  },
] as const;

const heroHighlights = heroHighlightSlugs.map(({ slug, label, availability }) => {
  const project = projects.find((item) => item.slug === slug);
  return {
    slug,
    label,
    availability,
    name: project?.name ?? slug,
    coverImage: project?.coverImage,
  };
});

export function Hero() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(700px_circle_at_20%_0%,var(--color-accent-muted),transparent_70%)]"
      />
      <HeroConstellation />

      <Container className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          <FadeIn>
            <div className="border-border bg-background-subtle mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 sm:mb-4">
              <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              <span className="text-foreground-muted text-xs font-medium">
                Desarrollo web y sistemas a medida para negocios
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.03}>
            <p className="text-accent-bright mb-2 font-mono text-sm sm:mb-3">
              Desarrollo web y sistemas a medida para negocios · Mendoza, Argentina
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-foreground max-w-2xl text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
              Diseñamos y desarrollamos soluciones digitales para negocios.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-foreground-muted mt-4 max-w-xl text-lg sm:mt-5">
              Creamos sitios web, sistemas y productos digitales para ayudar a empresas,
              comercios y equipos a vender mejor, operar con más claridad y automatizar
              procesos.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Button href="/#trabajos">Ver trabajos</Button>
              <Button
                href="/#contacto"
                variant="ghost"
                className="text-accent-bright hover:text-foreground underline-offset-4 hover:underline"
              >
                Hablemos de tu proyecto
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="text-foreground-muted mt-3 text-xs sm:text-sm">
              2 APK disponibles · 2 webs online · 1 demo comercial funcional
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:hidden">
            <div className="mt-3 flex flex-wrap gap-2">
              {heroHighlights.map((item) => (
                <Link
                  key={item.slug}
                  href={`/trabajos/${item.slug}`}
                  className="border-border text-foreground-muted hover:border-foreground-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"
                >
                  <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                  {item.name}
                </Link>
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
                Trabajos destacados
              </p>
            </div>

            <ul className="space-y-2.5">
              {heroHighlights.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/trabajos/${item.slug}`}
                    className="border-border/80 bg-background hover:border-foreground-muted group flex items-center gap-3 rounded-xl border p-3.5 transition-colors"
                  >
                    <div className="bg-background-subtle relative size-12 shrink-0 overflow-hidden rounded-lg">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage.src}
                          alt={item.coverImage.alt}
                          fill
                          sizes="48px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground text-sm font-medium">{item.name}</p>
                      <p className="text-foreground-muted mt-1 truncate text-xs">
                        {item.label}
                      </p>
                      <span className="bg-accent-muted text-accent-bright mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px]">
                        {item.availability}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
