"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { assets, getHome, testimonials } from "@/content/home";
import type { Locale } from "@/i18n/routing";

export function Testimonials({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const home = getHome(locale);
  const a11y = useTranslations("a11y");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const item = testimonials[index];
  const long = item.text.length > 280;
  const preview = long && !open ? `${item.text.slice(0, 280).trim()}…` : item.text;

  function go(delta: number) {
    setOpen(false);
    setIndex((current) => (current + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="section quotes reveal">
      <div className="quotes-head">
        <h2>{title}</h2>
        <div className="quotes-nav">
          <button type="button" onClick={() => go(-1)} aria-label={a11y("prev")}>
            ‹
          </button>
          <button type="button" onClick={() => go(1)} aria-label={a11y("next")}>
            ›
          </button>
        </div>
      </div>
      <article className="quote-card" aria-live="polite">
        <img className="quote-avatar" src={assets.avatar} alt="" />
        <div>
          <span className="quote-meta">
            <strong>{item.name}</strong>
            <span>{locale === "en" ? item.dateEn : item.dateHr}</span>
          </span>
          <span className="ti-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, star) => (
              <img src={assets.star} alt="" width={18} height={18} key={star} />
            ))}
          </span>
          {preview.split("\n").map((paragraph, pIndex) =>
            paragraph ? <p key={pIndex}>{paragraph}</p> : null,
          )}
          {long ? (
            <button type="button" className="quote-expand" onClick={() => setOpen((value) => !value)}>
              {open ? home.hide : home.readMore}
            </button>
          ) : null}
        </div>
      </article>
      <div className="quote-dots">
        {testimonials.map((entry, dot) => (
          <button
            type="button"
            key={entry.name}
            className={dot === index ? "is-active" : ""}
            aria-label={entry.name}
            aria-current={dot === index}
            onClick={() => {
              setOpen(false);
              setIndex(dot);
            }}
          />
        ))}
      </div>
    </section>
  );
}
