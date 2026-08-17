"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import type { Locale } from "@/i18n/routing";

export function AwardsForm({
  locale,
  variant = "awards",
}: {
  locale: Locale;
  variant?: "awards" | "wglc";
}) {
  const t = useTranslations("forms");
  const copy = pages[locale].awards.form;
  const [sent, setSent] = useState(false);

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
    <section className="awards-hero">
      <img className="obj-fit-cover" src={assets.heroAwards} alt="" />
      <div className="custom_Card" style={{ position: "relative", zIndex: 1 }}>
        <div className="card-body">
          {variant === "awards" ? (
            <>
              <h2>{pages[locale].awards.heroTitle}</h2>
              <p>{pages[locale].awards.prerequisite}</p>
              <p>
                <strong>{pages[locale].awards.closed}</strong>
              </p>
              <p>{pages[locale].awards.follow}</p>
            </>
          ) : (
            <>
              <h2>{pages[locale].wglc.heroTitle}</h2>
              <p>{pages[locale].wglc.prerequisite}</p>
            </>
          )}
          {sent ? (
            <div className="success-message is-visible">{t("success")}</div>
          ) : (
            <form id="awardsForm" className="needs-validation" noValidate onSubmit={onSubmit}>
              <input name="customerName" required placeholder={copy.customerName} />
              <input name="institutionName" required placeholder={copy.institutionName} />
              <input name="email" type="email" required placeholder={copy.email} />
              <input name="oib" required placeholder={copy.oib} />
              <input name="address" required placeholder={copy.address} />
              <input name="awardDocument" type="file" aria-label={copy.file} />
              <button className="buttonHero_Green" type="submit">
                {t("apply")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
