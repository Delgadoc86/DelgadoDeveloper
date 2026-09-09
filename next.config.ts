import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.108", // Tu PC
    "192.168.0.*", // Toda tu red local (si tu versión de Next lo soporta)
    "localhost",
    "127.0.0.1",
  ],
  async redirects() {
    return [
      // La sección "Proyectos" pasó a llamarse "Trabajos" (2026-09-08): las
      // rutas viejas /proyectos/[slug] indexadas hasta ahora redirigen a su
      // equivalente en /trabajos/[slug], para no perder el historial. Esta
      // va antes que el redirect genérico de abajo porque "presufacil" no
      // es un slug válido en /trabajos — el destino final correcto es
      // "presupdf" (evita encadenar dos redirects).
      {
        source: "/proyectos/presufacil",
        destination: "/trabajos/presupdf",
        permanent: true,
      },
      {
        source: "/proyectos/:slug",
        destination: "/trabajos/:slug",
        permanent: true,
      },
      // PresuPDF.com.ar es el único sitio oficial de descarga: estas dos
      // rutas ya no deben resolver Firestore ni pasar por Google Drive,
      // sino ir directo al sitio oficial. Se apunta a la URL externa final
      // en ambas (en vez de encadenar presufacil -> presupdf -> externo)
      // para evitar un salto de redirect extra.
      {
        source: "/descargar/presufacil",
        destination: "https://www.presupdf.com.ar/descargar",
        permanent: true,
      },
      {
        source: "/descargar/presupdf",
        destination: "https://www.presupdf.com.ar/descargar",
        permanent: true,
      },
      // Legales históricos de PresuFácil/PresuPDF: los términos y la
      // privacidad oficiales viven ahora únicamente en PresuPDF.com.ar, para
      // no mantener dos fuentes del mismo documento legal.
      {
        source: "/legal/presufacil/terminos-descarga",
        destination: "https://www.presupdf.com.ar/descarga/terminos",
        permanent: true,
      },
      {
        source: "/legal/presufacil/terminos-de-uso",
        destination: "https://www.presupdf.com.ar/terminos",
        permanent: true,
      },
      {
        source: "/legal/presufacil/privacidad",
        destination: "https://www.presupdf.com.ar/privacidad",
        permanent: true,
      },
      {
        source: "/legal/presufacil/eliminar-cuenta",
        destination: "https://www.presupdf.com.ar/eliminar-cuenta",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
