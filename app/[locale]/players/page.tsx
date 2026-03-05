import Title from "@/components/Title/Title";
import { getI18n } from "@/locales/server";
import CreatePlayer from "@/app/[locale]/players/components/CreatePlayer";
import PlayersList from "@/app/[locale]/players/components/PlayersList";

export default async function PlayersPage() {
  const t = await getI18n();

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-13">
        <Title level={"h2"}>{t("player.title")}</Title>
        <CreatePlayer />
      </div>
      <PlayersList />
    </>
  );
}
