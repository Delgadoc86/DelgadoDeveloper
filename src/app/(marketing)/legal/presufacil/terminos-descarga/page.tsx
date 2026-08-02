import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site.config";
import { socialLinks } from "@/constants/social-links";

export const metadata: Metadata = {
  title: "Términos de descarga e instalación — PresuFácil",
  description:
    "Condiciones para descargar e instalar PresuFácil fuera de Google Play, mientras la app está en etapa de prueba y mejora continua.",
  alternates: {
    canonical: "/legal/presufacil/terminos-descarga",
  },
};

export default function PresuFacilTerminosDescargaPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal · PresuFácil</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Términos de descarga e instalación
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: 6 de julio de 2026.
          </p>
          <p className="text-foreground-muted mt-6 text-sm leading-relaxed">
            Al descargar, instalar o utilizar PresuFácil desde esta página, el usuario
            acepta estos términos de descarga y prueba.
          </p>

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">
                Identificación y estado de la aplicación
              </h2>
              <p className="mt-2">
                PresuFácil es una aplicación desarrollada de forma independiente por{" "}
                <strong className="text-foreground">
                  {siteConfig.author.name}, bajo la marca {siteConfig.name}
                </strong>
                , desde {siteConfig.author.location}.
              </p>
              <p className="mt-2">
                La aplicación se encuentra en etapa de prueba y mejora continua. Durante
                esta etapa pueden publicarse actualizaciones, correcciones, cambios
                visuales o ajustes de funcionalidades según el feedback recibido y la
                evolución del producto.
              </p>
              <p className="mt-2">
                Contacto:{" "}
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>
                <br />
                WhatsApp:{" "}
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-bright underline underline-offset-2"
                >
                  +54 9 261-747-8090
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
                <br />
                CUIT/CUIL: 20-32750722-3
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Descarga oficial
              </h2>
              <p className="mt-2">
                A la fecha de publicación de estos términos, PresuFácil no se distribuye
                mediante Google Play Store.
              </p>
              <p className="mt-2">
                La descarga oficial se realiza únicamente a través del enlace publicado en
                esta página de {siteConfig.name}. El archivo de instalación puede estar
                alojado en Google Drive, utilizado solamente como servicio de alojamiento
                del instalador.
              </p>
              <p className="mt-2">
                No descargues ni instales archivos compartidos por terceros, grupos de
                WhatsApp, redes sociales, foros o sitios que no hayan sido publicados
                desde {siteConfig.name}.
              </p>
              <p className="mt-2">
                Google LLC, Google Play y Google Drive no desarrollan, administran ni
                brindan soporte directo sobre PresuFácil.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Instalación en Android
              </h2>
              <p className="mt-2">
                Como la aplicación se instala fuera de Google Play, Android puede mostrar
                una advertencia o solicitar permiso para instalar aplicaciones desde el
                navegador o administrador de archivos utilizado.
              </p>
              <p className="mt-2">
                Esta advertencia indica que la instalación proviene de fuera de la tienda
                oficial. Antes de continuar, el usuario debe verificar que abrió el enlace
                desde el sitio oficial de {siteConfig.name}.
              </p>
              <p className="mt-2">Para instalar la aplicación:</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>Descargá el archivo APK desde el enlace publicado en esta página.</li>
                <li>Abrí el archivo descargado.</li>
                <li>
                  Permití la instalación desde esa fuente solo luego de verificar que se
                  trata del enlace oficial.
                </li>
                <li>Instalá la aplicación.</li>
              </ol>
              <p className="mt-2">
                PresuFácil no solicita desactivar Play Protect, habilitar accesibilidad,
                otorgar permisos de administrador del dispositivo ni modificar otras
                configuraciones avanzadas de seguridad para funcionar.
              </p>
              <p className="mt-2">
                Como práctica general de seguridad, el usuario puede revocar luego el
                permiso de instalación otorgado al navegador o administrador de archivos.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Requisitos básicos
              </h2>
              <p className="mt-2">Para utilizar PresuFácil se necesita:</p>
              <ul className="mt-2 space-y-1">
                <li>· Un dispositivo Android compatible.</li>
                <li>
                  · Conexión a Internet para registro, inicio de sesión, sincronización y
                  acceso a determinadas funciones.
                </li>
                <li>· Una cuenta creada dentro de la aplicación.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Uso previsto de PresuFácil
              </h2>
              <p className="mt-2">
                PresuFácil está diseñada para ayudar a profesionales, trabajadores
                independientes y pequeños negocios a crear, organizar, compartir y
                conservar presupuestos.
              </p>
              <p className="mt-2">
                La aplicación no reemplaza sistemas de facturación electrónica,
                comprobantes fiscales, obligaciones ante ARCA, asesoramiento contable,
                legal o impositivo.
              </p>
              <p className="mt-2">
                El usuario es responsable de revisar la información antes de enviar un
                presupuesto, incluyendo importes, datos del cliente, condiciones,
                vigencia, impuestos, datos comerciales y cualquier otra información
                relevante.
              </p>
              <p className="mt-2">
                La emisión de un presupuesto desde la aplicación no reemplaza una factura,
                recibo, contrato ni comprobante fiscal cuando la normativa aplicable exija
                esos documentos.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Datos cargados por el usuario
              </h2>
              <p className="mt-2">
                El usuario es responsable por los datos que ingresa en PresuFácil,
                incluidos datos de su comercio, clientes, presupuestos, productos,
                servicios, precios, condiciones y documentos generados.
              </p>
              <p className="mt-2">
                Cuando cargue información de terceros, como nombres, teléfonos, correos
                electrónicos o datos comerciales de clientes, deberá hacerlo de manera
                legítima y conforme a la normativa aplicable.
              </p>
              <p className="mt-2">
                El tratamiento de datos personales dentro de PresuFácil se detalla en la
                Política de Privacidad de la aplicación.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Etapa de prueba, disponibilidad y respaldos
              </h2>
              <p className="mt-2">
                PresuFácil se ofrece en etapa de prueba. Aunque se realizan esfuerzos
                razonables para mejorar su estabilidad, seguridad y funcionamiento, pueden
                existir errores, interrupciones, cambios en el servicio o funciones aún en
                desarrollo.
              </p>
              <p className="mt-2">
                El usuario debe revisar los presupuestos importantes antes de enviarlos y
                conservar, cuando corresponda, copias o respaldos de la información
                comercial relevante.
              </p>
              <p className="mt-2">
                El Desarrollador podrá publicar actualizaciones, correcciones o mejoras.
                Los cambios relevantes podrán informarse mediante la aplicación, el sitio
                web o los canales de contacto disponibles.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Limitación razonable de responsabilidad
              </h2>
              <p className="mt-2">
                El usuario utiliza PresuFácil bajo su propio criterio y es responsable por
                las decisiones comerciales, económicas, fiscales o contractuales que tome
                a partir de los presupuestos generados.
              </p>
              <p className="mt-2">
                El Desarrollador no será responsable por perjuicios derivados de errores
                de carga, montos ingresados incorrectamente, uso inadecuado de la
                aplicación, pérdida o robo del dispositivo, contraseñas compartidas por el
                usuario, fallas de conexión, interrupciones de servicios de terceros o
                falta de revisión de los documentos antes de enviarlos.
              </p>
              <p className="mt-2">
                Nada de lo indicado en estos términos limita los derechos que resulten
                irrenunciables conforme a la legislación aplicable.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Cookies y analítica del sitio web
              </h2>
              <p className="mt-2">
                Esta página puede utilizar cookies y herramientas de analítica web
                únicamente conforme a las preferencias aceptadas por el visitante en el{" "}
                <Link
                  href="/cookies"
                  className="text-accent-bright underline underline-offset-2"
                >
                  aviso de cookies del sitio
                </Link>
                .
              </p>
              <p className="mt-2">
                Esta sección se refiere exclusivamente al sitio web de {siteConfig.name}.
                La aplicación PresuFácil cuenta con su propia Política de Privacidad.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Documentos relacionados
              </h2>
              <p className="mt-2">
                Antes de utilizar PresuFácil, el usuario debe poder acceder desde esta
                misma página a los siguientes documentos:
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  · Términos y Condiciones de Uso de PresuFácil [PENDIENTE: publicar].
                </li>
                <li>· Política de Privacidad de PresuFácil [PENDIENTE: publicar].</li>
                <li>
                  ·{" "}
                  <Link
                    href="/cookies"
                    className="text-accent-bright underline underline-offset-2"
                  >
                    Política de Cookies de {siteConfig.name}
                  </Link>
                  .
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Ley aplicable y contacto
              </h2>
              <p className="mt-2">
                Estos términos se rigen por las leyes de la República Argentina.
              </p>
              <p className="mt-2">
                Para consultas, sugerencias o problemas de instalación, el usuario puede
                comunicarse con:
              </p>
              <p className="mt-2">
                <strong className="text-foreground">
                  {siteConfig.author.name} — {siteConfig.name}
                </strong>
                <br />
                {siteConfig.author.location}
                <br />
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-accent-bright underline underline-offset-2"
                >
                  {siteConfig.author.email}
                </a>
                <br />
                WhatsApp:{" "}
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent-bright underline underline-offset-2"
                >
                  +54 9 261-747-8090
                  <span className="sr-only"> (se abre en una nueva pestaña)</span>
                </a>
              </p>
            </div>

            <p className="text-foreground-muted text-xs italic">
              Este documento regula específicamente la descarga directa y la etapa de
              prueba de PresuFácil. El uso de la aplicación una vez instalada también se
              rige por sus Términos de Uso y Política de Privacidad.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
