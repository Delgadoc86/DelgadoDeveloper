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
}

/** Texto libre. Sugerido: "En producción" | "En desarrollo" | "Pausado". */
export type ProjectStatus = string;

export type ProjectPlatform = "web" | "mobile";

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

  coverImage: ProjectImage;
  gallery?: ProjectImage[];
  links: ProjectLinks;
  /** Ruta a los Términos de descarga y prueba específicos del producto, si aplica. */
  legalTermsUrl?: string;
}
