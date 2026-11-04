import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind (estilos) se procesa con Turbopack, el compilador de Next.js.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Cabeceras de seguridad básicas para todas las páginas.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Impide que otra web meta el dashboard dentro de un <iframe> (clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          // El navegador no debe "adivinar" tipos de archivo.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No compartir la URL completa con otros sitios.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Que buscadores no indexen el dashboard privado.
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
