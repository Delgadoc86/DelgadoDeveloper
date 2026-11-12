import type { DeviceShot, ProductShowcase } from "@/features/products/types";

const DESKTOP = { width: 1440, height: 900, device: "desktop" } as const;
const MOBILE = { width: 780, height: 1688, device: "mobile" } as const;

const presupdfDesktop: DeviceShot = {
  ...DESKTOP,
  src: "/images/proyectos/presupdf-escritorio.webp",
  alt: "Landing de PresuPDF en la computadora: presupuestos profesionales en PDF en menos de 30 segundos",
  caption: "Landing en PC",
};

const presupdfMobile: DeviceShot = {
  ...MOBILE,
  src: "/images/proyectos/presupdf-movil.webp",
  alt: "Landing de PresuPDF en el celular con un ejemplo de presupuesto en PDF",
  caption: "Landing en el celular",
};

const qreventoDesktop: DeviceShot = {
  ...DESKTOP,
  src: "/images/proyectos/qrevento-escritorio.webp",
  alt: "Landing de QREvento en la computadora: álbum en vivo con QR para fiestas",
  caption: "Landing en PC",
};

const qreventoMobile: DeviceShot = {
  ...MOBILE,
  src: "/images/proyectos/qrevento-movil.webp",
  alt: "Landing de QREvento en el celular con el botón para probar la demo",
  caption: "Landing en el celular",
};

const qreventoLive: DeviceShot = {
  ...DESKTOP,
  src: "/images/proyectos/qrevento-live-escritorio.webp",
  alt: "Pantalla gigante de QREvento con una foto del evento, una dedicatoria y el QR para sumar fotos",
  caption: "Pantalla gigante",
};

const qreventoDemo: DeviceShot = {
  ...MOBILE,
  src: "/images/proyectos/qrevento-demo-movil.webp",
  alt: "Demo de QREvento en el celular: un invitado entra al álbum en vivo de un casamiento",
  caption: "Vista del invitado",
};

/** Capturas sueltas, para composiciones fuera de las fichas (ej. el hero). */
export const productShots = {
  presupdfDesktop,
  presupdfMobile,
  qreventoDesktop,
  qreventoMobile,
  qreventoLive,
  qreventoDemo,
};

export const products: ProductShowcase[] = [
  {
    slug: "presupdf",
    name: "PresuPDF",
    url: "https://www.presupdf.com.ar",
    category: "Web app + PWA · Presupuestos",
    statusTag: "En producción",
    summary:
      "App de presupuestos en PDF para oficios y pymes. Desde la PC o el celular, con la misma cuenta.",
    benefits: [
      "Presupuestos en PDF con el logo de tu negocio",
      "Clientes, historial y estado de cada presupuesto",
      "Misma cuenta en PC y celular, instalable como app",
    ],
    stack: ["React", "Next.js", "TypeScript", "Firebase", "Vercel"],
    showcase: { desktop: presupdfDesktop, mobile: presupdfMobile },
    gallery: [presupdfDesktop, presupdfMobile],
    seo: {
      title: "Caso PresuPDF: app de presupuestos en PDF",
      description:
        "Cómo construí PresuPDF, la app de presupuestos en PDF para oficios y pymes: web app + PWA con Next.js y Firebase, cobro con Mercado Pago y +500 usuarios.",
      h1: "PresuPDF: app de presupuestos en PDF para oficios y pymes",
    },
    intro:
      "Un producto propio que diseñé, programé y opero: los usuarios arman el presupuesto, generan un PDF con su logo y le hacen seguimiento hasta que el cliente responde.",
    problem:
      "Plomeros, gasistas, electricistas, mecánicos y pymes suelen presupuestar por WhatsApp, en papel o copiando mensajes viejos. Se pierde tiempo, los datos quedan desordenados y el presupuesto no transmite profesionalismo.",
    solution:
      "Una web app que también se instala en el celular como PWA. Empezó como app Android y la llevé a la web para que funcione en cualquier dispositivo, con la misma cuenta en la PC y en el teléfono, sin pasar por una tienda de apps.",
    built: [
      {
        title: "Producto",
        items: [
          "Presupuestos en PDF con logo propio",
          "Clientes e historial de presupuestos",
          "Estados: borrador, enviado, aceptado y rechazado",
          "Misma cuenta en PC y celular (PWA instalable)",
        ],
      },
      {
        title: "Negocio",
        items: ["Cobro con Mercado Pago", "Plan Pro y plan Pro Empresas"],
      },
      {
        title: "Crecimiento",
        items: ["18 guías por oficio pensadas para buscadores", "Landing propia con SEO"],
      },
    ],
    result: {
      metrics: [
        { value: "+500", label: "usuarios registrados" },
        { value: "+1.000", label: "presupuestos en el último mes" },
        { value: "18", label: "guías por oficio para SEO" },
      ],
      text: "PresuPDF está en producción y lo usan oficios y pymes para presupuestar todos los días.",
      note: "Datos de la plataforma a noviembre de 2026.",
    },
    cta: {
      question: "¿Tu negocio necesita un sistema a medida como PresuPDF?",
      pitch:
        "Te ayudo a pasar de planillas y mensajes sueltos a una herramienta propia, con usuarios, cobros y acceso desde el celular.",
      whatsappMessage:
        "Hola DelgadoDev, vi el caso de PresuPDF y quiero hablar de un sistema para mi negocio.",
    },
    schema: {
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, PWA",
    },
  },
  {
    slug: "qrevento",
    name: "QREvento",
    url: "https://www.qrevento.com.ar",
    category: "Web app · Eventos",
    statusTag: "Demo disponible",
    summary:
      "Álbum en vivo con QR para casamientos, 15, 18 y eventos: los invitados suben sus fotos y se ven en la pantalla gigante.",
    benefits: [
      "Los invitados suben fotos sin instalar ninguna app",
      "Feed en vivo y pantalla gigante, con moderación automática",
      "Descarga de todo el álbum en alta resolución",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Firebase"],
    showcase: { desktop: qreventoLive, mobile: qreventoDemo },
    gallery: [qreventoDesktop, qreventoMobile, qreventoLive, qreventoDemo],
    extraLinks: [
      { label: "Probar la demo", href: "https://www.qrevento.com.ar/e/demo" },
      {
        label: "Ver la pantalla gigante",
        href: "https://www.qrevento.com.ar/e/demo/live",
      },
    ],
    seo: {
      title: "Caso QREvento: álbum QR para eventos en vivo",
      description:
        "QREvento, el álbum QR para eventos que desarrollé: los invitados suben fotos sin instalar apps y se ven en pantalla gigante. Next.js 15 y Firebase.",
      h1: "QREvento: álbum QR para eventos con fotos en vivo",
    },
    intro:
      "Un producto propio para fiestas y eventos: cada evento tiene su QR, los invitados suben fotos desde el navegador y todo se junta en un mismo álbum.",
    problem:
      "En un casamiento o un cumple de 15 se sacan cientos de fotos, pero quedan repartidas en los celulares de los invitados. Los grupos de WhatsApp bajan la calidad y casi nunca se termina juntando todo.",
    solution:
      "El invitado escanea el QR de la mesa, entra desde el navegador y sube sus fotos. Aparecen en un feed en vivo y en la pantalla gigante del salón, y al final se descarga el álbum completo en alta resolución.",
    built: [
      {
        title: "Invitados",
        items: [
          "Acceso por QR, sin instalar apps",
          "Subida de fotos desde el navegador",
          "Feed del evento en vivo",
        ],
      },
      {
        title: "Salón",
        items: ["Pantalla gigante en vivo", "Moderación automática de fotos"],
      },
      {
        title: "Anfitriones",
        items: ["Descarga del álbum en alta resolución", "3 planes para elegir"],
      },
    ],
    result: {
      metrics: [
        { value: "3", label: "planes disponibles" },
        { value: "0", label: "apps para instalar" },
      ],
      text: "QREvento está online con una demo pública: podés probar la vista del invitado desde el celular y la pantalla gigante desde la PC.",
    },
    cta: {
      question: "¿Tenés una idea de producto como QREvento?",
      pitch:
        "Te ayudo a convertirla en una web app real: diseño, desarrollo, cobros y lanzamiento.",
      whatsappMessage:
        "Hola DelgadoDev, vi el caso de QREvento y tengo una idea de producto para charlar.",
    },
    schema: {
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
    },
  },
];

export function getProduct(slug: string): ProductShowcase {
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Producto desconocido: ${slug}`);
  }
  return product;
}
