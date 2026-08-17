"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { getHome } from "@/content/home";
import type { Locale } from "@/i18n/routing";

export function NewsletterForm({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = useTranslations("forms");
  const home = getHome(locale);
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

  if (sent) {
    return <div className="success-message is-visible">{t("success")}</div>;
  }

  return (
    <form
      className={`newsletter-form${compact ? " is-compact" : ""}`}
      noValidate
      onSubmit={onSubmit}
    >
      <input
        name="email"
        type="email"
        placeholder={home.emailPlaceholder}
        aria-label="Email"
        required
      />
      <button type="submit" className="cta-btn">
        {t("apply")}
      </button>
    </form>
  );
}
