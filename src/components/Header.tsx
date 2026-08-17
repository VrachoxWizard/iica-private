"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { assets } from "@/content/home";
import { boardMembers } from "@/content/board";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const otherLocale: Locale = locale === "hr" ? "en" : "hr";
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const member = slug
    ? boardMembers.find((item) => item.slug[locale] === slug)
    : undefined;
  const languageHref = member
    ? {
        pathname: "/board/[slug]" as const,
        params: { slug: member.slug[otherLocale] },
      }
    : pathname === "/board/[slug]"
      ? "/board"
      : (pathname as Exclude<typeof pathname, "/board/[slug]">);

  return (
    <header className="site-header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item p-3" href="/" onClick={() => setOpen(false)}>
            <img src={assets.logo} alt="IICA ESG" style={{ height: 74, width: "auto" }} />
          </Link>
          <button
            type="button"
            className={`navbar-burger burger${open ? " is-active" : ""}`}
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu${open ? " is-active" : ""}`}>
          <div className="navbar-end">
            <Link className={`navbar-item nav-caps${pathname === "/" ? " is-current" : ""}`} href="/" onClick={() => setOpen(false)}>
              {t("home")}
            </Link>
            <Link className={`navbar-item nav-caps${pathname === "/prijava" ? " is-current" : ""}`} href="/prijava" onClick={() => setOpen(false)}>
              {t("register")}
            </Link>
            <Link className={`navbar-item nav-caps easyNav2${pathname === "/esg-awards" ? " is-current" : ""}`} href="/esg-awards" onClick={() => setOpen(false)}>
              {t("awards")}
            </Link>
            <Link className={`navbar-item nav-caps${pathname.startsWith("/board") ? " is-current" : ""}`} href="/board" onClick={() => setOpen(false)}>
              {t("board")}
            </Link>
            <Link className={`navbar-item nav-caps${pathname === "/kontakt" ? " is-current" : ""}`} href="/kontakt" onClick={() => setOpen(false)}>
              {t("contact")}
            </Link>
            <div className="navbar-item lang-flag">
              <Link className="navbar-item" href={languageHref} locale={otherLocale}>
                <img
                  src={otherLocale === "en" ? assets.enFlag : assets.hrFlag}
                  alt={otherLocale === "en" ? "English" : "Hrvatski"}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
