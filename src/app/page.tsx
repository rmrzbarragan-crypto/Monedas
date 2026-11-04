import { requireUser } from "@/lib/auth";
import { signOut } from "./login/actions";

// Pantallas planeadas y la fase en la que se construyen.
const SCREENS = [
  { name: "Inicio", desc: "Resumen del día, alertas activas y resumen del Analista.", phase: 2 },
  { name: "Señales", desc: "Monedas detectadas, gráfica, motivo y nivel de riesgo.", phase: 2 },
  { name: "Cartera simulada", desc: "Posiciones, ganancias después de comisiones y máxima caída.", phase: 3 },
  { name: "Diario", desc: "Por qué entro, stop-loss, objetivo y qué pasó.", phase: 3 },
  { name: "Mentor", desc: "Lecciones semanales y tu progreso.", phase: 4 },
  { name: "Ideas", desc: "Bandeja de ideas organizada.", phase: 4 },
];

export default async function HomePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-bold">Centro de Mando Cripto</h1>
          <p className="truncate text-sm text-muted">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="h-10 shrink-0 rounded-lg border border-border px-3 text-sm font-medium hover:bg-surface"
          >
            Salir
          </button>
        </form>
      </header>

      <section className="mb-6 rounded-2xl border border-accent/40 bg-accent/10 p-4">
        <p className="font-semibold">✅ Fase 0 lista: login funcionando</p>
        <p className="mt-1 text-sm text-muted">
          Si ves esta pantalla, el inicio de sesión con Supabase y el despliegue funcionan. Modo:
          simulación (paper trading). Ninguna operación real.
        </p>
      </section>

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Próximas pantallas</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {SCREENS.map((s) => (
          <li key={s.name} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{s.name}</span>
              <span className="rounded-full bg-muted/15 px-2 py-0.5 text-xs text-muted">Fase {s.phase}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
