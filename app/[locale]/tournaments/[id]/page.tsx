"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTournaments } from "@/contexts/TournamentsContext";
import {
  Tournament,
  TournamentParticipation,
} from "@/interfaces/tournament.interface";
import { useBlinds } from "@/contexts/BlindsContext";
import { useUsers } from "@/contexts/UsersContext";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import Link from "next/link";

export default function TournamentDashboardPage(): ReactNode {
  const params = useParams();
  const id = params.id as string;

  const { getTournamentById, removeParticipation } = useTournaments();
  const { getBlindStructureById } = useBlinds();
  const { getUserById } = useUsers();

  const t = useI18n();
  const [canStart, setCanStart] = useState<boolean>(true);

  const tournament: {
    tournament: Tournament | undefined;
    participations: TournamentParticipation[] | undefined;
  } = getTournamentById(id);

  useEffect(() => {
    tournament.participations?.forEach((participation) => {
      if (!getUserById(participation.playerId)) {
        removeParticipation(id, participation.playerId);
      }
    });

    if (!getBlindStructureById(tournament.tournament?.blindStructureId)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanStart(false);
    }
  }, [
    getBlindStructureById,
    getUserById,
    id,
    removeParticipation,
    tournament.participations,
    tournament.tournament?.blindStructureId,
  ]);

  if (tournament.tournament?.finished)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card size="4" className="w-full max-w-sm">
          <Flex direction="column" align="center" gap="4">
            <Heading size="6" color="red">
              {t("tournaments.dashboard.finished.title")}
            </Heading>
            <Text color="gray" align="center">
              {t("tournaments.dashboard.finished.description")}
            </Text>

            <Link href={"/tournaments"}>
              <Button size={"3"}>
                {t("tournaments.dashboard.finished.btn")}
              </Button>
            </Link>
          </Flex>
        </Card>
      </div>
    );

  if (!canStart)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card size="4" className="w-full max-w-sm">
          <Flex direction="column" align="center" gap="4">
            <Heading size="6" color="red">
              {t("tournaments.dashboard.cannotStart.title")}
            </Heading>
            <Text color="gray" align="center">
              {t("tournaments.dashboard.cannotStart.description")}
            </Text>

            <Link href={"/tournaments"}>
              <Button size={"3"}>
                {t("tournaments.dashboard.cannotStart.btn")}
              </Button>
            </Link>
          </Flex>
        </Card>
      </div>
    );

  return <h1>Bravo !</h1>;
}
