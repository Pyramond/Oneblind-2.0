import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { DbAction, DbCollection, Log } from "@/interfaces/log.interface";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

async function log(
  col: DbCollection,
  action: DbAction,
  info?: string,
): Promise<void> {
  const db = getFirebaseConfig();
  if (!db) return;

  try {
    await addDoc(collection(db, "logs"), {
      action: action,
      collection: col,
      creationDate: Timestamp.fromDate(new Date()),
      info,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function getLogs(count?: number): Promise<Log[]> {
  const db = getFirebaseConfig();
  if (!db) return [];

  try {
    const q = count
      ? query(collection(db, "logs"), orderBy("creationDate", "desc"), limit(count))
      : query(collection(db, "logs"), orderBy("creationDate", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      date: doc.data().creationDate,
      action: doc.data().action as DbAction,
      collection: doc.data().collection as DbCollection,
      info: doc.data().info,
    }));
  } catch (err) {
    console.error("Error fetching logs:", err);
    return [];
  }
}

export { log, getLogs };
