import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});
const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "IICA-ESG",
    description: "International Institute for Climate Action",
    icons: { icon: "/wp-content/themes/iica-iase/img/iica-nav-logo-hr.png" },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as "hr" | "en");
  const messages = await getMessages();
  const a11y = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a className="skip-link" href="#main-content">
            {a11y("skip")}
          </a>
          <div className="site-shell">
            <Header />
            <main id="main-content" className="site-main">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
