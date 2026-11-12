import {
  LayoutDashboard,
  MessageCircle,
  Search,
  Smartphone,
  Wallet,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Beneficios para el negocio, no tecnologías. Cada uno está respaldado por
 * un trabajo real del portfolio (indicado en `proof`).
 */
const services = [
  {
    icon: Search,
    title: "Que te encuentren en Google",
    description:
      "Un sitio rápido y bien armado para aparecer cuando buscan tu servicio en Mendoza.",
    proof: "Como en DecideSer: 100 en SEO (PageSpeed)",
  },
  {
    icon: MessageCircle,
    title: "Vender por WhatsApp sin perder pedidos",
    description:
      "Un catálogo donde tu cliente elige y te llega el pedido armado, listo para responder.",
    proof: "Como en DecideSer",
  },
  {
    icon: Workflow,
    title: "Dejar las planillas y los papeles",
    description:
      "Sistemas a medida para presupuestos, clientes, stock o lo que hoy anotás a mano.",
    proof: "Como en PresuPDF",
  },
  {
    icon: Wallet,
    title: "Cobrar online",
    description:
      "Pagos con Mercado Pago, planes y suscripciones integrados a tu propia plataforma.",
    proof: "Como en PresuPDF",
  },
  {
    icon: LayoutDashboard,
    title: "Actualizarlo vos mismo",
    description:
      "Un panel simple para cambiar precios, fotos y contenido sin depender de mí.",
    proof: "Como en DecideSer, Silverio y Date un Gusto",
  },
  {
    icon: Smartphone,
    title: "Estar en el celular de tus clientes",
    description:
      "Web apps que funcionan en cualquier teléfono y se instalan sin pasar por una tienda.",
    proof: "Como en PresuPDF y QREvento",
  },
];

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="border-border/60 scroll-mt-24 border-t py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Qué puedo hacer por tu negocio"
          description="No vendo tecnología: resuelvo problemas concretos con desarrollo web y sistemas a medida."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title}>
              <FadeIn delay={index * 0.04} className="h-full">
                <div className="border-border bg-background-subtle h-full rounded-xl border p-5">
                  <span className="bg-accent-muted text-accent-bright flex size-9 items-center justify-center rounded-lg">
                    <service.icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="text-foreground mt-4 font-semibold">{service.title}</h3>
                  <p className="text-foreground-muted mt-1.5 text-sm">
                    {service.description}
                  </p>
                  <p className="text-accent-bright mt-3 font-mono text-[11px]">
                    {service.proof}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
