"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { assets, getHome, testimonials } from "@/content/home";
import { Modal } from "@/components/Modal";
import type { Locale } from "@/i18n/routing";

export function Testimonials({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const a11y = useTranslations("a11y");
  const [active, setActive] = useState<(typeof testimonials)[number] | null>(null);
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="section quotes reveal">
      <h2 className="quotes-title">{title}</h2>

      <div className="quotes-marquee" aria-live="off">
        <div className="quotes-marquee-track">
          {doubled.map((item, index) => {
            const preview =
              item.text.length > 160 ? `${item.text.slice(0, 160).trim()}…` : item.text;
            return (
              <button
                type="button"
                key={`${item.name}-${index}`}
                className="quote-card quote-card-compact"
                onClick={() => setActive(item)}
              >
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
                  <p>{preview.split("\n")[0]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        labelledBy="testimonial-title"
        className="testimonial-modal"
      >
        {active ? (
          <>
            <button
              type="button"
              className="close"
              onClick={() => setActive(null)}
              aria-label={a11y("close")}
            >
              ×
            </button>
            <article className="quote-card quote-card-full">
              <img className="quote-avatar" src={assets.avatar} alt="" />
              <div>
                <h2 id="testimonial-title" className="visually-hidden">
                  {active.name}
                </h2>
                <span className="quote-meta">
                  <strong>{active.name}</strong>
                  <span>{locale === "en" ? active.dateEn : active.dateHr}</span>
                </span>
                <span className="ti-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <img src={assets.star} alt="" width={18} height={18} key={star} />
                  ))}
                </span>
                {active.text.split("\n").map((paragraph, pIndex) =>
                  paragraph ? <p key={pIndex}>{paragraph}</p> : null,
                )}
              </div>
            </article>
          </>
        ) : null}
      </Modal>
    </section>
  );
}
