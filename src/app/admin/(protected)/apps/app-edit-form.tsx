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
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
    >
      <h2 className="font-semibold">{app.slug}</h2>

      <label className="flex flex-col gap-1 text-sm">
        Nombre
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Versión
        <input
          value={version}
          onChange={(event) => setVersion(event.target.value)}
          required
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
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
            className="flex-1 rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
          />
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded border border-neutral-300 px-3 py-2 text-sm whitespace-nowrap dark:border-neutral-700"
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
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
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
          className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700"
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
            feedback.type === "ok"
              ? "text-sm text-green-600 dark:text-green-400"
              : "text-sm text-red-600 dark:text-red-400"
          }
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-neutral-900"
      >
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
