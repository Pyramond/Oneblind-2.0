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
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";

type TournamentsContextType = {
  tournaments: Array<Tournament>;
  participations: Array<TournamentParticipation>;
  update: () => Promise<void>;
  addTournament: (tournament: Tournament, playerIds: string[]) => Promise<void>;
  updateTournament: (
    tournament: Tournament,
    playerIds: string[],
  ) => Promise<void>;
  removeTournament: (id: string) => Promise<void>;
  getTournamentById: (id: string) => Promise<{
    tournament: Tournament | undefined;
    participations: TournamentParticipation[] | undefined;
  }>;
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

    const pQuery = query(collection(db, "participations"));
    const pSnapshot = await getDocs(pQuery);
    const participationsList: TournamentParticipation[] = pSnapshot.docs.map(
      (doc) => ({
        playerId: doc.data().playerId,
        tournamentId: doc.data().tournamentId,
        rank: doc.data().rank,
      }),
    );
    setParticipations(participationsList);
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

  const updateTournament = async (
    tournament: Tournament,
    playerIds: string[],
  ) => {
    try {
      await updateDoc(doc(db, "tournaments", tournament.id!), {
        name: tournament.name,
        countPoints: tournament.countPoints,
        blindStructureId: tournament.blindStructureId,
        startingStack: tournament.startingStack,
      });

      const participationsQuery = query(
        collection(db, "participations"),
        where("tournamentId", "==", tournament.id),
      );
      const participationsSnapshot = await getDocs(participationsQuery);
      for (const participation of participationsSnapshot.docs) {
        await deleteDoc(doc(db, "participations", participation.id));
      }

      for (const id of playerIds) {
        await addDoc(collection(db, "participations"), {
          playerId: id,
          tournamentId: tournament.id,
          rank: 0,
        });
      }

      await update();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeTournament = async (id: string) => {
    try {
      const participationsQuery = query(
        collection(db, "participations"),
        where("tournamentId", "==", id),
      );
      const participationsSnapshot = await getDocs(participationsQuery);
      for (const participation of participationsSnapshot.docs) {
        await deleteDoc(doc(db, "participations", participation.id));
      }

      await deleteDoc(doc(db, "tournaments", id));
      await update();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const getTournamentById = async (
    id: string,
  ): Promise<{
    tournament: Tournament | undefined;
    participations: TournamentParticipation[] | undefined;
  }> => {
    const result = {
      tournament: tournaments.find(
        (tournament: Tournament) => tournament.id === id,
      ),
      participations: participations.filter((p) => p.tournamentId === id),
    };

    return result;
  };

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
        updateTournament,
        update,
        removeTournament,
        getTournamentById,
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
