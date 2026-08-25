"use client";

import { useState } from "react";
import { faviconUrl } from "@/lib/logo";

const SIZE = 26;

interface Props {
  name: string;
  emoji: string;
  websiteUrl: string;
  className?: string;
}

/** Renders the provider's real favicon, scaled to a fixed size so no logo can break a card's layout. Falls back to the emoji if no favicon is found. */
export function ServiceLogo({ name, emoji, websiteUrl, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const src = faviconUrl(websiteUrl);

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
      alt={`Логотип ${name}`}
      width={SIZE}
      height={SIZE}
      className={`inline-block shrink-0 rounded-md object-contain ${className}`}
      style={{ width: SIZE, height: SIZE }}
      onError={() => setFailed(true)}
    />
  );
}
