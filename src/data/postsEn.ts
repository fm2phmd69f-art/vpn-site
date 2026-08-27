import { BlogPost } from "./posts";

/**
 * English translations of BLOG_POSTS (src/data/posts.ts), keyed by the same slug.
 * Cover/inline images are reused as-is (language-neutral); only alt text and credit
 * labels are translated.
 */
export const BLOG_POSTS_EN: BlogPost[] = [
  {
    slug: "kak-vybrat-vpn",
    title: "How to choose a VPN: a beginner's guide",
    description:
      "What to look at when picking a VPN service — logging policy, protocols, jurisdiction, speed, and price. Explained in plain language.",
    publishedAt: "2026-08-20",
    coverImage: {
      url: "https://images.unsplash.com/photo-1614064548237-096f735f344f",
      alt: "A padlock in front of a laptop, symbolizing digital privacy",
      credit: "Photo: FlyD / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "There are dozens of VPN services on the market, and all of them promise \"maximum privacy\" and \"blazing speed.\" In practice, the differences between providers are real, and the choice deserves some thought rather than picking the first ad in a search. Let's go through what actually matters, point by point.",
      },
      { type: "h2", text: "1. Logging policy (no-logs)" },
      {
        type: "p",
        text: "\"No-logs\" means the provider doesn't store data about your activity and connections. The catch is that it's just a claim — you can't verify it yourself. Look for providers that have had this policy independently audited by a third-party firm: it's not a 100% guarantee, but it carries far more weight than a bare promise on a website.",
      },
      { type: "h2", text: "2. Connection protocol" },
      {
        type: "p",
        text: "The modern standard is WireGuard (and its variants, like NordLynx at NordVPN or Lightway at ExpressVPN): it's faster and simpler than the older OpenVPN, while being no less secure. If a service only supports outdated protocols, that's a red flag.",
      },
      { type: "h2", text: "3. Jurisdiction" },
      {
        type: "p",
        text: "The provider's country of registration determines which data-retention laws it's subject to. Providers outside surveillance alliances (\"14 Eyes\") are, in theory, under less pressure to hand over user data — Switzerland (Proton VPN) or Panama (NordVPN), for example.",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1750710583720-8b3bdd0f658a",
          alt: "A home Wi-Fi router connected with cables",
          credit: "Photo: User_Pascal / Unsplash",
        },
      },
      { type: "h2", text: "4. Speed — adjusted for marketing" },
      {
        type: "p",
        text: "The \"up to 1000 Mbps\" figure on a provider's site is a theoretical ceiling under ideal conditions, not what you'll get at home. Real speed depends on your own internet, distance to the server, and its current load. Treat these numbers only as a way to compare providers against each other, not as a guarantee.",
      },
      { type: "h2", text: "5. Free or paid" },
      {
        type: "p",
        text: "A genuinely free VPN (Proton VPN, Windscribe, Cloudflare WARP) usually caps data or server count, but doesn't sell your data. Be cautious of free services that run on a P2P model — other users' traffic may pass through your device.",
      },
      {
        type: "p",
        text: "From here, it's a matter of comparing specific plans in our VPN catalog, filtering by what matters to you, and checking the cards in detail.",
      },
    ],
  },
  {
    slug: "top-besplatnyh-vpn",
    title: "Top free VPNs: which plans are honest, and which aren't",
    description:
      "A look at free VPN plans: which ones genuinely have no catch, and where your traffic ends up routed through other users' devices.",
    publishedAt: "2026-08-20",
    coverImage: {
      url: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08",
      alt: "A combination lock on a laptop keyboard",
      credit: "Photo: Sasun Bughdaryan / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "\"Free VPN\" sounds suspicious — if the service doesn't charge money, how does it make any? The answer differs between providers, and it's worth understanding before you install one.",
      },
      { type: "h2", text: "The honest model: capped data or servers" },
      {
        type: "p",
        text: "Some providers make money on paid plans, and the free tier is a stripped-down demo to attract users. Proton VPN's free tier has no data cap at all, just fewer servers; Windscribe gives 10 GB/month; Cloudflare WARP has no cap at all, but it isn't really a classic region-switching VPN — it's a tunnel that speeds up and encrypts traffic.",
      },
      { type: "h2", text: "A model worth understanding: the P2P network" },
      {
        type: "p",
        text: "With some free services (some modes of Hola VPN or Urban VPN, for example), other users' traffic is routed through your device, and yours through theirs. It's technically still \"free,\" just with a different privacy model — worth keeping in mind if you're choosing a VPN specifically for anonymity rather than just changing region.",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1772683828849-9cc05e330b44",
          alt: "Two smartphones showing home screens with apps",
          credit: "Photo: Shawn Rain / Unsplash",
        },
      },
      { type: "h2", text: "What to check before installing a free VPN" },
      {
        type: "ul",
        items: [
          "Is there an explicit data cap or connection limit — if there are no limits at all and the service never charges anyone anything, ask yourself \"how do they make money.\"",
          "Is the free tier a stripped-down version of a paid product rather than a standalone \"free\" brand.",
          "Check reviews specifically about privacy, not just interface convenience.",
        ],
      },
      {
        type: "p",
        text: "Our catalog collects every VPN with a free tier, with each one's terms noted, under the \"Free tier\" filter.",
      },
    ],
  },
  {
    slug: "vpn-dlya-netflix-i-striminga",
    title: "VPN for Netflix and streaming: what you need to know",
    description:
      "How a VPN relates to accessing foreign streaming catalogs, and why it doesn't always work reliably.",
    publishedAt: "2026-08-20",
    coverImage: {
      url: "https://images.unsplash.com/photo-1633793675529-58eecb6ea16f",
      alt: "A TV screen showing the Netflix logo",
      credit: "Photo: Sunder Muthukumaran / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "Netflix, like most major streaming services, shows a different catalog of movies and shows depending on which country you connect from — that's a condition of its licensing deals with studios. A VPN changes your visible IP address, which can make the service think you're a user from a different country and show you that country's catalog.",
      },
      { type: "h2", text: "Why it doesn't always work" },
      {
        type: "p",
        text: "Streaming services actively fight geo-blocking bypasses and regularly block IP addresses belonging to known VPN providers. Because of that, whether a specific server works can change — what worked yesterday might not work today. Providers, in turn, refresh their servers and IP pools to stay a step ahead, but nobody offers a 100% guarantee.",
      },
      { type: "h2", text: "What to look for when choosing" },
      {
        type: "ul",
        items: [
          "A large number of servers in your target country — better odds that at least one isn't blocked.",
          "Explicit mentions of \"works with Netflix/streaming\" in the plan's description — usually means the provider separately tests and maintains this.",
          "The ability to quickly switch between servers within the same country if a specific IP doesn't work.",
        ],
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5",
          alt: "A remote control in front of a TV screen",
          credit: "Photo: Glenn Carstens-Peters / Unsplash",
        },
      },
      {
        type: "p",
        text: "In the catalog they're grouped under \"Netflix/streaming\" — services that providers themselves position as suitable for unblocking streaming catalogs.",
      },
      {
        type: "p",
        text: "Important: bypassing geo-blocking may violate a streaming service's terms of use — that's your responsibility as a user, not something a VPN provider guarantees or endorses.",
      },
    ],
  },
  {
    slug: "protokoly-vpn-wireguard-openvpn-ikev2",
    title: "VPN protocols: how WireGuard, OpenVPN, and IKEv2 differ",
    description:
      "A breakdown of the three main VPN connection protocols — how they differ in speed, reliability, and setup, and why it matters when choosing a service.",
    publishedAt: "2026-08-22",
    coverImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      alt: "Network cables in a data center",
      credit: "Photo: Taylor Vick / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "A VPN protocol is the set of rules your device uses to set up an encrypted tunnel with a server. The protocol you pick affects connection speed, stability across network changes, and how easy it is to block. Our catalog's service cards mainly mention three — let's break down how they differ.",
      },
      { type: "h2", text: "WireGuard" },
      {
        type: "p",
        text: "The newest of the three and now the de facto industry standard. Its codebase is far more compact than OpenVPN's, which makes it easier to audit for vulnerabilities and lets encryption run faster. Most major providers run WireGuard under their own name — NordLynx at NordVPN, for example — the same protocol with an extra layer for rotating the user's IP address between sessions.",
      },
      { type: "h2", text: "OpenVPN" },
      {
        type: "p",
        text: "An old, well-studied, open-source protocol that's been on the market for about 20 years. It's slower than WireGuard, but flexible to configure and able to disguise itself as regular HTTPS traffic (over port 443), which sometimes helps get around VPN blocking at the ISP or country level. It was the de facto standard before WireGuard and still ships as a fallback option in nearly every app.",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1514070706115-47c142769603",
          alt: "A computer screen running a program",
          credit: "Photo: Ilija Boshkov / Unsplash",
        },
      },
      { type: "h2", text: "IKEv2/IPsec" },
      {
        type: "p",
        text: "A protocol that's especially good at holding a connection through network changes — switching from Wi-Fi to mobile data, for example, without the tunnel dropping. That's why it's often the default in mobile apps. Developed jointly by Microsoft and Cisco, it's natively supported in Windows, iOS, and macOS without extra client software.",
      },
      { type: "h2", text: "What this means in practice" },
      {
        type: "ul",
        items: [
          "For everyday use and maximum speed — WireGuard (or a provider's own variant of it under a different name).",
          "If your ISP or country blocks regular VPN traffic — look for a service supporting OpenVPN over port 443 or with obfuscation.",
          "For mobile devices that switch networks often — IKEv2 usually gives you the fewest dropped connections.",
        ],
      },
      {
        type: "p",
        text: "Every service card in our catalog lists supported platforms — to check which protocol is used by default, you can usually find that on the provider's own site or under the \"WireGuard\" filter in our catalog.",
      },
    ],
  },
  {
    slug: "utechka-dns-u-vpn-kak-proverit",
    title: "DNS leaks in a VPN: how to check and protect yourself",
    description:
      "What a DNS leak is when using a VPN, how to check for one yourself in a couple of minutes, and which provider settings prevent it.",
    publishedAt: "2026-08-24",
    coverImage: {
      url: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9",
      alt: "Neatly arranged network cables in a server rack",
      credit: "Photo: Albert Stoynov / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "A VPN encrypts your traffic and changes your visible IP address, but if DNS requests bypass the tunnel, your ISP can still see the list of sites you visit. This is called a DNS leak — one of the most common reasons a VPN doesn't deliver the privacy you expect, even when the tunnel itself is working fine.",
      },
      { type: "h2", text: "What happens during a DNS request" },
      {
        type: "p",
        text: "Before a browser can open a site, your device has to look up which IP address its domain name maps to — that's a DNS request. Without a VPN, that request normally goes to your ISP's DNS server, which ends up with a history of the domains you visit even if the traffic itself later goes elsewhere. A properly configured VPN should route DNS requests through its own encrypted tunnel, but configuration mistakes — in the app or the OS — can let some requests slip past it.",
      },
      { type: "h2", text: "How to check your VPN for a DNS leak" },
      {
        type: "p",
        text: "The check takes a couple of minutes and needs no special software. First, open a dedicated site (dnsleaktest.com or browserleaks.com/dns, for example) with the VPN off and note which DNS server it shows — usually tied to your ISP. Then turn on the VPN, wait for it to connect, refresh the same page, and run the extended test. If the results list a DNS server tied to your ISP rather than your VPN provider, that's a leak.",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1774901128283-64c62117216a",
          alt: "A computer screen showing code and terminal output",
          credit: "Photo: Bernd Dittrich / Unsplash",
        },
      },
      { type: "h2", text: "Common causes of leaks" },
      {
        type: "ul",
        items: [
          "Mishandled IPv6 traffic — some VPN apps only tunnel IPv4, letting IPv6 DNS requests go out around the VPN.",
          "Using the system's default DNS server instead of the VPN provider's in Windows, macOS, or home-router settings.",
          "\"Smart\" DNS resolver selection in the OS, which prefers a faster response outside the active VPN tunnel.",
          "Browser extensions with their own DNS-over-HTTPS, which conflict with the VPN client's DNS settings.",
        ],
      },
      { type: "h2", text: "How to protect yourself" },
      {
        type: "p",
        text: "Most reputable VPN apps include built-in DNS-leak protection and an option to disable IPv6 in settings — check whether they're on by default and enable them manually if not. A kill switch also helps: a feature that blocks all of a device's internet traffic if the VPN connection suddenly drops, instead of silently falling back to an unprotected connection.",
      },
      {
        type: "p",
        text: "Our catalog flags services with a no-logs policy and a privacy focus — the same cards usually note whether a given provider supports built-in DNS-leak protection and a kill switch.",
      },
    ],
  },
  {
    slug: "tor-vs-vpn-chto-vybrat",
    title: "Tor vs. VPN: what's the difference, and when to use which",
    description:
      "How Tor technically differs from a VPN, what level of anonymity each one gives you, and when it makes sense to use them together.",
    publishedAt: "2026-08-24",
    coverImage: {
      url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
      alt: "A red padlock on a black computer keyboard",
      credit: "Photo: FlyD / Unsplash",
    },
    content: [
      {
        type: "p",
        text: "Tor and a VPN both promise to hide your online activity from prying eyes, but they're built on different principles and solve different problems. Confusing the two is a common source of inflated expectations from both tools.",
      },
      { type: "h2", text: "How Tor works" },
      {
        type: "p",
        text: "Tor (The Onion Router) is a free network that routes traffic through a chain of at least three random nodes run by volunteers worldwide. Each node in the chain only knows the previous and next hop, not the full route, and the data is wrapped in several layers of encryption along the way — hence \"onion routing.\" Because of this multi-stage processing across different servers, Tor is noticeably slower than a regular internet connection.",
      },
      { type: "h2", text: "How a VPN works" },
      {
        type: "p",
        text: "A VPN creates a single encrypted tunnel between your device and the provider's server — all traffic goes through one point rather than a chain of random nodes, which makes a VPN noticeably faster than Tor. The flip side: the VPN provider itself can technically see where your traffic comes from and goes to, unless it's had a no-logs policy independently audited. In effect, you're shifting trust from your ISP to the VPN service, not removing the need for trust entirely.",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1674049404913-2005c02245fa",
          alt: "A person in a mask and hoodie working at a laptop",
          credit: "Photo: Bermix Studio / Unsplash",
        },
      },
      { type: "h2", text: "Key differences" },
      {
        type: "ul",
        items: [
          "Speed: a VPN is usually several times faster than Tor because of fewer intermediate servers along the traffic's path.",
          "Trust: a VPN has one provider you need to trust; Tor has a distributed network of volunteers, none of whom sees the full route.",
          "Site access: some online services block requests from known Tor exit nodes the same way they block popular VPN addresses.",
          "Scope: Tor is typically used through a dedicated Tor Browser for web browsing, while a VPN works system-wide for any app.",
        ],
      },
      { type: "h2", text: "Can you use Tor and a VPN together" },
      {
        type: "p",
        text: "Yes, there are two setups. \"Tor over VPN\" — connect to the VPN first, then launch Tor Browser — hides the fact that you're using Tor from your ISP. \"VPN over Tor,\" where a VPN tunnel is built on top of the Tor network, is rarer and harder to set up. For most everyday tasks, combining them is overkill and just costs speed without a meaningful privacy gain — Tor Browser is already designed for anonymous browsing on its own.",
      },
      {
        type: "p",
        text: "If the goal is to change your visible region or protect your traffic on café Wi-Fi, a regular VPN from our catalog is enough. Consider Tor separately when what matters is hiding the fact that you visited a specific resource at all, not just its contents.",
      },
    ],
  },
];

export function getPostBySlugEn(slug: string): BlogPost | undefined {
  return BLOG_POSTS_EN.find((p) => p.slug === slug);
}

/** Picks `count` posts other than `excludeSlug`, in random order. */
export function getRandomPostsEn(excludeSlug: string, count: number): BlogPost[] {
  const pool = BLOG_POSTS_EN.filter((p) => p.slug !== excludeSlug);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
