import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectCard } from "@/features/projects/components/project-card";
import { projects } from "@/features/projects/data/projects";

export function ProjectsSection() {
  return (
    <section id="proyectos" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Proyectos"
          title="De la idea al producto en producción"
          description="DecideSer es mi caso de estudio más completo: un catálogo digital de cosmética con 266 productos, mobile-first y con panel de administración propio. También sumé Mi Almacén (para comercios de barrio) y PresuPDF, antes PresuFácil (para oficios y trabajadores independientes), apps Android que ya podés descargar, y Catálogo Autos, un sitio web para agencias de autos en Mendoza."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.05} className="h-full">
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
