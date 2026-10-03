export const siteConfig = {
  name: "DelgadoDev",
  title: "DelgadoDev | Desarrollo web y sistemas a medida para negocios",
  description:
    "DelgadoDev desarrolla sitios web, sistemas y productos digitales para negocios que necesitan vender, operar y automatizar mejor.",
  url: "https://www.delgadodev.com.ar",
  locale: "es_AR",
  author: {
    name: "Cristian Delgado",
    email: "delgadocdev@hotmail.com",
    location: "Mendoza, Argentina",
  },
} as const;

export type SiteConfig = typeof siteConfig;
