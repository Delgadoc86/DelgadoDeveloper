import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants";

// Chequeo liviano de Edge: solo mira si la cookie existe, para redirigir
// temprano sin renderizar nada. La verificacion real (firma, revocacion,
// existencia en adminUsers) corre en el layout de /admin y en cada Route
// Handler privado, via getSessionAdmin() (server-only, requiere Node.js).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  if (!hasSessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
