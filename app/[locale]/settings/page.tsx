import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";
import SettingsCard from "@/app/[locale]/settings/components/SettingsCard";
import ColorSelection from "@/app/[locale]/settings/components/appearance/ColorSelection";
import RadiusSelection from "@/app/[locale]/settings/components/appearance/RadiusSelection";
import LogoThemeSelection from "@/app/[locale]/settings/components/appearance/LogoThemeSelection";
import LanguageSelection from "@/app/[locale]/settings/components/other/LanguageSelection";
import FirebaseStatus from "@/app/[locale]/settings/components/firebase/FirebaseStatus";
import GithubLink from "@/app/[locale]/settings/components/informations/GithubLink";
import AppVersion from "@/app/[locale]/settings/components/informations/AppVersion";
import LogsSettings from "@/app/[locale]/settings/components/logs/LogsSettings";
import AlertSoundSelection from "@/app/[locale]/settings/components/appearance/AlertSoundSelection";
import SpotifyLogin from "@/app/[locale]/settings/components/spotify/SpotifyLogin";

export default async function SettingsPage() {
  const t = await getI18n();

  return (
    <>
      <Title level={"h2"}>{t("settings.title")}</Title>

      <div className={"mt-5 flex flex-col gap-5"}>
        <SettingsCard title={"Firebase"}>
          <FirebaseStatus />
        </SettingsCard>

        <SettingsCard title={t("settings.other.title")}>
          <LanguageSelection />
        </SettingsCard>

        <SettingsCard title={t("settings.appearance.title")}>
          <ColorSelection />
          <RadiusSelection />
          <LogoThemeSelection />
          <AlertSoundSelection />
        </SettingsCard>

        <SettingsCard title={"Spotify"}>
          <SpotifyLogin />
        </SettingsCard>

        <SettingsCard title={t("logs.title")}>
          <LogsSettings />
        </SettingsCard>

        <SettingsCard title={t("settings.informations.title")}>
          <GithubLink />
          <AppVersion />
        </SettingsCard>
      </div>
    </>
  );
}
