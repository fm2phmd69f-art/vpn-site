/**
 * English translations of each service's catalog description (src/data/services.ts).
 * Keyed by slug. New providers won't have an entry here until translated — the English
 * service page falls back to the Russian description in that case rather than breaking.
 */
export const SERVICE_DESCRIPTIONS_EN: Record<string, string> = {
  nordvpn:
    "One of the largest VPN providers. 6,000+ servers in 60+ countries, a no-logs policy, and its own NordLynx protocol built on WireGuard.",
  expressvpn:
    "A premium service focused on speed and simplicity. Its own Lightway protocol, with servers in 105 countries.",
  surfshark:
    "A budget-friendly option with unlimited devices on one subscription. Includes CleanWeb, an ad and tracker blocker.",
  protonvpn:
    "From the makers of ProtonMail. Swiss jurisdiction, open-source clients, and a fully free tier with no data cap.",
  mullvad:
    "Maximum focus on privacy: no email required to sign up, payment by cash or crypto, WireGuard support.",
  pia: "A huge server count (35,000+), flexible settings, and open-source apps.",
  windscribe:
    "A flexible free tier, a built-in ad blocker (R.O.B.E.R.T), and an OpenVPN/WireGuard config generator.",
  cyberghost:
    "A Romanian provider with many servers dedicated to specific tasks (streaming, torrenting). Simple interface for beginners.",
  ipvanish:
    "A US provider with its own server network (no third-party rentals) and unlimited devices on one plan.",
  purevpn:
    "A network of 6,500+ servers in 78+ countries, an audited no-logs policy, and a dedicated IP add-on.",
  vyprvpn:
    "Its own Chameleon protocol to bypass VPN blocking, with a fully self-owned server infrastructure.",
  tunnelbear: "A friendly interface, an annual independent security audit, and a modest free tier.",
  hotspotshield:
    "Its own Hydra protocol, marketed as one of the fastest VPNs available, with a free ad-supported version with limits.",
  hideme:
    "A Malaysian provider outside the 14 Eyes surveillance alliance, an independently audited no-logs policy, and a genuinely ad-free free tier.",
  ivpn: "Privacy-focused: pay by cryptocurrency with no email required, open-source apps.",
  airvpn:
    "A project by Italian activists and developers, open-source, highly configurable through its own Eddie client, torrents allowed.",
  perfectprivacy:
    "A German provider with NeuroRouting and multi-hop cascading through several servers (similar to double-VPN) for extra anonymity.",
  vpnac:
    "A Romanian provider founded by a security team, with its own server network rather than third-party data centers.",
  strongvpn:
    "On the market since 1994, with its own server and IP network, static IPs available for an extra fee.",
  ivacy:
    "One of the cheapest long-term plans on the market, with an auto-server-selection feature for specific tasks.",
  zenmate:
    "A German provider that started as a browser extension and now has full apps for all devices.",
  "avast-secureline":
    "A VPN module from antivirus maker Avast, often bundled with its antivirus software.",
  "avg-secure":
    "A sister product to Avast (both owned by Gen Digital) with similar features and the same server infrastructure.",
  "norton-secure":
    "A VPN inside the Norton 360 ecosystem, usually bought bundled with antivirus rather than standalone.",
  "mcafee-safe-connect":
    "A basic VPN from McAfee, usually thrown in as a bonus with antivirus subscriptions, without fine-grained settings.",
  "kaspersky-vpn":
    "A VPN from Kaspersky with a limited free daily data allowance and a full version by subscription.",
  "bitdefender-vpn":
    "Runs on Hotspot Shield's infrastructure (Hydra/Catapult protocol), available standalone or bundled with Bitdefender antivirus.",
  "fsecure-freedome":
    "A Finnish developer focused on privacy and tracker protection, with a simple interface and no advanced settings.",
  trustzone:
    "Seychelles jurisdiction, budget long-term plans, dedicated IP available for an extra fee.",
  vpnarea:
    "Built-in email data-breach monitoring in the account dashboard, with a focus on unblocking streaming services.",
  "vpn-unlimited":
    "From developer KeepSolid, with a unique lifetime-subscription option (one-time payment) instead of monthly billing.",
  fastestvpn: "One of the cheapest long-term plans on the market when paid several years upfront.",
  privatevpn:
    "A small Swedish provider known for personal support and hands-on remote server setup help.",
  astrill:
    "Expensive, but historically one of the most reliable options for working in China and other countries with heavy traffic filtering.",
  levpn:
    "A French provider on the market since 2010, focused on simple geolocation switching for streaming.",
  goosevpn: "A Dutch provider with a generous 30-day free trial on some plans.",
  itopvpn: "A budget option with a free version, aimed mainly at Windows users.",
  urbanvpn:
    "A fully free service that runs on a P2P model (some users act as exit nodes) — worth keeping in mind if privacy is a priority.",
  turbovpn:
    "A popular mobile app with an ad-supported free version, aimed mainly at smartphones.",
  xvpn: "Claims its own protocol for bypassing deep packet inspection (DPI), popular in regions with heavy traffic filtering.",
  atlasvpn: "Part of Nord Security, with a free tier limited by monthly data.",
  browsec:
    "Primarily a browser extension; full mobile apps are paid, the free version only changes your IP in the browser.",
  "cloudflare-warp":
    "Cloudflare's public DNS resolver with a built-in WARP tunnel — speeds up and encrypts traffic, but doesn't let you choose an exit country, so it isn't a substitute for a regular VPN if you need to change location.",
  amneziavpn:
    "Not a typical VPN provider — a free, open-source app for quickly setting up your own VPN server (AmneziaWG protocol) on your own VPS.",
  rusvpn: "A provider aimed at Russian-speaking users, with localized apps and support.",
  planetvpn:
    "Has a free tier with a limited set of countries; the paid subscription unlocks the full server list.",
  psiphon:
    "A non-profit circumvention tool (not a classic privacy VPN), funded by ads or a paid version.",
  lantern:
    "A censorship-circumvention tool originally aimed at users in countries with heavy internet filtering.",
  outlinevpn:
    "A project by Jigsaw (Google) that lets you spin up your own Shadowsocks-based VPN server on your own VPS in a couple of clicks — you become your own provider.",
  torguard:
    "Focused on torrenting and privacy, with many dedicated/static IP and port options for an extra fee.",
  hideipvpn:
    "A small provider with separate Smart DNS plans for streaming services, without routing through a full VPN tunnel.",
  veepn:
    "A provider with a data-limited free version and an unlimited paid subscription, plus browser extensions.",
  cactusvpn:
    "A small provider with separate Smart DNS plans, focused on unblocking streaming services.",
  hola: "The free version runs on a P2P model where other users' traffic may be routed through your device — worth keeping in mind if privacy matters; the paid Hola VPN Plus doesn't use this scheme.",
  "mozilla-vpn":
    "A VPN from Mozilla (makers of Firefox), running on Mullvad's server network, WireGuard protocol only.",
  privadovpn:
    "Swiss jurisdiction, a generous free tier with a monthly data cap, and unlimited paid plans.",
  "malwarebytes-vpn":
    "A VPN from antivirus maker Malwarebytes on the WireGuard protocol, available standalone or bundled with antivirus.",
  speedify:
    "An unusual VPN that bonds multiple internet connections at once (e.g. Wi-Fi + mobile data) for extra speed and stability.",
  nordlayer:
    "A business VPN from Nord Security for teams — employee access management, static IPs, and network segmentation instead of a single-person plan.",
  ovpn: "A Swedish provider with an independently verified no-logs policy and its own dedicated servers instead of third-party data centers.",
  surfeasy:
    "A Canadian provider owned by Opera (the same company behind Opera's built-in VPN), with a modest free data allowance.",
  zoogvpn:
    "A provider with a free 10 GB/month tier and unlimited paid plans, 200+ servers in 35+ countries, with desktop and mobile apps plus browser extensions.",
  betternet:
    "The fully free version needs no signup or email — just download and connect; the paid Premium subscription adds more server locations and removes ads.",
  iprovpn:
    "A budget provider with 250+ servers in 36+ countries, up to 10 simultaneous connections per plan, and a no-logs policy; instead of a free tier it offers a 30-day money-back guarantee.",
  hma: "One of the oldest VPN brands on the market (since 2005, originally Hide My Ass, now owned by Aura), with a network of 3,400+ servers in 190+ countries — the emphasis is on location coverage rather than an independently audited no-logs policy.",
  "namecheap-fastvpn":
    "A budget VPN from domain registrar Namecheap, with unlimited simultaneous connections on its \"private\" servers and one of the lowest long-term price points on the market.",
  vpnsecure:
    "A Bahamas-based provider (outside the 14 Eyes alliance) that supports WireGuard, allows P2P on all servers, and includes a built-in ad blocker and a DPI-blocking bypass feature.",
  anonine:
    "A long-running budget Swedish provider with no stated device limit per account, accepting payment in cryptocurrency.",
  azirevpn:
    "A Swedish provider (since 2012, part of Malwarebytes since 2024) with its own diskless, no-logs server infrastructure, independently audited.",
  slickvpn:
    "A US (Florida) provider with a proprietary HYDRA multi-hop technology and a published warrant canary; native apps only for Windows and Mac, with manual OpenVPN setup on other platforms.",
  blokada:
    "Started as an open-source Android DNS ad blocker; now sells a paid Blokada Plus VPN tier on WireGuard on top of the free ad blocker (Blokada 5).",
  switchvpn:
    "A small US provider with 250+ servers in 43 countries, P2P/torrent support, and port forwarding; instead of a free tier it offers a paid 3-day trial for $1.",
  cryptostorm:
    "Sign in with an anonymous token rather than the usual email/password registration. Supports OpenVPN and WireGuard and traffic obfuscation, allows torrents; user reviews describe the interface as less polished than larger providers'.",
  ghostpath:
    "A US provider since 2012, specializing in multi-hop and static IPs; per user reviews, a native app exists only for Windows, with manual OpenVPN setup on other platforms.",
  bolehvpn:
    "Operating since 2007, publishes a monthly warrant canary, accepts cryptocurrency (Bitcoin, Monero, and others), and uses traffic obfuscation to bypass VPN blocking.",
  hidester:
    "A Hong Kong-based VPN and proxy provider, on the market since 2018. Claims a no-logs policy and AES-256 encryption, with a network of 40+ servers in 30+ countries.",
  "opera-vpn":
    "A free VPN built directly into the Opera browser (desktop, Opera GX, Android, iOS), no separate app required. Its no-logs policy was independently audited by Deloitte in 2024, but the VPN only encrypts traffic inside the browser, not the whole device.",
  "whoer-vpn":
    "A service from the makers of the IP checker whoer.com. Servers in 21 countries, a no-logs policy, kill switch, and AES-256 encryption; up to 5 devices on one plan.",
  vpngate:
    "A non-profit academic project from the University of Tsukuba (Japan) — an open network of volunteer relay servers for bypassing censorship. It isn't a commercial no-logs VPN: individual server operators can theoretically see traffic, so it isn't suited for tasks where privacy is critical.",
  "brave-vpn":
    "A VPN from the makers of the privacy-focused Brave browser, running on partner Guardian's infrastructure; its no-logs policy was confirmed by two independent audits in 2024 (software and infrastructure).",
  "duckduckgo-vpn":
    "A VPN built directly into the privacy-focused DuckDuckGo browser, sold only as part of the Privacy Pro subscription (bundled with personal-data removal and identity-theft protection) — there's no standalone VPN-only purchase.",
  "hoxx-vpn":
    "A browser-extension VPN since 2014 (~7 million users); its own privacy policy openly acknowledges collecting IP addresses and device identifiers and logging activity \"to combat illegal actions\" — worth noting if privacy, not just IP-switching, is the priority.",
  "adguard-vpn":
    "A VPN from the makers of the AdGuard ad blocker, with its own protocol and support for Android TV, Apple TV, consoles, and routers; its no-logs policy hasn't yet been independently audited.",
  nymvpn:
    "A Swiss VPN built on the decentralized Nym mixnet — alongside a normal fast mode it offers a 5-hop Mixnet mode that shuffles packets for stronger metadata protection, slower but with stronger anonymity guarantees. Accepts cryptocurrency payment, including Monero.",
  "obscura-vpn":
    "A new (2024–2025) provider with a two-hop relay architecture — its own Obscura server plus an exit node from partner Mullvad, so no single party sees both your identity and your traffic. Passed an independent Cure53 security audit with no critical findings in December 2025.",
  getflix:
    "An Australian service combining Smart DNS (no speed loss, unblocks 500+ channels) with a full VPN tunnel; aimed primarily at streaming boxes and smart TVs rather than privacy.",
  btguard:
    "A market veteran (since 2008), historically specialized in proxy and VPN service specifically for torrent clients (uTorrent, qBittorrent, Deluge); 26 server locations, up to 20 simultaneous devices, accepts cryptocurrency. Jurisdiction isn't explicitly stated on the official site.",
  finchvpn:
    "A budget provider recently rebuilt around its own Xray-core-based protocol instead of the usual OpenVPN/WireGuard; 50+ locations, unlimited devices. The listed price is the advertised rate — the exact plan lineup was temporarily unavailable on the site at the time of checking.",
  pandapow:
    "A long-running provider aimed partly at users in Asia (accepts WeChat Pay, AliPay, UnionPay); supports only legacy PPTP/L2TP/IPsec protocols, without OpenVPN or WireGuard — worth factoring into your choice.",
  seed4me:
    "A provider with no device limit per account, unlimited traffic, and servers in 45+ locations; its no-logs policy is self-reported without independent audit, and the company's jurisdiction isn't explicitly stated on the official site.",
  frootvpn:
    "A Seychelles-jurisdiction provider that allows P2P/torrents on its servers and has a kill switch; its no-logs policy is self-reported without independent audit. Apps only for Windows, macOS, Linux, and Android — no native iOS client.",
  "vpn-proxy-master":
    "A service from Singapore's SecureGuard Group with a network of 20,000+ servers in 100+ locations, support for up to 10 devices, and apps for smart TVs (Fire TV, Apple TV, Samsung, LG); its no-logs policy is self-reported without independent audit.",
  "pandavpn-pro":
    "A service from Hong Kong's MOPUBI LIMITED with a network of 6,000+ servers in 100+ countries, focused on unblocking streaming (Netflix, Hulu, HBO Max, Disney+); its no-logs policy is self-reported without independent audit, and its Hong Kong jurisdiction isn't explicitly stated on the site itself.",
  "unseen-online-vpn":
    "No email registration required, accepts cryptocurrency payment, up to 5 simultaneous devices. The company's jurisdiction is never disclosed on the site, and its App Store privacy details indicate the use of tracking identifiers — at odds with the \"no-logs\" policy claimed on the site, worth factoring into your choice.",
  "deeper-dpn":
    "A software-only (no hardware router purchase needed) version of Deeper Network's decentralized VPN — traffic is routed through a network of other users' nodes rather than the company's own servers. Includes network-level ad and tracker blocking; no independent audit of its logging policy was found.",
  "orchid-vpn":
    "An open-source (code on GitHub), subscription-free decentralized VPN — you pay independent server operators directly in OXT cryptocurrency for the traffic used, routed randomly through multiple hops rather than through a single company. No native Windows app.",
  njalla:
    "A VPN from the makers of the anonymous domain registrar of the same name (founded by a co-founder of The Pirate Bay); registration only needs an email or XMPP address, no personal data required. Supports WireGuard and OpenVPN, pays by cryptocurrency or PayPal. Its no-logs policy is self-reported without independent audit; the service traces back to the VPN IPredator (merged into Njalla in 2020).",
  "mysterium-vpn":
    "A decentralized WireGuard-based VPN where exit nodes are ordinary participants' home connections rather than a single company's servers. Its no-logs policy hasn't been independently audited, and independent testing has recorded DNS leaks and an unreliable kill switch. In Germany, at least one Mysterium node operator reported a police search over traffic from other users that passed through their home connection — worth weighing this \"home node\" architecture risk separately from the risk to an ordinary user of the service.",
  "sentinel-shield":
    "A decentralized VPN on the Sentinel blockchain protocol, paid with prepaid credits instead of a subscription, with exit nodes run by the community rather than a single company. Its no-logs claim rests on the protocol's architecture (cryptographic session verification) rather than a conventional independent audit.",
  "bear-vpn":
    "A young provider (launched December 2024) legally registered in Wyoming, US, at a mail-agent address — a common trait of newly formed VPN companies, worth keeping in mind when assessing transparency. Claims 2,000+ servers, kill switch, and obfuscation on paid plans; its no-logs policy hasn't been independently audited, and there's very little user feedback or reputation data yet given the service's young age.",
  vpnbaron:
    "A Romanian provider (operating under various brands since 2014) focused on censorship circumvention — instead of WireGuard it uses the Hysteria2 and VLESS·Reality protocols, which disguise VPN traffic as regular HTTPS for networks with active blocking. Its no-logs policy is self-reported without independent audit.",
  "total-vpn":
    "A VPN from the Total Security group (which also owns the TotalAV antivirus). Unlike most competitors, it doesn't make bold no-logs claims — its privacy policy wording allows for collecting some activity data, worth noting if privacy is your priority.",
  touchvpn:
    "A free (ad-supported on the free tier) VPN from Aura (formerly Pango/AnchorFree, which also owns Hotspot Shield). Its own privacy policy openly acknowledges logging location, ISP, and traffic volume, and sharing data with advertising partners on the free tier — it doesn't claim a strict \"no-logs\" policy. According to user reports, the Windows and iOS apps use the outdated PPTP protocol.",
  hidden24:
    "A small VPN run by Sweden's Yayabee Sweden AB with unlimited simultaneous devices. Supports only legacy IKEv2, L2TP/IPSec, and PPTP protocols — no OpenVPN or WireGuard — and doesn't claim a kill switch; its no-logs policy is self-reported without independent audit.",
  victoryvpn:
    "A US rebrand of the same operator as Hidden24 (Sweden's Yayabee Sweden AB) — a separate site and pricing for the US market. Supports only legacy L2TP/IPSec and PPTP protocols, no WireGuard and no claimed kill switch; its no-logs policy is self-reported without independent audit.",
  "trickbyte-vpn":
    "An Estonian service (Digiport OU) combining VPN and Smart DNS, focused primarily on unblocking streaming (Netflix, Hulu, BBC iPlayer, Amazon) — Smart DNS also supports Roku, Apple TV, and game consoles without a client. WireGuard, a kill switch, and a no-logs policy aren't stated on the official site — a more modest feature set than most competitors.",
  clearvpn:
    "A VPN from Ukraine's MacPaw (makers of CleanMyMac) with one-click \"smart\" presets (\"fastest server\", \"no restrictions\", servers for specific streaming services) instead of a plain server list. Supports IKEv2 and OpenVPN, but not WireGuard; up to 6 devices. Its no-logs policy is self-reported without independent audit, and independent testing found the kill switch less reliable on IKEv2 than on OpenVPN.",
  unlocator:
    "A Danish service (Unlocator ApS) combining VPN and Smart DNS — Smart DNS supports 70+ platforms (smart TVs, streaming boxes, consoles), while the VPN is limited to 5 simultaneous connections. It claims a no-logs policy, but its own privacy policy admits storing IP addresses for up to 24 hours — a discrepancy with the \"no logs\" marketing worth noting.",
  vpn360:
    "A budget VPN from Pango/Anchorfree (the same owners as Hotspot Shield and Betternet), with no native macOS/Linux apps. Independent testing by Top10VPN found the iOS kill switch leaked the real IP address on disconnection, and the app shares device identifiers and IP addresses with advertising partners — at odds with the company's stated no-activity-logging policy.",
  ultravpn:
    "Another VPN from the Pango/Point Wild family (the same group that owns Hotspot Shield, Betternet, and VPN360), on its own Hydra protocol — no OpenVPN or WireGuard. Up to 10 simultaneous devices, split tunneling on Windows only, HTTPS traffic obfuscation. Its no-logs policy is self-reported without independent audit; the exact renewal price after the first term isn't directly confirmed on the official site.",
  "vpn-one-click":
    "A service from Hong Kong's BravoTelco Limited with no account registration required to use the app. The official site doesn't specify protocols (WireGuard/OpenVPN aren't separately mentioned), a kill switch, or split tunneling — a noticeably thinner technical spec sheet than most competitors; its no-logs policy is claimed without independent audit.",
  goodaccess:
    "Not a classic consumer VPN but a corporate ZTNA service (from 5 users per plan) with static IPs for allowlisting and cloud gateways in 35+ locations; there's a permanently free, limited Starter tier.",
  flyvpn:
    "A Hong Kong provider with 500+ servers in 40 countries; alongside regular shared IPs it sells dedicated static IPs (US, Korea) for an extra fee. Its no-logs policy is self-reported without independent audit.",
  "celo-vpn":
    "An Australian provider (since 2014) with servers in 15+ countries, up to 8 devices per account, and Shadowsocks/V2Ray obfuscation support for bypassing blocks; accepts cryptocurrency without tying payment to personal data. Its no-logs policy is self-reported without independent audit.",
  "wasel-pro":
    "A VPN aimed at users in the Middle East, with OpenVPN-over-SSH and Shadowsocks protocols for bypassing DPI blocking in heavily censored regions. At the time of checking, the official site's SSL certificate had expired, and a company co-founder confirmed in an open interview that the service stores session metadata (traffic volume, connect/disconnect times) — directly at odds with the \"no logs\" policy claimed on the site.",
  "12vpn":
    "One of the oldest VPN brands (operating since 2009, recently renamed 12VPX), specializing in bypassing the Great Firewall of China. Up to 6 simultaneous devices, kill switch; specific protocols (WireGuard and others) aren't disclosed on the site. Its no-logs policy is self-reported without independent audit.",
  "steganos-online-shield":
    "A German VPN (Steganos Software GmbH, Berlin) under GDPR jurisdiction, with 244 servers in 43 countries, built-in ad and tracker blocking, and automatic cookie deletion. The specific protocol (WireGuard/OpenVPN/IKEv2) isn't stated on the site. Its no-logs policy is self-reported without independent audit.",
  redru:
    "A Russian VPN service managed via Telegram login instead of standard registration — up to 5 devices and 500 GB of traffic on paid plans. The official site doesn't disclose the protocols used, its logging policy, whether it has a kill switch, or the company's legal entity/jurisdiction — a noticeably thinner set of public information than most competitors.",
  "red-shield-vpn":
    "A continuation of the TgVPN service (rebranded in 2019), a US provider (Private Network Labs LLC) with WireGuard support, double VPN in some locations, split tunneling, and its own RedLink obfuscation protocol. Accepts cryptocurrency payment, publishes a warrant canary. Its no-logs policy is self-reported without independent audit.",
  "kryon-vpn":
    "A UK provider (Fusion Edge LLP, London) with \"stealth\" protocols for bypassing DPI blocking and multi-hop support per its FAQ; allows torrents, up to 10 devices, 30+ locations. Its no-logs policy is self-reported without independent audit.",
  "dozor-vpn":
    "A Russian service on the VLESS protocol (disguises traffic as HTTPS), optimized specifically for bypassing blocks by Russian ISPs (MTS, Beeline, MegaFon, T2, Rostelecom). Works through third-party clients (Happ, v2rayN) rather than its own app. Its no-logs policy is self-reported without independent audit, and the company's jurisdiction isn't disclosed.",
  volnalink:
    "A Russian service with VLESS Reality/Trojan/Hysteria2 protocols for bypassing DPI blocking, 1,000+ servers in 100+ countries, up to 3 devices. Its no-logs policy is self-reported without independent audit, and the company's jurisdiction isn't disclosed.",
  "fornex-vpn":
    "A separate product from the Spanish hosting company Fornex (Fornex Hosting SL) with full multi-hop support (double VPN with a choice of entry and exit country), WireGuard, and traffic obfuscation via VLESS/XRay. Its no-logs policy is self-reported without independent audit.",
  finevpn:
    "A service aimed at the Russian market, with no app of its own — connect via third-party clients (WireGuard, FoXray, NapsternetV) or a Telegram bot providing configs on WireGuard and Xray (VLESS/VMess) protocols. The company's jurisdiction isn't disclosed, and its no-logs policy is claimed without independent audit.",
  thesafety:
    "A provider operating since 2006 (per third-party reviews, jurisdiction in Panama, not directly confirmed on the site), with the AmneziaWG protocol (obfuscated WireGuard) and an HTTPS traffic-disguise tool. Double VPN, kill switch, and a static IP are only available on plans above the cheapest Lite tier. Its no-logs policy is claimed without independent audit.",
  "hide-my-ip":
    "A long-running service (My Privacy Tools, Inc.), unrelated to either HMA or Hide.me despite the similar name — up to 7 devices, 140+ server locations. Per third-party reviews, the company's jurisdiction has shifted to the Bahamas; support for modern protocols (WireGuard/OpenVPN) isn't directly confirmed. Its no-logs policy is claimed without independent audit.",
  papervpn:
    "A VPN project from the independent Russian outlet \"Bumaga\", on the VLESS protocol — unlimited traffic and devices on one subscription, split tunneling, up to 10 server switches per day. The company's jurisdiction isn't disclosed, and its no-logs policy is claimed without independent audit.",
  "mz-vpn":
    "A VPN project from the independent Russian outlet Mediazona, registered as EUPHORIATECH LIMITED (Cyprus). AmneziaWG protocol (obfuscated WireGuard), unlimited traffic, up to 5 devices, servers in 5 countries plus Russia for access to Russian government sites. Its no-logs policy is claimed without independent audit.",
  "hidemy-name-vpn":
    "Operating since 2006 (formerly also known as InCloak), unrelated to Hide.me despite the similar name. Supports IKEv2 and OpenVPN, and per a third-party review also the outdated PPTP. The site states its jurisdiction inconsistently (sometimes Belize, sometimes English law), and its no-logs policy hasn't been independently audited; no registration required.",
  blancvpn:
    "An Estonian provider (Yadda OÜ) supporting WireGuard, V2Ray, and OpenVPN, split tunneling, and unlimited devices. Its no-logs policy is self-reported without independent audit; per unconfirmed third-party reviews, the service previously operated under a different name.",
  altvpn:
    "A Belize provider (ALTVPN INC.) with OpenVPN, IKEv2, and L2TP/PPTP protocols — WireGuard isn't offered. A static IP is available as a paid add-on. Its no-logs policy is self-reported without independent audit.",
  "rks-vpn":
    "A product from the RKS Global research group (studying internet censorship for over 10 years) on XRay/VLESS Reality and AmneziaWG protocols for bypassing DPI blocking. No app of its own — configs are imported into a third-party client (Amnezia VPN recommended); there's no official App Store installation method for iOS. Up to 7 devices, 6 server locations.",
  hynet:
    "An unusual model (\"Y2Y\" — you-to-you): instead of connecting to the provider's shared servers, the service rents you a personal dedicated server (VDS) abroad with VLESS, VMess, Shadowsocks, OpenVPN, and Trojan protocols. The company's legal entity and jurisdiction are never disclosed.",
  brovpn:
    "A small service distributed via a Telegram bot, on V2Ray/VLESS/VMess protocols for bypassing blocks. A kill switch is available on the monthly plan, and a \"stealth\" mode plus private DNS on the annual plan. According to user reviews, there's no official iOS app. Independent reviews are very scarce; the company's jurisdiction isn't disclosed.",
  "vpn-how":
    "Sells personal dedicated servers (not shared infrastructure) with an unusually wide range of protocols — WireGuard, VLESS+Reality, AmneziaWG, Hysteria2, Shadowsocks, and others — aimed at bypassing blocks. No app of its own — access is via protocol configs. The legal entity and jurisdiction are never disclosed.",
  "potato-vpn":
    "A Singapore provider (FASTPOTATO PTE. LTD). Per independent reviews (vpnMentor, vpncentral), it uses proprietary protocols instead of WireGuard/OpenVPN/IKEv2 and has no kill switch — worth factoring into your choice. Its no-logs policy is self-reported without independent audit.",
  vpn99:
    "A US provider (Shopcut LLC, New Jersey) with WireGuard support, 300+ servers in 60+ countries, up to 5 devices. Its no-logs policy is self-reported without independent audit; a kill switch, split tunneling, and other advanced features aren't listed on the site.",
  "tuna-vpn":
    "A Russian service on VLESS+Reality and AmneziaWG protocols for bypassing DPI blocking, supporting 4K streaming. Works on smart TVs through the third-party Happ client. The company's legal entity and jurisdiction aren't disclosed, and its no-logs policy is claimed without independent audit.",
  geodema:
    "A VPN on the VLESS protocol with wide server-location coverage (70+ countries). The site lists Geodema Group Limited (Ontario, Canada) as the legal entity, though some third-party sources name a different entity — a discrepancy worth keeping in mind. Its no-logs policy is claimed without independent audit.",
  "vpn-satoshi":
    "A British Virgin Islands provider using decentralized nodes on the Cosmos blockchain as a marketing point of difference from ordinary VPNs. Up to 5 devices on the paid plan, 40+ countries. There are some unverified user complaints about billing and routing — not documented as an official incident, but worth keeping in mind.",
  "nosok-vpn":
    "A Russian service operating since 2020, with ad and tracker blocking and support for up to 10 devices on one plan. The legal entity isn't disclosed, only a mention of Roskomnadzor compliance requirements. Its no-logs policy is claimed without independent audit; refund terms are limited (voided after more than 1 MB of traffic used).",
  "bens-vpn":
    "A Kazakhstani provider (TOO \"PUPA\"), operating since 2022, with a verified working Stripe checkout and support for Russian Mir cards. Claims a kill switch on by default, its own \"ShadowSocks++\" obfuscation protocol, 174 server locations, and unlimited devices on one plan. Per Google Play reviews, server-country selection is sometimes unreliable. Its no-logs policy is claimed without independent audit.",
  chavpn:
    "A censorship-bypass service on VLESS+Reality, Hysteria2, and AmneziaWG2 protocols, with AdGuard-based DNS ad filtering and a separate \"reverse VPN\" feature for accessing Russian banks and government services from abroad. No app of its own — works through third-party clients (Happ, INCY, AmneziaWG). A 500 GB/month traffic cap applies on all plans. The company's jurisdiction isn't disclosed.",
  "fulli-vpn":
    "A budget Russian service on the VLESS+Reality protocol, priced per device (from 65 ₽/month for one device). iOS/macOS and Linux need third-party clients (V2RayTun, Nekoray); Windows and Android TV have a dedicated app. The company's jurisdiction isn't disclosed, and its no-logs policy is claimed without independent audit.",
  greatfirevpn:
    "A product from the well-known anti-censorship organization GreatFire.org (launched in 2025 as a successor to their earlier FreeBrowser tool), with seven different circumvention methods (Meek, Webtunnel, V2Ray, Hysteria2, XRay-XHTTP, DNSTT) and a dedicated feature for accessing banks and government sites from Russia, China, Iran, and Turkmenistan. Split tunneling is Android-only. Up to 10 devices. The organization's own jurisdiction isn't publicly disclosed, typical for anti-censorship projects of this kind.",
  "aura-vpn":
    "The VPN is sold only as part of Aura's (US) identity-theft-protection subscription, not standalone. Has a kill switch and split tunneling. The company itself admits that on disconnect it deletes IP data but retains visited domains, traffic volume, and session duration — at odds with a strict \"no logs\" claim. In March 2026, the company suffered a breach of roughly 900,000 customer records via a compromised employee account (phishing), though the breach itself didn't involve VPN traffic.",
  "trend-micro-vpn":
    "A VPN add-on from the Japanese antivirus vendor Trend Micro. The official site doesn't state WireGuard support, a kill switch, split tunneling, or an independent audit of its logging policy. In 2019, the company had an incident where an employee stole and sold contact data for about 70,000 customers — unrelated to the VPN product itself, but worth weighing when assessing overall trust in the company.",
  "panda-dome-vpn":
    "A VPN from the Spanish antivirus brand Panda Security (now part of US-based WatchGuard Technologies), sold as part of Panda Dome plans. The free tier is capped at 150 MB of traffic per day with no server-country choice. WireGuard, a kill switch, and split tunneling aren't listed on the site. This is a separate product from Hong Kong's PandaVPN Pro — don't confuse the similar names.",
  "systweak-vpn":
    "An Indian provider (Systweak Software, Jaipur), positioned primarily as a VPN for Windows. WireGuard, a kill switch, split tunneling, and a static IP aren't listed on the official site. Its no-logs policy is claimed without independent audit; per unconfirmed reports, the service is unavailable in India itself due to a conflict with local data-retention law.",
  "eset-vpn":
    "A VPN from the Slovak antivirus vendor ESET, sold only as part of the ESET HOME Security Premium and Ultimate plans — not available standalone. Supports WireGuard, has a kill switch and split tunneling. Its no-logs policy is claimed without independent audit.",
  "g-data-vpn":
    "A VPN from the German antivirus vendor G DATA CyberDefense (Bochum), around 2,000 servers in 75+ locations, up to 10 devices per plan. Kill switch is Windows-only, no WireGuard (only IKEv2/OpenVPN/IPSec). Its no-logs policy is claimed without independent audit.",
  "webroot-secure-vpn":
    "A VPN from Carbonite (a division of Canada's OpenText) under the Webroot brand. Per independent reviews, the service's own privacy policy contradicts itself: it claims no logging of IP addresses or DNS queries, but elsewhere admits collecting the connected server, approximate location, and DNS queries for failure diagnostics. Split tunneling doesn't work on Apple devices. Unavailable in China, Russia, Egypt, and the UAE by the service's own restrictions.",
  "dashlane-vpn":
    "The VPN is built into the paid Premium tier of the Dashlane password manager only, not sold separately. It technically runs on Hotspot Shield's (AnchorFree) infrastructure — in 2017 that infrastructure was the subject of an FTC complaint from the Center for Democracy & Technology over the use of third-party tracking libraries and data collection at odds with its anonymity claims; the company disputed the allegations at the time. Its no-logs policy is claimed without independent audit.",
  "netgear-armor-vpn":
    "A VPN bundled into the NETGEAR Armor subscription for owners of Nighthawk and Orbi routers — purchasable only alongside compatible Netgear hardware, not standalone. The technology is provided by Bitdefender. On the base Armor plan, VPN traffic is capped (the exact limit isn't confirmed); unlimited access requires the Armor Plus plan. Up to 50 devices.",
  "att-activearmor-vpn":
    "Public Wi-Fi protection via VPN, bundled into the ActiveArmor Advanced plan for AT&T mobile subscribers — available only as part of a broader mobile-security package, smartphone app only, no desktop version.",
  "verizon-digital-secure-vpn":
    "A VPN included in the Digital Secure Premium plan for Verizon Wireless subscribers — replacing the discontinued Verizon Safe Wi-Fi app. Available only for regular postpaid consumer Verizon accounts, not prepaid, business, or government plans.",
  millenvpn:
    "A Japanese provider (Azpocket, Inc.) with 2,000+ servers in 140+ locations, optimized for Japanese streaming services (TVer, U-NEXT, ABEMA) alongside Netflix and Amazon Prime. Unlimited simultaneous connections, with a static IP available as an add-on. Its no-logs policy is claimed without independent audit.",
  "mastervpn-kr":
    "A South Korean service aimed at getting a South Korean local IP address (fixed or rotating) for remote access, rather than privacy as such. iOS/macOS support is announced but not confirmed as actually shipped. No independent audit or no-logs policy is stated on the site.",
  "edge-secure-network":
    "Not a full VPN, but a browser-built-in proxy on Cloudflare's infrastructure — it only protects traffic inside the Edge browser itself (5 GB per month), not the whole device. Streaming services (Netflix, Hulu, HBO) are explicitly excluded from routing to save the data cap. Several independent outlets (PCWorld, Windows Latest) have explicitly warned that it isn't a full VPN.",
  "avira-phantom-vpn":
    "A VPN from the German-origin brand Avira, now owned by the Gen Digital conglomerate (formed from the merger of NortonLifeLock and Avast) — no longer an independent German company. The free tier is capped at 500 MB of traffic per month. Unavailable in India due to a conflict with local data-retention law. Its no-logs policy is claimed without independent audit.",
  "internxt-vpn":
    "The VPN is bundled into paid plans of the Spanish encrypted cloud storage service Internxt (Valencia, GDPR-governed), not sold separately. Available only as a Chrome and Firefox extension — no native Windows/Mac/mobile apps. The number of available server countries grows with the plan (up to 5 on the top tier). Its no-logs policy is claimed without independent audit.",
  "dfndr-vpn":
    "A mobile VPN from the Brazilian cybersecurity company PSafe, with added phishing and scam-site protection, servers in 20+ countries. No desktop apps. Since August 2025 the company has stopped selling new annual and semi-annual subscriptions — only monthly billing is available. Its no-logs policy is claimed without independent audit.",
  mudfish:
    "A South Korean service focused on reducing online-gaming latency rather than privacy as such — instead of a flat subscription, you pay by traffic volume or monthly for a specific game. Uses proprietary multi-server routing and \"packet racing\" across several paths to reduce ping. Marketed as a \"no-log network\", but per independent reviews its own privacy policy admits retaining some connection data — at odds with that marketing claim.",
  "smart-dns-proxy":
    "Combines classic Smart DNS for unblocking geo-content with a built-in \"Smart VPN\" tunnel from the long-running (since 1995) Global Stealth Inc. Kill switch is available only on Windows and Android. The company's jurisdiction has shifted between several legal entities over time (Seychelles, Turkey, Poland). Despite \"no logs\" marketing, its own privacy policy admits storing the connection date, chosen server, and daily traffic volume — a direct contradiction of that claim.",
  tailscale:
    "Not a classic IP-switching VPN provider, but a WireGuard-based mesh network for connecting your own devices directly to each other. The Personal plan is free for teams of up to 6 users, with paid business plans from $8 per user per month.",
  zerotier:
    "Like Tailscale, this is a virtual mesh-networking service between your own devices, not a classic IP-switching VPN. The free Personal tier is limited to 10 devices and one network, and the paid Essential tier starts at $18/month for 10 devices.",
  twingate:
    "A corporate ZTNA (Zero Trust Network Access) service, not a classic consumer VPN: gives employees access to specific company resources via peer-to-peer connections instead of tunneling all traffic. There's a permanently free Starter tier for up to 5 users, with paid Teams plans from $5 per user per month.",
};

/**
 * English overrides for the handful of `name` fields in services.ts that still contain
 * Russian text (usually a parenthetical). Falls back to the raw `name` otherwise.
 */
export const NAME_EN: Record<string, string> = {
  "opera-vpn": "Opera VPN (browser)",
  "mz-vpn": "MZ VPN (Zona VPN)",
};
