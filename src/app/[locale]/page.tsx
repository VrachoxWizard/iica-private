import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/HomePage";
import { asLocale } from "@/lib/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  return <HomePage locale={asLocale(locale)} />;
}
