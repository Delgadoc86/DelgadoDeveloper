"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/firebase/client";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        setError("Credenciales inválidas");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Credenciales inválidas");
      setLoading(false);
    }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      // No se distingue el error acá a propósito: mostrar el mismo mensaje
      // de "enviado" exista o no la cuenta evita revelar qué correos están
      // dados de alta como admin.
    } finally {
      setResetSent(true);
      setLoading(false);
    }
  }

  function backToLogin() {
    setMode("login");
    setError(null);
    setResetSent(false);
  }

  return (
    <div className="relative mx-auto mt-16 flex w-full max-w-sm flex-col px-4 sm:mt-24">
      <div
        aria-hidden
        className="bg-accent/25 pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="border-border bg-background-subtle relative flex flex-col gap-6 rounded-2xl border p-8 shadow-xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/assets/icons/logo-mark.png"
            alt=""
            width={48}
            height={48}
            className="size-12"
          />
          <div>
            <h1 className="text-foreground text-xl font-semibold">DelgadoDev Gestión</h1>
            <p className="text-foreground-muted text-sm">
              {mode === "login" ? "Panel privado de administración" : "Recuperar acceso"}
            </p>
          </div>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              Correo
              <div className="relative">
                <Mail className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                  className="border-border bg-background w-full rounded-lg border py-2.5 pr-3 pl-10 text-sm"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              Contraseña
              <div className="relative">
                <Lock className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-border bg-background w-full rounded-lg border py-2.5 pr-10 pl-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="text-foreground-muted absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError(null);
              }}
              className="text-accent-bright self-end text-xs hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>

            {error && (
              <p role="alert" className="text-sm text-[#d03b3b]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            {resetSent ? (
              <p className="text-foreground-muted text-sm">
                Si <strong className="text-foreground">{email}</strong> tiene una cuenta
                acá, te llegó un correo con instrucciones para restablecer tu contraseña.
              </p>
            ) : (
              <>
                <p className="text-foreground-muted text-sm">
                  Ingresá tu correo y te mandamos un link para restablecer tu contraseña.
                </p>
                <label className="flex flex-col gap-1.5 text-sm">
                  Correo
                  <div className="relative">
                    <Mail className="text-foreground-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      autoFocus
                      autoComplete="username"
                      className="border-border bg-background w-full rounded-lg border py-2.5 pr-3 pl-10 text-sm"
                    />
                  </div>
                </label>
              </>
            )}

            {error && (
              <p role="alert" className="text-sm text-[#d03b3b]">
                {error}
              </p>
            )}

            {!resetSent && (
              <button
                type="submit"
                disabled={loading}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar link de recuperación"}
              </button>
            )}

            <button
              type="button"
              onClick={backToLogin}
              className="text-foreground-muted flex items-center justify-center gap-1 text-xs hover:underline"
            >
              <ArrowLeft className="size-3" /> Volver al inicio de sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
