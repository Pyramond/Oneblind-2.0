"use client";

import { ReactNode, useState } from "react";
import { useTournaments } from "@/contexts/TournamentsContext";
import TournamentCard from "@/app/[locale]/tournaments/components/TournamentCard";
import { SegmentedControl } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { Tournament } from "@/interfaces/tournament.interface";
import Title from "@/components/Title/Title";

type filterType = "onGoing" | "finished" | "all";

export default function TournamentsList(): ReactNode {
  const { tournaments } = useTournaments();
  const t = useI18n();

  const [filterTournament, setFilterTournament] =
    useState<filterType>("onGoing");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const getFilterType = (tournament: Tournament): boolean => {
    switch (filterTournament) {
      case "onGoing":
        return !tournament.finished;
      case "finished":
        return tournament.finished;
      case "all":
        return true;
    }
  };

  const sorted = [...tournaments]
    .filter((tournament) => getFilterType(tournament))
    .sort((a, b) => {
      const aSeconds = a.date?.seconds ?? 0;
      const bSeconds = b.date?.seconds ?? 0;
      return sortOrder === "newest" ? bSeconds - aSeconds : aSeconds - bSeconds;
    });

  return (
    <div className="flex flex-col gap-3">
      <div className={"flex flex-row gap-3"}>
        <SegmentedControl.Root
          defaultValue={"onGoing"}
          onValueChange={(value) => setFilterTournament(value as filterType)}
        >
          <SegmentedControl.Item value={"onGoing"}>
            {t("tournaments.list.ongoingOnly")}
          </SegmentedControl.Item>
          <SegmentedControl.Item value={"finished"}>
            {t("tournaments.list.finishedOnly")}
          </SegmentedControl.Item>
          <SegmentedControl.Item value={"all"}>
            {t("tournaments.list.all")}
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <SegmentedControl.Root
          defaultValue={"newest"}
          onValueChange={(value) => setSortOrder(value as "newest" | "oldest")}
        >
          <SegmentedControl.Item value={"newest"}>
            {t("tournaments.list.sortNewest")}
          </SegmentedControl.Item>
          <SegmentedControl.Item value={"oldest"}>
            {t("tournaments.list.sortOldest")}
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      {sorted.length === 0 ? (
        <Title level={"h4"}>{t("tournaments.list.empty")}</Title>
      ) : (
        <>
          {sorted.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </>
      )}
    </div>
  );
}
