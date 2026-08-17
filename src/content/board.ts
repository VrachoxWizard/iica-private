import type { Locale } from "@/i18n/routing";

export const boardMembers = [
  {
    id: "marija",
    slug: { hr: "marija-pujo-tadic", en: "marija-pujo-tadic-2" },
    name: "Marija Pujo Tadić",
    image: "/wp-content/uploads/2021/08/marija-pujo-tadic-iica-iase.jpg",
    group: "governors" as const,
    role: {
      hr: "Predsjednica Upravnog odbora IICA - ESG",
      en: "President of the Board of Directors of IICA - ESG",
    },
    bio: {
      hr: [
        "Međunarodna stručnjakinja za okolišno i klimatsko pravo i politike (Climate Leader) te ESG",
        "Sveučilišna specijalistica za vanjsku politiku i diplomaciju s naglaskom na klimatsku diplomaciju",
        "Ambasadorica – European Climate Pact – EU",
        "Specijalna savjetnica/izaslanica za klimatsku akciju Republike Hrvatske",
      ],
      en: [
        "International expert in environmental and climate law and policies (Climate Leader), and ESG",
        "International foreign policy and diplomacy expert with a focus on climate diplomacy",
        "Ambassador – European Climate Pact – EU",
        "Special Adviser/Envoy for the Climate Action of the Republic of Croatia",
      ],
    },
  },
  {
    id: "tatjana",
    slug: { hr: "tatjana-kelemen", en: "tatjana-kelemen-en" },
    name: "Tatjana Kelemen",
    image: "/wp-content/uploads/2021/08/kelemen-1-scaled-e1739461858463.jpg",
    group: "governors" as const,
    role: {
      hr: "Članica Upravnog odbora IICA ESG",
      en: "Member of the board",
    },
    bio: {
      hr: [
        "Specijalistica za izradu softverskih rješenja, vođenje timova i vođenje projekata",
        "Specijalistica za utjecaj obnovljivih izvora energije na ublažavanje klimatskih promjena",
      ],
      en: [
        "Specialist in creating software solutions, leading teams, and managing projects",
        "Specialist in the impact of renewable energy sources on mitigating climate change",
      ],
    },
  },
  {
    id: "javier",
    slug: { hr: "javier-manzanares-allen", en: "javier-manzanares-allen-2" },
    name: "Javier Manzanares Allen",
    image:
      "/wp-content/uploads/2024/02/Javier_Manzanares_Allen-e1697050092814.jpg",
    group: "governors" as const,
    role: {
      hr: "Potpredsjednik upravnog odbora i Etički povjerenik IICA-ESG",
      en: "Vice president of the Board of directors and Ethics Commissioner - IICA-ESG",
    },
    bio: {
      hr: [
        "Javier Manzanares Allen ima više od dvadeset pet godina iskustva u upravljanju međunarodnim organizacijama, multilateralnim razvojnim bankama i financijskim institucijama, radeći sa značajnim dionicima i političkim vođama u multikulturalnim i kompliciranim okruženjima.",
      ],
      en: [
        "Javier Manzanares Allen has over twenty-five years of management experience in international organisations, multilateral development banks, and financial institutions, working with significant stakeholders and political leaders in multicultural and complicated environments.",
      ],
    },
  },
  {
    id: "mladen",
    slug: { hr: "mladen-vedris-phd", en: "mladen-vedris-phd-2" },
    name: "Mladen Vedriš, PhD",
    image: "/wp-content/uploads/2021/08/mladen-vedris-300.jpg",
    group: "committee" as const,
    role: {
      hr: "IICA-ESG Akademski odbor (AC)",
      en: "IICA-ESG Academic committee (AC)",
    },
    bio: {
      hr: ["Profesor i ekonomski stručnjak – političar i poslovni čovjek"],
      en: ["Professor and economic expert – politician and businessman"],
    },
  },
];

export const boardCopy = {
  hr: {
    title: "Upravni odbor",
    governors: "Upravni odbor",
    committee: "Odbor",
    secretariat: "Tajništvo",
  },
  en: {
    title: "Board of governors",
    governors: "Board of governors",
    committee: "Committee",
    secretariat: "Secretariat",
  },
};

export function getBoardMember(locale: Locale, slug: string) {
  return boardMembers.find((member) => member.slug[locale] === slug);
}

export function getBoardGroups(locale: Locale) {
  return {
    copy: boardCopy[locale],
    governors: boardMembers.filter((m) => m.group === "governors"),
    committee: boardMembers.filter((m) => m.group === "committee"),
  };
}
