import ColorSelection from "@/app/[locale]/settings/components/ColorSelection";
import RadiusSelection from "@/app/[locale]/settings/components/RadiusSelection";
import { Card } from "@radix-ui/themes";
import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";

export default async function AppearanceCard() {
  const t = await getI18n();

  return (
    <Card>
      <Title level={"h3"}>{t("settings.appearance.title")}</Title>

      <div className={"flex flex-col gap-5 mt-3 ml-2"}>
        <ColorSelection />
        <RadiusSelection />
      </div>
    </Card>
  );
}
