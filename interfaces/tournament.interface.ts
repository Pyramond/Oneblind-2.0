import { DateInterface } from "@/interfaces/date.interface";

export interface Tournament {
  name: string;
  countPoints: boolean;
  startingStack: number;
  blindStructureId: string;
  date?: DateInterface;
}

export interface TournamentParticipation {
  playerId: string;
  tournamentId: string;
  rank: number;
}
