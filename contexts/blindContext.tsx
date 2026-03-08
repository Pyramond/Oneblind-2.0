"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase-config";

type BlindContextType = {
  blindStructures: BlindStructure[];
  addBlindStructure: (structure: BlindStructure) => void;
  removeBlindStructure: (id: string) => void;
  update: () => Promise<void>;
};

const BlindContext = createContext<BlindContextType | null>(null);

export function BlindProvider({ children }: { children: ReactNode }) {
  const [blindStructures, setBlindStructures] = useState<BlindStructure[]>([]);

  async function addBlindStructure(structure: BlindStructure) {
    try {
      await addDoc(collection(db, "blind_structures"), {
        name: structure.name,
        steps: structure.steps,
      });
      await update();
    } catch (error) {
      console.error("Error :", error);
    }
  }

  function removeBlindStructure(id: string) {}

  async function update() {
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
  }

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <BlindContext.Provider
      value={{
        blindStructures,
        addBlindStructure,
        removeBlindStructure,
        update,
      }}
    >
      {children}
    </BlindContext.Provider>
  );
}

export function useBlinds() {
  const context = useContext(BlindContext);

  if (!context) {
    throw new Error("useBlinds must be used inside BlindProvider");
  }

  return context;
}
