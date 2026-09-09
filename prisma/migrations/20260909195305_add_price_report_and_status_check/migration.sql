-- CreateTable
CREATE TABLE "PriceReport" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusCheck" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL,
    "latencyMs" INTEGER,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceReport_serviceId_idx" ON "PriceReport"("serviceId");

-- CreateIndex
CREATE INDEX "StatusCheck_serviceId_checkedAt_idx" ON "StatusCheck"("serviceId", "checkedAt");

