import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/en/863-2",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/en/home-en-2",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/naslovna",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
