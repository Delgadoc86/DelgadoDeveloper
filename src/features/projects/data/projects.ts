import type { Project } from "@/types/project";

/**
 * Trabajos para clientes y demos. PresuPDF y QREvento no están acá: son
 * productos propios y viven en `features/products/data/products.ts`, con
 * su propia página de caso.
 *
 * Contenido editable de cada proyecto. Los campos marcados con
 * "[PENDIENTE: ...]" están a la espera de contenido real y no deben
 * publicarse tal cual — completalos antes de lanzar a producción.
 */
export const projects: Project[] = [
  {
    slug: "decideser",
    name: "DecideSer",
    analyticsId: "decideser",
    category: "Catálogo web personalizado · Cosmética",
    platform: "mobile",
    tagline:
      "Catálogo mobile-first con 266 productos reales: encontrá, elegí y pedí por WhatsApp en segundos.",
    description:
      "Catálogo web personalizado para DecideSer: 266 productos reales, diseño mobile-first, administración propia y pedido directo por WhatsApp.",
    problem:
      "Cientos de productos, pero la experiencia se sentía una base de datos, no un catálogo profesional.",
    targetUser:
      "Personas que buscan productos Avon y Natura de forma rápida desde el celular, y el equipo de DecideSer, que necesita mantener el catálogo actualizado sin depender de un desarrollador para cada cambio.",
    solution:
      "Plataforma de catálogo digital a medida: home con descubrimiento por categorías y marcas, catálogo con filtros y orden, ficha de producto, pedido por WhatsApp y un panel de administración propio para cargar y mantener los 266 productos.",
    role: "Desarrollo completo de la plataforma: diseño, base de datos, catálogo dinámico, panel de administración con autenticación, SEO técnico, performance y preparación de la infraestructura de analítica.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Vercel",
      "Google Analytics 4 (integración preparada)",
    ],
    sellingPoints: [
      "266 productos reales, listos para comprar",
      "El cliente pide directo por WhatsApp",
      "Vos actualizás precios y stock, sin depender de un programador",
    ],
    features: [
      "Catálogo dinámico",
      "Categorías dinámicas",
      "Marcas dinámicas",
      "Búsqueda",
      "Filtros",
      "Ordenamiento",
      "Disponibilidad",
      "Ficha de producto",
      "Mi Pedido persistente",
      "Pedido por WhatsApp",
      "Admin V2 protegido con autenticación",
      "CRUD completo de productos (precio, stock, imagen, marca, categoría, promo, estado)",
      "SEO dinámico con datos estructurados y sitemap",
      "Consentimiento de cookies y política de privacidad",
      "Panel de analítica (BI) propio con métricas de comportamiento",
    ],
    uxDecisions:
      "Mobile-first (375-430px), fotos 1080×1080 como lenguaje visual propio y pedido por WhatsApp, el canal que el usuario ya usa.",
    status:
      "En producción en www.decideser.com.ar, con 266 productos reales y admin propio en uso diario.",
    statusTag: "En producción",
    results:
      "Resultados técnicos verificados: catálogo real, performance y SEO medidos con PageSpeed Insights, y un panel de analítica propio que ya registra visitas y clics a WhatsApp. Todavía sin volumen suficiente para sacar conclusiones de negocio.",
    pendingWork: "Integrar Google Analytics 4.",
    screenshotsNeeded: [],
    links: {
      demo: "https://www.decideser.com.ar",
      demoLabel: "Ver trabajo en vivo",
    },
    coverImage: {
      src: "/assets/projects/decideser/home.webp",
      alt: "Home de DecideSer con hero de marcas Avon y Natura y accesos a categorías",
    },
    gallery: [
      {
        src: "/assets/projects/decideser/categorias.webp",
        alt: "Sección de categorías en la home de DecideSer: cremas, desodorantes y esmaltes",
        caption: "Categorías",
      },
      {
        src: "/assets/projects/decideser/marcas.webp",
        alt: "Sección 'Explorá por marca' con Avon y Natura en la home de DecideSer",
        caption: "Marcas",
      },
      {
        src: "/assets/projects/decideser/catalogo.webp",
        alt: "Catálogo de DecideSer en dos columnas con precio y marca de cada producto",
        caption: "Catálogo",
      },
      {
        src: "/assets/projects/decideser/filtros.webp",
        alt: "Panel de filtros mobile de DecideSer: disponibilidad, marca, categoría y promociones",
        caption: "Filtros",
      },
      {
        src: "/assets/projects/decideser/producto.webp",
        alt: "Ficha de producto de DecideSer con imagen, marca, precio y botón de agregar",
        caption: "Producto",
      },
      {
        src: "/assets/projects/decideser/pedido.webp",
        alt: "Mi Pedido en DecideSer con productos, cantidades, total estimado y envío por WhatsApp",
        caption: "Mi Pedido",
      },
      {
        src: "/assets/projects/decideser/admin.webp",
        alt: "Panel de administración de DecideSer con listado y búsqueda de productos",
        caption: "Admin",
      },
      {
        src: "/assets/projects/decideser/analytics.webp",
        alt: "Panel de analítica propio de DecideSer con métricas de visitas y clics a WhatsApp",
        caption: "Analytics",
      },
    ],
    caseStudy: {
      metrics: [
        { value: "266", label: "productos reales" },
        { value: "2", label: "marcas principales" },
        { value: "98", label: "Performance mobile (PageSpeed)" },
        { value: "100", label: "SEO (PageSpeed)" },
        { value: "100", label: "Prácticas recomendadas (PageSpeed)" },
        { value: "96", label: "Accesibilidad (PageSpeed)" },
      ],
      metricsNote:
        "Medido con PageSpeed Insights (mobile). No es un valor fijo ni una certificación.",
      challengeDetail:
        "Cada producto se administra con una sola foto cuadrada 1080×1080 en fondo blanco. El desafío: que esa simplicidad se viera profesional, no genérica.",
      positioning: "De un catálogo tradicional a una experiencia de compra mobile-first.",
      solutionBlocks: [
        {
          number: "01",
          title: "Mobile first",
          description:
            "Pantallas de 375 a 430px, dos columnas de producto y navegación con el pulgar.",
        },
        {
          number: "02",
          title: "Product-first",
          description:
            "Fotos 1080×1080 en blanco como lenguaje visual propio, sin banners ni fotografía editorial.",
        },
        {
          number: "03",
          title: "Descubrimiento",
          description:
            "Categorías, marcas, búsqueda, filtros y orden entre 266 productos.",
        },
        {
          number: "04",
          title: "Conversión",
          description: "Ficha de producto, Mi Pedido y cierre por WhatsApp.",
        },
        {
          number: "05",
          title: "Administración",
          description:
            "Admin V2 con CRUD completo: precio, stock, imagen, marca, promo, estado.",
        },
        {
          number: "06",
          title: "Medición",
          description:
            "Panel de BI propio con visitas y clics a WhatsApp. GA4, en preparación.",
        },
      ],
      featureGroups: [
        {
          title: "Catálogo",
          items: [
            "Catálogo dinámico",
            "Categorías dinámicas",
            "Marcas dinámicas",
            "Búsqueda",
            "Filtros",
            "Ordenamiento",
            "Disponibilidad",
          ],
        },
        {
          title: "Conversión",
          items: ["Ficha de producto", "Mi Pedido persistente", "Pedido por WhatsApp"],
        },
        {
          title: "Administración",
          items: [
            "Admin V2 protegido",
            "Autenticación con permiso de administrador",
            "Subida de imágenes",
            "CRUD completo de productos",
          ],
        },
        {
          title: "SEO",
          items: [
            "Renderizado en servidor",
            "Metadata dinámica",
            "Canonical",
            "Datos estructurados de producto",
            "Datos estructurados de breadcrumb",
            "Sitemap dinámico",
            "Páginas de categorías y marcas",
          ],
        },
        {
          title: "Legal y privacidad",
          items: [
            "Consentimiento de cookies",
            "Política de privacidad",
            "Derechos del consumidor",
          ],
        },
        {
          title: "Analítica",
          items: [
            "Panel de BI propio: visitas, productos vistos y clics a WhatsApp",
            "Integración con Google Analytics 4, en preparación",
          ],
        },
      ],
      performance: {
        note: "Diseño visual sin sacrificar rendimiento.",
        scores: [
          { value: "98", label: "Performance" },
          { value: "96", label: "Accessibility" },
          { value: "100", label: "Best Practices" },
          { value: "100", label: "SEO" },
        ],
        detail:
          "Optimizado para cargar rápido en el celular, incluso con cientos de productos.",
        screenshot: {
          src: "/assets/projects/decideser/pagespeed.webp",
          alt: "Reporte de PageSpeed Insights de DecideSer: 98 Performance, 96 Accesibilidad, 100 Prácticas recomendadas, 100 SEO",
        },
        source:
          "Medición mobile, PageSpeed Insights. Puede variar con cambios futuros del sitio.",
      },
      closingCta: {
        question:
          "¿Tu catálogo todavía depende de PDFs, estados de WhatsApp o publicaciones sueltas?",
        pitch:
          "Puedo convertirlo en un catálogo web personalizado, como hice con DecideSer.",
      },
      cardCtaLabel: "Ver caso de éxito",
    },
  },
  {
    slug: "catalogo-autos",
    name: "Catálogo Autos",
    category: "Web app · Agencias en Mendoza",
    platform: "web",
    tagline:
      "El catálogo propio que hace lucir profesional tu stock de autos, sin dejar de usar Marketplace y WhatsApp.",
    description:
      "Aplicación web para que agencias de autos en Mendoza administren y publiquen su propio catálogo de vehículos, como complemento profesional a Marketplace, WhatsApp e Instagram.",
    problem:
      "Muchas agencias de autos pequeñas y medianas dependen principalmente de Marketplace, WhatsApp e Instagram para mostrar sus vehículos. Eso dificulta mantener un catálogo ordenado, compartir información completa de cada unidad y ofrecer una imagen más profesional a los potenciales compradores.",
    targetUser:
      "Agencias de autos pequeñas y medianas que desean mostrar su stock de forma profesional sin reemplazar sus canales habituales de venta.",
    solution:
      "Aplicación web que permite administrar y publicar un catálogo propio de vehículos con fotografías, información técnica, filtros de búsqueda y contacto directo por WhatsApp. El objetivo no es reemplazar Marketplace o Instagram, sino complementarlos con un sitio propio donde el cliente encuentre toda la información organizada.",
    role: "Diseño y desarrollo del producto completo: investigación inicial, definición del MVP, diseño, base de datos, panel de administración, carga de vehículos, filtros de búsqueda, adaptación a celulares y publicación. También realicé visitas comerciales a agencias para validar la propuesta y obtener feedback directo.",
    stack: [
      "React",
      "Vite",
      "React Router",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Material UI",
      "Vercel",
      "Google Analytics",
    ],
    sellingPoints: [
      "Cada auto con fotos y datos completos",
      "Contacto directo por WhatsApp",
      "Suma a Marketplace, no lo reemplaza",
    ],
    features: [
      "Catálogo de vehículos",
      "Panel de administración",
      "Alta, edición y eliminación de vehículos",
      "Gestión de fotografías",
      "Vehículos destacados",
      "Filtros por marca, modelo y características",
      "Ficha completa de cada vehículo",
      "Contacto directo mediante WhatsApp",
      "Diseño responsive",
    ],
    uxDecisions:
      "Navegación muy simple, con fotografías grandes como elemento principal e información organizada por bloques. Búsqueda rápida y optimización para dispositivos móviles. Prioridad a generar consultas antes que recorrer muchas pantallas, evitando procesos innecesarios para el administrador.",
    status:
      "MVP funcional utilizado como demostración comercial. El proyecto fue presentado personalmente a distintas agencias para validar interés, recopilar objeciones y entender el proceso de venta real antes de continuar su evolución.",
    statusTag: "Demo",
    results:
      "Las visitas a agencias mostraron que muchas ya utilizan WhatsApp como principal canal de ventas y valoran contar con un catálogo propio como complemento. También quedó claro que el precio y la facilidad de mantenimiento son factores decisivos para la adopción del producto. Esta validación permitió comprender mejor las necesidades reales del sector y ajustar la propuesta de valor.",
    pendingWork:
      "Conseguir un primer cliente activo. Incorporar nuevas funcionalidades según feedback de agencias. Preparar capturas finales. Evaluar nuevas integraciones según necesidades comerciales.",
    screenshotsNeeded: [
      "[PENDIENTE: agregar screenshot real — home]",
      "[PENDIENTE: agregar screenshot real — catálogo de vehículos]",
      "[PENDIENTE: agregar screenshot real — página de detalle]",
      "[PENDIENTE: agregar screenshot real — buscador y filtros]",
      "[PENDIENTE: agregar screenshot real — panel administrativo]",
      "[PENDIENTE: agregar screenshot real — formulario de alta o edición de vehículo]",
    ],
    coverImage: {
      src: "/assets/projects/webautos.webp",
      alt: "Vista previa del catálogo web de autos",
    },
    links: {
      demo: "https://autosmendoza.vercel.app",
    },
  },
];
