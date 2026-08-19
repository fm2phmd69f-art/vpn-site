# VPN Маркетплейс — сайт

Сайт-агрегатор VPN-сервисов: каталог провайдеров карточками (цена, заявленная
скорость, платформы, фишки) + автоматическая фоновая проверка доступности
сайта каждого провайдера (пинг/uptime), которая обновляет статус на сайте.

## Как это на самом деле работает (важно прочитать)

Полностью автоматически «найти все существующие VPN-сервисы в интернете» и
протестировать их реальную скорость через VPN-туннель — невозможно без
партнёрства/API/аккаунта в каждом сервисе. Поэтому архитектура такая:

- **Каталог провайдеров курируется вручную** — [`src/data/services.ts`](src/data/services.ts).
  Цена, «заявленная скорость», фичи и т.д. — это данные из маркетинга
  провайдера, а не измерения. Обновляйте файл, когда провайдер меняет тарифы.
- **Доступность и задержка проверяются автоматически и по-настоящему** —
  [`src/lib/checker.ts`](src/lib/checker.ts) реально делает HTTP-запрос на
  сайт провайдера, измеряет время ответа и помечает сервис как
  online/offline. Это проверка «жив ли сайт провайдера», а не скорость VPN.
- Раз в N минут запускается [`scripts/check-services.ts`](scripts/check-services.ts)
  (через cron/systemd на своём сервере, либо `vercel.json` → Vercel Cron
  дергает `/api/cron/check`), который обновляет `status`, `latencyMs`,
  `lastCheckedAt` в базе. Главная страница читает уже посчитанные значения.

## Стек

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma ORM
- Шрифт: системный стек `-apple-system, BlinkMacSystemFont, …` — на
  устройствах Apple рендерится как SF Pro Display/Text (сам шрифт Apple не
  распространяет для встраивания на произвольные сайты, поэтому файл шрифта
  не подключается — используется системный рендеринг)

## Быстрый старт

```bash
cd vpn-site
npm install
cp .env.example .env      # укажите DATABASE_URL и CRON_SECRET
docker compose up -d      # локальный Postgres (или укажите свой DATABASE_URL)
npm run prisma:migrate    # создаст таблицы
npm run db:seed           # заполнит каталог из src/data/services.ts
npm run check:services    # (опционально) сразу проверить доступность сайтов
npm run dev                # http://localhost:3000
```

## Структура

```
vpn-site/
├── prisma/
│   ├── schema.prisma        # модель VpnService (Postgres)
│   └── seed.ts               # заполняет БД из src/data/services.ts
├── scripts/
│   └── check-services.ts     # запускать по cron — обновляет статус/пинг
├── src/
│   ├── app/
│   │   ├── page.tsx           # главная страница (server component)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       ├── services/route.ts     # GET — список сервисов (JSON)
│   │       └── cron/check/route.ts   # GET/POST — запускает проверку (защищено CRON_SECRET)
│   ├── components/
│   │   ├── CatalogClient.tsx  # поиск, фильтры по тегам, сортировка
│   │   ├── ServiceCard.tsx    # карточка сервиса
│   │   └── StatusBadge.tsx    # индикатор "доступен / недоступен"
│   ├── lib/
│   │   ├── checker.ts         # чистая функция HTTP-проверки сайта
│   │   ├── runChecks.ts       # прогоняет checker.ts по всем сервисам и пишет в БД
│   │   ├── prisma.ts          # Prisma client
│   │   └── types.ts
│   └── data/
│       └── services.ts        # курируемый каталог — редактируйте здесь
└── vercel.json                # cron: раз в 30 минут дергает /api/cron/check
```

## Как добавить/изменить VPN-сервис

Отредактируйте [`src/data/services.ts`](src/data/services.ts) и заново
выполните `npm run db:seed` (обновит существующие записи по `slug`, добавит
новые).

## Как настроить автопроверку в проде

**Вариант A — Vercel:** задеплойте на Vercel, добавьте переменные окружения
`DATABASE_URL` и `CRON_SECRET` в настройках проекта. `vercel.json` уже
содержит cron-задачу на `/api/cron/check` каждые 30 минут — Vercel сам
подставит заголовок авторизации.

**Вариант B — свой сервер/VPS:** добавьте в crontab:

```
*/30 * * * * cd /path/to/vpn-site && npm run check:services >> /var/log/vpn-check.log 2>&1
```

## Известные ограничения

- «Заявленная скорость» — маркетинговый показатель провайдера, не измерение.
- Проверка идёт до сайта провайдера (HTTP), а не через сам VPN-туннель —
  честный показатель «жив ли провайдер», но не «какая скорость в VPN».
- Каталог не пополняется сам новыми провайдерами — добавление нового VPN в
  список делает человек через `src/data/services.ts`.
