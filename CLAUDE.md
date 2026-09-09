# vpn-site — important operational notes

## Database: shared between local dev and production

`DATABASE_URL` (and `DATABASE_URL_UNPOOLED`) in `.env`/`.env.local` point to the
**same live Neon production database** used by the deployed site — there is no
separate local/staging database. Any command run locally against these URLs
acts directly on production data.

**Before running any Prisma command that touches schema or data**
(`migrate dev`, `migrate deploy`, `migrate diff`, `db push`, `db seed`, or any
ad-hoc script that writes/deletes rows), run a backup first:

```bash
npm run db:backup
```

This dumps every table to a timestamped JSON file in `backups/` (gitignored).
It takes a few seconds and has no downside — just always do it first.

### Never point `--shadow-database-url` (or any "shadow"/"scratch" DB flag) at
### `DATABASE_URL` or `DATABASE_URL_UNPOOLED`

Prisma treats a shadow database as disposable and will wipe it. On
2026-09-09, running `prisma migrate diff --shadow-database-url
"$DATABASE_URL_UNPOOLED"` pointed the shadow database at the real production
database (same physical DB, just the unpooled connection string) and wiped
`VpnService`, `Review`, and `ContactMessage` in production. A shadow database
must be a genuinely separate, disposable database — if you don't have one
provisioned, don't pass the flag; find another way to compute the diff (e.g.
inspect `information_schema` directly, or create a real throwaway Neon branch
first).

### `VpnService` can be regenerated from source

`src/data/services.ts` (`SEED_SERVICES`) is the source of truth for the VPN
catalog. `npm run db:seed` (→ `syncCatalogFromSeed()` in
`src/lib/syncCatalog.ts`) upserts every row from that file into `VpnService`
by slug — this is how the catalog was recovered after the 2026-09-09
incident. It does NOT restore `Review` or `ContactMessage` rows (those have
no source-of-truth file) — for those, only a real backup (`backups/*.json`)
or a Neon point-in-time restore can recover them.

## Migrations

Migration history in `prisma/migrations/` has drifted from what's actually
been applied in production before (tables existed in the live DB with no
corresponding migration file, and vice versa). Before assuming
`prisma migrate deploy` will just work, verify the live schema first:

```bash
node -e "require('./src/lib/prisma').prisma.\$queryRawUnsafe(\"SELECT table_name FROM information_schema.tables WHERE table_schema='public'\").then(r=>console.log(r))"
```
