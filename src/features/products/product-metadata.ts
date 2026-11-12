import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import type { ProductShowcase } from "@/features/products/types";

/**
 * Metadata propia de cada página de caso. La og:image la genera el
 * `opengraph-image.tsx` de cada ruta, por eso no se define acá.
 */
export function buildProductMetadata(product: ProductShowcase): Metadata {
  const path = `/trabajos/${product.slug}`;
  const { title, description } = product.seo;

  return {
    title,
    description,
    alternates: { canonical: path },
    // Next.js no mezcla `openGraph`/`twitter` campo a campo con el layout:
    // si se define acá reemplaza al del root, por eso se repiten type/locale.
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: `${siteConfig.url}${path}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
