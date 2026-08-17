"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { pages } from "@/content/pages";
import type { Locale } from "@/i18n/routing";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = useTranslations("forms");
  const copy = pages[locale].contact;
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
    <form className="contact-card" noValidate onSubmit={onSubmit}>
      <h1>{copy.heading}</h1>
      <p>{copy.lead}</p>
      <div className="contact-grid">
        <input name="name" required placeholder={copy.name} />
        <input name="email" type="email" required placeholder={copy.email} />
      </div>
      <textarea name="message" rows={4} required placeholder={copy.message} />
      <button className="cta-btn" type="submit">
        {t("send")}
      </button>
    </form>
  );
}
