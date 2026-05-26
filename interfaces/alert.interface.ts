export const alertSounds = ["default", "onePiece"] as const;

export type AlertSound = (typeof alertSounds)[number];
