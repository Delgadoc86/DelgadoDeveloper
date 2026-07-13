import type { Metadata } from "next";
import {
  Briefcase,
  Compass,
  Route,
  Rocket,
  Smartphone,
  Smile,
  Sparkles,
  Store,
  Users,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactCta } from "@/features/contact-cta/contact-cta";
import { PersonalCard } from "@/features/about/personal-card";
import { siteConfig } from "@/config/site.config";
import {
  complementaryCredentials,
  educationIntro,
  mainCredentials,
  selfTaughtAreas,
  selfTaughtIntro,
} from "@/features/about/data/education";

const title = "Sobre mí — Desarrollador Frontend & Mobile en Mendoza";
const description =
  "Cristian Delgado, desarrollador Frontend & Mobile en Mendoza, Argentina. Trabajo con React, Next.js, React Native y Firebase para construir productos digitales para oficios, comercios y pequeños negocios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sobre-mi",
  },
  // Next.js no mezcla `openGraph`/`twitter` en profundidad entre layout y
  // page: si no se redefinen acá, esta página hereda title/description/url
  // del root layout (los del home) en vez de los propios.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/sobre-mi`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const process = [
  {
    icon: Compass,
    title: "Investigar problemas reales",
    description: "Entender el problema antes de pensar en la solución.",
  },
  {
    icon: Users,
    title: "Hablar con usuarios",
    description: "Escuchar directamente a quien va a usar el producto.",
  },
  {
    icon: Route,
    title: "Diseñar flujos simples",
    description: "Reducir pasos innecesarios antes de escribir código.",
  },
  {
    icon: Rocket,
    title: "Construir MVPs funcionales",
    description: "Priorizar lo esencial para poder probarlo cuanto antes.",
  },
  {
    icon: Store,
    title: "Validar con comercios reales",
    description: "Testear con usuarios reales, no solo en la teoría.",
  },
  {
    icon: Sparkles,
    title: "Priorizar claridad y facilidad de uso",
    description: "Que cualquier persona lo entienda sin necesitar explicación.",
  },
];

const audience = [
  { icon: Briefcase, label: "Trabajadores independientes" },
  { icon: Wrench, label: "Oficios" },
  { icon: Store, label: "Pequeños comercios" },
  { icon: Smile, label: "Personas que no son técnicas" },
  { icon: Smartphone, label: "Usuarios que necesitan resolver rápido desde el celular" },
];

export default function SobreMiPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-center">
          <FadeIn>
            <p className="text-accent mb-4 font-mono text-sm">
              Sobre mí · Mendoza, Argentina
            </p>
            <h1 className="text-foreground max-w-2xl text-4xl font-semibold text-balance sm:text-5xl">
              Cristian Delgado — Frontend &amp; Mobile Developer
            </h1>
            <p className="text-foreground-muted mt-6 max-w-xl text-lg">
              Desarrollo aplicaciones web y mobile con React, Next.js, React Native y
              Firebase. Construí productos funcionales, aplicaciones Android descargables
              y sitios actualmente online: no son ejercicios ni maquetas. Busco
              incorporarme a un equipo donde pueda aportar esta experiencia, seguir
              creciendo y trabajar sobre productos reales.
            </p>
            <p className="text-foreground-muted mt-3 max-w-xl text-sm">
              También tomo proyectos freelance de forma independiente.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <PersonalCard />
          </FadeIn>
        </Container>
      </section>

      <section className="border-border/60 border-t py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Cómo trabajo" title="Mi enfoque de trabajo" />

          <ol className="mt-10 grid list-none gap-5 sm:grid-cols-2">
            {process.map((step, index) => (
              <li key={step.title} className="border-border rounded-xl border p-5">
                <FadeIn delay={index * 0.05}>
                  <div className="flex items-center gap-3">
                    <span className="bg-accent-muted text-accent-bright flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <step.icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-accent-bright font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-foreground mt-3 text-sm font-semibold">
                    {step.title}
                  </p>
                  <p className="text-foreground-muted mt-1 text-xs">{step.description}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-border/60 border-t py-16 sm:py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Para quién diseño"
              title="Usuarios que resuelven desde el celular"
            />
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {audience.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="border-border bg-background flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                >
                  <span className="text-foreground-muted flex size-4 shrink-0 items-center justify-center">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-foreground text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      <section className="border-border/60 border-t py-16 sm:py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Formación"
              title="Formación y aprendizaje continuo"
              description={educationIntro}
            />
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {mainCredentials.map((credential, index) => (
              <FadeIn key={credential.name} delay={index * 0.05}>
                <div className="border-border h-full rounded-xl border p-5">
                  <p className="text-foreground text-sm font-semibold">
                    {credential.name}
                  </p>
                  <p className="text-foreground-muted mt-1 text-xs">
                    {credential.institution}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge>{credential.status}</Badge>
                    <span className="text-foreground-muted font-mono text-xs">
                      {credential.period}
                    </span>
                  </div>
                  <p className="text-foreground-muted mt-3 text-xs">
                    {credential.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-14">
              <h3 className="text-foreground text-lg font-semibold">
                Aprendizaje autodidacta aplicado
              </h3>
              <p className="text-foreground-muted mt-2 max-w-2xl text-sm">
                {selfTaughtIntro}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {selfTaughtAreas.map((area) => (
                  <div
                    key={area.title}
                    className="border-border bg-background-subtle rounded-xl border p-5"
                  >
                    <p className="text-foreground text-sm font-semibold">{area.title}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {area.items.map((item) => (
                        <Badge key={item}>{item}</Badge>
                      ))}
                    </div>
                    {area.evidence ? (
                      <p className="text-foreground-muted mt-3 text-xs">
                        Evidencia: {area.evidence.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-14">
              <h3 className="text-foreground-muted text-xs font-semibold tracking-wide uppercase">
                Formación complementaria
              </h3>
              <ul className="mt-4 space-y-1.5">
                {complementaryCredentials.map((credential) => (
                  <li key={credential.name} className="text-foreground-muted text-sm">
                    {credential.name} — {credential.institution} — {credential.period}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
