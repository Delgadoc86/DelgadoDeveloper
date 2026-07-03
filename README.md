# DelgadoDev

Portfolio profesional de **Cristian Delgado** — Frontend & Mobile Developer en Mendoza, Argentina.

🔗 [delgadodev.com.ar](https://www.delgadodev.com.ar)

Construido desde cero con Next.js 16, enfocado en performance, accesibilidad y SEO, para presentar productos digitales reales (apps mobile y web) en vez de una galería genérica de proyectos.

## Stack

| Categoría | Tecnología                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, TypeScript estricto)                                                   |
| Estilos   | [Tailwind CSS v4](https://tailwindcss.com)                                                                           |
| Animación | [Motion](https://motion.dev) (`motion/react`), respeta `prefers-reduced-motion`                                      |
| Íconos    | [lucide-react](https://lucide.dev) + SVGs propios para marcas sin ícono (GitHub, LinkedIn, Instagram, TikTok, React) |
| Analítica | Google Analytics 4, cargado solo si el visitante acepta el aviso de cookies                                          |
| Deploy    | [Vercel](https://vercel.com)                                                                                         |
| Paquetes  | [pnpm](https://pnpm.io)                                                                                              |

Sin CMS, sin base de datos: el contenido (proyectos, stack, bio) vive tipado en `src/features/*/data`, versionado junto con el código.

## Estructura

```
src/
  app/                  # Rutas (App Router): home, /sobre-mi, /proyectos/[slug],
                         # /privacidad, /cookies, sitemap, robots, manifest, iconos, OG image
  components/
    ui/                 # Componentes genéricos sin lógica de negocio (Button, Badge, TechIcon...)
    layout/             # Header, Footer, MobileNav
    motion/             # Wrappers de animación (FadeIn)
    analytics/          # Google Analytics + banner de consentimiento de cookies
  features/             # Piezas con conocimiento de dominio (hero, proyectos, stack, about, contacto)
  config/               # site.config.ts — fuente única de verdad (nombre, url, autor)
  constants/            # Nav y links sociales
  lib/                  # utils (cn) y helpers de SEO/JSON-LD/GA
  types/                # Tipos compartidos
public/
  assets/               # Screenshots de proyectos e íconos de marca
```

## Empezar

```bash
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando             | Qué hace                     |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Servidor de desarrollo       |
| `pnpm build`        | Build de producción          |
| `pnpm start`        | Sirve el build de producción |
| `pnpm lint`         | ESLint                       |
| `pnpm typecheck`    | `tsc --noEmit`               |
| `pnpm format`       | Prettier (escribe)           |
| `pnpm format:check` | Prettier (solo verifica)     |

## Convenciones

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`...), validados por `commitlint` en el hook `commit-msg`.
- **Pre-commit**: Husky + `lint-staged` corren ESLint y Prettier sobre los archivos modificados antes de cada commit.
- **TypeScript**: `strict` + `noUncheckedIndexedAccess`, sin `any`.

## Variables de entorno

| Variable                        | Requerida | Qué hace                                                                                                   |
| ------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No        | ID de Google Analytics 4 (`G-XXXXXXXXXX`). Sin ella, GA simplemente no se carga — el sitio funciona igual. |

Ver [`.env.example`](.env.example). En local va en `.env.local` (ignorado por git); en producción se configura en **Vercel → Project Settings → Environment Variables**.

## Deploy

El proyecto se despliega en Vercel, que detecta Next.js automáticamente por `next.config.ts` y la dependencia `next` — **no requiere `vercel.json`** ni configuración de build manual.

## Estado del proyecto

Sitio completo y funcional: home, `/sobre-mi`, case studies de los 3 proyectos (`PresuFácil`, `Mi Almacén`, `Catálogo Autos`), y páginas legales (`/privacidad`, `/cookies`), con SEO técnico (sitemap, robots, JSON-LD, Open Graph), accesibilidad (navegación por teclado, focus visible, `prefers-reduced-motion`), performance optimizada (imágenes, fuentes self-hosted, sin dependencias innecesarias) y Google Analytics detrás de un banner de consentimiento de cookies (Ley 25.326 / buenas prácticas RGPD).

**Pendiente:**

- Galería de screenshots adicionales por proyecto (más allá de la portada) — marcados como `[PENDIENTE: ...]` en `src/features/projects/data/projects.ts`.

**Futuro (fuera de alcance de esta v1):**

- Blog/artículos técnicos — la arquitectura de `features/` ya lo deja preparado sin romper nada al agregarlo.
- Internacionalización (ES/EN), si se busca alcance internacional.
