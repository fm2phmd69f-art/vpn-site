import { ServiceDTO } from "./types";

export type Purpose = "privacy" | "streaming" | "torrents" | "budget" | "gaming" | "business";
export type Budget = "free" | "under3" | "under7" | "any";
export type Priority = "speed" | "privacy" | "price";

export interface MatcherAnswers {
  purpose: Purpose;
  platform: string | "any";
  budget: Budget;
  priority: Priority;
}

const PURPOSE_TAGS: Record<Purpose, string[]> = {
  privacy: ["privacy", "no-logs"],
  streaming: ["netflix", "streaming"],
  torrents: ["torrents"],
  budget: ["free-tier", "budget"],
  gaming: ["fast"],
  business: ["business"],
};

const BUDGET_MAX: Record<Exclude<Budget, "any" | "free">, number> = {
  under3: 3,
  under7: 7,
};

export interface MatchResult {
  service: ServiceDTO;
  score: number;
  reasons: string[];
}

export function scoreServices(services: ServiceDTO[], answers: MatcherAnswers): MatchResult[] {
  const results: MatchResult[] = services.map((service) => {
    let score = (service.rating ?? 3) * 2;
    const reasons: string[] = [];

    const purposeTags = PURPOSE_TAGS[answers.purpose];
    const hasPurposeTag =
      purposeTags.some((t) => service.tags.includes(t)) ||
      (answers.purpose === "gaming" && (service.claimedSpeedMbps ?? 0) >= 800);
    if (hasPurposeTag) {
      score += 4;
      reasons.push("подходит под вашу задачу");
    }

    if (answers.platform !== "any") {
      if (service.platforms.includes(answers.platform)) {
        score += 1;
      } else {
        score -= 20;
      }
    }

    if (answers.budget === "free") {
      if (service.tags.includes("free-tier") || service.freeOption) {
        score += 3;
        reasons.push("есть бесплатный вариант");
      } else {
        score -= 15;
      }
    } else if (answers.budget !== "any") {
      const max = BUDGET_MAX[answers.budget];
      if (service.priceMonthlyUsd != null) {
        if (service.priceMonthlyUsd <= max) {
          score += 2;
          reasons.push("вписывается в бюджет");
        } else {
          score -= 10;
        }
      }
    }

    if (answers.priority === "speed" && service.claimedSpeedMbps != null) {
      score += service.claimedSpeedMbps / 150;
      if (service.claimedSpeedMbps >= 900) reasons.push("высокая заявленная скорость");
    }
    if (answers.priority === "privacy" && (service.tags.includes("privacy") || service.tags.includes("no-logs"))) {
      score += 3;
      reasons.push("упор на приватность");
    }
    if (answers.priority === "price" && service.priceMonthlyUsd != null) {
      score += Math.max(0, 5 - service.priceMonthlyUsd);
    }

    return { service, score, reasons };
  });

  return results.sort((a, b) => b.score - a.score);
}
