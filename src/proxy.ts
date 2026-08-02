import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

// Las cookies SameSite=Lax ya bloquean la mayoria de los POST/PATCH
// cross-site, pero se agrega un chequeo explicito de Origin como segunda
// capa: cualquier metodo mutante contra las APIs privadas debe declarar un
// Origin igual a este mismo host (los navegadores modernos siempre mandan
// Origin en requests "unsafe", same-origin incluido).
function isBlockedCrossOrigin(request: NextRequest): boolean {
  if (!request.nextUrl.pathname.startsWith("/api/")) return false;
  if (SAFE_METHODS.has(request.method)) return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host !== request.nextUrl.host;
  } catch {
    return true;
  }
}

// Chequeo liviano de Edge: solo mira si la cookie existe, para redirigir
// temprano sin renderizar nada. La verificacion real (firma, revocacion,
// existencia en adminUsers) corre en el layout de /admin y en cada Route
// Handler privado, via getSessionAdmin() (server-only, requiere Node.js).
export function proxy(request: NextRequest) {
  if (isBlockedCrossOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

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
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"],
};
