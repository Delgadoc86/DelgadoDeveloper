import { siteConfig } from "@/config/site.config";
import { socialLinks } from "@/constants/social-links";
import { stackGroups } from "@/features/stack/data/stack";
import type { Project } from "@/types/project";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    jobTitle: "Frontend & Mobile Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mendoza",
      addressCountry: "AR",
    },
    // Reutiliza la misma fuente que la sección "Stack" en vez de mantener una
    // segunda lista de tecnologías a mano.
    knowsAbout: stackGroups.flatMap((group) => group.items),
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.instagram,
      socialLinks.tiktok,
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function buildProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `${siteConfig.url}/proyectos/${project.slug}`,
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    // JSON.stringify drops keys set to undefined, so this is omitted cleanly
    // for projects without a live demo instead of emitting `sameAs: null`.
    sameAs: project.links.demo ? [project.links.demo] : undefined,
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
