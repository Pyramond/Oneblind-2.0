"use client";

import { Select } from "@radix-ui/themes";
import { useSettings } from "@/contexts/SettingsContext";
import Title from "@/components/Title/Title";
import { useI18n } from "@/locales/client";
import { LogoTheme, logoThemes } from "@/interfaces/logoTheme.interface";

export default function LogoThemeSelection() {
  const { setLogoTheme, logoTheme } = useSettings();
  const t = useI18n();

  function changeLogoTheme(value: string): void {
    if (logoThemes.includes(value as LogoTheme)) {
      setLogoTheme(value as LogoTheme);
    }
  }

  return (
    <>
      <Title level={"h4"}>{t("settings.appearance.radius.title")}</Title>

      <div className={"ml-3"}>
        <Select.Root
          defaultValue={logoTheme}
          onValueChange={(value) => changeLogoTheme(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {logoThemes.map((item, index) => (
                <Select.Item key={index} value={item}>
                  {t(`settings.appearance.logoTheme.type.${item}`)}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
