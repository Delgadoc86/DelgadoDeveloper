import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/ui/icons";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/features/contact-cta/contact-form";
import { socialLinks } from "@/constants/social-links";
import { buildContactWhatsappUrl } from "@/lib/contact";

const contactChannels = [
  { label: "WhatsApp", href: buildContactWhatsappUrl(), icon: MessageCircle },
  { label: "Email", href: socialLinks.email, icon: Mail },
  { label: "GitHub", href: socialLinks.github, icon: GithubIcon },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedinIcon },
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
          <div className="border-border bg-background-subtle relative grid gap-10 overflow-hidden rounded-3xl border px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-2 lg:items-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(500px_circle_at_0%_0%,var(--color-accent-muted),transparent_70%)]"
            />

            <div>
              <p className="text-accent-bright mb-4 font-mono text-sm">Contacto</p>
              <h2 className="text-foreground max-w-lg text-3xl font-semibold text-balance sm:text-4xl">
                Hablemos de tu proyecto
              </h2>
              <p className="text-foreground-muted mt-4 max-w-md">
                Contame qué necesitás y te respondo yo, por WhatsApp. Trabajo con negocios
                de Mendoza y de toda Argentina.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {contactChannels.map(({ label, href, icon: Icon }) => {
                  const isMailto = href.startsWith("mailto:");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={isMailto ? undefined : "_blank"}
                        rel={isMailto ? undefined : "noreferrer noopener"}
                        className="border-border text-foreground hover:border-foreground-muted inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-colors"
                      >
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                        {label}
                        {isMailto ? null : (
                          <span className="sr-only"> (se abre en una nueva pestaña)</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-border bg-background/60 rounded-2xl border p-5 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
