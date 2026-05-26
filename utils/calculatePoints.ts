export default function calculatePoints(
  position: number,
  totalPlayers: number,
): number {
  const base: number = 100;
  const participation = 10;
  if (position < 1 || position > totalPlayers)
    throw new RangeError("Invalid position");
  if (totalPlayers < 1) throw new RangeError("Invalid totalPlayers");

  return Math.round(base * Math.log(totalPlayers / position) + participation);
}
