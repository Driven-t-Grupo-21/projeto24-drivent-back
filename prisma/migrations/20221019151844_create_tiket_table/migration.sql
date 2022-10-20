-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "hosting" BOOLEAN NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tiket_userId_key" ON "Tiket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tiket_eventId_key" ON "Tiket"("eventId");

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TiketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
