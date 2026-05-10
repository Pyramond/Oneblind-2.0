"use client";

import { TournamentParticipation } from "@/interfaces/tournament.interface";
import EliminatePlayer from "@/app/[locale]/tournaments/[id]/components/EliminatePlayer";

interface Props {
  participations: TournamentParticipation[];
  onEliminate: (playerId: string) => void;
}

export default function ToolBar({ participations, onEliminate }: Props) {
  return (
    <div className="flex flex-row">
      <EliminatePlayer participations={participations} onEliminate={onEliminate} />
    </div>
  );
}
