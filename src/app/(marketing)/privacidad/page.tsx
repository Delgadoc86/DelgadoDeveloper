import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Qué datos recopila DelgadoDev, con qué finalidad, y cómo ejercer tus derechos sobre ellos.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: julio de 2026.
          </p>

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">Responsable</h2>
              <p className="mt-2">
                {siteConfig.author.name} ({siteConfig.name}), con sede en{" "}
                {siteConfig.author.location}, es responsable de los datos recopilados a
                través de este sitio. Podés contactarme en{" "}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>{" "}
                por cualquier consulta relacionada con esta política.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Qué datos se recopilan
              </h2>
              <p className="mt-2">
                <strong className="text-foreground">Datos de navegación</strong>, solo si
                aceptás el aviso de cookies: páginas visitadas, tiempo en el sitio, origen
                del tráfico, país o ciudad aproximados y tipo de dispositivo, a través de
                Google Analytics. La dirección IP se procesa de forma anonimizada.
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Datos de contacto</strong>: si me
                escribís por email o WhatsApp, recibo la información que decidas compartir
                (nombre, dirección de contacto, contenido del mensaje).
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Con qué finalidad
              </h2>
              <p className="mt-2">
                Entender qué contenido del sitio genera más interés para mejorarlo, y
                responder a las consultas que me envíes. No utilizo estos datos con fines
                publicitarios ni los combino con otras fuentes.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Marco legal</h2>
              <p className="mt-2">
                Este sitio opera desde Argentina y sigue la Ley 25.326 de Protección de
                Datos Personales. Si accedés desde otro país, pueden aplicar además las
                normativas locales de protección de datos correspondientes (por ejemplo,
                la LGPD en Brasil).
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Con quién se comparten los datos
              </h2>
              <p className="mt-2">
                Únicamente con Google Analytics, como proveedor de analítica, y solo si
                aceptaste el aviso de cookies. No vendo ni comparto datos con terceros con
                fines publicitarios.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Tus derechos</h2>
              <p className="mt-2">
                Podés acceder, rectificar o solicitar la eliminación de tus datos, y
                retirar tu consentimiento de cookies en cualquier momento desde la{" "}
                <a
                  href="/cookies"
                  className="text-accent-bright underline underline-offset-2"
                >
                  Política de Cookies
                </a>
                . Para ejercer estos derechos, escribime a{" "}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">Cambios</h2>
              <p className="mt-2">
                Esta política puede actualizarse para reflejar cambios en el sitio o en la
                normativa aplicable. La fecha de la última actualización figura arriba.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
