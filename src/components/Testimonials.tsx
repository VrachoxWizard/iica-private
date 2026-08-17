"use client";

import { useState } from "react";
import { assets, testimonials } from "@/content/home";
import type { Locale } from "@/i18n/routing";

export function Testimonials({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  return (
    <section className="section quotes">
      <div className="quotes-head">
        <h2>{title}</h2>
        <div className="quotes-nav">
          <button type="button" onClick={() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}>
            ‹
          </button>
          <button type="button" onClick={() => setIndex((i) => (i + 1) % testimonials.length)}>
            ›
          </button>
        </div>
      </div>
      <article className="quote-card">
        <img className="quote-avatar" src={assets.avatar} alt="" />
        <div>
          <span className="quote-meta">
            <strong>{item.name}</strong>
            <span>{locale === "en" ? item.dateEn : item.dateHr}</span>
          </span>
          <span className="ti-stars">
            {Array.from({ length: 5 }).map((_, star) => (
              <img src={assets.star} alt="" width={18} height={18} key={star} />
            ))}
          </span>
          {item.text.split("\n").map((paragraph, pIndex) =>
            paragraph ? <p key={pIndex}>{paragraph}</p> : null,
          )}
        </div>
      </article>
      <div className="quote-dots">
        {testimonials.map((entry, dot) => (
          <button
            type="button"
            key={entry.name}
            className={dot === index ? "is-active" : ""}
            aria-label={entry.name}
            onClick={() => setIndex(dot)}
          />
        ))}
      </div>
    </section>
  );
}
