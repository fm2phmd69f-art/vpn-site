import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SEED_SERVICES } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const usedTags = new Set<string>();
  SEED_SERVICES.forEach((s) => s.tags.forEach((t) => usedTags.add(t)));

  const home: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const services: MetadataRoute.Sitemap = SEED_SERVICES.map((s) => ({
    url: `${SITE_URL}/vpn/${s.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const categories: MetadataRoute.Sitemap = Array.from(usedTags).map((tag) => ({
    url: `${SITE_URL}/vpn/category/${tag}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...home, ...services, ...categories];
}
