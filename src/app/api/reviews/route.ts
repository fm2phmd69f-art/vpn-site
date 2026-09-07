import { NextRequest, NextResponse } from "next/server";
import { createReview } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : request.headers.get("x-real-ip");

  const result = await createReview({
    serviceId: typeof b.serviceId === "string" ? b.serviceId : "",
    authorName: typeof b.authorName === "string" ? b.authorName : "",
    text: typeof b.text === "string" ? b.text : "",
    stars: typeof b.stars === "number" ? b.stars : NaN,
    speedRating: typeof b.speedRating === "number" ? b.speedRating : NaN,
    reliabilityRating: typeof b.reliabilityRating === "number" ? b.reliabilityRating : NaN,
    valueRating: typeof b.valueRating === "number" ? b.valueRating : NaN,
    honeypot: typeof b.website === "string" ? b.website : "",
    formLoadedAt: typeof b.formLoadedAt === "number" ? b.formLoadedAt : NaN,
    ip,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
