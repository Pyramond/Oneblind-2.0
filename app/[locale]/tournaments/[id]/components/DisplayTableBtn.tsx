import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import { useUsers } from "@/contexts/UsersContext";
import User from "@/interfaces/user";
import { useEffect, useState } from "react";
import { TournamentParticipation } from "@/interfaces/tournament.interface";

export default function DisplayTableBtn() {
  const t = useI18n();
  const { getParticipations } = useTournamentRunner();
  const [participations, setParticipations] =
    useState<TournamentParticipation[]>(getParticipations());
  const { getUserById } = useUsers();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    shuffle();
  }, []);

  const shuffle = (): void => {
    setParticipations((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color={"gray"} variant={"soft"}>
          {t("tournaments.runner.table.btn")}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{t("tournaments.runner.table.title")}</Dialog.Title>
        <Dialog.Description size="2" mb="4"></Dialog.Description>

        {participations.map((participation, index) => {
          const player: User | undefined = getUserById(participation.playerId);
          return (
            <p key={index}>
              {index + 1}. {player?.name}
            </p>
          );
        })}

        <Flex gap="3" mt="4" justify="end">
          <Button onClick={shuffle}>
            {t("tournaments.runner.table.replaceBtn")}
          </Button>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {t("common.close")}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
