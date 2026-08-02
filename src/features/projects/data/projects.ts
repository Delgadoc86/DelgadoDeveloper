import type { Project } from "@/types/project";

/**
 * Contenido editable de cada proyecto. Los campos marcados con
 * "[PENDIENTE: ...]" están a la espera de contenido real y no deben
 * publicarse tal cual — completalos antes de lanzar a producción.
 */
export const projects: Project[] = [
  {
    slug: "presufacil",
    name: "PresuFácil",
    category: "App mobile · Presupuestos",
    platform: "mobile",
    tagline: "Presupuestos profesionales, sin fricción, desde el celular.",
    description:
      "App mobile para crear, guardar y compartir presupuestos profesionales en minutos, pensada para oficios y trabajadores independientes.",
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
      alt: "Home principal de PresuFácil con accesos rápidos y resumen del mes",
    },
    gallery: [
      {
        src: "/assets/projects/presu/login.webp",
        alt: "Pantalla de inicio de sesión de PresuFácil",
        caption: "Iniciá sesión",
      },
      {
        src: "/assets/projects/presu/crear.webp",
        alt: "Creación de un nuevo presupuesto en PresuFácil",
        caption: "Armá el presupuesto",
      },
      {
        src: "/assets/projects/presu/historial.webp",
        alt: "Historial de presupuestos enviados en PresuFácil",
        caption: "Seguí el historial",
      },
      {
        src: "/assets/projects/presu/pdf.webp",
        alt: "PDF de presupuesto generado por PresuFácil",
        caption: "Compartilo en PDF",
      },
    ],
    links: {
      download: "/descargar/presufacil",
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
