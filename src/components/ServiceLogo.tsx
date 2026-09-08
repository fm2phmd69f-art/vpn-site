"use client";

import { useState } from "react";
import { faviconUrl } from "@/lib/logo";
import { ServiceStatus } from "@/lib/types";
import { Locale } from "@/lib/i18n";

const SIZE = 26;

/** Real vector wordmark provided by Geodema, used instead of a fetched favicon. */
function GeodemaMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.6104 0C26.6915 1.01496e-05 30.0001 3.30851 30.0001 7.38972V9.29362C26.7713 11.0503 23.9774 13.5262 21.7708 16.628C21.3567 17.2178 20.8692 17.967 20.6666 18.3255C20.7137 18.385 20.7608 18.4444 20.8078 18.504C22.9475 20.6338 25.1759 22.6645 27.46 24.6165C28.0221 25.0964 28.5877 25.5714 29.1566 26.0417C28.8225 26.6778 28.3985 27.2592 27.9014 27.769C26.5568 26.5003 25.2556 25.2089 24.0122 23.9095C22.5418 22.3728 21.1523 20.8251 19.8674 19.2905C18.9545 18.1976 18.1828 17.3489 18.144 17.3742C18.0412 17.49 19.3658 19.9722 20.2918 21.3869C21.9358 23.8786 23.926 26.4802 26.1618 29.092C25.6506 29.3727 25.1028 29.5946 24.5272 29.7488C23.0214 27.8558 21.5802 25.9073 20.2078 23.9032C19.8272 23.3322 19.4543 22.7542 19.0956 22.1762L19.0927 22.1718C19.0053 22.0295 18.9203 21.8878 18.8372 21.7464C18.7489 21.9516 18.6347 22.2378 18.5169 22.5428C17.572 25.0466 17.0225 27.5344 16.8689 30H7.38972C3.30851 30 0 26.6915 0 22.6103V7.38972C0 3.30851 3.30851 1.07853e-05 7.38972 0H22.6104ZM10.7102 13.6308C10.4272 13.4122 10.1829 13.2579 10.1572 13.2836C10.08 13.3608 10.633 14.9684 11.0317 15.8558C11.4175 16.7304 11.4562 16.7562 13.3468 17.7593C15.3402 18.8011 15.4432 18.8139 14.6458 17.8493C13.8355 16.8847 13.4367 16.113 13.5139 15.7015C13.5653 15.4314 13.4238 15.3156 12.395 14.7112C11.7519 14.3253 10.9932 13.8366 10.7102 13.6308ZM7.37913 5.63078C7.08333 5.56648 6.67175 5.52785 6.46597 5.54072C6.08013 5.56644 6.08011 5.57932 6.11869 6.20951C6.23444 8.17731 7.64918 10.608 9.64261 12.2672C10.7745 13.2188 12.5622 14.3892 13.5525 14.8522L14.2728 15.1867L15.7132 13.7462L15.4174 13.1288C14.6972 11.6112 12.9608 9.23192 11.7776 8.12585C10.3886 6.82685 8.781 5.91374 7.37913 5.63078ZM15.1087 10.0164C14.4528 9.88777 13.9126 9.79777 13.8868 9.81062C13.8613 9.83654 14.1571 10.2995 14.5428 10.8524C14.9158 11.4183 15.3916 12.1642 15.5975 12.5372L15.9704 13.206H16.7035C17.5266 13.1932 18.0025 13.3988 18.7613 14.0805C19.0315 14.3249 19.2629 14.4921 19.2629 14.4407C19.2628 14.2734 18.3883 12.7302 17.6424 11.5726C16.8707 10.3894 16.845 10.3765 15.1087 10.0164Z"
        fill="#262621"
      />
    </svg>
  );
}

interface Props {
  name: string;
  emoji: string;
  websiteUrl: string;
  status?: ServiceStatus;
  className?: string;
  locale?: Locale;
  slug?: string;
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
  slug,
}: Props) {
  const [failed, setFailed] = useState(false);
  const src = faviconUrl(websiteUrl);

  if (status !== "OFFLINE" && slug === "geodema") {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center ${className}`}
        style={{ width: SIZE, height: SIZE }}
      >
        <GeodemaMark size={SIZE} />
      </span>
    );
  }

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
