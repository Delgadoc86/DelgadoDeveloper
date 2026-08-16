export interface ProjectImage {
  src: string;
  alt: string;
  /** Texto corto para mostrar debajo de la miniatura en la galería (ej. "Iniciá sesión"). */
  caption?: string;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  /** Enlace directo de descarga (ej. instalador APK alojado en Google Drive). */
  download?: string;
  /** Texto del botón de `demo`. Default: "Ver demo". */
  demoLabel?: string;
}

/** Texto libre. Sugerido: "En producción" | "En desarrollo" | "Pausado". */
export type ProjectStatus = string;

export type ProjectPlatform = "web" | "mobile";

/** Un número grande + su etiqueta (ej. "266" / "productos reales"). */
export interface ProjectMetric {
  value: string;
  label: string;
}

/** Bloque numerado de una decisión de solución (ej. "01 — Mobile first"). */
export interface ProjectSolutionBlock {
  number: string;
  title: string;
  description: string;
  items?: string[];
}

/** Funcionalidades agrupadas por área, para mostrar visualmente en vez de una lista plana. */
export interface ProjectFeatureGroup {
  title: string;
  items: string[];
}

export interface ProjectPerformance {
  /** Copy conceptual, ej. "Diseño visual sin sacrificar rendimiento." */
  note: string;
  /** Scores reales (ej. Performance 99, Accessibility 96, Best Practices 100, SEO 100). */
  scores: ProjectMetric[];
  /** Cómo se lograron esos scores, sin exagerar. */
  detail?: string;
  /** Captura real de la herramienta de medición (ej. PageSpeed Insights). */
  screenshot?: ProjectImage;
  /** Fuente/fecha de la medición, para no dar a entender que el resultado es permanente. */
  source?: string;
}

export interface ProjectBeforeAfter {
  before: ProjectImage;
  after: ProjectImage;
  note?: string;
}

/**
 * Contenido extra para proyectos presentados como caso de estudio/éxito.
 * Cuando está definido, la ficha usa una secuencia narrativa propia
 * (hero → métricas → problema → solución → capturas → performance → cierre)
 * en lugar del layout genérico de proyecto.
 */
export interface ProjectCaseStudy {
  /** Métricas de resultado reales, mostradas como composición visual de números grandes. */
  metrics: ProjectMetric[];
  metricsNote?: string;
  /** Restricción u obstáculo concreto del proyecto, además de `problem`. */
  challengeDetail?: string;
  /** Frase puente que resume la decisión tomada, entre el problema y la solución. */
  positioning?: string;
  solutionBlocks: ProjectSolutionBlock[];
  featureGroups?: ProjectFeatureGroup[];
  performance?: ProjectPerformance;
  beforeAfter?: ProjectBeforeAfter;
  closingCta?: {
    question: string;
    pitch: string;
  };
  /** Texto del CTA en la card de portfolio (ej. "Ver caso de éxito"). Default: el genérico según `links`. */
  cardCtaLabel?: string;
}

export interface Project {
  /** 1. Nombre del proyecto */
  slug: string;
  name: string;
  category: string;
  /** Determina el frame visual usado en la card y el case study (navegador vs. teléfono). */
  platform: ProjectPlatform;
  /** 2. Descripción corta */
  tagline: string;
  description: string;
  /** 3. Problema que resuelve */
  problem: string;
  /** 4. Usuario objetivo */
  targetUser: string;
  /** 5. Solución desarrollada */
  solution: string;
  /** 6. Mi rol */
  role: string;
  /** 7. Stack real usado */
  stack: string[];
  /** 8. Funcionalidades principales */
  features: string[];
  /** 9. Decisiones de UX */
  uxDecisions: string;
  /** 10. Estado actual */
  status: ProjectStatus;
  /** Etiqueta corta del estado (ej. "MVP", "Validación", "Demo"), resumen de `status`. */
  statusTag: string;
  /** 11. Resultados o aprendizajes */
  results: string;
  /** 12. Qué falta completar */
  pendingWork: string;
  /** 13. Screenshots necesarios (checklist de contenido, no assets ya cargados) */
  screenshotsNeeded: string[];

  /** Opcional porque puede no haber una captura real cargada todavía (ver `screenshotsNeeded`); nunca se inventa un mockup en su lugar. */
  coverImage?: ProjectImage;
  gallery?: ProjectImage[];
  links: ProjectLinks;
  /** Ruta a los Términos de descarga y prueba específicos del producto, si aplica. */
  legalTermsUrl?: string;
  /** Nombre anterior de la marca, mostrado discretamente junto al H1 durante la transición (ej. "PresuFácil"). */
  previousName?: string;
  /**
   * Identificador estable para analytics y para el documento de Firestore
   * detrás de `/descargar/[slug]`, independiente del `slug` público. Evita
   * perder continuidad de datos históricos cuando el slug visible cambia
   * por un rebranding. Si no se define, se usa `slug`.
   */
  analyticsId?: string;
  /** Cuando está presente, la ficha se muestra como caso de estudio/éxito. */
  caseStudy?: ProjectCaseStudy;
}
