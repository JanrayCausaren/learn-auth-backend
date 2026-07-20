import type { CooldownType, VerificationTokenType } from "../../../generated/prisma/client";

export type CreateVerificationTokenType = {
  token: string;
  userId: string;
  tokenType: VerificationTokenType;
  expiresAt: Date;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CooldownData = {
  userId: string;
  type: CooldownType;
  lastSentAt: Date;
};


// enum CooldownType {
//   EMAIL_VERIFICATION,
//   LOGIN_OTP,
//   PHONE_VERIFICATION,
//   PASSWORD_RESET,
// }
