import type { Metadata } from "next";
import {
  Braces,
  Briefcase,
  Code,
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
import { ReactIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactCta } from "@/features/contact-cta/contact-cta";
import { PersonalCard } from "@/features/about/personal-card";

export const metadata: Metadata = {
  title: "Sobre mí — Desarrollador Frontend & Mobile en Mendoza",
  description:
    "Cristian Delgado, desarrollador Frontend & Mobile en Mendoza, Argentina. Trabajo con React, Next.js, React Native y Firebase para construir productos digitales para oficios, comercios y pequeños negocios.",
  alternates: {
    canonical: "/sobre-mi",
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

const education = [
  { icon: Code, label: "Desarrollo Web" },
  { icon: Braces, label: "JavaScript" },
  { icon: ReactIcon, label: "React" },
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
              Construyo aplicaciones web y mobile simples, claras y funcionales para
              resolver problemas reales de pequeños negocios, oficios y comercios. No
              busco solo &quot;hacer páginas web&quot;: diseño y desarrollo productos
              digitales completos, de punta a punta.
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
        <Container className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Para quién diseño"
              title="Usuarios que resuelven desde el celular"
            />
            <ul className="mt-6 space-y-2">
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

          <FadeIn delay={0.05}>
            <SectionHeading eyebrow="Formación" title="En constante aprendizaje" />
            <ol className="border-border relative mt-8 list-none space-y-6 border-l pl-6">
              {education.map(({ icon: Icon, label }) => (
                <li key={label} className="relative">
                  <span
                    aria-hidden
                    className="bg-border ring-background absolute top-1 -left-[29px] size-2.5 rounded-full ring-4"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-foreground-muted flex size-4 shrink-0 items-center justify-center">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <p className="text-foreground text-sm font-medium">{label}</p>
                  </div>
                </li>
              ))}
              <li className="relative">
                <span
                  aria-hidden
                  className="bg-accent ring-background absolute top-1 -left-[29px] size-2.5 rounded-full ring-4"
                />
                <div className="flex items-center gap-2">
                  <span className="text-accent-bright flex size-4 shrink-0 items-center justify-center">
                    <Smartphone className="size-4" aria-hidden />
                  </span>
                  <p className="text-foreground text-sm font-medium">
                    React Native / Expo
                  </p>
                </div>
                <span className="text-accent-bright mt-1 ml-6 inline-block font-mono text-xs">
                  En curso — aplicado en productos propios
                </span>
              </li>
            </ol>
          </FadeIn>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
