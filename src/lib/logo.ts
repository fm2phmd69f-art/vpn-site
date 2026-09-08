/**
 * Real favicon of the provider's own site, proxied through Google's favicon service.
 * Unlike DuckDuckGo's icon proxy (which serves whatever raw favicon file a site has,
 * sometimes an oversized multi-hundred-KB .ico), Google's endpoint accepts a `sz` and
 * always returns a small, pre-sized PNG — so no separate image-optimization step is
 * needed to keep these cards lightweight.
 */
export function faviconUrl(websiteUrl: string): string | null {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
  } catch {
    return null;
  }
}
