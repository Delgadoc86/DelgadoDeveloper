export const siteConfig = {
  name: "DelgadoDev",
  title: "DelgadoDev | Desarrollador Frontend & Mobile en Mendoza, Argentina",
  description:
    "Cristian Delgado, desarrollador Frontend & Mobile en Mendoza, Argentina. Aplicaciones web con React y Next.js, y apps mobile con React Native, para resolver problemas reales de oficios, comercios y pequeños negocios.",
  url: "https://www.delgadodev.com.ar",
  locale: "es_AR",
  author: {
    name: "Cristian Delgado",
    email: "delgadocdev@hotmail.com",
    location: "Mendoza, Argentina",
  },
} as const;

export type SiteConfig = typeof siteConfig;
