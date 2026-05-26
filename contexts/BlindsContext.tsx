"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import getFirebaseConfig from "@/utils/firebase/getFirebaseConfig";
import { log } from "@/utils/log";

type BlindContextType = {
  blindStructures: BlindStructure[];
  addBlindStructure: (structure: BlindStructure) => void;
  removeBlindStructure: (id: string) => void;
  getBlindStructureById: (id: string | undefined) => BlindStructure | undefined;
  update: () => Promise<void>;
};

const BlindsContext = createContext<BlindContextType | null>(null);

export function BlindProvider({ children }: { children: ReactNode }) {
  const [blindStructures, setBlindStructures] = useState<BlindStructure[]>([]);

  async function addBlindStructure(structure: BlindStructure): Promise<void> {
    const db = getFirebaseConfig();
    if (!db) return;
    try {
      await addDoc(collection(db, "blind_structures"), {
        name: structure.name,
        steps: structure.steps,
      });
      await update();
      await log("blindStructures", "create", structure.name);
    } catch (error) {
      console.error("Error :", error);
    }
  }

  async function removeBlindStructure(id: string): Promise<void> {
    const db = getFirebaseConfig();
    if (!db) return;
    await deleteDoc(doc(db, "blind_structures", id));
    await log("blindStructures", "delete", id);
    await update();
  }

  function getBlindStructureById(
    id: string | undefined,
  ): BlindStructure | undefined {
    return blindStructures.find((structure) => structure.id === id);
  }

  async function update(): Promise<void> {
    const db = getFirebaseConfig();
    if (!db) return;
    try {
      const q = query(collection(db, "blind_structures"));
      const querySnapshot = await getDocs(q);

      const blindStructuresList: BlindStructure[] = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          name: doc.data().name,
          steps: doc.data().steps,
        }),
      );

      setBlindStructures(blindStructuresList);
    } catch (error) {
      console.error("Error fetching blind structures:", error);
    }
  }

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <BlindsContext.Provider
      value={{
        blindStructures,
        addBlindStructure,
        removeBlindStructure,
        getBlindStructureById,
        update,
      }}
    >
      {children}
    </BlindsContext.Provider>
  );
}

export function useBlinds() {
  const context = useContext(BlindsContext);

  if (!context) {
    throw new Error("useBlinds must be used inside BlindProvider");
  }

  return context;
}
