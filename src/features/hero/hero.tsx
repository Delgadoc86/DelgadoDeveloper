import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { socialLinks } from "@/constants/social-links";
import { projects } from "@/features/projects/data/projects";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(700px_circle_at_20%_0%,var(--color-accent-muted),transparent_70%)]"
      />

      <Container className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <FadeIn>
            <p className="text-accent-bright mb-3 font-mono text-sm">
              Frontend &amp; Mobile Developer · Mendoza, Argentina
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="text-foreground max-w-3xl text-4xl font-semibold text-balance sm:text-6xl">
              Construyo productos digitales que resuelven problemas reales.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-foreground-muted mt-5 max-w-xl text-lg">
              Diseño y desarrollo aplicaciones web y mobile simples, claras y funcionales
              para pequeños negocios, oficios y comercios.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/#proyectos">Ver proyectos</Button>
              <Button href={socialLinks.whatsapp} variant="secondary">
                Hablemos
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="hidden lg:block">
          <div className="border-border bg-background-subtle relative overflow-hidden rounded-2xl border p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full opacity-60 [background:radial-gradient(circle,var(--color-accent-muted),transparent_70%)]"
            />

            <div className="mb-4 flex items-center gap-2">
              <span className="bg-accent size-1.5 rounded-full" aria-hidden />
              <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
                Productos en desarrollo
              </p>
            </div>

            <ul className="space-y-2.5">
              {projects.map((project) => (
                <li
                  key={project.slug}
                  className="border-border/80 bg-background rounded-xl border p-3.5"
                >
                  <p className="text-foreground text-sm font-medium">{project.name}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="border-border text-foreground-muted rounded-full border px-2 py-0.5 font-mono text-[10px]">
                      {project.platform === "mobile" ? "Mobile" : "Web"}
                    </span>
                    <span className="bg-accent-muted text-accent-bright rounded-full px-2 py-0.5 font-mono text-[10px]">
                      {project.statusTag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
