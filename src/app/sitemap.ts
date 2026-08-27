import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SEED_SERVICES } from "@/data/services";
import { allComparisonPairs } from "@/lib/comparisons";
import { BLOG_POSTS } from "@/data/posts";
import { allIntentSlugs } from "@/data/intents";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const usedTags = new Set<string>();
  SEED_SERVICES.forEach((s) => s.tags.forEach((t) => usedTags.add(t)));

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages: { ru: SITE_URL, en: `${SITE_URL}/en` } },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: { languages: { ru: SITE_URL, en: `${SITE_URL}/en` } },
    },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${SITE_URL}/what-is-my-ip`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/webrtc-leak-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    { url: `${SITE_URL}/vpn-matcher`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE_URL}/is-my-ip-blocked`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: { languages: { ru: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` } },
    },
    {
      url: `${SITE_URL}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.35,
      alternates: { languages: { ru: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` } },
    },
    {
      url: `${SITE_URL}/vpn-prices`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vpnmarket-score`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: { ru: `${SITE_URL}/vpnmarket-score`, en: `${SITE_URL}/en/vpnmarket-score` },
      },
    },
    {
      url: `${SITE_URL}/en/vpnmarket-score`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: {
        languages: { ru: `${SITE_URL}/vpnmarket-score`, en: `${SITE_URL}/en/vpnmarket-score` },
      },
    },
  ];

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
    ...(p.coverImage ? { images: [p.coverImage.url] } : {}),
  }));

  const comparisons: MetadataRoute.Sitemap = allComparisonPairs().map(({ pairSlug }) => ({
    url: `${SITE_URL}/compare/${pairSlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const services: MetadataRoute.Sitemap = SEED_SERVICES.flatMap((s) => {
    const ruUrl = `${SITE_URL}/vpn/${s.slug}`;
    const enUrl = `${SITE_URL}/en/vpn/${s.slug}`;
    const languages = { ru: ruUrl, en: enUrl };
    return [
      { url: ruUrl, lastModified: now, changeFrequency: "daily", priority: 0.8, alternates: { languages } },
      { url: enUrl, lastModified: now, changeFrequency: "daily", priority: 0.75, alternates: { languages } },
    ] as MetadataRoute.Sitemap;
  });

  const categories: MetadataRoute.Sitemap = Array.from(usedTags).map((tag) => ({
    url: `${SITE_URL}/vpn/category/${tag}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const intents: MetadataRoute.Sitemap = allIntentSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...home, ...services, ...categories, ...comparisons, ...posts, ...intents];
}
