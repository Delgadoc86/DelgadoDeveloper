import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/auth/session-constants";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const idToken = typeof body?.idToken === "string" ? body.idToken : null;

  if (!idToken) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 400 });
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const adminDoc = await getAdminDb().collection("adminUsers").doc(decoded.uid).get();
  if (!adminDoc.exists) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 403 });
  }

  const sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
  return response;
}
