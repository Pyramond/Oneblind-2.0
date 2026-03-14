"use client";

import { AlertDialog, Button, ContextMenu, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useI18n } from "@/locales/client";
import { useTournaments } from "@/contexts/TournamentsContext";

export default function DeleteTournamentItem({
  tournamentId,
  tournamentName,
}: {
  tournamentId: string;
  tournamentName: string;
}) {
  const t = useI18n();
  const { removeTournament } = useTournaments();
  const [open, setOpen] = useState(false);

  function handleDelete() {
    removeTournament(tournamentId);
    setOpen(false);
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <ContextMenu.Item color="red" onSelect={(e) => e.preventDefault()}>
          {t("common.delete")}
        </ContextMenu.Item>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {t("tournaments.card.delete.deleteTitle", {
            tournament: tournamentName,
          })}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          {t("tournaments.card.delete.deleteDescription")}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
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
  );
}
