"use client";

import { Select } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { AlertSound, alertSounds } from "@/interfaces/alert.interface";

export default function AlertSoundSelection() {
  const { setAlertSound, alertSound } = useSettings();
  const t = useI18n();

  function changeAlertSound(value: string): void {
    if (alertSounds.includes(value as AlertSound)) {
      setAlertSound(value as AlertSound);
    }
  }

  return (
    <>
      <Title level={"h4"}>{t("settings.appearance.alertSound.title")}</Title>

      <div className={"ml-3"}>
        <Select.Root
          defaultValue={alertSound}
          onValueChange={(value) => changeAlertSound(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {alertSounds.map((item, index) => (
                <Select.Item key={index} value={item}>
                  {t(`settings.appearance.alertSound.type.${item}`)}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
