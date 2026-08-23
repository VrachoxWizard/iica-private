"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getEducation } from "@/content/education";
import type { Locale } from "@/i18n/routing";
import { OptionButtons } from "@/components/OptionButtons";

export function EducationForm({ locale }: { locale: Locale }) {
  const t = useTranslations("forms");
  const data = getEducation(locale);
  const [levelIndex, setLevelIndex] = useState(0);
  const [entity, setEntity] = useState<"individual" | "company">("individual");
  const [direction, setDirection] = useState<"business" | "finance">("business");
  const [sent, setSent] = useState(false);
  const selected = data.courses[levelIndex];

  const grouped = useMemo(
    () => ({
      level1: data.courses.filter((c) => c.level === data.level1 || c.level === "Level 1"),
      level2: data.courses.filter((c) => c.level === data.level2 || c.level === "Level 2"),
      ceo: data.courses.filter(
        (c) => c.level === data.ceo || c.level.includes("CEO"),
      ),
    }),
    [data],
  );

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
    <>
      <div className="container mt-5 mb-5">
        <h2>
          <strong>
            <span style={{ fontSize: 36 }}>{data.chooseTitle}</span>
          </strong>
        </h2>
        <p>{data.schedule}</p>
        <h2 style={{ fontSize: 30 }}>
          <strong>{data.durationTitle}</strong>
        </h2>
        <p>{data.durationBody}</p>
      </div>

      <CourseRow
        title={data.level1}
        courses={grouped.level1}
        selected={selected}
        onSelect={(course) =>
          setLevelIndex(data.courses.findIndex((item) => item === course))
        }
      />
      <CourseRow
        title={data.level2}
        courses={grouped.level2}
        selected={selected}
        onSelect={(course) =>
          setLevelIndex(data.courses.findIndex((item) => item === course))
        }
      />
      <div className="container mt-4 mb-5">
        <h2 style={{ fontSize: 30 }}>
          <strong>{data.ceo}</strong>
        </h2>
        <h2 style={{ fontSize: 30 }}>
          <strong>{data.durationTitle}</strong>
        </h2>
        <p>{data.ceoDuration}</p>
        <CourseRow
          title=""
          courses={grouped.ceo}
          selected={selected}
          onSelect={(course) =>
            setLevelIndex(data.courses.findIndex((item) => item === course))
          }
        />
      </div>

      {sent ? (
        <div className="success-message is-visible">{t("success")}</div>
      ) : (
        <form className="wpcf7-form" noValidate onSubmit={onSubmit}>
          <div className="container">
            <div className="field">
              <label className="label">{data.entityLabel}</label>
              <OptionButtons
                name="entityType"
                value={entity}
                onChange={setEntity}
                options={[
                  {
                    value: "individual",
                    label: locale === "hr" ? "Fizička osoba" : "Individual",
                  },
                  {
                    value: "company",
                    label: locale === "hr" ? "Pravna osoba" : "Organisation",
                  },
                ]}
              />
            </div>
          </div>

          {entity === "individual" ? (
            <div className="container">
              <div className="row">
                <Field label={data.firstName} name="firstName" required />
                <Field label={data.lastName} name="lastName" required />
                <div className="col-12 col-md-6 mb-3">
                  <label className="label">{data.direction}</label>
                  <OptionButtons
                    name="educationDirectionChoice"
                    value={direction}
                    onChange={setDirection}
                    options={[
                      { value: "business", label: data.business },
                      { value: "finance", label: data.finance },
                    ]}
                  />
                  <input
                    type="hidden"
                    name={direction === "business" ? "educationDirection" : "educationDirectionFinance"}
                    value="1"
                  />
                </div>
                <Field label={data.userMail} name="userMail" type="email" required />
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <Field label={data.companyName} name="companyName" required />
                <Field label={data.companyEmail} name="companyEmail" type="email" required />
                <Field label={data.address} name="address" required />
                <Field label={data.oib} name="oib" required />
                <div className="col-12 col-md-6 mb-3">
                  <label className="label">{data.candidates}</label>
                  <textarea
                    className="input is-medium"
                    name="candidatesData"
                    required
                    placeholder={data.candidatesPlaceholder}
                    rows={6}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="container mt-3">
            <label className="wpcf7-list-item">
              <input type="checkbox" name="privacy" required />
              <span>
                {t("privacyPrefix")}{" "}
                <Link href="/pravila-privatnosti" target="_blank">
                  {t("privacyLink")}
                </Link>
              </span>
            </label>
            <label className="wpcf7-list-item">
              <input type="checkbox" name="newsletter" />
              <span>{t("newsletterConsent")}</span>
            </label>
          </div>
          <input type="hidden" name="level" value={selected?.level ?? ""} />
          <input type="hidden" name="startDate" value={selected?.start ?? ""} />
          <input type="hidden" name="endDate" value={selected?.end ?? ""} />
          <div className="container mt-3 mb-4">
            <button className="button button-primary qbutton" type="submit">
              {t("send")}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="col-12 col-md-6 mb-3">
      <label className="label">{label}</label>
      <input
        className="input is-medium"
        name={name}
        type={type}
        required={required}
        placeholder={label}
      />
    </div>
  );
}

function CourseRow({
  title,
  courses,
  selected,
  onSelect,
}: {
  title: string;
  courses: ReturnType<typeof getEducation>["courses"];
  selected: ReturnType<typeof getEducation>["courses"][number];
  onSelect: (course: ReturnType<typeof getEducation>["courses"][number]) => void;
}) {
  return (
    <div className="container mt-4 mb-5">
      {title ? (
        <h2 style={{ fontSize: 30 }}>
          <strong>{title}</strong>
        </h2>
      ) : null}
      <div className="row">
        {courses.map((course) => (
          <div className="col-12 col-md-3 mb-2" key={`${course.level}-${course.title}-${course.start}`}>
            <div
              className={`card level-select${selected === course ? " active" : ""}`}
              onClick={() => onSelect(course)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onSelect(course);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="card-body">
                <h3 className="mb-2" style={{ fontSize: 20 }}>
                  {course.title}
                </h3>
                <p>
                  <strong>{course.startLabel} </strong>
                  {course.start}
                </p>
                <p>
                  <strong>{course.endLabel} </strong>
                  {course.end}
                </p>
                <p>
                  <strong>{course.price}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
