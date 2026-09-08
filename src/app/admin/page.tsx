import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function isAuthorized(): Promise<boolean> {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const store = await cookies();
  return store.get("admin_key")?.value === expected;
}

export default async function AdminPage() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return <AdminLoginForm />;
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Сообщения</h1>
        <Link href="/admin/reviews" className="text-sm text-accent hover:underline">
          Отзывы →
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Всего {messages.length} сообщений с формы «Связаться с нами» (показаны последние 300).
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
            Пока нет сообщений.
          </p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-surface p-4">
              <p className="whitespace-pre-wrap text-sm text-fg">{m.message}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>
                  Связь: <span className="font-medium text-fg">{m.contact}</span>
                </span>
                <span>
                  {m.createdAt.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  {m.createdAt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
