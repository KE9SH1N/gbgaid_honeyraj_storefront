export type Locale = (typeof locales)[number];

export const locales = ["en", "bn"] as const;
export const defaultLocale: Locale = "bn";
