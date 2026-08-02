import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90",
        secondary: "border border-border text-foreground hover:border-foreground-muted",
        ghost: "text-foreground-muted hover:text-foreground",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

export function Button({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  // mailto: opens the OS mail client, not a browser tab, so it's excluded from
  // target="_blank"/rel and the "opens in a new tab" a11y hint below.
  const isMailto = href.startsWith("mailto:");
  // /descargar/[slug] is a redirect-only Route Handler, never a navigable
  // page, so it gets the same plain-<a> treatment as an external link.
  const isExternal =
    href.startsWith("http") || href.startsWith("/descargar/") || isMailto;

  if (isExternal) {
    return (
      <a
        href={href}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noreferrer noopener"}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {isMailto ? null : (
          <span className="sr-only"> (se abre en una nueva pestaña)</span>
        )}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
