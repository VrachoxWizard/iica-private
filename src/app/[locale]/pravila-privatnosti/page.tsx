import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/content/pages";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const copy = pages[loc].privacy;

  return (
    <>
      <PageHero title={copy.title} />
      <section className="section">
        <div className="privacy-page page-content reveal">
          {copy.blocks.map((block) => (
            <article key={block.heading}>
              <h2>{block.heading}</h2>
              {block.body.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
