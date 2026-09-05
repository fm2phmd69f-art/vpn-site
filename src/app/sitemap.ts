import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SEED_SERVICES } from "@/data/services";
import { allComparisonPairs } from "@/lib/comparisons";
import { BLOG_POSTS } from "@/data/posts";
import { BLOG_POSTS_EN } from "@/data/postsEn";
import { allIntentSlugs } from "@/data/intents";
import { INTENTS_EN } from "@/data/intentsEn";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { allTroubleshootingSlugs } from "@/data/troubleshooting";

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
    {
      url: `${SITE_URL}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: { ru: `${SITE_URL}/compare`, en: `${SITE_URL}/en/compare` } },
    },
    {
      url: `${SITE_URL}/en/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
      alternates: { languages: { ru: `${SITE_URL}/compare`, en: `${SITE_URL}/en/compare` } },
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: { ru: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` } },
    },
    {
      url: `${SITE_URL}/en/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
      alternates: { languages: { ru: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` } },
    },
    {
      url: `${SITE_URL}/what-is-my-ip`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: { ru: `${SITE_URL}/what-is-my-ip`, en: `${SITE_URL}/en/what-is-my-ip` },
      },
    },
    {
      url: `${SITE_URL}/en/what-is-my-ip`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ru: `${SITE_URL}/what-is-my-ip`, en: `${SITE_URL}/en/what-is-my-ip` },
      },
    },
    {
      url: `${SITE_URL}/webrtc-leak-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: { ru: `${SITE_URL}/webrtc-leak-test`, en: `${SITE_URL}/en/webrtc-leak-test` },
      },
    },
    {
      url: `${SITE_URL}/en/webrtc-leak-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ru: `${SITE_URL}/webrtc-leak-test`, en: `${SITE_URL}/en/webrtc-leak-test` },
      },
    },
    {
      url: `${SITE_URL}/vpn-matcher`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { ru: `${SITE_URL}/vpn-matcher`, en: `${SITE_URL}/en/vpn-matcher` } },
    },
    {
      url: `${SITE_URL}/en/vpn-matcher`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: { languages: { ru: `${SITE_URL}/vpn-matcher`, en: `${SITE_URL}/en/vpn-matcher` } },
    },
    {
      url: `${SITE_URL}/is-my-ip-blocked`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: { ru: `${SITE_URL}/is-my-ip-blocked`, en: `${SITE_URL}/en/is-my-ip-blocked` },
      },
    },
    {
      url: `${SITE_URL}/en/is-my-ip-blocked`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ru: `${SITE_URL}/is-my-ip-blocked`, en: `${SITE_URL}/en/is-my-ip-blocked` },
      },
    },
    {
      url: `${SITE_URL}/vpn-security-check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: {
        languages: {
          ru: `${SITE_URL}/vpn-security-check`,
          en: `${SITE_URL}/en/vpn-security-check`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/vpn-security-check`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          ru: `${SITE_URL}/vpn-security-check`,
          en: `${SITE_URL}/en/vpn-security-check`,
        },
      },
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: { ru: `${SITE_URL}/tools`, en: `${SITE_URL}/en/tools` } },
    },
    {
      url: `${SITE_URL}/en/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.45,
      alternates: { languages: { ru: `${SITE_URL}/tools`, en: `${SITE_URL}/en/tools` } },
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
      alternates: { languages: { ru: `${SITE_URL}/vpn-prices`, en: `${SITE_URL}/en/vpn-prices` } },
    },
    {
      url: `${SITE_URL}/en/vpn-prices`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
      alternates: { languages: { ru: `${SITE_URL}/vpn-prices`, en: `${SITE_URL}/en/vpn-prices` } },
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

  const enSlugs = new Set(BLOG_POSTS_EN.map((p) => p.slug));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((p) => {
    const ruUrl = `${SITE_URL}/blog/${p.slug}`;
    const hasEn = enSlugs.has(p.slug);
    const enUrl = `${SITE_URL}/en/blog/${p.slug}`;
    const languages = hasEn ? { ru: ruUrl, en: enUrl } : undefined;
    const entries: MetadataRoute.Sitemap = [
      {
        url: ruUrl,
        lastModified: p.publishedAt,
        changeFrequency: "monthly",
        priority: 0.6,
        ...(p.coverImage ? { images: [p.coverImage.url] } : {}),
        ...(languages ? { alternates: { languages } } : {}),
      },
    ];
    if (hasEn) {
      const enPost = BLOG_POSTS_EN.find((ep) => ep.slug === p.slug)!;
      entries.push({
        url: enUrl,
        lastModified: p.publishedAt,
        changeFrequency: "monthly",
        priority: 0.55,
        ...(enPost.coverImage ? { images: [enPost.coverImage.url] } : {}),
        alternates: { languages },
      });
    }
    return entries;
  });

  const comparisons: MetadataRoute.Sitemap = allComparisonPairs().flatMap(({ pairSlug }) => {
    const ruUrl = `${SITE_URL}/compare/${pairSlug}`;
    const enUrl = `${SITE_URL}/en/compare/${pairSlug}`;
    const languages = { ru: ruUrl, en: enUrl };
    return [
      { url: ruUrl, lastModified: now, changeFrequency: "weekly", priority: 0.7, alternates: { languages } },
      { url: enUrl, lastModified: now, changeFrequency: "weekly", priority: 0.65, alternates: { languages } },
    ] as MetadataRoute.Sitemap;
  });

  const services: MetadataRoute.Sitemap = SEED_SERVICES.flatMap((s) => {
    const ruUrl = `${SITE_URL}/vpn/${s.slug}`;
    const enUrl = `${SITE_URL}/en/vpn/${s.slug}`;
    const languages = { ru: ruUrl, en: enUrl };
    return [
      { url: ruUrl, lastModified: now, changeFrequency: "daily", priority: 0.8, alternates: { languages } },
      { url: enUrl, lastModified: now, changeFrequency: "daily", priority: 0.75, alternates: { languages } },
    ] as MetadataRoute.Sitemap;
  });

  const categories: MetadataRoute.Sitemap = Array.from(usedTags).flatMap((tag) => {
    const ruUrl = `${SITE_URL}/vpn/category/${tag}`;
    const hasEn = Boolean(TAG_LABELS_EN[tag]);
    if (!hasEn) {
      return [{ url: ruUrl, lastModified: now, changeFrequency: "weekly", priority: 0.6 }];
    }
    const enUrl = `${SITE_URL}/en/vpn/category/${tag}`;
    const languages = { ru: ruUrl, en: enUrl };
    return [
      { url: ruUrl, lastModified: now, changeFrequency: "weekly", priority: 0.6, alternates: { languages } },
      { url: enUrl, lastModified: now, changeFrequency: "weekly", priority: 0.55, alternates: { languages } },
    ] as MetadataRoute.Sitemap;
  });

  const intents: MetadataRoute.Sitemap = allIntentSlugs().flatMap((slug) => {
    const ruUrl = `${SITE_URL}/${slug}`;
    const hasEn = Boolean(INTENTS_EN[slug]);
    if (!hasEn) {
      return [{ url: ruUrl, lastModified: now, changeFrequency: "weekly", priority: 0.75 }];
    }
    const enUrl = `${SITE_URL}/en/${slug}`;
    const languages = { ru: ruUrl, en: enUrl };
    return [
      {
        url: ruUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: { languages },
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages },
      },
    ] as MetadataRoute.Sitemap;
  });

  const troubleshooting: MetadataRoute.Sitemap = allTroubleshootingSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...home,
    ...services,
    ...categories,
    ...comparisons,
    ...posts,
    ...intents,
    ...troubleshooting,
  ];
}
