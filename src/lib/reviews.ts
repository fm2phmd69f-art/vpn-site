import { createHash } from "crypto";
import { prisma } from "./prisma";

export interface ReviewDTO {
  id: string;
  authorName: string;
  text: string;
  stars: number;
  speedRating: number;
  reliabilityRating: number;
  valueRating: number;
  createdAt: string;
}

export interface ReviewAggregate {
  count: number;
  avgStars: number;
  avgSpeed: number;
  avgReliability: number;
  avgValue: number;
}

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 40;
const MIN_TEXT_LENGTH = 10;
const MAX_TEXT_LENGTH = 1000;
const MIN_SUBMIT_DELAY_MS = 3000;
const MAX_FORM_AGE_MS = 60 * 60 * 1000;
const MAX_REVIEWS_PER_IP_PER_DAY = 5;
const MAX_REVIEWS_PER_IP_PER_SERVICE_PER_DAY = 1;

const LINK_PATTERN = /https?:\/\/|www\./i;

export function hashIp(ip: string): string {
  const salt = process.env.REVIEW_IP_SALT ?? "vpnmarket-review-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export interface CreateReviewInput {
  serviceId: string;
  authorName: string;
  text: string;
  stars: number;
  speedRating: number;
  reliabilityRating: number;
  valueRating: number;
  honeypot: string;
  formLoadedAt: number;
  ip: string | null;
}

export type CreateReviewResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

function isValidRating(n: unknown, max: number): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= max;
}

export async function createReview(input: CreateReviewInput): Promise<CreateReviewResult> {
  // Honeypot: real users never fill this hidden field. Pretend success so bots don't learn.
  if (input.honeypot) {
    return { ok: true };
  }

  const now = Date.now();
  const elapsed = now - input.formLoadedAt;
  if (!Number.isFinite(input.formLoadedAt) || elapsed < MIN_SUBMIT_DELAY_MS || elapsed > MAX_FORM_AGE_MS) {
    return { ok: false, error: "Слишком быстро или форма устарела — обновите страницу и попробуйте ещё раз.", status: 400 };
  }

  const name = input.authorName.trim();
  const text = input.text.trim();

  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    return { ok: false, error: "Имя должно быть от 2 до 40 символов.", status: 400 };
  }
  if (text.length < MIN_TEXT_LENGTH || text.length > MAX_TEXT_LENGTH) {
    return { ok: false, error: "Отзыв должен быть от 10 до 1000 символов.", status: 400 };
  }
  if (LINK_PATTERN.test(name) || LINK_PATTERN.test(text)) {
    return { ok: false, error: "Отзыв не должен содержать ссылки.", status: 400 };
  }
  if (!isValidRating(input.stars, 5)) {
    return { ok: false, error: "Оценка должна быть от 1 до 5.", status: 400 };
  }
  if (
    !isValidRating(input.speedRating, 10) ||
    !isValidRating(input.reliabilityRating, 10) ||
    !isValidRating(input.valueRating, 10)
  ) {
    return { ok: false, error: "Оценки по критериям должны быть от 1 до 10.", status: 400 };
  }

  try {
    const service = await prisma.vpnService.findUnique({
      where: { id: input.serviceId },
      select: { id: true },
    });
    if (!service) {
      return { ok: false, error: "Сервис не найден.", status: 404 };
    }

    if (input.ip) {
      const ipHash = hashIp(input.ip);
      const since = new Date(now - 24 * 60 * 60 * 1000);

      const [totalToday, forThisServiceToday] = await Promise.all([
        prisma.review.count({ where: { ipHash, createdAt: { gte: since } } }),
        prisma.review.count({
          where: { ipHash, serviceId: input.serviceId, createdAt: { gte: since } },
        }),
      ]);

      if (totalToday >= MAX_REVIEWS_PER_IP_PER_DAY) {
        return { ok: false, error: "Слишком много отзывов с вашего адреса за сегодня.", status: 429 };
      }
      if (forThisServiceToday >= MAX_REVIEWS_PER_IP_PER_SERVICE_PER_DAY) {
        return { ok: false, error: "Вы уже оставляли отзыв на этот сервис сегодня.", status: 429 };
      }

      await prisma.review.create({
        data: {
          serviceId: input.serviceId,
          authorName: name,
          text,
          stars: input.stars,
          speedRating: input.speedRating,
          reliabilityRating: input.reliabilityRating,
          valueRating: input.valueRating,
          ipHash,
        },
      });
      return { ok: true };
    }

    await prisma.review.create({
      data: {
        serviceId: input.serviceId,
        authorName: name,
        text,
        stars: input.stars,
        speedRating: input.speedRating,
        reliabilityRating: input.reliabilityRating,
        valueRating: input.valueRating,
      },
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Сервис приёма отзывов временно недоступен — попробуйте отправить отзыв позже.",
      status: 503,
    };
  }
}

export async function getReviewsForService(serviceId: string): Promise<ReviewDTO[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: { serviceId },
      orderBy: { createdAt: "desc" },
    });
    return reviews.map((r) => ({
      id: r.id,
      authorName: r.authorName,
      text: r.text,
      stars: r.stars,
      speedRating: r.speedRating,
      reliabilityRating: r.reliabilityRating,
      valueRating: r.valueRating,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch {
    // DB unreachable (e.g. paused Neon project) — render the page without
    // reviews rather than 500ing the whole provider page.
    return [];
  }
}

export function computeAggregate(reviews: ReviewDTO[]): ReviewAggregate | null {
  if (reviews.length === 0) return null;
  const sum = (f: (r: ReviewDTO) => number) => reviews.reduce((acc, r) => acc + f(r), 0);
  const round = (n: number) => Math.round(n * 10) / 10;
  return {
    count: reviews.length,
    avgStars: round(sum((r) => r.stars) / reviews.length),
    avgSpeed: round(sum((r) => r.speedRating) / reviews.length),
    avgReliability: round(sum((r) => r.reliabilityRating) / reviews.length),
    avgValue: round(sum((r) => r.valueRating) / reviews.length),
  };
}
