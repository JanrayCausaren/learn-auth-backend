import { prisma } from "../../lib/prisma";
import type { CreateVerificationTokenType } from "./auth.model";
import type { RegisterBody } from "./auth.schema";

export async function registerRepository(data: RegisterBody) {
  return prisma.user.create({
    data,
    // select: {
    //   id: true,
    //   username: true,
    //   email: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createVerificationToken(
  data: CreateVerificationTokenType,
) {
  return prisma.verificationToken.create({
    data,
  });
}

export async function findVerificationToken(token: string) {
  return prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });
}

export async function updateToVerifiedUser(userId: string) {
  return prisma.user.update({
    data: {
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
    where: {
      id: userId,
    },
  });
}

export async function deleteVerificationToken(id: string) {
  return prisma.verificationToken.delete({
    where: {
      id,
    },
  });
}
export async function deleteVerificationTokensByUserId(userId: string) {
  return prisma.verificationToken.deleteMany({
    where: {
      userId,
    },
  });
}
export async function findVerificationTokenByUserId(userId: string) {
  return prisma.verificationToken.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
