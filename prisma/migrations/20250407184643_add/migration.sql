/*
  Warnings:

  - Added the required column `key` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "key" TEXT NOT NULL;
