"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";
import { useUsers } from "@/contexts/UsersContext";
import { useI18n } from "@/locales/client";
import { Badge, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { StarFilledIcon } from "@radix-ui/react-icons";
import calculatePoints from "@/utils/calculatePoints";

export default function TournamentEndModal() {
  const { remaining, rankings, finishTournament, getParticipations } = useTournamentRunner();
  const { getUserById } = useUsers();
  const t = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (remaining.length === 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [remaining.length]);

  const totalPlayers = getParticipations().length;
  const fullRanking = [
    { ...remaining[0], rank: 1, points: calculatePoints(1, totalPlayers) },
    ...rankings.sort((a, b) => a.rank - b.rank),
  ].filter(Boolean);

  const handleFinish = async () => {
    setLoading(true);
    await finishTournament();
    router.push("/tournaments");
  };

  return (
    <Dialog.Root open={open} onOpenChange={() => {}}>
      <Dialog.Content maxWidth="420px">
        <Flex direction="column" align="center" gap="2" mb="4">
          <StarFilledIcon width={40} height={40} color="gold" />
          <Dialog.Title size="6" align="center">
            {t("tournaments.runner.endModal.title")}
          </Dialog.Title>
          <Dialog.Description size="2" color="gray" align="center">
            {t("tournaments.runner.endModal.subtitle")}
          </Dialog.Description>
        </Flex>

        <Flex direction="column" gap="2">
          {fullRanking.map((p, index) => {
            const user = getUserById(p.playerId);
            const isWinner = index === 0;
            return (
              <Flex
                key={p.playerId}
                align="center"
                justify="between"
                px="3"
                py="2"
                style={{
                  borderRadius: "var(--radius-3)",
                  background: isWinner ? "var(--amber-3)" : "var(--gray-3)",
                }}
              >
                <Flex align="center" gap="3">
                  <Badge
                    color={isWinner ? "amber" : "gray"}
                    variant="solid"
                    radius="full"
                  >
                    #{p.rank}
                  </Badge>
                  <Text weight={isWinner ? "bold" : "regular"}>
                    {user?.name ?? p.playerId}
                  </Text>
                </Flex>
                {isWinner && (
                  <StarFilledIcon color="goldenrod" width={18} height={18} />
                )}
                {p.points != null && <Text>+{p.points}</Text>}
              </Flex>
            );
          })}
        </Flex>

        <Flex justify="center" mt="5">
          <Button size="3" loading={loading} onClick={handleFinish}>
            {t("tournaments.runner.endModal.finishBtn")}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
