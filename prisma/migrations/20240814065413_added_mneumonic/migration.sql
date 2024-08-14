/*
  Warnings:

  - Added the required column `mneumonic` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "mneumonic" TEXT NOT NULL;
