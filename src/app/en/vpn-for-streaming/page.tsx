import type { Metadata } from "next";
import { IntentPage, generateIntentMetadata } from "@/components/IntentPage";
import { getIntent } from "@/data/intents";

export const revalidate = 1800;

const CONFIG = getIntent("vpn-for-streaming");

export function generateMetadata(): Metadata {
  return generateIntentMetadata(CONFIG, "en");
}

export default function Page() {
  return <IntentPage config={CONFIG} locale="en" />;
}
