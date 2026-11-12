import { renderOgImage } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DelgadoDev: desarrollo web y apps a medida en Mendoza";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Desarrollo web y apps a medida en Mendoza",
    subtitle: "Sitios, sistemas y web apps para negocios",
  });
}
