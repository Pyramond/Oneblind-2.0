"use client";

import { Button } from "@radix-ui/themes";
import { useI18n } from "@/locales/client";
import { useBlinds } from "@/contexts/BlindsContext";

export default function ExportBlindBtn({ id }: { id: string }) {
  const t = useI18n();
  const { getBlindStructureById } = useBlinds();

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

  return (
    <Button color="gray" variant="soft" onClick={handleExport}>
      {t("blinds.exportBtn")}
    </Button>
  );
}
