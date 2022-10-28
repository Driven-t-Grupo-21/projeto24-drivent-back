/*
  Warnings:

  - Added the required column `logoImageUrl` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "logoImageUrl" VARCHAR(255) NOT NULL;
