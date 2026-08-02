"use client";

import { useState, type FormEvent } from "react";
import type { AppRecord } from "@/types/app";
import { APP_PLATFORMS, APP_STATUSES } from "@/types/app";

export function AppEditForm({ app }: { app: AppRecord }) {
  const [name, setName] = useState(app.name);
  const [version, setVersion] = useState(app.version);
  const [downloadUrl, setDownloadUrl] = useState(app.downloadUrl);
  const [status, setStatus] = useState(app.status);
  const [platform, setPlatform] = useState(app.platform);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/admin/apps/${app.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, version, downloadUrl, status, platform }),
      });
      const data = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", text: data.error ?? "No se pudo guardar" });
        return;
      }
      setFeedback({ type: "ok", text: "Guardado" });
    } catch {
      setFeedback({ type: "error", text: "Error de red al guardar" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background-subtle flex flex-col gap-3 rounded-lg border p-4"
    >
      <h2 className="font-semibold">{app.slug}</h2>

      <label className="flex flex-col gap-1 text-sm">
        Nombre
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Versión
        <input
          value={version}
          onChange={(event) => setVersion(event.target.value)}
          required
          className="border-border bg-background-subtle rounded border px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Enlace de descarga (Google Drive)
        <div className="flex gap-2">
          <input
            type="url"
            value={downloadUrl}
            onChange={(event) => setDownloadUrl(event.target.value)}
            required
            pattern="https://.*"
            title="Debe empezar con https://"
            className="border-border bg-background-subtle flex-1 rounded border px-3 py-2"
          />
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="border-border bg-background-subtle rounded border px-3 py-2 text-sm whitespace-nowrap"
          >
            Probar
          </a>
        </div>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Estado
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as (typeof APP_STATUSES)[number])
          }
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          {APP_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Plataforma
        <select
          value={platform}
          onChange={(event) =>
            setPlatform(event.target.value as (typeof APP_PLATFORMS)[number])
          }
          className="border-border bg-background-subtle rounded border px-3 py-2"
        >
          {APP_PLATFORMS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {feedback && (
        <p
          role="alert"
          className={
            feedback.type === "ok" ? "text-sm text-[#0ca30c]" : "text-sm text-[#d03b3b]"
          }
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
