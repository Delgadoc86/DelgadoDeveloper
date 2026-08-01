import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const projectId = process.env.FIREBASE_GESTION_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_GESTION_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_GESTION_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Faltan variables de entorno de Firebase Admin (FIREBASE_GESTION_ADMIN_*).",
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

// Inicialización perezosa: getAdminApp() solo corre cuando algo llama a
// getAdminAuth()/getAdminDb() en tiempo de request, no cuando Next.js
// importa este módulo durante el build (evita que falte una env var de
// build tumbe el deploy entero de una ruta que ni siquiera se ejecutó).
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;

export function getAdminAuth(): Auth {
  authInstance ??= getAuth(getAdminApp());
  return authInstance;
}

export function getAdminDb(): Firestore {
  dbInstance ??= getFirestore(getAdminApp());
  return dbInstance;
}
