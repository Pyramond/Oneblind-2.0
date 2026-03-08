"use client";

import { colorNames } from "@/interfaces/colorName";
import { IconButton } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { CheckIcon } from "@radix-ui/react-icons";

export default function ColorSelection() {
  const { setColor, color } = useSettings();
  const t = useI18n();

  return (
    <>
      <Title level={"h2"}>{t("settings.colorSelectionTitle")}</Title>

      <div className="flex flex-wrap gap-1 mt-3">
        {colorNames.map((name) => (
          <IconButton
            key={name}
            color={name}
            onClick={() => setColor(name)}
            className="w-8 h-8 p-0"
          >
            {name === color && <CheckIcon className="w-4 h-4" />}
          </IconButton>
        ))}
      </div>
    </>
  );
}
