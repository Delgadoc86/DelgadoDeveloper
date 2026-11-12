import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

interface OgImageOptions {
  title: string;
  subtitle?: string;
}

/** Imagen Open Graph de 1200x630 con la estética del sitio (fondo oscuro + acento violeta). */
export function renderOgImage({ title, subtitle }: OgImageOptions) {
  // Satori (el renderer de ImageResponse) no resuelve URLs relativas de
  // /public, así que el logo va embebido como data URI.
  const logo = readFileSync(join(process.cwd(), "public/assets/icons/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#0b0c0e",
        color: "#f4f4f5",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={40} height={35} alt="" />
        <span style={{ color: "#9c93f7", fontSize: 28, marginLeft: 12 }}>
          {siteConfig.name}
        </span>
      </div>
      <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
        {title}
      </span>
      {subtitle ? (
        <span style={{ fontSize: 30, color: "#a8a8b3", marginTop: 28, maxWidth: 1000 }}>
          {subtitle}
        </span>
      ) : null}
    </div>,
    { width: 1200, height: 630 },
  );
}
