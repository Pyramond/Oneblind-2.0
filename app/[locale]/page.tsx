import BestPlayers from "@/app/[locale]/components/BestPlayers";

export default async function Home() {
  return (
    <div className={"flex flex-row flex-wrap"}>
      <BestPlayers />
    </div>
  );
}
