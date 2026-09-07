import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  return request.cookies.get("admin_key")?.value === expected;
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { id } = (body ?? {}) as { id?: unknown };
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.review.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
