import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants";

export interface SessionAdmin {
  uid: string;
  email: string;
  displayName?: string;
  role: string;
}

// Verifica firma + revocacion de la cookie contra Firebase Auth y confirma
// que el UID siga en adminUsers; nunca confia solo en que la cookie exista
// (eso lo chequea proxy.ts, que corre en Edge y no puede llamar Admin SDK).
// cache() dedupe entre layout y page dentro del mismo request.
export const getSessionAdmin = cache(async (): Promise<SessionAdmin | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    const adminDoc = await getAdminDb().collection("adminUsers").doc(decoded.uid).get();
    if (!adminDoc.exists) return null;

    const data = adminDoc.data();
    return {
      uid: decoded.uid,
      email: decoded.email ?? data?.email ?? "",
      displayName: data?.displayName,
      role: data?.role ?? "owner",
    };
  } catch {
    return null;
  }
});
