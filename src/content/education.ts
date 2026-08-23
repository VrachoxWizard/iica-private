import type { Locale } from "@/i18n/routing";

export type EducationCard = {
  title: string;
  level: string;
  start: string;
  end: string;
  startLabel: string;
  endLabel: string;
  price: string;
  isoStart: string;
  isoEnd: string;
  track: "level1" | "level2" | "ceo";
  hours: string;
};

const schedule = [
  ["2026-01-26", "2026-03-08", "level1", "30h"],
  ["2026-03-30", "2026-05-01", "level1", "30h"],
  ["2026-05-11", "2026-06-02", "level1", "30h"],
  ["2026-09-07", "2026-10-18", "level1", "30h"],
  ["2026-10-26", "2026-12-06", "level1", "30h"],
  ["2026-03-09", "2026-05-31", "level2", "30h"],
  ["2026-06-01", "2026-09-13", "level2", "30h"],
  ["2026-09-14", "2026-12-06", "level2", "30h"],
  ["2026-12-07", "2027-03-14", "level2", "30h"],
  ["2026-02-23", "2026-03-22", "ceo", "12h"],
  ["2026-04-06", "2026-05-03", "ceo", "12h"],
  ["2026-05-25", "2026-06-21", "ceo", "12h"],
  ["2026-06-22", "2026-07-19", "ceo", "12h"],
  ["2026-09-21", "2026-10-18", "ceo", "12h"],
  ["2026-11-02", "2026-11-29", "ceo", "12h"],
] as const;

const coursesHrRaw = [
  {
    title: "Siječanj - Ožujak 2026",
    level: "Level 1",
    start: "26 Sij 2026",
    end: "08 Ožu 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €550,00",
  },
  {
    title: "Ožujak - Svibanj 2026",
    level: "Level 1",
    start: "30 Ožu 2026",
    end: "01 Svi 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €550,00",
  },
  {
    title: "Svibanj - Lipanj 2026",
    level: "Level 1",
    start: "11 Svi 2026",
    end: "02 Lip 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €550,00",
  },
  {
    title: "Rujan - Listopad 2026",
    level: "Level 1",
    start: "07 Ruj 2026",
    end: "18 Lis 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €550,00",
  },
  {
    title: "Listopad - Prosinac 2026",
    level: "Level 1",
    start: "26 Lis 2026",
    end: "06 Pro 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €550,00",
  },
  {
    title: "Ožujak - Svibanj 2026",
    level: "Level 2",
    start: "09 Ožu 2026",
    end: "31 Svi 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €950,00",
  },
  {
    title: "Lipanj - Rujan 2026",
    level: "Level 2",
    start: "01 Lip 2026",
    end: "13 Ruj 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €950,00",
  },
  {
    title: "Rujan - Prosinac 2026",
    level: "Level 2",
    start: "14 Ruj 2025",
    end: "06 Pro 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €950,00",
  },
  {
    title: "Prosinac 2026 - Ožujak 2027",
    level: "Level 2",
    start: "07 Pro 2026",
    end: "14 Ožu 2027",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €950,00",
  },
  {
    title: "Veljača - Ožujak 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "23 Velj 2026",
    end: "22 Ožu 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
  {
    title: "Travanj - Svibanj 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "06 Tra 2026",
    end: "03 Svi 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
  {
    title: "Svibanj - Lipanj 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "25 Svi 2026",
    end: "21 Lip 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
  {
    title: "Lipanj - Srpanj 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "22 Lip 2026",
    end: "19 Srp 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
  {
    title: "Rujan - Listopad 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "21 Ruj 2026",
    end: "18 Lis 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
  {
    title: "Studeni - Studeni 2026",
    level: "Edukacija za CEOs i državne dužnosnike",
    start: "02 Stu 2026",
    end: "29 Stu 2026",
    startLabel: "Početak:",
    endLabel: "Kraj:",
    price: "Cijena: €700,00",
  },
];

const coursesHr: EducationCard[] = coursesHrRaw.map((course, index) => ({
  ...course,
  isoStart: schedule[index][0],
  isoEnd: schedule[index][1],
  track: schedule[index][2],
  hours: schedule[index][3],
}));

const coursesEn: EducationCard[] = coursesHr.map((course) => ({
  ...course,
  startLabel: "Start:",
  endLabel: "End:",
  price: course.price.replace("Cijena:", "Price:"),
  level:
    course.level === "Edukacija za CEOs i državne dužnosnike"
      ? "Education for CEOs and government officials"
      : course.level,
}));

export const education = {
  hr: {
    chooseTitle: "Odaberi edukaciju",
    schedule:
      "Raspored ESG edukacija za pripremu kandidata za ISB i ISF certifikaciju:",
    durationTitle: "Trajanje",
    durationBody:
      "Tečaj se održava online u trajanju od 8 tjedana (ponedjeljak – petak) s očekivanom dnevnom obvezom od najmanje 45 minuta, što odgovara 30 sati online obuke.",
    ceoDuration:
      "Edukacija se provodi online, u trajanju od ukupno 12 sati podijeljenih na 8 modula.",
    level1: "Level 1",
    level2: "Level 2",
    ceo: "Edukacija za CEOs i državne dužnosnike",
    applyTitle: "Prijava na edukaciju",
    entityLabel: "Prijavljujem se kao:",
    individual:
      "FIZIČKA osoba (individualno)- osoba koja sama snosi troškove edukacije",
    company:
      "PRAVNA osoba- (kompanija/ustanova/državno ili javnopravno tijelo/fondovi/NGO/financijske ustanove) i svi oni koji podmiruju troškove edukacije za 1 ili više djelatnika",
    firstName: "Ime",
    lastName: "Prezime",
    direction: "Smjer edukacije:",
    business: "Business",
    finance: "Finance",
    userMail: "Email adresa putem koje pristupate edukaciji",
    companyName: "Naziv tvrtke:",
    companyEmail: "Email adresa za zaprimanje ponude",
    address: "Adresa:",
    oib: "OIB:",
    candidates: "Podaci o kandidatima",
    candidatesPlaceholder:
      "Ime i prezime; Smjer (Business ili Finance); Email adresa kojom kandidat pristupa edukaciji",
    courses: coursesHr,
  },
  en: {
    chooseTitle: "Choose education",
    schedule:
      "Schedule of ESG education for preparing candidates for ISB and ISF certification:",
    durationTitle: "Duration",
    durationBody:
      "The course is held online over 8 weeks (Monday – Friday) with an expected daily commitment of at least 45 minutes, corresponding to 30 hours of online training.",
    ceoDuration:
      "The education is delivered online, lasting a total of 12 hours divided into 8 modules.",
    level1: "Level 1",
    level2: "Level 2",
    ceo: "Education for CEOs and government officials",
    applyTitle: "Education registration",
    entityLabel: "I am applying as:",
    individual:
      "NATURAL person (individual) – a person who covers the cost of education themselves",
    company:
      "LEGAL person – (company/institution/state or public body/funds/NGO/financial institutions) and anyone covering education costs for 1 or more employees",
    firstName: "First name",
    lastName: "Last name",
    direction: "Education track:",
    business: "Business",
    finance: "Finance",
    userMail: "Email address used to access the education",
    companyName: "Company name:",
    companyEmail: "Email address for receiving the offer",
    address: "Address:",
    oib: "PIN / OIB:",
    candidates: "Candidate details",
    candidatesPlaceholder:
      "Full name; Track (Business or Finance); Email address used by the candidate to access the education",
    courses: coursesEn,
  },
} as const;

export function getEducation(locale: Locale) {
  return education[locale];
}

export function getUpcomingCourses(locale: Locale, limit = 5, now = new Date()) {
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  return [...getEducation(locale).courses]
    .filter((course) => course.isoStart >= today)
    .sort((a, b) => a.isoStart.localeCompare(b.isoStart))
    .slice(0, limit);
}

export function getNextCourse(locale: Locale, now = new Date()) {
  return getUpcomingCourses(locale, 1, now)[0];
}

export function courseDescription(locale: Locale, course: EducationCard) {
  const data = getEducation(locale);
  return course.track === "ceo" ? data.ceoDuration : data.durationBody;
}
