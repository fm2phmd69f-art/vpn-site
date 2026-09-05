import type { Metadata } from "next";
import { TroubleshootPage, generateTroubleshootMetadata } from "@/components/TroubleshootPage";
import { getTroubleshooting } from "@/data/troubleshooting";

export const revalidate = 1800;

const CONFIG = getTroubleshooting("netflix-not-working-with-vpn");

export function generateMetadata(): Metadata {
  return generateTroubleshootMetadata(CONFIG);
}

export default function Page() {
  return <TroubleshootPage config={CONFIG} />;
}
