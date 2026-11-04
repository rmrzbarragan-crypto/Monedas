import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// "Portero" del dashboard: corre antes de cada página (en Next.js 16 se llama Proxy).
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Corre en todas las rutas EXCEPTO archivos estáticos (estilos, imágenes, íconos).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
