"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Menu, MessageCircle, X } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/ui/icons";
import { mainNav } from "@/constants/nav";
import { socialLinks } from "@/constants/social-links";
import { siteConfig } from "@/config/site.config";

const socialChannels = [
  { label: "Email", href: socialLinks.email, icon: Mail },
  { label: "WhatsApp", href: socialLinks.whatsapp, icon: MessageCircle },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: socialLinks.github, icon: GithubIcon },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
];

const emptySubscribe = () => () => {};

interface MobileNavProps {
  cvAvailable: boolean;
  cvUrl: string;
}

export function MobileNav({ cvAvailable, cvUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  // Portals need `document`, which doesn't exist during SSR. useSyncExternalStore
  // returns the server snapshot (false) on first render and flips to true after
  // hydration without ever calling setState inside an effect.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Manual focus trap: while the panel is open, Tab/Shift+Tab cycle only through
  // its own links/buttons instead of leaking into content hidden behind it.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
      : [];
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const panel = (
    <motion.div
      id="mobile-nav-panel"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-background/98 fixed inset-0 z-[100] backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(600px_circle_at_100%_0%,var(--color-accent-muted),transparent_70%)]"
      />

      <Image
        src="/assets/icons/logo-mark.png"
        alt=""
        width={32}
        height={28}
        className="absolute top-4 left-8 h-7 w-auto"
      />

      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={close}
        className="text-foreground-muted hover:text-foreground absolute top-4 right-6 flex size-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none"
      >
        <X className="size-5" aria-hidden />
      </button>

      <nav aria-label="Principal" className="flex h-full flex-col justify-center px-8">
        <ul className="space-y-1">
          {mainNav.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={link.href}
                onClick={close}
                className="group flex items-baseline gap-3 py-3"
              >
                <span className="text-accent-bright font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground group-hover:text-accent-bright text-3xl font-semibold transition-colors">
                  {link.label}
                </span>
              </Link>
            </motion.li>
          ))}

          {cvAvailable ? (
            <motion.li
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + mainNav.length * 0.05 }}
            >
              <a
                href={cvUrl}
                download
                onClick={close}
                className="group flex items-baseline gap-3 py-3"
              >
                <span className="text-accent-bright font-mono text-sm">
                  {String(mainNav.length + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground group-hover:text-accent-bright text-3xl font-semibold transition-colors">
                  CV
                </span>
              </a>
            </motion.li>
          ) : null}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="border-border/60 mt-10 flex flex-wrap gap-4 border-t pt-8"
        >
          {socialChannels.map(({ label, href, icon: Icon }) => {
            const isMailto = href.startsWith("mailto:");

            return (
              <a
                key={label}
                href={href}
                target={isMailto ? undefined : "_blank"}
                rel={isMailto ? undefined : "noreferrer noopener"}
                aria-label={isMailto ? label : `${label} (se abre en una nueva pestaña)`}
                className="text-foreground-muted hover:text-accent-bright transition-colors"
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </a>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="text-foreground-muted mt-8 font-mono text-xs"
        >
          {siteConfig.author.location}
        </motion.p>
      </nav>
    </motion.div>
  );

  return (
    <div className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="text-foreground-muted hover:text-foreground relative z-50 flex size-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none"
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      {/* Portaled to <body>: the header has backdrop-blur, which makes it a
          containing block for `position: fixed` descendants in some browsers.
          Rendering the panel inside header would confine it to the header's
          own box instead of the full viewport. */}
      {mounted
        ? createPortal(
            <AnimatePresence>{open ? panel : null}</AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
