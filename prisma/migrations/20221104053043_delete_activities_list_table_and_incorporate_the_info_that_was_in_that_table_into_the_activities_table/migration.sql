/*
  Warnings:

  - You are about to drop the column `activityId` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the `ActivitiesList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endsAt` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "Activities_activityId_fkey";

-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "activityId",
DROP COLUMN "hour",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endsAt" TEXT NOT NULL,
ADD COLUMN     "startsAt" TEXT NOT NULL;

-- DropTable
DROP TABLE "ActivitiesList";
