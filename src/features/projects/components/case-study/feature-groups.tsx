import { LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import type { ProjectFeatureGroup } from "@/types/project";

interface FeatureGroupsProps {
  groups: ProjectFeatureGroup[];
}

export function FeatureGroups({ groups }: FeatureGroupsProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-16">
      <Container>
        <FadeIn>
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-accent-bright size-4" aria-hidden />
            <h2 className="text-foreground text-sm font-semibold">Qué incluye</h2>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <FadeIn key={group.title} delay={index * 0.05}>
              <h3 className="text-foreground text-sm font-semibold">{group.title}</h3>
              <ul className="text-foreground-muted mt-2 space-y-1 text-sm">
                {group.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
