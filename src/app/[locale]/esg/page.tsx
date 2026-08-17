import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function EsgPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].esg;

  return (
    <>
      <PageHero title={copy.hero} image={assets.heroEsg} />
      <section className="section esg-text">
        <div className="page-content">
          <p>{copy.lead}</p>
          <div className="tabs-esg">
            {copy.tabs.map((tab) => (
              <a key={tab} href={`#${tab}`}>
                {tab}
              </a>
            ))}
          </div>
          {copy.sections.map((section) => (
            <article key={section.title} id={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          ))}
          <h2>{copy.sdgTitle}</h2>
          {copy.sdg.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
