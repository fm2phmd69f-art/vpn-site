/** Small "TOP" badge shown next to a sponsored/featured provider's name. */
export function TopBadge() {
  return (
    <span
      className="inline-flex h-[18px] shrink-0 items-center gap-0.5 rounded-full px-2 text-[10px] font-bold uppercase leading-none tracking-wide text-[#171717]"
      style={{ backgroundColor: "#ffc107" }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.7z" />
      </svg>
      TOP
    </span>
  );
}
