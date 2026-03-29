import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export default function getFirebaseConfig(): Firestore | null {
  const apiKey: string | null = localStorage.getItem("fireabse.apiKey");
  const projectId: string | null = localStorage.getItem("fireabse.projectId");

  if (!projectId || !apiKey) return null;

  const firebaseConfig = {
    apiKey: apiKey,
    projectId: projectId,
  };

  const app: FirebaseApp =
    getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}
