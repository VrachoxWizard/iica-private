"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  courseDescription,
  getEducation,
  getNextCourse,
  type EducationCard,
} from "@/content/education";
import type { Locale } from "@/i18n/routing";

const WEEKDAYS = {
  hr: ["P", "U", "S", "Č", "P", "S", "N"],
  en: ["M", "T", "W", "T", "F", "S", "S"],
};

function monthLabel(locale: Locale, year: number, month: number) {
  return new Intl.DateTimeFormat(locale === "hr" ? "hr-HR" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
}

export function EducationHub({ locale }: { locale: Locale }) {
  const t = useTranslations("forms");
  const data = getEducation(locale);
  const next = getNextCourse(locale);
  const initial = next ?? data.courses[0];
  const start = new Date(initial.isoStart);
  const [year, setYear] = useState(start.getFullYear());
  const [month, setMonth] = useState(start.getMonth());
  const [selected, setSelected] = useState<EducationCard>(initial);
  const [modalOpen, setModalOpen] = useState(false);
  const [entity, setEntity] = useState<"individual" | "company">("individual");
  const [sent, setSent] = useState(false);

  const byDay = useMemo(() => {
    const map = new Map<string, EducationCard[]>();
    for (const course of data.courses) {
      const key = course.isoStart;
      const list = map.get(key) ?? [];
      list.push(course);
      map.set(key, list);
    }
    return map;
  }, [data.courses]);

  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const startWeekday = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const items: { day: number | null; iso?: string }[] = [];
    for (let i = 0; i < startWeekday; i += 1) items.push({ day: null });
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      items.push({ day, iso });
    }
    return items;
  }, [year, month]);

  function shiftMonth(delta: number) {
    const date = new Date(year, month + delta, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    setSent(true);
  }

  return (
    <div className="edu-hub">
      <header className="edu-hub-intro">
        <p className="edu-kicker">{data.chooseTitle}</p>
        <h1>{data.applyTitle}</h1>
        <p>{data.schedule}</p>
      </header>
      <div className="edu-layout">
        <div className="edu-calendar">
          <div className="edu-cal-nav">
            <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">
              ‹
            </button>
            <strong>{monthLabel(locale, year, month)}</strong>
            <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="edu-cal-grid">
            {WEEKDAYS[locale].map((label, index) => (
              <span className="edu-cal-dow" key={`${label}-${index}`}>
                {label}
              </span>
            ))}
            {cells.map((cell, index) => {
              const courses = cell.iso ? byDay.get(cell.iso) : undefined;
              const isSelected = cell.iso === selected.isoStart;
              return (
                <button
                  type="button"
                  key={index}
                  disabled={!courses}
                  className={`edu-cal-day${courses ? " has-course" : ""}${isSelected ? " is-selected" : ""}`}
                  onClick={() => courses && setSelected(courses[0])}
                >
                  {cell.day ?? ""}
                  {courses ? (
                    <span className="edu-cal-dots">
                      {courses.map((course) => (
                        <i className={`dot ${course.track}`} key={`${course.track}-${course.isoStart}`} />
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <ul className="edu-legend">
            <li>
              <i className="dot level1" /> {data.level1}
            </li>
            <li>
              <i className="dot level2" /> {data.level2}
            </li>
            <li>
              <i className="dot ceo" /> {data.ceo}
            </li>
          </ul>
        </div>
        <aside className="edu-panel">
          <p className="edu-kicker">{selected.level}</p>
          <h2>{selected.title}</h2>
          <dl>
            <div>
              <dt>{selected.startLabel}</dt>
              <dd>{selected.start}</dd>
            </div>
            <div>
              <dt>{selected.endLabel}</dt>
              <dd>{selected.end}</dd>
            </div>
            <div>
              <dt>{data.durationTitle}</dt>
              <dd>{selected.hours}</dd>
            </div>
            <div>
              <dt>{locale === "hr" ? "Cijena" : "Price"}</dt>
              <dd>{selected.price.replace(/^Cijena:\s|^Price:\s/, "")}</dd>
            </div>
          </dl>
          <p>{courseDescription(locale, selected)}</p>
          <button type="button" className="cta-btn" onClick={() => setModalOpen(true)}>
            {t("apply")}
          </button>
        </aside>
      </div>

      {modalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="reg-modal">
            <button type="button" className="close" onClick={() => { setModalOpen(false); setSent(false); }}>
              ×
            </button>
            {sent ? (
              <div className="success-message is-visible">{t("success")}</div>
            ) : (
              <form className="reg-form" noValidate onSubmit={onSubmit}>
                <p className="edu-kicker">{selected.level}</p>
                <h2>{t("apply")}</h2>
                <p>
                  {selected.title} · {selected.start} – {selected.end} ·{" "}
                  {selected.price.replace(/^Cijena:\s|^Price:\s/, "")}
                </p>
                <fieldset>
                  <legend>{data.entityLabel}</legend>
                  <label>
                    <input
                      type="radio"
                      name="entityType"
                      checked={entity === "individual"}
                      onChange={() => setEntity("individual")}
                    />
                    {locale === "hr" ? "Fizička osoba" : "Individual"}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="entityType"
                      checked={entity === "company"}
                      onChange={() => setEntity("company")}
                    />
                    {locale === "hr" ? "Pravna osoba" : "Organisation"}
                  </label>
                </fieldset>
                {entity === "individual" ? (
                  <div className="reg-grid">
                    <input name="firstName" required placeholder={data.firstName} />
                    <input name="lastName" required placeholder={data.lastName} />
                    <input name="userMail" type="email" required placeholder={data.userMail} />
                    <label className="reg-check">
                      <input type="checkbox" name="educationDirection" defaultChecked />
                      {data.business}
                    </label>
                    <label className="reg-check">
                      <input type="checkbox" name="educationDirectionFinance" />
                      {data.finance}
                    </label>
                  </div>
                ) : (
                  <div className="reg-grid">
                    <input name="companyName" required placeholder={data.companyName} />
                    <input name="companyEmail" type="email" required placeholder={data.companyEmail} />
                    <input name="address" required placeholder={data.address} />
                    <input name="oib" required placeholder={data.oib} />
                    <textarea
                      name="candidatesData"
                      required
                      placeholder={data.candidatesPlaceholder}
                      rows={3}
                    />
                  </div>
                )}
                <label className="reg-check">
                  <input type="checkbox" name="privacy" required />
                  <span>
                    {t("privacyPrefix")}{" "}
                    <Link href="/pravila-privatnosti" target="_blank">
                      {t("privacyLink")}
                    </Link>
                  </span>
                </label>
                <input type="hidden" name="level" value={selected.level} />
                <input type="hidden" name="startDate" value={selected.start} />
                <input type="hidden" name="endDate" value={selected.end} />
                <button className="cta-btn" type="submit">
                  {t("send")}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
