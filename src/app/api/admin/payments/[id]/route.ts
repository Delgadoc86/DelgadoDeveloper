import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { PAYMENT_METHODS } from "@/types/payment";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id } = await params;
  const docRef = getAdminDb().collection("payments").doc(id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "El pago no existe" }, { status: 404 });
  }
  if (existing.data()!.status !== "registrado") {
    return NextResponse.json(
      {
        error: "Este pago ya tiene un comprobante emitido o anulado y no se puede editar",
      },
      { status: 409 },
    );
  }

  const body = await request.json().catch(() => null);
  const amount = typeof body?.amount === "number" && body.amount > 0 ? body.amount : null;
  const concept = typeof body?.concept === "string" ? body.concept.trim() : "";
  const period = typeof body?.period === "string" ? body.period.trim() : "";
  const method = body?.method;
  const date = typeof body?.date === "string" ? body.date : "";
  const transferReference =
    typeof body?.transferReference === "string" ? body.transferReference.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";

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

  await docRef.update({
    amount,
    concept,
    period,
    method,
    date,
    transferReference: transferReference || null,
    notes: notes || null,
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true });
}
