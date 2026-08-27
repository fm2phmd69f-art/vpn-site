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
};
