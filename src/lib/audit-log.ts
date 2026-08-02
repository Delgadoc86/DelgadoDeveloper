import "server-only";

import { FieldValue, type Firestore } from "firebase-admin/firestore";

export async function logAuditEvent(
  db: Firestore,
  entry: {
    actorUid: string;
    action: string;
    targetCollection: string;
    targetId: string;
    details?: Record<string, unknown>;
  },
): Promise<void> {
  await db.collection("auditLogs").add({
    actorUid: entry.actorUid,
    action: entry.action,
    targetCollection: entry.targetCollection,
    targetId: entry.targetId,
    details: entry.details ?? null,
    timestamp: FieldValue.serverTimestamp(),
  });
}
