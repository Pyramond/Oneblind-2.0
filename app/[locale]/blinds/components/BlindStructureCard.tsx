"use client";

import { BlindStructure } from "@/interfaces/blindStructure.interface";
import { Button, Card, AlertDialog } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import Link from "next/link";
import { useBlinds } from "@/contexts/blindContext";

export default function BlindStructureCard({
  blindStructure,
}: {
  blindStructure: BlindStructure;
}) {
  const t = useI18n();
  const { removeBlindStructure } = useBlinds();

  const handleDelete = () => {
    removeBlindStructure(blindStructure.id);
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <Link href={`/blinds/${blindStructure.id}`} className="flex-1">
          <p className="cursor-pointer">{blindStructure.name}</p>
        </Link>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" variant="soft">
              {t("blinds.card.deleteBtn")}
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>
              {t("blinds.card.deleteTitle", { structure: blindStructure.name })}
            </AlertDialog.Title>

            <AlertDialog.Description>
              {t("blinds.card.deleteDescription")}
            </AlertDialog.Description>

            <div className="flex justify-end gap-3 mt-4">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  {t("common.cancel")}
                </Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action>
                <Button color="red" onClick={handleDelete}>
                  {t("common.delete")}
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </Card>
  );
}
