/** Captura real de un producto, con sus dimensiones exactas para evitar saltos de layout. */
export interface DeviceShot {
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  /** Texto corto debajo de la captura en la galería. */
  caption: string;
}

export interface ProductMetric {
  value: string;
  label: string;
}

export interface ProductFeatureGroup {
  title: string;
  items: string[];
}

/**
 * Producto propio de DelgadoDev (no trabajo para un cliente). Se muestra en
 * la sección "Mis productos" del home y tiene su propia página de caso en
 * /trabajos/[slug]. Todo el contenido tiene que ser real: nada de métricas,
 * testimonios ni precios inventados.
 */
export interface ProductShowcase {
  slug: string;
  name: string;
  /** Sitio oficial del producto (dominio propio). */
  url: string;
  category: string;
  statusTag: string;
  /** Resumen de una o dos líneas para la tarjeta del home. */
  summary: string;
  /** Exactamente 3 beneficios en lenguaje de cliente, sin jerga técnica. */
  benefits: [string, string, string];
  /** Capturas usadas en la tarjeta y en el encabezado de la página del caso. */
  showcase: { desktop: DeviceShot; mobile: DeviceShot };
  gallery: DeviceShot[];
  /** Links extra al producto en vivo (ej. la demo pública). */
  extraLinks?: { label: string; href: string }[];
  seo: {
    /** Sin "| DelgadoDev": lo agrega el `title.template` del root layout. */
    title: string;
    description: string;
    h1: string;
  };
  intro: string;
  problem: string;
  solution: string;
  built: ProductFeatureGroup[];
  result: {
    metrics: ProductMetric[];
    text: string;
    note?: string;
  };
  cta: {
    question: string;
    pitch: string;
    whatsappMessage: string;
  };
  schema: {
    applicationCategory: string;
    operatingSystem: string;
  };
}
