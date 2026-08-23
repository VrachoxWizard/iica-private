"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { Field, FormSuccess } from "@/components/Field";

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
  const [fileName, setFileName] = useState("");
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div className="hero-shade" />
      <div className="custom_Card" style={{ position: "relative", zIndex: 1 }}>
        <div className="card-body">
          {variant === "awards" ? (
            <>
              <h2>{pages[locale].awards.heroTitle}</h2>
              <p>{pages[locale].awards.prerequisite}</p>
              <p className="awards-closed">{pages[locale].awards.closed}</p>
              <p>{pages[locale].awards.follow}</p>
            </>
          ) : (
            <>
              <h2>{pages[locale].wglc.heroTitle}</h2>
              <p>{pages[locale].wglc.prerequisite}</p>
            </>
          )}
          {sent ? (
            <FormSuccess
              message={t("success")}
              actionLabel={t("again")}
              onReset={() => setSent(false)}
            />
          ) : (
            <form id="awardsForm" className="awards-form needs-validation" noValidate onSubmit={onSubmit}>
              <Field label={copy.customerName} name="customerName" required />
              <Field label={copy.institutionName} name="institutionName" required />
              <Field label={copy.email} name="email" type="email" required />
              <Field label={copy.oib} name="oib" required />
              <Field label={copy.address} name="address" required />
              <div className="field-block file-upload-block">
                <label htmlFor={fileInputId}>{copy.file}</label>
                <div className="file-upload">
                  <input
                    ref={fileInputRef}
                    id={fileInputId}
                    name="awardDocument"
                    type="file"
                    className="file-input-native"
                    aria-label={copy.file}
                    onChange={(event) =>
                      setFileName(event.target.files?.[0]?.name ?? "")
                    }
                  />
                  <button
                    type="button"
                    className="file-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {locale === "hr" ? "Odaberi datoteku" : "Choose file"}
                  </button>
                  <span className="file-upload-name">
                    {fileName || (locale === "hr" ? "Nema odabrane datoteke" : "No file chosen")}
                  </span>
                </div>
              </div>
              <button className="cta-btn" type="submit">
                {t("apply")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
