export interface BlindStep {
  type: "game" | "pause";
  time: number;
  small_blind: number;
  big_blind: number;
}

export interface BlindStructure {
  name: string;
  steps: BlindStep[];
}
