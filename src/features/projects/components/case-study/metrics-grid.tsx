import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import type { ProjectMetric } from "@/types/project";

interface MetricsGridProps {
  metrics: ProjectMetric[];
  note?: string;
}

export function MetricsGrid({ metrics, note }: MetricsGridProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-16">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center sm:text-left">
                <p className="text-accent-bright text-4xl font-semibold tabular-nums sm:text-5xl">
                  {metric.value}
                </p>
                <p className="text-foreground-muted mt-1.5 text-sm text-balance">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          {note ? <p className="text-foreground-muted mt-8 text-xs">{note}</p> : null}
        </FadeIn>
      </Container>
    </section>
  );
}
