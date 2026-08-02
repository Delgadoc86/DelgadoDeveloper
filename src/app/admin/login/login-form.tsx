"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background-subtle mx-auto mt-24 flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6"
    >
      <h1 className="text-lg font-semibold">DelgadoDev Gestión</h1>

      <label className="flex flex-col gap-1 text-sm">
        Correo
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="username"
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-[#d03b3b]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
