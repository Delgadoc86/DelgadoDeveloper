import Link from "next/link";
import { getAdminDb } from "@/lib/firebase/admin";
import type { AppRecord } from "@/types/app";
import { AppEditForm } from "./app-edit-form";

export default async function AdminAppsPage() {
  const snapshot = await getAdminDb().collection("apps").orderBy("name").get();

  const apps: AppRecord[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      slug: doc.id,
      name: data.name,
      version: data.version,
      downloadUrl: data.downloadUrl,
      status: data.status,
      platform: data.platform,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
      updatedBy: data.updatedBy,
    };
  });

  return (
    <div className="mx-auto mt-16 flex w-full max-w-lg flex-col gap-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Aplicaciones</h1>
        <Link href="/admin" className="text-sm underline">
          Volver
        </Link>
      </div>

      {apps.map((app) => (
        <AppEditForm key={app.slug} app={app} />
      ))}
    </div>
  );
}
