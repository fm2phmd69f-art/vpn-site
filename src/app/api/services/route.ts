import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await prisma.vpnService.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });
  return NextResponse.json({ services });
}
