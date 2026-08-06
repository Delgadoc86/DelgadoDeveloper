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
      {
        source: "/proyectos/presufacil",
        destination: "/proyectos/presupdf",
        permanent: true,
      },
      {
        source: "/descargar/presufacil",
        destination: "/descargar/presupdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
