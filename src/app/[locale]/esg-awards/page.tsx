import { setRequestLocale } from "next-intl/server";
import { AwardsForm } from "@/components/AwardsForm";
import { pages } from "@/content/pages";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function AwardsPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].awards;

  return (
    <>
      <AwardsForm locale={loc} />
      <section className="section awards-content">
        <div className="page-content">
          {copy.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <h2>{copy.whyTitle}</h2>
          <ul>
            {copy.why.map((item) => (
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
            {copy.more}{" "}
            <a href={copy.moreUrl} target="_blank" rel="noreferrer">
              {copy.moreUrl}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
