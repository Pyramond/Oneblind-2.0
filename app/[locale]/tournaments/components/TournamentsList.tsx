"use client";

import { ReactNode, useState } from "react";
import { useTournaments } from "@/contexts/TournamentsContext";
import TournamentCard from "@/app/[locale]/tournaments/components/TournamentCard";
import { SegmentedControl } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";

export default function TournamentsList(): ReactNode {
  const { tournaments } = useTournaments();
  const t = useI18n();

  const [displayFinishedTournaments, setDisplayFinishedTournaments] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3">

      <div className={"flex flex-row gap-3"}>
        <SegmentedControl.Root defaultValue={"false"} onValueChange={(value) => setDisplayFinishedTournaments(value === "true")}>
          <SegmentedControl.Item value={"false"}>{t("tournaments.list.ongoingOnly")}</SegmentedControl.Item>
          <SegmentedControl.Item value={"true"}>{t("tournaments.list.all")}</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      {tournaments.filter((t) => displayFinishedTournaments || !t.finished).map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
