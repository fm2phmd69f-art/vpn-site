/** Real favicon of the provider's own site, proxied through DuckDuckGo's icon service (404s cleanly when none exists). */
export function faviconUrl(websiteUrl: string): string | null {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return null;
  }
}
