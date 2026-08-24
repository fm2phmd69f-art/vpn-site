import { NextResponse } from "next/server";
import { getClientInfo } from "@/lib/clientInfo";

export const dynamic = "force-dynamic";

export async function GET() {
  const info = await getClientInfo();
  return NextResponse.json(info);
}
