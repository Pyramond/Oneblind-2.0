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

interface TournamentRunnerContextType {
  tournament: Tournament;
  steps: BlindStep[];
  currentStep: number;
  step: BlindStep;
  remaining: TournamentParticipation[];
  goToPrev: () => void;
  goToNext: () => void;
  eliminatePlayer: (playerId: string) => void;
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
  const { updateParticipationRank } = useTournaments();
  const steps = blindStructure.steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [remaining, setRemaining] =
    useState<TournamentParticipation[]>(participations);

  const goToPrev = () => setCurrentStep((i) => Math.max(0, i - 1));
  const goToNext = () =>
    setCurrentStep((i) => Math.min(steps.length - 1, i + 1));

  const eliminatePlayer = (playerId: string) => {
    const rank = remaining.length;
    void updateParticipationRank(tournament.id!, playerId, rank);
    setRemaining((prev) => prev.filter((p) => p.playerId !== playerId));
  };

  return (
    <TournamentRunnerContext.Provider
      value={{
        tournament,
        steps,
        currentStep,
        step: steps[currentStep],
        remaining,
        goToPrev,
        goToNext,
        eliminatePlayer,
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
