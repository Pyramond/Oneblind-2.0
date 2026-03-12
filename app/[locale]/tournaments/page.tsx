import { getI18n } from "@/locales/server";
import Title from "@/components/Title/Title";
import CreateTournament from "@/app/[locale]/tournaments/components/CreateTournament";
export default async function TournamentsPage() {
  const t = await getI18n();

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-13">
        <Title level={"h2"}>{t("tournaments.title")}</Title>
        <CreateTournament />
      </div>
    </>
  );
}
