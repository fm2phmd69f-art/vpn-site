import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONTACT_LENGTH = 200;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, contact } = (body ?? {}) as { message?: unknown; contact?: unknown };

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }
  if (typeof contact !== "string" || contact.trim().length === 0) {
    return NextResponse.json({ error: "contact is required" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }
  if (contact.length > MAX_CONTACT_LENGTH) {
    return NextResponse.json({ error: "contact too long" }, { status: 400 });
  }

  await prisma.contactMessage.create({
    data: {
      message: message.trim().slice(0, MAX_MESSAGE_LENGTH),
      contact: contact.trim().slice(0, MAX_CONTACT_LENGTH),
    },
  });

  return NextResponse.json({ ok: true });
}
