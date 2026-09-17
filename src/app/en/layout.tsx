import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME_EN } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME_EN} — Compare VPN Services`,
    template: `%s | ${SITE_NAME_EN}`,
  },
  openGraph: {
    siteName: SITE_NAME_EN,
  },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return children;
}
