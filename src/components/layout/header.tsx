import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNav } from "@/constants/nav";
import { siteConfig } from "@/config/site.config";

export function Header() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 rounded-sm font-mono text-sm font-semibold"
        >
          <Image
            src="/assets/icons/logo-mark.png"
            alt=""
            width={32}
            height={28}
            priority
            className="h-7 w-auto"
          />
          {siteConfig.name}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 sm:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground-muted hover:text-foreground rounded-sm text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MobileNav />

          <Button href="/#contacto" size="sm">
            Hablemos
          </Button>
        </div>
      </Container>
    </header>
  );
}
