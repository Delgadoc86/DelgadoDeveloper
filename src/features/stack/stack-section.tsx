import { Container } from "@/components/ui/container";
import { stackGroups } from "@/features/stack/data/stack";

/**
 * Franja discreta con las tecnologías que uso. Solo texto: el stack es
 * información de respaldo, no lo que se le vende al cliente.
 */
export function StackStrip() {
  const items = stackGroups.flatMap((group) => group.items);

  return (
    <section
      id="tecnologias"
      aria-labelledby="stack-heading"
      className="border-border/60 bg-background-subtle scroll-mt-24 border-y py-8"
    >
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
        <h2
          id="stack-heading"
          className="text-foreground-muted shrink-0 font-mono text-xs tracking-wide uppercase"
        >
          Con qué trabajo
        </h2>
        <ul className="text-foreground-muted flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
