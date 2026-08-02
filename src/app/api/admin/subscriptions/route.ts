import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { logAuditEvent } from "@/lib/audit-log";
import { SUBSCRIPTION_FREQUENCIES, SUBSCRIPTION_STATUSES } from "@/types/subscription";

export async function POST(request: NextRequest) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const body = await request.json().catch(() => null);
  const customerId = typeof body?.customerId === "string" ? body.customerId : "";
  const productId = typeof body?.productId === "string" ? body.productId : "";
  const amount = typeof body?.amount === "number" && body.amount > 0 ? body.amount : null;
  const frequency = body?.frequency;
  const nextDueDate = typeof body?.nextDueDate === "string" ? body.nextDueDate : "";
  const status = body?.status ?? "activa";

  if (!customerId) {
    return NextResponse.json({ error: "El cliente es obligatorio" }, { status: 400 });
  }
  if (!productId) {
    return NextResponse.json({ error: "El producto es obligatorio" }, { status: 400 });
  }
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

  const db = getAdminDb();
  const [customerDoc, productDoc] = await Promise.all([
    db.collection("customers").doc(customerId).get(),
    db.collection("products").doc(productId).get(),
  ]);
  if (!customerDoc.exists) {
    return NextResponse.json({ error: "El cliente no existe" }, { status: 404 });
  }
  if (!productDoc.exists) {
    return NextResponse.json({ error: "El producto no existe" }, { status: 404 });
  }

  const docRef = db.collection("subscriptions").doc();
  await docRef.set({
    customerId,
    productId,
    amount,
    frequency,
    nextDueDate,
    status,
    lastPaymentAt: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: result.admin.uid,
    updatedBy: result.admin.uid,
  });

  await logAuditEvent(db, {
    actorUid: result.admin.uid,
    action: "subscription.create",
    targetCollection: "subscriptions",
    targetId: docRef.id,
    details: { customerId, productId, amount },
  });

  return NextResponse.json({ ok: true, id: docRef.id });
}
