/*
  Warnings:

  - Added the required column `local` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancies` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "local" TEXT NOT NULL,
ADD COLUMN     "vacancies" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ActivitiesList" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "ActivitiesList_pkey" PRIMARY KEY ("id")
);
