"use client";

import { Tournament } from "@/interfaces/tournament.interface";
import {
  AlertDialog,
  Button,
  Checkbox,
  Dialog,
  Flex,
  TextField,
  Text,
  Select,
  Callout,
  ContextMenu,
} from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { useUsers } from "@/contexts/UsersContext";
import { useTournaments } from "@/contexts/TournamentsContext";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function EditTournamentItem({
  tournament,
}: {
  tournament: Tournament;
}): ReactNode {
  const t = useI18n();
  const { blindStructures } = useBlinds();
  const { users } = useUsers();
  const { participations, updateTournament } = useTournaments();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState<string>(tournament.name);
  const [blindStructureId, setBlindStructureId] = useState<string>(
    tournament.blindStructureId,
  );
  const [startingStack, setStartingStack] = useState<number | "">(
    tournament.startingStack,
  );
  const [countPoints, setCountPoints] = useState<boolean>(
    tournament.countPoints,
  );
  const [playerIds, setPlayerIds] = useState<string[]>([]);

  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const currentPlayerIds = participations
        .filter((p) => p.tournamentId === tournament.id)
        .map((p) => p.playerId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlayerIds(currentPlayerIds);
      setName(tournament.name);
      setBlindStructureId(tournament.blindStructureId);
      setStartingStack(tournament.startingStack);
      setCountPoints(tournament.countPoints);
    }
  }, [open, tournament, participations]);

  function togglePlayer(id: string) {
    setPlayerIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function handleSave(): void {
    if (!(Number(startingStack) > 0)) {
      setErrorTitle(t("common.error"));
      setErrorMessage(t("tournaments.edit.initialStackErr"));
      setErrorOpen(true);
      return;
    } else if (playerIds.length <= 1) {
      setErrorTitle(t("common.error"));
      setErrorMessage(t("tournaments.edit.playerCountErr"));
      setErrorOpen(true);
      return;
    }

    updateTournament(
      {
        ...tournament,
        name,
        blindStructureId,
        startingStack: Number(startingStack),
        countPoints,
      },
      playerIds,
    );
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <ContextMenu.Item
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          {t("common.edit")}
        </ContextMenu.Item>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{t("tournaments.edit.dialogTitle")}</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.edit.name")}
              </Text>
              <TextField.Root
                placeholder={t("tournaments.edit.name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.edit.blindStructure")}
              </Text>
              {blindStructures.length > 0 ? (
                <Select.Root
                  value={blindStructureId}
                  onValueChange={setBlindStructureId}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {blindStructures.map((item: BlindStructure) => (
                      <Select.Item key={item.id} value={item.id}>
                        {item.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              ) : (
                <Link href={"/blinds"}>
                  <Callout.Root color="red" className="mt-3 mb-3">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      {t("tournaments.edit.blindStructureErr")}
                    </Callout.Text>
                  </Callout.Root>
                </Link>
              )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.edit.startingStack")}
              </Text>
              <TextField.Root
                type="number"
                min="0"
                placeholder={t("tournaments.edit.startingStack")}
                onChange={(e) =>
                  setStartingStack(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, parseInt(e.target.value)),
                  )
                }
                value={startingStack}
              />
            </label>

            <Flex asChild align="center" gap="2">
              <label>
                <Checkbox
                  checked={countPoints}
                  onCheckedChange={(checked) =>
                    setCountPoints(checked === true)
                  }
                />
                <Text as="span" size="2" weight="bold">
                  {t("tournaments.edit.countPoints")}
                </Text>
              </label>
            </Flex>

            <div>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.edit.players")}
              </Text>
              {users.length > 0 ? (
                <Flex direction="column" gap="2">
                  {users.map((user) => (
                    <Flex asChild key={user.id} align="center" gap="2">
                      <label>
                        <Checkbox
                          checked={playerIds.includes(user.id)}
                          onCheckedChange={() => togglePlayer(user.id)}
                        />
                        <Text as="span" size="2">
                          {user.name}
                        </Text>
                      </label>
                    </Flex>
                  ))}
                </Flex>
              ) : (
                <Link href={"/players"}>
                  <Callout.Root color="red" className="mt-3 mb-3">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      {t("tournaments.edit.playerErr")}
                    </Callout.Text>
                  </Callout.Root>
                </Link>
              )}
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("common.cancel")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSave}>{t("common.save")}</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <AlertDialog.Root open={errorOpen} onOpenChange={setErrorOpen}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>{errorTitle}</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {errorMessage}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="gray"
                onClick={() => setErrorOpen(false)}
              >
                {t("common.close")}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}