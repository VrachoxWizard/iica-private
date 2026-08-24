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
    <div className="refined-countdown" aria-live="polite">
      <div className="countdown-unit">
        <span className="countdown-value">{String(days).padStart(2, '0')}</span>
        <span className="countdown-label">{dayLabel}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-unit">
        <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
        <span className="countdown-label">{home.modalHours}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-unit">
        <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
        <span className="countdown-label">{home.modalMin}</span>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-unit">
        <span className="countdown-value">{String(seconds).padStart(2, '0')}</span>
        <span className="countdown-label">{home.modalSec}</span>
      </div>
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setMounted(true), 10);
    } else {
      setMounted(false);
    }
  }, [open]);

  const tracks = [
    { track: "level1" as const, label: home.modalCourses[0], number: "01" },
    { track: "level2" as const, label: home.modalCourses[1], number: "02" },
    { track: "ceo" as const, label: home.modalCourses[2], number: "03" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="welcome-title"
      className="refined-modal"
    >
      <div className={`refined-modal-container ${mounted ? "is-mounted" : ""}`}>
        <div
          className="refined-modal-media"
          style={{ backgroundImage: `url(${assets.modal})` }}
        >
          <div className="modal-media-overlay" />
        </div>

        <div className="refined-modal-content">
          <button
            type="button"
            className="refined-close"
            onClick={onClose}
            aria-label={a11y("close")}
          >
            <span className="close-line" />
            <span className="close-line" />
          </button>

          <header className="refined-modal-header">
            <div className="header-accent" />
            <h2 id="welcome-title" className="refined-title">
              {home.modalTitle}
            </h2>
            <p className="refined-subtitle">{home.modalLead}</p>
          </header>

          <div className="refined-modal-body">
            {tracks.map(({ track, label, number }, index) => {
              const next = getNextCourseByTrack(locale, track);
              return (
                <article
                  className="course-item"
                  key={track}
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <div className="course-number">{number}</div>
                  <div className="course-content">
                    <h3 className="course-title">{label}</h3>
                    {next && <CourseCountdown locale={locale} isoStart={next.isoStart} />}
                  </div>
                  <div className="course-accent" />
                </article>
              );
            })}
          </div>

          <footer className="refined-modal-footer">
            <Link
              href="/prijava"
              className="refined-cta"
              onClick={onClose}
            >
              {home.modalCta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </footer>
        </div>
      </div>
    </Modal>
  );
}
