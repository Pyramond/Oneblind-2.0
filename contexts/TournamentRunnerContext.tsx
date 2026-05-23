"use client";

import { createContext, useContext, useState } from "react";
import {
  Tournament,
  TournamentParticipation,
} from "@/interfaces/tournament.interface";
import {
  BlindStep,
  BlindStructure,
} from "@/interfaces/blindStructure.interface";
import { useTournaments } from "@/contexts/TournamentsContext";
import { useUsers } from "@/contexts/UsersContext";
import calculatePoints from "@/utils/calculatePoints";

interface TournamentRunnerContextType {
  tournament: Tournament;
  steps: BlindStep[];
  currentStep: number;
  step: BlindStep;
  remaining: TournamentParticipation[];
  rankings: TournamentParticipation[];
  totalStack: number;
  addRebuy: () => void;
  goToPrev: () => void;
  goToNext: () => void;
  eliminatePlayer: (playerId: string) => void;
  finishTournament: () => Promise<void>;
  getBlindStructure: () => BlindStructure;
  getParticipations: () => TournamentParticipation[];
}

const TournamentRunnerContext =
  createContext<TournamentRunnerContextType | null>(null);

interface TournamentRunnerProviderProps {
  tournament: Tournament;
  participations: TournamentParticipation[];
  blindStructure: BlindStructure;
  children: React.ReactNode;
}

export function TournamentRunnerProvider({
  tournament,
  participations,
  blindStructure,
  children,
}: TournamentRunnerProviderProps) {
  const { updateParticipationRank, finishTournament: finishTournamentInDB } =
    useTournaments();
  const { addPoints } = useUsers();
  const steps = blindStructure.steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [remaining, setRemaining] =
    useState<TournamentParticipation[]>(participations);
  const [rankings, setRankings] = useState<TournamentParticipation[]>([]);
  const [totalStack, setTotalStack] = useState<number>(
    tournament.startingStack * remaining.length,
  );

  const goToPrev = () => setCurrentStep((i) => Math.max(0, i - 1));
  const goToNext = () =>
    setCurrentStep((i) => Math.min(steps.length - 1, i + 1));

  const eliminatePlayer = (playerId: string) => {
    const rank = remaining.length;

    const points: number = calculatePoints(rank, participations.length);

    void updateParticipationRank(tournament.id!, playerId, rank, points);
    if (tournament.countPoints) void addPoints(playerId, points);
    const eliminated = remaining.find((p) => p.playerId === playerId);
    if (eliminated) {
      setRankings((prev) => [...prev, { ...eliminated, rank, points }]);
    }
    setRemaining((prev) => prev.filter((p) => p.playerId !== playerId));
  };

  const finishTournament = async () => {
    if (remaining.length === 1) {
      const winner = remaining[0];
      const points: number = calculatePoints(1, participations.length);
      void updateParticipationRank(tournament.id!, winner.playerId, 1, points);
      if (tournament.countPoints) void addPoints(winner.playerId, points);
    }
    await finishTournamentInDB(tournament.id!);
  };

  const addRebuy = (): void => {
    const newTotal = totalStack + tournament.startingStack;
    setTotalStack(newTotal);
  };

  const getBlindStructure = (): BlindStructure => {
    return blindStructure;
  };

  const getParticipations = (): TournamentParticipation[] => {
    return participations;
  };

  return (
    <TournamentRunnerContext.Provider
      value={{
        tournament,
        steps,
        currentStep,
        step: steps[currentStep],
        remaining,
        rankings,
        totalStack,
        addRebuy,
        goToPrev,
        goToNext,
        eliminatePlayer,
        finishTournament,
        getBlindStructure,
        getParticipations,
      }}
    >
      {children}
    </TournamentRunnerContext.Provider>
  );
}

export function useTournamentRunner() {
  const context = useContext(TournamentRunnerContext);
  if (!context)
    throw new Error(
      "useTournamentRunner must be used within TournamentRunnerProvider",
    );
  return context;
}
