/*
  Warnings:

  - Added the required column `hour` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "hour" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ActivitiesOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityInfosId" INTEGER NOT NULL,

    CONSTRAINT "ActivitiesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesOrder_userId_key" ON "ActivitiesOrder"("userId");

-- AddForeignKey
ALTER TABLE "ActivitiesOrder" ADD CONSTRAINT "ActivitiesOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesOrder" ADD CONSTRAINT "ActivitiesOrder_activityInfosId_fkey" FOREIGN KEY ("activityInfosId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
