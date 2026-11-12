import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const adminButton = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-sm shadow-accent/25 hover:bg-accent/90",
        secondary:
          "border border-border bg-background-subtle text-foreground hover:border-foreground-muted/40 hover:bg-surface-sunken",
        ghost: "text-foreground-muted hover:bg-surface-sunken hover:text-foreground",
        danger: "bg-status-critical text-white hover:bg-status-critical/90",
        "danger-ghost": "text-status-critical hover:bg-status-critical/10",
        whatsapp: "bg-[#128c4a] text-white shadow-sm hover:bg-[#0f7a40]",
      },
      size: {
        sm: "h-9 px-3 text-[13px]",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-[15px]",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariants = VariantProps<typeof adminButton>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(adminButton({ variant, size }), className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>, ButtonVariants {
  href: string;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(adminButton({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
