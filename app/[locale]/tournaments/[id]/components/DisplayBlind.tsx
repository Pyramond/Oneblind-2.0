"use client";

import { BlindStep } from "@/interfaces/blindStructure.interface";
import { useI18n } from "@/locales/client";

interface Props {
  step: BlindStep;
}

export default function DisplayBlind({ step }: Props) {
  const t = useI18n();

  if (step.type === "pause") {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-[8rem] font-bold leading-none text-zinc-700 dark:text-zinc-300">
          {t("blinds.type.pause")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
      <span className="text-[8rem] font-bold leading-none tabular-nums text-zinc-700 dark:text-zinc-300">
        {step.small_blind}
      </span>
      <span className="text-[8rem] font-bold leading-none tabular-nums text-zinc-700 dark:text-zinc-300">
        {step.big_blind}
      </span>
    </div>
  );
}
