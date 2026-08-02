// Exporta todas las colecciones de Firestore a un JSON con fecha, para tener
// una copia local antes de cambios grandes o simplemente como backup
// periodico. Uso: node scripts/export-firestore-backup.mjs
//
// Lee las credenciales de .env.local (nunca las commitea). El archivo
// generado va a backups/, que esta en .gitignore por tener datos reales de
// clientes y pagos.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const raw = readFileSync(join(projectRoot, ".env.local"), "utf8");
const env = {};
for (const line of raw.split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (!match) continue;
  let value = match[2];
  if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
  env[match[1]] = value;
}

const app = initializeApp({
  credential: cert({
    projectId: env.FIREBASE_GESTION_ADMIN_PROJECT_ID,
    clientEmail: env.FIREBASE_GESTION_ADMIN_CLIENT_EMAIL,
    privateKey: env.FIREBASE_GESTION_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore(app);

const COLLECTIONS = [
  "adminUsers",
  "apps",
  "customers",
  "products",
  "subscriptions",
  "payments",
  "receipts",
  "counters",
  "auditLogs",
];

const backup = {};
for (const name of COLLECTIONS) {
  const snapshot = await db.collection(name).get();
  backup[name] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(`${name}: ${snapshot.size} documentos`);
}

const backupsDir = join(projectRoot, "backups");
mkdirSync(backupsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outPath = join(backupsDir, `firestore-backup-${timestamp}.json`);
writeFileSync(outPath, JSON.stringify(backup, null, 2), "utf8");

console.log(`\nBackup guardado en ${outPath}`);
process.exit(0);
