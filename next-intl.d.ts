import { routing } from "./src/i18n/routing";
import hr from "./messages/hr.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof hr;
    pathnames: typeof routing.pathnames;
  }
}
