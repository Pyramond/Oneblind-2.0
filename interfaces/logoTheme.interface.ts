export const logoThemes = ["default", "onePiece"] as const;

export type LogoTheme = (typeof logoThemes)[number];
