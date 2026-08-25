import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/getServices";
import { parsePairSlug, COMPARISON_SLUGS } from "@/lib/comparisons";
import { TAG_LABELS } from "@/data/services";
import { StatusBadge } from "@/components/StatusBadge";
import { SITE_NAME, jsonLdScript, SITE_URL } from "@/lib/seo";
import { ServiceDTO } from "@/lib/types";
import { ServiceLogo } from "@/components/ServiceLogo";

export const revalidate = 1800;

interface Props {
  params: Promise<{ pair: string }>;
}

async function loadPair(pair: string): Promise<{ a: ServiceDTO; b: ServiceDTO } | null> {
  const parsed = parsePairSlug(pair);
  if (!parsed) return null;
  if (!COMPARISON_SLUGS.includes(parsed.a) || !COMPARISON_SLUGS.includes(parsed.b)) return null;

  const [a, b] = await Promise.all([getServiceBySlug(parsed.a), getServiceBySlug(parsed.b)]);
  if (!a || !b) return null;
  return { a, b };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const data = await loadPair(params.pair);
  if (!data) return {};

  const title = `${data.a.name} или ${data.b.name} — что выбрать`;
  const description = `Сравнение ${data.a.name} и ${data.b.name}: цена, заявленная скорость, платформы и функции.`;

  return {
    title,
    description,
    alternates: { canonical: `/compare/${params.pair}` },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website" },
  };
}

function Row({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr,1.2fr,1.2fr] items-start gap-2 border-b border-border py-3 text-sm last:border-b-0">
      <div className="text-muted">{label}</div>
      <div className="font-medium">{a}</div>
      <div className="font-medium">{b}</div>
    </div>
  );
}

export default async function ComparePairPage(props: Props) {
  const params = await props.params;
  const data = await loadPair(params.pair);
  if (!data) notFound();
  const { a, b } = data;

  const notes: string[] = [];
  if (a.priceMonthlyUsd != null && b.priceMonthlyUsd != null && a.priceMonthlyUsd !== b.priceMonthlyUsd) {
    const cheaper = a.priceMonthlyUsd < b.priceMonthlyUsd ? a : b;
    notes.push(`${cheaper.name} дешевле по заявленной цене входного тарифа.`);
  }
  if (a.claimedSpeedMbps != null && b.claimedSpeedMbps != null && a.claimedSpeedMbps !== b.claimedSpeedMbps) {
    const faster = a.claimedSpeedMbps > b.claimedSpeedMbps ? a : b;
    notes.push(`${faster.name} заявляет более высокую максимальную скорость.`);
  }
  const onlyA = a.tags.filter((t) => !b.tags.includes(t));
  const onlyB = b.tags.filter((t) => !a.tags.includes(t));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Сравнения", item: `${SITE_URL}/compare` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
        item: `${SITE_URL}/compare/${params.pair}`,
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
        <Link href="/compare" className="hover:text-fg">
          Сравнения
        </Link>
        {" / "}
        <span>
          {a.name} vs {b.name}
        </span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">
        {a.name} или {b.name}: что выбрать
      </h1>
      <p className="mt-2 text-sm text-muted">
        Сравнение по данным каталога — цена, заявленная скорость и функции указаны со слов
        провайдеров.
      </p>

      {notes.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
          {notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <div className="grid grid-cols-[1fr,1.2fr,1.2fr] gap-2 border-b border-border pb-3 text-sm font-semibold">
          <div />
          <Link
            href={`/vpn/${a.slug}`}
            className="flex items-center gap-1.5 hover:text-accent hover:underline"
          >
            <ServiceLogo name={a.name} emoji={a.logo} websiteUrl={a.websiteUrl} /> {a.name}
          </Link>
          <Link
            href={`/vpn/${b.slug}`}
            className="flex items-center gap-1.5 hover:text-accent hover:underline"
          >
            <ServiceLogo name={b.name} emoji={b.logo} websiteUrl={b.websiteUrl} /> {b.name}
          </Link>
        </div>

        <Row label="Цена" a={a.priceFrom} b={b.priceFrom} />
        <Row
          label="Заявл. скорость"
          a={a.claimedSpeedMbps != null ? `до ${a.claimedSpeedMbps} Мбит/с` : "—"}
          b={b.claimedSpeedMbps != null ? `до ${b.claimedSpeedMbps} Мбит/с` : "—"}
        />
        <Row label="Бесплатно" a={a.freeOption ?? "—"} b={b.freeOption ?? "—"} />
        <Row label="Рейтинг" a={a.rating != null ? `⭐ ${a.rating.toFixed(1)}` : "—"} b={b.rating != null ? `⭐ ${b.rating.toFixed(1)}` : "—"} />
        <Row label="Платформы" a={a.platforms.join(", ")} b={b.platforms.join(", ")} />
        <Row
          label="Статус сайта"
          a={<StatusBadge status={a.status} latencyMs={a.latencyMs} lastCheckedAt={a.lastCheckedAt} />}
          b={<StatusBadge status={b.status} latencyMs={b.latencyMs} lastCheckedAt={b.lastCheckedAt} />}
        />
        <Row
          label="Уникальные фичи"
          a={
            onlyA.length > 0
              ? onlyA.map((t) => TAG_LABELS[t] ?? t).join(", ")
              : "нет отличий от второго"
          }
          b={
            onlyB.length > 0
              ? onlyB.map((t) => TAG_LABELS[t] ?? t).join(", ")
              : "нет отличий от первого"
          }
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <a
          href={a.referralUrl ?? a.websiteUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Перейти на сайт {a.name}
        </a>
        <a
          href={b.referralUrl ?? b.websiteUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Перейти на сайт {b.name}
        </a>
      </div>

      <p className="mt-10">
        <Link href="/compare" className="text-sm text-accent hover:underline">
          ← Ко всем сравнениям
        </Link>
      </p>
    </main>
  );
}
