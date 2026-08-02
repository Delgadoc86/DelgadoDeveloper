import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { DraftNotice } from "@/components/ui/draft-notice";
import { siteConfig } from "@/config/site.config";

// BORRADOR — preparado para cuando PresuFácil se publique en Google Play, que exige
// un link a esta política (distinta de /privacidad, que solo cubre el sitio web).
// Antes de activarla: completar los [PENDIENTE], confirmar con precisión las reglas
// de retención/backups en Firestore, y sacar `robots: { index: false }` de abajo.
export const metadata: Metadata = {
  title: "Política de Privacidad — PresuFácil",
  description:
    "Qué datos recopila la app PresuFácil, con qué finalidad, y cómo ejercer tus derechos sobre ellos.",
  alternates: {
    canonical: "/legal/presufacil/privacidad",
  },
  robots: { index: false, follow: false },
};

export default function PresuFacilPrivacidadPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal · PresuFácil</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: 6 de julio de 2026.
          </p>

          <DraftNotice className="mt-6" />

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">Responsable</h2>
              <p className="mt-2">
                {siteConfig.author.name}, bajo la marca {siteConfig.name}, con sede en{" "}
                {siteConfig.author.location}, es responsable de los datos que PresuFácil
                procesa. Contacto:{" "}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>
                . CUIT/CUIL: 20-32750722-3.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Qué datos recopila la app
              </h2>
              <p className="mt-2">
                <strong className="text-foreground">Datos de la cuenta</strong>: email y
                contraseña, para el registro, verificación de email e inicio de sesión
                (Firebase Authentication).
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Datos del negocio</strong>: nombre,
                rubro y datos comerciales que cargás en el onboarding.
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Datos de presupuestos</strong>: ítems,
                precios y, cuando los cargás, nombre y teléfono del cliente al que le
                hacés el presupuesto. Estos son datos de terceros que vos ingresás — ver
                más abajo tu responsabilidad al respecto.
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Archivos generados</strong>: los PDF
                de presupuesto, almacenados en Firebase Storage para que puedas
                consultarlos desde el historial.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Con qué finalidad
              </h2>
              <p className="mt-2">
                Únicamente para el funcionamiento de la app: identificarte, guardar tus
                presupuestos, generar los PDF y mantener tu historial. No se usan estos
                datos con fines publicitarios ni se combinan con otras fuentes.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Dónde se almacenan y con quién se comparten
              </h2>
              <p className="mt-2">
                Los datos se almacenan en Firebase (Authentication, Firestore y Storage),
                infraestructura de Google Cloud. Google actúa como proveedor de
                infraestructura, no accede a los datos para fines propios.
              </p>
              <p className="mt-2">
                No se venden ni se comparten datos con terceros con fines comerciales o
                publicitarios. El PDF de presupuesto solo se comparte cuando vos,
                explícitamente, elegís enviarlo (por ejemplo por WhatsApp).
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Retención de datos
              </h2>
              <p className="mt-2">
                [PENDIENTE: definir por cuánto tiempo se conservan los datos después de
                que un usuario elimina su cuenta, y si existen copias de respaldo
                (backups) que se conserven por un período adicional.]
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Tus derechos y eliminación de cuenta
              </h2>
              <p className="mt-2">
                Podés acceder, rectificar o solicitar la eliminación de tu cuenta y tus
                datos. El procedimiento está detallado en{" "}
                <Link
                  href="/legal/presufacil/eliminar-cuenta"
                  className="text-accent-bright underline underline-offset-2"
                >
                  Cómo eliminar tu cuenta y tus datos
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Responsabilidad sobre datos de terceros
              </h2>
              <p className="mt-2">
                Si cargás datos de tus propios clientes en un presupuesto, sos responsable
                de hacerlo de forma legítima y conforme a la normativa de protección de
                datos personales aplicable (Ley 25.326 en Argentina).
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Menores de edad</h2>
              <p className="mt-2">
                PresuFácil no está dirigida a menores de edad y no recopila
                intencionalmente datos de menores.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Cambios</h2>
              <p className="mt-2">
                Esta política puede actualizarse para reflejar cambios en la app o en la
                normativa aplicable. Los cambios relevantes se informarán mediante la
                aplicación o los canales de contacto disponibles.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Contacto</h2>
              <p className="mt-2">
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>{" "}
                — WhatsApp: +54 9 261-747-8090.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
