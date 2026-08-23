import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { getBoardGroups } from "@/content/board";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function BoardPage({ params }: Props) {
  const { locale } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const data = getBoardGroups(loc);

  return (
    <>
      <PageHero title={data.copy.title} />
      <section className="section board board-section" id="tko">
        <div className="board-grid">
          {data.governors.map((member) => (
            <article className="board-card" key={member.id}>
              <Link href={{ pathname: "/board/[slug]", params: { slug: member.slug[loc] } }}>
                <img className="head-pic" src={member.image} alt={member.name} />
                <h3 className="board-name">{member.name}</h3>
              </Link>
              <p className="board-role">{member.role[loc]}</p>
              <ul className="board-bio">
                {member.bio[loc].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <hr className="board-divider" />
        <h2 className="board-committee-title">{data.copy.committee}</h2>
        <div className="board-grid">
          {data.committee.map((member) => (
            <article className="board-card" key={member.id}>
              <Link href={{ pathname: "/board/[slug]", params: { slug: member.slug[loc] } }}>
                <img className="head-pic" src={member.image} alt={member.name} />
                <h3 className="board-name">{member.name}</h3>
              </Link>
              <p className="board-role">{member.role[loc]}</p>
              <ul className="board-bio">
                {member.bio[loc].map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
