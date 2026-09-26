"use client";

import { useRef, ChangeEvent, useState } from "react";
import { useI18n } from "@/locales/client";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useBlinds } from "@/contexts/BlindsContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";

export default function ImportBlindBtn() {
  const t = useI18n();
  const { addBlindStructure } = useBlinds();
  const inputRef = useRef<HTMLInputElement>(null);
  const [linkValue, setLinkValue] = useState("");
  const [linkError, setLinkError] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as Pick<BlindStructure, "name" | "steps">;
        addBlindStructure({ id: "", ...parsed });
      } catch {
        console.error("Invalid JSON file");
      } finally {
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function handleLinkImport(): void {
    try {
      const url = new URL(linkValue);
      const data = url.searchParams.get("d");
      if (!data) {
        setLinkError(true);
        return;
      }
      const parsed = JSON.parse(data) as Pick<BlindStructure, "name" | "steps">;
      addBlindStructure({ id: "", ...parsed });
      setLinkValue("");
      setLinkError(false);
    } catch {
      setLinkError(true);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray">
            {t("blinds.import.btn")}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>{t("blinds.import.title")}</Dialog.Title>
          <Dialog.Description size="2" mb="4">{t("blinds.import.description")}</Dialog.Description>

          <div className="flex flex-col gap-4">
            <Button onClick={() => inputRef.current?.click()}>
              {t("blinds.import.fileBtn")}
            </Button>

            <div className="flex flex-row gap-2">
              <TextField.Root
                className="flex-1"
                placeholder={t("blinds.import.linkPlaceholder")}
                value={linkValue}
                color={linkError ? "red" : undefined}
                onChange={(e) => {
                  setLinkValue(e.target.value);
                  setLinkError(false);
                }}
              />
              <Button variant="soft" onClick={handleLinkImport}>
                {t("blinds.import.linkBtn")}
              </Button>
            </div>

            {linkError && (
              <p className="text-red-500 text-sm">{t("blinds.import.invalidLink")}</p>
            )}
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {t("common.close")}
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
