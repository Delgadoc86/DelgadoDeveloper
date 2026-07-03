import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className="text-accent-bright mb-3 font-mono text-sm">{eyebrow}</p>
      ) : null}
      <h2 className="text-foreground text-3xl font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-foreground-muted mt-4 text-base sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
