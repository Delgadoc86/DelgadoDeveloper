import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CvButton } from "@/components/ui/cv-button";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { socialLinks } from "@/constants/social-links";
import { cvAvailable } from "@/lib/cv";

// Orden por prioridad para reclutadores: LinkedIn y Email primero (el CV, si
// existe, se antepone a todos desde el render), después GitHub y WhatsApp, y
// por último las redes que aportan menos a una oportunidad laboral.
const contactChannels = [
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedinIcon },
  { label: "Email", href: socialLinks.email, icon: Mail },
  { label: "GitHub", href: socialLinks.github, icon: GithubIcon },
  { label: "WhatsApp", href: socialLinks.whatsapp, icon: MessageCircle },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
];

export function ContactCta() {
  return (
    <section
      id="contacto"
      className="border-border/60 scroll-mt-24 border-t py-16 sm:py-20"
    >
      <Container>
        <FadeIn>
          <div className="border-border bg-background-subtle relative overflow-hidden rounded-3xl border px-6 py-12 text-center sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(500px_circle_at_50%_0%,var(--color-accent-muted),transparent_70%)]"
            />

            <p className="text-accent-bright mb-4 font-mono text-sm">Contacto</p>
            <h2 className="text-foreground mx-auto max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
              ¿Buscás sumar un desarrollador al equipo o necesitás crear un proyecto?
            </h2>
            <p className="text-foreground-muted mx-auto mt-4 max-w-md text-base">
              Estoy disponible para oportunidades Frontend / React y también para
              proyectos freelance. Respondo personalmente cada mensaje.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {cvAvailable ? <CvButton variant="secondary" /> : null}
              {contactChannels.map(({ label, href, icon: Icon }) => (
                <Button key={label} href={href} variant="secondary">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
