import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

// Slugs públicos que ya no coinciden con el id del documento en Firestore
// (rebranding de cara al usuario sin migrar datos internos ni el historial
// de Analytics, que sigue agrupado bajo el id viejo).
const SLUG_TO_DOC_ID: Record<string, string> = {
  presupdf: "presufacil",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const docId = SLUG_TO_DOC_ID[slug] ?? slug;
  const doc = await getAdminDb().collection("apps").doc(docId).get();

  // Mismo 404 tanto si no existe como si no está publicada: no hay que
  // revelar si un slug existe pero está pausado/en borrador.
  if (!doc.exists || doc.data()?.status !== "published") {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const { downloadUrl } = doc.data() as { downloadUrl: string };

  return NextResponse.redirect(downloadUrl, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
