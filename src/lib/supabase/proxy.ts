import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "./env";

// Páginas que se pueden ver SIN haber iniciado sesión.
const PUBLIC_PATHS = ["/login"];

// Se ejecuta antes de cada página:
// 1. Renueva la sesión si está por vencer (y guarda las cookies nuevas).
// 2. Si no hay sesión, manda a /login.
// 3. Si ya hay sesión y vas a /login, te manda al inicio.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseEnv();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        // Cabeceras anti-caché que manda Supabase para que nadie guarde tu sesión.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // IMPORTANTE: no poner código entre createServerClient y getClaims().
  // getClaims() verifica la firma del token de sesión.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims?.sub);

  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((p) => path === p || path.startsWith(`${p}/`));

  if (!isLoggedIn && !isPublic) {
    return redirectKeepingCookies(request, response, "/login");
  }

  if (isLoggedIn && path === "/login") {
    return redirectKeepingCookies(request, response, "/");
  }

  return response;
}

// Redirige sin perder las cookies de sesión que Supabase acaba de renovar.
function redirectKeepingCookies(request: NextRequest, from: NextResponse, to: string) {
  const target = request.nextUrl.clone();
  target.pathname = to;
  target.search = "";
  const redirect = NextResponse.redirect(target);
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  from.headers.forEach((value, key) => {
    if (key.toLowerCase() === "cache-control" || key.toLowerCase() === "expires" || key.toLowerCase() === "pragma") {
      redirect.headers.set(key, value);
    }
  });
  return redirect;
}
