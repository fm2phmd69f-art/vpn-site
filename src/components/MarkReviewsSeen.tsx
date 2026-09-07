"use client";

import { useEffect } from "react";

/** Fires once on mount to bump the "last seen" cookie, so a later visit only flags newer reviews. */
export function MarkReviewsSeen() {
  useEffect(() => {
    fetch("/api/admin/reviews/seen", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
