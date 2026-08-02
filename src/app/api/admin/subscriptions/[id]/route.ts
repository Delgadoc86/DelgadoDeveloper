import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { SUBSCRIPTION_FREQUENCIES, SUBSCRIPTION_STATUSES } from "@/types/subscription";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const amount = typeof body?.amount === "number" && body.amount > 0 ? body.amount : null;
  const frequency = body?.frequency;
  const nextDueDate = typeof body?.nextDueDate === "string" ? body.nextDueDate : "";
  const status = body?.status;

  if (amount === null) {
    return NextResponse.json({ error: "El importe debe ser mayor a 0" }, { status: 400 });
  }
  if (!SUBSCRIPTION_FREQUENCIES.includes(frequency)) {
    return NextResponse.json({ error: "Frecuencia inválida" }, { status: 400 });
  }
  if (!nextDueDate || Number.isNaN(Date.parse(nextDueDate))) {
    return NextResponse.json({ error: "Próximo vencimiento inválido" }, { status: 400 });
  }
  if (!SUBSCRIPTION_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const docRef = getAdminDb().collection("subscriptions").doc(id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "La suscripción no existe" }, { status: 404 });
  }

  await docRef.update({
    amount,
    frequency,
    nextDueDate,
    status,
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true });
}
