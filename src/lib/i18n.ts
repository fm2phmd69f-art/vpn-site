export type Locale = "ru" | "en";

/** Only these route bases exist in English right now — everything else stays Russian-only until translated. */
const TRANSLATED_BASES = ["/about", "/vpnmarket-score"];

function isTranslatedPath(path: string): boolean {
  if (path === "/") return true;
  if (/^\/vpn\/(?!category\/)[^/]+$/.test(path)) return true;
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
