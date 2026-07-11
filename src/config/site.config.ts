export const siteConfig = {
  name: "DelgadoDev",
  title: "DelgadoDev | Desarrollador Frontend & Mobile en Mendoza, Argentina",
  description:
    "Cristian Delgado, Frontend & Mobile Developer disponible para oportunidades React. Desarrolló aplicaciones Android descargables, sitios web en producción y plataformas con panel administrativo usando React, Next.js, React Native y Firebase.",
  url: "https://www.delgadodev.com.ar",
  locale: "es_AR",
  author: {
    name: "Cristian Delgado",
    email: "delgadocdev@hotmail.com",
    location: "Mendoza, Argentina",
  },
} as const;

export type SiteConfig = typeof siteConfig;
