import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

const jumpIds = ["ourprof", "aspiring", "corporates", "organisations"] as const;
const backgrounds = [assets.secPro, assets.secAspPro, assets.secCor, assets.secNgo];

export default async function CandidatesPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].candidates;
  const [what, ...rest] = copy.sections;
  const jumpLabels =
    loc === "hr"
      ? ["Kandidati", "Stručnjaci kandidati", "Kompanije", "SLUŽBENICI"]
      : ["Candidates", "Expert candidates", "Companies", "Officials"];

  return (
    <>
      <PageHero title={copy.hero} image={assets.heroIntro} kicker={copy.title} />
      <section className="section">
        <div className="column is-10-desktop is-offset-1-desktop round-cor p-6">
          <h2 className="is-size-2-tablet has-text-centered mb-5">
            <strong>{what.title}</strong>
          </h2>
          {what.paragraphs.map((paragraph, index) => (
            <p className="is-size-5-tablet" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      <section className="section pt-0">
        <div className="row justify-content-center">
          {rest.slice(0, 4).map((section, index) => (
            <div className="col-6 col-md-3 has-text-centered intro-link" key={section.title}>
              <p>
                <a className="adiv" href={`#${jumpIds[index]}`}>
                  {jumpLabels[index]}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
      {rest.map((section, index) => (
        <div key={section.title}>
          {backgrounds[index] ? (
            <section
              className="section sec-band mt-6"
              id={jumpIds[index] ?? section.title}
              style={{ backgroundImage: `url(${backgrounds[index]})` }}
            />
          ) : (
            <a id={jumpIds[index] ?? section.title} />
          )}
          <section className={`section candidate-block${backgrounds[index] ? " up-mrg" : ""}`}>
            <div className="column is-10-desktop is-offset-1-desktop has-background-white round-cor p-6">
              <h2 className="has-text-centered mb-5">
                <strong>{section.title}</strong>
              </h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
