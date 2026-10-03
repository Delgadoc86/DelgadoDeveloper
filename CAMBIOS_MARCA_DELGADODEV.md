# Cambios de marca y copy para DelgadoDev

## Objetivo

Eliminar cualquier señal de búsqueda de empleo o orientación a reclutadores, manteniendo la estructura, stack y SEO técnico del sitio intactos.

## Cambios realizados

- Se quitó todo link al CV de la navegación, header, menú móvil y CTA.
- Se eliminó la frase de disponibilidad laboral en el hero y las referencias a oportunidades / equipo / freelance.
- Se reemplazó el texto principal de marca por: "Desarrollo web y sistemas a medida para negocios".
- Se actualizó la descripción del sitio, el title del metadata y el JSON-LD para hablar a negocios y clientes, no a reclutadores.
- Los CTA fueron reescritos a mensajes comerciales: "Hablemos de tu proyecto" y similares.
- Se quitaron los botones destacados de LinkedIn/GitHub del foco principal y quedaron solo como enlaces discretos de contacto.
- Se eliminó la presentación pública de Mi Almacén en la home y en el footer.

## Archivos principales afectados

- `src/config/site.config.ts`
- `src/lib/seo.ts`
- `src/components/layout/header.tsx`
- `src/components/layout/mobile-nav.tsx`
- `src/components/layout/footer.tsx`
- `src/features/hero/hero.tsx`
- `src/features/contact-cta/contact-cta.tsx`
- `src/features/about/about-summary.tsx`
- `src/features/about/personal-card.tsx`
- `src/app/(marketing)/sobre-mi/page.tsx`
- `src/features/projects/projects-section.tsx`

## Validación

- Se ejecutó `npm run typecheck -- --pretty false` y terminó correctamente.
