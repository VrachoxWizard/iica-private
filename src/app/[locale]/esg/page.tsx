import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/content/pages";
import { assets } from "@/content/home";
import { asLocale } from "@/lib/locale";
import { sectionId } from "@/lib/section-id";

type Props = { params: Promise<{ locale: string }> };

export default async function EsgPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].esg;

  return (
    <>
      <PageHero title={copy.hero} image={assets.heroEsg} kicker={copy.title} />
      <section className="section esg-text">
        <div className="page-content">
          <p className="path-lead">{copy.lead}</p>
          <div className="tabs-esg">
            {copy.tabs.map((tab) => (
              <a key={tab} href={`#${sectionId(tab)}`}>
                {tab}
              </a>
            ))}
          </div>
          {copy.sections.map((section, index) => (
            <article
              className="reveal"
              style={{ animationDelay: `${index * 80}ms` }}
              key={section.title}
              id={sectionId(section.title)}
            >
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </article>
          ))}
          <h2 id="sdg">{copy.sdgTitle}</h2>
          {copy.sdg.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
