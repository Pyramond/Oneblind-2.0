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
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sorted = [...tournaments]
    .filter((tournament) => displayFinishedTournaments || !tournament.finished)
    .sort((a, b) => {
      const aSeconds = a.date?.seconds ?? 0;
      const bSeconds = b.date?.seconds ?? 0;
      return sortOrder === "newest" ? bSeconds - aSeconds : aSeconds - bSeconds;
    });

  return (
    <div className="flex flex-col gap-3">

      <div className={"flex flex-row gap-3"}>
        <SegmentedControl.Root defaultValue={"false"} onValueChange={(value) => setDisplayFinishedTournaments(value === "true")}>
          <SegmentedControl.Item value={"false"}>{t("tournaments.list.ongoingOnly")}</SegmentedControl.Item>
          <SegmentedControl.Item value={"true"}>{t("tournaments.list.all")}</SegmentedControl.Item>
        </SegmentedControl.Root>

        <SegmentedControl.Root defaultValue={"newest"} onValueChange={(value) => setSortOrder(value as "newest" | "oldest")}>
          <SegmentedControl.Item value={"newest"}>{t("tournaments.list.sortNewest")}</SegmentedControl.Item>
          <SegmentedControl.Item value={"oldest"}>{t("tournaments.list.sortOldest")}</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      {sorted.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
