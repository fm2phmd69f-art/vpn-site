import { NextRequest, NextResponse } from "next/server";
import { syncCatalogFromSeed } from "@/lib/syncCatalog";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * One-off/idempotent catalog seeding, callable over HTTPS so it can run from
 * environments that can't open a direct Postgres connection (e.g. sandboxed
 * CI). Upserts by slug — safe to call repeatedly after editing src/data/services.ts.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncCatalogFromSeed();
  return NextResponse.json({ seeded: result.synced });
}
