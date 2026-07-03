import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Lightbulb,
  ListChecks,
  ListTodo,
  Mail,
  PenTool,
  Puzzle,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactCta } from "@/features/contact-cta/contact-cta";
import { projects } from "@/features/projects/data/projects";
import { buildBreadcrumbJsonLd, buildProjectJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site.config";
import type { Project } from "@/types/project";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  const seoTitle = `${project.name} — ${project.category}`;

  return {
    title: seoTitle,
    description: project.description,
    alternates: {
      canonical: `/proyectos/${project.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: project.description,
      images: [project.coverImage.src],
    },
  };
}

function getHighlights(project: Project) {
  return [
    { icon: Puzzle, label: "El problema", text: project.problem },
    { icon: Users, label: "Usuario objetivo", text: project.targetUser },
    { icon: Lightbulb, label: "La solución", text: project.solution },
    { icon: UserCog, label: "Mi rol", text: project.role },
  ];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Inicio", url: siteConfig.url },
    { name: "Proyectos", url: `${siteConfig.url}/#proyectos` },
    { name: project.name, url: `${siteConfig.url}/proyectos/${project.slug}` },
  ]);

  const docsMailto = `${siteConfig.author.email}?subject=${encodeURIComponent(
    `Documentación de ${project.name}`,
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, buildProjectJsonLd(project)]),
        }}
      />

      <section className="py-12 sm:py-20">
        <Container>
          <FadeIn>
            <Link
              href="/#proyectos"
              className="text-foreground-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Proyectos
            </Link>

            <p className="text-accent-bright mt-8 font-mono text-sm">
              {project.category}
            </p>
            <h1 className="text-foreground mt-2 max-w-2xl text-4xl font-semibold text-balance sm:text-5xl">
              {project.name}
            </h1>
            <p className="text-foreground-muted mt-4 max-w-xl text-lg">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            {(project.links.demo ?? project.links.repo) ? (
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.demo ? (
                  <Button href={project.links.demo}>
                    Ver demo
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Button>
                ) : null}
                {project.links.repo ? (
                  <Button href={project.links.repo} variant="secondary">
                    <GithubIcon className="size-4" aria-hidden />
                    Repositorio
                  </Button>
                ) : null}
              </div>
            ) : null}
          </FadeIn>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <FadeIn>
            {project.platform === "mobile" ? (
              <div className="bg-background-subtle border-border flex justify-center rounded-2xl border py-12">
                <div className="border-border relative aspect-9/19 w-56 overflow-hidden rounded-[2rem] border-4 sm:w-64">
                  <Image
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    fill
                    sizes="256px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="border-border bg-background-subtle relative aspect-16/10 w-full overflow-hidden rounded-2xl border">
                <Image
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            )}
          </FadeIn>
        </Container>
      </section>

      <section className="border-border/60 border-t py-12 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {getHighlights(project).map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.05}>
                <div className="border-border h-full rounded-xl border p-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-accent-muted text-accent-bright flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <item.icon className="size-4" aria-hidden />
                    </span>
                    <h2 className="text-foreground text-sm font-semibold">
                      {item.label}
                    </h2>
                  </div>
                  <p className="text-foreground-muted mt-3 text-sm">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container>
          <details className="group">
            <summary className="text-foreground-muted hover:text-foreground flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden">
              <ChevronRight
                className="size-4 shrink-0 transition-transform group-open:rotate-90"
                aria-hidden
              />
              Ver detalles técnicos
            </summary>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2">
                  <ListChecks className="text-accent-bright size-4" aria-hidden />
                  <h3 className="text-foreground text-sm font-semibold">
                    Funcionalidades principales
                  </h3>
                </div>
                <ul className="text-foreground-muted mt-3 space-y-1.5 text-sm">
                  {project.features.map((feature) => (
                    <li key={feature}>· {feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <PenTool className="text-accent-bright size-4" aria-hidden />
                  <h3 className="text-foreground text-sm font-semibold">
                    Decisiones de UX
                  </h3>
                </div>
                <p className="text-foreground-muted mt-3 text-sm">
                  {project.uxDecisions}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Activity className="text-accent-bright size-4" aria-hidden />
                  <h3 className="text-foreground text-sm font-semibold">Estado actual</h3>
                </div>
                <p className="text-foreground-muted mt-3 text-sm">{project.status}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <ListTodo className="text-accent-bright size-4" aria-hidden />
                  <h3 className="text-foreground text-sm font-semibold">
                    Qué falta completar
                  </h3>
                </div>
                <p className="text-foreground-muted mt-3 text-sm">
                  {project.pendingWork}
                </p>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-accent-bright size-4" aria-hidden />
                  <h3 className="text-foreground text-sm font-semibold">
                    Resultados o aprendizajes
                  </h3>
                </div>
                <p className="text-foreground-muted mt-3 text-sm">{project.results}</p>
              </div>
            </div>
          </details>
        </Container>
      </section>

      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container className="text-center">
          <FadeIn>
            <p className="text-foreground-muted mx-auto max-w-md text-sm">
              {project.name} es uno de los productos que construí — trabajo en soluciones
              similares para otros rubros y plataformas.
            </p>
            <Button href={`mailto:${docsMailto}`} variant="secondary" className="mt-5">
              <Mail className="size-4" aria-hidden />
              Pedir documentación completa
            </Button>
          </FadeIn>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
