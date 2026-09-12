import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0071e3",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 56 }}>
          <span>🚫</span>
          <span style={{ fontWeight: 700 }}>Is My IP Blocked?</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 32, opacity: 0.9 }}>
          Check against DNSBL spam blocklists — Spamhaus, SpamCop, SORBS & more
        </div>
      </div>
    ),
    { ...size }
  );
}
