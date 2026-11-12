import { renderOgImage } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sobre DelgadoDev: desarrollo web en Mendoza";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Sobre DelgadoDev",
    subtitle: "Desarrollo web y apps a medida en Mendoza",
  });
}
