import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicesByTag } from "@/lib/getServices";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { ServiceCard } from "@/components/ServiceCard";
import { localizeServiceEn } from "@/lib/localizeService";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 1800;

interface Props {
  params: Promise<{ tag: string }>;
}

function label(tag: string): string | null {
  return TAG_LABELS_EN[tag] ?? null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tagLabel = label(params.tag);
  if (!tagLabel) return {};

  const cleanLabel = tagLabel.split(" ").slice(1).join(" ") || tagLabel;
  const title = `${cleanLabel} VPN — list of services`;
  const description = `A shortlist of VPN services in the "${cleanLabel}" category: prices, claimed speed, and site availability status.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/vpn/category/${params.tag}`,
      languages: {
        ru: `${SITE_URL}/vpn/category/${params.tag}`,
        en: `${SITE_URL}/en/vpn/category/${params.tag}`,
      },
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website", locale: "en_US" },
  };
}

export default async function CategoryPageEn(props: Props) {
  const params = await props.params;
  const tagLabel = label(params.tag);
  if (!tagLabel) notFound();

  const services = (await getServicesByTag(params.tag)).map(localizeServiceEn);
  if (services.length === 0) notFound();

  const cleanLabel = tagLabel.split(" ").slice(1).join(" ") || tagLabel;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <span>{cleanLabel}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{tagLabel}: VPN services</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {services.length} {services.length === 1 ? "service" : "services"} from the catalog
          tagged &quot;{cleanLabel}&quot;. Price and feature data is stated by the provider; site
          availability status updates automatically.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} locale="en" />
        ))}
      </div>

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
