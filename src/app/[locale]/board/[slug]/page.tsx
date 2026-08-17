import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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

  return (
    <section className="section board">
      <div className="page-content has-text-centered">
        <img className="head-pic" src={member.image} alt={member.name} />
        <h1>{member.name}</h1>
        <p>
          <strong>{member.role[loc]}</strong>
        </p>
        {member.bio[loc].map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
