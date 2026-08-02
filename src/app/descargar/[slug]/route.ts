import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = await getAdminDb().collection("apps").doc(slug).get();

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
