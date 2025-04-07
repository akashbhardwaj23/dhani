/*
  Warnings:

  - You are about to drop the column `accountId` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `useraccountId` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletNumber` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_accountId_fkey";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "accountId",
ADD COLUMN     "useraccountId" INTEGER NOT NULL,
ADD COLUMN     "walletNumber" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mneumonic" TEXT NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_useraccountId_fkey" FOREIGN KEY ("useraccountId") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
