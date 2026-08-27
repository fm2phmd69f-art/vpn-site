import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicesByTag } from "@/lib/getServices";
import { TAG_LABELS } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 1800;

interface Props {
  params: Promise<{ tag: string }>;
}

function label(tag: string): string | null {
  return TAG_LABELS[tag] ?? null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tagLabel = label(params.tag);
  if (!tagLabel) return {};

  const cleanLabel = tagLabel.split(" ").slice(1).join(" ") || tagLabel;
  const title = `${cleanLabel} VPN — список сервисов`;
  const description = `Подборка VPN-сервисов из категории «${cleanLabel}»: цены, заявленная скорость и статус доступности сайта.`;

  const hasEn = Boolean(TAG_LABELS_EN[params.tag]);

  return {
    title,
    description,
    alternates: {
      canonical: `/vpn/category/${params.tag}`,
      ...(hasEn
        ? {
            languages: {
              ru: `${SITE_URL}/vpn/category/${params.tag}`,
              en: `${SITE_URL}/en/vpn/category/${params.tag}`,
            },
          }
        : {}),
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website" },
  };
}

export default async function CategoryPage(props: Props) {
  const params = await props.params;
  const tagLabel = label(params.tag);
  if (!tagLabel) notFound();

  const services = await getServicesByTag(params.tag);
  if (services.length === 0) notFound();

  const cleanLabel = tagLabel.split(" ").slice(1).join(" ") || tagLabel;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>{cleanLabel}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{tagLabel}: VPN-сервисы</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {services.length}{" "}
          {services.length === 1 ? "сервис" : services.length < 5 ? "сервиса" : "сервисов"} из
          каталога с пометкой «{cleanLabel}». Данные о цене и функциях — со слов провайдера, статус
          доступности сайта обновляется автоматически.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
