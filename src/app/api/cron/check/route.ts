import { NextRequest, NextResponse } from "next/server";
import { runChecksForAllServices } from "@/lib/runChecks";

export const maxDuration = 60;

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;

  // Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` automatically.
  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${expected}`) return true;

  // Self-hosted cron (curl/systemd timer) can send this header instead.
  return request.headers.get("x-cron-secret") === expected;
}

async function handle(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await runChecksForAllServices();
  return NextResponse.json(summary);
}

export const GET = handle;
export const POST = handle;
