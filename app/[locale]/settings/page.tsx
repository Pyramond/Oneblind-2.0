import AppearanceCard from "@/app/[locale]/settings/components/AppearanceCard";
import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";

export default async function SettingsPage() {
  const t = await getI18n();

  return (
    <>
      <Title level={"h2"}>{t("settings.title")}</Title>

      <div className={"mt-5"}>
        <AppearanceCard />
      </div>
    </>
  );
}
