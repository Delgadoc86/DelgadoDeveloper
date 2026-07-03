import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { FadeIn } from "@/components/motion/fade-in";
import { stackGroups } from "@/features/stack/data/stack";

export function StackSection() {
  return (
    <section className="border-border/60 bg-background-subtle border-t py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Stack" title="Con qué trabajo" />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group, index) => (
            <FadeIn key={group.category} delay={index * 0.05}>
              <h3 className="text-foreground text-sm font-semibold">{group.category}</h3>
              <p className="text-foreground-muted mt-1 mb-4 text-xs">
                {group.description}
              </p>

              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-border bg-background flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                  >
                    <span className="text-foreground-muted flex size-4 shrink-0 items-center justify-center">
                      <TechIcon name={item} className="size-4" />
                    </span>
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
