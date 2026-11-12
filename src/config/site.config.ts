export const siteConfig = {
  name: "DelgadoDev",
  title: "DelgadoDev | Desarrollo web y apps a medida en Mendoza",
  description:
    "Desarrollo web en Mendoza: sitios, sistemas a medida y web apps para negocios. DelgadoDev, desarrollo React freelance para toda Argentina.",
  url: "https://www.delgadodev.com.ar",
  locale: "es_AR",
  author: {
    name: "Cristian Delgado",
    email: "delgadocdev@hotmail.com",
    location: "Mendoza, Argentina",
  },
} as const;

export type SiteConfig = typeof siteConfig;
