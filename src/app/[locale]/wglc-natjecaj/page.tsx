import { setRequestLocale } from "next-intl/server";
import { AwardsForm } from "@/components/AwardsForm";
import { pages } from "@/content/pages";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function WglcPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].wglc;

  return (
    <>
      <AwardsForm locale={loc} variant="wglc" />
      <section className="section awards-content">
        <div className="page-content">
          <p>{copy.intro}</p>
          <h2>{copy.includesTitle}</h2>
          <ul>
            {copy.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{copy.conditionsTitle}</h2>
          <ul>
            {copy.conditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{copy.howTitle}</h2>
          <ul>
            {copy.how.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{copy.processTitle}</h2>
          <ul>
            {copy.process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>{copy.important}</strong>
          </p>
        </div>
      </section>
    </>
  );
}
