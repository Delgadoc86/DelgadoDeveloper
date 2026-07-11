export interface OtherProject {
  name: string;
  category: string;
  status: string;
  stack: string[];
  url: string;
  responsibility: string;
}

/**
 * Trabajos reales para clientes, operativos hoy, pero sin el nivel de
 * detalle de un caso de estudio (repos privados, sin capturas ni proceso
 * documentado). Se muestran aparte de `projects.ts` para no diluir a los
 * tres proyectos principales.
 */
export const otherProjects: OtherProject[] = [
  {
    name: "Date un Gusto",
    category: "Sitio web · Gastronomía",
    status: "En producción",
    stack: ["React", "Vite", "Firebase"],
    url: "https://dateungusto.vercel.app",
    responsibility:
      "Diseño, desarrollo y mantenimiento continuo, con panel propio para cargar menú y promos.",
  },
  {
    name: "Silverio Foodtruck",
    category: "Sitio web · Gastronomía",
    status: "En producción",
    stack: ["React", "Vite", "Firebase"],
    url: "https://silverio-food-truck.vercel.app",
    responsibility:
      "Diseño, desarrollo y mantenimiento continuo, con panel propio para cargar menú y promos.",
  },
];
