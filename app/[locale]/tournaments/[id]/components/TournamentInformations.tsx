"use client";

import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import { useI18n } from "@/locales/client";

export default function TournamentInformations() {
  const t = useI18n();
  const {
    steps,
    currentStep,
    totalStack,
    remaining,
    getBlindStructure,
    getParticipations,
  } = useTournamentRunner();

  const nextStep = steps[currentStep + 1];
  const blindStructureName = getBlindStructure().name;
  const totalPlayers = getParticipations().length;
  const totalSteps = steps.length;

  return (
    <div className="flex flex-row flex-wrap gap-6 mt-4 px-1">
      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-500 text-xs uppercase tracking-wide">
          {t("tournaments.runner.info.players")}
        </span>
        <span className="text-2xl font-bold tabular-nums">
          {remaining.length} / {totalPlayers}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-500 text-xs uppercase tracking-wide">
          {t("tournaments.runner.info.totalChips")}
        </span>
        <span className="text-2xl font-bold tabular-nums">
          {totalStack.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-500 text-xs uppercase tracking-wide">
          {t("tournaments.runner.info.blindStructure")}
        </span>
        <span className="text-2xl font-bold">{blindStructureName}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-500 text-xs uppercase tracking-wide">
          {t("tournaments.runner.info.step")}
        </span>
        <span className="text-2xl font-bold tabular-nums">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {nextStep && (
        <div className="flex flex-col gap-0.5">
          <span className="text-zinc-500 text-xs uppercase tracking-wide">
            {t("tournaments.runner.info.nextLevel")}
          </span>
          {nextStep.type === "pause" ? (
            <span className="text-2xl font-bold">{t("blinds.type.pause")}</span>
          ) : (
            <span className="text-2xl font-bold tabular-nums">
              {nextStep.small_blind} / {nextStep.big_blind}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
