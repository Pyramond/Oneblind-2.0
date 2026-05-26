export const alertSounds = ["default", "onePiece", "silent"] as const;

export type AlertSound = (typeof alertSounds)[number];
