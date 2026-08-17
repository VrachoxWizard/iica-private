import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const t = await getTranslations("footer");

  return (
    <section className="section contact-hero">
      <div className="container contact-layout">
        <aside className="contact-aside">
          <p className="edu-kicker">{t("contact")}</p>
          <h2>{t("org")}</h2>
          <p>
            {t("street")} {t("city")}
            <br />
            {t("country")}
          </p>
          <p>
            <a href="mailto:info@iica-esg.com">info@iica-esg.com</a>
          </p>
        </aside>
        <ContactForm locale={loc} />
      </div>
    </section>
  );
}
