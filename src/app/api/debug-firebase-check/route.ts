import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function GET() {
  const result: { authOk: boolean; firestoreOk: boolean; error?: string } = {
    authOk: false,
    firestoreOk: false,
  };

  try {
    await adminAuth.getUser("kS3QJVEj9zW4oHWZnYBUbSxYQOx2");
    result.authOk = true;
  } catch (err) {
    result.error = `auth: ${err instanceof Error ? err.message : String(err)}`;
  }

  try {
    await adminDb.collection("adminUsers").limit(1).get();
    result.firestoreOk = true;
  } catch (err) {
    result.error = `${result.error ?? ""} firestore: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json(result);
}
