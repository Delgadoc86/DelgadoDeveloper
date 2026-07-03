import Image from "next/image";
import { cn } from "@/lib/utils";

interface PersonalCardProps {
  className?: string;
}

export function PersonalCard({ className }: PersonalCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-background-subtle flex items-center gap-4 rounded-2xl border p-5",
        className,
      )}
    >
      <div className="bg-accent-muted flex size-14 shrink-0 items-center justify-center rounded-full">
        <Image
          src="/assets/icons/logo-mark.png"
          alt=""
          width={32}
          height={28}
          className="h-7 w-auto"
        />
      </div>

      <div>
        <p className="text-foreground text-sm font-semibold">Cristian Delgado</p>
        <p className="text-foreground-muted text-sm">Frontend &amp; Mobile Developer</p>
        <p className="text-foreground-muted mt-1 text-xs">Mendoza, Argentina</p>
        <p className="text-foreground-muted mt-2 font-mono text-xs">
          React · React Native · Firebase
        </p>
      </div>
    </div>
  );
}
