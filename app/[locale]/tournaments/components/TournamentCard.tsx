"use client";

import { Tournament } from "@/interfaces/tournament.interface";
import { Badge, Button, Card, Flex, Text, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import { useTournaments } from "@/contexts/TournamentsContext";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import TournamentCardContextMenu from "./TournamentCardContextMenu";

export default function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  const t = useI18n();
  const { blindStructures } = useBlinds();
  const { participations } = useTournaments();

  const playerCount = participations.filter(
    (p) => p.tournamentId === tournament.id,
  ).length;

  const blindStructure = blindStructures.find(
    (b) => b.id === tournament.blindStructureId,
  );

  const date = tournament.date
    ? new Date(tournament.date.seconds * 1000).toLocaleDateString()
    : null;

  return (
    <TournamentCardContextMenu tournament={tournament}>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <Flex align="center" gap="2">
              <Text size="4" weight="bold">
                {tournament.name}
              </Text>
              {tournament.countPoints ? (
                <Badge color="blue">
                  {t("tournaments.card.countPoints.yes")}
                </Badge>
              ) : (
                <Badge color="orange">
                  {t("tournaments.card.countPoints.no")}
                </Badge>
              )}
            </Flex>

            <Flex gap="4" wrap="wrap">
              {date && (
                <Text size="2" color="gray">
                  {date}
                </Text>
              )}
              {blindStructure ? (
                <Text size="2" color="gray">
                  {t("tournaments.card.blindStructure")} :{" "}
                  {blindStructure.name}
                </Text>
              ) : (
                <Tooltip
                  content={t(
                    "tournaments.card.blindStructureNotFoundTooltipContent",
                  )}
                >
                  <Badge color={"red"} className={"hover:cursor-pointer"}>
                    <InfoCircledIcon />
                    <Text>{t("tournaments.card.blindStructureNotFound")}</Text>
                  </Badge>
                </Tooltip>
              )}
              <Text size="2" color="gray">
                {t("tournaments.card.startingStack")} :{" "}
                {tournament.startingStack}
              </Text>
              <Text size="2" color="gray">
                {t("tournaments.card.playerCount")} : {playerCount}
              </Text>
            </Flex>
          </div>

          <Link href={`/tournaments/${tournament.id}`}>
            <Button variant="soft">{t("common.open")}</Button>
          </Link>
        </div>
      </Card>
    </TournamentCardContextMenu>
  );
}
