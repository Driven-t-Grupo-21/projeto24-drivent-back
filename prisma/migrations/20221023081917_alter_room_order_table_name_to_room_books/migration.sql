/*
  Warnings:

  - You are about to drop the `RoomOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomOrder" DROP CONSTRAINT "RoomOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "RoomOrder" DROP CONSTRAINT "RoomOrder_roomId_fkey";

-- DropTable
DROP TABLE "RoomOrder";

-- CreateTable
CREATE TABLE "RoomBook" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "RoomBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomBook_orderId_key" ON "RoomBook"("orderId");

-- AddForeignKey
ALTER TABLE "RoomBook" ADD CONSTRAINT "RoomBook_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBook" ADD CONSTRAINT "RoomBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
