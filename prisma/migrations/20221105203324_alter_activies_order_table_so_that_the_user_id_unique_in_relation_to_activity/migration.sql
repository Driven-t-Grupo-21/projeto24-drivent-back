/*
  Warnings:

  - A unique constraint covering the columns `[userId,activityInfosId]` on the table `ActivitiesOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ActivitiesOrder_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesOrder_userId_activityInfosId_key" ON "ActivitiesOrder"("userId", "activityInfosId");
