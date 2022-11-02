/*
  Warnings:

  - You are about to drop the column `local` on the `Activities` table. All the data in the column will be lost.
  - Added the required column `localId` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "local",
ADD COLUMN     "localId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
