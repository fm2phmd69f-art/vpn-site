import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_NOTE_LENGTH = 500;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { serviceId, note } = (body ?? {}) as { serviceId?: unknown; note?: unknown };

  if (typeof serviceId !== "string" || !serviceId) {
    return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
  }
  if (typeof note !== "string" || note.trim().length === 0) {
    return NextResponse.json({ error: "note is required" }, { status: 400 });
  }
  if (note.length > MAX_NOTE_LENGTH) {
    return NextResponse.json({ error: "note too long" }, { status: 400 });
  }

  const service = await prisma.vpnService.findUnique({
    where: { id: serviceId },
    select: { id: true },
  });
  if (!service) {
    return NextResponse.json({ error: "Unknown serviceId" }, { status: 404 });
  }

  await prisma.priceReport.create({
    data: { serviceId, note: note.trim().slice(0, MAX_NOTE_LENGTH) },
  });

  return NextResponse.json({ ok: true });
}
