import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const body = await request.json().catch(() => null);
  const reason = typeof body?.reason === "string" ? body.reason.trim() : "";
  if (!reason) {
    return NextResponse.json(
      { error: "El motivo de anulación es obligatorio" },
      { status: 400 },
    );
  }

  const { id: receiptId } = await params;
  const db = getAdminDb();
  const receiptRef = db.collection("receipts").doc(receiptId);
  const auditLogRef = db.collection("auditLogs").doc();

  try {
    await db.runTransaction(async (tx) => {
      const receiptSnap = await tx.get(receiptRef);
      if (!receiptSnap.exists) {
        throw new Error("RECEIPT_NOT_FOUND");
      }
      const receipt = receiptSnap.data()!;
      if (receipt.voided) {
        throw new Error("ALREADY_VOIDED");
      }

      const paymentRef = db.collection("payments").doc(receipt.paymentId);
      const paymentSnap = await tx.get(paymentRef);
      if (!paymentSnap.exists) {
        throw new Error("PAYMENT_NOT_FOUND");
      }

      tx.update(receiptRef, {
        voided: true,
        voidedAt: FieldValue.serverTimestamp(),
        voidedBy: result.admin.uid,
        voidReason: reason,
      });

      tx.update(paymentRef, {
        status: "anulado",
        updatedAt: FieldValue.serverTimestamp(),
        updatedBy: result.admin.uid,
      });

      tx.set(auditLogRef, {
        actorUid: result.admin.uid,
        action: "receipt.void",
        targetCollection: "receipts",
        targetId: receiptId,
        timestamp: FieldValue.serverTimestamp(),
        details: { reason, paymentId: receipt.paymentId },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "RECEIPT_NOT_FOUND") {
      return NextResponse.json({ error: "El comprobante no existe" }, { status: 404 });
    }
    if (message === "ALREADY_VOIDED") {
      return NextResponse.json(
        { error: "El comprobante ya estaba anulado" },
        { status: 409 },
      );
    }
    if (message === "PAYMENT_NOT_FOUND") {
      return NextResponse.json({ error: "El pago asociado no existe" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "No se pudo anular el comprobante, intentá de nuevo" },
      { status: 500 },
    );
  }
}
