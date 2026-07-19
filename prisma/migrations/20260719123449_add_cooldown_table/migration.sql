-- CreateEnum
CREATE TYPE "CooldownType" AS ENUM ('EMAIL_VERIFICATION', 'LOGIN_OTP', 'PHONE_VERIFICATION', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "cooldown" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CooldownType" NOT NULL,
    "lastSentAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cooldown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cooldown_userId_type_key" ON "cooldown"("userId", "type");

-- AddForeignKey
ALTER TABLE "cooldown" ADD CONSTRAINT "cooldown_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
