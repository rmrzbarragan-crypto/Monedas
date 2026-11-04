# 🛰️ Centro de Mando Cripto

Dashboard personal para **aprender** y **monitorear** criptomonedas del top 100, con agentes de IA.
Modo: **alertas + operaciones simuladas (paper trading)**. Cero dinero real.

> ⚠️ Este proyecto **no** contiene ni debe contener código que ejecute operaciones reales en un exchange
> sin aprobación explícita y por escrito del dueño.

## Tecnología

| Pieza | Para qué |
|---|---|
| **Next.js 16** (en Vercel) | El dashboard que ves en el navegador/celular |
| **Supabase** | Base de datos, login (Auth) y tareas programadas (pg_cron + Edge Functions) |
| **GitHub** | Guarda el código. Vercel se actualiza solo cuando se sube código nuevo |
| **CoinGecko API (plan Demo gratis)** | Precios y volumen. Límite: 10,000 llamadas/mes y 30/minuto |

## Fases

- [x] **Fase 0** — Repo, proyecto en Supabase, despliegue en Vercel con login
- [ ] **Fase 1** — Tablas en Supabase + Agente Escáner (cada 15 min)
- [ ] **Fase 2** — Dashboard: Inicio y Señales
- [ ] **Fase 3** — Guardián de Riesgo + Cartera simulada + Diario
- [ ] **Fase 4** — Agentes con IA (Analista, Mentor, Organizador de Ideas)
- [ ] **Fase 5** — Reporte de evaluación

---

## Guía de instalación (Fase 0)

### Paso 1 — Crear el proyecto en Supabase

1. Entra a <https://supabase.com/dashboard> → **New project**.
2. Nombre: `centro-de-mando-cripto`. Región: **East US (North Virginia)**.
3. Crea una **contraseña de base de datos** fuerte y guárdala en tu gestor de contraseñas
   (no la pegues en ningún archivo del proyecto).
4. Plan: **Free**. Espera ~2 minutos a que termine de crearse.

### Paso 2 — Cerrar el registro (solo tú puedes entrar)

1. Supabase → **Authentication → Sign In / Providers**.
2. Desactiva **"Allow new users to sign up"** y guarda.
3. En **Email**, deja activado el proveedor de correo (Email provider).

### Paso 3 — Crear tu usuario

1. Supabase → **Authentication → Users → Add user → Create new user**.
2. Escribe tu correo y una contraseña fuerte. Marca **"Auto Confirm User"**.

### Paso 4 — Copiar las claves públicas

1. Supabase → **Project Settings → Data API**: copia la **Project URL**.
2. Supabase → **Project Settings → API Keys**: copia la **Publishable key** (`sb_publishable_...`).

> 🔐 La *Publishable key* es pública por diseño (el navegador la usa). La protección real la dan
> el login y RLS. La **Secret key** (`sb_secret_...`) **nunca** va en el código ni en variables `NEXT_PUBLIC_`.

### Paso 5 — Desplegar en Vercel

1. Entra a <https://vercel.com/new> → importa el repositorio **Monedas** de GitHub.
2. Framework: Next.js (lo detecta solo).
3. En **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = la Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = la Publishable key
4. Click en **Deploy**. Al terminar, abre la URL que te da Vercel.

### Paso 6 — Probar

1. Abre la URL de Vercel → debe mandarte a **/login**.
2. Entra con el correo y contraseña del Paso 3 → verás "✅ Fase 0 lista".
3. Prueba una contraseña equivocada → debe decir "Correo o contraseña incorrectos".
4. Click en **Salir** → vuelves al login. Si intentas abrir `/` de nuevo, te regresa al login.

---

## Desarrollo local (opcional)

```bash
npm install
cp .env.example .env.local   # y llena los valores
npm run dev                   # abre http://localhost:3000
```

## Seguridad

- Ningún secreto en GitHub: `.env*` está en `.gitignore` (excepto `.env.example`, que no tiene valores reales).
- El registro de usuarios está cerrado; no existe pantalla de "crear cuenta".
- Doble protección del login: `src/proxy.ts` (antes de cada página) + `requireUser()` dentro de cada página privada.
- Todas las tablas de Supabase tendrán **RLS** activado (desde la Fase 1).
- Si algún día se conecta un exchange: claves **sin permiso de retiro** y con **lista de IPs permitidas**.

## Estructura

```
src/
  proxy.ts                 "Portero": redirige a /login si no hay sesión
  lib/auth.ts              requireUser(): segunda revisión de sesión en cada página
  lib/supabase/            Conexión con Supabase (servidor y proxy)
  app/login/               Pantalla de login y acciones (entrar / salir)
  app/page.tsx             Inicio (protegido)
```
