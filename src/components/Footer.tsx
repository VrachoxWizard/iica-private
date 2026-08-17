import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { assets } from "@/content/home";
import { NewsletterForm } from "@/components/NewsletterForm";
import { asLocale } from "@/lib/locale";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const loc = asLocale(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <a href="http://www.iica-hr.eu/en/" target="_blank" rel="noreferrer">
            <img className="footer-mark" src={assets.footerLogo} alt="IICA" />
          </a>
          <p>{t("org")}</p>
          <p>
            {t("street")} {t("city")}
            <br />
            {t("country")}
          </p>
        </div>
        <div>
          <p className="footer-heading">{t("explore")}</p>
          <Link href="/">{t("home")}</Link>
          <Link href="/prijava">{t("register")}</Link>
          <Link href="/esg">{t("esg")}</Link>
          <Link href="/nase-kvalifikacije">{t("qualifications")}</Link>
          <Link href="/kandidati">{t("candidates")}</Link>
          <Link href="/board">{t("board")}</Link>
          <Link href="/esg-awards">{t("awards")}</Link>
        </div>
        <div>
          <p className="footer-heading">{t("contact")}</p>
          <a href="mailto:info@iica-esg.com">info@iica-esg.com</a>
          <Link href="/kontakt">{t("contact")}</Link>
          <Link href="/pravila-privatnosti">{t("privacy")}</Link>
          <div className="footer-social">
            <a href="mailto:info@iica-esg.com">{t("email")}</a>
            <a href="http://www.iica-hr.eu/en/" target="_blank" rel="noreferrer">
              IICA
            </a>
          </div>
        </div>
        <div>
          <p className="footer-heading">{t("newsletter")}</p>
          <NewsletterForm locale={loc} compact />
        </div>
      </div>
      <p className="footer-copy">{t("copyright")}</p>
    </footer>
  );
}
