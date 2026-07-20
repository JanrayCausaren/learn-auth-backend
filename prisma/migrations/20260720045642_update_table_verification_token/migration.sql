/*
  Warnings:

  - You are about to drop the column `usedAt` on the `verification_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tokenType]` on the table `verification_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "usedAt";

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_userId_tokenType_key" ON "verification_tokens"("userId", "tokenType");
