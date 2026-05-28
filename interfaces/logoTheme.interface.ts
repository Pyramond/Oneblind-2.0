export const logoThemes = ["default", "onePiece", "og"] as const;

export type LogoTheme = (typeof logoThemes)[number];
