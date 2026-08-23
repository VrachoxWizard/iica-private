"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getHome } from "@/content/home";
import {
  courseDescription,
  getEducation,
  getUpcomingCourses,
  type EducationCard,
} from "@/content/education";
import type { Locale } from "@/i18n/routing";

const EARLY_BIRD_DEADLINE = new Date("2026-09-30T23:59:59");
const SPOTS = [14, 11, 9, 7, 5];
const VISIBLE_COUNT = 3;
const GAP_REM = 0.9;

function trackShortLabel(locale: Locale, track: EducationCard["track"]) {
  const data = getEducation(locale);
  if (track === "level1") return data.level1;
  if (track === "level2") return data.level2;
  return "CEO";
}

function Countdown({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    function tick() {
      setRemaining(Math.max(0, EARLY_BIRD_DEADLINE.getTime() - Date.now()));
    }
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = remaining === null ? null : Math.floor(remaining / 1000);
  const units = [
    { value: total === null ? null : Math.floor(total / 86400), label: home.modalDays },
    { value: total === null ? null : Math.floor((total % 86400) / 3600), label: home.modalHours },
    { value: total === null ? null : Math.floor((total % 3600) / 60), label: home.modalMin },
    { value: total === null ? null : total % 60, label: home.modalSec },
  ];

  return (
    <div className="dossier-clock">
      <span className="dossier-clock-label">{home.discountEnds}</span>
      <div className="dossier-clock-tiles">
        {units.map((unit) => (
          <span className="dossier-clock-tile" key={unit.label}>
            <b>{unit.value === null ? "—" : String(unit.value).padStart(2, "0")}</b>
            <i>{unit.label}</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export function EducationCarousel({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const a11y = useTranslations("a11y");
  const courses = useMemo(() => getUpcomingCourses(locale, 5), [locale]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT);

  const maxOffset = Math.max(0, courses.length - visibleCount);

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth <= 700) setVisibleCount(1);
      else if (window.innerWidth <= 980) setVisibleCount(2);
      else setVisibleCount(VISIBLE_COUNT);
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setOffset((current) => Math.min(current, Math.max(0, courses.length - visibleCount)));
  }, [courses.length, visibleCount]);

  useEffect(() => {
    if (selectedIndex < offset) setOffset(selectedIndex);
    else if (selectedIndex >= offset + visibleCount) setOffset(selectedIndex - visibleCount + 1);
  }, [selectedIndex, offset, visibleCount]);

  const shift = useCallback(
    (delta: number) => {
      setOffset((current) => Math.min(maxOffset, Math.max(0, current + delta)));
    },
    [maxOffset],
  );

  function onTrackKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    setSelectedIndex((current) =>
      Math.min(courses.length - 1, Math.max(0, current + delta)),
    );
  }

  if (courses.length === 0) return null;

  const selected = courses[selectedIndex] ?? courses[0];
  const cardStep = `calc((100% - ${(visibleCount - 1) * GAP_REM}rem) / ${visibleCount})`;

  return (
    <section
      className="dossier"
      aria-label={home.upcomingLabel}
      style={
        {
          "--offset": offset,
          "--card-step": cardStep,
          "--gap": `${GAP_REM}rem`,
        } as CSSProperties
      }
    >
      <header className="dossier-head">
        <div className="dossier-head-main">
          <span className="dossier-label">{home.upcomingLabel}</span>
          <span className="dossier-badge">{home.earlyBird}</span>
          <span className="dossier-seats">
            <i className="dossier-pulse" aria-hidden="true" />
            {SPOTS[selectedIndex] ?? 8} {home.spotsRemaining}
          </span>
        </div>
        <Countdown locale={locale} />
      </header>

      <div className="dossier-viewport">
        <div
          className="dossier-track"
          role="group"
          tabIndex={0}
          onKeyDown={onTrackKeyDown}
          aria-label={home.upcomingLabel}
        >
          {courses.map((course, index) => {
            const coursePrice = course.price.replace(/^Cijena:\s|^Price:\s/, "");
            const isSelected = index === selectedIndex;
            return (
              <button
                type="button"
                key={`${course.isoStart}-${course.track}`}
                className={`dossier-card cat-${course.track}${isSelected ? " is-selected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="dossier-card-rail" aria-hidden="true" />
                <span className="dossier-card-top">
                  <span className="dossier-card-track">
                    {trackShortLabel(locale, course.track)}
                  </span>
                  <span className="dossier-card-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <strong className="dossier-card-term">{course.title}</strong>
                <span className="dossier-card-foot">
                  <span className="dossier-card-date">{course.start}</span>
                  <span className="dossier-card-price">{coursePrice}</span>
                </span>
                {isSelected ? (
                  <span className="dossier-card-mark">
                    <span className="visually-hidden">{home.selectedLabel}</span>
                    <svg viewBox="0 0 12 12" aria-hidden="true" fill="none">
                      <path
                        d="M2.5 6.3l2.4 2.4 4.6-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {courses.length > visibleCount ? (
        <div className="dossier-controls">
          <div className="dossier-dots">
            {courses.map((course, index) => (
              <button
                type="button"
                key={`dot-${course.isoStart}-${course.track}`}
                className={`dossier-dot${index === selectedIndex ? " is-active" : ""}`}
                aria-label={course.title}
                aria-current={index === selectedIndex ? "true" : undefined}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
          <div className="dossier-arrows">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={offset === 0}
              aria-label={a11y("prev")}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              disabled={offset >= maxOffset}
              aria-label={a11y("next")}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      <footer className="dossier-foot">
        <p className="dossier-note">{courseDescription(locale, selected)}</p>
        <Link href="/prijava" className="dossier-cta">
          <span>{home.modalCta}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path
              d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </footer>
    </section>
  );
}
