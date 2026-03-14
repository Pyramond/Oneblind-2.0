"use client";

import { Select } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import { languages, LanguageType } from "@/interfaces/language.interface";

export default function LanguageSelection() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  function handleLanguageChange(value: string): void {
    if (languages.includes(value as LanguageType)) {
      changeLocale(value as LanguageType);
    }
  }

  return (
    <>
      <Title level={"h4"}>{t("settings.other.language.title")}</Title>

      <div className={"ml-3"}>
        <Select.Root
          defaultValue={locale}
          onValueChange={(value) => handleLanguageChange(value)}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {languages.map((item, index) => (
                <Select.Item key={index} value={item}>
                  {t(`settings.other.language.${item}`)}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </>
  );
}
