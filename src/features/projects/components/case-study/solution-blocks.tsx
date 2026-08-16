import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import type { ProjectSolutionBlock } from "@/types/project";

interface SolutionBlocksProps {
  blocks: ProjectSolutionBlock[];
}

export function SolutionBlocks({ blocks }: SolutionBlocksProps) {
  return (
    <section className="border-border/60 border-t py-12 sm:py-20">
      <Container>
        <SectionHeading eyebrow="La solución" title="Cómo se resolvió" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {blocks.map((block, index) => (
            <FadeIn
              key={block.number}
              delay={index * 0.05}
              className="border-border h-full rounded-xl border p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-accent-bright font-mono text-sm">
                  {block.number}
                </span>
                <div>
                  <h3 className="text-foreground text-sm font-semibold">{block.title}</h3>
                  <p className="text-foreground-muted mt-2 text-sm">
                    {block.description}
                  </p>
                  {block.items && block.items.length > 0 ? (
                    <ul className="text-foreground-muted mt-3 space-y-1 text-sm">
                      {block.items.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
