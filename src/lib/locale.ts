import type { Locale } from "@/i18n/routing";

export function asLocale(value: string): Locale {
  return value === "en" ? "en" : "hr";
}
