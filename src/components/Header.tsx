"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { assets } from "@/content/home";
import { boardMembers } from "@/content/board";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
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

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function navClass(href: string, extra = "") {
    const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `navbar-item nav-caps${extra}${current ? " is-current" : ""}`;
  }

  return (
    <header className="site-header">
      {open ? (
        <button
          type="button"
          className="nav-overlay"
          aria-label={a11y("close")}
          onClick={() => setOpen(false)}
        />
      ) : null}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item p-3" href="/" onClick={() => setOpen(false)}>
            <img src={assets.logo} alt="IICA ESG" style={{ height: 74, width: "auto" }} />
          </Link>
          <button
            type="button"
            className={`navbar-burger burger${open ? " is-active" : ""}`}
            aria-label={a11y("menu")}
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
            <Link
              className={navClass("/")}
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              className={navClass("/prijava")}
              href="/prijava"
              aria-current={pathname === "/prijava" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t("register")}
            </Link>
            <Link
              className={navClass("/esg-awards", " easyNav2")}
              href="/esg-awards"
              aria-current={pathname === "/esg-awards" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t("awards")}
            </Link>
            <Link
              className={navClass("/board")}
              href="/board"
              aria-current={pathname.startsWith("/board") ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t("board")}
            </Link>
            <Link
              className={navClass("/kontakt")}
              href="/kontakt"
              aria-current={pathname === "/kontakt" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </Link>
            <div className="navbar-item lang-flag">
              <Link
                className="navbar-item"
                href={languageHref}
                locale={otherLocale}
                aria-label={otherLocale === "en" ? a11y("langEn") : a11y("langHr")}
                onClick={() => setOpen(false)}
              >
                <img
                  src={otherLocale === "en" ? assets.enFlag : assets.hrFlag}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
