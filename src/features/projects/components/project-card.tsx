import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group border-border bg-background-subtle hover:border-foreground-muted block overflow-hidden rounded-2xl border transition-colors active:scale-[0.99]"
    >
      <div className="p-6">
        <span className="bg-accent-muted text-accent-bright mb-3 inline-block rounded-full px-2.5 py-1 font-mono text-[11px]">
          {project.category}
        </span>
        <h3 className="text-foreground text-lg font-semibold">{project.name}</h3>
        <p className="text-foreground-muted mt-2 text-sm">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>

      {project.platform === "mobile" ? (
        <div className="bg-background flex h-56 items-center justify-center sm:h-64">
          <div className="border-border relative aspect-9/19 h-44 overflow-hidden rounded-[1.75rem] border-4 sm:h-52">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="180px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-56 flex-col sm:h-64">
          <div className="border-border flex shrink-0 items-center gap-1.5 border-t px-4 py-3">
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
          </div>

          <div className="bg-background relative w-full flex-1 overflow-hidden">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      )}

      <div className="border-border text-accent-bright flex items-center gap-1.5 border-t px-6 py-3.5 text-sm font-medium">
        Ver proyecto
        <ArrowUpRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}
