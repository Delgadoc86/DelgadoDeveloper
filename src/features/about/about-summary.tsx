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
            title="DelgadoDev soy yo: un desarrollador, no una agencia"
            description="Trabajo solo y de punta a punta: hablo con vos, diseño, programo, publico y mantengo. Cada proyecto que publico, de PresuPDF a Date un Gusto, lo sigo manteniendo."
          />

          <Button href="/sobre-mi" variant="secondary" className="mt-6">
            Conocé más sobre mí
          </Button>
        </FadeIn>

        <FadeIn delay={0.05} className="hidden lg:block">
          <PersonalCard />
        </FadeIn>
      </Container>
    </section>
  );
}
