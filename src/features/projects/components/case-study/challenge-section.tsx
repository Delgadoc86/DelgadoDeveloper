import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

interface ChallengeSectionProps {
  problem: string;
  challengeDetail?: string;
  positioning?: string;
}

export function ChallengeSection({
  problem,
  challengeDetail,
  positioning,
}: ChallengeSectionProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-20">
      <Container>
        <SectionHeading eyebrow="El desafío" title="Más que un catálogo" />

        <FadeIn className="mt-6 max-w-2xl">
          <p className="text-foreground-muted text-base sm:text-lg">{problem}</p>

          {challengeDetail ? (
            <p className="border-accent-bright text-foreground mt-6 border-l-2 pl-4 text-base font-medium text-balance">
              {challengeDetail}
            </p>
          ) : null}
        </FadeIn>

        {positioning ? (
          <FadeIn delay={0.05} className="mt-12">
            <p className="text-foreground max-w-3xl text-2xl font-semibold text-balance sm:text-3xl">
              {positioning}
            </p>
          </FadeIn>
        ) : null}
      </Container>
    </section>
  );
}
