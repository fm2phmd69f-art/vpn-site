import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
