import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { logAuditEvent } from "@/lib/audit-log";
import { calculateNextDueDate } from "@/lib/subscriptions";

// Marca el pago del período actual y avanza el vencimiento, calculado acá
// (server-side), no confiando en nada que mande el cliente. Placeholder
// manual hasta la Etapa 6: cuando exista `payments`, un pago real disparará
// esto mismo en vez de este botón.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id } = await params;
  const docRef = getAdminDb().collection("subscriptions").doc(id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "La suscripción no existe" }, { status: 404 });
  }

  const data = existing.data()!;
  if (data.frequency === "unico") {
    return NextResponse.json(
      { error: "Un pago único no tiene renovación" },
      { status: 400 },
    );
  }

  const currentDueDate = new Date(data.nextDueDate);
  const nextDueDate = calculateNextDueDate(currentDueDate, data.frequency);

  await docRef.update({
    lastPaymentAt: FieldValue.serverTimestamp(),
    nextDueDate: nextDueDate.toISOString().slice(0, 10),
    status: "activa",
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: result.admin.uid,
  });

  await logAuditEvent(getAdminDb(), {
    actorUid: result.admin.uid,
    action: "subscription.renew",
    targetCollection: "subscriptions",
    targetId: id,
    details: { nextDueDate: nextDueDate.toISOString().slice(0, 10) },
  });

  return NextResponse.json({
    ok: true,
    nextDueDate: nextDueDate.toISOString().slice(0, 10),
  });
}
