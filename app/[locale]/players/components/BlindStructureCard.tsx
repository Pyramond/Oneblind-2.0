"use client";

import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { Button, Card } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import Link from "next/link";

export default function BlindStructureCard({
  blindStructure,
}: {
  blindStructure: BlindStructure;
}) {
  const t = useI18n();

  return (
    <Link href={"/"}>
      <Card>
        <div className={"flex flex-row justify-between items-center"}>
          <p>{blindStructure.name}</p>
          <Button color={"red"} variant={"soft"}>
            {t("blinds.card.deleteBtn")}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
