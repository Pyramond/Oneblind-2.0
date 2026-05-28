import BestPlayers from "@/app/[locale]/components/BestPlayers";
import LastTournaments from "@/app/[locale]/components/LastTournaments";

export default async function Home() {
  return (
    <div className={"flex gap-3"}>
      <BestPlayers />
      <LastTournaments />
    </div>
  );
}
