import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VPN Маркетплейс — сравнение VPN-сервисов",
  description:
    "Каталог VPN-провайдеров с ценами, заявленной скоростью, особенностями и статусом доступности сайта в реальном времени.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
