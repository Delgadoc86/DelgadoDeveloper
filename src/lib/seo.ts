import { siteConfig } from "@/config/site.config";
import { socialLinks, whatsappPhone } from "@/constants/social-links";
import { products } from "@/features/products/data/products";
import type { ProductShowcase } from "@/features/products/types";
import { stackGroups } from "@/features/stack/data/stack";
import type { Project } from "@/types/project";

const businessId = `${siteConfig.url}/#business`;
const founderId = `${siteConfig.url}/#founder`;

export function buildProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/assets/icons/logo-mark.png`,
    image: `${siteConfig.url}/opengraph-image`,
    email: siteConfig.author.email,
    telephone: `+${whatsappPhone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mendoza",
      addressRegion: "Mendoza",
      addressCountry: "AR",
    },
    areaServed: {
      "@type": "City",
      name: "Mendoza",
      containedInPlace: { "@type": "Country", name: "Argentina" },
    },
    knowsAbout: [
      "Desarrollo web",
      "Sistemas a medida",
      "Aplicaciones web progresivas (PWA)",
      "SEO técnico",
      ...stackGroups.flatMap((group) => group.items),
    ],
    founder: {
      "@type": "Person",
      "@id": founderId,
      name: siteConfig.author.name,
      url: `${siteConfig.url}/sobre-mi`,
      jobTitle: "Desarrollador web y mobile",
      sameAs: [socialLinks.github, socialLinks.linkedin],
    },
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.instagram,
      socialLinks.tiktok,
      ...products.map((product) => product.url),
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-AR",
    publisher: { "@id": businessId },
  };
}

export function buildSoftwareApplicationJsonLd(product: ProductShowcase) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    url: product.url,
    description: product.seo.description,
    applicationCategory: product.schema.applicationCategory,
    operatingSystem: product.schema.operatingSystem,
    image: `${siteConfig.url}${product.showcase.desktop.src}`,
    screenshot: product.gallery.map((shot) => `${siteConfig.url}${shot.src}`),
    featureList: product.built.flatMap((group) => group.items),
    inLanguage: "es-AR",
    author: { "@type": "Organization", "@id": businessId, name: siteConfig.name },
    publisher: { "@type": "Organization", "@id": businessId, name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/trabajos/${product.slug}`,
  };
}

export function buildProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `${siteConfig.url}/trabajos/${project.slug}`,
    creator: { "@type": "Organization", "@id": businessId, name: siteConfig.name },
    // JSON.stringify drops keys set to undefined, so this is omitted cleanly
    // for projects without a live demo instead of emitting `sameAs: null`.
    sameAs: project.links.demo ? [project.links.demo] : undefined,
    // Este CreativeWork es el caso de estudio del producto, no el producto
    // en sí — por eso la relación con el sitio oficial se modela como
    // `about` (de qué trata este caso de estudio) y no como `sameAs`
    // (que implicaría que ambas URLs identifican la misma entidad).
    about: project.links.official
      ? {
          "@type": "SoftwareApplication",
          name: project.name,
          url: project.links.official,
        }
      : undefined,
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
