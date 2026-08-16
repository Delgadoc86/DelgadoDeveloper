import Image from "next/image";
import { Gauge, ImageOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import type { ProjectPerformance } from "@/types/project";

interface PerformanceSectionProps {
  performance: ProjectPerformance;
}

export function PerformanceSection({ performance }: PerformanceSectionProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Performance"
          title={performance.note}
          description={performance.detail}
        />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:items-center">
          <FadeIn className="grid grid-cols-2 gap-6">
            {performance.scores.map((score) => (
              <div key={score.label} className="flex items-center gap-3">
                <span className="bg-accent-muted text-accent-bright flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Gauge className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-foreground text-2xl font-semibold tabular-nums">
                    {score.value}
                  </p>
                  <p className="text-foreground-muted text-xs">{score.label}</p>
                </div>
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="border-border bg-background-subtle relative aspect-16/10 w-full overflow-hidden rounded-xl border">
              {performance.screenshot ? (
                <Image
                  src={performance.screenshot.src}
                  alt={performance.screenshot.alt}
                  fill
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="text-foreground-muted flex h-full w-full flex-col items-center justify-center gap-2">
                  <ImageOff className="size-5" aria-hidden />
                  <span className="text-xs">Captura de PageSpeed pendiente</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {performance.source ? (
          <p className="text-foreground-muted mt-6 text-xs">{performance.source}</p>
        ) : null}
      </Container>
    </section>
  );
}
