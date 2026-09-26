"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";
import { useState } from "react";

export default function ExportBlindBtn({ id }: { id: string }) {

  const t = useI18n();
  const { getBlindStructureById } = useBlinds();

  const [copied, setCopied] =  useState(false);

  function handleExport(): void {
    const structure = getBlindStructureById(id);
    if (!structure) return;

    const { name, steps } = structure;
    const blob = new Blob([JSON.stringify({ name, steps }, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function createShareLink(): string {
    const structure = getBlindStructureById(id);
    const base =
        typeof window !== "undefined"
            ? window.location.origin
            : "https://oneblind.app";
    const data = encodeURIComponent(JSON.stringify(structure));
    return `${base}/shared?d=${data}`;
  }

  async function handleCopy(): Promise<void> {

    await navigator.clipboard.writeText(createShareLink());
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800)
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="gray" variant="soft" onClick={undefined}>
            {t("blinds.export.btn")}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content >
          <Dialog.Title>{t("blinds.export.title")}</Dialog.Title>
          <Dialog.Description size="2" mb="4">{t("blinds.export.description")}</Dialog.Description>

          <div className={"flex flex-row gap-3"}>
            <Button onClick={handleExport}>{t("blinds.export.downloadBtn")}</Button>
            <Button color={copied ? "green" : undefined} variant={"soft"} onClick={handleCopy}>{t(copied ? "blinds.export.linkCopiedBtn" : "blinds.export.linkBtn")}</Button>
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
