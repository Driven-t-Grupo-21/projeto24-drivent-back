/*
  Warnings:

  - You are about to drop the column `total` on the `Tiket` table. All the data in the column will be lost.
  - Added the required column `total` to the `TiketType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tiket" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "TiketType" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
