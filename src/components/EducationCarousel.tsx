"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
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

function trackLabel(locale: Locale, track: EducationCard["track"]) {
  const data = getEducation(locale);
  if (track === "level1") return data.level1;
  if (track === "level2") return data.level2;
  return data.ceo;
}

function Countdown({ locale, label }: { locale: Locale; label: string }) {
  const home = getHome(locale);
  const [remaining, setRemaining] = useState(() => EARLY_BIRD_DEADLINE.getTime() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, EARLY_BIRD_DEADLINE.getTime() - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="early-bird-countdown">
      <span>{label}</span>
      <strong>
        {days}
        {home.days} {hours}
        {home.hours} {minutes}
        {home.minutes} {seconds}
        {home.seconds}
      </strong>
    </div>
  );
}

export function EducationCarousel({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const a11y = useTranslations("a11y");
  const courses = useMemo(() => getUpcomingCourses(locale, 5), [locale]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  const visibleCount = 3;
  const maxOffset = Math.max(0, courses.length - visibleCount);

  useEffect(() => {
    setSelectedIndex(0);
    setOffset(0);
  }, [courses.length]);

  const shift = useCallback(
    (delta: number) => {
      setOffset((current) => {
        const next = Math.min(maxOffset, Math.max(0, current + delta));
        return next;
      });
    },
    [maxOffset],
  );

  if (courses.length === 0) return null;

  const selected = courses[selectedIndex] ?? courses[0];

  return (
    <div className="hero-edu-carousel">
      <div className="early-bird-banner">
        <span className="early-bird-badge">{home.earlyBird}</span>
        <span className="early-bird-spots">
          {SPOTS[selectedIndex] ?? 8} {home.spotsRemaining}
        </span>
        <Countdown locale={locale} label={home.discountEnds} />
      </div>

      <div className="edu-carousel-viewport">
        <div
          className="edu-carousel-track"
          style={{ "--offset": offset } as CSSProperties}
        >
          {courses.map((course, index) => {
            const coursePrice = course.price.replace(/^Cijena:\s|^Price:\s/, "");
            return (
              <button
                type="button"
                key={`${course.isoStart}-${course.track}`}
                className={`edu-carousel-card${index === selectedIndex ? " is-selected" : ""}`}
                onClick={() => setSelectedIndex(index)}
              >
                <span className={`edu-carousel-cat cat-${course.track}`}>
                  {trackLabel(locale, course.track)}
                </span>
                <strong>{course.level}</strong>
                <span>{course.start}</span>
                <span>{coursePrice}</span>
              </button>
            );
          })}
        </div>
      </div>

      {courses.length > visibleCount ? (
        <div className="edu-carousel-nav">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={offset === 0}
            aria-label={a11y("prev")}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={offset >= maxOffset}
            aria-label={a11y("next")}
          >
            ›
          </button>
        </div>
      ) : null}

      <p className="edu-carousel-desc">{courseDescription(locale, selected)}</p>
      <Link href="/prijava" className="cta-btn edu-carousel-cta">
        {home.modalCta}
      </Link>
    </div>
  );
}
