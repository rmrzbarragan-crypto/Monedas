# Centro de Mando Cripto — instrucciones para Claude

@AGENTS.md

## Sobre el dueño
- Principiante en programación y trading. Explica todo en **español**, con palabras sencillas:
  primero un resumen corto, luego paso a paso, y deja practicar.
- Propósito: APRENDER y PROTEGER el dinero. Paper trading (simulado). Cero dinero real.
- Trabaja por fases (ver README.md). Termina una fase, muéstrala y espera aprobación antes de la siguiente.

## Decisiones fijas (no cambiar sin preguntar)
- Solo monedas del top 100 por capitalización. Datos: CoinGecko (plan Demo gratis).
- **Nunca** escribir código que ejecute operaciones reales en un exchange sin aprobación explícita por escrito.
- Si algún día se conecta un exchange: claves sin permiso de retiro y con lista de IPs permitidas.

## Seguridad
- Ningún secreto en GitHub. Todo en variables de entorno (Vercel / Supabase). `.env*` está en `.gitignore`.
- La clave `service_role` / `sb_secret_...` es solo de servidor: **nunca** en código de navegador ni con prefijo `NEXT_PUBLIC_`.
- RLS activado en **todas** las tablas de Supabase.
- El dashboard requiere login (Supabase Auth); el registro público está desactivado.

## Reglas fijas de trabajo
1. **Cambios de esquema** solo mediante archivos de migración en `supabase/migrations/`.
   Se aplican primero a **DEV**; a **producción** solo con aprobación del dueño.
2. **Antes de cualquier migración a producción**, confirma que existe un respaldo (backup)
   o recuperación a un punto en el tiempo (PITR). Si no existe, avisa y no sigas.
3. **Busca tú mismo** IDs de proyecto, URLs, claves públicas y estado de despliegues con la CLI o MCP
   (`vercel`, `supabase`, servidores MCP). No le pidas al dueño que los pegue.
4. **Despliegues de vista previa (preview): libres.** Despliegues a **producción**
   (`vercel --prod`, `vercel promote`) necesitan un "sí" del dueño.
5. Servidores MCP: `supabase-prod` es de **solo lectura**; las escrituras van por `supabase-dev`.
