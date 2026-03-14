import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";
import SettingsCard from "@/app/[locale]/settings/components/SettingsCard";
import ColorSelection from "@/app/[locale]/settings/components/appearance/ColorSelection";
import RadiusSelection from "@/app/[locale]/settings/components/appearance/RadiusSelection";
import LogoThemeSelection from "@/app/[locale]/settings/components/appearance/LogoThemeSelection";

export default async function SettingsPage() {
  const t = await getI18n();

  return (
    <>
      <Title level={"h2"}>{t("settings.title")}</Title>

      <div className={"mt-5"}>
        <SettingsCard title={t("settings.appearance.title")}>
          <ColorSelection />
          <RadiusSelection />
          <LogoThemeSelection />
        </SettingsCard>
      </div>
    </>
  );
}
