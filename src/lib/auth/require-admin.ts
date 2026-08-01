import "server-only";

import { NextResponse } from "next/server";
import { getSessionAdmin, type SessionAdmin } from "@/lib/auth/session";

type RequireAdminResult = { admin: SessionAdmin } | { error: NextResponse };

// Patron compartido para proteger Route Handlers privados: cada handler
// hace `const result = await requireSessionAdmin(); if ("error" in result)
// return result.error;` antes de tocar datos.
export async function requireSessionAdmin(): Promise<RequireAdminResult> {
  const admin = await getSessionAdmin();
  if (!admin) {
    return { error: NextResponse.json({ error: "No autorizado" }, { status: 401 }) };
  }
  return { admin };
}
