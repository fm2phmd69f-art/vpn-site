export interface IntentFaqItemEn {
  q: string;
  a: string;
}

export interface IntentTextEn {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  methodology: string;
  faq: IntentFaqItemEn[];
}

/** English translations of INTENTS (src/data/intents.ts), keyed by the same slug. Filtering/sorting logic stays in intents.ts and is locale-independent. */
export const INTENTS_EN: Record<string, IntentTextEn> = {
  "vpn-for-netflix": {
    h1: "Best VPN for Netflix",
    metaTitle: "VPN for Netflix — which service actually unblocks the catalog",
    metaDescription:
      "A shortlist of VPNs that providers themselves position as working for Netflix and other streaming services. An honest look at why it isn't always stable.",
    intro: [
      "Netflix shows a different catalog of movies and shows depending on your country — that's a licensing-agreement condition with the studios, not a technical limitation. A VPN changes your visible IP address, which can make the service think you're in a different country.",
      "The catch is that Netflix actively blocks IP addresses belonging to known VPN providers, so whether a specific server works is never permanent — what worked yesterday might not work today. Below are services that claim their own support for unblocking streaming.",
    ],
    methodology:
      "This shortlist includes services tagged \"Netflix/streaming\" in our catalog — that's how providers describe themselves, not an independent test of specific servers.",
    faq: [
      {
        q: "Why does Netflix sometimes still detect a VPN?",
        a: "Netflix maintains its own database of IP addresses belonging to data centers and known VPN providers, and blocks them in batches. Providers update their servers in response, so the situation keeps changing.",
      },
      {
        q: "Which server should I pick within a country?",
        a: "If the catalog didn't unlock on one server, try another one in the same country — large providers have dozens of them, and not all get caught in blocklists at the same time.",
      },
      {
        q: "Is this legal?",
        a: "Bypassing geo-blocking may violate Netflix's terms of service — that's on you as a user, not something a VPN provider guarantees or endorses.",
      },
    ],
  },

  "free-vpn": {
    h1: "Free VPN: which plans are honest",
    metaTitle: "Free VPN 2026 — no catch, no P2P schemes",
    metaDescription:
      "A list of VPNs with a genuine free plan: data caps, honest terms, and what to check before installing.",
    intro: [
      "\"Free VPN\" raises an obvious question — if the service doesn't charge money, how does it make any? The answer varies: some providers offer a stripped-down version of their paid product to attract users, while others run on a P2P model where other users' traffic passes through your device.",
      "Below are services from our catalog with an explicit free tier. The gap in data caps and server counts can be significant, so compare the cards before choosing.",
    ],
    methodology:
      "This shortlist includes services tagged \"Free tier\" — terms (data cap, server count) are listed separately on each card.",
    faq: [
      {
        q: "What separates an honest free VPN from a suspicious one?",
        a: "An honest one usually caps data or server count, but says so openly. Be wary of a complete absence of limits with no clear business model — that often means selling data or a P2P scheme.",
      },
      {
        q: "What's the P2P model in free VPNs?",
        a: "Other users' traffic is routed through your device, and yours through theirs. It's technically still \"free,\" just with a different privacy model — worth considering if privacy is the whole point of using a VPN for you.",
      },
      {
        q: "Can I use a free VPN as my only VPN long-term?",
        a: "Technically yes, but data caps (usually 2–10 GB/month) make it impractical for everyday use — most people move to a paid plan for regular use.",
      },
    ],
  },

  "vpn-for-torrents": {
    h1: "VPN for torrenting",
    metaTitle: "VPN for torrents — which services allow P2P",
    metaDescription:
      "VPN services that explicitly allow torrenting and P2P traffic on their servers, flagged in the catalog.",
    intro: [
      "Not all VPNs treat torrent traffic the same way — some providers restrict P2P on most servers because of network load or legal risk in a given country, some dedicate specific servers to it, and some allow it everywhere with no restrictions.",
      "Below are catalog services that explicitly claim support for torrents/P2P.",
    ],
    methodology:
      "This shortlist is built from the \"Torrents\" tag — that's how providers themselves describe P2P support on their servers.",
    faq: [
      {
        q: "Does a VPN protect me from copyright complaints while torrenting?",
        a: "A VPN hides your real IP from other peers in the swarm, which lowers the risk of a complaint landing on you directly. It's not a full anonymity guarantee — the provider's logging policy matters too.",
      },
      {
        q: "Do I need a dedicated server for torrenting?",
        a: "Some providers run dedicated P2P servers optimized for that traffic — if they exist, it's usually flagged in the provider's app when picking a server.",
      },
      {
        q: "Is downloading torrents legal?",
        a: "It depends on the content and your jurisdiction — downloading material without the rightsholder's permission can be illegal regardless of whether you use a VPN. That's on the user.",
      },
    ],
  },

  "vpn-for-gaming": {
    h1: "VPN for gaming",
    metaTitle: "VPN for online gaming — low ping, stable connection",
    metaDescription:
      "Which VPN suits online gaming: what matters besides claimed speed, plus a shortlist of services with fast servers.",
    intro: [
      "For gaming, latency (ping) and connection stability matter more than download speed — an extra network hop can either hurt or, in some cases, improve your route (for example, if your ISP connects poorly to the game's server directly).",
      "There's no industry-certified \"for gaming\" tag — look for providers with many servers and high claimed speed, they tend to have shorter queues on popular locations.",
    ],
    methodology:
      "This shortlist includes services tagged \"High speed\" or with the highest claimed speed in the catalog. That's based on the provider's own claims, not an independent ping test in a specific game.",
    faq: [
      {
        q: "Does a VPN increase ping in games?",
        a: "Usually yes, since traffic goes through an extra server — the latency added depends on the distance to the VPN server. Pick a server geographically close to the game server.",
      },
      {
        q: "Can a VPN ever lower ping?",
        a: "Rarely — if your ISP's route to the game server is suboptimal and the VPN provider has a more direct path. It's the exception rather than the rule, and hard to predict in advance.",
      },
      {
        q: "Does a VPN help against DDoS attacks in games?",
        a: "A VPN hides your real IP from other players, making a direct attack on your connection harder. It's an extra layer, not a guarantee — some gaming services provide their own DDoS protection too.",
      },
    ],
  },

  "vpn-for-privacy": {
    h1: "VPN for privacy",
    metaTitle: "VPN for privacy — no-logs and independent audits",
    metaDescription:
      "VPN services with a no-logs policy and a privacy focus: independently verified providers and what \"doesn't keep logs\" actually means.",
    intro: [
      "If the goal is maximum privacy rather than just changing region, the key criteria are different: a no-logs policy (ideally independently audited), a jurisdiction outside surveillance alliances, a modern encryption protocol, and, where possible, an anonymous payment method.",
      "\"No-logs\" is a provider's own claim — you can't verify it yourself. It carries far more weight when an independent auditing firm has checked the policy, which is noted in the description of some services below.",
    ],
    methodology:
      "This shortlist is built from the \"No-logs\" and \"Privacy\" tags — based on providers' own claims about data retention and their internal privacy policy.",
    faq: [
      {
        q: "What's an independent no-logs audit?",
        a: "It's a review of a data-retention policy by a third-party auditing firm — it examines the provider's infrastructure and confirms (or not) that its no-logging claims hold up. It's not a 100% guarantee, but it carries more weight than a bare promise.",
      },
      {
        q: "Does a provider's jurisdiction matter?",
        a: "Yes — the country of registration determines which data-retention laws the company is subject to. Providers outside surveillance alliances (\"14 Eyes\") are, in theory, under less pressure to hand over user data.",
      },
      {
        q: "Do I need an anonymous payment method for privacy?",
        a: "If the goal is to avoid a financial trail tied to your VPN purchase, look at providers accepting cryptocurrency or cash by mail — some services in the catalog explicitly support this.",
      },
    ],
  },

  "vpn-without-registration": {
    h1: "VPN without registration",
    metaTitle: "VPN without email registration — anonymous payment and access",
    metaDescription:
      "VPNs that don't require an email or personal details to pay — an honest look at what \"no registration\" actually means.",
    intro: [
      "A VPN with strictly \"no registration whatsoever\" almost doesn't exist — most services still need some way to identify your active subscription (an account, key, or ID). But some providers don't require an email and let you pay by crypto or cash by mail, without tying the subscription to your personal details.",
      "Those are the services collected below — the closest thing to \"no registration\" in the usual sense of the phrase.",
    ],
    methodology:
      "This shortlist is built from the \"Anonymous payment\" tag — services that themselves claim you can pay and use the product without tying it to an email or identity.",
    faq: [
      {
        q: "Does \"no registration\" mean no account at all?",
        a: "Usually not — instead of email, you get a random ID or account number at checkout. Technically that's still an \"account,\" just not tied to your personal data.",
      },
      {
        q: "Which payment methods work for anonymity?",
        a: "Cryptocurrency (especially with extra privacy measures) and cash by mail are what these providers tend to use. Paying by a regular bank card leaves a financial trail with your bank either way.",
      },
      {
        q: "Are there risks to this approach?",
        a: "If you lose your anonymous ID and never linked an email for recovery, getting your subscription back may be impossible — that's the price of anonymity, worth keeping in mind.",
      },
    ],
  },

  "vpn-for-mac": {
    h1: "VPN for Mac",
    metaTitle: "VPN for macOS — native apps, no workarounds",
    metaDescription:
      "VPN services with a genuine native macOS app — a shortlist from the catalog of providers that support Mac.",
    intro: [
      "Almost every major VPN supports macOS, but app quality varies — from a simple on/off toggle to fine-grained protocol settings, split tunneling, and auto-connect on untrusted Wi-Fi networks.",
      "Below are catalog services with explicitly stated macOS support.",
    ],
    methodology: "This shortlist includes services that list macOS among their supported platforms.",
    faq: [
      {
        q: "Does the VPN work on Apple Silicon (M1/M2/M3/M4)?",
        a: "All modern apps from major providers natively support Apple Silicon — check the provider's site to confirm if you're running an older macOS version.",
      },
      {
        q: "Do I need to set up the VPN manually through Network settings?",
        a: "No, every service in this shortlist has a dedicated app — manual setup through macOS's built-in client isn't required, though it's technically possible for some protocols.",
      },
      {
        q: "Does a VPN affect MacBook battery life?",
        a: "Encrypting traffic adds a small amount of CPU load and battery drain, but on modern Apple Silicon Macs the difference is usually barely noticeable in everyday use.",
      },
    ],
  },

  "vpn-for-iphone": {
    h1: "VPN for iPhone",
    metaTitle: "VPN for iPhone and iPad — apps from the App Store",
    metaDescription:
      "VPN services with an iOS app — what to consider when choosing a VPN for iPhone and iPad.",
    intro: [
      "On iPhone and iPad, VPN apps work through the system's network-extension API — that's the same for every provider; the difference is mostly in the interface, supported protocols, and features like auto-connect on public Wi-Fi.",
      "Below are services from our catalog with an iOS app.",
    ],
    methodology: "This shortlist includes services that list iOS among their supported platforms.",
    faq: [
      {
        q: "Does a VPN drain an iPhone's battery faster?",
        a: "There's a small extra drain from encryption and a persistent background connection, but on modern iPhones the effect is usually barely noticeable in normal use.",
      },
      {
        q: "Can I enable a VPN for just specific apps on iPhone?",
        a: "Split tunneling on iOS isn't supported by every provider and is limited by what Apple's system allows — check the specific app.",
      },
      {
        q: "Do I need an Apple subscription to install a VPN app?",
        a: "No, VPN apps install from the App Store like any other app — you only pay for the VPN subscription itself, if it isn't a free tier.",
      },
    ],
  },

  "vpn-for-android": {
    h1: "VPN for Android",
    metaTitle: "VPN for Android — apps from Google Play",
    metaDescription:
      "VPN services with an Android app — what to look for when choosing a VPN for an Android phone.",
    intro: [
      "Android gives you more VPN configuration freedom than iOS — many apps support per-app split tunneling, auto-launch on untrusted networks, and quick-access widgets.",
      "Below are catalog services with an Android app.",
    ],
    methodology: "This shortlist includes services that list Android among their supported platforms.",
    faq: [
      {
        q: "Is it safe to install a VPN app outside Google Play?",
        a: "Installing an APK from unverified sources is risky — use the official app from Google Play or a direct link from the provider's site, not third-party catalogs.",
      },
      {
        q: "Does Android support split tunneling?",
        a: "Yes, many providers on Android let you choose specific apps that should (or shouldn't) go through the VPN tunnel — handy if some services don't work correctly with a VPN.",
      },
      {
        q: "Do I need root access for a VPN on Android?",
        a: "No, modern VPN apps use the standard Android VPN API and work without root.",
      },
    ],
  },

  "vpn-for-windows": {
    h1: "VPN for Windows",
    metaTitle: "VPN for Windows — full-featured apps",
    metaDescription: "VPN services with a Windows app — features worth paying attention to when choosing.",
    intro: [
      "On Windows, VPN apps are usually the most full-featured — every protocol is available, along with a kill switch, split tunneling, and startup-on-boot options.",
      "Below are catalog services with a Windows app.",
    ],
    methodology: "This shortlist includes services that list Windows among their supported platforms.",
    faq: [
      {
        q: "What's a kill switch and do I need one?",
        a: "A kill switch blocks internet access if the VPN connection unexpectedly drops — it protects against accidentally leaking your real IP. Useful if privacy is a priority.",
      },
      {
        q: "Does a VPN slow down internet on Windows?",
        a: "Yes, encryption and an extra network hop always cost some speed compared to a direct connection — how much depends on the protocol, server, and provider load.",
      },
      {
        q: "Can I set up a VPN on a router with Windows compatibility?",
        a: "Some providers offer dedicated configs or firmware for routers — this protects every device on the network at once, including ones that can't run a standalone app.",
      },
    ],
  },

  "vpn-for-streaming": {
    h1: "VPN for streaming",
    metaTitle: "VPN for streaming services — Netflix, Disney+, HBO, and more",
    metaDescription:
      "Which VPN to pick for accessing streaming catalogs abroad — a shortlist of services and an honest look at the limits.",
    intro: [
      "Beyond Netflix, the same geo-catalog logic applies to most major streaming platforms — available content depends on licensing deals in a given country. A VPN changes your visible region, but the result isn't guaranteed because services actively block VPN traffic.",
      "Below are providers that themselves claim support for unblocking streaming.",
    ],
    methodology:
      "This shortlist is built from the \"Netflix/streaming\" and \"Streaming\" tags — based on providers' claims about working with popular platforms.",
    faq: [
      {
        q: "Does the same VPN work equally well with every streaming service?",
        a: "No — different platforms block VPN traffic differently and with different intensity. A server that unlocks one catalog might not work for another platform.",
      },
      {
        q: "Why does video sometimes buffer over a VPN?",
        a: "The extra network hop and encryption reduce your effective connection speed — for high-quality streaming, the current load on a specific server matters as much as the claimed maximum speed.",
      },
      {
        q: "Is it worth paying for a plan specifically \"for streaming\"?",
        a: "There's no certified streaming-specific plan — look at overall service quality, server count in the country you need, and reviews about how stable the unblocking is.",
      },
    ],
  },

  "vpn-for-travel": {
    h1: "VPN for travel",
    metaTitle: "VPN for travel — access your usual services abroad",
    metaDescription:
      "Which VPN to bring on a trip: access to home services, security on hotel Wi-Fi, and what to watch for.",
    intro: [
      "On a trip, a VPN handles two different jobs: security on public Wi-Fi at hotels and airports, and access to services you use at home (banking, streaming, email) that may be unavailable or behave differently abroad.",
      "For travel, connection stability across different network types and broad platform support matter most — you'll likely switch between phone, laptop, and tablet.",
    ],
    methodology:
      "This shortlist includes highly rated providers with multi-platform support and the \"Netflix/streaming\" tag (access to familiar services abroad).",
    faq: [
      {
        q: "Do I have to turn on a VPN on hotel Wi-Fi?",
        a: "Not strictly required, but recommended — public networks are harder to secure, and a VPN encrypts your traffic from other users on the same network.",
      },
      {
        q: "Will a VPN work in a country with internet censorship?",
        a: "Not always — some countries block VPN traffic at the ISP level. Check with the specific service whether it supports traffic obfuscation or circumvention protocols before you travel.",
      },
      {
        q: "Should I set up the VPN before the trip?",
        a: "Yes, install and test the app at home while you still have normal internet access and can reach the provider's site — in some countries, VPN provider websites themselves may be blocked.",
      },
    ],
  },
};
