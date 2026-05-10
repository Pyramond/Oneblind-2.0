"use client";

import {
  Tournament,
  TournamentParticipation,
} from "@/interfaces/tournament.interface";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { useI18n } from "@/locales/client";
import DisplayBlind from "@/app/[locale]/tournaments/[id]/components/DisplayBlind";
import Timer from "@/app/[locale]/tournaments/[id]/components/Timer";
import ToolBar from "@/app/[locale]/tournaments/[id]/components/ToolBar";
import {
  TournamentRunnerProvider,
  useTournamentRunner,
} from "@/contexts/TournamentRunnerContext";
import { Card, IconButton } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import AverageStack from "@/app/[locale]/tournaments/[id]/components/AverageStack";

interface Props {
  tournament: Tournament;
  participations: TournamentParticipation[];
  blindStructure: BlindStructure;
}

function TournamentRunnerContent() {
  const { tournament, step, currentStep, remaining, goToPrev, goToNext } =
    useTournamentRunner();
  const t = useI18n();

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
          <ToolBar />
        </Card>

        <Card className="m-6">
          <AverageStack />
        </Card>
      </div>
    </div>
  );
}

export default function TournamentRunner({
  tournament,
  participations,
  blindStructure,
}: Props) {
  return (
    <TournamentRunnerProvider
      tournament={tournament}
      participations={participations}
      blindStructure={blindStructure}
    >
      <TournamentRunnerContent />
    </TournamentRunnerProvider>
  );
}
