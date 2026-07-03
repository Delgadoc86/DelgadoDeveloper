import type { ComponentType, SVGProps } from "react";
import {
  BarChart3,
  Component,
  Database,
  FileText,
  Hammer,
  HardDrive,
  KeyRound,
  Search,
  Smartphone,
  Triangle,
  Wind,
} from "lucide-react";
import { GithubIcon, ReactIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  React: ReactIcon,
  "React Native": ReactIcon,
  "Tailwind CSS": Wind,
  "Material UI": Component,
  Expo: Smartphone,
  "Firebase Auth": KeyRound,
  Firestore: Database,
  "Firebase Storage": HardDrive,
  Vercel: Triangle,
  GitHub: GithubIcon,
  "EAS Build": Hammer,
  "SEO técnico": Search,
  "Generación de PDF": FileText,
  "Google Analytics": BarChart3,
};

const monogramMap: Record<string, string> = {
  "Next.js": "N",
  TypeScript: "TS",
  JavaScript: "JS",
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = iconMap[name];

  if (Icon) {
    return <Icon className={className} aria-hidden />;
  }

  // No real logo mapped (e.g. Next.js/TypeScript/JavaScript, whose marks are
  // just letterforms anyway): fall back to a mono-font monogram so every stack
  // item still gets an icon slot, keeping the grid visually consistent.
  return (
    <span className={cn("font-mono text-[10px] font-semibold", className)} aria-hidden>
      {monogramMap[name] ?? name.slice(0, 2).toUpperCase()}
    </span>
  );
}
