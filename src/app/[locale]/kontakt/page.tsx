import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);

  return (
    <section className="section contact-hero">
      <div className="container">
        <ContactForm locale={loc} />
      </div>
    </section>
  );
}
