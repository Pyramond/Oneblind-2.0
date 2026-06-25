"use client";

import { Button, AlertDialog } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import {useRouter} from "next/navigation";

export default function DeleteBlindBtn({ id, replace }: { id: string, replace?: boolean }) {
  const t = useI18n();
  const router = useRouter();
  const { removeBlindStructure, getBlindStructureById } = useBlinds();
  const name = getBlindStructureById(id)?.name ?? "";

  function handleDelete(): void {
    removeBlindStructure(id);
    if(replace) router.replace("/blinds");
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft">
          {t("blinds.card.deleteBtn")}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {t("blinds.card.deleteTitle", { structure: name })}
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
  );
}
