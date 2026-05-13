"use client";

import EliminatePlayer from "@/app/[locale]/tournaments/[id]/components/EliminatePlayer";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import RebuyBtn from "@/app/[locale]/tournaments/[id]/components/RebuyBtn";
import DisplayBlindStructureBtn from "@/app/[locale]/tournaments/[id]/components/DisplayBlindStructureBtn";

export default function ToolBar() {
  const { remaining, eliminatePlayer } = useTournamentRunner();

  return (
    <div className="flex flex-row p-2 gap-4">
      <EliminatePlayer
        participations={remaining}
        onEliminate={eliminatePlayer}
      />
      <RebuyBtn />
      <DisplayBlindStructureBtn />
    </div>
  );
}
