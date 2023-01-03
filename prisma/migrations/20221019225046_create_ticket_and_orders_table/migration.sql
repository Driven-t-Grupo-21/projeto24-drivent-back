/*
  Warnings:

  - You are about to drop the `Tiket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TiketType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_userId_fkey";

-- DropTable
DROP TABLE "Tiket";

-- DropTable
DROP TABLE "TiketType";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hosting" BOOLEAN NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "price" VARCHAR(10) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
