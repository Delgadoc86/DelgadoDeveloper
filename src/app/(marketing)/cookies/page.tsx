import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { ResetCookiePreference } from "@/components/analytics/reset-cookie-preference";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Qué cookies usa DelgadoDev, para qué, y cómo aceptarlas o rechazarlas.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <p className="text-accent-bright mb-4 font-mono text-sm">Legal</p>
          <h1 className="text-foreground text-4xl font-semibold text-balance sm:text-5xl">
            Política de Cookies
          </h1>
          <p className="text-foreground-muted mt-4 text-sm">
            Última actualización: julio de 2026.
          </p>

          <div className="text-foreground-muted mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="text-foreground text-base font-semibold">
                Qué son las cookies
              </h2>
              <p className="mt-2">
                Son pequeños archivos que un sitio guarda en tu navegador para recordar
                información entre visitas, como preferencias o estadísticas de uso.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Qué cookies usa este sitio
              </h2>
              <p className="mt-2">
                Este sitio no carga ninguna cookie por defecto. Solo si tocás{" "}
                <strong className="text-foreground">Aceptar</strong> en el aviso de
                cookies se activa Google Analytics, que utiliza:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-border border-b">
                      <th className="text-foreground py-2 pr-4 font-medium">Cookie</th>
                      <th className="text-foreground py-2 pr-4 font-medium">Finalidad</th>
                      <th className="text-foreground py-2 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-border border-b">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Distingue usuarios únicos</td>
                      <td className="py-2">2 años</td>
                    </tr>
                    <tr className="border-border border-b">
                      <td className="py-2 pr-4">_ga_*</td>
                      <td className="py-2 pr-4">Mantiene el estado de la sesión</td>
                      <td className="py-2">2 años</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">_gid</td>
                      <td className="py-2 pr-4">Distingue usuarios en el corto plazo</td>
                      <td className="py-2">24 horas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                No uso cookies de terceros con fines publicitarios ni de remarketing.
              </p>
            </div>

            <div>
              <h2 className="text-foreground text-base font-semibold">
                Cómo aceptar o rechazar
              </h2>
              <p className="mt-2">
                Elegís tu preferencia en el aviso que aparece al ingresar al sitio.
                También podés cambiarla en cualquier momento acá abajo, o borrando los
                datos de este sitio desde la configuración de tu navegador.
              </p>
              <div className="mt-4">
                <ResetCookiePreference />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
