import { Code2, MessagesSquare, PenTool, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

const steps = [
  {
    icon: MessagesSquare,
    title: "Charlamos",
    description:
      "Me contás tu negocio y qué querés resolver. Te paso una propuesta clara con alcance y plazos.",
  },
  {
    icon: PenTool,
    title: "Diseño",
    description:
      "Armo cómo se va a ver y funcionar, y lo ajustamos juntos antes de programar.",
  },
  {
    icon: Code2,
    title: "Desarrollo",
    description:
      "Construyo el proyecto y te muestro avances en un link real, para que lo pruebes desde tu celular.",
  },
  {
    icon: Rocket,
    title: "Lanzamiento y soporte",
    description:
      "Lo publico con tu dominio, SEO y medición, y sigo disponible para mejoras y mantenimiento.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="como-trabajo"
      className="border-border/60 scroll-mt-24 border-t py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajo"
          description="Trato directo conmigo de principio a fin, sin intermediarios."
        />

        <ol className="mt-10 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <FadeIn delay={index * 0.05} className="h-full">
                <div className="border-border h-full rounded-xl border p-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-accent-muted text-accent-bright flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <step.icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-accent-bright font-mono text-xs">
                      Paso {index + 1}
                    </span>
                  </div>
                  <h3 className="text-foreground mt-4 font-semibold">{step.title}</h3>
                  <p className="text-foreground-muted mt-1.5 text-sm">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
