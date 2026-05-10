"use client";

import EliminatePlayer from "@/app/[locale]/tournaments/[id]/components/EliminatePlayer";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import RebuyBtn from "@/app/[locale]/tournaments/[id]/components/RebuyBtn";

export default function ToolBar() {
  const { remaining, eliminatePlayer } = useTournamentRunner();

  return (
    <div className="flex flex-row">
      <EliminatePlayer
        participations={remaining}
        onEliminate={eliminatePlayer}
      />
      <RebuyBtn />
    </div>
  );
}
