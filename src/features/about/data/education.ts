export interface MainCredential {
  name: string;
  institution: string;
  status: string;
  period: string;
  description: string;
}

export interface ComplementaryCredential {
  name: string;
  institution: string;
  period: string;
}

export interface SelfTaughtArea {
  title: string;
  items: string[];
  /** Proyectos reales donde se aplicó — omitido cuando no aporta (ver "Calidad, publicación y producto"). */
  evidence?: string[];
}

export const educationIntro =
  "Mi formación combina cursos y certificaciones con aprendizaje autónomo aplicado. Comencé con Desarrollo Web y React, y continué incorporando Next.js, TypeScript, React Native, Expo y Firebase mediante el desarrollo de aplicaciones Android, sitios web en producción y plataformas administrables.";

export const mainCredentials: MainCredential[] = [
  {
    name: "React JS",
    institution: "Coderhouse",
    status: "Finalizado",
    period: "Febrero 2025",
    description:
      "Desarrollo de aplicaciones con React, componentes, estado, hooks, navegación y gestión de datos.",
  },
  {
    name: "Desarrollo Web",
    institution: "Coderhouse",
    status: "Finalizado",
    period: "2024",
    description:
      "HTML, CSS, diseño responsive, estructura semántica, Git y publicación de sitios web.",
  },
  {
    name: "WordPress",
    institution: "Educación IT",
    status: "Certificación aprobada",
    period: "2025",
    description: "Creación y configuración de sitios administrables con WordPress.",
  },
];

export const complementaryCredentials: ComplementaryCredential[] = [
  {
    name: "Introducción al mundo web",
    institution: "Educación IT",
    period: "Marzo 2024",
  },
  {
    name: "Introducción al desarrollo web: HTML y CSS",
    institution: "Google",
    period: "2023/2024",
  },
];

export const selfTaughtIntro =
  "Además de mi formación formal, continúo aprendiendo de manera autónoma mediante el desarrollo de productos reales. Incorporo nuevas tecnologías cuando el proyecto lo requiere, las aplico, pruebo y documento dentro de soluciones funcionales.";

export const selfTaughtAreas: SelfTaughtArea[] = [
  {
    title: "Desarrollo móvil",
    items: [
      "React Native",
      "Expo",
      "EAS Build",
      "Generación y distribución de APK",
      "Navegación y experiencia mobile",
    ],
    evidence: ["PresúFácil", "Mi Almacén"],
  },
  {
    title: "Frontend moderno",
    items: [
      "Next.js",
      "TypeScript",
      "Arquitectura por componentes",
      "Server Components cuando corresponde",
      "Metadatos y renderizado del lado del servidor",
    ],
    evidence: ["Portfolio DelgadoDev", "Aplicaciones y casos de estudio actuales"],
  },
  {
    title: "Firebase",
    items: [
      "Authentication",
      "Firestore",
      "Storage",
      "Reglas de seguridad",
      "Suscripciones en tiempo real",
      "Modelado de datos",
      "Paneles administrativos",
    ],
    evidence: ["PresúFácil", "Mi Almacén", "Catálogo Autos", "Date un Gusto"],
  },
  {
    title: "Calidad, publicación y producto",
    items: [
      "Git y GitHub",
      "Vercel",
      "Responsive design",
      "Accesibilidad básica",
      "SEO técnico",
      "Open Graph",
      "JSON-LD",
      "Google Analytics",
      "Generación de PDF",
      "Validación con usuarios",
      "Mantenimiento y evolución de productos",
    ],
  },
];
