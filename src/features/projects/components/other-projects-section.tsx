import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { otherProjects } from "@/features/projects/data/other-projects";

export function OtherProjectsSection() {
  return (
    <section className="border-border/60 border-t py-12 sm:py-16">
      <Container>
        <FadeIn>
          <h2 className="text-foreground text-lg font-semibold">
            Otros proyectos online
          </h2>
          <p className="text-foreground-muted mt-1.5 max-w-xl text-sm">
            Sitios reales para clientes, operativos hoy, con seguimiento y mejoras
            continuas.
          </p>
        </FadeIn>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {otherProjects.map((project, index) => (
            <FadeIn key={project.name} delay={index * 0.05}>
              <div className="border-border bg-background-subtle flex h-full flex-col rounded-xl border p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      {project.name}
                    </p>
                    <p className="text-foreground-muted mt-0.5 text-xs">
                      {project.category}
                    </p>
                  </div>
                  <span className="bg-accent-muted text-accent-bright shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]">
                    {project.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <p className="text-foreground-muted mt-3 text-xs">
                  {project.responsibility}
                </p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-bright hover:text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  Visitar sitio
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
