export type CreateVerificationTokenType = {
  token: string;
  userId: string;
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
}