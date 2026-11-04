// Lee las variables de entorno de Supabase y avisa claramente si faltan.
// Se usan nombres NEXT_PUBLIC_ porque el navegador también las necesita.
// Son claves públicas: la seguridad real la dan el login y RLS en la base de datos.

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Faltan variables de entorno de Supabase. Revisa NEXT_PUBLIC_SUPABASE_URL y " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY en .env.local (local) o en Vercel (producción).",
    );
  }

  return { url, publishableKey };
}
