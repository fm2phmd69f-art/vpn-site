import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/lib/getServices";
import { TAG_LABELS } from "@/data/services";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceCard } from "@/components/ServiceCard";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 1800;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};

  const title = `${service.name} — цена, скорость, отзывы`;
  const description = `${service.name}: ${service.priceFrom}. ${service.description}`.slice(
    0,
    160
  );

  return {
    title,
    description,
    alternates: { canonical: `/vpn/${service.slug}` },
    openGraph: { title: `${service.name} | ${SITE_NAME}`, description, type: "website" },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const allServices = await getAllServices();
  const related = allServices
    .filter((s) => s.id !== service.id && s.tags.some((t) => service.tags.includes(t)))
    .slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE_URL}/#catalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/vpn/${service.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>{service.name}</span>
      </nav>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl leading-none">{service.logo}</span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{service.name}</h1>
          {service.rating != null && (
            <p className="text-sm text-muted">⭐ {service.rating.toFixed(1)} (оценка провайдера)</p>
          )}
        </div>
      </div>

      <StatusBadge
        status={service.status}
        latencyMs={service.latencyMs}
        lastCheckedAt={service.lastCheckedAt}
      />

      <p className="mt-4 text-sm leading-relaxed text-fg">{service.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-border bg-surface p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Цена</dt>
          <dd className="font-medium">{service.priceFrom}</dd>
        </div>
        {service.claimedSpeedMbps != null && (
          <div>
            <dt className="text-muted">Заявл. скорость</dt>
            <dd className="font-medium">до {service.claimedSpeedMbps} Мбит/с</dd>
          </div>
        )}
        {service.freeOption && (
          <div>
            <dt className="text-muted">Бесплатно</dt>
            <dd className="font-medium">{service.freeOption}</dd>
          </div>
        )}
        <div className="col-span-2 sm:col-span-3">
          <dt className="text-muted">Платформы</dt>
          <dd className="font-medium">{service.platforms.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <Link
            key={tag}
            href={`/vpn/category/${tag}`}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
          >
            {TAG_LABELS[tag] ?? tag}
          </Link>
        ))}
      </div>

      <a
        href={service.referralUrl ?? service.websiteUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Перейти на сайт {service.name}
      </a>

      <p className="mt-4 text-xs text-muted">
        Цена, скорость и условия указаны со слов провайдера и могут измениться — уточняйте
        актуальные данные на официальном сайте перед покупкой.
      </p>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Похожие сервисы</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
