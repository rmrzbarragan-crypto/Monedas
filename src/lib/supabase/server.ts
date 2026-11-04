import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";

// Cliente de Supabase para usar en el SERVIDOR (páginas y acciones).
// Lee la sesión desde las cookies del navegador.
export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Las páginas (Server Components) no pueden escribir cookies.
          // No pasa nada: el proxy (src/proxy.ts) ya renueva la sesión en cada visita.
        }
      },
    },
  });
}
