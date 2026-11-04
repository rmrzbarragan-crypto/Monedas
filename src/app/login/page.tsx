import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-3xl" aria-hidden>
            🛰️
          </p>
          <h1 className="mt-2 text-2xl font-bold">Centro de Mando Cripto</h1>
          <p className="mt-1 text-sm text-muted">Acceso privado. Solo simulación, cero dinero real.</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
