# Rediseño comercial y SEO de DelgadoDev (2026-11-12)

## Objetivo

Que el sitio venda servicios mostrando capacidad técnica real (productos en producción con
capturas reales) y que tenga SEO profesional para búsquedas locales como "desarrollo web
Mendoza". Se mantuvo el diseño visual existente (tema oscuro, acento violeta, componentes
`Button`, `Badge`, `Container`, `FadeIn`) y no se agregó ninguna dependencia al proyecto.

## Reglas de contenido que guían todo el cambio

- **Marca: DelgadoDev.** Es el nombre en header, title, logo, footer, imágenes OG y datos
  estructurados. El nombre personal no aparece en ningún texto visible, title, meta ni imagen
  OG. _Por qué:_ el sitio vende un servicio con marca propia, no un perfil personal.
  Excepciones deliberadas: las páginas legales (tienen que identificar a la persona responsable
  de los datos, Ley 25.326) y el `founder` del JSON-LD.
- **Primera persona del singular, nunca plural.** "Diseño y programo…", no "Diseñamos…".
  _Por qué:_ es un desarrollador independiente; el plural simulaba una agencia y le restaba
  credibilidad al trato directo, que es justamente un argumento de venta.
- **Solo datos reales.** Nada de testimonios, métricas ni precios inventados. Las métricas
  provienen de las plataformas en producción (ver "Datos usados").
- **No achicar el portfolio.** PresuPDF y QREvento son los destacados, pero el sitio cuenta y
  nombra los 5 proyectos en producción (PresuPDF, QREvento, DecideSer, Silverio Foodtruck y
  Date un Gusto). _Por qué:_ un hero que decía "2 productos" transmitía poca trayectoria.
- **Mostrar antes que explicar.** _Por qué:_ el primer hero era puro texto y nadie lo leía;
  ahora las capturas reales ocupan el primer plano.

## Cambios en el home

Nuevo orden: Hero → Mis productos → Qué puedo hacer por tu negocio → Más trabajos → Cómo
trabajo → Sobre mí → Contacto.

| Sección                            | Qué cambió                                                                                                                                                                                                                                          | Por qué                                                                                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**                           | H1 "Desarrollo web y apps a medida en Mendoza", una sola línea de subtítulo, CTAs "Hablemos de tu proyecto" (WhatsApp con mensaje armado) y "Ver mis productos", 3 métricas reales y un collage de capturas de PresuPDF y QREvento en PC y celular. | El H1 con servicio y ciudad apunta a la búsqueda local. El collage prueba capacidad técnica de un vistazo. En móvil va justo después del H1 para que entre en la primera pantalla. |
| **Mis productos**                  | PresuPDF y QREvento en tarjetas grandes: captura de escritorio con la de móvil superpuesta, 3 beneficios, stack, "Visitar sitio" (dominio oficial) y "Ver caso".                                                                                    | Son los proyectos más completos (usuarios reales, cobros, demo pública): la mejor prueba de lo que se puede construir para un cliente.                                             |
| **Qué puedo hacer por tu negocio** | 6 beneficios (aparecer en Google, vender por WhatsApp, dejar las planillas, cobrar online, actualizarlo uno mismo, estar en el celular), cada uno con el trabajo real que lo respalda.                                                              | Un cliente no técnico compra resultados, no tecnologías.                                                                                                                           |
| **Más trabajos**                   | Reúne DecideSer y Catálogo Autos (tarjetas con caso) más Date un Gusto y Silverio Foodtruck ("Más sitios en producción").                                                                                                                           | Mantiene visibles todos los trabajos con menor peso que los productos destacados.                                                                                                  |
| **Cómo trabajo**                   | 4 pasos: Charlamos → Diseño → Desarrollo → Lanzamiento y soporte.                                                                                                                                                                                   | Le quita incertidumbre al cliente sobre el proceso, sin prometer precios ni plazos.                                                                                                |
| **Stack**                          | Eliminado del sitio (ver "Sin stack ni señales de CV").                                                                                                                                                                                             | Al cliente le importa qué se resuelve, no con qué tecnología.                                                                                                                      |
| **Contacto**                       | Formulario corto (nombre, qué necesitás, WhatsApp opcional) que abre WhatsApp con el mensaje armado, sin backend. GitHub y LinkedIn visibles junto a los otros canales.                                                                             | WhatsApp es el canal que ya usa el cliente. Sin backend no hay datos guardados ni nada que mantener.                                                                               |

**Navegación:** Productos · Trabajos · Cómo trabajo · Sobre mí · Contacto. Con 5 links, el
menú de escritorio pasa a mostrarse desde `md` (antes `sm`) para que no choque con el CTA del
header.

## Páginas de caso nuevas

`/trabajos/presupdf` y `/trabajos/qrevento`: encabezado con capturas, problema, solución, qué
construí, stack, resultado (solo datos reales), galería PC + celular y CTA a WhatsApp con un
mensaje propio de cada caso. Cada una tiene su title, description, H1, canonical y og:image, y
enlazan al otro caso, al home (`#productos`, `#trabajos`) y al contacto.

- **PresuPDF** dejó de presentarse como APK: hoy es web app + PWA (misma cuenta en PC y
  celular). Su ficha vieja en `projects.ts` se eliminó.
- **QREvento** se presenta como producto con demo pública (`/e/demo` y `/e/demo/live`), sin
  resultados de clientes.

## Mi Almacén

> **Actualización 2026-11-12:** Mi Almacén se discontinuó por completo: la ficha,
> sus páginas legales y la descarga del APK se eliminaron y redirigen al portfolio (ver
> `PANEL_ADMIN.md`). Lo que sigue describe el estado intermedio.

Sale del home, el footer y el sitemap, y su ficha pasa a `noindex`. La página
`/trabajos/mi-almacen` **se conserva**: de ella dependen la descarga del APK y sus páginas
legales. Ver `HIDDEN_PROJECT_SLUGS` / `featuredProjects` en `projects.ts`.

## SEO

- **Title del home:** "DelgadoDev | Desarrollo web y apps a medida en Mendoza" (54
  caracteres). **Description:** 138 caracteres, con ciudad y servicio.
- **Canonical por página.** Antes el root layout definía `canonical: "/"`, y toda página sin
  canonical propio heredaba el del home (error de indexación). Ahora cada página declara el
  suyo.
- **og:image por página:** `src/lib/og.tsx` genera la imagen con la estética del sitio; la
  usan el home, `/sobre-mi` y los dos casos (`opengraph-image.tsx` en cada ruta). `/sobre-mi`
  antes no tenía og:image.
- **JSON-LD:** `ProfessionalService` "DelgadoDev" (reemplaza al `Person` anterior) con
  `areaServed` Mendoza, `founder` y `sameAs` (GitHub, LinkedIn, Instagram, TikTok,
  presupdf.com.ar y qrevento.com.ar); `SoftwareApplication` en cada caso; `BreadcrumbList`.
  El autor de los casos es la marca, no una persona.
- **robots.txt** bloquea `/admin` y `/api/` (`/descargar/` se eliminó después). **sitemap.xml** suma los dos casos
  nuevos y excluye Mi Almacén.
- **Bug corregido:** el title de DecideSer repetía "| DelgadoDev | DelgadoDev".
- Palabras clave usadas de forma natural en el texto visible: desarrollo web Mendoza,
  sistemas a medida, app de presupuestos, álbum QR para eventos. "Desarrollador React
  freelance" se descartó a propósito (ver "Sin stack ni señales de CV").

## Sin stack ni señales de CV

DelgadoDev se presenta como una empresa que resuelve problemas, no como alguien que busca
trabajo en IT. Por eso se quitó del sitio todo lo que se lee como currículum:

- La franja "Con qué trabajo" del home y los badges de tecnologías de las tarjetas, de "Más
  sitios en producción" y de todas las páginas de caso.
- "Desarrollador React freelance" del hero y de la meta description. El badge ahora dice
  "Desarrollo web y apps · Mendoza".
- Las tecnologías de la tarjeta personal y del bloque "Sobre mí", y las menciones a
  frameworks en los textos de DecideSer y Catálogo Autos.
- La sección **Formación** de `/sobre-mi` (cursos, certificaciones, aprendizaje autodidacta)
  y su archivo de datos `education.ts`.
- En las fichas de DecideSer y Catálogo Autos: el bloque "Qué falta completar" (mostraba
  trabajo pendiente al cliente) y el botón "Pedir documentación completa" (pensado para
  reclutadores). El desplegable pasó a llamarse "Ver más detalles del proyecto".

_Por qué:_ un cliente no técnico no valora el stack y puede confundirlo. Lo que convence son
las capturas, las métricas y los beneficios. Que la competencia vea el stack no fue el motivo
principal: cualquier desarrollador lo detecta con una extensión del navegador.

Se mantiene, sin mostrarse en la página: `knowsAbout` en el JSON-LD (derivado de
`features/stack/data/stack.ts`) y el campo `stack` de `projects.ts` como dato interno.

## Capturas

Seis capturas de producción en `public/images/proyectos/` (WebP, 52–78 KB): landing de
PresuPDF y de QREvento en escritorio (1440×900) y móvil (390×844 a escala 2), la demo de
QREvento en móvil y su pantalla gigante en escritorio. Se tomaron con Playwright instalado
**fuera del repo** y se convirtieron a WebP con el canvas de Chromium, para no sumar
dependencias (ni Playwright ni `sharp`).

Todas las imágenes llevan `width`/`height` (evitan saltos de layout) y `alt` descriptivo. Solo
la composición principal del primer pliegue carga sin lazy loading. Los marcos de navegador y
teléfono son CSS puro (`device-showcase.tsx`).

**Falta:** las pantallas de PresuPDF que requieren login (historial, PDF generado, nuevo
presupuesto). Las de `public/assets/projects/presu/` son de la app Android retirada y no
representan el producto web actual, por eso no se usan.

## Datos usados

| Dato                                           | Fuente                                                                                                |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| +500 usuarios registrados en PresuPDF          | Landing de presupdf.com.ar (529)                                                                      |
| +1.000 presupuestos en el último mes           | Landing de presupdf.com.ar                                                                            |
| 18 guías por oficio, planes Pro y Pro Empresas | Datos del producto                                                                                    |
| 5 proyectos en producción                      | PresuPDF, QREvento, DecideSer, Silverio Foodtruck, Date un Gusto (Catálogo Autos es demo y no cuenta) |
| QREvento: 3 planes, sin apps para instalar     | Datos del producto                                                                                    |

Las métricas de PresuPDF llevan la nota "Datos de la plataforma a noviembre de 2026" para no
presentarlas como un valor fijo.

## Archivos principales

- Nuevos: `src/features/products/` (datos, tipos, tarjetas, página de caso, marcos de
  dispositivo), `src/features/hero/hero-showcase.tsx`, `src/features/services/`,
  `src/features/process/`, `src/features/contact-cta/contact-form.tsx`, `src/lib/contact.ts`,
  `src/lib/og.tsx`, `src/lib/url.ts`, `src/app/(marketing)/trabajos/{presupdf,qrevento}/`.
- Modificados: hero, secciones de proyectos y stack, contacto, header, footer, menú móvil,
  `seo.ts`, `site.config.ts`, `sitemap.ts`, `robots.ts`, layouts y `/sobre-mi`.
- Eliminado: `src/components/ui/tech-icon.tsx`.

## Validación

`pnpm typecheck`, `pnpm lint` y `pnpm build` en verde. Con el build de producción en local se
verificó title, description, canonical, og:image, H1 único, `alt` en todas las imágenes,
JSON-LD, robots y sitemap, sin scroll horizontal en 1440×900 ni en 390×844. El formulario
abre WhatsApp con el mensaje armado.
