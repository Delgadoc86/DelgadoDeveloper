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
                         # /privacidad, /cookies, /legal/[producto]/terminos-descarga,
                         # sitemap, robots, manifest, iconos, OG image
  components/
    ui/                 # Componentes genéricos sin lógica de negocio (Button, Badge, TechIcon, CvButton...)
    layout/             # Header, Footer, MobileNav
    motion/             # Wrappers de animación (FadeIn)
    analytics/          # Google Analytics + banner de consentimiento de cookies
  features/             # Piezas con conocimiento de dominio (hero, proyectos, stack, about, contacto)
    projects/data/        # projects.ts (3 casos de estudio) + other-projects.ts (sitios de
                           # cliente sin caso de estudio, repos privados)
    projects/components/  # ProjectCard, DownloadButton (tracking de clic por producto),
                           # OtherProjectsSection
    about/data/            # education.ts — certificaciones, formación complementaria y
                           # aprendizaje autodidacta aplicado, mostrados en /sobre-mi
  config/               # site.config.ts — fuente única de verdad (nombre, url, autor)
  constants/            # Nav y links sociales
  lib/                  # utils (cn), helpers de SEO/JSON-LD/GA (trackPageview, trackEvent) y
                         # cv.ts (detecta si /public/Cristian-Delgado-CV.pdf existe, server-only)
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

Sitio completo y funcional: home, `/sobre-mi`, case studies de los 3 proyectos propios más
completos (`PresúFácil`, `Mi Almacén`, `Catálogo Autos` — con repo público linkeado en cada
uno), una sección más liviana con otros dos sitios reales para clientes (`Date un Gusto`,
`Silverio Foodtruck` — sin caso de estudio, repos privados por ser de terceros), páginas
legales del sitio (`/privacidad`, `/cookies`) y páginas legales por producto
(`/legal/mi-almacen/terminos-descarga`, `/legal/presufacil/terminos-descarga`), con SEO
técnico (sitemap, robots, JSON-LD con `knowsAbout` derivado del stack, Open Graph y Twitter
Card propios por página de proyecto), accesibilidad (navegación por teclado, focus visible,
`prefers-reduced-motion`), performance optimizada (imágenes, fuentes self-hosted, sin
dependencias innecesarias) y Google Analytics detrás de un banner de consentimiento de
cookies (Ley 25.326 / buenas prácticas RGPD).

El home está pensado primero para reclutadores (indicador de disponibilidad laboral en el
hero, botón "Ver GitHub" al perfil público, CV descargable) y en segundo lugar para
clientes freelance — ambos objetivos conviven sin secciones separadas. La sección
"Formación" de `/sobre-mi` distingue tres niveles: certificaciones formales (Coderhouse,
Educación IT), formación complementaria de menor jerarquía visual, y un bloque de
aprendizaje autodidacta aplicado (Next.js, React Native, Firebase...) respaldado por
evidencia real de proyectos, no solo enunciado.

Mi Almacén y PresuFácil se distribuyen como APK fuera de Google Play: cada uno tiene un
botón "Descargar APK" en su página (enlace a Google Drive) y un evento de Google
Analytics propio por clic (`download_click_mi_almacen` / `download_click_presufacil`).

**CV**: el botón "Descargar CV" (hero, header, contacto y menú móvil) es condicional —
`src/lib/cv.ts` chequea con `fs.existsSync` si existe `/public/Cristian-Delgado-CV.pdf`.
Sin el archivo no se renderiza ningún botón (no queda un enlace roto); el PDF ya está
publicado con ese nombre exacto, así que los botones están activos en todas las páginas.

**Pendiente:**

- Galería de screenshots adicionales por proyecto (más allá de la portada) — marcados como `[PENDIENTE: ...]` en `src/features/projects/data/projects.ts`.

## Camino a Google Play (cuando termine la etapa de prueba)

Hoy Mi Almacén y PresuFácil se distribuyen fuera de Google Play (APK por Google Drive).
Publicarlas en la store exige más que lo que ya tenemos. Ya existen **borradores** de
las páginas que hacen falta, marcados con un aviso visible "Documento en preparación" y
`robots: { index: false }` (no los indexa Google todavía) hasta que se completen y
tengan revisión:

| Página                        | Ruta                                | Qué falta antes de activarla                                                                                        |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Privacidad de Mi Almacén      | `/legal/mi-almacen/privacidad`      | Completar `[PENDIENTE]` de retención de datos y revisión legal.                                                     |
| Eliminar cuenta — Mi Almacén  | `/legal/mi-almacen/eliminar-cuenta` | Construir la opción de borrado **dentro de la app** (Google la exige además de esta página web) y confirmar plazos. |
| Términos de Uso de Mi Almacén | `/legal/mi-almacen/terminos-de-uso` | Definir condiciones de suspensión de cuenta y revisión legal.                                                       |
| Privacidad de PresuFácil      | `/legal/presufacil/privacidad`      | Completar `[PENDIENTE]` de retención de datos y revisión legal.                                                     |
| Eliminar cuenta — PresuFácil  | `/legal/presufacil/eliminar-cuenta` | Construir la opción de borrado **dentro de la app** y confirmar plazos.                                             |
| Términos de Uso de PresuFácil | `/legal/presufacil/terminos-de-uso` | Cerrar la lógica de planes demo/pro y revisión legal.                                                               |

Estas páginas no están linkeadas desde ningún lado del sitio (a propósito, para que
ningún visitante se las cruce por accidente) — solo se accede escribiendo la URL
directamente, para revisarlas vos. Google tampoco las indexa (`robots: { index: false }`).

Para activarlas cuando estén listas: completar los `[PENDIENTE]`, sacar
`<DraftNotice />` y el `robots: { index: false }` de cada `page.tsx`, y agregar el link
correspondiente en "Documentos relacionados" dentro de cada
`/legal/[producto]/terminos-descarga`.

**Esto NO cubre todo lo que pide Play Store.** Lo siguiente se completa directo en
Play Console al momento de subir cada app, no en el sitio web:

- Formulario de **Seguridad de los datos** (data safety).
- Clasificación de contenido y público objetivo.
- Usuario de prueba para que el equipo de revisión de Google acceda a la app.
- Declaración de anuncios (no aplica, no hay ads).

**Futuro (fuera de alcance de esta v1):**

- Blog/artículos técnicos — la arquitectura de `features/` ya lo deja preparado sin romper nada al agregarlo.
- Internacionalización (ES/EN), si se busca alcance internacional.
