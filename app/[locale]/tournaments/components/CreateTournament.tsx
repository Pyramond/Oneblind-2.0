"use client";

import {
  Button,
  Checkbox,
  Dialog,
  Flex,
  TextField,
  Text,
  Select,
  Callout,
} from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useEffect, useState } from "react";
import { useBlinds } from "@/contexts/BlindsContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { useUsers } from "@/contexts/UsersContext";
import { useTournaments } from "@/contexts/TournamentsContext";
import { Tournament } from "@/interfaces/tournament.interface";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function CreateTournament() {
  const t = useI18n();
  const { blindStructures } = useBlinds();
  const { users } = useUsers();
  const { addTournament } = useTournaments();

  const [name, setName] = useState<string>("");
  const [blindStructureId, setBlindStructureId] = useState<string>("");
  const [startingStack, setStartingStack] = useState<number | "">("");
  const [countPoints, setCountPoints] = useState<boolean>(true);
  const [playerIds, setPlayerIds] = useState<string[]>([]);

  function togglePlayer(id: string) {
    setPlayerIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function handleCreate() {
    const tournament: Tournament = {
      name,
      blindStructureId,
      startingStack: Number(startingStack),
      countPoints,
    };

    addTournament(tournament, playerIds);
  }

  useEffect(() => {
    if (blindStructures.length > 0 && !blindStructureId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlindStructureId(blindStructures[0].id);
    }
  }, [blindStructures, blindStructureId]);

  return (
    <Dialog.Root>
        <Dialog.Trigger>
          <Button>{t("tournaments.create.btnTitle")}</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{t("tournaments.create.dialogTitle")}</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.create.name")}
              </Text>
              <TextField.Root
                placeholder={t("tournaments.create.name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.create.blindStructure")}
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
                <Callout.Root color="red" className="mt-3 mb-3">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    {t("tournaments.create.blindStructureErr")}
                  </Callout.Text>
                </Callout.Root>
              )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.create.startingStack")}
              </Text>
              <TextField.Root
                type="number"
                min="0"
                placeholder={t("tournaments.create.startingStack")}
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
                  {t("tournaments.create.countPoints")}
                </Text>
              </label>
            </Flex>

            <div>
              <Text as="div" size="2" mb="1" weight="bold">
                {t("tournaments.create.players")}
              </Text>
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
            </div>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("common.cancel")}
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleCreate}>{t("common.save")}</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
    </Dialog.Root>
  );
}
