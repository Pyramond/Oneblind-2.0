"use client";

import {
  Tournament,
  TournamentParticipation,
} from "@/interfaces/tournament.interface";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase-config";

type TournamentsContextType = {
  tournaments: Array<Tournament>;
  participations: Array<TournamentParticipation>;
  update: () => Promise<void>;
  addTournament: (tournament: Tournament, playerIds: string[]) => Promise<void>;
  removeTournament: (id: string) => Promise<void>;
};

const TournamentContext = createContext<TournamentsContextType | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [participations, setParticipations] = useState<
    TournamentParticipation[]
  >([]);

  const update = async () => {
    const q = query(collection(db, "tournaments"));
    const querySnapshot = await getDocs(q);

    const tournamentsList: Tournament[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      countPoints: doc.data().countPoints,
      blindStructureId: doc.data().blindStructureId,
      startingStack: doc.data().startingStack,
      date: doc.data().date,
    }));

    setTournaments(tournamentsList);
  };

  const addTournament = async (tournament: Tournament, playerIds: string[]) => {
    try {
      const docRef = await addDoc(collection(db, "tournaments"), {
        name: tournament.name,
        countPoints: tournament.countPoints,
        blindStructureId: tournament.blindStructureId,
        startingStack: tournament.startingStack,
        date: Timestamp.fromDate(new Date()),
      });

      for (const id of playerIds) {
        await addDoc(collection(db, "participations"), {
          playerId: id,
          tournamentId: docRef.id,
          rank: 0,
        });
      }

      await update();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const removeTournament = async (id: string) => {};

  useEffect(() => {
    (async () => {
      await update();
    })();
  }, []);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        participations,
        addTournament,
        update,
        removeTournament,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournaments() {
  const context = useContext(TournamentContext);

  if (!context) {
    throw new Error("useTournaments must be used to use");
  }

  return context;
}
