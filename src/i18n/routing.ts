import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hr", "en"],
  defaultLocale: "hr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/esg": {
      hr: "/esg",
      en: "/esg-en",
    },
    "/nase-kvalifikacije": {
      hr: "/nase-kvalifikacije",
      en: "/our-qualifications",
    },
    "/kandidati": {
      hr: "/kandidati",
      en: "/candidates",
    },
    "/kontakt": {
      hr: "/kontakt",
      en: "/contact",
    },
    "/esg-awards": {
      hr: "/esg-awards",
      en: "/esg-awards-en",
    },
    "/wglc-natjecaj": "/wglc-natjecaj",
    "/pravila-privatnosti": {
      hr: "/pravila-privatnosti",
      en: "/privacy-policy",
    },
    "/prijava": {
      hr: "/prijava",
      en: "/register",
    },
    "/board": "/board",
    "/board/[slug]": "/board/[slug]",
  },
});

export type Locale = (typeof routing.locales)[number];
