import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // Satori (the renderer behind ImageResponse) can't resolve relative /public
  // URLs at render time, so the logo is inlined as a base64 data URI instead.
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
      <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>
        Construyo productos web que generan resultados reales.
      </span>
    </div>,
    { ...size },
  );
}
