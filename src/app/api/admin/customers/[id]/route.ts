import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { normalizePhoneForWhatsapp } from "@/lib/phone";
import { CUSTOMER_STATUSES, CUSTOMER_TYPES } from "@/types/customer";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const { id } = await params;
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const businessName =
    typeof body?.businessName === "string" ? body.businessName.trim() : "";
  const phoneRaw = typeof body?.phoneRaw === "string" ? body.phoneRaw.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const taxId = typeof body?.taxId === "string" ? body.taxId.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const type = body?.type;
  const status = body?.status;
  const productIds = Array.isArray(body?.productIds)
    ? body.productIds.filter((value: unknown) => typeof value === "string")
    : [];

  if (!name) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }
  if (!phoneRaw) {
    return NextResponse.json({ error: "El teléfono es obligatorio" }, { status: 400 });
  }
  if (!CUSTOMER_TYPES.includes(type)) {
    return NextResponse.json({ error: "Tipo de cliente inválido" }, { status: 400 });
  }
  if (!CUSTOMER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const docRef = getAdminDb().collection("customers").doc(id);
  const existing = await docRef.get();
  if (!existing.exists) {
    return NextResponse.json({ error: "El cliente no existe" }, { status: 404 });
  }

  await docRef.update({
    name,
    businessName: businessName || null,
    phoneRaw,
    phone: normalizePhoneForWhatsapp(phoneRaw),
    email: email || null,
    taxId: taxId || null,
    notes: notes || null,
    type,
    status,
    productIds,
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true });
}
