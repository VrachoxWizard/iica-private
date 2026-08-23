"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { assets, getHome } from "@/content/home";
import { getNextCourseByTrack } from "@/content/education";
import { Modal } from "@/components/Modal";
import type { Locale } from "@/i18n/routing";

function CourseCountdown({
  locale,
  isoStart,
}: {
  locale: Locale;
  isoStart?: string;
}) {
  const home = getHome(locale);
  const target = isoStart ? new Date(`${isoStart}T00:00:00`).getTime() : null;
  const [remaining, setRemaining] = useState(() =>
    target ? Math.max(0, target - Date.now()) : 0,
  );

  useEffect(() => {
    if (!target) return;
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!target) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const dayLabel = days === 1 ? home.modalDay : home.modalDays;

  return (
    <div className="welcome-clock" aria-live="polite">
      <span>
        <strong>{days}</strong> {dayLabel}
      </span>
      <span>
        <strong>{hours}</strong> {home.modalHours}
      </span>
      <span>
        <strong>{minutes}</strong> {home.modalMin}
      </span>
      <span>
        <strong>{seconds}</strong> {home.modalSec}
      </span>
    </div>
  );
}

export function WelcomeModal({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const home = getHome(locale);
  const a11y = useTranslations("a11y");
  const tracks = [
    { track: "level1" as const, label: home.modalCourses[0] },
    { track: "level2" as const, label: home.modalCourses[1] },
    { track: "ceo" as const, label: home.modalCourses[2] },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="welcome-title"
      className="registration-modal"
    >
      <div
        className="registration-modal-shell"
        style={{ backgroundImage: `url(${assets.modal})` }}
      >
        <div className="registration-modal-content">
          <header className="registration-modal-header">
            <h2 id="welcome-title">{home.modalTitle}</h2>
            <button type="button" className="close" onClick={onClose} aria-label={a11y("close")}>
              ×
            </button>
          </header>

          <div className="registration-modal-body">
            <h3>{home.modalLead}</h3>

            <div className="registration-modal-tracks">
              {tracks.map(({ track, label }) => {
                const next = getNextCourseByTrack(locale, track);
                return (
                  <article className="registration-track-card" key={track}>
                    <p className="registration-track-name">{label}</p>
                    <CourseCountdown locale={locale} isoStart={next?.isoStart} />
                  </article>
                );
              })}
            </div>

            <Link href="/prijava" className="cta-btn registration-modal-cta" onClick={onClose}>
              {home.modalCta}
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
