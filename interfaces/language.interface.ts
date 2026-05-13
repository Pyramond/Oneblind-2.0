export const languages = ["fr", "en"] as const;

export type LanguageType = (typeof languages)[number];
