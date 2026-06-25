"use client";

import { useRef, ChangeEvent } from "react";
import { useI18n } from "@/locales/client";
import { Button } from "@radix-ui/themes";
import { useBlinds } from "@/contexts/BlindsContext";
import { BlindStructure } from "@/interfaces/blindStructure.interface";

export default function ImportBlindBtn() {
  const t = useI18n();
  const { addBlindStructure } = useBlinds();
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button color="gray" onClick={() => inputRef.current?.click()}>
        {t("blinds.importBtn")}
      </Button>
    </>
  );
}
