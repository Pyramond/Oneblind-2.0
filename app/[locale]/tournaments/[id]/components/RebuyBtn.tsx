import { ReactNode, useState } from "react";
import { Button } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";

export default function RebuyBtn(): ReactNode {
  const t = useI18n();
  const { addRebuy } = useTournamentRunner();
  const [rebuyCounter, setRebuyCounter] = useState<number>(0);

  return (
    <Button
      onClick={() => {
        addRebuy();
        setRebuyCounter(rebuyCounter + 1);
      }}
      color={"gray"}
    >
      {rebuyCounter >= 1 ? rebuyCounter : null}{" "}
      {rebuyCounter > 1
        ? t("tournaments.runner.rebuys")
        : t("tournaments.runner.rebuy")}
    </Button>
  );
}
