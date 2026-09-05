import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllServices } from "@/lib/getServices";
import { computeScore } from "@/lib/score";

export const revalidate = 1800;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — сравнение VPN-сервисов`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Каталог из 50+ VPN-провайдеров: цены, заявленная скорость, платформы и особенности. Фильтры по no-logs, бесплатным тарифам, Netflix, торрентам. Статус доступности сайта — автоматически.",
  keywords: [
    "vpn",
    "впн",
    "сравнение vpn",
    "лучший vpn",
    "бесплатный vpn",
    "vpn для netflix",
    "no-logs vpn",
    "каталог vpn",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — сравнение VPN-сервисов`,
    description: "Каталог из 50+ VPN-провайдеров с ценами, скоростью и статусом доступности.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — сравнение VPN-сервисов`,
    description: "Каталог из 50+ VPN-провайдеров с ценами, скоростью и статусом доступности.",
  },
  robots: { index: true, follow: true },
};

async function getTopServices() {
  try {
    const services = await getAllServices();
    return services
      .map((s) => ({ slug: s.slug, name: s.name, score: computeScore(s).overall }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ slug, name }) => ({ slug, name }));
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const topServices = await getTopServices();
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J0HSEW6VVT"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J0HSEW6VVT');
          `}
        </Script>
        <SiteHeader />
        {children}
        <SiteFooter topServices={topServices} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
