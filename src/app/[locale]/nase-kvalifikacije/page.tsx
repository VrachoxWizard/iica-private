import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function QualificationsPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].qualifications;

  return (
    <>
      <PageHero image={assets.heroQual} />
      <section className="section">
        <div className="column is-10-desktop is-offset-1-desktop round-cor page-content">
          <h2 className="intro-hero-title">{copy.hero}</h2>
          {copy.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <h2 className="has-text-centered accent">{copy.officerTitle}</h2>
          {copy.levels.map((level, index) => (
            <article className="qual-level" key={index}>
              <p>{level.intro}</p>
              <ul>
                {level.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {"after" in level && level.after ? <p>{level.after}</p> : null}
            </article>
          ))}
          <h2>{copy.newTitle}</h2>
          <h2 className="accent">{copy.ceoTitle}</h2>
          <p>{copy.ceoLead}</p>
          <p>{copy.ceoDuration}</p>
          <p>{copy.ceoAudienceIntro}</p>
          <ul>
            {copy.ceoAudience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{copy.whyTitle}</h2>
          {copy.why.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p>{copy.more}</p>
        </div>
      </section>
    </>
  );
}
