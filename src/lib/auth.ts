import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Segunda capa de seguridad: cada página privada llama a esta función.
// Aunque el proxy fallara, la página no se muestra sin una sesión válida.
export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/login");
  }

  return {
    id: data.claims.sub,
    email: (data.claims.email as string | undefined) ?? "",
  };
}
