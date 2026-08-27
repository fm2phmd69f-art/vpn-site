"use client";

import { useState } from "react";
import { faviconUrl } from "@/lib/logo";
import { ServiceStatus } from "@/lib/types";
import { Locale } from "@/lib/i18n";

const SIZE = 26;

interface Props {
  name: string;
  emoji: string;
  websiteUrl: string;
  status?: ServiceStatus;
  className?: string;
  locale?: Locale;
}

/**
 * Renders the provider's real favicon, scaled to a fixed size so no logo can break a
 * card's layout. Falls back to the emoji if no favicon is found, or to a cross if the
 * site is currently reported offline.
 */
export function ServiceLogo({
  name,
  emoji,
  websiteUrl,
  status,
  className = "",
  locale = "ru",
}: Props) {
  const [failed, setFailed] = useState(false);
  const src = faviconUrl(websiteUrl);

  if (status === "OFFLINE") {
    const offlineLabel =
      locale === "en" ? `${name}: site is currently down` : `${name}: сайт сейчас недоступен`;
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--offline)]/15 leading-none text-[var(--offline)] ${className}`}
        style={{ width: SIZE, height: SIZE, fontSize: SIZE * 0.55 }}
        title={offlineLabel}
        aria-label={offlineLabel}
      >
        ✕
      </span>
    );
  }

  if (!src || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`}
        style={{ width: SIZE, height: SIZE, fontSize: SIZE * 0.8 }}
        aria-hidden
      >
        {emoji}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={locale === "en" ? `${name} logo` : `Логотип ${name}`}
      width={SIZE}
      height={SIZE}
      className={`inline-block shrink-0 rounded-md object-contain ${className}`}
      style={{ width: SIZE, height: SIZE }}
      onError={() => setFailed(true)}
    />
  );
}
