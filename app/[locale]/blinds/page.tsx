import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";
import CreateBlindStructure from "@/app/[locale]/blinds/components/CreateBlindStructure";

export default async function BlindsPage() {
  const t = await getI18n();

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-13">
        <Title level={"h2"}>{t("blinds.title")}</Title>
        <CreateBlindStructure />
      </div>
    </>
  );
}
