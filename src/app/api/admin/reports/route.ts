import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  return request.headers.get("x-cron-secret") === expected;
}

/** Lists user-submitted price/data reports, newest first — for the site owner to review. */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reports = await prisma.priceReport.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const serviceIds = Array.from(new Set(reports.map((r) => r.serviceId)));
  const services = await prisma.vpnService.findMany({
    where: { id: { in: serviceIds } },
    select: { id: true, name: true, slug: true },
  });
  const serviceById = new Map(services.map((s) => [s.id, s]));

  return NextResponse.json({
    reports: reports.map((r) => ({
      id: r.id,
      note: r.note,
      createdAt: r.createdAt,
      service: serviceById.get(r.serviceId) ?? null,
    })),
  });
}
