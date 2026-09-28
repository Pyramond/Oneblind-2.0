import { ReactNode, useState } from "react";
import { Button } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";

export default function AddonBtn(): ReactNode {
    const t = useI18n();
    const { addAddon } = useTournamentRunner();
    const [addOnCounter, setAddonCounter] = useState<number>(0);

    return (
        <Button
            onClick={() => {
                addAddon();
                setAddonCounter(addOnCounter + 1);
            }}
            color={"gray"}
        >
            {addOnCounter >= 1 ? addOnCounter : null}{" "}
            {t("tournaments.runner.addon")}
        </Button>
    );
}
