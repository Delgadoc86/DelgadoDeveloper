import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { DraftNotice } from "@/components/ui/draft-notice";
import { siteConfig } from "@/config/site.config";

// BORRADOR — distinto de /legal/presufacil/terminos-descarga (que cubre la instalación
// del APK fuera de Play Store). Este documento cubre el USO continuado de la app una
// vez instalada: licencia, conducta, propiedad intelectual, suspensión de cuenta.
// Antes de activarla: revisión legal completa y sacar `robots: { index: false }`.
export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso — PresuFácil",
  description: "Condiciones de uso de la aplicación PresuFácil una vez instalada.",
  alternates: {
    canonical: "/legal/presufacil/terminos-de-uso",
  },
  robots: { index: false, follow: false },
};

export default function PresuFacilTerminosDeUsoPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal · PresuFácil</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: 6 de julio de 2026.
          </p>

          <DraftNotice className="mt-6" />

          <p className="text-foreground-muted mt-6 text-sm leading-relaxed">
            Estos términos regulan el uso de PresuFácil una vez instalada. Las condiciones
            de descarga e instalación fuera de Google Play están en los{" "}
            <Link
              href="/legal/presufacil/terminos-descarga"
              className="text-accent-bright underline underline-offset-2"
            >
              Términos de descarga e instalación
            </Link>
            .
          </p>

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">
                Aceptación y licencia de uso
              </h2>
              <p className="mt-2">
                Al crear una cuenta y usar PresuFácil aceptás estos términos.{" "}
                {siteConfig.author.name} te otorga una licencia personal, no exclusiva e
                intransferible para usar la app en tus propios dispositivos, para armar
                tus propios presupuestos.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Uso permitido</h2>
              <p className="mt-2">
                La app está pensada para uso profesional legítimo por parte de
                trabajadores independientes y oficios. No está permitido usarla para
                actividades ilegales, para cargar datos de terceros sin su consentimiento
                cuando la normativa lo exija, ni para intentar vulnerar la seguridad de la
                app o de la infraestructura que la sostiene.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Propiedad intelectual
              </h2>
              <p className="mt-2">
                El software, diseño, marca y contenido de PresuFácil pertenecen a{" "}
                {siteConfig.author.name}. Los datos que vos cargás (presupuestos, ítems,
                datos de clientes) son tuyos; no se reclama propiedad sobre ellos, solo se
                procesan para que la app funcione.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Planes demo y pro
              </h2>
              <p className="mt-2">
                [PENDIENTE: describir las condiciones concretas del plan demo (límites de
                uso) y del plan pro (alcance, si tiene costo y cómo se cobra) una vez que
                esa lógica esté definitivamente cerrada.]
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Suspensión o cancelación de cuenta
              </h2>
              <p className="mt-2">
                [PENDIENTE: definir en qué casos una cuenta puede suspenderse (por
                ejemplo, uso indebido comprobado) y el proceso para notificarlo al
                usuario.]
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Cambios en la app o en estos términos
              </h2>
              <p className="mt-2">
                {siteConfig.author.name} puede modificar, mejorar o discontinuar funciones
                de la app, y actualizar estos términos. Los cambios relevantes se
                informarán mediante la aplicación o los canales de contacto disponibles.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Limitación de responsabilidad
              </h2>
              <p className="mt-2">
                Aplica la misma limitación razonable de responsabilidad descrita en los{" "}
                <Link
                  href="/legal/presufacil/terminos-descarga"
                  className="text-accent-bright underline underline-offset-2"
                >
                  Términos de descarga e instalación
                </Link>
                : el usuario utiliza la app bajo su propio criterio y es responsable de
                revisar los presupuestos antes de enviarlos.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Ley aplicable y contacto
              </h2>
              <p className="mt-2">
                Estos términos se rigen por las leyes de la República Argentina. Consultas
                a{" "}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>
                .
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
