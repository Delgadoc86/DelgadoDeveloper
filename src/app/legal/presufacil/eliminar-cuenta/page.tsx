import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { DraftNotice } from "@/components/ui/draft-notice";
import { siteConfig } from "@/config/site.config";
import { socialLinks } from "@/constants/social-links";

// BORRADOR — Google Play exige, para apps con cuentas (como esta, con Firebase Auth),
// un recurso web accesible SIN instalar la app donde pedir la eliminación de cuenta y
// datos. Esta página cubre esa parte. Pero la política de Google también pide una
// opción de eliminación DENTRO de la app — eso todavía no existe (no aparece en
// `features` de PresuFácil en projects.ts) y hay que construirlo antes de publicar.
// Antes de activarla: confirmar plazos reales, agregar el flujo in-app, y sacar
// `robots: { index: false }` de abajo.
export const metadata: Metadata = {
  title: "Cómo eliminar tu cuenta y tus datos — PresuFácil",
  description:
    "Cómo pedir la eliminación de tu cuenta de PresuFácil y de los datos asociados.",
  alternates: {
    canonical: "/legal/presufacil/eliminar-cuenta",
  },
  robots: { index: false, follow: false },
};

export default function PresuFacilEliminarCuentaPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal · PresuFácil</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Cómo eliminar tu cuenta y tus datos
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: 6 de julio de 2026.
          </p>

          <DraftNotice className="mt-6" />

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">
                Cómo pedir la eliminación
              </h2>
              <p className="mt-2">
                [PENDIENTE: agregar una opción para eliminar la cuenta directamente desde
                la app, en Configuración / Datos comerciales. Google Play la exige además
                de este medio web.]
              </p>
              <p className="mt-2">
                Mientras esa opción no esté disponible en la app, podés pedir la
                eliminación de tu cuenta y tus datos escribiendo a{" "}
                <a
                  href={`mailto:${siteConfig.author.email}?subject=${encodeURIComponent("Eliminar mi cuenta de PresuFácil")}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>{" "}
                o por{" "}
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-bright underline underline-offset-2"
                >
                  WhatsApp
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
                , indicando el email con el que te registraste.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Qué se elimina</h2>
              <p className="mt-2">
                Tu cuenta (Firebase Authentication) y los datos asociados en Firestore y
                Firebase Storage: datos del negocio, presupuestos, ítems y los PDF
                generados con esa cuenta.
              </p>
              <p className="mt-2">
                [PENDIENTE: confirmar si se conservan copias de respaldo (backups) por un
                período adicional después del borrado, y por cuánto tiempo.]
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Plazo de procesamiento
              </h2>
              <p className="mt-2">
                [PENDIENTE: definir un plazo concreto, por ejemplo &quot;dentro de los X
                días hábiles desde la solicitud&quot;.]
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Datos que no se eliminan de forma inmediata
              </h2>
              <p className="mt-2">
                [PENDIENTE: indicar si existe alguna excepción, por ejemplo información
                que deba conservarse por una obligación legal aplicable. Si no aplica
                ninguna excepción, aclarar explícitamente que no hay ninguna.]
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
