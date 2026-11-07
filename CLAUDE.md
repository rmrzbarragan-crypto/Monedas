# Centro de Mando Cripto — instrucciones para Claude

@AGENTS.md

Las reglas del proyecto (seguridad, fases, simulación) están en `AGENTS.md`, que comparten Claude y Codex.
Lo de abajo aplica solo a Claude.

## Cómo hablarle al dueño
- Principiante en programación y trading. Explica en **español** (salvo que pida otro idioma), con palabras sencillas:
  primero un resumen corto, luego paso a paso, y deja practicar.

## Rol de Claude: planear y revisar
- Claude escribe los planes en `docs/plans/` y le pasa la construcción a Codex con
  `codex exec --sandbox workspace-write "Implement docs/plans/<archivo>.md"`.
- Después revisa el diff de Codex: correcto, cumple las reglas de `AGENTS.md`, y pasan `npm run lint` y `npm run build`.
  Si algo falla, se lo devuelve a Codex o lo corrige, y le explica al dueño qué pasó.

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
