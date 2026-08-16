import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";

interface ClosingCtaProps {
  question: string;
  pitch: string;
}

export function ClosingCta({ question, pitch }: ClosingCtaProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-16">
      <Container className="text-center">
        <FadeIn>
          <p className="text-foreground mx-auto max-w-lg text-xl font-semibold text-balance sm:text-2xl">
            {question}
          </p>
          <p className="text-foreground-muted mx-auto mt-3 max-w-md text-sm">{pitch}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
