"use client";

import {
  Tournament,
  TournamentParticipation,
} from "@/interfaces/tournament.interface";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { useState } from "react";
import { useTournaments } from "@/contexts/TournamentsContext";
import { useI18n } from "@/locales/client";
import DisplayBlind from "@/app/[locale]/tournaments/[id]/components/DisplayBlind";
import Timer from "@/app/[locale]/tournaments/[id]/components/Timer";
import ToolBar from "@/app/[locale]/tournaments/[id]/components/ToolBar";
import { Card, IconButton } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  tournament: Tournament;
  participations: TournamentParticipation[];
  blindStructure: BlindStructure;
}

export default function TournamentRunner({
  tournament,
  participations,
  blindStructure,
}: Props) {
  const { updateParticipationRank } = useTournaments();
  const t = useI18n();
  const steps = blindStructure.steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [remaining, setRemaining] = useState<TournamentParticipation[]>(participations);

  const goToPrev = () => setCurrentStep((i) => Math.max(0, i - 1));
  const goToNext = () =>
    setCurrentStep((i) => Math.min(steps.length - 1, i + 1));

  const eliminatePlayer = (playerId: string) => {
    const rank = remaining.length;
    void updateParticipationRank(tournament.id!, playerId, rank);
    setRemaining((prev) => prev.filter((p) => p.playerId !== playerId));
  };

  const step = steps[currentStep];

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0">
        <div className="flex flex-row gap-3 items-center">
          <Link href="/">
            <IconButton variant="ghost" radius="full">
              <HomeIcon width={25} height={25} />
            </IconButton>
          </Link>
          <span className="text-white text-xl font-semibold">
            {tournament.name}
          </span>
        </div>
        <span className="text-zinc-400 text-lg">
          {t("tournaments.runner.players", { count: remaining.length })}
        </span>
      </header>
      <div className="grid grid-cols-2 grid-rows-2 flex-1">
        <Card className="m-6">
          <DisplayBlind step={step} />
        </Card>

        <Card className="m-6">
          <Timer
            key={currentStep}
            duration={step.time * 60}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        </Card>

        <Card className="m-6">
          <ToolBar participations={remaining} onEliminate={eliminatePlayer} />
        </Card>
      </div>
    </div>
  );
}
