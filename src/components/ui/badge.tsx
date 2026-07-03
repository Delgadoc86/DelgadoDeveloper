import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "border-border text-foreground-muted inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
