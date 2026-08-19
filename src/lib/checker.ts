export interface CheckResult {
  status: "ONLINE" | "OFFLINE";
  latencyMs: number | null;
  error: string | null;
}

/**
 * Measures whether a provider's website is reachable and how long it took to
 * respond. This is a proxy for "the service is up / infra is reachable" — it
 * is NOT a measurement of VPN tunnel throughput, which would require an
 * active account/config for that specific provider.
 */
export async function checkWebsite(url: string, timeoutMs = 8000): Promise<CheckResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const start = performance.now();

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VpnAggregatorUptimeBot/1.0; +https://example.com/bot)",
      },
    });
    const latencyMs = Math.round(performance.now() - start);

    // Any response (even 4xx from bot-protection) proves the origin is reachable.
    // 5xx means the provider's own server is failing — treat as a real outage.
    if (res.status >= 500) {
      return { status: "OFFLINE", latencyMs, error: `HTTP ${res.status}` };
    }
    return { status: "ONLINE", latencyMs, error: null };
  } catch (err) {
    return {
      status: "OFFLINE",
      latencyMs: null,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timeout);
  }
}
