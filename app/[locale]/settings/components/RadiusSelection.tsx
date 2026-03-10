"use client";

import { Select } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";
import { RadiusType, radiusTypes } from "@/interfaces/radius.interface";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";

export default function RadiusSelection() {
  const { setRadius, radius } = useSettings();
  const t = useI18n();

  function changeRadius(value: string): void {
    if (radiusTypes.includes(value as RadiusType)) {
      setRadius(value as RadiusType);
    }
  }

  return (
    <>
      <Title level={"h3"}>{t("settings.appearance.radius.title")}</Title>

      <div className={"m-3"}>
        <Select.Root
          defaultValue={radius}
          onValueChange={(value) => changeRadius(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {radiusTypes.map((item, index) => (
                <Select.Item key={index} value={item}>
                  {t(`settings.appearance.radius.type.${item}`)}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
