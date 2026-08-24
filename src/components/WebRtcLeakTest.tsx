"use client";

import { useEffect, useState } from "react";

interface Candidate {
  type: string;
  ip: string;
}

type Status = "running" | "done" | "unsupported" | "error";

const IPV4_RE = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

function parseCandidate(candidateStr: string): Candidate | null {
  // Example: "candidate:842163049 1 udp 1677729535 203.0.113.4 54321 typ srflx ..."
  const typeMatch = candidateStr.match(/typ (\w+)/);
  const ipMatch = candidateStr.match(IPV4_RE);
  if (!typeMatch || !ipMatch) return null;
  return { type: typeMatch[1], ip: ipMatch[1] };
}

export function WebRtcLeakTest() {
  const [status, setStatus] = useState<Status>("running");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [serverIp, setServerIp] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/whoami")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setServerIp(data.ip ?? null);
      })
      .catch(() => {});

    if (typeof RTCPeerConnection === "undefined") {
      setStatus("unsupported");
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const found: Candidate[] = [];
    const seen = new Set<string>();

    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      const parsed = parseCandidate(event.candidate.candidate);
      if (parsed && !seen.has(`${parsed.type}:${parsed.ip}`)) {
        seen.add(`${parsed.type}:${parsed.ip}`);
        found.push(parsed);
        if (!cancelled) setCandidates([...found]);
      }
    };

    try {
      pc.createDataChannel("leak-test");
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .catch(() => {
          if (!cancelled) setStatus("error");
        });
    } catch {
      setStatus("error");
    }

    const timer = setTimeout(() => {
      if (!cancelled) setStatus("done");
      pc.close();
    }, 3000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      pc.close();
    };
  }, []);

  const publicCandidates = candidates.filter((c) => c.type === "srflx" || c.type === "prflx");
  const hostCandidates = candidates.filter((c) => c.type === "host");

  const leakDetected =
    serverIp != null && publicCandidates.some((c) => c.ip !== serverIp);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-xs uppercase tracking-wide text-muted">
          IP браузера (по обычному HTTP-запросу к серверу)
        </p>
        <p className="mt-1 break-all text-xl font-semibold">{serverIp ?? "определяется…"}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-xs uppercase tracking-wide text-muted">
          IP, обнаруженные через WebRTC/STUN
        </p>
        {status === "unsupported" && (
          <p className="mt-2 text-sm text-muted">Ваш браузер не поддерживает WebRTC.</p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-muted">
            Не удалось запустить проверку — возможно, WebRTC заблокирован настройками браузера.
          </p>
        )}
        {(status === "running" || status === "done") && (
          <>
            {publicCandidates.length === 0 && hostCandidates.length === 0 ? (
              <p className="mt-2 text-sm text-muted">
                {status === "running" ? "Идёт поиск…" : "Публичных адресов через WebRTC не найдено."}
              </p>
            ) : (
              <ul className="mt-2 flex flex-col gap-1 text-sm">
                {publicCandidates.map((c, i) => (
                  <li key={`pub-${i}`} className="break-all">
                    <span className="font-medium">{c.ip}</span>{" "}
                    <span className="text-muted">(публичный, через STUN)</span>
                  </li>
                ))}
                {hostCandidates.map((c, i) => (
                  <li key={`host-${i}`} className="break-all text-muted">
                    {c.ip} (локальный сетевой адрес)
                  </li>
                ))}
              </ul>
            )}
            {status === "running" && (
              <p className="mt-2 text-xs text-muted">Сбор данных ещё продолжается…</p>
            )}
          </>
        )}
      </div>

      {status === "done" && serverIp && publicCandidates.length > 0 && (
        <div
          className={`rounded-2xl border p-5 text-sm ${
            leakDetected
              ? "border-[var(--offline)] bg-[var(--offline)]/10"
              : "border-[var(--online)] bg-[var(--online)]/10"
          }`}
        >
          {leakDetected ? (
            <p>
              <strong>Возможна утечка:</strong> публичный IP, обнаруженный через WebRTC, не
              совпадает с IP обычного HTTP-запроса. Если вы сейчас подключены к VPN — это признак
              того, что WebRTC раскрывает ваш реальный адрес в обход туннеля.
            </p>
          ) : (
            <p>
              <strong>Совпадает:</strong> IP через WebRTC совпадает с обычным HTTP-адресом. Если вы
              сейчас подключены к VPN — по крайней мере в этом тесте признаков утечки нет.
            </p>
          )}
        </div>
      )}

      <p className="text-xs text-muted">
        Как пользоваться: включите VPN, дождитесь подключения, затем обновите эту страницу и
        сравните адреса. Если оба совпадают друг с другом, но НЕ совпадают с вашим настоящим
        (не-VPN) IP — WebRTC не выдаёт вас. Если IP через WebRTC отличается от адреса VPN — это
        утечка.
      </p>
    </div>
  );
}
