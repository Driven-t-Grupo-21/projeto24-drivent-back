/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `RoomOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoomOrder_orderId_key" ON "RoomOrder"("orderId");
