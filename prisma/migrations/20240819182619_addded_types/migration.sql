/*
  Warnings:

  - The primary key for the `Wallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `balance` column on the `Wallet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "balance",
ADD COLUMN     "balance" INTEGER,
ADD CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id");
