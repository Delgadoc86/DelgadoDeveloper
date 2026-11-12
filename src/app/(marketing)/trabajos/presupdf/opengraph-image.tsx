import { renderOgImage } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Caso PresuPDF: app de presupuestos en PDF";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Caso PresuPDF: app de presupuestos en PDF",
    subtitle: "Web app + PWA para oficios y pymes · +500 usuarios",
  });
}
