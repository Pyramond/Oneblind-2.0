"use client";

import { ReactNode } from "react";
import { useTournaments } from "@/contexts/TournamentsContext";
import TournamentCard from "@/app/[locale]/tournaments/components/TournamentCard";

export default function TournamentsList(): ReactNode {
  const { tournaments } = useTournaments();

  return (
    <div className="flex flex-col gap-3">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
