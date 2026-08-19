-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('ONLINE', 'OFFLINE', 'UNKNOWN');

-- CreateTable
CREATE TABLE "VpnService" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT '🛡',
    "websiteUrl" TEXT NOT NULL,
    "referralUrl" TEXT,
    "priceFrom" TEXT NOT NULL,
    "priceMonthlyUsd" DOUBLE PRECISION,
    "claimedSpeedMbps" INTEGER,
    "freeOption" TEXT,
    "rating" DOUBLE PRECISION,
    "platforms" TEXT[],
    "tags" TEXT[],
    "description" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'UNKNOWN',
    "latencyMs" INTEGER,
    "lastCheckedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VpnService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VpnService_slug_key" ON "VpnService"("slug");

-- CreateIndex
CREATE INDEX "VpnService_status_idx" ON "VpnService"("status");
