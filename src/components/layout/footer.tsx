import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/ui/icons";
import { siteConfig } from "@/config/site.config";
import { socialLinks } from "@/constants/social-links";
import { buildContactWhatsappUrl } from "@/lib/contact";
import { mainNav } from "@/constants/nav";
import { projects } from "@/features/projects/data/projects";
import { products } from "@/features/products/data/products";

const socialIcons = [
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: socialLinks.github, icon: GithubIcon },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
];

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-foreground flex items-center gap-2 font-mono text-sm font-semibold"
            >
              <Image
                src="/assets/icons/logo-mark.png"
                alt=""
                width={28}
                height={24}
                className="h-6 w-auto"
              />
              {siteConfig.name}
            </Link>
            <p className="text-foreground-muted mt-4 max-w-xs text-sm">
              Desarrollo web, sistemas a medida y apps para negocios de Mendoza y toda
              Argentina.
            </p>
            <p className="text-foreground-muted mt-4 flex items-center gap-1.5 text-xs">
              <MapPin className="size-3.5" aria-hidden />
              {siteConfig.author.location}
            </p>
          </div>

          <div>
            <h2 className="text-foreground text-sm font-semibold">Navegación</h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {[...products, ...projects].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/trabajos/${item.slug}`}
                    className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                  >
                    Caso {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-foreground text-sm font-semibold">Contacto</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={socialLinks.email}
                  className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                >
                  {siteConfig.author.email}
                </a>
              </li>
              <li>
                <a
                  href={buildContactWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-foreground-muted hover:text-foreground text-sm transition-colors"
                >
                  WhatsApp
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4">
              {socialIcons.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${label} (se abre en una nueva pestaña)`}
                  className="text-foreground-muted hover:text-foreground rounded-sm transition-colors focus-visible:outline-none"
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border/60 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-foreground-muted text-center text-xs sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.author.location}.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.portfolioRepo}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground-muted hover:text-foreground text-xs transition-colors"
            >
              Código de este sitio
              <span className="sr-only"> (se abre en una nueva pestaña)</span>
            </a>
            <Link
              href="/privacidad"
              className="text-foreground-muted hover:text-foreground text-xs transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/cookies"
              className="text-foreground-muted hover:text-foreground text-xs transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
