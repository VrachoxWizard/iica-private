"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { pages } from "@/content/pages";
import type { Locale } from "@/i18n/routing";
import { Field, FormSuccess } from "@/components/Field";

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

  return (
    <form className="contact-card" noValidate onSubmit={onSubmit}>
      <h1>{copy.heading}</h1>
      <p>{copy.lead}</p>
      {sent ? (
        <FormSuccess
          message={t("success")}
          actionLabel={t("again")}
          onReset={() => setSent(false)}
        />
      ) : (
        <>
          <div className="contact-grid">
            <Field label={copy.name} name="name" required />
            <Field label={copy.email} name="email" type="email" required />
          </div>
          <Field label={copy.message} name="message" as="textarea" rows={4} required />
          <button className="cta-btn" type="submit">
            {t("send")}
          </button>
        </>
      )}
    </form>
  );
}
