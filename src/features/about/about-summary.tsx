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
            title="No hago solo páginas web: diseño y desarrollo productos digitales completos"
            description="Soy Cristian Delgado, Frontend & Mobile Developer en Mendoza, Argentina. Construyo aplicaciones web y mobile simples, claras y funcionales para resolver problemas reales de trabajadores independientes, oficios y pequeños comercios."
          />

          <Button href="/sobre-mi" variant="secondary" className="mt-6">
            Conocé más
          </Button>
        </FadeIn>

        <FadeIn delay={0.05} className="hidden lg:block">
          <PersonalCard />
        </FadeIn>
      </Container>
    </section>
  );
}
