import type { Project } from "@/types/project";

/**
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
      "Una experiencia mobile-first para descubrir, comparar y pedir productos Avon y Natura.",
    description:
      "Catálogo web personalizado para DecideSer: 266 productos, diseño mobile-first, administración propia y pedido por WhatsApp. Desarrollado con Next.js y Firebase.",
    problem:
      "Cientos de productos, pero la experiencia se sentía una base de datos, no un catálogo profesional.",
    targetUser:
      "Personas que buscan productos Avon y Natura de forma rápida desde el celular, y el equipo de DecideSer, que necesita mantener el catálogo actualizado sin depender de un desarrollador para cada cambio.",
    solution:
      "Plataforma de catálogo digital construida con Next.js y Firebase: home con descubrimiento por categorías y marcas, catálogo con filtros y orden, ficha de producto, pedido por WhatsApp y un panel de administración propio para cargar y mantener los 266 productos.",
    role: "Desarrollo completo de la plataforma: arquitectura Next.js, modelo de datos en Firestore, catálogo dinámico, panel de administración con autenticación, SEO técnico, performance y preparación de la infraestructura de analítica.",
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
      demoLabel: "Ver proyecto en vivo",
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
          "Server Components, poco JS de cliente, next/image y Firestore optimizado.",
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
    slug: "presupdf",
    name: "PresuPDF",
    previousName: "PresuFácil",
    analyticsId: "presufacil",
    category: "App mobile · Presupuestos",
    platform: "mobile",
    tagline: "Presupuestos profesionales listos para enviar.",
    description:
      "PresuPDF, antes PresuFácil, es una app mobile para crear, guardar y compartir presupuestos profesionales en minutos, pensada para oficios y trabajadores independientes.",
    problem:
      "Muchos trabajadores independientes y oficios —plomeros, gasistas, electricistas, albañiles, mecánicos, jardineros, diseñadores y otros— hacen presupuestos de forma improvisada: por WhatsApp, en notas, en papel o copiando mensajes anteriores. Eso genera pérdida de tiempo, poca prolijidad, errores en los datos, presupuestos difíciles de reencontrar y una imagen menos profesional frente al cliente.",
    targetUser:
      "Trabajadores independientes, oficios y pequeños prestadores de servicios en Argentina que necesitan armar presupuestos rápido desde el celular, sin depender de una computadora ni de herramientas complejas.",
    solution:
      "Aplicación mobile para crear, guardar y compartir presupuestos profesionales desde el celular. Permite cargar los datos del negocio, armar ítems, generar PDF, compartir por WhatsApp y mantener un historial de presupuestos. Está pensada para que una persona no técnica pueda usarla con pocos pasos.",
    role: "Diseño y desarrollo del producto completo: arquitectura, navegación, autenticación, integración con Firebase, modelo de datos, generación de PDF, flujo de presupuesto, historial, onboarding, lógica de planes demo/pro y experiencia mobile.",
    stack: [
      "React Native",
      "Expo",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "React Navigation",
      "React Native Paper",
      "expo-print",
      "expo-sharing",
      "EAS Build",
    ],
    features: [
      "Registro e inicio de sesión",
      "Verificación de email",
      "Onboarding con datos del negocio",
      "Creación de presupuestos",
      "Ítems personalizados",
      "Generación de PDF",
      "Compartir presupuesto por WhatsApp",
      "Historial de presupuestos",
      "Búsqueda y filtros",
      "Estados del presupuesto",
      "Datos comerciales editables",
      "Panel administrativo base para control de usuarios y planes",
      "Lógica de plan demo y plan pro",
    ],
    uxDecisions:
      "Flujo simple y guiado para usuarios no técnicos, con prioridad mobile-first, botones claros y textos directos. Pocas opciones visibles por pantalla para reducir confusión. Historial accesible para reutilizar o consultar presupuestos. El PDF es la salida final porque el usuario objetivo ya entiende y comparte documentos por WhatsApp. Se evita lenguaje técnico como “tester”, “SaaS” o “dashboard” en la experiencia principal.",
    status:
      "MVP funcional en APK de prueba. La app ya permite registrarse, configurar datos del negocio, crear presupuestos, generar PDF y compartirlos. En etapa de validación con usuarios reales antes de publicarla en Google Play.",
    statusTag: "Validación",
    results:
      "El mayor aprendizaje fue que el producto no debía sentirse como una herramienta técnica, sino como una ayuda práctica para alguien que necesita presupuestar rápido. También quedó claro que la instalación fuera de Google Play genera fricción, por eso la publicación formal en Play Store es un paso importante. La validación inicial mostró interés, pero también la necesidad de simplificar cada flujo al máximo.",
    pendingWork:
      "Mejorar capturas y presentación visual del producto. Pulir detalles de PDF con muchos ítems. Terminar Google Sign-In. Consolidar panel admin. Mejorar gestión de planes demo/pro. Preparar publicación en Google Play. Conseguir más feedback de usuarios reales.",
    screenshotsNeeded: [
      "[PENDIENTE: agregar screenshot real — vista de ítems]",
      "[PENDIENTE: agregar screenshot real — datos del negocio]",
      "[PENDIENTE: agregar screenshot real — pantalla de plan demo/pro, si está disponible]",
    ],
    coverImage: {
      src: "/assets/projects/presu/home.webp",
      alt: "Home principal de PresuPDF con accesos rápidos y resumen del mes",
    },
    gallery: [
      {
        src: "/assets/projects/presu/login.webp",
        alt: "Pantalla de inicio de sesión de PresuPDF",
        caption: "Iniciá sesión",
      },
      {
        src: "/assets/projects/presu/crear.webp",
        alt: "Creación de un nuevo presupuesto en PresuPDF",
        caption: "Armá el presupuesto",
      },
      {
        src: "/assets/projects/presu/historial.webp",
        alt: "Historial de presupuestos enviados en PresuPDF",
        caption: "Seguí el historial",
      },
      {
        src: "/assets/projects/presu/pdf.webp",
        alt: "PDF de presupuesto generado por PresuPDF",
        caption: "Compartilo en PDF",
      },
    ],
    links: {
      download: "/descargar/presupdf",
      repo: "https://github.com/Delgadoc86/presupuestoapp",
    },
    legalTermsUrl: "/legal/presufacil/terminos-descarga",
  },
  {
    slug: "mi-almacen",
    name: "Mi Almacén",
    category: "App mobile · Comercios",
    platform: "mobile",
    tagline: "Gestión simple para el comercio de barrio.",
    description:
      "App mobile para gestionar productos, precios, fiados y caja diaria en comercios de barrio, pensada para reemplazar el cuaderno.",
    problem:
      "Muchos almacenes, verdulerías y pequeños comercios de barrio siguen manejando precios, fiados, pagos y caja en cuadernos, papeles o de memoria. Eso genera desorden, pérdida de información, errores al cobrar, dificultad para saber quién debe, cuánto entró en el día y qué productos conviene actualizar.",
    targetUser:
      "Dueños de pequeños comercios de barrio en Argentina, especialmente personas de 40 a 70 años que usan el celular a diario pero no quieren sistemas complejos, computadoras ni procesos largos.",
    solution:
      "Aplicación mobile simple para gestionar productos, precios, fiados y caja diaria desde el celular. Está pensada para reemplazar el cuaderno sin imponer una herramienta difícil de usar.",
    role: "Diseño y desarrollo del producto completo: arquitectura mobile, navegación, modelos de datos, autenticación, productos, categorías, fiados, movimientos, generación de PDF, configuración del comercio y diseño de flujos simples para usuarios no técnicos.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase Auth",
      "Firestore",
      "AsyncStorage",
      "expo-print",
      "expo-sharing",
      "expo-file-system",
      "EAS Build",
    ],
    features: [
      "Registro e inicio de sesión",
      "Configuración del comercio",
      "Gestión de productos",
      "Categorías",
      "Margen de ganancia",
      "Redondeo de precios",
      "Lista de precios",
      "Gestión de clientes fiados",
      "Registro de fiado y pagos",
      "Historial de movimientos",
      "Generación de PDF de lista de precios",
      "Preferencias del negocio",
      "Caja diaria",
      "Registro de último inicio de sesión",
    ],
    uxDecisions:
      "Interfaz mobile-first, con textos simples y directos, botones grandes y flujos cortos. Se evitan términos técnicos y se prioriza la rapidez sobre la cantidad de opciones. Pensada para personas mayores o con poca experiencia tecnológica, con un diseño orientado a reemplazar el cuaderno, no a competir con sistemas empresariales complejos. Por esa misma razón no se sumó un sistema de multiusuario u operadores: en su lugar se registra el último inicio de sesión, priorizando que el comercio adopte la app sin fricción por sobre agregar complejidad.",
    status:
      "Aplicación funcional con APK disponible para descargar e instalar. Ya cuenta con módulos de productos, categorías, fiados, movimientos, caja diaria, configuración y generación de PDF.",
    statusTag: "APK disponible",
    results:
      "La validación con pequeños comercios mostró que muchos usuarios prefieren seguir usando cuaderno porque lo sienten más confiable. Eso confirmó que la app debe sentirse simple, segura y muy fácil de entender. También surgió la necesidad de trazabilidad cuando hay más de una persona atendiendo, que se resolvió con el registro de último inicio de sesión en vez de sumar un sistema completo de multiusuario, priorizando siempre lo más simple para que el comercio asimile la app y su uso.",
    pendingWork: "Conseguir más feedback de comerciantes reales.",
    screenshotsNeeded: [
      "[PENDIENTE: agregar screenshot real — alta o edición de producto]",
      "[PENDIENTE: agregar screenshot real — categorías]",
      "[PENDIENTE: agregar screenshot real — detalle de cliente fiado]",
      "[PENDIENTE: agregar screenshot real — registro de fiado]",
      "[PENDIENTE: agregar screenshot real — registro de pago]",
      "[PENDIENTE: agregar screenshot real — historial de movimientos]",
      "[PENDIENTE: agregar screenshot real — configuración del comercio]",
    ],
    coverImage: {
      src: "/assets/projects/almacen/home.webp",
      alt: "Home principal de Mi Almacén con caja, fiados e inventario",
    },
    gallery: [
      {
        src: "/assets/projects/almacen/login.webp",
        alt: "Pantalla de inicio de sesión de Mi Almacén",
        caption: "Iniciá sesión",
      },
      {
        src: "/assets/projects/almacen/productos.webp",
        alt: "Lista de productos con precios y márgenes en Mi Almacén",
        caption: "Gestioná tus productos",
      },
      {
        src: "/assets/projects/almacen/fiado.webp",
        alt: "Lista de clientes fiados en Mi Almacén",
        caption: "Controlá los fiados",
      },
      {
        src: "/assets/projects/almacen/caja.webp",
        alt: "Pantalla de caja diaria de Mi Almacén",
        caption: "Cerrá la caja",
      },
      {
        src: "/assets/projects/almacen/pdf.webp",
        alt: "PDF de lista de precios generado por Mi Almacén",
        caption: "Compartí la lista de precios",
      },
    ],
    links: {
      download: "/descargar/mi-almacen",
      repo: "https://github.com/Delgadoc86/Mi-Almacen",
    },
    legalTermsUrl: "/legal/mi-almacen/terminos-descarga",
  },
  {
    slug: "catalogo-autos",
    name: "Catálogo Autos",
    category: "Web app · Agencias en Mendoza",
    platform: "web",
    tagline: "El catálogo propio que complementa Marketplace y WhatsApp.",
    description:
      "Aplicación web para que agencias de autos en Mendoza administren y publiquen su propio catálogo de vehículos, como complemento profesional a Marketplace, WhatsApp e Instagram.",
    problem:
      "Muchas agencias de autos pequeñas y medianas dependen principalmente de Marketplace, WhatsApp e Instagram para mostrar sus vehículos. Eso dificulta mantener un catálogo ordenado, compartir información completa de cada unidad y ofrecer una imagen más profesional a los potenciales compradores.",
    targetUser:
      "Agencias de autos pequeñas y medianas que desean mostrar su stock de forma profesional sin reemplazar sus canales habituales de venta.",
    solution:
      "Aplicación web que permite administrar y publicar un catálogo propio de vehículos con fotografías, información técnica, filtros de búsqueda y contacto directo por WhatsApp. El objetivo no es reemplazar Marketplace o Instagram, sino complementarlos con un sitio propio donde el cliente encuentre toda la información organizada.",
    role: "Diseño y desarrollo del producto completo: investigación inicial, definición del MVP, arquitectura frontend, modelo de datos en Firebase, panel de administración, carga de vehículos, filtros de búsqueda, optimización responsive y despliegue en Vercel. También realicé visitas comerciales a agencias para validar la propuesta y obtener feedback directo.",
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
      repo: "https://github.com/Delgadoc86/AgenciaAutos",
    },
  },
];
