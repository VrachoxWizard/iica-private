"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Field, FormSuccess } from "@/components/Field";

export function NewsletterForm({
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = useTranslations("forms");
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
    <form
      className={`newsletter-form${compact ? " is-compact" : ""}`}
      noValidate
      onSubmit={onSubmit}
    >
      {sent ? (
        <FormSuccess
          message={t("success")}
          actionLabel={t("again")}
          onReset={() => setSent(false)}
        />
      ) : (
        <>
          <Field label={t("email")} name="email" type="email" required />
          <button type="submit" className="cta-btn">
            {t("apply")}
          </button>
        </>
      )}
    </form>
  );
}
