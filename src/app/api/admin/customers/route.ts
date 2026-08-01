import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireSessionAdmin } from "@/lib/auth/require-admin";
import { normalizePhoneForWhatsapp } from "@/lib/phone";
import { CUSTOMER_TYPES } from "@/types/customer";

export async function POST(request: NextRequest) {
  const result = await requireSessionAdmin();
  if ("error" in result) return result.error;

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const businessName =
    typeof body?.businessName === "string" ? body.businessName.trim() : "";
  const phoneRaw = typeof body?.phoneRaw === "string" ? body.phoneRaw.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const taxId = typeof body?.taxId === "string" ? body.taxId.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const type = body?.type;
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

  const docRef = getAdminDb().collection("customers").doc();
  await docRef.set({
    name,
    businessName: businessName || null,
    phoneRaw,
    phone: normalizePhoneForWhatsapp(phoneRaw),
    email: email || null,
    taxId: taxId || null,
    notes: notes || null,
    type,
    status: "activo",
    productIds,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: result.admin.uid,
    updatedBy: result.admin.uid,
  });

  return NextResponse.json({ ok: true, id: docRef.id });
}
