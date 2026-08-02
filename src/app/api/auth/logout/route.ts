import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants";

export async function POST() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      const decoded = await getAdminAuth().verifySessionCookie(sessionCookie);
      await getAdminAuth().revokeRefreshTokens(decoded.uid);
    } catch {
      // Cookie ya invalida o expirada: no hay nada que revocar.
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return response;
}
