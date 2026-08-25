import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { TAG_LABELS } from "@/data/services";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ScoreBadge } from "@/components/ScoreBadge";
import { computeScore } from "@/lib/score";
import { SITE_NAME } from "@/lib/seo";
import { ServiceDTO } from "@/lib/types";

interface Props {
  searchParams: Promise<{ ids?: string }>;
}

export const metadata: Metadata = {
  title: "Сравнение выбранных VPN",
  robots: { index: false, follow: true },
};

function Row({
  label,
  services,
  render,
}: {
  label: string;
  services: ServiceDTO[];
  render: (s: ServiceDTO) => React.ReactNode;
}) {
  return (
    <div
      className="grid items-center gap-2 border-b border-border py-3 text-sm last:border-b-0"
      style={{ gridTemplateColumns: `120px repeat(${services.length}, 1fr)` }}
    >
      <div className="text-muted">{label}</div>
      {services.map((s) => (
        <div key={s.id} className="font-medium">
          {render(s)}
        </div>
      ))}
    </div>
  );
}

export default async function CustomComparePage(props: Props) {
  const searchParams = await props.searchParams;
  const slugs = (searchParams.ids ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const allServices = await getAllServices();
  const services = slugs
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is ServiceDTO => Boolean(s));

  if (services.length < 2) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6">
        <h1 className="text-xl font-semibold">Нечего сравнивать</h1>
        <p className="mt-2 text-sm text-muted">
          Выберите от 2 до 4 сервисов в каталоге, отметив их «+ Сравнить», а затем нажмите
          «Сравнить →».
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          ← К каталогу
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <Link href="/compare" className="hover:text-fg">
          Сравнения
        </Link>
        {" / "}
        <span>Выбранные сервисы</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">
        Сравнение: {services.map((s) => s.name).join(", ")}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Данные по каждому сервису — со слов провайдера, кроме статуса сайта и VPNmarket Score,
        которые {SITE_NAME} считает сам.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface p-5">
        <div
          className="grid gap-2 pb-3"
          style={{ gridTemplateColumns: `120px repeat(${services.length}, 1fr)` }}
        >
          <div />
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/vpn/${s.slug}`}
              className="flex flex-col items-start gap-1.5 font-semibold hover:text-accent"
            >
              <ServiceLogo name={s.name} emoji={s.logo} websiteUrl={s.websiteUrl} status={s.status} />
              {s.name}
            </Link>
          ))}
        </div>

        <Row
          label="VPNmarket Score"
          services={services}
          render={(s) => <ScoreBadge score={computeScore(s).overall} size="sm" />}
        />
        <Row label="Цена" services={services} render={(s) => s.priceFrom} />
        <Row
          label="Скорость"
          services={services}
          render={(s) => (s.claimedSpeedMbps != null ? `до ${s.claimedSpeedMbps} Мбит/с` : "—")}
        />
        <Row
          label="Netflix"
          services={services}
          render={(s) => (s.tags.includes("netflix") ? "✓" : "—")}
        />
        <Row
          label="Торренты"
          services={services}
          render={(s) => (s.tags.includes("torrents") ? "✓" : "—")}
        />
        <Row
          label="No-logs"
          services={services}
          render={(s) => (s.tags.includes("no-logs") ? "✓" : "—")}
        />
        <Row
          label="Устройства"
          services={services}
          render={(s) => (s.tags.includes("unlimited-devices") ? "Безлимит" : "—")}
        />
        <Row
          label="Платформы"
          services={services}
          render={(s) => s.platforms.join(", ")}
        />
        <Row
          label="Статус сайта"
          services={services}
          render={(s) => (
            <StatusBadge status={s.status} latencyMs={s.latencyMs} lastCheckedAt={s.lastCheckedAt} />
          )}
        />
        <Row
          label="Особенности"
          services={services}
          render={(s) => s.tags.map((t) => TAG_LABELS[t] ?? t).join(", ") || "—"}
        />
        <Row
          label=""
          services={services}
          render={(s) => (
            <a
              href={s.referralUrl ?? s.websiteUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              Перейти →
            </a>
          )}
        />
      </div>

      <p className="mt-6">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Изменить выбор в каталоге
        </Link>
      </p>
    </main>
  );
}
