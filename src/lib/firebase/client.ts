import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
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

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
