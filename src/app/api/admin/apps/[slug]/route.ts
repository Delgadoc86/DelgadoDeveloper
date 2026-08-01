import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { APP_PLATFORMS, APP_STATUSES } from "@/types/app";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { slug } = await params;
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const version = typeof body?.version === "string" ? body.version.trim() : "";
  const downloadUrl =
    typeof body?.downloadUrl === "string" ? body.downloadUrl.trim() : "";
  const status = body?.status;
  const platform = body?.platform;

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (!version) {
    return NextResponse.json({ error: "La versión es obligatoria" }, { status: 400 });
  }
  if (!downloadUrl.startsWith("https://")) {
    return NextResponse.json(
      { error: "El enlace debe empezar con https://" },
      { status: 400 },
    );
  }
  if (!APP_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }
  if (!APP_PLATFORMS.includes(platform)) {
    return NextResponse.json({ error: "Plataforma inválida" }, { status: 400 });
  }

  const docRef = getAdminDb().collection("apps").doc(slug);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "La aplicación no existe" }, { status: 404 });
  }

  await docRef.update({
    name,
    version,
    downloadUrl,
    status,
    platform,
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true });
}
