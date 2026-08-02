import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_GESTION_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_GESTION_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_GESTION_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_GESTION_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_GESTION_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_GESTION_APP_ID,
};

const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);

// App Check es opcional a proposito: se activa solo si existe un site key de
// reCAPTCHA v3 (Cristian lo carga en Firebase Console → App Check). Sin la
// env var, todo sigue funcionando igual, solo sin esta capa extra.
const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_GESTION_APPCHECK_SITE_KEY;
if (typeof window !== "undefined" && appCheckSiteKey) {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
