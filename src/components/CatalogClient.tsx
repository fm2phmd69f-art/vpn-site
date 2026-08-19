"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceDTO } from "@/lib/types";
import { ServiceCard } from "./ServiceCard";

const DESKTOP_PAGE_SIZE = 50;
const MOBILE_PAGE_SIZE = 30;
const MOBILE_BREAKPOINT = 640; // matches Tailwind's `sm`

export function CatalogClient({ services }: { services: ServiceDTO[] }) {
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [visibleCount, setVisibleCount] = useState(DESKTOP_PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updatePageSize() {
      const size = window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
      setPageSize(size);
      setVisibleCount(size);
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const visible = services.slice(0, visibleCount);
  const hasMore = visibleCount < services.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + pageSize);
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      )}
    </div>
  );
}
