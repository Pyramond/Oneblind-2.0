import { DateInterface } from "@/interfaces/date.interface";

export interface Tournament {
  id?: string;
  name: string;
  countPoints: boolean;
  startingStack: number;
  blindStructureId: string;
  date?: DateInterface;
  finished: boolean;
}

export interface TournamentParticipation {
  playerId: string;
  tournamentId: string;
  rank: number;
}
