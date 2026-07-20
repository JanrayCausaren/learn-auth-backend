import type { CooldownType } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { CooldownData, CreateVerificationTokenType } from "./auth.model";
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

export async function findCooldownByUserAndType(
  userId: string,
  type: CooldownType,
) {
  return prisma.cooldown.findUnique({
    where: {
      userId_type: {
        type: type,
        userId,
      },
    },
  });
}

/// create and update if existing
export async function upsertCooldown(data: CooldownData) {
  return prisma.cooldown.upsert({
    create: data,
    update: {
      lastSentAt: data.lastSentAt,
    },
    where: {
      userId_type: {
        type: data.type,
        userId: data.userId,
      },
    },
  });
}



// export const verificationToken = {
//   create
// }