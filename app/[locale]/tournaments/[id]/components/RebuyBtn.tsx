import { Tournament } from "@/interfaces/tournament.interface";
import { ReactNode } from "react";
import { Button } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";

export default function RebuyBtn(): ReactNode {
  const t = useI18n();
  const { addRebuy } = useTournamentRunner();

  return <Button onClick={addRebuy}>{t("tournaments.runner.rebuy")}</Button>;
}
