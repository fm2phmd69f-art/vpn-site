import { BLOG_POSTS_EN } from "@/data/postsEn";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";

export type Locale = "ru" | "en";

const TRANSLATED_BLOG_SLUGS = new Set(BLOG_POSTS_EN.map((p) => p.slug));

/** Route bases with no untranslated sub-paths — an exact match or any sub-path is fine. */
const TRANSLATED_BASES = [
  "/compare",
  "/about",
  "/vpnmarket-score",
  "/vpn-for-netflix",
  "/free-vpn",
  "/vpn-for-torrents",
  "/vpn-for-gaming",
  "/vpn-for-privacy",
  "/vpn-without-registration",
  "/vpn-for-mac",
  "/vpn-for-iphone",
  "/vpn-for-android",
  "/vpn-for-windows",
  "/vpn-for-streaming",
  "/vpn-for-travel",
  "/vpn-matcher",
  "/vpn-prices",
  "/what-is-my-ip",
  "/webrtc-leak-test",
  "/is-my-ip-blocked",
];

function isTranslatedPath(path: string): boolean {
  if (path === "/") return true;
  if (path === "/blog") return true;
  if (/^\/vpn\/category\/([^/]+)$/.test(path)) {
    const tag = /^\/vpn\/category\/([^/]+)$/.exec(path)![1];
    return Boolean(TAG_LABELS_EN[tag]);
  }
  if (/^\/vpn\/[^/]+$/.test(path)) return true;
  const blogMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (blogMatch) return TRANSLATED_BLOG_SLUGS.has(blogMatch[1]);
  return TRANSLATED_BASES.some((base) => path === base || path.startsWith(`${base}/`));
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

/** Given the CURRENT pathname (in either locale), returns the equivalent path in `target`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const current = localeFromPathname(pathname);
  const bare = current === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;

  if (target === "ru") return bare;
  // target === "en": only link to a real translated page, otherwise fall back to the English home.
  return isTranslatedPath(bare) ? `/en${bare === "/" ? "" : bare}` : "/en";
}
