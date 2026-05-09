"use client";

import { Tournament, TournamentParticipation } from "@/interfaces/tournament.interface";
import { BlindStructure } from "@/interfaces/blindStructure.interface";

interface Props {
  tournament: Tournament;
  participations: TournamentParticipation[];
  blindStructure: BlindStructure;
}

export default function TournamentRunner({ tournament, participations }: Props) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0">
        <span className="text-white text-xl font-semibold">{tournament.name}</span>
        <span className="text-zinc-400 text-lg">{participations.length} joueurs</span>
      </header>
      <div className="grid grid-cols-2 grid-rows-2 flex-1" />
    </div>
  );
}
