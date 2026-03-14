"use client";

import { Tournament } from "@/interfaces/tournament.interface";
import {
  Badge,
  Button,
  Card,
  ContextMenu,
  Flex,
  Text,
  AlertDialog,
} from "@radix-ui/themes";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import { useState } from "react";
import { useTournaments } from "@/contexts/TournamentsContext";

export default function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  const t = useI18n();
  const { blindStructures } = useBlinds();
  const { removeTournament } = useTournaments();

  const blindStructure = blindStructures.find(
    (b) => b.id === tournament.blindStructureId,
  );

  const date = tournament.date
    ? new Date(tournament.date.seconds * 1000).toLocaleDateString()
    : null;

  const [open, setOpen] = useState<boolean>(false);

  function handleDelete() {
    if (tournament.id) {
      removeTournament(tournament.id);
      setOpen(false);
    }
  }

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
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
                  {blindStructure && (
                    <Text size="2" color="gray">
                      {t("tournaments.card.blindStructure")} :{" "}
                      {blindStructure.name}
                    </Text>
                  )}
                  <Text size="2" color="gray">
                    {t("tournaments.card.startingStack")} :{" "}
                    {tournament.startingStack}
                  </Text>
                </Flex>
              </div>

              <Link href={`/tournaments/${tournament.id}`}>
                <Button variant="soft">{t("common.open")}</Button>
              </Link>
            </div>
          </Card>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <Link href={`/tournaments/${tournament.id}`}>
            <ContextMenu.Item>{t("common.open")}</ContextMenu.Item>
          </Link>
          <ContextMenu.Item color={"red"} onClick={() => setOpen(true)}>
            {t("common.delete")}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <AlertDialog.Root open={open}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>
            {t("tournaments.card.delete.deleteTitle", {
              tournament: tournament.name,
            })}
          </AlertDialog.Title>
          <AlertDialog.Description size="2">
            {t("tournaments.card.delete.deleteDescription")}
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setOpen(false)}
              >
                {t("common.cancel")}
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleDelete}>
                {t("common.delete")}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
