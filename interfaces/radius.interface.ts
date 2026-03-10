export const radiusTypes = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;

export type RadiusType = (typeof radiusTypes)[number];
