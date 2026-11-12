# DelgadoDev

Portfolio profesional de **Cristian Delgado** — Frontend & Mobile Developer en Mendoza, Argentina.

🔗 [delgadodev.com.ar](https://www.delgadodev.com.ar)

Construido desde cero con Next.js 16, enfocado en performance, accesibilidad y SEO, para presentar productos digitales reales (apps mobile y web) en vez de una galería genérica de proyectos.

## Stack

| Categoría     | Tecnología                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router, TypeScript estricto)                                                   |
| Estilos       | [Tailwind CSS v4](https://tailwindcss.com)                                                                           |
| Animación     | [Motion](https://motion.dev) (`motion/react`), respeta `prefers-reduced-motion`                                      |
| Íconos        | [lucide-react](https://lucide.dev) + SVGs propios para marcas sin ícono (GitHub, LinkedIn, Instagram, TikTok, React) |
| Analítica     | Google Analytics 4, cargado solo si el visitante acepta el aviso de cookies                                          |
| Deploy        | [Vercel](https://vercel.com)                                                                                         |
| Paquetes      | [pnpm](https://pnpm.io)                                                                                              |
| Panel privado | Firebase (Auth + Firestore, proyecto separado) — ver [`PANEL_ADMIN.md`](PANEL_ADMIN.md)                              |

El sitio público (`(marketing)`) sigue sin CMS: el contenido (proyectos, stack, bio) vive
tipado en `src/features/*/data`, versionado junto con el código. El panel privado en
`/admin` sí tiene base de datos propia (Firestore, en un Firebase separado del resto del
sitio) — ver [`PANEL_ADMIN.md`](PANEL_ADMIN.md) para su documentación completa.

## Estructura

```
src/
  app/
    (marketing)/          # Sitio público: home, /sobre-mi, /trabajos/[slug],
                           # /trabajos/presupdf y /trabajos/qrevento (rutas estáticas),
                           # /privacidad, /cookies, /legal/[producto]/terminos-descarga
                           # (route group — no aparece en la URL, solo agrupa el layout
                           # con Header/Footer/CookieConsent)
    admin/                 # Panel privado (login + /admin protegido por sesión)
    api/admin/              # Route Handlers del panel (apps, customers, products,
                            # subscriptions, payments, receipts) — todos exigen sesión
    api/auth/               # /session (login) y /logout
                         # sitemap, robots, manifest, iconos, OG image quedan a nivel raíz
  components/
    ui/                 # Componentes genéricos sin lógica de negocio (Button, Badge, CvButton...)
    layout/             # Header, Footer, MobileNav
    motion/             # Wrappers de animación (FadeIn)
    analytics/          # Google Analytics + banner de consentimiento de cookies
  features/             # Piezas con conocimiento de dominio (hero, productos, servicios,
                         # proceso, proyectos, stack, about, contacto)
    products/             # Productos propios destacados (PresuPDF, QREvento): datos,
                           # tarjetas, página de caso y marcos CSS de PC/teléfono
    projects/data/        # projects.ts (DecideSer, Catálogo Autos) +
                           # other-projects.ts (sitios sin caso de estudio)
    projects/components/  # ProjectCard, DownloadButton (tracking de clic por producto),
                           # OtherProjectsList
  config/               # site.config.ts — fuente única de verdad (nombre, url, autor)
  constants/            # Nav y links sociales
  lib/                  # utils (cn), helpers de SEO/JSON-LD/GA (trackPageview, trackEvent),
                         # og.tsx (imágenes Open Graph), contact.ts (links de WhatsApp) y
                         # cv.ts (detecta si /public/Cristian-Delgado-CV.pdf existe, server-only)
  types/                # Tipos compartidos
public/
  assets/               # Screenshots de proyectos e íconos de marca
  images/proyectos/     # Capturas WebP de PresuPDF y QREvento (PC y móvil)
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

El panel privado (`/admin`) necesita además las variables de Firebase — ver
[`.env.example`](.env.example) y [`PANEL_ADMIN.md`](PANEL_ADMIN.md).

En local van en `.env.local` (ignorado por git); en producción se configuran en **Vercel → Project Settings → Environment Variables**.

## Deploy

El proyecto se despliega en Vercel, que detecta Next.js automáticamente por `next.config.ts` y la dependencia `next` — **no requiere `vercel.json`** ni configuración de build manual.

## Estado del proyecto

> **Rediseño comercial y SEO (2026-11-12):** el detalle de cada cambio y su motivo está en
> [`CAMBIOS_VENTA_SEO_DELGADODEV.md`](CAMBIOS_VENTA_SEO_DELGADODEV.md). Algunas notas
> históricas de abajo (por ejemplo, PresuPDF como APK) ya no describen el sitio actual.

Sitio completo y funcional: home con PresuPDF y QREvento como productos destacados (cada uno
con caso propio), casos de `DecideSer` y `Catálogo Autos`, otros dos sitios en producción
(`Date un Gusto`, `Silverio Foodtruck` — sin caso de estudio), `/sobre-mi`, páginas
legales del sitio (`/privacidad`, `/cookies`) y páginas legales por producto
(`/legal/mi-almacen/terminos-descarga`), con SEO
técnico (sitemap, robots, JSON-LD `ProfessionalService` + `SoftwareApplication`, canonical y
Open Graph propios por página), accesibilidad (navegación por teclado, focus visible,
`prefers-reduced-motion`), performance optimizada (imágenes, fuentes self-hosted, sin
dependencias innecesarias) y Google Analytics detrás de un banner de consentimiento de
cookies (Ley 25.326 / buenas prácticas RGPD).

El sitio vende servicios como empresa: no muestra stack técnico, formación ni CV de cara al
cliente (ver `CAMBIOS_VENTA_SEO_DELGADODEV.md`, sección "Sin stack ni señales de CV").

Las descargas de APK (Mi Almacén y la versión Android de PresuPDF) se discontinuaron el
2026-11-12: ya no hay rutas de descarga ni páginas de Mi Almacén, y los links viejos
redirigen (ver `next.config.ts` y `PANEL_ADMIN.md`).

**PresuPDF (2026-09-08): DelgadoDev dejó de distribuir la descarga.** El sitio oficial
`https://www.presupdf.com.ar` es ahora la única fuente de descarga, términos, privacidad y
eliminación de cuenta. La ficha `/trabajos/presupdf` funciona solo como caso de estudio:
su CTA es "Visitar sitio oficial" (`links.official` en `projects.ts`, componente
`OfficialSiteButton`, evento `official_site_click_presupdf`) en vez de "Descargar APK". El
histórico `download_click_presufacil` no se tocó ni se borró — solo dejó de dispararse
hacia adelante, porque el botón que lo generaba ya no existe para este producto. Las 4
páginas `/legal/presufacil/*` se eliminaron y redirigen (308) a sus equivalentes en
`presupdf.com.ar` — ver `next.config.ts`.

**"Proyectos" → "Trabajos" (2026-09-08).** La sección/nav/ruta pasó de `Proyectos` /
`/proyectos/[slug]` a `Trabajos` / `/trabajos/[slug]` (carpeta de rutas movida, no solo
texto). Todas las URLs viejas indexadas redirigen (308) a su equivalente nueva —
`next.config.ts` tiene un redirect específico para `/proyectos/presufacil` (va directo a
`/trabajos/presupdf`, sin encadenar) y uno genérico `/proyectos/:slug → /trabajos/:slug`
para el resto. Canonical, OpenGraph, JSON-LD, breadcrumbs, sitemap y todos los links
internos (header, footer, hero, tarjetas) se actualizaron a la ruta nueva. Los
identificadores internos (`Project`, `ProjectCard`, `projects.ts`, `features/projects/`)
no se renombraron — es un cambio de cara al usuario, no un refactor de código.

**Repositorios (2026-09-08): sin link a GitHub desde la web para ningún proyecto.** El
botón "Repositorio" de `/trabajos/[slug]` se quitó y el campo `repo` de `ProjectLinks` se
eliminó del tipo — no queda ningún repo de PresuPDF, Mi Almacén ni Catálogo Autos
enlazable desde el sitio público. El ícono de GitHub del header/footer/contacto sigue
existiendo, pero apunta al perfil personal de Cristian (`socialLinks.github`), no a un
repositorio de proyecto puntual.

**CV**: el botón "Descargar CV" (hero, header, contacto y menú móvil) es condicional —
`src/lib/cv.ts` chequea con `fs.existsSync` si existe `/public/Cristian-Delgado-CV.pdf`.
Sin el archivo no se renderiza ningún botón (no queda un enlace roto); el PDF ya está
publicado con ese nombre exacto, así que los botones están activos en todas las páginas.

**Pendiente:**

- Galería de screenshots adicionales por proyecto (más allá de la portada) — marcados como `[PENDIENTE: ...]` en `src/features/projects/data/projects.ts`.
