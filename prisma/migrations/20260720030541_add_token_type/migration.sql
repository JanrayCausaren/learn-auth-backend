/*
  Warnings:

  - Added the required column `tokenType` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "verification_tokens" ADD COLUMN     "tokenType" "VerificationTokenType" NOT NULL;

-- CreateIndex
CREATE INDEX "verification_tokens_userId_tokenType_idx" ON "verification_tokens"("userId", "tokenType");
