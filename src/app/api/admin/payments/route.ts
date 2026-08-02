import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { PAYMENT_METHODS } from "@/types/payment";

export async function POST(request: NextRequest) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const body = await request.json().catch(() => null);
  const customerId = typeof body?.customerId === "string" ? body.customerId : "";
  const productId = typeof body?.productId === "string" ? body.productId : "";
  const subscriptionId =
    typeof body?.subscriptionId === "string" ? body.subscriptionId : null;
  const amount = typeof body?.amount === "number" && body.amount > 0 ? body.amount : null;
  const concept = typeof body?.concept === "string" ? body.concept.trim() : "";
  const period = typeof body?.period === "string" ? body.period.trim() : "";
  const method = body?.method;
  const date = typeof body?.date === "string" ? body.date : "";
  const transferReference =
    typeof body?.transferReference === "string" ? body.transferReference.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";

  if (!customerId) {
    return NextResponse.json({ error: "El cliente es obligatorio" }, { status: 400 });
  }
  if (!productId) {
    return NextResponse.json({ error: "El producto es obligatorio" }, { status: 400 });
  }
  if (amount === null) {
    return NextResponse.json({ error: "El importe debe ser mayor a 0" }, { status: 400 });
  }
  if (!concept) {
    return NextResponse.json({ error: "El concepto es obligatorio" }, { status: 400 });
  }
  if (!period) {
    return NextResponse.json({ error: "El período es obligatorio" }, { status: 400 });
  }
  if (!PAYMENT_METHODS.includes(method)) {
    return NextResponse.json({ error: "Medio de pago inválido" }, { status: 400 });
  }
  if (!date || Number.isNaN(Date.parse(date))) {
    return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
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
  if (subscriptionId) {
    const subscriptionDoc = await db
      .collection("subscriptions")
      .doc(subscriptionId)
      .get();
    if (!subscriptionDoc.exists) {
      return NextResponse.json({ error: "La suscripción no existe" }, { status: 404 });
    }
  }

  const docRef = db.collection("payments").doc();
  await docRef.set({
    customerId,
    productId,
    subscriptionId,
    amount,
    concept,
    period,
    method,
    date,
    transferReference: transferReference || null,
    notes: notes || null,
    status: "registrado",
    receiptId: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: result.admin.uid,
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true, id: docRef.id });
}
