import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectCard } from "@/features/projects/components/project-card";
import { OtherProjectsList } from "@/features/projects/components/other-projects-list";
import { featuredProjects } from "@/features/projects/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="trabajos"
      className="border-border/60 scroll-mt-24 border-t py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Más trabajos"
          title="Catálogos, sitios y sistemas para negocios"
          description="Desde un catálogo con pedido por WhatsApp hasta sitios con panel propio para actualizar el contenido: trabajos que desarrollé y mantengo."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.05} className="h-full">
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <OtherProjectsList />
      </Container>
    </section>
  );
}
