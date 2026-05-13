"use client";

import { useState } from "react";
import { TournamentParticipation } from "@/interfaces/tournament.interface";
import { useUsers } from "@/contexts/UsersContext";
import { useI18n } from "@/locales/client";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface Props {
  participations: TournamentParticipation[];
  onEliminate: (playerId: string) => void;
}

export default function EliminatePlayer({
  participations,
  onEliminate,
}: Props) {
  const { getUserById } = useUsers();
  const t = useI18n();
  const [open, setOpen] = useState(false);

  const handleEliminate = (playerId: string) => {
    onEliminate(playerId);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" color="red">
          <CrossCircledIcon /> {t("tournaments.runner.eliminate.btn")}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="400px">
        <Dialog.Title>{t("tournaments.runner.eliminate.title")}</Dialog.Title>
        <Dialog.Description size="2" color="gray" mb="4">
          {t("tournaments.runner.eliminate.description")}
        </Dialog.Description>

        <Flex direction="column" gap="2">
          {participations.map((p) => {
            const user = getUserById(p.playerId);
            return (
              <Button
                key={p.playerId}
                variant="soft"
                onClick={() => handleEliminate(p.playerId)}
              >
                <Text>{user?.name ?? p.playerId}</Text>
              </Button>
            );
          })}
        </Flex>

        <Flex justify="end" mt="4">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {t("common.cancel")}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
