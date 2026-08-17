import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { boardMembers, getBoardMember } from "@/content/board";
import { routing } from "@/i18n/routing";
import { asLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    boardMembers.map((member) => ({
      locale,
      slug: member.slug[locale],
    })),
  );
}

export default async function BoardMemberPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = asLocale(locale);
  setRequestLocale(loc);
  const member = getBoardMember(loc, slug);
  if (!member) notFound();
  const a11y = await getTranslations("a11y");

  return (
    <section className="section board">
      <div className="board-profile page-content">
        <Link className="board-back" href="/board">
          ← {a11y("backBoard")}
        </Link>
        <img className="head-pic" src={member.image} alt={member.name} />
        <p className="edu-kicker">{member.role[loc]}</p>
        <h1>{member.name}</h1>
        {member.bio[loc].map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
