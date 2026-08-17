import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
      <section className="section" id="tko">
        <h2 className="is-size-2 has-text-centered mb-5">
          <strong>{data.copy.governors}</strong>
        </h2>
      </section>
      <section className="section board">
        <div className="columns">
          {data.governors.map((member) => (
            <div className="column is-one-third" key={member.id}>
              <article className="card full-height board-card">
                <div className="card-content has-background-white-ter brd-btm">
                  <Link href={{ pathname: "/board/[slug]", params: { slug: member.slug[loc] } }}>
                    <img className="head-pic" src={member.image} alt={member.name} />
                    <p className="title px-5 has-text-centered">{member.name}</p>
                  </Link>
                </div>
                <div className="card-content">
                  <p className="is-size-6">
                    <strong>{member.role[loc]}</strong>
                  </p>
                  {member.bio[loc].map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
        <hr />
        <h2 className="has-text-centered">{data.copy.committee}</h2>
        <div className="columns">
          {data.committee.map((member) => (
            <div className="column is-one-third" key={member.id}>
              <article className="card full-height board-card">
                <div className="card-content has-background-white-ter brd-btm">
                  <Link href={{ pathname: "/board/[slug]", params: { slug: member.slug[loc] } }}>
                    <img className="head-pic" src={member.image} alt={member.name} />
                    <p className="title px-5 has-text-centered">{member.name}</p>
                  </Link>
                </div>
                <div className="card-content">
                  <p className="is-size-6">
                    <strong>{member.role[loc]}</strong>
                  </p>
                  {member.bio[loc].map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
        <h2 className="has-text-centered">{data.copy.secretariat}</h2>
      </section>
    </>
  );
}
