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
  {
    slug: "1-1-1-1-eto-vpn",
    title: "Is 1.1.1.1 a VPN? What Cloudflare's App Actually Does",
    description:
      "Cloudflare's 1.1.1.1 app — is it a DNS resolver or a full VPN? We break down the difference between DNS-only mode and WARP, and when each one is (or isn't) enough.",
    publishedAt: "2026-09-13",
    coverImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      alt: "Cloud computing infrastructure symbolizing Cloudflare's network",
      credit: "Photo: Unsplash",
    },
    content: [
      {
        type: "p",
        text: "Cloudflare's \"1.1.1.1\" app is one of the most common search queries sitting right at the intersection of DNS and VPN topics, and the confusion makes sense — the same app can run in two genuinely different modes. Let's break down what it actually is, and at what point it becomes a VPN at all.",
      },
      { type: "h2", text: "Mode 1: DNS-only — this isn't a VPN" },
      {
        type: "p",
        text: "1.1.1.1 is, first and foremost, Cloudflare's public DNS resolver, launched in 2018 with a focus on speed and privacy: the service states it doesn't retain DNS query logs for advertising purposes beyond 24 hours, and has had that policy independently reviewed. In DNS-only mode, the app simply changes which server resolves domain names into IP addresses — everything else about your traffic stays unencrypted and your visible IP unchanged. That speeds things up and protects against DNS spoofing, but it isn't a VPN in the usual sense.",
      },
      { type: "h2", text: "Mode 2: WARP — now it's actually a VPN" },
      {
        type: "p",
        text: "The app's second mode turns on WARP — a free WireGuard-based tunnel that encrypts all of your device's traffic and routes it through Cloudflare's network. Technically, that is a VPN: an encrypted connection into someone else's network. But WARP's feature set is quite different from a [regular VPN subscription](/en/vpn-prices) — see the full comparison in [\"WARP vs. a Regular VPN\"](/en/blog/warp-vs-obychnyy-vpn).",
      },
      {
        type: "image",
        image: {
          url: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
          alt: "A data center server rack",
          credit: "Photo: Unsplash",
        },
      },
      { type: "h2", text: "What WARP doesn't do, unlike a classic VPN" },
      {
        type: "ul",
        items: [
          "No server country selection — WARP automatically connects to the nearest Cloudflare location, not wherever you'd need for a geo-location change.",
          "Doesn't unblock streaming geo-restrictions — Netflix and similar services don't treat Cloudflare's IP ranges as \"safe\" for catalog unblocking.",
          "No dedicated torrenting servers — WARP isn't positioned as a P2P traffic tool.",
        ],
      },
      { type: "h2", text: "When WARP is a good choice" },
      {
        type: "p",
        text: "If the goal is hiding your traffic from your own ISP and speeding up an unstable Wi-Fi connection without paying a cent, [Cloudflare WARP](/en/vpn/cloudflare-warp) is a solid free option. The paid WARP+ tier adds Cloudflare's optimized routing (Argo) for more stable speed, but doesn't change the underlying geography limitations.",
      },
      {
        type: "faq",
        items: [
          {
            q: "So is 1.1.1.1 a VPN or not?",
            a: "It depends which mode is active in the app. DNS-only mode is not a VPN. Mode with WARP turned on is, technically, a VPN — just with a smaller feature set than paid providers.",
          },
          {
            q: "Is it safe to use 1.1.1.1?",
            a: "Yes, it's a legitimate public service from Cloudflare, one of the largest internet infrastructure companies. The real question isn't safety — it's whether WARP actually solves your specific problem (see the limitations section above).",
          },
          {
            q: "How do I turn on WARP instead of just DNS?",
            a: "A step-by-step guide is in [\"Cloudflare WARP: How to Set It Up\"](/en/blog/cloudflare-warp-nastroyka).",
          },
        ],
      },
    ],
  },
  {
    slug: "warp-vs-obychnyy-vpn",
    title: "WARP vs. a Regular VPN: What's the Difference?",
    description:
      "Comparing free Cloudflare WARP against regular VPN providers: server choice, unblocking, speed, price — and the tasks where WARP simply doesn't compete.",
    publishedAt: "2026-09-13",
    coverImage: {
      url: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      alt: "Network cables plugged into a switch",
      credit: "Photo: Unsplash",
    },
    content: [
      {
        type: "p",
        text: "[Cloudflare WARP](/en/vpn/cloudflare-warp) is often called a \"free VPN,\" and technically that's accurate — it's an encrypted WireGuard tunnel. But in practice it's a different category of product, closer to a traffic accelerator-and-encryptor than a classic VPN for changing your country. Here's the difference, point by point.",
      },
      {
        type: "table",
        headers: ["Criteria", "Cloudflare WARP", "Regular VPN provider"],
        rows: [
          ["Server country choice", "No — nearest Cloudflare location only", "Yes, usually 30-100+ countries"],
          ["Netflix/streaming unblock", "Not designed for this", "Claimed by some providers"],
          ["Torrenting/P2P", "Not optimized for it", "Allowed by many providers"],
          ["Price", "Free (WARP+ is paid, for speed)", "From $1-3/month and up"],
          ["Protocol", "WireGuard", "WireGuard, OpenVPN, and others — depends on the provider"],
          ["Main purpose", "Privacy from your ISP + faster DNS", "Privacy and/or changing your geo-location"],
        ],
      },
      { type: "h2", text: "When to pick WARP" },
      {
        type: "p",
        text: "If the only goal is hiding what you browse from your home or mobile ISP, and speeding up a shaky connection, WARP covers that entirely for free, with no signup and no data cap. For a full breakdown of whether it even counts as a VPN, see [\"Is 1.1.1.1 a VPN?\"](/en/blog/1-1-1-1-eto-vpn).",
      },
      { type: "h2", text: "When you need a regular VPN instead of WARP" },
      {
        type: "p",
        text: "If the goal is watching a foreign Netflix catalog, reducing risk while torrenting, or reaching a site blocked specifically by geography, WARP fundamentally won't help — Cloudflare has no country-specific servers to pick from. That's where you need one of the providers from our [price comparison table](/en/vpn-prices) — for example, services tagged [\"Netflix/Streaming\"](/en/vpn/category/netflix) or [\"Torrents\"](/en/vpn/category/torrents).",
      },
      { type: "h2", text: "Can you run both at once?" },
      {
        type: "p",
        text: "Technically, two VPN tunnels running at the same time on one device usually conflict with each other at the network-settings level — for most people it's more practical to pick one tool for the specific job at hand rather than trying to combine both permanently.",
      },
    ],
  },
  {
    slug: "cloudflare-warp-nastroyka",
    title: "Cloudflare WARP: How to Set Up the Free VPN From 1.1.1.1",
    description:
      "A step-by-step guide to installing and setting up Cloudflare WARP on phone and desktop — from downloading the app to confirming the tunnel is actually working.",
    publishedAt: "2026-09-13",
    coverImage: {
      url: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81",
      alt: "A router with network cables plugged in",
      credit: "Photo: Unsplash",
    },
    content: [
      {
        type: "p",
        text: "[Cloudflare WARP](/en/vpn/cloudflare-warp) is one of the few genuinely free, permanent VPN tunnels with no ads and no data cap. Setup takes a couple of minutes on any platform — here's the step-by-step.",
      },
      { type: "h2", text: "1. Download the 1.1.1.1 app" },
      {
        type: "p",
        text: "The app is called \"1.1.1.1: Faster Internet\" and is available on the App Store, Google Play, and as a standalone build for Windows, macOS, and Linux from Cloudflare's official site. It's the same app across every platform.",
      },
      { type: "h2", text: "2. Turn on WARP mode, not just DNS" },
      {
        type: "p",
        text: "After installing, the app may default to DNS-only mode, which doesn't encrypt your traffic. To turn on the full VPN tunnel, switch the mode from \"DNS only\" to \"WARP\" in the app's settings (some platforms label this \"1.1.1.1 w/ WARP\"). We cover the difference between these two modes in detail in [\"Is 1.1.1.1 a VPN?\"](/en/blog/1-1-1-1-eto-vpn).",
      },
      { type: "h2", text: "3. Connect with one tap" },
      {
        type: "p",
        text: "From there, it's a single \"Connect\" toggle on the app's main screen — no server or country selection, since WARP automatically connects you to the nearest Cloudflare location.",
      },
      { type: "h2", text: "4. Confirm the tunnel is actually working" },
      {
        type: "p",
        text: "Once connected, check the [what-is-my-IP page](/en/what-is-my-ip) — with WARP on, the network provider shown should switch to Cloudflare rather than your usual ISP. It's also worth running a [WebRTC leak test](/en/webrtc-leak-test) to confirm your real IP isn't leaking around the tunnel.",
      },
      { type: "h2", text: "5. Do you need WARP+" },
      {
        type: "p",
        text: "The paid WARP+ subscription adds Cloudflare's optimized traffic routing (Argo) for more stable speed over long distances — but it doesn't add more countries or unlock streaming. Free WARP is enough for most use cases; paying makes the most sense if you're dealing with unstable mobile data over long routes.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Does WARP work on all my devices at once?",
            a: "You need to install and turn it on separately on each device — there's no single \"all devices at once\" license the way some paid VPNs offer, though there's also no stated device-count limit.",
          },
          {
            q: "What if sites load slower after turning WARP on?",
            a: "Try switching to WARP+ (paid), or temporarily disable WARP for specific problem sites — unlike classic VPNs, there's no manual option to pick a different server to compare speed.",
          },
        ],
      },
    ],
  },
];

export function getPostBySlugEn(slug: string): BlogPost | undefined {
  return BLOG_POSTS_EN.find((p) => p.slug === slug);
}

/** Picks `count` posts other than `excludeSlug`, stable for a given slug — see `getRandomPosts`. */
export function getRandomPostsEn(excludeSlug: string, count: number): BlogPost[] {
  const pool = BLOG_POSTS_EN.filter((p) => p.slug !== excludeSlug);
  if (pool.length === 0) return [];

  const index = Math.max(
    0,
    BLOG_POSTS_EN.findIndex((p) => p.slug === excludeSlug)
  );
  const take = Math.min(count, pool.length);

  return Array.from({ length: take }, (_, i) => {
    const stride = 1 + Math.round((i * pool.length) / take);
    return pool[(index + stride) % pool.length];
  });
}
