import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { PersonalCard } from "@/features/about/personal-card";

export function AboutSummary() {
  return (
    <section className="border-border/60 border-t py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
        <FadeIn>
          <SectionHeading
            eyebrow="Sobre mí"
            title="No hago solo páginas web: diseño y desarrollo productos digitales para negocios"
            description="Soy Cristian Delgado. Desarrollo sitios web, sistemas y productos digitales para negocios que necesitan soluciones claras, funcionales y orientadas a resultados reales."
          />

          <Button href="/sobre-mi" variant="secondary" className="mt-6">
            Hablemos de tu proyecto
          </Button>
        </FadeIn>

        <FadeIn delay={0.05} className="hidden lg:block">
          <PersonalCard />
        </FadeIn>
      </Container>
    </section>
  );
}
