import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/config/site.config";
import { socialLinks } from "@/constants/social-links";

export const metadata: Metadata = {
  title: "Términos de descarga y prueba — Mi Almacén",
  description:
    "Condiciones para descargar e instalar Mi Almacén fuera de Google Play, mientras la app está en etapa de prueba con comercios reales.",
  alternates: {
    canonical: "/legal/mi-almacen/terminos-descarga",
  },
};

export default function MiAlmacenTerminosDescargaPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal · Mi Almacén</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Términos de descarga y prueba
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: 6 de julio de 2026.
          </p>
          <p className="text-foreground-muted mt-6 text-sm leading-relaxed">
            Al descargar o instalar Mi Almacén desde esta página, aceptás estos términos
            de descarga y prueba.
          </p>

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">
                Identificación y estado del producto
              </h2>
              <p className="mt-2">
                Mi Almacén es una aplicación desarrollada de forma independiente por{" "}
                <strong className="text-foreground">
                  {siteConfig.author.name}, bajo la marca {siteConfig.name}
                </strong>
                , desde {siteConfig.author.location}.
              </p>
              <p className="mt-2">
                La aplicación se encuentra en etapa de prueba con comercios reales. Esto
                significa que puede recibir actualizaciones frecuentes, correcciones,
                mejoras o cambios en algunas funciones según el feedback de los usuarios y
                el avance del producto.
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
                A la fecha de esta publicación, Mi Almacén no se distribuye mediante
                Google Play Store.
              </p>
              <p className="mt-2">
                La descarga oficial se realiza únicamente mediante el enlace publicado en
                esta página de {siteConfig.name}. El archivo de instalación puede estar
                alojado en Google Drive, utilizado exclusivamente como servicio de
                alojamiento del instalador.
              </p>
              <p className="mt-2">
                No descargues ni instales copias compartidas por grupos de WhatsApp, redes
                sociales, foros, sitios desconocidos o enlaces que no hayan sido
                publicados desde {siteConfig.name}.
              </p>
              <p className="mt-2">
                Google LLC, Google Play y Google Drive no desarrollan, administran ni
                brindan soporte directo sobre Mi Almacén.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Instalación en Android
              </h2>
              <p className="mt-2">
                Como la aplicación se descarga fuera de Google Play, Android puede mostrar
                una advertencia o pedir permiso para instalar aplicaciones desde el
                navegador o administrador de archivos utilizado.
              </p>
              <p className="mt-2">
                Esto indica que la instalación proviene de fuera de la tienda oficial. No
                determina por sí solo que la aplicación sea dañina, pero es importante
                verificar que el enlace haya sido abierto desde esta página oficial.
              </p>
              <p className="mt-2">Para instalarla:</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>Descargá el archivo APK desde el enlace publicado aquí.</li>
                <li>Abrí el archivo descargado.</li>
                <li>
                  Permití la instalación desde esa fuente únicamente si confirmaste que el
                  archivo proviene de {siteConfig.name}.
                </li>
                <li>Instalá la aplicación.</li>
              </ol>
              <p className="mt-2">
                Mi Almacén no solicita desactivar Play Protect, permisos de accesibilidad,
                permisos de administrador del dispositivo ni configuraciones de seguridad
                adicionales para funcionar.
              </p>
              <p className="mt-2">
                Como práctica general de seguridad, podés revocar luego el permiso de
                instalación otorgado al navegador o administrador de archivos.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Requisitos y uso previsto
              </h2>
              <p className="mt-2">Para utilizar Mi Almacén necesitás:</p>
              <ul className="mt-2 space-y-1">
                <li>· Un dispositivo Android compatible.</li>
                <li>
                  · Conexión a Internet para registrarte, iniciar sesión y sincronizar
                  información.
                </li>
                <li>· Una cuenta creada dentro de la aplicación.</li>
              </ul>
              <p className="mt-2">
                Mi Almacén está pensada para ayudar a pequeños comercios a organizar
                productos, precios, fiados, pagos y movimientos diarios.
              </p>
              <p className="mt-2">
                No reemplaza libros contables, facturación electrónica, obligaciones
                fiscales, declaraciones ante ARCA, controles de caja, asesoramiento
                contable, legal o impositivo. El usuario es responsable de revisar la
                información registrada y conservar los respaldos que considere necesarios
                para su actividad.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Etapa de prueba y actualizaciones
              </h2>
              <p className="mt-2">
                La aplicación se ofrece como versión de prueba. Aunque se toman medidas
                razonables para mejorar su estabilidad y seguridad, pueden existir
                errores, interrupciones, cambios de diseño o funciones aún incompletas.
              </p>
              <p className="mt-2">
                El Desarrollador podrá publicar actualizaciones, correcciones y mejoras.
                Cuando exista un cambio relevante en el funcionamiento o tratamiento de
                datos, se informará mediante la aplicación, el sitio web o los canales de
                contacto disponibles.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Datos cargados por el usuario
              </h2>
              <p className="mt-2">
                El usuario es responsable por la información que registra dentro de Mi
                Almacén.
              </p>
              <p className="mt-2">
                Cuando cargue datos de clientes, proveedores u otras personas —por ejemplo
                nombres, teléfonos, saldos o movimientos— deberá hacerlo de forma legítima
                y conforme a la normativa aplicable de protección de datos personales.
              </p>
              <p className="mt-2">
                El tratamiento de los datos dentro de la aplicación se explica en la
                Política de Privacidad de Mi Almacén.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Limitación razonable de responsabilidad
              </h2>
              <p className="mt-2">
                Mi Almacén se distribuye como producto en etapa de prueba. El usuario
                acepta utilizarla bajo su propio criterio y verificar los datos
                importantes antes de tomar decisiones comerciales, financieras o
                administrativas basadas en la información registrada.
              </p>
              <p className="mt-2">
                El Desarrollador no será responsable por pérdidas derivadas de errores de
                carga, uso incorrecto de la aplicación, pérdida del dispositivo, acceso no
                autorizado causado por credenciales compartidas por el usuario, fallas de
                conexión o cambios realizados en la configuración de seguridad del
                dispositivo por decisión del usuario.
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
                Esta página puede utilizar Google Analytics únicamente luego de que el
                visitante acepte el aviso de cookies del sitio.
              </p>
              <p className="mt-2">
                La información sobre cookies, analítica web y preferencias del navegador
                se encuentra disponible en la{" "}
                <Link
                  href="/cookies"
                  className="text-accent-bright underline underline-offset-2"
                >
                  Política de Cookies de {siteConfig.name}
                </Link>
                .
              </p>
              <p className="mt-2">
                Esta sección se refiere únicamente al sitio web. La aplicación Mi Almacén
                tiene su propia Política de Privacidad.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Documentos relacionados
              </h2>
              <p className="mt-2">
                Antes de utilizar Mi Almacén, recomendamos leer también:
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  · Términos y Condiciones de Uso de Mi Almacén [PENDIENTE: publicar].
                </li>
                <li>· Política de Privacidad de Mi Almacén [PENDIENTE: publicar].</li>
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
                Ante cualquier consulta, problema de instalación o sugerencia sobre la
                aplicación, podés comunicarte con:
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
              prueba de Mi Almacén. El uso de la aplicación una vez instalada también se
              rige por sus Términos de Uso y Política de Privacidad.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
