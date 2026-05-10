import { useTournamentRunner } from "@/contexts/TournamentRunnerContext";

export default function AverageStack() {
  const { totalStack, remaining } = useTournamentRunner();

  const averageStack: number = Math.round(totalStack / remaining.length);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <span className="text-[8rem] font-bold leading-none text-zinc-700 dark:text-zinc-300">
        {averageStack}
      </span>
    </div>
  );
}
