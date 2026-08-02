import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { calculateNextDueDate } from "@/lib/subscriptions";
import { formatReceiptNumber } from "@/lib/receipt-number";

// Transaccion critica (Etapa 6): valida sesion/datos, incrementa el contador
// anual, crea el pago->emitido, crea el comprobante inmutable, actualiza la
// suscripcion si corresponde, y deja un registro de auditoria — todo o nada.
// Si algo falla (contencion del contador, dato inconsistente), Firestore
// aborta la transaccion completa: no queda ningun pago ni comprobante a
// medio crear.
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id: paymentId } = await params;
  const db = getAdminDb();
  const paymentRef = db.collection("payments").doc(paymentId);
  const year = new Date().getFullYear();
  const counterRef = db.collection("counters").doc(String(year));
  const receiptRef = db.collection("receipts").doc();
  const auditLogRef = db.collection("auditLogs").doc();

  try {
    const receiptNumber = await db.runTransaction(async (tx) => {
      const paymentSnap = await tx.get(paymentRef);
      if (!paymentSnap.exists) {
        throw new Error("PAYMENT_NOT_FOUND");
      }
      const payment = paymentSnap.data()!;
      if (payment.status !== "registrado") {
        throw new Error("PAYMENT_NOT_REGISTRADO");
      }

      const customerSnap = await tx.get(
        db.collection("customers").doc(payment.customerId),
      );
      if (!customerSnap.exists) {
        throw new Error("CUSTOMER_NOT_FOUND");
      }
      const customer = customerSnap.data()!;

      const subscriptionRef = payment.subscriptionId
        ? db.collection("subscriptions").doc(payment.subscriptionId)
        : null;
      const subscriptionSnap = subscriptionRef ? await tx.get(subscriptionRef) : null;

      const counterSnap = await tx.get(counterRef);
      const nextSequence = (counterSnap.data()?.lastNumber ?? 0) + 1;
      const number = formatReceiptNumber(year, nextSequence);

      tx.set(counterRef, { year, lastNumber: nextSequence }, { merge: true });

      tx.set(receiptRef, {
        number,
        paymentId,
        customerSnapshot: {
          name: customer.name,
          businessName: customer.businessName ?? null,
          taxId: customer.taxId ?? null,
          phone: customer.phone ?? null,
          email: customer.email ?? null,
        },
        amount: payment.amount,
        concept: payment.concept,
        period: payment.period,
        method: payment.method,
        issuedAt: FieldValue.serverTimestamp(),
        issuedBy: result.admin.uid,
        voided: false,
        voidedAt: null,
        voidedBy: null,
        voidReason: null,
      });

      tx.update(paymentRef, {
        status: "emitido",
        receiptId: receiptRef.id,
        updatedAt: FieldValue.serverTimestamp(),
        updatedBy: result.admin.uid,
      });

      if (subscriptionRef && subscriptionSnap?.exists) {
        const subscription = subscriptionSnap.data()!;
        if (subscription.frequency !== "unico") {
          const nextDueDate = calculateNextDueDate(
            new Date(subscription.nextDueDate),
            subscription.frequency,
          );
          tx.update(subscriptionRef, {
            nextDueDate: nextDueDate.toISOString().slice(0, 10),
            lastPaymentAt: FieldValue.serverTimestamp(),
            status: "activa",
            updatedAt: FieldValue.serverTimestamp(),
            updatedBy: result.admin.uid,
          });
        }
      }

      tx.set(auditLogRef, {
        actorUid: result.admin.uid,
        action: "receipt.issue",
        targetCollection: "receipts",
        targetId: receiptRef.id,
        timestamp: FieldValue.serverTimestamp(),
        details: { paymentId, number, amount: payment.amount },
      });

      return number;
    });

    return NextResponse.json({
      ok: true,
      receiptId: receiptRef.id,
      number: receiptNumber,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "PAYMENT_NOT_FOUND") {
      return NextResponse.json({ error: "El pago no existe" }, { status: 404 });
    }
    if (message === "PAYMENT_NOT_REGISTRADO") {
      return NextResponse.json(
        { error: "Este pago ya tiene un comprobante emitido o está anulado" },
        { status: 409 },
      );
    }
    if (message === "CUSTOMER_NOT_FOUND") {
      return NextResponse.json(
        { error: "El cliente del pago no existe" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "No se pudo emitir el comprobante, intentá de nuevo" },
      { status: 500 },
    );
  }
}
