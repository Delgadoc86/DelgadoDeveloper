import { renderOgImage } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Caso QREvento: álbum QR para eventos en vivo";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Caso QREvento: álbum QR para eventos en vivo",
    subtitle: "Fotos de los invitados en vivo, sin instalar apps",
  });
}
