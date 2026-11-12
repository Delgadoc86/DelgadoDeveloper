import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.108", // Tu PC
    "192.168.0.*", // Toda tu red local (si tu versión de Next lo soporta)
    "localhost",
    "127.0.0.1",
  ],
  images: {
    // La optimización de imágenes de Vercel (/_next/image) tiene una cuota
    // gratis en el plan Hobby; al superarla, Vercel devuelve 402 Payment
    // Required y las imágenes dejan de cargar en todo el sitio. Los assets
    // ya son .webp livianos (28-190 KB), así que se sirven directos como
    // estáticos sin pasar por ese pipeline pago.
    unoptimized: true,
  },
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
      // Las descargas de APK (Mi Almacén y la versión Android de PresuPDF)
      // se discontinuaron en 2026-11: cualquier link viejo a /descargar/*
      // va al sitio oficial de PresuPDF o al home, en vez de dar 404.
      {
        source: "/descargar/:slug(presufacil|presupdf)",
        destination: "https://www.presupdf.com.ar",
        permanent: true,
      },
      {
        source: "/descargar/:path*",
        destination: "/",
        permanent: true,
      },
      // Mi Almacén se discontinuó: su ficha y sus páginas legales redirigen
      // al portfolio para no dejar URLs rotas ya compartidas.
      {
        source: "/trabajos/mi-almacen",
        destination: "/#trabajos",
        permanent: true,
      },
      {
        source: "/legal/mi-almacen/:path*",
        destination: "/",
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
