import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { logAuditEvent } from "@/lib/audit-log";
import { PRODUCT_TYPES, PRODUCT_FREQUENCIES } from "@/types/product";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id } = await params;
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
  const active = typeof body?.active === "boolean" ? body.active : null;

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (!PRODUCT_TYPES.includes(type)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }
  if (active === null) {
    return NextResponse.json(
      { error: "Estado activo/inactivo inválido" },
      { status: 400 },
    );
  }

  const docRef = getAdminDb().collection("products").doc(id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "El producto no existe" }, { status: 404 });
  }

  await docRef.update({
    name,
    type,
    suggestedPrice,
    suggestedFrequency,
    active,
    updatedAt: FieldValue.serverTimestamp(),
  });

  await logAuditEvent(getAdminDb(), {
    actorUid: result.admin.uid,
    action: "product.update",
    targetCollection: "products",
    targetId: id,
    details: { active, type },
  });

  return NextResponse.json({ ok: true });
}
