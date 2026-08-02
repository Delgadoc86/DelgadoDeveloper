import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { logAuditEvent } from "@/lib/audit-log";
import { PRODUCT_TYPES, PRODUCT_FREQUENCIES } from "@/types/product";

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const type = body?.type;
  const suggestedPrice =
    typeof body?.suggestedPrice === "number" && body.suggestedPrice > 0
      ? body.suggestedPrice
      : null;
  const suggestedFrequency = PRODUCT_FREQUENCIES.includes(body?.suggestedFrequency)
    ? body.suggestedFrequency
    : null;

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (!PRODUCT_TYPES.includes(type)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  const id = slugify(name);
  if (!id) {
    return NextResponse.json(
      { error: "No se pudo generar un ID válido" },
      { status: 400 },
    );
  }

  const docRef = getAdminDb().collection("products").doc(id);
  const existing = await docRef.get();
  if (existing.exists) {
    return NextResponse.json(
      { error: "Ya existe un producto con ese nombre" },
      { status: 409 },
    );
  }

  await docRef.set({
    name,
    type,
    suggestedPrice,
    suggestedFrequency,
    active: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  await logAuditEvent(getAdminDb(), {
    actorUid: result.admin.uid,
    action: "product.create",
    targetCollection: "products",
    targetId: id,
    details: { name, type },
  });

  return NextResponse.json({ ok: true, id });
}
