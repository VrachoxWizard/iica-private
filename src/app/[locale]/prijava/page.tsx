import { setRequestLocale } from "next-intl/server";
import { EducationHub } from "@/components/EducationHub";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  return (
    <section className="section edu-page">
      <EducationHub locale={loc} />
    </section>
  );
}
