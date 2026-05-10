import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { DbAction, DbCollection } from "@/interfaces/log.interface";
import { addDoc, collection, Timestamp } from "firebase/firestore";

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

export { log };
